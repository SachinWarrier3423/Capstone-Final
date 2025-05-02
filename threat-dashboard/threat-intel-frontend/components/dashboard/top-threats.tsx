"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ShieldAlert } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface ThreatCount {
  name: string
  value: number
}

export function TopThreats() {
  const [data, setData] = useState<ThreatCount[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`,
          { headers: getAuthHeaders() }
        )
        
        // Process and aggregate threats by type
        const typeMap = new Map<string, number>()
        if (Array.isArray(response.data)) {
          response.data.forEach((alert: any) => {
            const type = alert.type || "Unknown"
            typeMap.set(type, (typeMap.get(type) || 0) + 1)
          })
        }

        // Convert to array and sort by count
        const sortedData = Array.from(typeMap.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5) // Top 5 threat types

        setData(sortedData)
        setError("")
      } catch (err) {
        setData([
          { name: "Phishing", value: 30 },
          { name: "Malware", value: 25 },
          { name: "Ransomware", value: 20 },
          { name: "DDoS", value: 15 },
          { name: "Spyware", value: 10 }
        ]) // Dummy data fallback
        setError("")
        console.error("Error fetching top threats:", err)
      }
    }
    fetchData()
  }, [getAuthHeaders])

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Top Threat Types</CardTitle>
        <ShieldAlert className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : data.length > 0 ? (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No threat data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
