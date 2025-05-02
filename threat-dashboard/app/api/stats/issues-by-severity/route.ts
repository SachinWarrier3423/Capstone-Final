import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()
    const issuesBySeverity = await Threat.aggregate([
      { $group: { _id: "$severity", count: { $sum: 1 } } }
    ])
    const order = ["Critical", "High", "Medium", "Low", "Info"]
    const formatted = order.map((sev) => ({
      name: sev,
      value: issuesBySeverity.find((i) => i._id === sev)?.count || 0
    }))
    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch issues by severity" }, { status: 500 })
  }
}
