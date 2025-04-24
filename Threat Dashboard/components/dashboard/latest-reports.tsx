import { StatusCard } from "@/components/dashboard/status-card"
import { Badge } from "@/components/ui/badge"

interface Report {
  id: string
  title: string
  time: string
  category: string
  categoryColor: string
}

const reports: Report[] = [
  {
    id: "1",
    title: "Weekly Intel, May 5th, 2020",
    time: "2 HOURS AGO",
    category: "Executive Perspective",
    categoryColor: "bg-blue-600",
  },
  {
    id: "2",
    title: "Seeing Isn't Believing: Leveraging Deepfakes in...",
    time: "2 HOURS AGO",
    category: "Trends And Forecasting",
    categoryColor: "bg-purple-600",
  },
  {
    id: "3",
    title: "Seeing Isn't Believing: Leveraging Deepfakes in the 2020...",
    time: "2 HOURS AGO",
    category: "Vulnerability",
    categoryColor: "bg-red-600",
  },
  {
    id: "4",
    title: "TrickBot Draws on Dyre Code but May Represent Distinct...",
    time: "2 HOURS AGO",
    category: "Vulnerability",
    categoryColor: "bg-red-600",
  },
]

export function LatestReports() {
  return (
    <StatusCard title="Latest Reports">
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="space-y-1">
            <div className="text-xs text-muted-foreground">{report.time}</div>
            <div className="text-sm text-white">{report.title}</div>
            <Badge className={`${report.categoryColor} hover:${report.categoryColor}`}>{report.category}</Badge>
          </div>
        ))}
      </div>
    </StatusCard>
  )
}
