const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readSchema = Schema({
    bookTitle:{
        type: String,
        required: true
    },
    bookAuthorLastName:{
        type: String,
        required: true
    },
    bookAuthorFirstName:{
        type: String,
        required: true
    },
    bookRating:{
        type: Number,
        default: null
    },
    bookReview:{
        type: String,
        default: ""
    },
    bookCompletion:{
        type: Boolean,
        required: true
    },
    bookReader:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Read', readSchema);