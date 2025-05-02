"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper } from "lucide-react"
import { newsData } from "@/lib/mockData"

interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
}

export function NewsAnalysis() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setNews(newsData.map((item, idx) => ({
      id: String(item.id),
      title: item.title,
      source: item.source,
      timestamp: item.date,
      severity: "Medium"
    })))
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
        <CardTitle className="text-sm font-medium">Security News Analysis</CardTitle>
        <Newspaper className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : news.length > 0 ? (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className={`text-xs ${severityColors[item.severity]}`}>
                    {item.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.source}</span>
                  <span>{new Date(item.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No news available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}