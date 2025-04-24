import { StatusCard } from "@/components/dashboard/status-card"
import { ExternalLink } from "lucide-react"

interface NewsItem {
  id: string
  category: string
  title: string
  source: string
  date: string
  url: string
  categoryColor: string
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    category: "JUDGEMENT WITHHELD",
    title: "Multiple REvil Ransomware Sites Are Down on the Darkweb",
    source: "CNBC",
    date: "JUL 2, 2022",
    url: "#",
    categoryColor: "text-gray-400",
  },
  {
    id: "2",
    category: "MEDIA ON-TARGET",
    title: "Connection Discovered Between Chinese Hacker Group APT15 and...",
    source: "INFOSECURITY MAGAZINE",
    date: "JUL 2, 2022",
    url: "#",
    categoryColor: "text-green-500",
  },
  {
    id: "3",
    category: "PLAUSIBLE",
    title: "Governments Turn Tables on Ransomware Gang REvil By Pushing It...",
    source: "ZDNET",
    date: "JUL 2, 2022",
    url: "#",
    categoryColor: "text-yellow-500",
  },
  {
    id: "4",
    category: "MEDIA OFF-TARGET",
    title: "TrickBot Draws on Dyre Code but May Represent Distinct...",
    source: "ZDNET",
    date: "JUL 2, 2022",
    url: "#",
    categoryColor: "text-red-500",
  },
]

export function NewsAnalysis() {
  return (
    <StatusCard title="News Analysis">
      <div className="space-y-4">
        {newsItems.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className={`text-xs font-medium ${item.categoryColor}`}>{item.category}</div>
            <div className="flex justify-between items-start">
              <a href={item.url} className="text-sm text-white hover:underline">
                {item.title}
              </a>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{item.source}</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </StatusCard>
  )
}
