const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  steps: {
    type: [String],
    required: true,
  },
});

const Instruction = mongoose.model("Instruction", instructionSchema);

module.exports = Instruction;
