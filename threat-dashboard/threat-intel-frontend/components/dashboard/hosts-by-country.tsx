"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HostsByCountry() {
  const [hosts, setHosts] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/threats/otx/1.1.1.1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setHosts(response.data.pulses || [])
      } catch (error) {
        console.error("Error fetching hosts by country:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hosts by Country</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {hosts.slice(0, 5).map((pulse, index) => (
            <li key={index}>{pulse.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
