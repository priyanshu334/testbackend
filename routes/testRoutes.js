const express = require("express");
const {
  createTest,
  getAllTests,
  getTest,
  updateTest,
  deleteTest,
  getTestsBySeries,
} = require("../controllers/test.controller");

const router = express.Router();

// Create Test
router.post("/create", createTest);

// Get All Tests
router.get("/", getAllTests);

// Get Single Test
router.get("/:id", getTest);

// Update Test
router.put("/:id", updateTest);

// Delete Test
router.delete("/:id", deleteTest);

// Get Tests by Series
router.get("/series/:seriesId", getTestsBySeries);

module.exports = router;
