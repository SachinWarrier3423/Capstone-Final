"use client"

import { useState, useEffect } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Report {
  id: string
  title: string
  time: string
  category: string
  categoryColor: string
}

export function LatestReports() {
  const [isLoading, setIsLoading] = useState(true)
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/reports')
        // const data = await response.json()

        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1100))
        setReports([
          {
            id: "1",
            title: "Weekly Intel, May 5th, 2020",
            time: "2 HOURS AGO",
            category: "Executive Perspective",
            categoryColor: "bg-blue-600",
          },
          {
            id: "2",
            title: "Seeing Isn't Believing: Leveraging Deepfakes in...",
            time: "2 HOURS AGO",
            category: "Trends And Forecasting",
            categoryColor: "bg-purple-600",
          },
          {
            id: "3",
            title: "Seeing Isn't Believing: Leveraging Deepfakes in the 2020...",
            time: "2 HOURS AGO",
            category: "Vulnerability",
            categoryColor: "bg-red-600",
          },
          {
            id: "4",
            title: "TrickBot Draws on Dyre Code but May Represent Distinct...",
            time: "2 HOURS AGO",
            category: "Vulnerability",
            categoryColor: "bg-red-600",
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
    <StatusCard title="Latest Reports" icon={<FileText className="h-4 w-4" />}>
      <div className="space-y-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                </div>
              ))
          : reports.map((report) => (
              <div key={report.id} className="space-y-1 group">
                <div className="text-xs text-muted-foreground">{report.time}</div>
                <div className="text-sm group-hover:text-primary transition-colors cursor-pointer">{report.title}</div>
                <Badge
                  className={`${report.categoryColor} hover:${report.categoryColor} bg-opacity-80 backdrop-blur-sm border border-white/10`}
                >
                  {report.category}
                </Badge>
              </div>
            ))}
      </div>
    </StatusCard>
  )
}
