const { model, Schema } = require('mongoose');

const { categories } = require('../constants/enums.js');

const noteSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Note must have a name.']
  },
  created: {
    type: Date,
    default: Date.now()
  },
  category: {
    type: String,
    required: true,
    enum: Object.keys(categories)
  },
  content: {
    type: String
  },
  archived: {
    type: Boolean,
    default: false
  }
});

const Note = model('Note', noteSchema);

module.exports = Note;
