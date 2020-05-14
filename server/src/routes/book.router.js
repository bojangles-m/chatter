const express = require('express');
const BookRouter = express.Router();
const BookModel = require('../models/book.model');
const asw = require('express-async-handler');

// Get all books
BookRouter.get(
    '/',
    asw(async (req, res) => {
        const books = await BookModel.find().sort({ _id: -1 }).exec();

        res.status(200).send({
            success: true,
            data: books,
        });
    }),
);

// Add single Book
BookRouter.post(
    '/',
    asw(async (req, res) => {
        const book = await BookModel.create(req.body);

        res.status(201).send({
            success: true,
            data: book,
            message: 'Book added successfully.',
        });
    }),
);

// Delete single Book
BookRouter.delete(
    '/:id',
    asw(async (req, res) => {
        await BookModel.findByIdAndDelete(req.params.id);

        res.status(200).send({
            success: true,
            message: 'Book deleted successfully',
        });
    }),
);

// Edit Single Book
BookRouter.patch(
    '/:id',
    asw(async (req, res) => {
        const fieldsToUpdate = req.body;
        const book = await BookModel.findByIdAndUpdate(req.params.id, { $set: fieldsToUpdate }, { new: true });
        res.status(200).send({
            success: true,
            data: book,
            message: 'Book updated successfully',
        });
    }),
);

module.exports = BookRouter;
