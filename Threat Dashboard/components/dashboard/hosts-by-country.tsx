"use client"

import { useEffect, useRef } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Chart, type ChartConfiguration } from "chart.js/auto"

export function HostsByCountry() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const config: ChartConfiguration = {
      type: "bar",
      data: {
        labels: ["US", "Canada", "Kosovo", "China", "Belgium", "Germany"],
        datasets: [
          {
            data: [50000, 25000, 15000, 10000, 7500, 5000],
            backgroundColor: [
              "rgba(231, 76, 60, 0.8)",
              "rgba(231, 76, 60, 0.7)",
              "rgba(231, 76, 60, 0.6)",
              "rgba(231, 76, 60, 0.5)",
              "rgba(231, 76, 60, 0.4)",
              "rgba(231, 76, 60, 0.3)",
            ],
            borderWidth: 0,
            borderRadius: 4,
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
              color: "rgba(255, 255, 255, 0.1)",
              drawBorder: false,
            },
            ticks: {
              color: "#95a5a6",
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
              color: "#95a5a6",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 10,
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
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
  }, [])

  return (
    <StatusCard title="Hosts by Country">
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
    </StatusCard>
  )
}
