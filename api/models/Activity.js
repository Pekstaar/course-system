const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ActivitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  target: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("School", ActivitySchema);
