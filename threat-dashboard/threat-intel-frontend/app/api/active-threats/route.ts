import { NextResponse } from "next/server"

// This would typically come from your MongoDB database
const mockActiveThreats = [
  {
    id: "1",
    name: "Suspicious PowerShell Activity",
    severity: "High",
    source: "Endpoint 192.168.1.45",
    detectedAt: "2023-05-05T10:30:00Z",
    status: "Investigating",
    details: "PowerShell script attempting to disable security features and establish persistence.",
  },
  {
    id: "2",
    name: "Brute Force Authentication Attempt",
    severity: "Critical",
    source: "Firewall",
    detectedAt: "2023-05-05T10:15:00Z",
    status: "Mitigating",
    details: "Multiple failed login attempts from IP range 203.0.113.0/24 targeting admin accounts.",
  },
  {
    id: "3",
    name: "Unusual Network Traffic",
    severity: "Medium",
    source: "Network Sensor",
    detectedAt: "2023-05-05T09:45:00Z",
    status: "Investigating",
    details: "Abnormal data transfer patterns detected to external IP 198.51.100.123 on non-standard ports.",
  },
  {
    id: "4",
    name: "Potential Data Exfiltration",
    severity: "High",
    source: "DLP System",
    detectedAt: "2023-05-05T09:00:00Z",
    status: "Contained",
    details: "Large volume of sensitive data being uploaded to unauthorized cloud storage service.",
  },
]

export async function GET() {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 450))

  return NextResponse.json({ threats: mockActiveThreats })
}
