"use client"

import { useEffect, useState } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

export function SecurityScore() {
  const [isLoading, setIsLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable")
  const [trendValue, setTrendValue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const randomScore = Math.floor(Math.random() * 30) + 65 // 65-95
        setScore(randomScore)

        // Random trend
        const trends = ["up", "down", "stable"] as const
        const randomTrend = trends[Math.floor(Math.random() * trends.length)] as "up" | "down" | "stable"
        setTrend(randomTrend)

        // Random trend value
        const randomTrendValue = Math.floor(Math.random() * 5) + 1
        setTrendValue(randomTrendValue)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <span className="text-green-500">↑</span>
    if (trend === "down") return <span className="text-red-500">↓</span>
    return <span className="text-gray-500">→</span>
  }

  return (
    <StatusCard title="Security Posture Score" icon={<Shield className="h-4 w-4" />}>
      <div className="flex flex-col items-center justify-center h-full py-4">
        {isLoading ? (
          <div className="w-full space-y-4 flex flex-col items-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          <>
            <div className="text-4xl font-bold mb-2 font-heading">
              <span className={getScoreColor(score)}>{score}</span>
              <span className="text-sm font-normal text-muted-foreground ml-1">/100</span>
            </div>
            <div className="flex items-center gap-1 text-sm mb-4">
              {getTrendIcon(trend)}
              <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"}>
                {trendValue}% {trend === "up" ? "increase" : trend === "down" ? "decrease" : "no change"} since last
                week
              </span>
            </div>
            <Progress value={score} className="w-full h-2" />
            <div className="w-full flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Critical</span>
              <span>Moderate</span>
              <span>Secure</span>
            </div>
          </>
        )}
      </div>
    </StatusCard>
  )
}
