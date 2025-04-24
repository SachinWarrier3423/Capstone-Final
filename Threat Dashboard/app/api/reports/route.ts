import { NextResponse } from "next/server"

// This would typically come from your MongoDB database
const mockReports = [
  {
    id: "1",
    title: "Weekly Intel, May 5th, 2023",
    summary: "Weekly intelligence summary covering major threat actors and campaigns.",
    category: "Executive Perspective",
    publishedAt: "2023-05-05T10:00:00Z",
    author: "Threat Intelligence Team",
  },
  {
    id: "2",
    title: "Seeing Isn't Believing: Leveraging Deepfakes in Phishing Campaigns",
    summary: "Analysis of emerging trend using AI-generated deepfakes in sophisticated phishing campaigns.",
    category: "Trends And Forecasting",
    publishedAt: "2023-05-03T14:30:00Z",
    author: "Advanced Threats Team",
  },
  {
    id: "3",
    title: "Critical Vulnerability in OpenSSL (CVE-2023-XXXX)",
    summary: "Technical analysis of recently disclosed OpenSSL vulnerability with high exploitation potential.",
    category: "Vulnerability",
    publishedAt: "2023-05-02T09:15:00Z",
    author: "Vulnerability Research Team",
  },
  {
    id: "4",
    title: "TrickBot Evolution: New Modules and Capabilities",
    summary: "Updated analysis of TrickBot malware showing significant evolution in capabilities and targeting.",
    category: "Malware Analysis",
    publishedAt: "2023-04-28T11:45:00Z",
    author: "Malware Analysis Team",
  },
  {
    id: "5",
    title: "APT38 Campaign Targeting Financial Institutions",
    summary: "Detailed report on recent APT38 campaign targeting financial institutions in Southeast Asia.",
    category: "Threat Actor",
    publishedAt: "2023-04-25T16:20:00Z",
    author: "Advanced Persistent Threats Team",
  },
]

export async function GET() {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 400))

  return NextResponse.json({ reports: mockReports })
}
