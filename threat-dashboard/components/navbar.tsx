"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold">Threat Dashboard</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
            Login
          </Link>
          <Link href="/register" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Register
          </Link>
        </nav>
      </div>
    </div>
  )
}