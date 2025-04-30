import { cn } from "@/lib/utils"

interface SeverityBadgeProps {
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  className?: string
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const severityClasses = {
    Critical: "severity-badge severity-badge-critical",
    High: "severity-badge severity-badge-high",
    Medium: "severity-badge severity-badge-medium",
    Low: "severity-badge severity-badge-low",
    Info: "severity-badge severity-badge-info",
  }

  return <span className={cn(severityClasses[severity], className)}>{severity}</span>
}
