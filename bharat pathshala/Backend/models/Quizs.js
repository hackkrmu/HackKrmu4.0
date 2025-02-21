const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: String,
  score: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', quizSchema);