const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    timings: {
      start: { type: String, required: true },
      end: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Shift = model("Shift", schema);

module.exports = Shift;
