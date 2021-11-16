const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmitSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  Faculty: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
  },
  courses: {
    type: Array,
  },
});

module.exports = model("AssignmentSubmits", SubmitSchema);
