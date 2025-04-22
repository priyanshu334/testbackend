const Instruction = require("../models/instruction");
const Test = require("../models/test");

// Create Instruction
const createInstruction = async (req, res) => {
  const { test, steps } = req.body;

  try {
    const existingTest = await Test.findById(test);
    if (!existingTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    const newInstruction = new Instruction({ test, steps });
    await newInstruction.save();

    res.status(201).json({ message: "Instruction created", instruction: newInstruction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating instruction", error: err.message });
  }
};

// Get All Instructions
const getAllInstructions = async (req, res) => {
  try {
    const instructions = await Instruction.find().populate("test");
    res.status(200).json(instructions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching instructions", error: err.message });
  }
};

// Get Instruction By Test ID
const getInstructionByTest = async (req, res) => {
  const { testId } = req.params;

  try {
    const instruction = await Instruction.findOne({ test: testId }).populate("test");

    if (!instruction) {
      return res.status(404).json({ message: "Instruction not found for this test" });
    }

    res.status(200).json(instruction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching instruction", error: err.message });
  }
};

// Update Instruction
const updateInstruction = async (req, res) => {
  const { id } = req.params;
  const { steps } = req.body;

  try {
    const updatedInstruction = await Instruction.findByIdAndUpdate(
      id,
      { steps },
      { new: true }
    ).populate("test");

    if (!updatedInstruction) {
      return res.status(404).json({ message: "Instruction not found" });
    }

    res.status(200).json({ message: "Instruction updated", instruction: updatedInstruction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating instruction", error: err.message });
  }
};

// Delete Instruction
const deleteInstruction = async (req, res) => {
  const { id } = req.params;

  try {
    const instruction = await Instruction.findByIdAndDelete(id);
    if (!instruction) {
      return res.status(404).json({ message: "Instruction not found" });
    }
    res.status(200).json({ message: "Instruction deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting instruction", error: err.message });
  }
};

module.exports = {
  createInstruction,
  getAllInstructions,
  getInstructionByTest,
  updateInstruction,
  deleteInstruction,
};
