const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Department",
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.index({ name: 1, departments: 1 });

const Unit = model("Unit", schema);

module.exports = Unit;
