"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  User,
  MapPin,
  Phone,
  QrCode,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Fingerprint,
  Globe,
  Camera,
  Upload,
  Share2,
  FileText,
  Star,
  Award,
  Mic,
  MicOff,
  RotateCcw,
  Calendar,
  Heart,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

const steps = [
  { id: 1, title: "Personal Information", icon: User },
  { id: 2, title: "Travel Details", icon: MapPin },
  { id: 3, title: "Emergency Contacts", icon: Phone },
  { id: 4, title: "Verification", icon: Fingerprint },
  { id: 5, title: "Digital ID Generated", icon: Shield },
]

export default function DigitalIDPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    documentType: "",
    documentNumber: "",
    phoneNumber: "",
    email: "",
    profilePhoto: null as File | null,

    // Travel Details
    destination: "",
    travelStartDate: "",
    travelEndDate: "",
    accommodationAddress: "",
    purposeOfVisit: "",
    itinerary: "",

    // Emergency Contacts
    emergencyContact1Name: "",
    emergencyContact1Phone: "",
    emergencyContact1Relation: "",
    emergencyContact2Name: "",
    emergencyContact2Phone: "",
    emergencyContact2Relation: "",

    // Medical Information
    medicalConditions: "",
    allergies: "",
    bloodType: "",
  })

  const [generatedID, setGeneratedID] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [safetyScore, setSafetyScore] = useState(95)
  const [rewardPoints, setRewardPoints] = useState(1250)
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const progress = (currentStep / steps.length) * 100

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    setFormData((prev) => ({ ...prev, profilePhoto: file }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateDigitalID = async () => {
    setIsGenerating(true)
    // Simulate blockchain ID generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const id = `STA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    setGeneratedID(id)
    setIsGenerating(false)
    setCurrentStep(5)
  }

  const downloadQRCode = () => {
    // Simulate QR code download
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 200
    canvas.height = 200

    if (ctx) {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, 200, 200)
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.fillText("QR Code for:", 10, 20)
      ctx.fillText(generatedID || "", 10, 40)

      // Create download link
      const link = document.createElement("a")
      link.download = `tourist-id-${generatedID}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const exportToPDF = () => {
    // Simulate PDF generation
    const link = document.createElement("a")
    link.download = `tourist-id-${generatedID}.pdf`
    link.href =
      "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFRvdXJpc3QgSUQpCi9Qcm9kdWNlciAoU2FmZVRyYXZlbCBBSSkKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDMgMCBSCj4+CmVuZG9iagozIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbNCAwIFJdCi9Db3VudCAxCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMyAwIFIKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMjEgMDAwMDAgbiAKMDAwMDAwMDE3OCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9SaXplIDUKL1Jvb3QgMiAwIFIKPj4Kc3RhcnR4cmVmCjI3MwolJUVPRgo="
    link.click()
  }

  const shareWithFamily = () => {
    const shareData = {
      title: "My Tourist Safety ID",
      text: `I've generated my digital tourist ID for ${formData.destination}. Track my safety status here:`,
      url: `${window.location.origin}/track/${generatedID}`,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
      // Show toast notification
    }
  }

  const toggleVoiceAssistant = () => {
    setIsVoiceActive(!isVoiceActive)
    if (!isVoiceActive) {
      // Simulate voice activation
      setTimeout(() => setIsVoiceActive(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 glass dark:glass-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold">SafeTravel AI</span>
            </Link>

            <Badge variant="secondary" className="px-3 py-1">
              Digital ID Generation
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <step.icon className="h-5 w-5" />
                </motion.div>

                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{steps[currentStep - 1]?.title}</span>
              <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-primary" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Select onValueChange={(value) => handleInputChange("nationality", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="indian">Indian</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="documentType">Document Type *</Label>
                        <Select onValueChange={(value) => handleInputChange("documentType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="driving-license">Driving License</SelectItem>
                            <SelectItem value="voter-id">Voter ID</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documentNumber">Document Number *</Label>
                      <Input
                        id="documentNumber"
                        value={formData.documentNumber}
                        onChange={(e) => handleInputChange("documentNumber", e.target.value)}
                        placeholder="Enter document number"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          placeholder="+91 9876543210"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Profile Photo</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Upload a clear photo of yourself</p>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Travel Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Travel Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination *</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        placeholder="e.g., Goa, India"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="travelStartDate">Travel Start Date *</Label>
                        <Input
                          id="travelStartDate"
                          type="date"
                          value={formData.travelStartDate}
                          onChange={(e) => handleInputChange("travelStartDate", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="travelEndDate">Travel End Date *</Label>
                        <Input
                          id="travelEndDate"
                          type="date"
                          value={formData.travelEndDate}
                          onChange={(e) => handleInputChange("travelEndDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accommodationAddress">Accommodation Address</Label>
                      <Textarea
                        id="accommodationAddress"
                        value={formData.accommodationAddress}
                        onChange={(e) => handleInputChange("accommodationAddress", e.target.value)}
                        placeholder="Hotel/Resort address where you'll be staying"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
                      <Select onValueChange={(value) => handleInputChange("purposeOfVisit", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tourism">Tourism</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="medical">Medical</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="family">Family Visit</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="itinerary">Travel Itinerary</Label>
                      <Textarea
                        id="itinerary"
                        value={formData.itinerary}
                        onChange={(e) => handleInputChange("itinerary", e.target.value)}
                        placeholder="Brief description of your planned activities and places to visit"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Emergency Contacts */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>Emergency Contacts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Primary Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Primary Emergency Contact *</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact1Name">Full Name</Label>
                          <Input
                            id="emergencyContact1Name"
                            value={formData.emergencyContact1Name}
                            onChange={(e) => handleInputChange("emergencyContact1Name", e.target.value)}
                            placeholder="Contact person's name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact1Phone">Phone Number</Label>
                          <Input
                            id="emergencyContact1Phone"
                            value={formData.emergencyContact1Phone}
                            onChange={(e) => handleInputChange("emergencyContact1Phone", e.target.value)}
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact1Relation">Relationship</Label>
                        <Select onValueChange={(value) => handleInputChange("emergencyContact1Relation", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="relative">Relative</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Secondary Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Secondary Emergency Contact</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact2Name">Full Name</Label>
                          <Input
                            id="emergencyContact2Name"
                            value={formData.emergencyContact2Name}
                            onChange={(e) => handleInputChange("emergencyContact2Name", e.target.value)}
                            placeholder="Contact person's name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="emergencyContact2Phone">Phone Number</Label>
                          <Input
                            id="emergencyContact2Phone"
                            value={formData.emergencyContact2Phone}
                            onChange={(e) => handleInputChange("emergencyContact2Phone", e.target.value)}
                            placeholder="+91 9876543210"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact2Relation">Relationship</Label>
                        <Select onValueChange={(value) => handleInputChange("emergencyContact2Relation", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
                            <SelectItem value="relative">Relative</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Medical Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Medical Information (Optional)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bloodType">Blood Type</Label>
                          <Select onValueChange={(value) => handleInputChange("bloodType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="allergies">Known Allergies</Label>
                          <Input
                            id="allergies"
                            value={formData.allergies}
                            onChange={(e) => handleInputChange("allergies", e.target.value)}
                            placeholder="e.g., Peanuts, Shellfish"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medicalConditions">Medical Conditions</Label>
                        <Textarea
                          id="medicalConditions"
                          value={formData.medicalConditions}
                          onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                          placeholder="Any chronic conditions or medications"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Fingerprint className="h-5 w-5 text-primary" />
                      <span>Identity Verification</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <Fingerprint className="h-12 w-12 text-primary" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">Ready to Generate Your Digital ID</h3>
                        <p className="text-muted-foreground text-pretty">
                          We'll create a secure, blockchain-based digital identity using the information you provided.
                          This process may take a few moments.
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <h4 className="font-semibold flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Information Summary</span>
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <span className="ml-2 font-medium">{formData.fullName || "Not provided"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Document:</span>
                          <span className="ml-2 font-medium">{formData.documentType || "Not selected"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Destination:</span>
                          <span className="ml-2 font-medium">{formData.destination || "Not provided"}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Travel Dates:</span>
                          <span className="ml-2 font-medium">
                            {formData.travelStartDate && formData.travelEndDate
                              ? `${formData.travelStartDate} to ${formData.travelEndDate}`
                              : "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        size="lg"
                        onClick={generateDigitalID}
                        disabled={isGenerating}
                        className="w-full md:w-auto"
                      >
                        {isGenerating ? (
                          <>
                            <motion.div
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Generating Digital ID...
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Generate Digital Tourist ID
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 5: Enhanced Generated Digital ID with 3D Flip Card */}
            {currentStep === 5 && generatedID && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass dark:glass-dark neuro dark:neuro-dark">
                  <CardHeader className="text-center">
                    <motion.div
                      className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </motion.div>
                    <CardTitle className="text-2xl">Digital Tourist ID Generated!</CardTitle>
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Safety Score: {safetyScore}%</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Award className="h-3 w-3" />
                        <span>{rewardPoints} Points</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* 3D Flip Digital ID Card */}
                    <div className="perspective-1000 mx-auto max-w-md">
                      <motion.div
                        className="relative w-full h-64 preserve-3d cursor-pointer"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        onClick={() => setIsFlipped(!isFlipped)}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front Side */}
                        <motion.div
                          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 text-primary-foreground shadow-2xl"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          {/* Holographic Seal Animation */}
                          <motion.div
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-80"
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          >
                            <Sparkles className="h-4 w-4 m-2" />
                          </motion.div>

                          <div className="space-y-4 h-full flex flex-col justify-between">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                              >
                                <User className="h-8 w-8" />
                              </motion.div>
                              <div>
                                <h3 className="font-bold text-xl">{formData.fullName}</h3>
                                <p className="text-primary-foreground/80 text-sm">ID: {generatedID}</p>
                                <Badge className="bg-green-500/20 text-green-100 mt-1">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-primary-foreground/60">Destination</p>
                                <p className="font-medium">{formData.destination}</p>
                              </div>
                              <div>
                                <p className="text-primary-foreground/60">Safety Score</p>
                                <div className="flex items-center space-x-1">
                                  <span className="font-bold text-lg">{safetyScore}%</span>
                                  <Star className="h-4 w-4 text-yellow-400" />
                                </div>
                              </div>
                            </div>

                            {/* Animated QR Code */}
                            <div className="flex items-center justify-between">
                              <motion.div
                                className="w-16 h-16 bg-white rounded-lg p-2"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 rgba(255,255,255,0)",
                                    "0 0 20px rgba(255,255,255,0.5)",
                                    "0 0 0 rgba(255,255,255,0)",
                                  ],
                                }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <QrCode className="h-full w-full text-black" />
                              </motion.div>
                              <div className="text-right">
                                <p className="text-primary-foreground/60 text-xs">Valid Until</p>
                                <p className="font-medium">{formData.travelEndDate}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <Globe className="h-3 w-3" />
                                  <span className="text-xs">Blockchain Secured</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Back Side */}
                        <motion.div
                          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 p-6 text-white shadow-2xl"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                          }}
                        >
                          <div className="space-y-4 h-full">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-lg">Trip Details</h3>
                              <Calendar className="h-5 w-5 text-blue-400" />
                            </div>

                            <div className="space-y-3 text-sm">
                              <div>
                                <p className="text-gray-300">Travel Period</p>
                                <p className="font-medium">
                                  {formData.travelStartDate} - {formData.travelEndDate}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-300">Accommodation</p>
                                <p className="font-medium text-xs leading-relaxed">
                                  {formData.accommodationAddress || "Not specified"}
                                </p>
                              </div>

                              <div>
                                <p className="text-gray-300">Purpose</p>
                                <p className="font-medium capitalize">{formData.purposeOfVisit || "Tourism"}</p>
                              </div>
                            </div>

                            <div className="border-t border-gray-600 pt-3">
                              <h4 className="font-semibold text-sm mb-2 flex items-center">
                                <Heart className="h-4 w-4 mr-1 text-red-400" />
                                Emergency Contacts
                              </h4>
                              <div className="space-y-2 text-xs">
                                <div>
                                  <p className="font-medium">{formData.emergencyContact1Name}</p>
                                  <p className="text-gray-300">{formData.emergencyContact1Phone}</p>
                                </div>
                                {formData.emergencyContact2Name && (
                                  <div>
                                    <p className="font-medium">{formData.emergencyContact2Name}</p>
                                    <p className="text-gray-300">{formData.emergencyContact2Phone}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Card Flip Instruction */}
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        {isFlipped ? "View Front" : "View Back"}
                      </Button>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Button onClick={downloadQRCode} className="flex flex-col items-center space-y-1 h-auto py-3">
                        <QrCode className="h-5 w-5" />
                        <span className="text-xs">QR Code</span>
                      </Button>

                      <Button
                        onClick={exportToPDF}
                        variant="outline"
                        className="flex flex-col items-center space-y-1 h-auto py-3 bg-transparent"
                      >
                        <FileText className="h-5 w-5" />
                        <span className="text-xs">Export PDF</span>
                      </Button>

                      <Button
                        onClick={shareWithFamily}
                        variant="outline"
                        className="flex flex-col items-center space-y-1 h-auto py-3 bg-transparent"
                      >
                        <Share2 className="h-5 w-5" />
                        <span className="text-xs">Share</span>
                      </Button>

                      <Button
                        onClick={toggleVoiceAssistant}
                        variant={isVoiceActive ? "default" : "outline"}
                        className="flex flex-col items-center space-y-1 h-auto py-3 bg-transparent"
                      >
                        {isVoiceActive ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                        <span className="text-xs">Voice</span>
                      </Button>
                    </div>

                    {/* Voice Assistant Status */}
                    {isVoiceActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/10 rounded-lg p-3 text-center"
                      >
                        <motion.div
                          className="flex items-center justify-center space-x-2"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Mic className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Voice Assistant Active</span>
                        </motion.div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Say "Help", "Emergency", or "Navigate" for assistance
                        </p>
                      </motion.div>
                    )}

                    {/* Gamification Elements */}
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold flex items-center">
                          <Award className="h-4 w-4 mr-2 text-yellow-500" />
                          Safety Rewards
                        </h4>
                        <Badge variant="secondary">{rewardPoints} Points</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                          <Star className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                          <p>Safe Traveler</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                          <Shield className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                          <p>ID Verified</p>
                        </div>
                        <div className="bg-white/50 dark:bg-black/20 rounded p-2">
                          <Globe className="h-4 w-4 mx-auto mb-1 text-green-500" />
                          <p>Explorer</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Your enhanced digital ID is ready with 3D view, voice assistance, and family sharing!
                      </p>
                      <Link href="/dashboard">
                        <Button variant="link">
                          Go to Tourist Dashboard
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={currentStep === 4 ? generateDigitalID : nextStep}
                disabled={currentStep === 4 && isGenerating}
                className="flex items-center space-x-2"
              >
                <span>{currentStep === 4 ? "Generate ID" : "Next"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
