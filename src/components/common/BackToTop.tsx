// src/components/common/BackToTop.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
  {isVisible && (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 bg-purple-600 dark:bg-purple-700 text-white p-2 rounded-full shadow-lg hover:bg-purple-700
       dark:hover:bg-purple-600 hover:shadow-xl z-50 focus:outline-none focus:ring-2 focus:ring-purple-500 
       focus:ring-offset-2 dark:focus:ring-offset-gray-900 w-9 h-12 flex items-center justify-center"
    >
      <FaArrowUp/>
    </motion.button>
  )}
</AnimatePresence>
  )
}

export default BackToTop