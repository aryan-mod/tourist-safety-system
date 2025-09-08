"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  AlertTriangle,
  MapPin,
  Search,
  Bell,
  Clock,
  Phone,
  FileText,
  Eye,
  Download,
  RefreshCw,
  Activity,
  Navigation,
  UserCheck,
  CheckCircle,
  BarChart3,
  Map,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Send,
  Printer,
  Save,
  ChevronRight,
  MessageSquare,
} from "lucide-react"

// Mock data for demonstration
const mockTourists = [
  {
    id: "STA-001",
    name: "John Smith",
    nationality: "American",
    location: "Gateway of India",
    safetyScore: 92,
    status: "safe",
    lastSeen: "2 minutes ago",
    phone: "+1-555-0123",
    emergencyContact: "Jane Smith (+1-555-0124)",
    checkInTime: "09:30 AM",
  },
  {
    id: "STA-002",
    name: "Maria Garcia",
    nationality: "Spanish",
    location: "Marine Drive",
    safetyScore: 78,
    status: "caution",
    lastSeen: "5 minutes ago",
    phone: "+34-600-123456",
    emergencyContact: "Carlos Garcia (+34-600-123457)",
    checkInTime: "10:15 AM",
  },
  {
    id: "STA-003",
    name: "David Wilson",
    nationality: "British",
    location: "Colaba Market",
    safetyScore: 45,
    status: "alert",
    lastSeen: "15 minutes ago",
    phone: "+44-7700-900123",
    emergencyContact: "Sarah Wilson (+44-7700-900124)",
    checkInTime: "11:00 AM",
  },
  {
    id: "STA-004",
    name: "Yuki Tanaka",
    nationality: "Japanese",
    location: "Taj Hotel",
    safetyScore: 88,
    status: "safe",
    lastSeen: "1 minute ago",
    phone: "+81-90-1234-5678",
    emergencyContact: "Hiroshi Tanaka (+81-90-1234-5679)",
    checkInTime: "08:45 AM",
  },
]

const mockAlerts = [
  {
    id: 1,
    type: "emergency",
    tourist: "David Wilson",
    touristId: "STA-003",
    message: "Emergency SOS activated",
    location: "Colaba Market",
    timestamp: "2 minutes ago",
    status: "active",
    priority: "high",
  },
  {
    id: 2,
    type: "deviation",
    tourist: "Maria Garcia",
    touristId: "STA-002",
    message: "Route deviation detected",
    location: "Marine Drive",
    timestamp: "8 minutes ago",
    status: "investigating",
    priority: "medium",
  },
  {
    id: 3,
    type: "inactivity",
    tourist: "John Smith",
    touristId: "STA-001",
    message: "Prolonged inactivity detected",
    location: "Gateway of India",
    timestamp: "12 minutes ago",
    status: "resolved",
    priority: "low",
  },
]

const mockHeatmapData = [
  { area: "Gateway of India", tourists: 45, density: "high", risk: "low" },
  { area: "Marine Drive", tourists: 32, density: "medium", risk: "low" },
  { area: "Colaba Market", tourists: 28, density: "high", risk: "medium" },
  { area: "Taj Hotel Area", tourists: 18, density: "low", risk: "low" },
  { area: "Fort District", tourists: 15, density: "medium", risk: "medium" },
]

