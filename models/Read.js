const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readSchema = Schema({
    bookTitle:{
        type: String,
        required: true
    },
    bookAuthor:{
        type: String,
        required: true
    }
    bookSummary:{
        type: String
    },
    bookRating:{
        type: int
    },
    bookReview:{
        type: String
    },
    bookCompletion:{
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Read', readSchema);