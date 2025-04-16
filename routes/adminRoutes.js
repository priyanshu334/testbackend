const express = require("express");
const { signup, login, getProfile } = require("../controllers/adminController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = express.Router();

// Admin signup
router.post("/signup", signup);

// Admin login
router.post("/login", login);

// Get admin profile (protected route)
router.get("/profile", isAuthenticated, getProfile);

module.exports = router;
