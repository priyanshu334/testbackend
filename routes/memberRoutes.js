const express = require("express");
const { signup, login, getProfile } = require("../controllers/member.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const router = express.Router();

// Member signup
router.post("/signup", signup);

// Member login
router.post("/login", login);

// Get member profile (protected route)
router.get("/profile", isAuthenticated, getProfile);

module.exports = router;
