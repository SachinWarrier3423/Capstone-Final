"use client"

import { useState, useEffect } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { SeverityBadge } from "@/components/dashboard/severity-badge"
import { Zap } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ActiveThreat {
  id: string
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  source: string
  detectedAt: string
}

export function ActiveThreats() {
  const [isLoading, setIsLoading] = useState(true)
  const [threats, setThreats] = useState<ActiveThreat[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1700))

        setThreats([
          {
            id: "1",
            name: "Suspicious PowerShell Activity",
            severity: "High",
            source: "Endpoint 192.168.1.45",
            detectedAt: "10 minutes ago",
          },
          {
            id: "2",
            name: "Brute Force Authentication Attempt",
            severity: "Critical",
            source: "Firewall",
            detectedAt: "25 minutes ago",
          },
          {
            id: "3",
            name: "Unusual Network Traffic",
            severity: "Medium",
            source: "Network Sensor",
            detectedAt: "1 hour ago",
          },
          {
            id: "4",
            name: "Potential Data Exfiltration",
            severity: "High",
            source: "DLP System",
            detectedAt: "2 hours ago",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <StatusCard title="Active Threats" icon={<Zap className="h-4 w-4" />}>
      <div className="space-y-3">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-3 rounded-md border border-white/5">
                  <div className="flex justify-between mb-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))
          : threats.map((threat) => (
              <div
                key={threat.id}
                className="p-3 rounded-md border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-sm">{threat.name}</div>
                  <SeverityBadge severity={threat.severity} />
                </div>
                <div className="text-xs text-muted-foreground">
                  <div>{threat.source}</div>
                  <div>{threat.detectedAt}</div>
                </div>
              </div>
            ))}
      </div>
    </StatusCard>
  )
}
