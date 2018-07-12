const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['css', 'javascript']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Snippet = mongoose.model('Snippet', snippetSchema)

module.exports = Snippet;
