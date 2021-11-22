const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AssignmentSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "Unit",
  },
  description: {
    type: String,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
  },
  deadline: {
    type: Date,
    required: true,
  },
  submissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "AssignmentSubmits",
    },
  ],
  attachments: [
    {
      type: String,
    },
  ],
});

module.exports = model("Assignment", AssignmentSchema);
