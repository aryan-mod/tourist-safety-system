"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
  availableLanguages: { code: string; name: string; nativeName: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const availableLanguages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
]

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.chatbot": "AI Assistant",
    "nav.liveMap": "Live Tracking",
    "nav.profile": "Profile",
    "nav.alerts": "Alerts",
    "nav.police": "Police Dashboard",
    "nav.digitalId": "Digital ID",
    "nav.settings": "Settings",
    "nav.logout": "Logout",

    // App
    "app.title": "Smart Tourist Safety System",
    "status.online": "Online",
    "status.offline": "Offline",
    "search.placeholder": "Search locations, alerts...",

    // Landing Page
    "hero.title": "Smart Tourist Safety",
    "hero.subtitle": "AI-Powered Travel Protection",
    "hero.description":
      "Advanced tourist safety monitoring with AI, geo-fencing, and blockchain digital ID for secure travel experiences.",
    "hero.getStarted": "Get Started",
    "hero.learnMore": "Learn More",
    "hero.generateId": "Generate Digital ID",
    "hero.viewDashboard": "View Dashboard",

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
    "dashboard.welcome": "Welcome back",
    "dashboard.safetyScore": "Safety Score",
    "dashboard.currentLocation": "Current Location",
    "dashboard.emergencySos": "Emergency SOS",
    "dashboard.itinerary": "Travel Itinerary",
    "dashboard.tracking": "Real-Time Tracking",
    "dashboard.voiceAssistant": "Voice Assistant",
    "dashboard.offlineMode": "Offline Mode",
    "dashboard.vrMode": "VR Preview",
    "dashboard.achievements": "Achievements",

    // Chatbot
    "chatbot.title": "SafeTravel AI Assistant",
    "chatbot.welcome": "Hi! I'm your SafeTravel AI assistant. How can I help you today?",
    "chatbot.placeholder": "Type your message...",
    "chatbot.listening": "Listening...",
    "chatbot.online": "Online",
    "chatbot.typing": "Typing...",

    // Live Map
    "liveMap.title": "Live Location Tracker",
    "liveMap.startTracking": "Start Tracking",
    "liveMap.stopTracking": "Stop Tracking",
    "liveMap.shareLocation": "Share Location",
    "liveMap.centerLocation": "Center Location",
    "liveMap.gpsReady": "GPS Ready",
    "liveMap.offlineMode": "Offline Mode",

    // Profile
    "profile.title": "My Profile",
    "profile.subtitle": "Manage your digital tourist identity",
    "profile.personalInfo": "Personal Information",
    "profile.tripInfo": "Current Trip",
    "profile.emergencyContact": "Emergency Contact",
    "profile.safetyScore": "Safety Score",
    "profile.totalTrips": "Total Trips",
    "profile.rewardPoints": "Reward Points",
    "profile.level": "Level",
    "profile.memberSince": "Member since",
    "profile.verifiedIdentity": "Verified Identity",

    // Digital ID
    "digitalId.title": "Generate Digital Tourist ID",
    "digitalId.step1": "Personal Information",
    "digitalId.step2": "Travel Details",
    "digitalId.step3": "Emergency Contacts",
    "digitalId.step4": "Identity Verification",
    "digitalId.step5": "Complete",
    "digitalId.fullName": "Full Name",
    "digitalId.email": "Email Address",
    "digitalId.phone": "Phone Number",
    "digitalId.nationality": "Nationality",
    "digitalId.destination": "Destination",
    "digitalId.startDate": "Start Date",
    "digitalId.endDate": "End Date",
    "digitalId.purpose": "Purpose of Visit",

    // Alerts
    "alerts.title": "AI Safety Alerts",
    "alerts.realTime": "Real-time Notifications",
    "alerts.routeDeviation": "Route Deviation Detected",
    "alerts.prolongedInactivity": "Prolonged Inactivity",
    "alerts.locationDrop": "Sudden Location Drop",
    "alerts.crowdedArea": "Entering Crowded Area",
    "alerts.dangerZone": "Approaching Danger Zone",
    "alerts.weatherAlert": "Weather Alert",
    "alerts.safeZoneActive": "Safe Zone Active",

    // Emergency
    "emergency.title": "Emergency Alert",
    "emergency.sending": "Sending emergency alert",
    "emergency.cancel": "Cancel Emergency Alert",
    "emergency.confirm": "Send Alert",
    "emergency.location": "Location",
    "emergency.safetyScore": "Safety Score",
    "emergency.battery": "Battery",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.share": "Share",
    "common.download": "Download",
    "common.copy": "Copy",
    "common.copied": "Copied",
    "common.error": "Error",
    "common.success": "Success",
    "common.warning": "Warning",
    "common.info": "Information",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.dashboard": "डैशबोर्ड",
    "nav.chatbot": "AI सहायक",
    "nav.liveMap": "लाइव ट्रैकिंग",
    "nav.profile": "प्रोफाइल",
    "nav.alerts": "अलर्ट",
    "nav.police": "पुलिस डैशबोर्ड",
    "nav.digitalId": "डिजिटल आईडी",
    "nav.settings": "सेटिंग्स",
    "nav.logout": "लॉगआउट",

    // App
    "app.title": "स्मार्ट पर्यटक सुरक्षा प्रणाली",
    "status.online": "ऑनलाइन",
    "status.offline": "ऑफलाइन",
    "search.placeholder": "स्थान, अलर्ट खोजें...",

    // Landing Page
    "hero.title": "स्मार्ट पर्यटक सुरक्षा",
    "hero.subtitle": "AI-संचालित यात्रा सुरक्षा",
    "hero.description": "सुरक्षित यात्रा अनुभवों के लिए AI, जियो-फेंसिंग और ब्लॉकचेन डिजिटल आईडी के साथ उन्नत पर्यटक सुरक्षा निगरानी।",
    "hero.getStarted": "शुरू करें",
    "hero.learnMore": "और जानें",
    "hero.generateId": "डिजिटल आईडी बनाएं",
    "hero.viewDashboard": "डैशबोर्ड देखें",

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
    "dashboard.welcome": "वापसी पर स्वागत है",
    "dashboard.safetyScore": "सुरक्षा स्कोर",
    "dashboard.currentLocation": "वर्तमान स्थान",
    "dashboard.emergencySos": "आपातकालीन SOS",
    "dashboard.itinerary": "यात्रा कार्यक्रम",
    "dashboard.tracking": "रियल-टाइम ट्रैकिंग",
    "dashboard.voiceAssistant": "वॉयस असिस्टेंट",
    "dashboard.offlineMode": "ऑफलाइन मोड",
    "dashboard.vrMode": "VR पूर्वावलोकन",
    "dashboard.achievements": "उपलब्धियां",

    // Chatbot
    "chatbot.title": "SafeTravel AI सहायक",
    "chatbot.welcome": "नमस्ते! मैं आपका SafeTravel AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    "chatbot.placeholder": "अपना संदेश टाइप करें...",
    "chatbot.listening": "सुन रहा है...",
    "chatbot.online": "ऑनलाइन",
    "chatbot.typing": "टाइप कर रहा है...",

    // Live Map
    "liveMap.title": "लाइव लोकेशन ट्रैकर",
    "liveMap.startTracking": "ट्रैकिंग शुरू करें",
    "liveMap.stopTracking": "ट्रैकिंग बंद करें",
    "liveMap.shareLocation": "स्थान साझा करें",
    "liveMap.centerLocation": "केंद्र स्थान",
    "liveMap.gpsReady": "GPS तैयार",
    "liveMap.offlineMode": "ऑफलाइन मोड",

    // Profile
    "profile.title": "मेरी प्रोफाइल",
    "profile.subtitle": "अपनी डिजिटल पर्यटक पहचान प्रबंधित करें",
    "profile.personalInfo": "व्यक्तिगत जानकारी",
    "profile.tripInfo": "वर्तमान यात्रा",
    "profile.emergencyContact": "आपातकालीन संपर्क",
    "profile.safetyScore": "सुरक्षा स्कोर",
    "profile.totalTrips": "कुल यात्राएं",
    "profile.rewardPoints": "रिवार्ड पॉइंट्स",
    "profile.level": "स्तर",
    "profile.memberSince": "सदस्य बने",
    "profile.verifiedIdentity": "सत्यापित पहचान",

    // Digital ID
    "digitalId.title": "डिजिटल पर्यटक आईडी बनाएं",
    "digitalId.step1": "व्यक्तिगत जानकारी",
    "digitalId.step2": "यात्रा विवरण",
    "digitalId.step3": "आपातकालीन संपर्क",
    "digitalId.step4": "पहचान सत्यापन",
    "digitalId.step5": "पूर्ण",
    "digitalId.fullName": "पूरा नाम",
    "digitalId.email": "ईमेल पता",
    "digitalId.phone": "फोन नंबर",
    "digitalId.nationality": "राष्ट्रीयता",
    "digitalId.destination": "गंतव्य",
    "digitalId.startDate": "प्रारंभ तिथि",
    "digitalId.endDate": "समाप्ति तिथि",
    "digitalId.purpose": "यात्रा का उद्देश्य",

    // Alerts
    "alerts.title": "AI सुरक्षा अलर्ट",
    "alerts.realTime": "रियल-टाइम सूचनाएं",
    "alerts.routeDeviation": "मार्ग विचलन का पता चला",
    "alerts.prolongedInactivity": "लंबी निष्क्रियता",
    "alerts.locationDrop": "अचानक स्थान गिरावट",
    "alerts.crowdedArea": "भीड़भाड़ वाले क्षेत्र में प्रवेश",
    "alerts.dangerZone": "खतरा क्षेत्र के पास पहुंच रहे",
    "alerts.weatherAlert": "मौसम अलर्ट",
    "alerts.safeZoneActive": "सुरक्षित क्षेत्र सक्रिय",

    // Emergency
    "emergency.title": "आपातकालीन अलर्ट",
    "emergency.sending": "आपातकालीन अलर्ट भेजा जा रहा है",
    "emergency.cancel": "आपातकालीन अलर्ट रद्द करें",
    "emergency.confirm": "अलर्ट भेजें",
    "emergency.location": "स्थान",
    "emergency.safetyScore": "सुरक्षा स्कोर",
    "emergency.battery": "बैटरी",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.save": "सेव करें",
    "common.cancel": "रद्द करें",
    "common.close": "बंद करें",
    "common.next": "अगला",
    "common.previous": "पिछला",
    "common.submit": "जमा करें",
    "common.edit": "संपादित करें",
    "common.delete": "हटाएं",
    "common.share": "साझा करें",
    "common.download": "डाउनलोड करें",
    "common.copy": "कॉपी करें",
    "common.copied": "कॉपी किया गया",
    "common.error": "त्रुटि",
    "common.success": "सफलता",
    "common.warning": "चेतावनी",
    "common.info": "जानकारी",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.dashboard": "Panel",
    "nav.chatbot": "Asistente IA",
    "nav.liveMap": "Seguimiento en Vivo",
    "nav.profile": "Perfil",
    "nav.alerts": "Alertas",
    "nav.police": "Panel Policial",
    "nav.digitalId": "ID Digital",
    "nav.settings": "Configuración",
    "nav.logout": "Cerrar Sesión",

    // App
    "app.title": "Sistema de Seguridad Turística Inteligente",
    "status.online": "En Línea",
    "status.offline": "Sin Conexión",
    "search.placeholder": "Buscar ubicaciones, alertas...",

    // Landing Page
    "hero.title": "Seguridad Turística Inteligente",
    "hero.subtitle": "Protección de Viaje con IA",
    "hero.description":
      "Monitoreo avanzado de seguridad turística con IA, geo-cercado e ID digital blockchain para experiencias de viaje seguras.",
    "hero.getStarted": "Comenzar",
    "hero.learnMore": "Saber Más",
    "hero.generateId": "Generar ID Digital",
    "hero.viewDashboard": "Ver Panel",

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
    "dashboard.welcome": "Bienvenido de vuelta",
    "dashboard.safetyScore": "Puntuación de Seguridad",
    "dashboard.currentLocation": "Ubicación Actual",
    "dashboard.emergencySos": "SOS de Emergencia",
    "dashboard.itinerary": "Itinerario de Viaje",
    "dashboard.tracking": "Seguimiento en Tiempo Real",
    "dashboard.voiceAssistant": "Asistente de Voz",
    "dashboard.offlineMode": "Modo Sin Conexión",
    "dashboard.vrMode": "Vista Previa VR",
    "dashboard.achievements": "Logros",

    // Chatbot
    "chatbot.title": "Asistente IA SafeTravel",
    "chatbot.welcome": "¡Hola! Soy tu asistente IA SafeTravel. ¿Cómo puedo ayudarte hoy?",
    "chatbot.placeholder": "Escribe tu mensaje...",
    "chatbot.listening": "Escuchando...",
    "chatbot.online": "En Línea",
    "chatbot.typing": "Escribiendo...",

    // Live Map
    "liveMap.title": "Rastreador de Ubicación en Vivo",
    "liveMap.startTracking": "Iniciar Seguimiento",
    "liveMap.stopTracking": "Detener Seguimiento",
    "liveMap.shareLocation": "Compartir Ubicación",
    "liveMap.centerLocation": "Centrar Ubicación",
    "liveMap.gpsReady": "GPS Listo",
    "liveMap.offlineMode": "Modo Sin Conexión",

    // Profile
    "profile.title": "Mi Perfil",
    "profile.subtitle": "Gestiona tu identidad turística digital",
    "profile.personalInfo": "Información Personal",
    "profile.tripInfo": "Viaje Actual",
    "profile.emergencyContact": "Contacto de Emergencia",
    "profile.safetyScore": "Puntuación de Seguridad",
    "profile.totalTrips": "Viajes Totales",
    "profile.rewardPoints": "Puntos de Recompensa",
    "profile.level": "Nivel",
    "profile.memberSince": "Miembro desde",
    "profile.verifiedIdentity": "Identidad Verificada",

    // Digital ID
    "digitalId.title": "Generar ID Turístico Digital",
    "digitalId.step1": "Información Personal",
    "digitalId.step2": "Detalles del Viaje",
    "digitalId.step3": "Contactos de Emergencia",
    "digitalId.step4": "Verificación de Identidad",
    "digitalId.step5": "Completo",
    "digitalId.fullName": "Nombre Completo",
    "digitalId.email": "Dirección de Correo",
    "digitalId.phone": "Número de Teléfono",
    "digitalId.nationality": "Nacionalidad",
    "digitalId.destination": "Destino",
    "digitalId.startDate": "Fecha de Inicio",
    "digitalId.endDate": "Fecha de Fin",
    "digitalId.purpose": "Propósito de la Visita",

    // Alerts
    "alerts.title": "Alertas de Seguridad IA",
    "alerts.realTime": "Notificaciones en Tiempo Real",
    "alerts.routeDeviation": "Desviación de Ruta Detectada",
    "alerts.prolongedInactivity": "Inactividad Prolongada",
    "alerts.locationDrop": "Caída Súbita de Ubicación",
    "alerts.crowdedArea": "Entrando en Área Concurrida",
    "alerts.dangerZone": "Acercándose a Zona de Peligro",
    "alerts.weatherAlert": "Alerta Meteorológica",
    "alerts.safeZoneActive": "Zona Segura Activa",

    // Emergency
    "emergency.title": "Alerta de Emergencia",
    "emergency.sending": "Enviando alerta de emergencia",
    "emergency.cancel": "Cancelar Alerta de Emergencia",
    "emergency.confirm": "Enviar Alerta",
    "emergency.location": "Ubicación",
    "emergency.safetyScore": "Puntuación de Seguridad",
    "emergency.battery": "Batería",

    // Common
    "common.loading": "Cargando...",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.close": "Cerrar",
    "common.next": "Siguiente",
    "common.previous": "Anterior",
    "common.submit": "Enviar",
    "common.edit": "Editar",
    "common.delete": "Eliminar",
    "common.share": "Compartir",
    "common.download": "Descargar",
    "common.copy": "Copiar",
    "common.copied": "Copiado",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.warning": "Advertencia",
    "common.info": "Información",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.dashboard": "Tableau de Bord",
    "nav.chatbot": "Assistant IA",
    "nav.liveMap": "Suivi en Direct",
    "nav.profile": "Profil",
    "nav.alerts": "Alertes",
    "nav.police": "Tableau Police",
    "nav.digitalId": "ID Numérique",
    "nav.settings": "Paramètres",
    "nav.logout": "Déconnexion",

    // App
    "app.title": "Système de Sécurité Touristique Intelligent",
    "status.online": "En Ligne",
    "status.offline": "Hors Ligne",
    "search.placeholder": "Rechercher lieux, alertes...",

    // Landing Page
    "hero.title": "Sécurité Touristique Intelligente",
    "hero.subtitle": "Protection de Voyage par IA",
    "hero.description":
      "Surveillance avancée de la sécurité touristique avec IA, géo-clôture et ID numérique blockchain pour des expériences de voyage sécurisées.",
    "hero.getStarted": "Commencer",
    "hero.learnMore": "En Savoir Plus",
    "hero.generateId": "Générer ID Numérique",
    "hero.viewDashboard": "Voir Tableau de Bord",

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
    "dashboard.welcome": "Bon retour",
    "dashboard.safetyScore": "Score de Sécurité",
    "dashboard.currentLocation": "Localisation Actuelle",
    "dashboard.emergencySos": "SOS d'Urgence",
    "dashboard.itinerary": "Itinéraire de Voyage",
    "dashboard.tracking": "Suivi en Temps Réel",
    "dashboard.voiceAssistant": "Assistant Vocal",
    "dashboard.offlineMode": "Mode Hors Ligne",
    "dashboard.vrMode": "Aperçu VR",
    "dashboard.achievements": "Réalisations",

    // Chatbot
    "chatbot.title": "Assistant IA SafeTravel",
    "chatbot.welcome": "Salut ! Je suis votre assistant IA SafeTravel. Comment puis-je vous aider aujourd'hui ?",
    "chatbot.placeholder": "Tapez votre message...",
    "chatbot.listening": "Écoute...",
    "chatbot.online": "En Ligne",
    "chatbot.typing": "Frappe...",

    // Live Map
    "liveMap.title": "Traqueur de Localisation en Direct",
    "liveMap.startTracking": "Commencer le Suivi",
    "liveMap.stopTracking": "Arrêter le Suivi",
    "liveMap.shareLocation": "Partager la Localisation",
    "liveMap.centerLocation": "Centrer la Localisation",
    "liveMap.gpsReady": "GPS Prêt",
    "liveMap.offlineMode": "Mode Hors Ligne",

    // Profile
    "profile.title": "Mon Profil",
    "profile.subtitle": "Gérez votre identité touristique numérique",
    "profile.personalInfo": "Informations Personnelles",
    "profile.tripInfo": "Voyage Actuel",
    "profile.emergencyContact": "Contact d'Urgence",
    "profile.safetyScore": "Score de Sécurité",
    "profile.totalTrips": "Voyages Totaux",
    "profile.rewardPoints": "Points de Récompense",
    "profile.level": "Niveau",
    "profile.memberSince": "Membre depuis",
    "profile.verifiedIdentity": "Identité Vérifiée",

    // Digital ID
    "digitalId.title": "Générer ID Touristique Numérique",
    "digitalId.step1": "Informations Personnelles",
    "digitalId.step2": "Détails du Voyage",
    "digitalId.step3": "Contacts d'Urgence",
    "digitalId.step4": "Vérification d'Identité",
    "digitalId.step5": "Terminé",
    "digitalId.fullName": "Nom Complet",
    "digitalId.email": "Adresse E-mail",
    "digitalId.phone": "Numéro de Téléphone",
    "digitalId.nationality": "Nationalité",
    "digitalId.destination": "Destination",
    "digitalId.startDate": "Date de Début",
    "digitalId.endDate": "Date de Fin",
    "digitalId.purpose": "Objectif de la Visite",

    // Alerts
    "alerts.title": "Alertes de Sécurité IA",
    "alerts.realTime": "Notifications en Temps Réel",
    "alerts.routeDeviation": "Déviation de Route Détectée",
    "alerts.prolongedInactivity": "Inactivité Prolongée",
    "alerts.locationDrop": "Chute Soudaine de Localisation",
    "alerts.crowdedArea": "Entrée dans Zone Bondée",
    "alerts.dangerZone": "Approche de Zone de Danger",
    "alerts.weatherAlert": "Alerte Météo",
    "alerts.safeZoneActive": "Zone Sûre Active",

    // Emergency
    "emergency.title": "Alerte d'Urgence",
    "emergency.sending": "Envoi d'alerte d'urgence",
    "emergency.cancel": "Annuler l'Alerte d'Urgence",
    "emergency.confirm": "Envoyer l'Alerte",
    "emergency.location": "Localisation",
    "emergency.safetyScore": "Score de Sécurité",
    "emergency.battery": "Batterie",

    // Common
    "common.loading": "Chargement...",
    "common.save": "Sauvegarder",
    "common.cancel": "Annuler",
    "common.close": "Fermer",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.submit": "Soumettre",
    "common.edit": "Modifier",
    "common.delete": "Supprimer",
    "common.share": "Partager",
    "common.download": "Télécharger",
    "common.copy": "Copier",
    "common.copied": "Copié",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.warning": "Avertissement",
    "common.info": "Information",
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

    if (typeof window !== "undefined" && window.speechSynthesis) {
      const langNames = {
        en: "English",
        hi: "हिंदी",
        es: "Español",
        fr: "Français",
      }
      const utterance = new SpeechSynthesisUtterance(
        `Language changed to ${langNames[lang as keyof typeof langNames] || lang}`,
      )
      utterance.lang = lang === "hi" ? "hi-IN" : lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : "en-US"
      window.speechSynthesis.speak(utterance)
    }
  }

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, availableLanguages }}>
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
