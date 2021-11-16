const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const FacultySchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  schools: [
    {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  ],
});

module.exports = model("Faculty", FacultySchema);
