"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  Bell,
  BellRing,
  Shield,
  MapPin,
  Clock,
  User,
  Search,
  CheckCircle,
  Eye,
  Phone,
  Navigation,
  Activity,
  Zap,
  Route,
  UserX,
  WifiOff,
  Heart,
  ArrowLeft,
  RefreshCw,
  Settings,
  Download,
} from "lucide-react"
import Link from "next/link"

// Mock AI alert data
const mockAlerts = [
  {
    id: 1,
    type: "route_deviation",
    title: "Route Deviation Detected",
    description: "Tourist has deviated from planned route by more than 500m",
    tourist: "John Smith",
    touristId: "STA-001",
    location: "Near Colaba Market",
    coordinates: { lat: 18.922, lng: 72.8347 },
    severity: "medium",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: "active",
    aiConfidence: 87,
    suggestedAction: "Contact tourist to verify location",
    icon: Route,
  },
  {
    id: 2,
    type: "prolonged_inactivity",
    title: "Prolonged Inactivity Alert",
    description: "No movement detected for over 30 minutes",
    tourist: "Maria Garcia",
    touristId: "STA-002",
    location: "Marine Drive",
    coordinates: { lat: 18.9434, lng: 72.8234 },
    severity: "high",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    status: "investigating",
    aiConfidence: 94,
    suggestedAction: "Immediate welfare check required",
    icon: UserX,
  },
  {
    id: 3,
    type: "sudden_location_drop",
    title: "Sudden Location Signal Loss",
    description: "GPS signal lost abruptly in non-coverage area",
    tourist: "David Wilson",
    touristId: "STA-003",
    location: "Last seen: Gateway of India",
    coordinates: { lat: 18.922, lng: 72.8347 },
    severity: "high",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    status: "active",
    aiConfidence: 91,
    suggestedAction: "Deploy search team to last known location",
    icon: WifiOff,
  },
  {
    id: 4,
    type: "anomalous_behavior",
    title: "Anomalous Movement Pattern",
    description: "Unusual movement pattern detected by AI analysis",
    tourist: "Yuki Tanaka",
    touristId: "STA-004",
    location: "Bandra West",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    severity: "low",
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    status: "monitoring",
    aiConfidence: 73,
    suggestedAction: "Continue monitoring for 15 minutes",
    icon: Activity,
  },
  {
    id: 5,
    type: "health_anomaly",
    title: "Health Vitals Alert",
    description: "Irregular heart rate pattern detected from wearable device",
    tourist: "Sarah Johnson",
    touristId: "STA-005",
    location: "Juhu Beach",
    coordinates: { lat: 19.099, lng: 72.8258 },
    severity: "medium",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    status: "active",
    aiConfidence: 82,
    suggestedAction: "Contact tourist for health check",
    icon: Heart,
  },
  {
    id: 6,
    type: "geofence_breach",
    title: "Danger Zone Entry",
    description: "Tourist entered high-risk area marked as dangerous",
    tourist: "Michael Brown",
    touristId: "STA-006",
    location: "Dharavi Area",
    coordinates: { lat: 19.0423, lng: 72.857 },
    severity: "high",
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    status: "active",
    aiConfidence: 98,
    suggestedAction: "Immediate contact and guidance to safe area",
    icon: AlertTriangle,
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts)
  const [searchQuery, setSearchQuery] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [newAlertCount, setNewAlertCount] = useState(0)

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new alerts (simulation)
      if (Math.random() > 0.7) {
        const newAlert = {
          ...mockAlerts[Math.floor(Math.random() * mockAlerts.length)],
          id: Date.now(),
          timestamp: new Date(),
        }
        setAlerts((prev) => [newAlert, ...prev])
        setNewAlertCount((prev) => prev + 1)
      }
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  // Filter alerts
  useEffect(() => {
    let filtered = alerts

    if (searchQuery) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.tourist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.touristId.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter)
    }

    setFilteredAlerts(filtered)
  }, [alerts, searchQuery, severityFilter, statusFilter])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return { variant: "destructive" as const, color: "bg-red-500" }
      case "medium":
        return { variant: "secondary" as const, color: "bg-yellow-500" }
      case "low":
        return { variant: "default" as const, color: "bg-green-500" }
      default:
        return { variant: "outline" as const, color: "bg-muted" }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-500"
      case "investigating":
        return "text-yellow-500"
      case "monitoring":
        return "text-blue-500"
      case "resolved":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const handleAlertAction = (alertId: number, action: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: action === "resolve" ? "resolved" : action === "investigate" ? "investigating" : alert.status,
            }
          : alert,
      ),
    )
  }

  const markAllAsRead = () => {
    setNewAlertCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 glass dark:glass-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-semibold">SafeTravel AI</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <BellRing className="h-5 w-5 text-primary" />
                <span className="font-semibold">AI Alerts & Notifications</span>
                {newAlertCount > 0 && (
                  <Badge variant="destructive" className="px-2 py-1 text-xs">
                    {newAlertCount} new
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-red-500">
                    {alerts.filter((a) => a.status === "active").length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-red-500">
                    {alerts.filter((a) => a.severity === "high").length}
                  </p>
                </div>
                <Zap className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Under Investigation</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {alerts.filter((a) => a.status === "investigating").length}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved Today</p>
                  <p className="text-2xl font-bold text-green-500">
                    {alerts.filter((a) => a.status === "resolved").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass dark:glass-dark neuro dark:neuro-dark mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts by tourist name, ID, or alert type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Feed */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass dark:glass-dark neuro dark:neuro-dark hover:scale-[1.01] transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              alert.severity === "high"
                                ? "bg-red-500/10 text-red-500"
                                : alert.severity === "medium"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-green-500/10 text-green-500"
                            }`}
                          >
                            <alert.icon className="h-6 w-6" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            <Badge {...getSeverityBadge(alert.severity)}>{alert.severity} priority</Badge>
                            <Badge variant="outline" className={getStatusColor(alert.status)}>
                              {alert.status}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-3">{alert.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {alert.tourist} ({alert.touristId})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{alert.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{formatTimeAgo(alert.timestamp)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4 text-muted-foreground" />
                              <span>AI Confidence: {alert.aiConfidence}%</span>
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                            <p className="text-sm">
                              <strong>Suggested Action:</strong> {alert.suggestedAction}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 mt-4">
                            <Button size="sm" onClick={() => handleAlertAction(alert.id, "investigate")}>
                              <Eye className="h-4 w-4 mr-2" />
                              Investigate
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Contact Tourist
                            </Button>
                            <Button variant="outline" size="sm">
                              <Navigation className="h-4 w-4 mr-2" />
                              Track Location
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAlertAction(alert.id, "resolve")}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Resolved
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alert.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredAlerts.length === 0 && (
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || severityFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your filters to see more alerts."
                    : "All tourists are safe and no alerts have been triggered."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
