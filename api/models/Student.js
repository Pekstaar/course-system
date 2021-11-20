const mongoose = require("mongoose");
// const User = require("./User");

const StudentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["active", "pending", "suspended", "discontinued"],
    default: "pending",
    required: true,
  },
  dob: {
    type: Date,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    // required: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
