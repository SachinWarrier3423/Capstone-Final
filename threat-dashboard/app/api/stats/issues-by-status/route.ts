import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()
    const issuesByStatus = await Threat.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ])
    const formatted = [
      { name: "Open", value: issuesByStatus.find((i) => i._id === "open")?.count || 0 },
      { name: "In Progress", value: issuesByStatus.find((i) => i._id === "in-progress")?.count || 0 },
      { name: "Closed", value: issuesByStatus.find((i) => i._id === "closed")?.count || 0 }
    ]
    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch issues by status" }, { status: 500 })
  }
}
