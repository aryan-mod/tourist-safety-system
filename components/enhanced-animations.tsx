"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Fade in animation with stagger support
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for animating multiple children
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale animation for interactive elements
export const ScaleOnHover = ({
  children,
  scale = 1.05,
  className = "",
}: {
  children: React.ReactNode
  scale?: number
  className?: string
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Slide animation for panels and modals
export const SlideIn = ({
  children,
  direction = "right",
  className = "",
}: {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "down"
  className?: string
}) => {
  const variants = {
    hidden: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
      opacity: 0,
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Pulse animation for notifications and alerts
export const Pulse = ({
  children,
  intensity = 1.1,
  duration = 2,
  className = "",
}: {
  children: React.ReactNode
  intensity?: number
  duration?: number
  className?: string
}) => {
  return (
    <motion.div
      animate={{ scale: [1, intensity, 1] }}
      transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating animation for decorative elements
export const Float = ({
  children,
  distance = 10,
  duration = 3,
  className = "",
}: {
  children: React.ReactNode
  distance?: number
  duration?: number
  className?: string
}) => {
  return (
    <motion.div
      animate={{ y: [-distance, distance, -distance] }}
      transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Typewriter effect for text
export const TypeWriter = ({
  text,
  delay = 0.05,
  className = "",
}: {
  text: string
  delay?: number
  className?: string
}) => {
  return (
    <motion.div className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * delay }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Page transition wrapper
export const PageTransition = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
