"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { SeverityBadge } from "./severity-badge"

interface Threat {
  id: string
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  timestamp: string
}

export function ActiveThreats() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`,
          { headers: getAuthHeaders() }
        )
        
        if (Array.isArray(response.data)) {
          const formattedThreats = response.data
            .slice(0, 5)
            .map((threat: any) => ({
              id: threat.id || Math.random().toString(),
              name: threat.message || "Unknown Threat",
              severity: threat.severity || "Medium",
              timestamp: new Date(threat.timestamp).toLocaleString()
            }))
          setThreats(formattedThreats)
        }
        setError("")
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Unauthorized: Please log in again")
        } else {
          setError("Error loading threats")
        }
        console.error("Error loading active threats:", err)
      }
    }
    fetchData()
  }, [getAuthHeaders])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
        <AlertCircle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : threats.length > 0 ? (
          <div className="space-y-4">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{threat.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {threat.timestamp}
                  </span>
                </div>
                <SeverityBadge severity={threat.severity} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No active threats</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
