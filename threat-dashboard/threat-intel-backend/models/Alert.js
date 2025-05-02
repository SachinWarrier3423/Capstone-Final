import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  message: String,             // descriptive alert text
  severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Low" },
  source: String,             // where this alert came from
  timestamp: { type: Date, default: Date.now }
});

export const Alert = mongoose.model("Alert", alertSchema);
