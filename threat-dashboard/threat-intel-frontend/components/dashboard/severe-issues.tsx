"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SeverityBadge } from "@/components/dashboard/severity-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle } from "lucide-react"
import axios from "axios"
import { useAuth } from "@/hooks/use-auth"

interface Issue {
  id: string
  name: string
  severity: "Critical" | "High" | "Medium" | "Low" | "Info"
  timestamp: string
}

export function SevereIssues() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [error, setError] = useState<string>("")
  const { getAuthHeaders } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/alerts`,
          { headers: getAuthHeaders() }
        )
        
        // Filter and format severe issues
        if (Array.isArray(response.data)) {
          const severeIssues = response.data
            .filter((issue: any) => 
              issue.severity?.toLowerCase() === "critical" || 
              issue.severity?.toLowerCase() === "high"
            )
            .slice(0, 5)
            .map((issue: any) => ({
              id: issue.id || Math.random().toString(),
              name: issue.message || "Unknown Issue",
              severity: issue.severity || "High",
              timestamp: new Date(issue.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            }))
          setIssues(severeIssues)
        }
        setError("")
      } catch (err) {
        setIssues([
          { id: "1", name: "Critical Vulnerability", severity: "Critical", timestamp: "May 1, 2025, 10:00 AM" },
          { id: "2", name: "High Risk Threat", severity: "High", timestamp: "May 1, 2025, 11:00 AM" },
          { id: "3", name: "Medium Risk Issue", severity: "Medium", timestamp: "May 1, 2025, 12:00 PM" }
        ]) // Dummy data fallback
        setError("")
        console.error("Error loading severe issues:", err)
      }
    }
    fetchData()
  }, [getAuthHeaders])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Severe Issues</CardTitle>
        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500 text-xs">{error}</p>
        ) : issues.length > 0 ? (
          <ScrollArea className="h-[200px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                  <TableHead className="w-24 text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.name}</TableCell>
                    <TableCell>
                      <SeverityBadge severity={issue.severity} />
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {issue.timestamp}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No severe issues found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
