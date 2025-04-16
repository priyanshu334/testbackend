const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models/admin");

// SIGNUP: Admin signup function
const signup = async (req, res) => {
  const { adminId, fullName, phone, password } = req.body;

  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ adminId });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      adminId,
      fullName,
      phone,
      password: hashedPassword,
    });

    // Save to DB
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup", error: err.message });
  }
};

// LOGIN: Admin login function
const login = async (req, res) => {
  const { adminId, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { adminId: admin.adminId, fullName: admin.fullName, role: admin.role },
      process.env.JWT_SECRET || "your_secret_key", // Use your secret key for JWT
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login", error: err.message });
  }
};

// GET PROFILE: To fetch logged-in admin's profile details (optional but useful)
const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.adminId); // Access user from token
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

module.exports = { signup, login, getProfile };
