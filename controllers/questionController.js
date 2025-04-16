const { Question } = require("../models/question");

// Create Question
const createQuestion = async (req, res) => {
  const { text, image, options, explanation, tags } = req.body;

  try {
    const newQuestion = new Question({
      text,
      image,
      options,
      explanation,
      tags,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully", question: newQuestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating question", error: err.message });
  }
};


// Get All Questions
const getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching questions", error: err.message });
    }
  };

  
  // Get Single Question
const getQuestion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const question = await Question.findById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.status(200).json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching question", error: err.message });
    }
  };

  // Update Question
const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { text, image, options, explanation, tags } = req.body;
  
    try {
      const question = await Question.findByIdAndUpdate(
        id,
        { text, image, options, explanation, tags },
        { new: true }
      );
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.status(200).json({ message: "Question updated successfully", question });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating question", error: err.message });
    }
  };

// Delete Question
const deleteQuestion = async (req, res) => {
    const { id } = req.params;
  
    try {
      const question = await Question.findByIdAndDelete(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.status(200).json({ message: "Question deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting question", error: err.message });
    }
  };

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion
}  