"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { SeverityBadge } from "./severity-badge"

interface Threat {
  id: string
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  timestamp: string
}

export function ActiveThreats() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/active-threats`)
        
        if (Array.isArray(response.data)) {
          const formattedThreats = response.data
            .slice(0, 5)
            .map((threat: any) => ({
              id: threat.id || Math.random().toString(),
              name: threat.message || "Unknown Threat",
              severity: threat.severity || "Medium",
              timestamp: new Date(threat.timestamp).toLocaleString()
            }))
          setThreats(formattedThreats)
        }
        setError("")
      } catch (err) {
        // Dummy data fallback
        setThreats([
          { id: "1", name: "Suspicious Login Attempt", severity: "High", timestamp: "2025-05-01 10:00" },
          { id: "2", name: "Malware Detected", severity: "Critical", timestamp: "2025-05-01 09:30" },
          { id: "3", name: "Phishing Email", severity: "Medium", timestamp: "2025-05-01 08:45" },
          { id: "4", name: "Unauthorized Access", severity: "High", timestamp: "2025-05-01 08:00" },
          { id: "5", name: "Data Exfiltration", severity: "Critical", timestamp: "2025-05-01 07:15" },
        ])
        setError("Error loading threats. Showing sample data.")
        console.error("Error loading active threats:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : threats.length > 0 ? (
          <div className="space-y-4">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{threat.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {threat.timestamp}
                  </span>
                </div>
                <SeverityBadge severity={threat.severity} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No active threats</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}