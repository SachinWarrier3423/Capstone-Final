"use client"

import { useEffect, useRef, useState } from "react"
import { StatusCard } from "@/components/dashboard/status-card"
import { MapPin } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function ThreatMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Simulate loading a map library
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (mapRef.current) {
          // In a real implementation, this would initialize a map library like Mapbox or Leaflet
          const mapContainer = mapRef.current
          mapContainer.innerHTML = `
            <div class="relative w-full h-full rounded-lg overflow-hidden">
              <div class="absolute inset-0 bg-blue-900/20 backdrop-blur-sm"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <p class="text-sm text-white/80">Interactive threat map would be displayed here</p>
                  <p class="text-xs text-white/60 mt-1">Using real-time geolocation data</p>
                </div>
              </div>
              <div class="absolute top-4 right-4 flex space-x-2">
                <div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                <div class="h-2 w-2 rounded-full bg-orange-500 animate-pulse" style="animation-delay: 0.5s"></div>
                <div class="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style="animation-delay: 1s"></div>
              </div>
              <div class="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-30 bg-cover bg-center"></div>
            </div>
          `
        }
      } catch (error) {
        console.error("Failed to load map:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMap()
  }, [])

  return (
    <StatusCard title="Global Threat Activity" icon={<MapPin className="h-4 w-4" />}>
      <div className="h-[300px] w-full">
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <div ref={mapRef} className="h-full w-full rounded-lg overflow-hidden"></div>
        )}
      </div>
    </StatusCard>
  )
}
