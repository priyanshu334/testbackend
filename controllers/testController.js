const Test = require("../models/test");
const { Question } = require("../models/question");

// Create Test
const createTest = async (req, res) => {
  const { title, description, questions, isExample, price, series, instructions } = req.body;

  try {
    const newTest = new Test({
      title,
      description,
      questions,
      isExample,
      price,
      series,
      instructions,
    });

    await newTest.save();
    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating test", error: err.message });
  }
};

// Get All Tests
const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate("questions").populate("series");
    res.status(200).json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tests", error: err.message });
  }
};

// Get Single Test
const getTest = async (req, res) => {
  const { id } = req.params;

  try {
    const test = await Test.findById(id).populate("questions").populate("series");
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching test", error: err.message });
  }
};

// Update Test
const updateTest = async (req, res) => {
  const { id } = req.params;
  const { title, description, questions, isExample, price, series, instructions } = req.body;

  try {
    const updatedTest = await Test.findByIdAndUpdate(
      id,
      { title, description, questions, isExample, price, series, instructions },
      { new: true }
    ).populate("questions").populate("series");

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test updated successfully", test: updatedTest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating test", error: err.message });
  }
};

// Delete Test
const deleteTest = async (req, res) => {
  const { id } = req.params;

  try {
    const test = await Test.findByIdAndDelete(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting test", error: err.message });
  }
};

// Get Tests by Series
const getTestsBySeries = async (req, res) => {
  const { seriesId } = req.params;

  try {
    const tests = await Test.find({ series: seriesId }).populate("questions").populate("series");
    if (tests.length === 0) {
      return res.status(404).json({ message: "No tests found for this series" });
    }
    res.status(200).json(tests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tests", error: err.message });
  }
};

module.exports = {
  createTest,
  getAllTests,
  getTest,
  updateTest,
  deleteTest,
  getTestsBySeries,
};
