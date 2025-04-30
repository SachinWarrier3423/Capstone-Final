"use client"

import { useEffect, useRef, useState } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Chart, type ChartConfiguration, type ChartData } from "chart.js/auto"
import { PieChart } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function IssuesByStatus() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<{ open: number; inProgress: number; closed: number; total: number } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/stats')
        // const data = await response.json()

        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setData({
          open: 120,
          inProgress: 80,
          closed: 34,
          total: 234,
        })
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!chartRef.current || !data) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const chartData: ChartData = {
      labels: ["Open", "In Progress", "Closed"],
      datasets: [
        {
          data: [data.open, data.inProgress, data.closed],
          backgroundColor: [
            "hsl(var(--chart-red) / 0.8)",
            "hsl(var(--chart-orange) / 0.8)",
            "hsl(var(--chart-gray) / 0.8)",
          ],
          borderWidth: 0,
          borderRadius: 5,
          hoverOffset: 4,
        },
      ],
    }

    const config: ChartConfiguration = {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#fff",
              padding: 10,
              usePointStyle: true,
              pointStyle: "rectRounded",
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            padding: 12,
            titleColor: "#fff",
            bodyColor: "#fff",
            bodySpacing: 6,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            cornerRadius: 8,
            boxPadding: 6,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: "600",
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 13,
            },
            displayColors: true,
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
          },
        },
      },
      plugins: [
        {
          id: "centerText",
          beforeDraw: (chart) => {
            if (!data) return

            const width = chart.width
            const height = chart.height
            const ctx = chart.ctx

            ctx.restore()
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            const centerX = width / 2
            const centerY = height / 2

            // Draw total count
            ctx.font = "600 24px 'Poppins', sans-serif"
            ctx.fillStyle = "#fff"
            ctx.fillText(data.total.toString(), centerX, centerY - 10)

            // Draw label
            ctx.font = "12px 'Inter', sans-serif"
            ctx.fillStyle = "#94a3b8"
            ctx.fillText("TOTAL ISSUES", centerX, centerY + 10)

            ctx.save()
          },
        },
      ],
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <StatusCard title="Issues by Status" icon={<PieChart className="h-4 w-4" />}>
      <div className="chart-container">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <Skeleton className="h-[200px] w-[200px] rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </StatusCard>
  )
}
