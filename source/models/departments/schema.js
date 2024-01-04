const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    designations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Designation",
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.index({ name: 1, designations: 1 }); // Compound index on name and designations

const Department = model("Department", schema);

module.exports = Department;
