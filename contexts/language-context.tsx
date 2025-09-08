"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.alerts": "Alerts",
    "nav.police": "Police Dashboard",
    "nav.digitalId": "Digital ID",

    // Landing Page
    "hero.title": "Smart Tourist Safety",
    "hero.subtitle": "AI-Powered Travel Protection",
    "hero.description":
      "Advanced tourist safety monitoring with AI, geo-fencing, and blockchain digital ID for secure travel experiences.",
    "hero.getStarted": "Get Started",
    "hero.learnMore": "Learn More",

    // Features
    "features.aiMonitoring": "AI Monitoring",
    "features.aiDescription": "Real-time anomaly detection and predictive safety alerts",
    "features.geoFencing": "Geo-Fencing",
    "features.geoDescription": "Smart location boundaries with instant danger zone alerts",
    "features.digitalId": "Digital ID",
    "features.digitalDescription": "Blockchain-secured tourist identification and verification",
    "features.emergency": "Emergency Response",
    "features.emergencyDescription": "Instant SOS with automated emergency service coordination",

    // Dashboard
    "dashboard.safetyScore": "Safety Score",
    "dashboard.currentLocation": "Current Location",
    "dashboard.emergencySos": "Emergency SOS",
    "dashboard.itinerary": "Travel Itinerary",
    "dashboard.tracking": "Real-Time Tracking",
    "dashboard.voiceAssistant": "Voice Assistant",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.dashboard": "डैशबोर्ड",
    "nav.alerts": "अलर्ट",
    "nav.police": "पुलिस डैशबोर्ड",
    "nav.digitalId": "डिजिटल आईडी",

    // Landing Page
    "hero.title": "स्मार्ट पर्यटक सुरक्षा",
    "hero.subtitle": "AI-संचालित यात्रा सुरक्षा",
    "hero.description": "सुरक्षित यात्रा अनुभवों के लिए AI, जियो-फेंसिंग और ब्लॉकचेन डिजिटल आईडी के साथ उन्नत पर्यटक सुरक्षा निगरानी।",
    "hero.getStarted": "शुरू करें",
    "hero.learnMore": "और जानें",

    // Features
    "features.aiMonitoring": "AI निगरानी",
    "features.aiDescription": "रियल-टाइम विसंगति का पता लगाना और भविष्यसूचक सुरक्षा अलर्ट",
    "features.geoFencing": "जियो-फेंसिंग",
    "features.geoDescription": "तत्काल खतरा क्षेत्र अलर्ट के साथ स्मार्ट स्थान सीमाएं",
    "features.digitalId": "डिजिटल आईडी",
    "features.digitalDescription": "ब्लॉकचेन-सुरक्षित पर्यटक पहचान और सत्यापन",
    "features.emergency": "आपातकालीन प्रतिक्रिया",
    "features.emergencyDescription": "स्वचालित आपातकालीन सेवा समन्वय के साथ तत्काल SOS",

    // Dashboard
    "dashboard.safetyScore": "सुरक्षा स्कोर",
    "dashboard.currentLocation": "वर्तमान स्थान",
    "dashboard.emergencySos": "आपातकालीन SOS",
    "dashboard.itinerary": "यात्रा कार्यक्रम",
    "dashboard.tracking": "रियल-टाइम ट्रैकिंग",
    "dashboard.voiceAssistant": "वॉयस असिस्टेंट",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.save": "सेव करें",
    "common.cancel": "रद्द करें",
    "common.close": "बंद करें",
    "common.next": "अगला",
    "common.previous": "पिछला",
    "common.submit": "जमा करें",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.dashboard": "Panel",
    "nav.alerts": "Alertas",
    "nav.police": "Panel Policial",
    "nav.digitalId": "ID Digital",

    // Landing Page
    "hero.title": "Seguridad Turística Inteligente",
    "hero.subtitle": "Protección de Viaje con IA",
    "hero.description":
      "Monitoreo avanzado de seguridad turística con IA, geo-cercado e ID digital blockchain para experiencias de viaje seguras.",
    "hero.getStarted": "Comenzar",
    "hero.learnMore": "Saber Más",

    // Features
    "features.aiMonitoring": "Monitoreo IA",
    "features.aiDescription": "Detección de anomalías en tiempo real y alertas de seguridad predictivas",
    "features.geoFencing": "Geo-Cercado",
    "features.geoDescription": "Límites de ubicación inteligentes con alertas instantáneas de zona de peligro",
    "features.digitalId": "ID Digital",
    "features.digitalDescription": "Identificación y verificación turística asegurada por blockchain",
    "features.emergency": "Respuesta de Emergencia",
    "features.emergencyDescription": "SOS instantáneo con coordinación automatizada de servicios de emergencia",

    // Dashboard
    "dashboard.safetyScore": "Puntuación de Seguridad",
    "dashboard.currentLocation": "Ubicación Actual",
    "dashboard.emergencySos": "SOS de Emergencia",
    "dashboard.itinerary": "Itinerario de Viaje",
    "dashboard.tracking": "Seguimiento en Tiempo Real",
    "dashboard.voiceAssistant": "Asistente de Voz",

    // Common
    "common.loading": "Cargando...",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.close": "Cerrar",
    "common.next": "Siguiente",
    "common.previous": "Anterior",
    "common.submit": "Enviar",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.dashboard": "Tableau de Bord",
    "nav.alerts": "Alertes",
    "nav.police": "Tableau Police",
    "nav.digitalId": "ID Numérique",

    // Landing Page
    "hero.title": "Sécurité Touristique Intelligente",
    "hero.subtitle": "Protection de Voyage par IA",
    "hero.description":
      "Surveillance avancée de la sécurité touristique avec IA, géo-clôture et ID numérique blockchain pour des expériences de voyage sécurisées.",
    "hero.getStarted": "Commencer",
    "hero.learnMore": "En Savoir Plus",

    // Features
    "features.aiMonitoring": "Surveillance IA",
    "features.aiDescription": "Détection d'anomalies en temps réel et alertes de sécurité prédictives",
    "features.geoFencing": "Géo-Clôture",
    "features.geoDescription": "Limites de localisation intelligentes avec alertes instantanées de zone de danger",
    "features.digitalId": "ID Numérique",
    "features.digitalDescription": "Identification et vérification touristique sécurisées par blockchain",
    "features.emergency": "Réponse d'Urgence",
    "features.emergencyDescription": "SOS instantané avec coordination automatisée des services d'urgence",

    // Dashboard
    "dashboard.safetyScore": "Score de Sécurité",
    "dashboard.currentLocation": "Localisation Actuelle",
    "dashboard.emergencySos": "SOS d'Urgence",
    "dashboard.itinerary": "Itinéraire de Voyage",
    "dashboard.tracking": "Suivi en Temps Réel",
    "dashboard.voiceAssistant": "Assistant Vocal",

    // Common
    "common.loading": "Chargement...",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.close": "Fermer",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.submit": "Soumettre",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("tourist-safety-language")
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("tourist-safety-language", lang)
  }

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
