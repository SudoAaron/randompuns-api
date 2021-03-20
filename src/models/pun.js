const mongoose = require('mongoose');

const punSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: [true, 'Title is required.'],
        trim: true
    },
    "setUp": {
        type: String,
        required: ['true', 'Set-up is required.'],
        trim: true
    },
    "punchline": {
        type: String,
        trim: true
    },
    "author": {
        type: String,
        required: ['true', 'Author name is required.'],
        trim: true
    },
    "approved": {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Pun = mongoose.model('Pun', punSchema);

module.exports = Pun;