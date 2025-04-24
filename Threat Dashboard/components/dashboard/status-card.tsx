"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface StatusCardProps {
  title: string
  children: React.ReactNode
  onViewMore?: () => void
}

export function StatusCard({ title, children, onViewMore }: StatusCardProps) {
  return (
    <Card className="bg-dashboard-card border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-muted-foreground hover:text-white"
          onClick={onViewMore}
        >
          View More <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
    </Card>
  )
}
