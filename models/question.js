const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
  image: String, // optional image
});

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    options: [optionSchema],
    explanation: String,
    tags: [String],
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = { Question };
