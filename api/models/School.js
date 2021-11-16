const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SchoolSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
  },
  courses: {
    type: Array,
  },
});

module.exports = model("School", SchoolSchema);
