const express = require("express");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateTestResults,
  joinSeries,
} = require("../controllers/userController");

const router = express.Router();

// User Registration
router.post("/register", createUser);

// User Login
router.post("/login", loginUser);

// Get All Users
router.get("/", getAllUsers);

// Get User by ID
router.get("/:id", getUser);

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

// Update Test Results
router.put("/update-test-results", updateTestResults);

// Join Series
router.put("/join-series", joinSeries);

module.exports = router;
