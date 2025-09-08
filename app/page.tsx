"use client"

import React from "react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  MapPin,
  AlertTriangle,
  Globe,
  Smartphone,
  Users,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  X,
  Play,
  Star,
  CheckCircle,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { useAccessibility } from "@/contexts/accessibility-context"
import { AccessibilitySettings } from "@/components/accessibility-settings"
import { VoiceAssistant } from "@/components/voice-assistant"
import { NotificationSystem } from "@/components/notification-system"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { speak } = useAccessibility()

  const safetyTips = [
    t("tips.shareLocation") || "Always share your location with trusted contacts",
    t("tips.emergencyNumbers") || "Keep emergency numbers saved and accessible",
    t("tips.wellLitAreas") || "Stay in well-lit, populated areas after dark",
    t("tips.trustInstincts") || "Trust your instincts - if something feels wrong, leave",
    t("tips.cloudStorage") || "Keep copies of important documents in cloud storage",
  ]

  // Auto-rotate safety tips
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % safetyTips.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [safetyTips.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass dark:glass-dark border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SafeTravel AI
              </span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-6">
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  speak(`Language changed to ${languages.find((l) => l.code === e.target.value)?.name}`)
                }}
                className="bg-transparent border border-border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Select language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-background">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>

              <div className="relative">
                <AccessibilitySettings />
              </div>

              <div className="relative">
                <NotificationSystem />
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark")
                  speak(`Switched to ${theme === "dark" ? "light" : "dark"} mode`)
                }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <Button variant="outline" size="sm">
                {t("nav.signIn") || "Sign In"}
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Select language"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-background">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>

            <div className="relative">
              <AccessibilitySettings />
            </div>

            <Button
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              Toggle Theme
            </Button>

            <Button variant="outline">{t("nav.signIn") || "Sign In"}</Button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  {t("hero.aiPowered") || "AI-Powered Safety Technology"}
                </Badge>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
                  {t("hero.travelSafe") || "Travel Safe with"}{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {t("hero.smartProtection") || "Smart Protection"}
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  {t("hero.description") ||
                    "Advanced AI monitoring, geo-fencing alerts, and blockchain-secured digital ID for the ultimate travel safety experience. Your security is our priority."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/digital-id">
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto"
                    onClick={() => speak("Navigating to digital ID generation")}
                  >
                    {t("hero.generateId") || "Generate Digital Tourist ID"}
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Button variant="outline" size="lg" className="group bg-transparent">
                  <Play className="mr-2 h-4 w-4" />
                  {t("hero.watchDemo") || "Watch Demo"}
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{t("features.aiMonitoring24") || "24/7 AI Monitoring"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{t("features.instantResponse") || "Instant Emergency Response"}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative glass dark:glass-dark rounded-3xl p-8 neuro dark:neuro-dark">
                <img
                  src="/modern-smartphone-showing-travel-safety-app-interf.jpg"
                  alt={t("hero.appInterfaceAlt") || "SafeTravel AI App Interface"}
                  className="w-full h-auto rounded-2xl"
                />

                {/* Floating Safety Score */}
                <motion.div
                  className="absolute -top-4 -right-4 glass dark:glass-dark rounded-2xl p-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">95%</div>
                    <div className="text-xs text-muted-foreground">{t("dashboard.safetyScore") || "Safety Score"}</div>
                  </div>
                </motion.div>

                {/* Floating Alert */}
                <motion.div
                  className="absolute -bottom-4 -left-4 glass dark:glass-dark rounded-2xl p-3 flex items-center space-x-2"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs">{t("alerts.safeZoneActive") || "Safe Zone Active"}</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Tips Ticker */}
      <section className="py-4 bg-primary/5 border-y border-border/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center justify-center space-x-4"
            key={currentTipIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium text-center">
              {t("tips.prefix") || "Safety Tip"}: {safetyTips[currentTipIndex]}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.completeEcosystem") || "Complete Safety Ecosystem"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {t("features.comprehensiveProtection") ||
                "Comprehensive protection powered by cutting-edge AI and blockchain technology"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: t("features.aiMonitoring") || "AI-Powered Monitoring",
                description:
                  t("features.aiDescription") ||
                  "Advanced algorithms detect anomalies and potential threats in real-time",
                color: "text-blue-500",
              },
              {
                icon: MapPin,
                title: t("features.geoFencing") || "Smart Geo-Fencing",
                description:
                  t("features.geoDescription") ||
                  "Intelligent location boundaries with instant alerts for unsafe areas",
                color: "text-green-500",
              },
              {
                icon: Smartphone,
                title: t("features.digitalId") || "Blockchain Digital ID",
                description:
                  t("features.digitalDescription") || "Secure, tamper-proof digital identity for seamless verification",
                color: "text-purple-500",
              },
              {
                icon: AlertTriangle,
                title: t("features.emergency") || "Emergency Response",
                description:
                  t("features.emergencyDescription") || "One-tap SOS with automatic location sharing to authorities",
                color: "text-red-500",
              },
              {
                icon: Users,
                title: t("features.authorityDashboard") || "Authority Dashboard",
                description:
                  t("features.authorityDescription") ||
                  "Real-time tourist monitoring and incident management for officials",
                color: "text-orange-500",
              },
              {
                icon: Globe,
                title: t("features.multiLanguage") || "Multi-Language Support",
                description:
                  t("features.multiLanguageDescription") ||
                  "Available in multiple languages with voice assistance capabilities",
                color: "text-indigo-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full glass dark:glass-dark neuro dark:neuro-dark hover:scale-105 transition-transform duration-300">
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("cta.readyToTravel") || "Ready to Travel with Confidence?"}
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              {t("cta.joinThousands") ||
                "Join thousands of travelers who trust SafeTravel AI for their safety and peace of mind"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                {t("cta.getStarted") || "Get Started Now"}
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                {t("cta.contactSupport") || "Contact Support"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold">SafeTravel AI</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>{t("footer.privacy") || "Privacy Policy"}</span>
              <span>{t("footer.terms") || "Terms of Service"}</span>
              <span>{t("footer.support") || "Support"}</span>
            </div>

            <div className="text-sm text-muted-foreground">
              {t("footer.copyright") || "© 2024 SafeTravel AI. All rights reserved."}
            </div>
          </div>
        </div>
      </footer>

      <VoiceAssistant />
    </div>
  )
}
