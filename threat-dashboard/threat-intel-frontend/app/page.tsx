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
      <div className="flex-1 p-4 md:p-6 pb-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">Threat Intelligence Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="xl:col-span-1">
            <SecurityScore />
          </div>
          <div className="xl:col-span-1">
            <IssuesByStatus />
          </div>
          <div className="xl:col-span-2">
            <IssuesBySeverity />
          </div>
          <div className="xl:col-span-2">
            <HostsByCountry />
          </div>
          <div className="xl:col-span-1">
            <SevereIssues />
          </div>
          <div className="xl:col-span-1">
            <ActiveThreats />
          </div>
          <div className="xl:col-span-1">
            <NewsAnalysis />
          </div>
          <div className="xl:col-span-1">
            <LatestReports />
          </div>
          <div className="xl:col-span-1">
            <TopThreats type="ttps" />
          </div>
          <div className="xl:col-span-1">
            <TopThreats type="actors" />
          </div>
        </div>
      </div>
    </div>
  )
}
