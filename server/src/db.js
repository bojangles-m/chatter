const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

// mongoose options
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
};

// connect to mongo DB
mongoose.connect(MONGO_URI, options);

// get connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, `MongoDB Connection Error: ${MONGO_URI}`));
db.once('open', () => console.log(`MongoDB database connection successfully established at: ${MONGO_URI}`));
