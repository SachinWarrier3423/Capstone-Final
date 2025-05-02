"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { AlertOctagon } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface SeverityData {
  name: string
  value: number
}

export function IssuesBySeverity() {
  const [data, setData] = useState<SeverityData[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`,
          { headers: getAuthHeaders() }
        )
        const counts: Record<string, number> = { 
          critical: 0,
          high: 0, 
          medium: 0, 
          low: 0,
          info: 0
        }
        
        if (Array.isArray(res.data)) {
          res.data.forEach((alert: any) => {
            const sev = alert.severity?.toLowerCase()
            if (sev && sev in counts) counts[sev]++
          })
        }

        const formattedData = Object.entries(counts)
          .map(([severity, count]) => ({ 
            name: severity.charAt(0).toUpperCase() + severity.slice(1),
            value: count
          }))
          .sort((a, b) => {
            const order = ['Critical', 'High', 'Medium', 'Low', 'Info']
            return order.indexOf(a.name) - order.indexOf(b.name)
          })

        setData(formattedData)
        setError("")
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Unauthorized: Please log in again")
        } else {
          setError("Error loading severity data")
        }
        console.error("Error loading severity chart:", err)
      }
    }
    fetchData()
  }, [getAuthHeaders])

  const getSeverityColor = (severity: string) => {
    const colors = {
      Critical: 'hsl(0, 84%, 60%)', // Red
      High: 'hsl(24, 84%, 60%)',    // Orange
      Medium: 'hsl(48, 84%, 60%)',  // Yellow
      Low: 'hsl(142, 76%, 36%)',    // Green
      Info: 'hsl(221, 83%, 53%)'    // Blue
    }
    return colors[severity] || colors.Info
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Issues by Severity</CardTitle>
        <AlertOctagon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : data.length > 0 ? (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                  contentStyle={{ 
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  fill="hsl(var(--primary))"
                  style={{
                    fill: 'url(#severityGradient)'
                  }}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={getSeverityColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
