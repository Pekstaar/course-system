const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmitSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    grade: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
    attachment: {
      type: String,
    },
  },
  { time: true }
);

module.exports = model("AssignmentSubmits", SubmitSchema);
