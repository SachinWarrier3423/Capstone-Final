"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LatestReports() {
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setReports(res.data || [])
      } catch (err) {
        console.error("Error fetching reports", err)
      }
    }
    fetchReports()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {reports.slice(0, 5).map((r, i) => (
            <li key={i}>{r.source} - {r.timestamp?.split("T")[0]}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
