const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

schema.index({ name: 1 });

const Holiday = model("Holiday", schema);

module.exports = Holiday;
