"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, TrendingDown, TrendingUp } from "lucide-react"

export function SecurityScore() {
  const [score, setScore] = useState(100)
  const [prevScore, setPrevScore] = useState(100)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/alerts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((alerts) => {
        const base = 100
        const penalty = alerts.length * 5
        const newScore = Math.max(base - penalty, 10)
        setPrevScore(score)
        setScore(newScore)
      })
  }, [])

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { text: "Excellent", color: "text-green-500" }
    if (score >= 60) return { text: "Good", color: "text-yellow-500" }
    return { text: "Needs Attention", color: "text-red-500" }
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const status = getScoreStatus(score)
  const trend = score >= prevScore

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Security Score</CardTitle>
        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">
            <span className={status.color}>{score}%</span>
          </div>
          {trend ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="mt-3">
          <Progress 
            value={score} 
            className={`h-2 ${getProgressColor(score)}`}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className={status.color + " font-medium"}>{status.text}</span>
          <span className="text-muted-foreground">Updated just now</span>
        </div>
      </CardContent>
    </Card>
  )
}
