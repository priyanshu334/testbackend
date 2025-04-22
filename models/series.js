const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Add this line for the image URL
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Series', seriesSchema);
