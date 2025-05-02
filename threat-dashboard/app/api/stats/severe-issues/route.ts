import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()
    const severe = await Threat.find({ severity: { $in: ["Critical", "High"] } })
      .sort({ timestamp: -1 })
      .limit(5)
    const formatted = severe.map((issue) => ({
      id: issue._id,
      title: issue.title || issue.name || "Unknown Issue",
      severity: issue.severity,
      timestamp: issue.timestamp
    }))
    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch severe issues" }, { status: 500 })
  }
}
