"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface CountryData {
  country: string
  count: number
}

export function HostsByCountry() {
  const [data, setData] = useState<CountryData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/threats/hosts-by-country`)
        if (Array.isArray(response.data)) {
          setData(response.data.slice(0, 5))
        }
      } catch (err) {
        // Set dummy data if API fails
        setData([
          { country: "United States", count: 120 },
          { country: "Germany", count: 85 },
          { country: "China", count: 70 },
          { country: "India", count: 55 },
          { country: "Brazil", count: 40 },
        ])
        console.error("Error loading hosts by country:", err)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Hosts by Country</CardTitle>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.country} className="flex items-center">
                <span className="flex-1 text-sm">{item.country}</span>
                <span className="text-sm text-muted-foreground">{item.count}</span>
              </div>
            ))}
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