const express = require("express");
const {
  createQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/question.controller");

const router = express.Router();

// Create Question
router.post("/create", createQuestion);

// Get All Questions
router.get("/", getAllQuestions);

// Get Single Question
router.get("/:id", getQuestion);

// Update Question
router.put("/:id", updateQuestion);

// Delete Question
router.delete("/:id", deleteQuestion);

module.exports = router;
