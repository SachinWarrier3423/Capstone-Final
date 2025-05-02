"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

interface SeverityData {
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  count: number
}

export function IssuesBySeverity() {
  const [data, setData] = useState<SeverityData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/threats/issues-by-severity`)
        if (Array.isArray(response.data)) {
          setData(response.data)
        }
      } catch (err) {
        // Dummy data fallback
        setData([
          { severity: "Critical", count: 3 },
          { severity: "High", count: 7 },
          { severity: "Medium", count: 12 },
          { severity: "Low", count: 5 },
          { severity: "Info", count: 2 },
        ])
        console.error("Error loading issues by severity:", err)
      }
    }
    fetchData()
  }, [])

  const severityColors = {
    Critical: "text-red-500",
    High: "text-orange-500",
    Medium: "text-yellow-500",
    Low: "text-blue-500",
    Info: "text-gray-500"
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Issues by Severity</CardTitle>
        <ShieldAlert className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.severity} className="flex items-center">
                <span className={`flex-1 text-sm ${severityColors[item.severity]}`}>
                  {item.severity}
                </span>
                <span className="text-sm text-muted-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}