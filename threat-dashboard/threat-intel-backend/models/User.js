import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "analyst", "viewer"], default: "viewer" }
});

export const User = mongoose.model("User", userSchema);
