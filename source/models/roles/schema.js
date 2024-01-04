const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.index({ name: 1, permissions: 1 });

const Role = model("Role", schema);

module.exports = Role;
