"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function IssuesBySeverity() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
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
        const counts: Record<'high' | 'medium' | 'low', number> = { high: 0, medium: 0, low: 0 }
        res.data.forEach((alert: any) => {
          const sev = alert.severity?.toLowerCase() as 'high' | 'medium' | 'low' | undefined
          if (sev && counts.hasOwnProperty(sev)) counts[sev]++
        })
        const formatted = Object.entries(counts).map(([k, v]) => ({ severity: k, count: v }))
        setData(formatted)
      } catch (err) {
        console.error("Error loading severity chart", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issues by Severity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="severity" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
