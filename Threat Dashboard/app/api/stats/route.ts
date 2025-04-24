import { NextResponse } from "next/server"

// This would typically come from your MongoDB database
const mockStats = {
  totalIssues: 234,
  issuesByStatus: {
    open: 120,
    inProgress: 80,
    closed: 34,
  },
  issuesBySeverity: {
    critical: 45,
    high: 75,
    medium: 60,
    low: 54,
  },
  hostsByCountry: {
    US: 50000,
    Canada: 25000,
    Kosovo: 15000,
    China: 10000,
    Belgium: 7500,
    Germany: 5000,
  },
  topThreats: {
    ttps: [
      { id: "1", rank: 1, name: "Command & Scripting Interpreter" },
      { id: "2", rank: 2, name: "Event Triggered Execution: Accessibility Features" },
      { id: "3", rank: 3, name: "File & Directory Permissions Modification" },
    ],
    actors: [
      { id: "1", rank: 1, name: "APT38", country: "RU" },
      { id: "2", rank: 2, name: "APT29", country: "RU" },
      { id: "3", rank: 3, name: "APT98", country: "CN" },
    ],
  },
  recentAlerts: 12,
  systemStatus: "operational",
}

export async function GET() {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(mockStats)
}
