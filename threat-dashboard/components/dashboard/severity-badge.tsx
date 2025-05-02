import { Badge } from "@/components/ui/badge"

type SeverityLevel = "Critical" | "High" | "Medium" | "Low" | "Info"

interface SeverityBadgeProps {
  severity: SeverityLevel
}

const severityColors: Record<SeverityLevel, string> = {
  Critical: "bg-red-500 hover:bg-red-600",
  High: "bg-orange-500 hover:bg-orange-600",
  Medium: "bg-yellow-500 hover:bg-yellow-600",
  Low: "bg-blue-500 hover:bg-blue-600",
  Info: "bg-gray-500 hover:bg-gray-600",
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <Badge className={severityColors[severity]}>
      {severity}
    </Badge>
  )
}