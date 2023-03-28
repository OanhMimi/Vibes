const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = Schema({
    thoughtTitle:{
        type: String,
        required: true
    },
    thoughtEntry:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Thought', thoughtSchema);