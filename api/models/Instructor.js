const mongoose = require("mongoose");
// const User = require("./User");

const InstructorSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "pending", "suspended", "discontinued"],
    default: "pending",
    required: true,
  },
  units: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
  ],
});

module.exports = mongoose.model("Instructor", InstructorSchema);
