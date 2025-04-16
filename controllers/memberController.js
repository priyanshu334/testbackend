const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Member } = require("../models/member");

// SIGNUP: Member signup function
const signup = async (req, res) => {
  const { memberId, fullName, phone, password } = req.body;

  try {
    // Check if member already exists
    const existingMember = await Member.findOne({ memberId });
    if (existingMember) {
      return res.status(400).json({ message: "Member already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new member
    const newMember = new Member({
      memberId,
      fullName,
      phone,
      password: hashedPassword,
    });

    // Save to DB
    await newMember.save();
    res.status(201).json({ message: "Member created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during signup", error: err.message });
  }
};

// LOGIN: Member login function
const login = async (req, res) => {
  const { memberId, password } = req.body;

  try {
    // Check if member exists
    const member = await Member.findOne({ memberId });
    if (!member) {
      return res.status(400).json({ message: "Member not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { memberId: member.memberId, fullName: member.fullName, role: member.role },
      process.env.JWT_SECRET || "your_secret_key", // Use your secret key for JWT
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login", error: err.message });
  }
};

// GET PROFILE: To fetch logged-in member's profile details (optional but useful)
const getProfile = async (req, res) => {
  try {
    const member = await Member.findById(req.user.memberId); // Access user from token
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

module.exports = { signup, login, getProfile };
