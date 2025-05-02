"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

interface Report {
  id: string
  title: string
  summary: string
  category: string
  publishedAt: string
  author: string
}

export function LatestReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/reports`,
          { headers: getAuthHeaders() }
        )
        setReports(response.data || [])
        setError("")
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Unauthorized: Please log in again")
        } else {
          setError("Error loading reports")
        }
        console.error("Error fetching reports:", err)
      }
    }
    fetchReports()
  }, [getAuthHeaders])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

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
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {report.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(report.publishedAt)}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium line-clamp-1">{report.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {report.summary}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">By {report.author}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No reports available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
