import { Navbar } from "@/components/navbar"
import { IssuesByStatus } from "@/components/dashboard/issues-by-status"
import { HostsByCountry } from "@/components/dashboard/hosts-by-country"
import { SevereIssues } from "@/components/dashboard/severe-issues"
import { NewsAnalysis } from "@/components/dashboard/news-analysis"
import { LatestReports } from "@/components/dashboard/latest-reports"
import { TopThreats } from "@/components/dashboard/top-threats"
import { IssuesBySeverity } from "@/components/dashboard/issues-by-severity"
import { Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-dashboard-dark">
      <Navbar />
      <div className="flex-1 p-4 md:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">All The Things</h1>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <button className="text-muted-foreground hover:text-white">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <IssuesByStatus />
          <HostsByCountry />
          <SevereIssues />
          <NewsAnalysis />
          <LatestReports />
          <TopThreats type="ttps" />
          <IssuesBySeverity />
          <TopThreats type="actors" />
        </div>
      </div>
    </div>
  )
}
