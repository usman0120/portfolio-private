// src/components/common/LoadingLine.tsx
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const LoadingLine = () => {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()
  const progress = useMotionValue(0)
  const completionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animationControls = useRef<ReturnType<typeof animate> | null>(null)

  useEffect(() => {
    const startLoading = () => {
      setIsVisible(true)
      progress.set(0)
      
      // Initial smooth progress (0-85%)
      animationControls.current = animate(progress, 85, {
        duration: 0.8,
        ease: "easeOut"
      })
    }

    const completeLoading = () => {
      // Cancel any ongoing animation
      if (animationControls.current) {
        animationControls.current.stop()
      }
      
      // Fast completion animation (85-100%) with boost effect
      animationControls.current = animate(progress, 100, {
        duration: 0.15, // Faster completion
        ease: "easeIn",
        onComplete: () => {
          // Brief pause at 100% then fade out
          completionTimeout.current = setTimeout(() => {
            setIsVisible(false)
            progress.set(0)
          }, 150)
        }
      })
    }

    // Start loading when route changes
    startLoading()
    
    // Simulate completion (replace this with your actual loading detection)
    completionTimeout.current = setTimeout(() => {
      completeLoading()
    }, 1000) // Adjust to match your typical page load time

    return () => {
      if (completionTimeout.current) {
        clearTimeout(completionTimeout.current)
      }
      if (animationControls.current) {
        animationControls.current.stop()
      }
    }
  }, [location.key, progress])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] overflow-hidden">
      {/* Main progress bar */}
      <motion.div
        style={{ 
          width: progress,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease-out'
        }}
        className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 relative"
      >
        {/* Glow effect that intensifies during completion */}
        <motion.div
          className="absolute inset-0 bg-white/30"
          animate={{
            opacity: [0.3, 0.8, 0],
            scaleX: [1, 1.2, 0.8]
          }}
          transition={{
            duration: 0.4,
            times: [0, 0.8, 1],
            ease: "easeOut"
          }}
        />
        
        {/* Pulsing dot at the end */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(139,92,246,0.8)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}

export default LoadingLine