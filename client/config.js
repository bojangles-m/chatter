const client = {
    PORT: 9000,
    HOST: '0.0.0.0',
};
const server = {
    PORT: 3000,
    HOST: 'localhost',
};

const file = 'json/conv-full.json';
// const file = 'json/conv-some.json';
// const file = 'json/conv-empty.json';

const app = {
    showId: true,
    LOCALSTORAGE_KEY: 'ChatterData',
    file: file,

    dateFormat: {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: 'ddd, D MMM',
        sameElse: 'ddd, D MMM',
    },

    maxItems: 50, // Limit of the frame
    maxFetch: 10, // max to fetch
    maxDiff: 10, // Button is visible when more then 10 messages

    LS_SETTINGS_KEY: 'ChatterSettings',
    settings: {
        idVisible: false,
    },
};

module.exports = {
    PORT: client.PORT,
    HOST: client.HOST,
    SERVER_URI: `http://${server.HOST}:${server.PORT}`,

    app: app,
};
