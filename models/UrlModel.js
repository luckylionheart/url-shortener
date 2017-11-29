const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlModel = new Schema(
  {
    original: { type: String },
    shortened: { type: [Number] }
  }
);

module.exports = mongoose.model('URL', UrlModel);