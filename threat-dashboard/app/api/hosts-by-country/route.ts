import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()
    const hosts = await Threat.aggregate([
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ])
    const formatted = hosts.map((h) => ({ country: h._id || "Unknown", count: h.count }))
    return NextResponse.json(formatted)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hosts by country" }, { status: 500 })
  }
}
