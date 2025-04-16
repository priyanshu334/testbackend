const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    fullName: String,
    phone: { type: String, unique: true },
    password: String,
    goal: String,
    referralCode: String,
    money: { type: Number, default: 0 },
    role: { type: String, default: "user" },

    testsGiven: [
      {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        score: Number,
        totalMarks: Number,
        timeTaken: Number,
        attemptDate: { type: Date, default: Date.now },
        // accuracy: Number,
        // answers: [{ questionId, selectedOptions }],
      },
    ],

    seriesJoined: [
      {
        seriesId: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],

    totalTestsGiven: { type: Number, default: 0 },
    totalSeriesJoined: { type: Number, default: 0 },
    totalMarksObtained: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
