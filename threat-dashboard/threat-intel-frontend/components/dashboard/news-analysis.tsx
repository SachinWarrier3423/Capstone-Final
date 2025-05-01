"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewsAnalysis() {
  const [news, setNews] = useState<any[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/threats/shodan/1.1.1.1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setNews(res.data.data || [])
      } catch (error) {
        console.error("Error loading news analysis", error)
      }
    }
    fetchNews()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>News & Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {news.slice(0, 5).map((item: any, idx) => (
            <li key={idx}>{item.org} - {item.ip_str}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
