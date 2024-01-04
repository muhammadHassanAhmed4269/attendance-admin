const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.index({ name: 1, roles: 1 }); // Compound index on name and roles

const Designation = model("Designation", schema);

module.exports = Designation;
