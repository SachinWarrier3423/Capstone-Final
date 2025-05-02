"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"
import { SeverityBadge } from "./severity-badge"

interface Threat {
  id: string
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  impactScore: number
}

export function TopThreats() {
  const [threats, setThreats] = useState<Threat[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/threats/top`)
        if (Array.isArray(response.data)) {
          setThreats(response.data.slice(0, 5))
        }
      } catch (err) {
        // Dummy data fallback
        setThreats([
          { id: "1", name: "Ransomware", severity: "Critical", impactScore: 95 },
          { id: "2", name: "Phishing", severity: "High", impactScore: 80 },
          { id: "3", name: "Malware", severity: "High", impactScore: 75 },
          { id: "4", name: "DDoS", severity: "Medium", impactScore: 60 },
          { id: "5", name: "Insider Threat", severity: "Medium", impactScore: 55 },
        ])
        console.error("Error loading top threats:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Top Threats</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {threats.length > 0 ? (
          <div className="space-y-4">
            {threats.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{threat.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Impact Score: {threat.impactScore}
                  </span>
                </div>
                <SeverityBadge severity={threat.severity} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No threats found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}