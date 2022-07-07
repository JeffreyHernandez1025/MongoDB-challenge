const mongoose = require('mongoose');

const Journal = new mongoose.Schema({
  title: String,
  content: String,
}, {timestamps: true})

const journalModel = mongoose.model('journals-scla-challenge', Journal);

module.exports = journalModel;