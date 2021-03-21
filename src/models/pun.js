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
    "submittedBy": {
        type: String,
        required: ['true', 'Submitted by name is required.'],
        trim: true
    },
    "approved": {
        type: Boolean,
        default: false
    },
    "likes": {
        type: Number,
        default: 0
    },
    "dislikes": {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const Pun = mongoose.model('Pun', punSchema);

module.exports = Pun;