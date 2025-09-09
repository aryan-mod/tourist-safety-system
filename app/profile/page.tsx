"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Shield,
  QrCode,
  Download,
  Share2,
  Edit,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  Award,
  Fingerprint,
  Globe,
  Eye,
  EyeOff,
  Copy,
  Check,
  Sparkles,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAccessibility } from "@/contexts/accessibility-context"
import { toast } from "sonner"

interface UserProfile {
  name: string
  email: string
  phone: string
  photo: string
  digitalId: string
  blockchainHash: string
  tripStartDate: string
  tripEndDate: string
  destination: string
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  safetyScore: number
  totalTrips: number
  rewardPoints: number
  memberSince: string
}

const mockProfile: UserProfile = {
  name: "John Anderson",
  email: "john.anderson@email.com",
  phone: "+1 (555) 123-4567",
  photo: "/professional-headshot-of-a-traveler.jpg",
  digitalId: "ST-2024-JA-7891",
  blockchainHash: "0x7f9c8e2a1b5d3f6e9c4a8b2e5f1d7c3a9e6b4f8d2c5a1e7b9f3c6d8a4e2b5f1c7",
  tripStartDate: "2024-01-15",
  tripEndDate: "2024-01-25",
  destination: "Mumbai, India",
  emergencyContact: {
    name: "Sarah Anderson",
    phone: "+1 (555) 987-6543",
    relationship: "Spouse",
  },
  safetyScore: 87,
  totalTrips: 12,
  rewardPoints: 1250,
  memberSince: "2022-03-15",
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showBlockchainHash, setShowBlockchainHash] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { t } = useLanguage()
  const { speak } = useAccessibility()

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile({ ...profile, photo: e.target?.result as string })
        toast.success("Profile photo updated")
        speak("Profile photo updated")
      }
      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success(`${label} copied to clipboard`)
      speak(`${label} copied`)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy to clipboard")
    }
  }

  const downloadQRCode = () => {
    // Simulate QR code download
    toast.success("QR code downloaded")
    speak("QR code downloaded")
  }

  const shareProfile = async () => {
    const shareData = {
      title: "SafeTravel Digital ID",
      text: `${profile.name}'s Digital Tourist ID: ${profile.digitalId}`,
      url: `https://safetravel.app/verify/${profile.digitalId}`,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await copyToClipboard(shareData.url, "Profile link")
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTripDuration = () => {
    const start = new Date(profile.tripStartDate)
    const end = new Date(profile.tripEndDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t("profile.title") || "My Profile"}</h1>
            <p className="text-muted-foreground mt-1">
              {t("profile.subtitle") || "Manage your digital tourist identity"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Award className="h-3 w-3" />
              <span>Level {Math.floor(profile.rewardPoints / 500) + 1}</span>
            </Badge>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </div>

        {/* Virtual Tourist ID Card */}
        <div className="flex justify-center">
          <motion.div
            className="relative w-full max-w-md h-80 perspective-1000"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full h-full preserve-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front Side */}
              <Card className="absolute inset-0 backface-hidden glass dark:glass-dark neuro dark:neuro-dark overflow-hidden">
                <div className="relative h-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent">
                  {/* Holographic Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  <CardContent className="p-6 h-full flex flex-col justify-between relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <span className="font-bold text-sm">SafeTravel ID</span>
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="h-5 w-5 text-primary/70" />
                      </motion.div>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <motion.img
                          src={profile.photo}
                          alt={profile.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                          whileHover={{ scale: 1.1 }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-primary/50"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">{profile.destination}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Star className="h-2 w-2 mr-1" />
                            {profile.safetyScore}% Safe
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* ID Information */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Digital ID</span>
                        <span className="font-mono text-sm font-medium">{profile.digitalId}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Valid Until</span>
                        <span className="text-sm">{formatDate(profile.tripEndDate)}</span>
                      </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className="w-8 h-8 bg-background rounded grid grid-cols-3 gap-px p-1">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <div
                              key={i}
                              className={`bg-foreground rounded-sm ${Math.random() > 0.5 ? "opacity-100" : "opacity-30"}`}
                            />
                          ))}
                        </div>
                      </motion.div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Tap to flip</p>
                        <p className="text-xs text-muted-foreground">for details</p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Back Side */}
              <Card className="absolute inset-0 backface-hidden rotate-y-180 glass dark:glass-dark neuro dark:neuro-dark">
                <CardContent className="p-6 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">Trip Details</h3>
                    <Separator className="mb-4" />
                  </div>

                  {/* Trip Information */}
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Duration</p>
                        <p className="font-medium">{getTripDuration()} days</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Total Trips</p>
                        <p className="font-medium">{profile.totalTrips}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Emergency Contact</p>
                      <p className="font-medium text-sm">{profile.emergencyContact.name}</p>
                      <p className="text-xs text-muted-foreground">{profile.emergencyContact.relationship}</p>
                      <p className="text-xs font-mono">{profile.emergencyContact.phone}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Blockchain Hash</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs font-mono bg-muted/50 p-2 rounded flex-1 truncate">
                          {showBlockchainHash ? profile.blockchainHash : "••••••••••••••••••••••••••••••••"}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowBlockchainHash(!showBlockchainHash)}
                          className="h-8 w-8 p-0"
                        >
                          {showBlockchainHash ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">Member since {formatDate(profile.memberSince)}</p>
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <Fingerprint className="h-3 w-3 text-primary" />
                      <span className="text-xs text-primary">Verified Identity</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Card Actions */}
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => setShowQRCode(true)} className="bg-transparent">
            <QrCode className="h-4 w-4 mr-2" />
            View QR Code
          </Button>
          <Button variant="outline" onClick={downloadQRCode} className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={shareProfile} className="bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Profile Information */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={profile.photo || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-border"
                  />
                  {isEditing && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute -bottom-1 -right-1 h-6 w-6 p-0 rounded-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="font-semibold"
                    />
                  ) : (
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                  )}
                  <p className="text-sm text-muted-foreground">Digital Tourist ID: {profile.digitalId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Email Address</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="flex-1"
                      />
                    ) : (
                      <span className="flex-1">{profile.email}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(profile.email, "Email")}
                      className="h-8 w-8 p-0"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground">Phone Number</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="flex-1"
                      />
                    ) : (
                      <span className="flex-1">{profile.phone}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(profile.phone, "Phone")}
                      className="h-8 w-8 p-0"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Information */}
          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Current Trip</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Destination</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{profile.destination}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(profile.tripStartDate)}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">End Date</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(profile.tripEndDate)}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Duration</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{getTripDuration()} days</span>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-xs text-muted-foreground">Emergency Contact</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{profile.emergencyContact.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {profile.emergencyContact.relationship}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm">{profile.emergencyContact.phone}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(profile.emergencyContact.phone, "Emergency contact")}
                      className="h-6 w-6 p-0"
                    >
                      {copied ? <Check className="h-2 w-2" /> : <Copy className="h-2 w-2" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{profile.safetyScore}%</p>
              <p className="text-xs text-muted-foreground">Safety Score</p>
            </CardContent>
          </Card>

          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{profile.totalTrips}</p>
              <p className="text-xs text-muted-foreground">Total Trips</p>
            </CardContent>
          </Card>

          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{profile.rewardPoints}</p>
              <p className="text-xs text-muted-foreground">Reward Points</p>
            </CardContent>
          </Card>

          <Card className="glass dark:glass-dark neuro dark:neuro-dark">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">{Math.floor(profile.rewardPoints / 500) + 1}</p>
              <p className="text-xs text-muted-foreground">Level</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCode && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-2xl p-6 max-w-sm w-full glass dark:glass-dark neuro dark:neuro-dark"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold">Digital ID QR Code</h3>

                <div className="bg-white p-4 rounded-lg mx-auto w-fit">
                  <div className="w-48 h-48 bg-foreground rounded grid grid-cols-12 gap-px p-2">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-background rounded-sm ${Math.random() > 0.5 ? "opacity-100" : "opacity-0"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>ID: {profile.digitalId}</p>
                  <p>Valid until: {formatDate(profile.tripEndDate)}</p>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={downloadQRCode} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" onClick={shareProfile} className="flex-1 bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Button variant="ghost" onClick={() => setShowQRCode(false)} className="w-full">
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
