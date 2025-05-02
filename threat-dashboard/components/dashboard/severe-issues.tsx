"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { SeverityBadge } from "./severity-badge"

interface Issue {
  id: string
  title: string
  severity: "Critical" | "High"
  timestamp: string
}

export function SevereIssues() {
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/threats/severe-issues`)
        if (Array.isArray(response.data)) {
          setIssues(response.data.slice(0, 5))
        }
      } catch (err) {
        // Dummy data fallback
        setIssues([
          { id: "1", title: "Critical RCE Vulnerability", severity: "Critical", timestamp: "2025-05-01 10:00" },
          { id: "2", title: "High Privilege Escalation", severity: "High", timestamp: "2025-05-01 09:30" },
          { id: "3", title: "Critical SQL Injection", severity: "Critical", timestamp: "2025-05-01 08:45" },
          { id: "4", title: "High Data Leak", severity: "High", timestamp: "2025-05-01 08:00" },
          { id: "5", title: "Critical Malware Outbreak", severity: "Critical", timestamp: "2025-05-01 07:15" },
        ])
        console.error("Error loading severe issues:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Severe Issues</CardTitle>
        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {issues.length > 0 ? (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{issue.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(issue.timestamp).toLocaleString()}
                  </span>
                </div>
                <SeverityBadge severity={issue.severity} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No severe issues found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}