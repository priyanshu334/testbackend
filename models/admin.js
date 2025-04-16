const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminId: { type: String, unique: true },
    fullName: String,
    phone: { type: String, unique: true },
    password: String,
    money: { type: Number, default: 0 },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Admin };
