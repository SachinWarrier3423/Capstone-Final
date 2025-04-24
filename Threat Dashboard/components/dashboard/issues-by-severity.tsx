"use client"

import { useEffect, useRef } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Chart, type ChartConfiguration } from "chart.js/auto"

export function IssuesBySeverity() {
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
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Critical",
            data: [5, 10, 15, 25, 40, 50, 45, 35, 25, 20, 30, 35],
            borderColor: "#e74c3c",
            backgroundColor: "rgba(231, 76, 60, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: "High",
            data: [30, 25, 20, 15, 10, 15, 20, 30, 40, 45, 50, 45],
            borderColor: "#f39c12",
            backgroundColor: "rgba(243, 156, 18, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: "Medium",
            data: [20, 15, 10, 5, 2, 5, 10, 15, 20, 25, 20, 15],
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
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
            position: "top",
            labels: {
              color: "#fff",
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 10,
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
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
    <StatusCard title="Issues Based on Severity">
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
    </StatusCard>
  )
}
