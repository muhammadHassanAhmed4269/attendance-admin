const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

schema.index({ name: 1 });

const Permission = model("Permission", schema);

module.exports = Permission;
