const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AssignmentSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref: "unit",
  },
  deadline: {
    type: Date,
    required,
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

module.exports = model("School", AssignmentSchema);
