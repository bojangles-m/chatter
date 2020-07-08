((factory) => {
    typeof exports === 'object' && typeof module !== 'undefined' ? (module.exports = factory) : null;
})((m = 50, mtf = 10, lskey, jf) => {
    const LOCALSTORAGE_KEY = lskey;
    const JSON_FILE = jf;
    const maxItems = m;
    const maxToFetch = mtf;

    let indexMap = {};
    let json = [];

    let size = 0;

    /**
     * Initialization of data
     */
    const init = () => {
        json = load();
        indexMap = createIndexMap(json);
        save(json);

        size = json.length;
    };

    /**
     * Fetch data from main data storage
     * @param {Number} start - start form the index
     * @param {Number} end - end of the index
     * @returns {Array} array of objects
     */
    const fetchDataFromIndex = (start, end) => {
        if (start < 0) {
            start = size + start < 0 ? 0 : size + start;
        } else if (start > size) {
            start = start - size;
        }

        end = start + (end === undefined ? maxToFetch : end);

        return _fetchData(start, end);
    };

    /**
     * Get the first 'maxItems' data from storage
     * @returns {Array} array of objects
     */
    const getData = () => {
        return fetchDataFromIndex(0, maxItems);
    };

    /**
     * Add new data to the storage
     * @param {Object} data to save
     */
    const addData = (data) => {
        json.push(data);
        save(json);
        indexMap[data.id] = size;
        size++;
    };

    /**
     * Update properties in Object data
     * @param {Number} id - object id
     * @param {Object} data - data to update
     */
    const updateData = (id, data) => {
        if (!indexMap[id]) return;

        const obj = json[indexMap[id]];

        for (const k in data) {
            if (obj.hasOwnProperty(k)) {
                obj[k] = data[k];
            }
        }

        save(json);
    };

    ////////////////////////////////////////////////////////
    // Private methods
    ////////////////////////////////////////////////////////

    /**
     * Returns JSON from storage
     * @returns Json
     */
    const load = () => {
        if (LOCALSTORAGE_KEY === undefined) throw `Local storage Key is missing.`;

        return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY) || loadFile());
    };

    /**
     * Returns JSON string
     */
    const loadFile = () => {
        if (JSON_FILE === undefined) return '[]';

        return JSON.stringify(JSON_FILE, null, 2);
    };

    /**
     * Saves JSON as string to storage
     * @param {Json} json
     */
    const save = (json) => {
        const validJson = validate(json);

        if (!validJson) return;

        window.localStorage.setItem(LOCALSTORAGE_KEY, validJson);
    };

    /**
     * Create index map, creates connections between
     * id of the item and the index in json array
     * @param {Json} - Json object
     * @returns {Object} - index map
     */
    const createIndexMap = (json) => {
        const iMap = {};
        json.map((el, index) => {
            iMap[el.id] = index;
        });

        return iMap;
    };

    /**
     * Validates and turn json into string
     * @param {String} json string
     */
    const validate = (json) => {
        let validJson = '';

        try {
            validJson = JSON.stringify(json, null, 2);
        } catch (e) {
            throw e;
        }

        return validJson;
    };

    /**
     * Get subarray with data from the main one
     * @param {Number} start
     * @param {Number} end
     * @returns {Array} - array o objects
     */
    const _fetchData = (start, end) => {
        const arr = [];
        let i = start;

        for (i; i < end; i++) {
            if (!json[i]) break;
            arr.push(json[i]);
        }

        return arr;
    };

    init();

    return {
        __proto__: null,
        init: init,
        fetchDataFromIndex: fetchDataFromIndex,
        getData: getData,
        addData: addData,
        updateData: updateData,
        size: () => size,
    };
});
