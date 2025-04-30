"use client"

import { useState, useEffect } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { SeverityBadge } from "@/components/dashboard/severity-badge"
import { AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Issue {
  id: string
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  duration: string
}

export function SevereIssues() {
  const [isLoading, setIsLoading] = useState(true)
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/severe-issues')
        // const data = await response.json()

        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setIssues([
          { id: "1", name: "Secure file transfer appliance", severity: "Critical", duration: "SEEN FOR 6 MONTHS" },
          { id: "2", name: "Dashboard Name Eleifend eget", severity: "Critical", duration: "SEEN FOR 6 MONTHS" },
          { id: "3", name: "Secure file", severity: "Critical", duration: "SEEN FOR 6 MONTHS" },
          { id: "4", name: "Secure file", severity: "High", duration: "SEEN FOR 6 MONTHS" },
          { id: "5", name: "Secure file", severity: "High", duration: "SEEN FOR 6 MONTHS" },
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
    <StatusCard title="Most Severe Issues" icon={<AlertTriangle className="h-4 w-4" />}>
      <div className="space-y-2">
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2">
                  <Skeleton className="h-4 w-[180px]" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))
          : issues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="text-sm">{issue.name}</div>
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={issue.severity} />
                  <span className="text-xs text-muted-foreground">{issue.duration}</span>
                </div>
              </div>
            ))}
      </div>
    </StatusCard>
  )
}
