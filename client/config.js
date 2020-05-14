const client = {
    PORT: 9000,
    // because it is docker-machine used
    HOST: '0.0.0.0',
};
const server = {
    PORT: 3000,
    HOST: 'localhost',
};

module.exports = {
    PORT: client.PORT,
    HOST: client.HOST,
    SERVER_URI: `http://${server.HOST}:${server.PORT}`,
};
