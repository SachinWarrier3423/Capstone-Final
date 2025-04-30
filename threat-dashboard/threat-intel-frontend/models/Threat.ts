import mongoose, { Schema, type Document } from "mongoose"

export interface IThreat extends Document {
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  category: string
  status: "open" | "in-progress" | "closed"
  lastSeen: Date
  affectedSystems: number
  description: string
  createdAt: Date
  updatedAt: Date
}

const ThreatSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low", "Info"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed"],
      default: "open",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    affectedSystems: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Threat || mongoose.model<IThreat>("Threat", ThreatSchema)
