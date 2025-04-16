const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: String,
  image: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  text: String,
  image: String,
  options: [optionSchema],
  explanation: String,
  tags: [String],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
