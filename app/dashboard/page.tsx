"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  MapPin,
  AlertTriangle,
  Phone,
  Navigation,
  Clock,
  Users,
  Settings,
  Bell,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Zap,
  CheckCircle,
  Calendar,
  Route,
  Heart,
  Battery,
  Wifi,
  Signal,
  Menu,
  X,
  Home,
  User,
  MessageCircle,
  HelpCircle,
  Star,
  Award,
  Eye,
  Headphones,
  WifiOff,
  Download,
  Share2,
  Sparkles,
  Trophy,
  Target,
  Layers,
} from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockItinerary = [
  {
    id: 1,
    time: "09:00 AM",
    title: "Hotel Check-in",
    location: "Grand Palace Hotel, Mumbai",
    status: "completed",
    type: "accommodation",
  },
  {
    id: 2,
    time: "11:00 AM",
    title: "Gateway of India Visit",
    location: "Apollo Bandar, Colaba",
    status: "completed",
    type: "sightseeing",
  },
  {
    id: 3,
    time: "02:00 PM",
    title: "Lunch at Leopold Cafe",
    location: "Colaba Causeway",
    status: "in-progress",
    type: "dining",
  },
  {
    id: 4,
    time: "04:00 PM",
    title: "Marine Drive Walk",
    location: "Queen's Necklace",
    status: "upcoming",
    type: "activity",
  },
  {
    id: 5,
    time: "07:00 PM",
    title: "Dinner at Trishna",
    location: "Fort District",
    status: "upcoming",
    type: "dining",
  },
]

const dangerZones = [
  { id: 1, name: "Construction Area", lat: 19.076, lng: 72.8777, risk: "medium" },
  { id: 2, name: "Crowded Market", lat: 19.0896, lng: 72.8656, risk: "low" },
  { id: 3, name: "Isolated Beach", lat: 19.0544, lng: 72.877, risk: "high" },
]

const achievements = [
  { id: 1, name: "Safe Explorer", icon: Shield, earned: true, points: 100 },
  { id: 2, name: "Local Guide", icon: MapPin, earned: true, points: 150 },
  { id: 3, name: "Night Owl", icon: Star, earned: false, points: 200 },
  { id: 4, name: "Social Butterfly", icon: Users, earned: true, points: 75 },
]

