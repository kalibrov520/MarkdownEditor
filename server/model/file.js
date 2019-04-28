const mongoose = require('mongoose');

const fileModel = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now,
        required: true
    },
    content:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('File', fileModel);