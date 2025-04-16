const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    memberId: { type: String, unique: true },
    fullName: String,
    phone: { type: String, unique: true },
    password: String,
    money: { type: Number, default: 0 },
    referralCode: String,
    role: { type: String, default: "member" },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = { Member };