export default function TouristDashboard() {
  const [safetyScore, setSafetyScore] = useState(87)
  const [isTracking, setIsTracking] = useState(true)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("Leopold Cafe, Colaba")
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [emergencyCountdown, setEmergencyCountdown] = useState(0)
  const [rewardPoints, setRewardPoints] = useState(1250)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const [isVRMode, setIsVRMode] = useState(false)
  const [voiceCommand, setVoiceCommand] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [emergencyPressed, setEmergencyPressed] = useState(false)
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSafetyScore((prev) => Math.max(75, Math.min(95, prev + (Math.random() - 0.5) * 4)))
      setBatteryLevel((prev) => Math.max(10, prev - 0.1))
      if (safetyScore > 85) {
        setRewardPoints((prev) => prev + Math.floor(Math.random() * 5))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [safetyScore])

  // Emergency countdown
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (emergencyCountdown > 0) {
      interval = setInterval(() => {
        setEmergencyCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [emergencyCountdown])

  const handleEmergencyPress = () => {
    setEmergencyPressed(true)
    const timer = setTimeout(() => {
      setEmergencyCountdown(5)
      setShowEmergencyModal(true)
      setEmergencyPressed(false)
    }, 2000) // 2 second press and hold
    setPressTimer(timer)
  }

  const handleEmergencyRelease = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
    setEmergencyPressed(false)
  }

  const cancelEmergency = () => {
    setEmergencyCountdown(0)
    setShowEmergencyModal(false)
  }

  const confirmEmergency = () => {
    setEmergencyCountdown(0)
    setShowEmergencyModal(false)
    // Simulate emergency alert sent to multiple channels
    const emergencyData = {
      location: currentLocation,
      timestamp: new Date().toISOString(),
      safetyScore: safetyScore,
      batteryLevel: batteryLevel,
    }

    // Show enhanced confirmation
    alert(`🚨 EMERGENCY ALERT SENT! 🚨
    
Location: ${emergencyData.location}
Time: ${new Date().toLocaleString()}
Safety Score: ${Math.round(emergencyData.safetyScore)}%
Battery: ${Math.round(emergencyData.batteryLevel)}%

✅ Police notified
✅ Emergency contacts alerted  
✅ Medical services contacted
✅ Location shared with authorities`)
  }

  const startVoiceCommand = () => {
    setIsListening(true)
    setVoiceCommand("Listening...")

    // Simulate voice recognition
    setTimeout(() => {
      const commands = ["Help me", "Emergency", "Navigate home", "Call contact", "Safety status"]
      const randomCommand = commands[Math.floor(Math.random() * commands.length)]
      setVoiceCommand(`"${randomCommand}"`)

      setTimeout(() => {
        handleVoiceCommand(randomCommand)
        setIsListening(false)
        setVoiceCommand("")
      }, 1500)
    }, 2000)
  }

  const handleVoiceCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case "help me":
      case "emergency":
        handleEmergencyPress()
        break
      case "navigate home":
        alert("🧭 Navigation started to your hotel")
        break
      case "call contact":
        alert("📞 Calling emergency contact...")
        break
      case "safety status":
        alert(`🛡️ Current safety score: ${Math.round(safetyScore)}%\n📍 Location: ${currentLocation}`)
        break
      default:
        alert(`🎤 Voice command received: "${command}"`)
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getSafetyBadge = (score: number) => {
    if (score >= 80) return { text: "Safe", variant: "default" as const, color: "bg-green-500" }
    if (score >= 60) return { text: "Caution", variant: "secondary" as const, color: "bg-yellow-500" }
    return { text: "Alert", variant: "destructive" as const, color: "bg-red-500" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full z-50 glass dark:glass-dark border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold">SafeTravel</span>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {isOfflineMode ? <WifiOff className="h-3 w-3 mr-1" /> : <Signal className="h-3 w-3 mr-1" />}
              {isOfflineMode ? "Offline" : "4G"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Battery className="h-3 w-3 mr-1" />
              {Math.round(batteryLevel)}%
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              {rewardPoints}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col h-full pt-20 p-6">
              <nav className="space-y-4">
                <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10">
                  <Home className="h-5 w-5 text-primary" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => setShowAchievements(true)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted w-full text-left"
                >
                  <Award className="h-5 w-5" />
                  <span>Achievements</span>
                </button>
                <button
                  onClick={() => setIsVRMode(!isVRMode)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted w-full text-left"
                >
                  <Eye className="h-5 w-5" />
                  <span>{isVRMode ? "Exit VR Mode" : "VR Preview"}</span>
                </button>
                <Link href="/support" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                  <MessageCircle className="h-5 w-5" />
                  <span>Support</span>
                </Link>
                <Link href="/help" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </Link>
              </nav>

              <div className="mt-auto">
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsMenuOpen(false)}>
                  Close Menu
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 min-h-screen glass dark:glass-dark border-r border-border/50">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SafeTravel AI</span>
            </div>

            <nav className="space-y-2">
              <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 text-primary">
                <Home className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => setShowAchievements(true)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted w-full text-left"
              >
                <Award className="h-5 w-5" />
                <span>Achievements</span>
              </button>
              <button
                onClick={() => setIsVRMode(!isVRMode)}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted w-full text-left"
              >
                <Eye className="h-5 w-5" />
                <span>{isVRMode ? "Exit VR Mode" : "VR Preview"}</span>
              </button>
              <Link href="/support" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                <MessageCircle className="h-5 w-5" />
                <span>Support</span>
              </Link>
              <Link href="/help" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                <HelpCircle className="h-5 w-5" />
                <span>Help</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
          {/* Status Bar */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, John!</h1>
                <p className="text-muted-foreground">Currently in {currentLocation}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Trophy className="h-3 w-3" />
                    <span>{rewardPoints} Points</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>Level {Math.floor(rewardPoints / 500) + 1}</span>
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Real-time Tracking</span>
                  <Switch checked={isTracking} onCheckedChange={setIsTracking} />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Offline Mode</span>
                  <Switch checked={isOfflineMode} onCheckedChange={setIsOfflineMode} />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={voiceEnabled ? startVoiceCommand : () => setVoiceEnabled(true)}
                  className={isListening ? "bg-primary/20" : ""}
                >
                  {isListening ? (
                    <Headphones className="h-4 w-4" />
                  ) : voiceEnabled ? (
                    <Mic className="h-4 w-4" />
                  ) : (
                    <MicOff className="h-4 w-4" />
                  )}
                </Button>

                <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)}>
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-primary/10 rounded-lg p-3 flex items-center space-x-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Mic className="h-4 w-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium">{voiceCommand}</span>
              </motion.div>
            )}
          </div>

          {/* Safety Score & Enhanced Emergency Button */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 glass dark:glass-dark neuro dark:neuro-dark">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Safety Status</span>
                  </span>
                  <Badge {...getSafetyBadge(safetyScore)}>{getSafetyBadge(safetyScore).text}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">Safety Score</span>
                    <span className={`text-3xl font-bold ${getSafetyColor(safetyScore)}`}>
                      {Math.round(safetyScore)}%
                    </span>
                  </div>

                  <Progress value={safetyScore} className="h-3" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>Safe Zone</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>Crowded Area</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isOfflineMode ? (
                        <WifiOff className="h-4 w-4 text-orange-500" />
                      ) : (
                        <Wifi className="h-4 w-4 text-green-500" />
                      )}
                      <span>{isOfflineMode ? "Offline Mode" : "Good Connectivity"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      <span>Normal Vitals</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Emergency Button */}
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    onMouseDown={handleEmergencyPress}
                    onMouseUp={handleEmergencyRelease}
                    onTouchStart={handleEmergencyPress}
                    onTouchEnd={handleEmergencyRelease}
                    className={`w-24 h-24 rounded-full text-white shadow-lg relative overflow-hidden transition-all duration-300 ${
                      emergencyPressed ? "bg-red-600 scale-110" : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-red-400 rounded-full"
                      animate={{
                        scale: emergencyPressed ? [1, 1.5, 1] : [1, 1.2, 1],
                        opacity: emergencyPressed ? [0.8, 0.3, 0.8] : [0.6, 0.2, 0.6],
                      }}
                      transition={{ duration: emergencyPressed ? 0.5 : 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="absolute inset-2 bg-red-300 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.1, 0.4],
                      }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                    />
                    <Zap className="h-8 w-8 relative z-10" />

                    {emergencyPressed && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2 }}
                      />
                    )}
                  </Button>
                </motion.div>

                <div className="text-center mt-4">
                  <h3 className="font-semibold text-red-500">Emergency SOS</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {emergencyPressed ? "Hold for 2 seconds..." : "Press & hold for help"}
                  </p>
                  {emergencyPressed && <Progress value={50} className="h-1 mt-2 w-20 mx-auto" />}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Map and Itinerary */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Interactive Map with VR Mode */}
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Navigation className="h-5 w-5 text-primary" />
                    <span>Live Location & Safety Zones</span>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsVRMode(!isVRMode)}
                    className={isVRMode ? "bg-primary/20" : "bg-transparent"}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {isVRMode ? "3D" : "2D"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`relative bg-muted/20 rounded-lg h-64 overflow-hidden transition-all duration-500 ${
                    isVRMode
                      ? "bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                      : "bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20"
                  }`}
                >
                  {isVRMode && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}

                  {/* Current Location */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: isVRMode ? [1, 1.5, 1] : [1, 1.2, 1],
                      boxShadow: isVRMode
                        ? [
                            "0 0 0 rgba(59, 130, 246, 0)",
                            "0 0 30px rgba(59, 130, 246, 0.8)",
                            "0 0 0 rgba(59, 130, 246, 0)",
                          ]
                        : [
                            "0 0 0 rgba(59, 130, 246, 0)",
                            "0 0 20px rgba(59, 130, 246, 0.5)",
                            "0 0 0 rgba(59, 130, 246, 0)",
                          ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div
                      className={`w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg ${
                        isVRMode ? "shadow-blue-500/50" : ""
                      }`}
                    />
                  </motion.div>

                  {/* Enhanced Danger Zones with 3D effect */}
                  <motion.div
                    className={`absolute top-1/4 right-1/4 w-8 h-8 bg-red-500/30 rounded-full border-2 border-red-500 ${
                      isVRMode ? "shadow-lg shadow-red-500/30" : ""
                    }`}
                    animate={isVRMode ? { y: [0, -5, 0] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className={`absolute bottom-1/3 left-1/4 w-6 h-6 bg-yellow-500/30 rounded-full border-2 border-yellow-500 ${
                      isVRMode ? "shadow-lg shadow-yellow-500/30" : ""
                    }`}
                    animate={isVRMode ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className={`absolute top-3/4 right-1/3 w-10 h-10 bg-red-500/30 rounded-full border-2 border-red-500 ${
                      isVRMode ? "shadow-lg shadow-red-500/30" : ""
                    }`}
                    animate={isVRMode ? { y: [0, -7, 0] } : {}}
                    transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* Enhanced Safe Zones */}
                  <motion.div
                    className={`absolute top-1/3 left-1/3 w-12 h-12 bg-green-500/20 rounded-full border-2 border-green-500 border-dashed ${
                      isVRMode ? "shadow-lg shadow-green-500/30" : ""
                    }`}
                    animate={isVRMode ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* VR Mode Tourist Clusters */}
                  {isVRMode && (
                    <>
                      <motion.div
                        className="absolute top-1/5 left-2/3 flex space-x-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      </motion.div>
                      <motion.div
                        className="absolute bottom-1/5 right-1/5 flex space-x-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                      >
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                      </motion.div>
                    </>
                  )}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      +
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      -
                    </Button>
                    <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                      <Layers className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Enhanced Legend */}
                  <div className="absolute bottom-4 left-4 bg-background/90 rounded-lg p-2 text-xs space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>Your Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500/50 rounded-full border border-green-500" />
                      <span>Safe Zone</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500/50 rounded-full border border-red-500" />
                      <span>Danger Zone</span>
                    </div>
                    {isVRMode && (
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full" />
                        <span>Tourist Clusters</span>
                      </div>
                    )}
                  </div>

                  {/* VR Mode Indicator */}
                  {isVRMode && (
                    <div className="absolute top-4 left-4 bg-purple-500/20 rounded-lg px-2 py-1 text-xs font-medium">
                      <Sparkles className="h-3 w-3 inline mr-1" />
                      VR Mode Active
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Last updated: {isOfflineMode ? "Offline data" : "Just now"}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsOfflineMode(true)}>
                      <Download className="h-4 w-4 mr-2" />
                      Offline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Travel Itinerary */}
            <Card className="glass dark:glass-dark neuro dark:neuro-dark">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Today's Itinerary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockItinerary.map((item, index) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "completed"
                              ? "bg-green-500"
                              : item.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-muted"
                          }`}
                        />
                        {index < mockItinerary.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium">{item.time}</span>
                          {item.status === "in-progress" && (
                            <Badge variant="secondary" className="text-xs">
                              Current
                            </Badge>
                          )}
                          {item.status === "completed" && (
                            <Badge variant="outline" className="text-xs flex items-center space-x-1">
                              <Star className="h-2 w-2" />
                              <span>+{Math.floor(Math.random() * 50) + 10}</span>
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        {item.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {item.status === "in-progress" && <Clock className="h-4 w-4 text-blue-500" />}
                        {item.status === "upcoming" && <Route className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Full Itinerary
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass dark:glass-dark neuro dark:neuro-dark hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Phone className="h-8 w-8 text-green-500 mb-2" />
                <span className="font-medium text-sm">Emergency Contacts</span>
              </CardContent>
            </Card>

            <Link href="/alerts">
              <Card className="glass dark:glass-dark neuro dark:neuro-dark hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Bell className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="font-medium text-sm">Alerts & Notifications</span>
                </CardContent>
              </Card>
            </Link>

            <Card className="glass dark:glass-dark neuro dark:neuro-dark hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Settings className="h-8 w-8 text-purple-500 mb-2" />
                <span className="font-medium text-sm">Safety Settings</span>
              </CardContent>
            </Card>

            <Card className="glass dark:glass-dark neuro dark:neuro-dark hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <MessageCircle className="h-8 w-8 text-orange-500 mb-2" />
                <span className="font-medium text-sm">Live Support</span>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Enhanced Emergency Modal */}
      <AnimatePresence>
        {showEmergencyModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-2xl p-6 max-w-md w-full glass dark:glass-dark neuro dark:neuro-dark"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center space-y-4">
                <motion.div
                  className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </motion.div>

                <div>
                  <h3 className="text-xl font-bold text-red-500">🚨 Emergency Alert</h3>
                  <p className="text-muted-foreground mt-2">
                    {emergencyCountdown > 0
                      ? `Sending emergency alert in ${emergencyCountdown} seconds...`
                      : "Are you sure you want to send an emergency alert?"}
                  </p>
                  <div className="mt-3 text-xs text-muted-foreground space-y-1">
                    <p>📍 Location: {currentLocation}</p>
                    <p>🛡️ Safety Score: {Math.round(safetyScore)}%</p>
                    <p>🔋 Battery: {Math.round(batteryLevel)}%</p>
                  </div>
                </div>

                {emergencyCountdown > 0 ? (
                  <div className="space-y-4">
                    <Progress value={(5 - emergencyCountdown) * 20} className="h-2" />
                    <Button onClick={cancelEmergency} variant="outline" className="w-full bg-transparent">
                      Cancel Emergency Alert
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <Button onClick={cancelEmergency} variant="outline" className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                    <Button onClick={confirmEmergency} className="flex-1 bg-red-500 hover:bg-red-600">
                      Send Alert
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAchievements && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-2xl p-6 max-w-md w-full glass dark:glass-dark neuro dark:neuro-dark"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold flex items-center justify-center space-x-2">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span>Achievements</span>
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">Your safety milestones</p>
                </div>

                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.earned ? "bg-green-500/10 border border-green-500/20" : "bg-muted/50"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned ? "bg-green-500/20" : "bg-muted"
                        }`}
                      >
                        <achievement.icon
                          className={`h-5 w-5 ${achievement.earned ? "text-green-500" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">+{achievement.points} points</p>
                      </div>
                      {achievement.earned && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  ))}
                </div>

                <Button onClick={() => setShowAchievements(false)} className="w-full">
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
