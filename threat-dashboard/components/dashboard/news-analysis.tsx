"use client"

import { useState, useEffect } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { ExternalLink, Newspaper } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsItem {
  id: string
  category: string
  title: string
  source: string
  date: string
  url: string
  categoryColor: string
}

export function NewsAnalysis() {
  const [isLoading, setIsLoading] = useState(true)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/news')
        // const data = await response.json()

        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1300))
        setNewsItems([
          {
            id: "1",
            category: "JUDGEMENT WITHHELD",
            title: "Multiple REvil Ransomware Sites Are Down on the Darkweb",
            source: "CNBC",
            date: "JUL 2, 2022",
            url: "#",
            categoryColor: "text-gray-400",
          },
          {
            id: "2",
            category: "MEDIA ON-TARGET",
            title: "Connection Discovered Between Chinese Hacker Group APT15 and...",
            source: "INFOSECURITY MAGAZINE",
            date: "JUL 2, 2022",
            url: "#",
            categoryColor: "text-green-500",
          },
          {
            id: "3",
            category: "PLAUSIBLE",
            title: "Governments Turn Tables on Ransomware Gang REvil By Pushing It...",
            source: "ZDNET",
            date: "JUL 2, 2022",
            url: "#",
            categoryColor: "text-yellow-500",
          },
          {
            id: "4",
            category: "MEDIA OFF-TARGET",
            title: "TrickBot Draws on Dyre Code but May Represent Distinct...",
            source: "ZDNET",
            date: "JUL 2, 2022",
            url: "#",
            categoryColor: "text-red-500",
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
    <StatusCard title="News Analysis" icon={<Newspaper className="h-4 w-4" />}>
      <div className="space-y-4">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-full" />
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4 ml-1" />
                  </div>
                </div>
              ))
          : newsItems.map((item) => (
              <div key={item.id} className="space-y-1 group">
                <div className={`text-xs font-medium ${item.categoryColor}`}>{item.category}</div>
                <div className="flex justify-between items-start">
                  <a href={item.url} className="text-sm hover:underline group-hover:text-primary transition-colors">
                    {item.title}
                  </a>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{item.source}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </div>
              </div>
            ))}
      </div>
    </StatusCard>
  )
}
