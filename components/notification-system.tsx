"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BellRing, X, AlertTriangle, CheckCircle, Info, Zap } from "lucide-react"

interface Notification {
  id: string
  type: "emergency" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "high" | "medium" | "low"
  actionRequired?: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "emergency",
    title: "Emergency SOS Activated",
    message: "David Wilson has activated emergency SOS at Colaba Market",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false,
    priority: "high",
    actionRequired: true,
  },
  {
    id: "2",
    type: "warning",
    title: "Route Deviation Alert",
    message: "Maria Garcia has deviated from planned route by 800m",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "info",
    title: "Safety Score Updated",
    message: "Your current safety score has been updated to 92%",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: true,
    priority: "low",
  },
]

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const [showToast, setShowToast] = useState<Notification | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.7 ? "emergency" : Math.random() > 0.5 ? "warning" : "info",
          title: "New Alert",
          message: "AI has detected an anomaly requiring attention",
          timestamp: new Date(),
          read: false,
          priority: Math.random() > 0.7 ? "high" : Math.random() > 0.5 ? "medium" : "low",
          actionRequired: Math.random() > 0.7,
        }

        setNotifications((prev) => [newNotification, ...prev])
        setShowToast(newNotification)

        // Auto-hide toast after 5 seconds
        setTimeout(() => setShowToast(null), 5000)
      }
    }, 20000) // Every 20 seconds

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "border-red-500 bg-red-500/10"
      case "warning":
        return "border-yellow-500 bg-yellow-500/10"
      case "success":
        return "border-green-500 bg-green-500/10"
      default:
        return "border-blue-500 bg-blue-500/10"
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

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
          {unreadCount > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>

        {/* Notification Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-auto glass dark:glass-dark neuro dark:neuro-dark rounded-lg border border-border/50 z-50"
            >
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="flex items-center space-x-2">
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        Mark all read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="max-h-80 overflow-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-muted/20 cursor-pointer border-l-4 ${getNotificationColor(
                          notification.type,
                        )} ${!notification.read ? "bg-muted/10" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-sm">{notification.title}</p>
                                {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                                {notification.actionRequired && (
                                  <Badge variant="destructive" className="text-xs">
                                    Action Required
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50"
          >
            <div
              className={`glass dark:glass-dark neuro dark:neuro-dark p-4 rounded-lg border-l-4 ${getNotificationColor(showToast.type)} max-w-sm`}
            >
              <div className="flex items-start space-x-3">
                {getNotificationIcon(showToast.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{showToast.title}</p>
                    <Button variant="ghost" size="sm" onClick={() => setShowToast(null)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{showToast.message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
