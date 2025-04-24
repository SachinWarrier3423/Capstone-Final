import { StatusCard } from "@/components/dashboard/status-card"

interface Threat {
  id: string
  rank: number
  name: string
  flag?: string
}

const ttps: Threat[] = [
  { id: "1", rank: 1, name: "Command & Scripting Interpreter" },
  { id: "2", rank: 2, name: "Event Triggered Execution: Accessibility Feasib..." },
  { id: "3", rank: 3, name: "File & Directory Permissions Modification" },
  { id: "4", rank: 4, name: "Process Injection: Process Hollowing" },
  { id: "5", rank: 5, name: "Encrypted Channel: Asymmetric Cryptography" },
  { id: "6", rank: 6, name: "Encrypted Channel: Asymmetric Cryptography" },
  { id: "7", rank: 7, name: "Encrypted Channel: Asymmetric Cryptography" },
  { id: "8", rank: 8, name: "Encrypted Channel: Asymmetric Cryptography" },
]

const actors: Threat[] = [
  { id: "1", rank: 1, name: "APT38", flag: "🇷🇺" },
  { id: "2", rank: 2, name: "APT29", flag: "🇷🇺" },
  { id: "3", rank: 3, name: "APT98", flag: "🇷🇺" },
  { id: "4", rank: 4, name: "UNC2200", flag: "🇷🇺" },
  { id: "5", rank: 5, name: "UNC2420", flag: "🇷🇺" },
  { id: "6", rank: 6, name: "FIN11", flag: "🇷🇺" },
]

interface TopThreatsProps {
  type: "ttps" | "actors"
}

export function TopThreats({ type }: TopThreatsProps) {
  const threats = type === "ttps" ? ttps : actors
  const title = type === "ttps" ? "My Top Threats - TTPs" : "My Top Threats - Actors"

  return (
    <StatusCard title={title}>
      <div className="space-y-2">
        {threats.map((threat) => (
          <div key={threat.id} className="flex items-center p-2 rounded hover:bg-dashboard-darker cursor-pointer">
            <div className="w-8 text-sm font-medium text-muted-foreground">
              {threat.rank}
              <sup>th</sup>
            </div>
            <div className="flex items-center gap-2">
              {threat.flag ? <span className="text-base">{threat.flag}</span> : null}
              <span className="text-sm text-white">{threat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </StatusCard>
  )
}
