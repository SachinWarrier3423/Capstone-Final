import { NextResponse } from "next/server"

// This would typically come from your MongoDB database
const mockThreats = [
  {
    id: "1",
    name: "Command & Scripting Interpreter",
    severity: "Critical",
    category: "TTP",
    lastSeen: "2023-04-15",
    affectedSystems: 120,
    description: "Adversaries may abuse command and script interpreters to execute commands, scripts, or binaries.",
  },
  {
    id: "2",
    name: "Phishing Campaign - Finance Department",
    severity: "High",
    category: "Campaign",
    lastSeen: "2023-04-10",
    affectedSystems: 45,
    description: "Targeted phishing campaign against finance department employees with malicious attachments.",
  },
  {
    id: "3",
    name: "APT29 Activity",
    severity: "Critical",
    category: "Actor",
    lastSeen: "2023-04-05",
    affectedSystems: 78,
    description: "Observed activity matching known APT29 tactics, techniques, and procedures.",
  },
  {
    id: "4",
    name: "Unpatched Log4j Vulnerability",
    severity: "Critical",
    category: "Vulnerability",
    lastSeen: "2023-04-12",
    affectedSystems: 230,
    description: "Multiple systems with unpatched Log4j vulnerabilities (CVE-2021-44228).",
  },
  {
    id: "5",
    name: "Suspicious PowerShell Activity",
    severity: "Medium",
    category: "TTP",
    lastSeen: "2023-04-08",
    affectedSystems: 15,
    description: "Unusual PowerShell commands observed across multiple endpoints.",
  },
]

export async function GET() {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({ threats: mockThreats })
}
