require('../../models/Read');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Read = mongoose.model('Read');

router.get('/', async(req, res, next) => {
    currentUser = req.user
    const Reads = await Reads.find()
      res.json(Reads)
    });