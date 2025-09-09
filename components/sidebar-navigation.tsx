"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, MessageCircle, MapPin, User, Menu, X, Shield, Bell, Settings, LogOut } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface NavigationItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
}

interface SidebarNavigationProps {
  className?: string
}

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navigationItems: NavigationItem[] = [
    {
      href: "/dashboard",
      label: t("nav.dashboard") || "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/chatbot",
      label: t("nav.chatbot") || "AI Assistant",
      icon: MessageCircle,
      badge: 3,
    },
    {
      href: "/live-map",
      label: t("nav.liveMap") || "Live Tracking",
      icon: MapPin,
    },
    {
      href: "/profile",
      label: t("nav.profile") || "Profile",
      icon: User,
    },
    {
      href: "/alerts",
      label: t("nav.alerts") || "Alerts",
      icon: Bell,
      badge: 2,
    },
  ]

  const secondaryItems: NavigationItem[] = [
    {
      href: "/settings",
      label: t("nav.settings") || "Settings",
      icon: Settings,
    },
  ]

  const NavItem = ({ item, isActive }: { item: NavigationItem; isActive: boolean }) => (
    <Link href={item.href} className="block">
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
          isActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
      >
        <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-primary-foreground")} />

        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-medium text-sm truncate"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {item.badge && (
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Badge
                  variant="destructive"
                  className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {item.badge}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {isCollapsed && item.badge && (
          <div className="absolute -top-1 -right-1">
            <Badge variant="destructive" className="h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
              {item.badge}
            </Badge>
          </div>
        )}
      </motion.div>
    </Link>
  )

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex items-center space-x-3 px-3 py-4 border-b border-border/50">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center flex-shrink-0">
          <Shield className="h-4 w-4 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <h2 className="font-bold text-sm text-foreground">SafeTravel</h2>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavItem key={item.href} item={item} isActive={pathname === item.href} />
          ))}
        </div>

        <div className="pt-4 mt-4 border-t border-border/50 space-y-1">
          {secondaryItems.map((item) => (
            <NavItem key={item.href} item={item} isActive={pathname === item.href} />
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="px-3 py-4 border-t border-border/50">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start space-x-3 text-muted-foreground hover:text-foreground",
            isCollapsed && "justify-center",
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm"
              >
                {t("nav.logout") || "Logout"}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-72 bg-card border-r border-border/50 z-50 md:hidden glass dark:glass-dark"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "hidden md:flex flex-col h-full bg-card border-r border-border/50 glass dark:glass-dark relative",
          className,
        )}
      >
        <SidebarContent />

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-background shadow-md hover:shadow-lg transition-all duration-200"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <Menu className="h-3 w-3" />
          </motion.div>
        </Button>
      </motion.aside>
    </>
  )
}
