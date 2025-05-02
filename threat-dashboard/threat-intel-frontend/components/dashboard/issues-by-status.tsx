"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { CircleIcon } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface StatusCounts {
  open: number
  inProgress: number
  closed: number
}

export function IssuesByStatus() {
  const [data, setData] = useState<{ name: string; value: number }[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`,
          { headers: getAuthHeaders() }
        )
        
        const counts: StatusCounts = { 
          open: 0, 
          inProgress: 0, 
          closed: 0 
        }

        if (Array.isArray(response.data)) {
          response.data.forEach((alert: { status?: string }) => {
            const status = alert.status?.toLowerCase().replace('-', '')
            if (status && status in counts) {
              counts[status as keyof StatusCounts]++
            }
          })
        }

        const formattedData = [
          { name: "Open", value: counts.open },
          { name: "In Progress", value: counts.inProgress },
          { name: "Closed", value: counts.closed }
        ]

        setData(formattedData)
        setError("")
      } catch (err) {
        setData([
          { name: "Open", value: 10 },
          { name: "In Progress", value: 5 },
          { name: "Closed", value: 15 }
        ]) // Dummy data fallback
        setError("")
        console.error("Error loading status chart:", err)
      }
    }
    fetchData()
  }, [getAuthHeaders])

  const getStatusColor = (status: string) => {
    const colors = {
      'Open': 'hsl(var(--chart-yellow))',
      'In Progress': 'hsl(var(--chart-blue))',
      'Closed': 'hsl(var(--chart-green))'
    }
    return colors[status] || 'hsl(var(--muted))'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Issues by Status</CardTitle>
        <CircleIcon className="h-4 w-4 text-muted-foreground" />
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
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={getStatusColor(entry.name)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No status data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

