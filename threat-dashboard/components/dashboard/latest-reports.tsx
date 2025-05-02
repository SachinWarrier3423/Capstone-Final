"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface Report {
  id: string
  title: string
  category: string
  timestamp: string
}

export function LatestReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/reports`)
        if (Array.isArray(response.data)) {
          setReports(response.data.slice(0, 5))
        }
      } catch (err) {
        // Dummy data fallback
        setReports([
          { id: "1", title: "Weekly Threat Report", category: "Security", timestamp: "2025-04-28T00:00:00Z" },
          { id: "2", title: "Phishing Campaign Analysis", category: "Email", timestamp: "2025-04-27T00:00:00Z" },
          { id: "3", title: "Ransomware Trends", category: "Malware", timestamp: "2025-04-26T00:00:00Z" },
          { id: "4", title: "Vulnerability Assessment", category: "Network", timestamp: "2025-04-25T00:00:00Z" },
          { id: "5", title: "Incident Response Summary", category: "Incident", timestamp: "2025-04-24T00:00:00Z" },
        ])
        setError("Error loading reports. Showing sample data.")
        console.error("Error loading reports:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Latest Reports</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{report.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {report.category}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(report.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No reports available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}