export default function PoliceDashboard() {
  const [selectedTourist, setSelectedTourist] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showEFIRForm, setShowEFIRForm] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [efirStep, setEfirStep] = useState(1)

  const [stats, setStats] = useState({
    totalTourists: 156,
    activeTourists: 142,
    activeAlerts: 3,
    resolvedToday: 12,
  })

  // Filter tourists based on search and status
  const filteredTourists = mockTourists.filter((tourist) => {
    const matchesSearch =
      tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tourist.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || tourist.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-green-500"
      case "caution":
        return "text-yellow-500"
      case "alert":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return { variant: "default" as const, color: "bg-green-500" }
      case "caution":
        return { variant: "secondary" as const, color: "bg-yellow-500" }
      case "alert":
        return { variant: "destructive" as const, color: "bg-red-500" }
      default:
        return { variant: "outline" as const, color: "bg-muted" }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? "w-16" : "w-64"} transition-all duration-300 glass dark:glass-dark border-r border-border/50 flex flex-col`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Police Portal</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Overview</span>}
          </Button>

          <Button
            variant={activeTab === "tourists" ? "default" : "ghost"}
            className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}
            onClick={() => setActiveTab("tourists")}
          >
            <Users className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Tourist Monitoring</span>}
          </Button>

          <Button
            variant={activeTab === "alerts" ? "default" : "ghost"}
            className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}
            onClick={() => setActiveTab("alerts")}
          >
            <AlertTriangle className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Active Alerts</span>}
          </Button>

          <Button
            variant={activeTab === "heatmap" ? "default" : "ghost"}
            className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}
            onClick={() => setActiveTab("heatmap")}
          >
            <Map className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Heatmap</span>}
          </Button>

          <Button
            variant={activeTab === "efir" ? "default" : "ghost"}
            className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}
            onClick={() => setActiveTab("efir")}
          >
            <FileText className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">E-FIR System</span>}
          </Button>
        </nav>

        <div className="p-4 border-t border-border/50">
          <Button variant="ghost" className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}>
            <Settings className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Settings</span>}
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}>
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Police Command Center</h1>
              <p className="text-muted-foreground">Real-time tourist safety monitoring and incident response</p>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Badge variant="outline" className="px-3 py-1">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tourists</p>
                      <p className="text-2xl font-bold">{stats.totalTourists}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Now</p>
                      <p className="text-2xl font-bold text-green-500">{stats.activeTourists}</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Alerts</p>
                      <p className="text-2xl font-bold text-red-500">{stats.activeAlerts}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Resolved Today</p>
                      <p className="text-2xl font-bold text-green-500">{stats.resolvedToday}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            alert.priority === "high"
                              ? "bg-red-500"
                              : alert.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-muted-foreground">
                            {alert.tourist} • {alert.location} • {alert.timestamp}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tourist Monitoring Tab */}
        {activeTab === "tourists" && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tourists by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="safe">Safe</SelectItem>
                      <SelectItem value="caution">Caution</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tourist List */}
            <div className="grid gap-4">
              {filteredTourists.map((tourist) => (
                <Card
                  key={tourist.id}
                  className="glass dark:glass-dark neuro dark:neuro-dark hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{tourist.name}</h3>
                            <Badge {...getStatusBadge(tourist.status)}>{tourist.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ID: {tourist.id} • {tourist.nationality}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{tourist.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{tourist.lastSeen}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Safety Score</p>
                          <p className={`text-lg font-bold ${getStatusColor(tourist.status)}`}>
                            {tourist.safetyScore}%
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Navigation className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Alerts</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </div>

            <div className="grid gap-4">
              {mockAlerts.map((alert) => (
                <Card key={alert.id} className="glass dark:glass-dark neuro dark:neuro-dark">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full mt-1 ${
                            alert.priority === "high"
                              ? "bg-red-500"
                              : alert.priority === "medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        />

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold">{alert.message}</h3>
                            <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                              {alert.priority} priority
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>
                              Tourist: {alert.tourist} ({alert.touristId})
                            </p>
                            <p>Location: {alert.location}</p>
                            <p>Time: {alert.timestamp}</p>
                          </div>

                          <div className="flex items-center space-x-2 mt-4">
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact Tourist
                            </Button>
                            <Button variant="outline" size="sm">
                              <Navigation className="h-4 w-4 mr-2" />
                              Track Location
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Generate E-FIR
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Badge variant={alert.status === "active" ? "destructive" : "secondary"}>{alert.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Heatmap Tab */}
        {activeTab === "heatmap" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tourist Heatmap</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Mock Heatmap */}
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardContent className="p-6">
                <div className="relative bg-muted/20 rounded-lg h-96 overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20">
                    {/* High density areas */}
                    <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-red-500/40 rounded-full blur-sm" />
                    <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-orange-500/40 rounded-full blur-sm" />
                    <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-red-500/40 rounded-full blur-sm" />

                    {/* Medium density areas */}
                    <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-yellow-500/40 rounded-full blur-sm" />
                    <div className="absolute bottom-1/4 right-1/2 w-14 h-14 bg-yellow-500/40 rounded-full blur-sm" />

                    {/* Low density areas */}
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-green-500/40 rounded-full blur-sm" />
                  </div>

                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-background/90 rounded-lg p-3 text-xs space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span>High Density (40+ tourists)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span>Medium Density (20-40 tourists)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Low Density (&lt;20 tourists)</span>
                    </div>
                  </div>
                </div>

                {/* Area Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockHeatmapData.map((area, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{area.area}</h4>
                        <Badge
                          variant={
                            area.risk === "high" ? "destructive" : area.risk === "medium" ? "secondary" : "default"
                          }
                        >
                          {area.risk} risk
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between">
                          <span>Tourists:</span>
                          <span className="font-medium">{area.tourists}</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Density:</span>
                          <span className="font-medium capitalize">{area.density}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* E-FIR Tab */}
        {activeTab === "efir" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">E-FIR Generation System</h2>
              <Button onClick={() => setShowEFIRForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Generate New E-FIR
              </Button>
            </div>

            {/* E-FIR Form Modal */}
            <AnimatePresence>
              {showEFIRForm && (
                <motion.div
                  className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-background rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto glass dark:glass-dark neuro dark:neuro-dark"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Generate E-FIR</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowEFIRForm(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* E-FIR Form Steps */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 mb-6">
                        {[1, 2, 3].map((step) => (
                          <div key={step} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                efirStep >= step
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {step}
                            </div>
                            {step < 3 && <div className="w-12 h-px bg-border mx-2" />}
                          </div>
                        ))}
                      </div>

                      {efirStep === 1 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Incident Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Incident Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select incident type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="emergency">Emergency SOS</SelectItem>
                                  <SelectItem value="theft">Theft/Robbery</SelectItem>
                                  <SelectItem value="medical">Medical Emergency</SelectItem>
                                  <SelectItem value="harassment">Harassment</SelectItem>
                                  <SelectItem value="fraud">Fraud/Scam</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Priority Level</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Incident Description</Label>
                            <Textarea placeholder="Describe the incident in detail..." rows={4} />
                          </div>
                        </div>
                      )}

                      {efirStep === 2 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Tourist Information</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Tourist ID</Label>
                              <Input placeholder="STA-001" />
                            </div>
                            <div className="space-y-2">
                              <Label>Tourist Name</Label>
                              <Input placeholder="John Smith" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input placeholder="Gateway of India" />
                            </div>
                            <div className="space-y-2">
                              <Label>Contact Number</Label>
                              <Input placeholder="+1-555-0123" />
                            </div>
                          </div>
                        </div>
                      )}

                      {efirStep === 3 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Review & Submit</h4>
                          <div className="bg-muted/20 rounded-lg p-4 space-y-2">
                            <p>
                              <strong>Incident Type:</strong> Emergency SOS
                            </p>
                            <p>
                              <strong>Priority:</strong> High
                            </p>
                            <p>
                              <strong>Tourist:</strong> John Smith (STA-001)
                            </p>
                            <p>
                              <strong>Location:</strong> Gateway of India
                            </p>
                            <p>
                              <strong>Generated ID:</strong> EFIR-{Date.now().toString().slice(-6)}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEfirStep(Math.max(1, efirStep - 1))}
                          disabled={efirStep === 1}
                        >
                          Previous
                        </Button>

                        {efirStep < 3 ? (
                          <Button onClick={() => setEfirStep(efirStep + 1)}>Next</Button>
                        ) : (
                          <div className="space-x-2">
                            <Button variant="outline">
                              <Save className="h-4 w-4 mr-2" />
                              Save Draft
                            </Button>
                            <Button>
                              <Send className="h-4 w-4 mr-2" />
                              Submit E-FIR
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recent E-FIRs */}
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardHeader>
                <CardTitle>Recent E-FIRs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div>
                        <p className="font-medium">EFIR-{Date.now().toString().slice(-6) + item}</p>
                        <p className="text-sm text-muted-foreground">Emergency SOS - John Smith - 2 hours ago</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
