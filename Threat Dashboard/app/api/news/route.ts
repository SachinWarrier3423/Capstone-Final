import { NextResponse } from "next/server"

// This would typically come from your MongoDB database
const mockNews = [
  {
    id: "1",
    category: "JUDGEMENT WITHHELD",
    title: "Multiple REvil Ransomware Sites Are Down on the Darkweb",
    source: "CNBC",
    date: "2023-04-15",
    url: "https://example.com/news/1",
    summary:
      "Multiple websites associated with the REvil ransomware group have gone offline, sparking speculation about potential law enforcement action.",
  },
  {
    id: "2",
    category: "MEDIA ON-TARGET",
    title: "Connection Discovered Between Chinese Hacker Group APT15 and New Malware Strain",
    source: "INFOSECURITY MAGAZINE",
    date: "2023-04-12",
    url: "https://example.com/news/2",
    summary:
      "Researchers have identified links between APT15 and a previously unattributed malware strain used in recent attacks.",
  },
  {
    id: "3",
    category: "PLAUSIBLE",
    title: "Governments Turn Tables on Ransomware Gang REvil By Pushing It Offline",
    source: "ZDNET",
    date: "2023-04-10",
    url: "https://example.com/news/3",
    summary: "Reports suggest a coordinated effort by multiple governments has disrupted REvil ransomware operations.",
  },
  {
    id: "4",
    category: "MEDIA OFF-TARGET",
    title: "TrickBot Draws on Dyre Code but May Represent Distinct Threat Actor",
    source: "ZDNET",
    date: "2023-04-08",
    url: "https://example.com/news/4",
    summary:
      "Analysis suggests that while TrickBot shares code with Dyre, attribution to the same threat actors may be premature.",
  },
]

export async function GET() {
  // Simulate database latency
  await new Promise((resolve) => setTimeout(resolve, 350))

  return NextResponse.json({ news: mockNews })
}
