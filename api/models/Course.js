const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CourseSchema = new Schema({
  code: {
    type: String,
    required: true,
    uniquie: true,
  },
  name: {
    type: String,
    required: true,
    uniquie: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
  },
  units: [
    {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
  ],
});

module.exports = model("Course", CourseSchema);
