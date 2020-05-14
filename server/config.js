const PORT = 3000;
const HOST = 'localhost';

const mongodb = {
    PORT: 27017,
    HOST: HOST,
    DB: 'chat',
};

module.exports = {
    PORT: PORT,
    MONGO_URI: `mongodb://${mongodb.HOST}:${mongodb.PORT}/${mongodb.DB}`,
};
