require('../../models/Read');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User')
const {requireUser} = require('../../config/passport');
const Read = require('../../models/Read');
const validateReadInput = require('../../validation/Read')

//create a new book entry
router.post('/create', requireUser, validateReadInput, async (req, res, next) => {
  try {
    const newRead = new Read({
      bookReader: req.user.userId,
      bookTitle: req.body.bookTitle,
      bookAuthorLastName: req.body.bookAuthorLastName,
      bookAuthorFirstName: req.body.bookAuthorFirstName,
      bookRating: req.body.bookRating,
      bookReview: req.body.bookReview,
      bookCompletion: req.body.bookCompletion
    });
    let read = await newRead.save();
    return res.json(read);
  } catch (err) {
    next(err);
  }
});

//return all the book the user is reading/finished reading
router.get('/', requireUser, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const reads = await Read.find({ bookReader: userId });
    return res.json(reads);
  } catch (err) {
    next(err);
  }
});

//update book
router.put('/:id', requireUser, async (req, res, next) => {
  try {
    const readId = req.params.id;
    const userId = req.user.userId;

    const read = await Read.findOneAndUpdate(
      { _id: readId, bookReader: userId }, // Find the Read document by its _id and bookReader fields
      { $set: req.body }, // Set the fields to update based on the request body
      { new: true } // Return the updated document
    );

    if (!read) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(read);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

