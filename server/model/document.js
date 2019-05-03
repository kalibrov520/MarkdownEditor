const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Document', documentSchema);
