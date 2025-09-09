import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import { AccessibilityProvider } from "@/contexts/accessibility-context"
import { GeminiChatbot } from "@/components/gemini-chatbot"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { TopNavbar } from "@/components/top-navbar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Smart Tourist Safety - AI-Powered Travel Protection",
  description:
    "Advanced tourist safety monitoring with AI, geo-fencing, and blockchain digital ID for secure travel experiences.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <AccessibilityProvider>
                <div className="flex h-screen bg-background">
                  <SidebarNavigation />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <TopNavbar />
                    <main className="flex-1 overflow-y-auto">{children}</main>
                  </div>
                </div>
                <GeminiChatbot />
              </AccessibilityProvider>
            </LanguageProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
