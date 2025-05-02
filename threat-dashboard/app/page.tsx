import { Navbar } from "@/components/navbar"
import { IssuesByStatus } from "@/components/dashboard/issues-by-status"
import { HostsByCountry } from "@/components/dashboard/hosts-by-country"
import { SevereIssues } from "@/components/dashboard/severe-issues"
import { NewsAnalysis } from "@/components/dashboard/news-analysis"
import { LatestReports } from "@/components/dashboard/latest-reports"
import { TopThreats } from "@/components/dashboard/top-threats"
import { IssuesBySeverity } from "@/components/dashboard/issues-by-severity"
import { SecurityScore } from "@/components/dashboard/security-score"
import { ActiveThreats } from "@/components/dashboard/active-threats"
import { Lock, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Threat Intelligence Dashboard
          </h2>
        </div>
        <div className="grid gap-4">
          {/* First row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SecurityScore />
            <IssuesByStatus />
            <IssuesBySeverity />
          </div>
          
          {/* Second row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <HostsByCountry />
            <ActiveThreats />
            <TopThreats />
          </div>

          {/* Third row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SevereIssues />
            <LatestReports />
            <NewsAnalysis />
          </div>
        </div>
      </div>
    </div>
  )
}
