const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UnitSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
  },
});

module.exports = model("Unit", UnitSchema);
