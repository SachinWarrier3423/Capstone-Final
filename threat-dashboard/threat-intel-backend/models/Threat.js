import mongoose from "mongoose";

const threatSchema = new mongoose.Schema({
  ip: String,                  // the IP you queried
  domain: String,              // optional: if you query domains
  source: String,              // e.g. "VirusTotal", "OTX", etc.
  data: mongoose.Schema.Types.Mixed, // full raw JSON response
  date: { type: Date, default: Date.now }
});

export const Threat = mongoose.model("Threat", threatSchema);
