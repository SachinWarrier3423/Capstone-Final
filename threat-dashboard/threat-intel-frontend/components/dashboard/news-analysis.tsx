"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Newspaper } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface NewsItem {
  id: string
  title: string
  category: string
  publishedAt: string
  author: string
}

export function NewsAnalysis() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/news`,
          { headers: getAuthHeaders() }
        )
        setNews(res.data || [])
        setError("")
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Unauthorized: Please log in again")
        } else {
          setError("Error loading news analysis")
        }
        console.error("Error loading news analysis:", err)
      }
    }
    fetchNews()
  }, [getAuthHeaders])

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Vulnerability': 'bg-red-500',
      'Malware Analysis': 'bg-yellow-500',
      'Threat Actor': 'bg-blue-500',
      'Security Advisory': 'bg-green-500'
    }
    return colors[category] || 'bg-gray-500'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Security News & Analysis</CardTitle>
        <Newspaper className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : news.length > 0 ? (
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary"
                      className={`${getCategoryColor(item.category)} text-white text-[10px]`}
                    >
                      {item.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-none">{item.title}</p>
                  <p className="text-xs text-muted-foreground">By {item.author}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No news available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
