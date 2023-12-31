const mongoose = require("mongoose");

const elevatorActionSchema = new mongoose.Schema({
  elevatorNumber: { type: Number, required: true },
  floor: { type: Number, required: true },
  actionType: { type: String, enum: ["call", "internal"], required: true },
  actionTimestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("elevatoraction", elevatorActionSchema);
