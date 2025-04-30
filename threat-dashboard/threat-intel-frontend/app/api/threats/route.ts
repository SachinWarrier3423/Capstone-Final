import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()
    const threats = await Threat.find({}).sort({ severity: 1, lastSeen: -1 }).limit(10)

    return NextResponse.json({ threats })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch threats" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectToDatabase()

    const newThreat = new Threat(body)
    await newThreat.save()

    return NextResponse.json({ success: true, threat: newThreat })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create threat" }, { status: 500 })
  }
}
