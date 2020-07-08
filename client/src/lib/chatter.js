const LocalStorageHandler = require('./localStorageHandler');
const { message, responseMessages } = require('./message');
const Config = require('../../config');
const SampleJson = require(`./${Config.app.file}`);

((global, factory) => {
    global._Chatter = factory();
    typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = global._Chatter) : null;
})(global, () => {
    let maxFetch = Config.app.maxFetch || 10;
    let maxItems = Config.app.maxItems || 50;
    let timeOut = 500;

    let ls = new LocalStorageHandler(maxItems, maxFetch, Config.app.LOCALSTORAGE_KEY, SampleJson);
    let list = ls.getData();

    let index = { top: 0, bottom: list.length };
    let hooks = {};
    let triggers = {};

    /**
     * Assign the hooks
     * @param {Object} obj - hooks to be executed
     */
    const joinTheConversation = (obj) => {
        if (!obj) return false;

        for (const hook in obj) {
            hooks[hook] = obj[hook];

            switch (hook) {
                case 'onNewMessage':
                    triggers[hook] = !unreadMessages().count > 0;
                    break;
            }
        }
    };

    /**
     * Initialize
     */
    const init = () => {
        if (hooks.hasOwnProperty('init')) {
            hooks.init(list, unreadMessages().count, isFarAway());
            delete hooks.init;

            run();
            return true;
        }

        return false;
    };

    /**
     * Executes the hook functions
     * @param {String} hook to be executed
     */
    const update = (hook) => {
        switch (hook) {
            case 'onNewMessage':
                if (triggers[hook]) {
                    hooks.onNewMessage(list, unreadMessages().count, index.bottom === ls.size());
                    triggers[hook] = false;
                }
                break;
        }
    };

    /**
     * Position the position ot the first unread message and
     * the total number of unread messages
     * @returns {Object}
     * @example
     *      {first: 2, count: 3}
     */
    const unreadMessages = () => {
        const find = (i = -1) => {
            const msgs = ls.fetchDataFromIndex(i, 1);

            if (
                msgs.length === 0 ||
                !(msgs[0].status === message.status.RECEIVED && msgs[0].direction === message.direction.IN)
            )
                return i;

            return find(--i);
        };

        const index = find() + 1;

        return {
            first: index === 0 ? -1 : ls.size() + index,
            count: Math.abs(index),
        };
    };

    /**
     * Fetches next 'maxFetch=10' message it menas, goes
     * forward in conversation
     * @returns {Array} array of objects
     */
    const fetch = () => {
        if (index.bottom === ls.size()) return list;

        const msgs = ls.fetchDataFromIndex(index.bottom);
        list = [...list, ...msgs];

        if (list.length > maxItems) {
            const diff = list.length - maxItems;

            index.top += diff;
            index.bottom += diff;

            list = list.slice(diff);
        } else {
            index.bottom += maxFetch;
            if (index.bottom > ls.size()) index.bottom = ls.size();
        }

        return list;
    };

    /**
     * Fetches previous 'maxFetch=10' message it menas, goes
     * back in conversation
     * @returns {Array} array of objects
     */
    const fetchTop = () => {
        if (index.top === 0) return list;
        let mxf = maxFetch;

        if (index.top - mxf < 0) {
            mxf = index.top;
            index.top = 0;
        } else {
            index.top -= mxf;
        }

        const msgs = ls.fetchDataFromIndex(index.top, mxf);
        list = [...msgs, ...list];

        if (list.length > maxItems) {
            const diff = list.length - maxItems;
            list = list.slice(0, maxItems);

            index.bottom -= diff;
        }

        return list;
    };

    /**
     * Fetches the conversation from the start of unread messages.
     * @returns {Array} array of objects or empty array if no new messages
     */
    const fetchStartOfUnreadMessages = () => {
        const un = unreadMessages();
        if (un.first === -1) return [];

        index.top = un.first - maxItems < 0 ? 0 : un.first - maxItems;
        index.bottom = un.first;

        return (list = ls.fetchDataFromIndex(index.top, maxItems));
    };

    /**
     * Get messages from end of conversation and
     * updated top and bottom index of the frame
     * @returns {Array} array of multiple message object
     */
    const fetchTheEndOfMessages = () => {
        index.top = ls.size() - maxItems;
        index.bottom = ls.size();

        return (list = ls.fetchDataFromIndex(-maxItems, maxItems));
    };

    /**
     * Send message
     * @param {String} text to send in conversation
     * @param {Function} callback function
     */
    const sendMessage = (text, callback) => {
        ls.addData(message.send(ls.size() + 1, text));

        fetchTheEndOfMessages();
        callback(list);
    };

    /**
     * Makes an response message and adds to the conversation
     */
    const responseMessage = () => {
        const msg = message.response(ls.size() + 1, responseMessages.get());

        if (ls.size() === index.bottom) {
            index.bottom++;
            list.push(msg);
        }

        triggers['onNewMessage'] = true;
        ls.addData(msg);
    };

    /**
     * Change the values of the message
     * @param {Number} id of a message
     * @param {Object} data properties to be changed
     */
    const updateMessage = (id, data) => {
        ls.updateData(id, data);
    };

    /**
     * Is the difference bigger then maxDiff
     */
    const maxDiff = Config.app.maxDiff;
    const isFarAway = () => {
        return ls.size() - index.bottom > maxDiff ? true : false;
    };

    ////////////////////////////////////////////////

    /**
     * Make ids visible or not. The App needs to be restarted
     * for change to take effect
     */
    const _turnOnOffId = () => {
        settings.idVisible = !settings.idVisible;
        setSettings();
    };
    const getSettings = () => {
        return JSON.parse(window.localStorage.getItem(Config.app.LS_SETTINGS_KEY)) || Config.app.settings;
    };
    const setSettings = () => {
        window.localStorage.setItem(Config.app.LS_SETTINGS_KEY, JSON.stringify(settings, null, 2));
        return true;
    };
    const settings = getSettings();
    setSettings();

    /**
     * Some info
     */
    const _someInfo = () => {
        console.log('//------------- Info -------------------------');
        console.log(`Top: ${index.top}`);
        console.log('Bottom: ', index.bottom);
        console.log(`List Size: ${ls.size()}`);
        console.log(`File loaded: ./${Config.app.file}`);
        console.log('--------------- Sizes ------------------------');
        console.log(`Max size of Frame: ${maxFetch}`);
        console.log(`Max items to Fetch: ${maxItems}`);
        console.log(`Show button: diff to last to show the button: ${maxDiff}`);
        console.log('--------------- Unread messages --------------');
        const un = unreadMessages();
        console.log(`Searches from bottom to top for unread masseges!!!`);
        console.log(`Indx of first unread msg: ${un.first}`);
        console.log(`Num of unread messages: ${un.count}`);
        console.log('--------------- LS Settings ------------------');
        console.log(getSettings());
        console.log('--------------- Methods to use ---------------');
        console.log(`
    _Chatter.responseMessage()
    _Chatter.update('onNewMessage')
    _Chatter._turnOnOffId()
        `);
        console.log('//--------------------------------------------');
    };

    ////////////////////////////////////////////////////////
    // Private methods
    ////////////////////////////////////////////////////////

    /**
     * Executes hook every 500ms
     */
    const run = () => {
        setTimeout(() => {
            for (const k in hooks) {
                update(k);
            }

            run();
        }, timeOut);
    };

    return {
        __proto__: null,
        init: init,
        joinTheConversation: joinTheConversation,
        unreadMessages: unreadMessages,
        fetch: fetch,
        fetchTop: fetchTop,
        fetchStartOfUnreadMessages: fetchStartOfUnreadMessages,
        fetchTheEndOfMessages: fetchTheEndOfMessages,
        sendMessage: sendMessage,
        responseMessage: responseMessage,
        updateMessage: updateMessage,
        update: update,
        isFarAway: isFarAway,
        settings: settings,
        _someInfo: _someInfo,
        _turnOnOffId: _turnOnOffId,
    };
});
