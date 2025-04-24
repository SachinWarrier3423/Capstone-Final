import { StatusCard } from "@/components/dashboard/status-card"
import { SeverityBadge } from "@/components/dashboard/severity-badge"

interface Issue {
  id: string
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  duration: string
}

const issues: Issue[] = [
  { id: "1", name: "Secure file transfer appliance", severity: "Critical", duration: "SEEN FOR 6 MONTHS" },
  { id: "2", name: "Dashboard Name Eleifend eget", severity: "Critical", duration: "SEEN FOR 6 MONTHS" },
  { id: "3", name: "Secure file", severity: "Critical", duration: "SEEN FOR 6 MONTHS" },
  { id: "4", name: "Secure file", severity: "High", duration: "SEEN FOR 6 MONTHS" },
  { id: "5", name: "Secure file", severity: "High", duration: "SEEN FOR 6 MONTHS" },
]

export function SevereIssues() {
  return (
    <StatusCard title="Most Severe Issues">
      <div className="space-y-2">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-center justify-between p-2 rounded hover:bg-dashboard-darker cursor-pointer"
          >
            <div className="text-sm text-white">{issue.name}</div>
            <div className="flex items-center gap-3">
              <SeverityBadge severity={issue.severity} />
              <span className="text-xs text-muted-foreground">{issue.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </StatusCard>
  )
}
