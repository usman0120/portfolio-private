// src/components/sections/Header.tsx
import { useState, useEffect } from 'react'
import { FaMoon, FaSun, FaBars } from 'react-icons/fa'
import { useTheme } from '../../hooks/useTheme'
import { motion } from 'framer-motion'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    
    // Small delay to allow the menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const headerHeight = document.querySelector('nav')?.clientHeight || 0
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 300) // 300ms matches the menu closing animation duration
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'mx-2 lg:mx-8 mt-1 lg:mt-4 rounded-xl shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-md py-1 lg:py-3'
          : 'mx-0 lg:mx-0 mt-0 bg-white dark:bg-gray-800 shadow-sm py-2 lg:py-4'
      }`}
      animate={{
        scale: isScrolled ? 0.98 : 1,
        y: isScrolled ? 5 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex justify-between items-center text-xl font-bold text-gray-800 dark:text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
             <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">UA</span>
            </div>
             <span className="font-bold pl-2 text-lg lg:text-xl text-gray-800 dark:text-white">
               <span className="md:hidden">USMAN</span>
               <span className="hidden md:inline">USMAN AHMAD</span>
             </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 dark:text-gray-300 px-1 py-1 lg:py-2 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"
                />
              </motion.button>
            ))}
            
            {/* Theme Toggle - Desktop */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-yellow-500" />
              )}
            </motion.button>
          </div>
          
          {/* Mobile Header Right Side */}
          <div className="flex items-center space-x-4 md:hidden">
            {/* Theme Toggle - Mobile */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-yellow-500" />
              )}
            </motion.button>
            
            {/* Mobile Menu Button */}
            <motion.button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <FaBars className="text-gray-800 dark:text-white text-xl" />
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <motion.div 
          className={`md:hidden overflow-hidden`}
          initial={false}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
            paddingTop: mobileMenuOpen ? '0.25rem' : 0,
            marginTop: mobileMenuOpen ? '0.1rem' : 0,
            borderTop: mobileMenuOpen ? '1px solid rgba(0,0,0,0.1)' : '0px solid transparent',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left py-2 px-3 text-gray-700 dark:text-gray-300 text-base relative"
              whileTap={{ scale: 0.98 }}
            >
              {link.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Header