"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface StatusCardProps {
  title: string
  children: React.ReactNode
  onViewMore?: () => void
  className?: string
  icon?: React.ReactNode
}

export function StatusCard({ title, children, onViewMore, className, icon }: StatusCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-muted-foreground hover:text-foreground"
          onClick={onViewMore}
        >
          View More <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0">{children}</CardContent>
    </Card>
  )
}
