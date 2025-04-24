import { cn } from "@/lib/utils"

interface SeverityBadgeProps {
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  className?: string
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const baseClasses = "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"

  const severityClasses = {
    Critical: "bg-red-500 text-white",
    High: "bg-orange-500 text-white",
    Medium: "bg-yellow-500 text-black",
    Low: "bg-blue-500 text-white",
    Info: "bg-gray-500 text-white",
  }

  return <span className={cn(baseClasses, severityClasses[severity], className)}>{severity}</span>
}
