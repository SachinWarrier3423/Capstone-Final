"use client"

import { useEffect, useRef, useState } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Chart, type ChartConfiguration } from "chart.js/auto"
import { Globe } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function HostsByCountry() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Record<string, number> | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/stats')
        // const data = await response.json()

        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setData({
          US: 50000,
          Canada: 25000,
          Kosovo: 15000,
          China: 10000,
          Belgium: 7500,
          Germany: 5000,
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

    const countries = Object.keys(data)
    const values = Object.values(data)

    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels: countries,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "hsl(var(--chart-red) / 0.8)",
              "hsl(var(--chart-red) / 0.7)",
              "hsl(var(--chart-red) / 0.6)",
              "hsl(var(--chart-red) / 0.5)",
              "hsl(var(--chart-red) / 0.4)",
              "hsl(var(--chart-red) / 0.3)",
            ],
            borderWidth: 0,
            borderRadius: 6,
            barPercentage: 0.6,
            categoryPercentage: 0.7,
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
            display: false,
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
            callbacks: {
              label: (context) => {
                const value = context.raw as number
                if (value >= 1000) {
                  return value >= 1000000 ? (value / 1000000).toFixed(1) + "M" : (value / 1000).toFixed(1) + "K"
                }
                return value.toString()
              },
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
    <StatusCard title="Hosts by Country" icon={<Globe className="h-4 w-4" />}>
      <div className="chart-container">
        {isLoading ? (
          <div className="flex flex-col gap-2 h-full justify-center">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </StatusCard>
  )
}
