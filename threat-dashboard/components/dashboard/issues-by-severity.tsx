"use client"

import { useEffect, useRef, useState } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Chart, type ChartConfiguration } from "chart.js/auto"
import { LineChart } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function IssuesBySeverity() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/stats')
        // const data = await response.json()

        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: {
            critical: [5, 10, 15, 25, 40, 50, 45, 35, 25, 20, 30, 35],
            high: [30, 25, 20, 15, 10, 15, 20, 30, 40, 45, 50, 45],
            medium: [20, 15, 10, 5, 2, 5, 10, 15, 20, 25, 20, 15],
          },
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

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Critical",
            data: data.datasets.critical,
            borderColor: "hsl(var(--chart-red))",
            backgroundColor: "hsl(var(--chart-red) / 0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
          },
          {
            label: "High",
            data: data.datasets.high,
            borderColor: "hsl(var(--chart-orange))",
            backgroundColor: "hsl(var(--chart-orange) / 0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
          },
          {
            label: "Medium",
            data: data.datasets.medium,
            borderColor: "hsl(var(--chart-blue))",
            backgroundColor: "hsl(var(--chart-blue) / 0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
              drawBorder: false,
            },
            ticks: {
              color: "#94a3b8",
              font: {
                family: "'Inter', sans-serif",
                size: 11,
              },
              callback: (value) => {
                if (value >= 1000) {
                  return value >= 1000000 ? value / 1000000 + "M" : value / 1000 + "K"
                }
                return value
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#94a3b8",
              font: {
                family: "'Inter', sans-serif",
                size: 11,
              },
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#fff",
              usePointStyle: true,
              pointStyle: "circle",
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
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            cornerRadius: 8,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: "600",
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 13,
            },
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <StatusCard title="Issues Based on Severity" icon={<LineChart className="h-4 w-4" />}>
      <div className="chart-container">
        {isLoading ? (
          <div className="flex flex-col gap-2 h-full justify-center">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </StatusCard>
  )
}
