import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()
    // Aggregate threats by country
    const threats = await Threat.find()
    const countryMap = new Map()
    threats.forEach((threat) => {
      const country = threat.country || "Unknown"
      countryMap.set(country, (countryMap.get(country) || 0) + 1)
    })
    // Convert to array and sort by count
    const result = Array.from(countryMap.entries())
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error aggregating hosts by country:", error)
    return NextResponse.json({ error: "Failed to fetch hosts by country" }, { status: 500 })
  }
}
