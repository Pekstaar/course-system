const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
    },
    location: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "admin", "instructor"],
      default: "student",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
