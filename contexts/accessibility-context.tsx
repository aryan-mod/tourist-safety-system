"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { SpeechRecognition } from "types/speech-recognition" // Assuming SpeechRecognition is imported from a types file

interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large" | "extra-large"
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
  voiceAssistant: boolean
  keyboardNavigation: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void
  speak: (text: string) => void
  isListening: boolean
  startListening: () => void
  stopListening: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

const defaultSettings: AccessibilitySettings = {
  fontSize: "medium",
  highContrast: false,
  reducedMotion: false,
  screenReader: false,
  voiceAssistant: false,
  keyboardNavigation: true,
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    const savedSettings = localStorage.getItem("tourist-safety-accessibility")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error("Failed to parse accessibility settings:", error)
      }
    }

    // Initialize speech recognition
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = "en-US"
      setRecognition(recognitionInstance)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tourist-safety-accessibility", JSON.stringify(settings))

    // Apply accessibility settings to document
    const root = document.documentElement

    // Font size
    root.style.setProperty(
      "--accessibility-font-scale",
      settings.fontSize === "small"
        ? "0.875"
        : settings.fontSize === "large"
          ? "1.125"
          : settings.fontSize === "extra-large"
            ? "1.25"
            : "1",
    )

    // High contrast
    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }
  }, [settings])

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const speak = (text: string) => {
    if (settings.voiceAssistant && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognition && settings.voiceAssistant) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      setIsListening(false)
      recognition.stop()
    }
  }

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        speak,
        isListening,
        startListening,
        stopListening,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
