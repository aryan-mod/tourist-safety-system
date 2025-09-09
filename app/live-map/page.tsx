"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Play,
  Square,
  Share2,
  QrCode,
  Navigation,
  Crosshair,
  Wifi,
  WifiOff,
  Clock,
  Target,
  AlertTriangle,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAccessibility } from "@/contexts/accessibility-context"
import { useTheme } from "next-themes"
import { toast } from "sonner"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: Date
}

interface TrackingStats {
  duration: number
  distance: number
  avgSpeed: number
  points: number
}

export default function LiveMapPage() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [locationHistory, setLocationHistory] = useState<LocationData[]>([])
  const [trackingStats, setTrackingStats] = useState<TrackingStats>({
    duration: 0,
    distance: 0,
    avgSpeed: 0,
    points: 0,
  })
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt">("prompt")
  const [error, setError] = useState<string | null>(null)
  const [mapStyle, setMapStyle] = useState<"standard" | "satellite" | "terrain">("standard")

  const watchIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<Date | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const { t } = useLanguage()
  const { speak, isOnline } = useAccessibility()
  const { theme } = useTheme()

  // Check geolocation permission on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions?.query({ name: "geolocation" }).then((result) => {
        setPermissionStatus(result.state as "granted" | "denied" | "prompt")
      })
    }
  }, [])

  // Update tracking stats
  useEffect(() => {
    if (isTracking && startTimeRef.current) {
      const interval = setInterval(() => {
        const now = new Date()
        const duration = Math.floor((now.getTime() - startTimeRef.current!.getTime()) / 1000)

        let distance = 0
        if (locationHistory.length > 1) {
          for (let i = 1; i < locationHistory.length; i++) {
            distance += calculateDistance(
              locationHistory[i - 1].latitude,
              locationHistory[i - 1].longitude,
              locationHistory[i].latitude,
              locationHistory[i].longitude,
            )
          }
        }

        const avgSpeed = duration > 0 ? (distance / duration) * 3.6 : 0 // km/h

        setTrackingStats({
          duration,
          distance: distance * 1000, // meters
          avgSpeed,
          points: locationHistory.length,
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isTracking, locationHistory])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const startTracking = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser")
      speak("Geolocation is not supported")
      return
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }

    const successCallback = (position: GeolocationPosition) => {
      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date(),
      }

      setCurrentLocation(locationData)
      setLocationHistory((prev) => [...prev, locationData])
      setError(null)
    }

    const errorCallback = (error: GeolocationPositionError) => {
      let errorMessage = "Location access denied"
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Location access denied by user"
          break
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information unavailable"
          break
        case error.TIMEOUT:
          errorMessage = "Location request timed out"
          break
      }
      setError(errorMessage)
      speak(errorMessage)
    }

    // Start watching position
    watchIdRef.current = navigator.geolocation.watchPosition(successCallback, errorCallback, options)

    setIsTracking(true)
    startTimeRef.current = new Date()
    speak("Location tracking started")
    toast.success("Location tracking started")
  }

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    setIsTracking(false)
    startTimeRef.current = null
    speak("Location tracking stopped")
    toast.success("Location tracking stopped")
  }

  const shareLocation = async () => {
    if (!currentLocation) {
      toast.error("No location available to share")
      return
    }

    const locationUrl = `https://maps.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`

    try {
      await navigator.clipboard.writeText(locationUrl)
      toast.success("Location link copied to clipboard")
      speak("Location link copied")
    } catch (error) {
      toast.error("Failed to copy location link")
    }
  }

  const getCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
        }
        setCurrentLocation(locationData)
        toast.success("Current location updated")
        speak("Location updated")
      },
      (error) => {
        toast.error("Failed to get current location")
        speak("Failed to get location")
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header Controls */}
      <div className="flex-shrink-0 p-4 border-b border-border/50 bg-card/50 backdrop-blur">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">{t("liveMap.title") || "Live Location Tracker"}</h1>
              <div className="flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm text-muted-foreground">{isOnline ? "GPS Ready" : "Offline Mode"}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setMapStyle(mapStyle === "standard" ? "satellite" : mapStyle === "satellite" ? "terrain" : "standard")
              }
            >
              {mapStyle === "standard" ? "Standard" : mapStyle === "satellite" ? "Satellite" : "Terrain"}
            </Button>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center space-x-3 mb-4">
          <AnimatePresence mode="wait">
            {!isTracking ? (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button
                  onClick={startTracking}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={!isOnline}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {t("liveMap.startTracking") || "Start Tracking"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="stop"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button onClick={stopTracking} variant="destructive">
                  <Square className="h-4 w-4 mr-2" />
                  {t("liveMap.stopTracking") || "Stop Tracking"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <Button variant="outline" onClick={getCurrentLocation} disabled={!isOnline}>
            <Crosshair className="h-4 w-4 mr-2" />
            {t("liveMap.centerLocation") || "Center"}
          </Button>

          <Button variant="outline" onClick={shareLocation} disabled={!currentLocation}>
            <Share2 className="h-4 w-4 mr-2" />
            {t("liveMap.shareLocation") || "Share"}
          </Button>

          <Button variant="outline" onClick={shareLocation} disabled={!currentLocation}>
            <QrCode className="h-4 w-4 mr-2" />
            QR Code
          </Button>
        </div>

        {/* Status and Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold">{formatDuration(trackingStats.duration)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Navigation className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="font-semibold">{trackingStats.distance.toFixed(0)}m</p>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Avg Speed</p>
                <p className="font-semibold">{trackingStats.avgSpeed.toFixed(1)} km/h</p>
              </div>
            </div>
          </Card>

          <Card className="p-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Points</p>
                <p className="font-semibold">{trackingStats.points}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div
          ref={mapRef}
          className={`w-full h-full relative overflow-hidden ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
        >
          {/* Mock Map Interface */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              {error ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md"
                >
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-red-500 mb-2">Location Error</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  <Button variant="outline" size="sm" onClick={startTracking} className="mt-4 bg-transparent">
                    Try Again
                  </Button>
                </motion.div>
              ) : currentLocation ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-lg p-6 max-w-md glass dark:glass-dark"
                >
                  <div className="relative mb-4">
                    <div className="h-32 w-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center relative">
                      <MapPin className="h-16 w-16 text-white" />
                      {isTracking && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-blue-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </div>
                    <Badge
                      variant={
                        currentLocation.accuracy < 10
                          ? "default"
                          : currentLocation.accuracy < 50
                            ? "secondary"
                            : "destructive"
                      }
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    >
                      ±{currentLocation.accuracy.toFixed(0)}m
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Latitude:</span>
                      <span className="font-mono">{currentLocation.latitude.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Longitude:</span>
                      <span className="font-mono">{currentLocation.longitude.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated:</span>
                      <span>{currentLocation.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>

                  {isTracking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t border-border/50"
                    >
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Live Tracking Active</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-lg p-6 max-w-md"
                >
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Location Not Available</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start tracking to see your current location on the map
                  </p>
                  <Button onClick={startTracking} disabled={!isOnline}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Tracking
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Map Style Overlay */}
          <div className="absolute top-4 right-4">
            <Card className="p-2">
              <div className="text-xs text-muted-foreground">Map Style: {mapStyle}</div>
            </Card>
          </div>

          {/* Connection Status */}
          <div className="absolute bottom-4 left-4">
            <Card className="p-2">
              <div className="flex items-center space-x-2">
                {isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
                <span className="text-xs">{isOnline ? "Connected" : "Offline"}</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
