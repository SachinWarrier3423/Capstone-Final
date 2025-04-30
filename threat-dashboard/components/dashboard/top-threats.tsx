"use client"

import { useState, useEffect } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { AlertOctagon, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Threat {
  id: string
  rank: number
  name: string
  flag?: string
}

interface TopThreatsProps {
  type: "ttps" | "actors"
}

export function TopThreats({ type }: TopThreatsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [threats, setThreats] = useState<Threat[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/threats/${type}`)
        // const data = await response.json()

        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, type === "ttps" ? 900 : 1400))

        if (type === "ttps") {
          setThreats([
            { id: "1", rank: 1, name: "Command & Scripting Interpreter" },
            { id: "2", rank: 2, name: "Event Triggered Execution: Accessibility Feasib..." },
            { id: "3", rank: 3, name: "File & Directory Permissions Modification" },
            { id: "4", rank: 4, name: "Process Injection: Process Hollowing" },
            { id: "5", rank: 5, name: "Encrypted Channel: Asymmetric Cryptography" },
            { id: "6", rank: 6, name: "Encrypted Channel: Asymmetric Cryptography" },
            { id: "7", rank: 7, name: "Encrypted Channel: Asymmetric Cryptography" },
            { id: "8", rank: 8, name: "Encrypted Channel: Asymmetric Cryptography" },
          ])
        } else {
          setThreats([
            { id: "1", rank: 1, name: "APT38", flag: "🇷🇺" },
            { id: "2", rank: 2, name: "APT29", flag: "🇷🇺" },
            { id: "3", rank: 3, name: "APT98", flag: "🇷🇺" },
            { id: "4", rank: 4, name: "UNC2200", flag: "🇷🇺" },
            { id: "5", rank: 5, name: "UNC2420", flag: "🇷🇺" },
            { id: "6", rank: 6, name: "FIN11", flag: "🇷🇺" },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [type])

  const title = type === "ttps" ? "My Top Threats - TTPs" : "My Top Threats - Actors"
  const icon = type === "ttps" ? <AlertOctagon className="h-4 w-4" /> : <Users className="h-4 w-4" />

  return (
    <StatusCard title={title} icon={icon}>
      <div className="space-y-2">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center p-2">
                  <Skeleton className="h-5 w-5 mr-3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
          : threats.map((threat) => (
              <div
                key={threat.id}
                className="flex items-center p-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="w-8 text-sm font-medium text-muted-foreground">
                  {threat.rank}
                  <sup>{getRankSuffix(threat.rank)}</sup>
                </div>
                <div className="flex items-center gap-2">
                  {threat.flag ? <span className="text-base">{threat.flag}</span> : null}
                  <span className="text-sm">{threat.name}</span>
                </div>
              </div>
            ))}
      </div>
    </StatusCard>
  )
}

function getRankSuffix(rank: number): string {
  if (rank === 1) return "st"
  if (rank === 2) return "nd"
  if (rank === 3) return "rd"
  return "th"
}
