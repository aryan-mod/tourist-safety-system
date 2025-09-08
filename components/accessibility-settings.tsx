"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccessibility } from "@/contexts/accessibility-context"
import { useLanguage } from "@/contexts/language-context"
import { Settings, X, Type, Eye, Volume2, Mic, Keyboard, Zap, Languages } from "lucide-react"

export function AccessibilitySettings() {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, updateSetting, speak } = useAccessibility()
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ]

  const fontSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "extra-large", label: "Extra Large" },
  ]

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    updateSetting(key, value)
    if (settings.voiceAssistant) {
      speak(`${key} ${value ? "enabled" : "disabled"}`)
    }
  }

  return (
    <>
      {/* Settings Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label="Accessibility Settings"
      >
        <Settings className="h-5 w-5" />
        {(settings.highContrast || settings.voiceAssistant || settings.fontSize !== "medium") && (
          <Badge variant="secondary" className="absolute -top-1 -right-1 h-3 w-3 p-0" />
        )}
      </Button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 glass dark:glass-dark neuro dark:neuro-dark rounded-lg border border-border/50 z-50"
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Accessibility Settings</span>
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-6 max-h-96 overflow-auto">
              {/* Language Selection */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-primary" />
                  <label className="text-sm font-medium">Language</label>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4 text-primary" />
                  <label className="text-sm font-medium">Font Size</label>
                </div>
                <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange("fontSize", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Visual Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Visual</span>
                </div>

                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="text-sm">High Contrast</label>
                      <p className="text-xs text-muted-foreground">Increase color contrast for better visibility</p>
                    </div>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => handleSettingChange("highContrast", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="text-sm">Reduced Motion</label>
                      <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
                    </div>
                    <Switch
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => handleSettingChange("reducedMotion", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Audio Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Audio</span>
                </div>

                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="text-sm">Voice Assistant</label>
                      <p className="text-xs text-muted-foreground">Enable text-to-speech and voice commands</p>
                    </div>
                    <Switch
                      checked={settings.voiceAssistant}
                      onCheckedChange={(checked) => handleSettingChange("voiceAssistant", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="text-sm">Screen Reader Support</label>
                      <p className="text-xs text-muted-foreground">Optimize for screen reader compatibility</p>
                    </div>
                    <Switch
                      checked={settings.screenReader}
                      onCheckedChange={(checked) => handleSettingChange("screenReader", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Keyboard className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Navigation</span>
                </div>

                <div className="space-y-3 pl-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label className="text-sm">Keyboard Navigation</label>
                      <p className="text-xs text-muted-foreground">Enhanced keyboard shortcuts and focus indicators</p>
                    </div>
                    <Switch
                      checked={settings.keyboardNavigation}
                      onCheckedChange={(checked) => handleSettingChange("keyboardNavigation", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Quick Actions</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateSetting("fontSize", "large")
                      updateSetting("highContrast", true)
                      speak("High visibility mode enabled")
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    High Visibility
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateSetting("voiceAssistant", true)
                      updateSetting("screenReader", true)
                      speak("Voice mode enabled")
                    }}
                  >
                    <Mic className="h-3 w-3 mr-1" />
                    Voice Mode
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
