const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  isExample: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  series: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
