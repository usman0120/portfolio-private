// src/components/sections/SecondaryHeader.tsx
import { useState } from 'react'
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const SecondaryHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  const pages = [
    { path: '/', label: 'Home' },
    { path: '/hireme', label: 'Hire Me' },
    { path: '/projects', label: 'Projects' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm py-2 lg:py-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo/Home Link */}
          <Link to="/" className="flex items-center">
            <motion.div
              className="flex items-center text-xl font-bold text-gray-800 dark:text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">UA</span>
              </div>
              <span className="font-bold pl-2 text-lg lg:text-xl">USMAN AHMAD</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="text-gray-700 dark:text-gray-300 px-2 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {page.label}
              </Link>
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
              {mobileMenuOpen ? (
                <FaTimes className="text-gray-800 dark:text-white text-xl" />
              ) : (
                <FaBars className="text-gray-800 dark:text-white text-xl" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-md`}
          initial={false}
          animate={{
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="block w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {page.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default SecondaryHeader