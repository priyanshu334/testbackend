const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  title: String,
  description: String,
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Test" }],
  price: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Series = mongoose.model("Series", seriesSchema);

module.exports = Series;
