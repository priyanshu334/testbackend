const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a User
const createUser = async (req, res) => {
  const { fullName, phone, password, goal, referralCode } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User with this phone already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      fullName,
      phone,
      password: hashedPassword,
      goal,
      referralCode,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
    const { phone, password } = req.body;
  
    try {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, "your_jwt_secret", { expiresIn: "1h" });
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging in", error: err.message });
    }
  };

  
  // Get All Users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().populate("testsGiven.testId").populate("seriesJoined.seriesId");
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching users", error: err.message });
    }
  };

  // Get User by ID
const getUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id).populate("testsGiven.testId").populate("seriesJoined.seriesId");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching user", error: err.message });
    }
  };

  // Update User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullName, goal, referralCode } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { fullName, goal, referralCode },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating user", error: err.message });
    }
  };

  // Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting user", error: err.message });
    }
  };

  // Update Test Results
const updateTestResults = async (req, res) => {
    const { userId, testId, score, totalMarks, timeTaken } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update or add test result
      const testResultIndex = user.testsGiven.findIndex(test => test.testId.toString() === testId);
      
      if (testResultIndex >= 0) {
        user.testsGiven[testResultIndex] = { testId, score, totalMarks, timeTaken };
      } else {
        user.testsGiven.push({ testId, score, totalMarks, timeTaken });
      }
  
      user.totalTestsGiven += 1;
      user.totalMarksObtained += score;
  
      await user.save();
      res.status(200).json({ message: "Test results updated successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating test results", error: err.message });
    }
  };

  // Join Series
const joinSeries = async (req, res) => {
    const { userId, seriesId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Prevent duplicate joining of the same series
      const isAlreadyJoined = user.seriesJoined.some(series => series.seriesId.toString() === seriesId);
      
      if (isAlreadyJoined) {
        return res.status(400).json({ message: "User already joined this series" });
      }
  
      user.seriesJoined.push({ seriesId });
      user.totalSeriesJoined += 1;
  
      await user.save();
      res.status(200).json({ message: "Series joined successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error joining series", error: err.message });
    }
  };

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updateTestResults,
    joinSeries
}