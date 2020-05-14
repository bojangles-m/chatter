const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

module.exports = Mongoose.model('Book', BookSchema);
