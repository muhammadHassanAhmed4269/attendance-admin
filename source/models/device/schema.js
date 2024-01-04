const { Schema, model } = require("mongoose");

const schema = new Schema({
  id: { type: String, trim: true, required: true, unique: true }, // Adding unique constraint
  employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    trim: true,
    required: true,
  },
});

const Device = model("Device", schema);

module.exports = Device;
