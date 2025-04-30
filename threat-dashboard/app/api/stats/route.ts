import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/db/mongodb"
import Threat from "@/models/Threat"

export async function GET() {
  try {
    await connectToDatabase()

    // Get total issues count
    const totalIssues = await Threat.countDocuments()

    // Get issues by status
    const issuesByStatus = await Threat.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ])

    // Get issues by severity
    const issuesBySeverity = await Threat.aggregate([
      {
        $group: {
          _id: "$severity",
          count: { $sum: 1 },
        },
      },
    ])

    // Format the data for the frontend
    const formattedIssuesByStatus = {
      open: issuesByStatus.find((item) => item._id === "open")?.count || 0,
      inProgress: issuesByStatus.find((item) => item._id === "in-progress")?.count || 0,
      closed: issuesByStatus.find((item) => item._id === "closed")?.count || 0,
    }

    const formattedIssuesBySeverity = {
      critical: issuesBySeverity.find((item) => item._id === "Critical")?.count || 0,
      high: issuesBySeverity.find((item) => item._id === "High")?.count || 0,
      medium: issuesBySeverity.find((item) => item._id === "Medium")?.count || 0,
      low: issuesBySeverity.find((item) => item._id === "Low")?.count || 0,
      info: issuesBySeverity.find((item) => item._id === "Info")?.count || 0,
    }

    return NextResponse.json({
      totalIssues,
      issuesByStatus: formattedIssuesByStatus,
      issuesBySeverity: formattedIssuesBySeverity,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
