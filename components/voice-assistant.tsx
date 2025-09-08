"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAccessibility } from "@/contexts/accessibility-context"
import { useLanguage } from "@/contexts/language-context"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

export function VoiceAssistant() {
  const { settings, speak, isListening, startListening, stopListening } = useAccessibility()
  const { t } = useLanguage()
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const handleSpeechStart = () => setIsSpeaking(true)
      const handleSpeechEnd = () => setIsSpeaking(false)

      speechSynthesis.addEventListener("start", handleSpeechStart)
      speechSynthesis.addEventListener("end", handleSpeechEnd)

      return () => {
        speechSynthesis.removeEventListener("start", handleSpeechStart)
        speechSynthesis.removeEventListener("end", handleSpeechEnd)
      }
    }
  }, [])

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
      speak("Voice assistant activated. How can I help you?")
    }
  }

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      speechSynthesis.cancel()
    } else {
      speak("Voice assistant is ready to help you navigate safely.")
    }
  }

  if (!settings.voiceAssistant) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      {/* Voice Input Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleVoiceToggle}
          className={`h-12 w-12 rounded-full ${
            isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-primary hover:bg-primary/90"
          }`}
          aria-label={isListening ? "Stop listening" : "Start voice input"}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </motion.div>

      {/* Voice Output Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleSpeakToggle}
          variant="secondary"
          className={`h-12 w-12 rounded-full ${isSpeaking ? "animate-pulse" : ""}`}
          aria-label={isSpeaking ? "Stop speaking" : "Speak current page"}
        >
          {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </motion.div>

      {/* Voice Status Indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass dark:glass-dark neuro dark:neuro-dark p-3 rounded-lg border border-border/50 min-w-48"
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
              <span className="text-sm">Listening...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
