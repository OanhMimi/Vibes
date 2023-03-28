const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = Schema({
    habitName: {
        type: String,
        required: true
    },
    habitFrequency: {
        type: Number,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Habit', habitSchema);