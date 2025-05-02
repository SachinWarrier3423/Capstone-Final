"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListChecks } from "lucide-react"

interface StatusData {
  status: string
  count: number
}

export function IssuesByStatus() {
  const [data, setData] = useState<StatusData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/threats/issues-by-status`)
        if (Array.isArray(response.data)) {
          setData(response.data)
        }
      } catch (err) {
        // Dummy data fallback
        setData([
          { status: "Open", count: 8 },
          { status: "In Progress", count: 4 },
          { status: "Closed", count: 15 },
        ])
        console.error("Error loading issues by status:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Issues by Status</CardTitle>
        <ListChecks className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.status} className="flex items-center">
                <span className="flex-1 text-sm capitalize">{item.status}</span>
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
  );
}