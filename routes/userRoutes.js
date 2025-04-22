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

const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", createUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/", isAuthenticated, getAllUsers);
router.get("/:id", isAuthenticated, getUser);
router.put("/:id", isAuthenticated, updateUser);
router.delete("/:id", isAuthenticated, deleteUser);

// Feature Routes
router.put("/update-test-results", isAuthenticated, updateTestResults);
router.post("/join-series", isAuthenticated, joinSeries); // Changed to POST
