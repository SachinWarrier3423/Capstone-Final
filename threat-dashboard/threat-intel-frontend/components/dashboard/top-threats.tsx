"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TopThreats({ type }: { type: "actors" | "ttps" }) {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/threats/abuse/1.1.1.1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setItems(res.data.data || [])
      } catch (err) {
        console.error("Error fetching top threats", err)
      }
    }
    fetchTop()
  }, [type])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top {type === "actors" ? "Threat Actors" : "TTPs"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {items.slice(0, 5).map((el, i) => (
            <li key={i}>{el.category || el.comment}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
