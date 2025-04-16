const express = require("express");
const {
  createSeries,
  getAllSeries,
  getSeries,
  updateSeries,
  deleteSeries,
} = require("../controllers/series.controller");

const router = express.Router();

// Create Series
router.post("/create", createSeries);

// Get All Series
router.get("/", getAllSeries);

// Get Single Series
router.get("/:id", getSeries);

// Update Series
router.put("/:id", updateSeries);

// Delete Series
router.delete("/:id", deleteSeries);

module.exports = router;
