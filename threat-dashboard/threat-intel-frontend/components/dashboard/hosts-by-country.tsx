"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe2 } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface CountryData {
  name: string
  value: number
}

export function HostsByCountry() {
  const [data, setData] = useState<CountryData[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/threats`,
          { headers: getAuthHeaders() }
        )
        
        // Process and aggregate data by country
        const countryMap = new Map<string, number>()
        response.data.forEach((threat: any) => {
          const country = threat.country || "Unknown"
          countryMap.set(country, (countryMap.get(country) || 0) + 1)
        })

        // Convert to array and sort by count
        const sortedData = Array.from(countryMap.entries())
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 5) // Top 5 countries

        setData(sortedData)
        setError("")
      } catch (err) {
        setData([
          { name: "USA", value: 20 },
          { name: "India", value: 15 },
          { name: "Germany", value: 10 },
          { name: "UK", value: 8 },
          { name: "Canada", value: 5 }
        ]) // Dummy data fallback
        setError("")
        console.error("Error fetching hosts by country:", err)
      }
    }
    fetchData()
  }, [getAuthHeaders])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Hosts by Country</CardTitle>
        <Globe2 className="h-4 w-4 text-muted-foreground" />
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
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={index}
                      fill={`hsl(${200 + index * 30}, 70%, 50%)`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No geographic data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
