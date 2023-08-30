const mongoose = require("mongoose");

const elevatorStatusSchema = new mongoose.Schema({
  elevatorNumber: { type: Number, required: true },
  currentFloor: { type: Number, required: true },
});

module.exports = mongoose.model("elevatorstatus", elevatorStatusSchema);
