import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()
    const threats = await Threat.find({})
      .sort({ impactScore: -1 })
      .limit(5)
    return NextResponse.json(threats)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch top threats" }, { status: 500 })
  }
}
