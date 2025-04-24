"use client"

import { useEffect, useRef } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { Chart, type ChartConfiguration, type ChartData } from "chart.js/auto"

export function IssuesByStatus() {
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

    const data: ChartData = {
      labels: ["Open", "In Progress", "Closed"],
      datasets: [
        {
          data: [120, 80, 34],
          backgroundColor: ["#e74c3c", "#f39c12", "#95a5a6"],
          borderWidth: 0,
          borderRadius: 5,
          hoverOffset: 4,
        },
      ],
    }

    const config: ChartConfiguration = {
      type: "doughnut",
      data: data,
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
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: 10,
            titleColor: "#fff",
            bodyColor: "#fff",
            bodySpacing: 5,
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
          },
        },
      },
      plugins: [
        {
          id: "centerText",
          beforeDraw: (chart) => {
            const width = chart.width
            const height = chart.height
            const ctx = chart.ctx

            ctx.restore()
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            const centerX = width / 2
            const centerY = height / 2

            // Draw total count
            ctx.font = "bold 24px Arial"
            ctx.fillStyle = "#fff"
            ctx.fillText("234", centerX, centerY - 10)

            // Draw label
            ctx.font = "12px Arial"
            ctx.fillStyle = "#95a5a6"
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
  }, [])

  return (
    <StatusCard title="Issues by Status">
      <div className="chart-container">
        <canvas ref={chartRef} />
      </div>
    </StatusCard>
  )
}
