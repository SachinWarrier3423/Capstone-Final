const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  message: String,             // descriptive alert text
  level: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  relatedIP: String,           // the IP this alert refers to
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);
