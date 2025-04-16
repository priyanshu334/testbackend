const Series = require("../models/series");
const User = require("../models/user"); // For creating series by a user

// Create Series
const createSeries = async (req, res) => {
  const { title, description, tests, price, createdBy, startDate, endDate } = req.body;

  try {
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newSeries = new Series({
      title,
      description,
      tests,
      price,
      createdBy,
      startDate,  // Adding startDate to the new Series
      endDate,    // Adding endDate to the new Series
    });

    await newSeries.save();
    res.status(201).json({ message: "Series created successfully", series: newSeries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating series", error: err.message });
  }
};

// Get All Series
const getAllSeries = async (req, res) => {
  try {
    const series = await Series.find().populate("tests").populate("createdBy");
    res.status(200).json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching series", error: err.message });
  }
};

// Get Single Series
const getSeries = async (req, res) => {
  const { id } = req.params;

  try {
    const series = await Series.findById(id).populate("tests").populate("createdBy");
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }
    res.status(200).json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching series", error: err.message });
  }
};

// Update Series
const updateSeries = async (req, res) => {
  const { id } = req.params;
  const { title, description, tests, price, createdBy, startDate, endDate } = req.body;

  try {
    const updatedSeries = await Series.findByIdAndUpdate(
      id,
      { title, description, tests, price, createdBy, startDate, endDate },
      { new: true }
    ).populate("tests").populate("createdBy");

    if (!updatedSeries) {
      return res.status(404).json({ message: "Series not found" });
    }

    res.status(200).json({ message: "Series updated successfully", series: updatedSeries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating series", error: err.message });
  }
};

// Delete Series
const deleteSeries = async (req, res) => {
  const { id } = req.params;

  try {
    const series = await Series.findByIdAndDelete(id);
    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }
    res.status(200).json({ message: "Series deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting series", error: err.message });
  }
};

module.exports = {
  createSeries,
  getAllSeries,
  getSeries,
  updateSeries,
  deleteSeries
};
