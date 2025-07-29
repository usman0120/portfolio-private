// src/components/ResumeModal.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaMapMarkerAlt, FaEnvelope, FaLink, FaPhone } from 'react-icons/fa'

type ResumeModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Simulate loading when modal opens
  useEffect(() => {
    if (!isOpen) return

    const loadResume = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (err) {
        setError('Failed to load resume. Please try again later.')
        console.error('Error loading resume:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadResume()
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[90vh]"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 bg-white/80 dark:bg-gray-800/80 rounded-full p-2"
                aria-label="Close resume"
              >
                <FaTimes className="text-xl" />
              </button>
              
              {/* Resume content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                {isLoading ? (
                  <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
                  </div>
                ) : error ? (
                  <div className="p-8 text-center text-red-500 dark:text-red-400">
                    {error}
                    <button
                      onClick={onClose}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="resume-container w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-y-auto transition-colors duration-300 max-h-[90vh] p-8">
                    {/* Header */}
                    <div className="mb-6 text-center">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">USMAN AHMAD</h1>
                      <h2 className="text-xl text-blue-600 dark:text-blue-400 font-medium">Software Engineer & Web Developer</h2>
                      
                      {/* Contact Info */}
                      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-blue-600 dark:text-blue-400" />
                          Punjab, Pakistan
                        </div>
                        <div className="flex items-center">
                          <FaEnvelope className="mr-2 text-blue-600 dark:text-blue-400" />
                          usmanahmad.workmail@gmail.com
                        </div>
                        <div className="flex items-center">
                          <FaLink className="mr-2 text-blue-600 dark:text-blue-400" />
                          portfolio-link.com
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* Professional Summary */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">SUMMARY</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Frontend Developer with expertise in HTML, CSS, JavaScript, TypeScript, React, and Next.js. 
                          Experienced in creating responsive web applications with modern UI/UX principles. 
                          Certified in Office Management with additional skills in graphic design and data management. 
                          Passionate about building efficient, user-friendly applications and continuously expanding technical skills.
                        </p>
                      </div>

                      {/* Technical Skills */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">TECHNICAL SKILLS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Frontend Development:</h3>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2">
                              <li>HTML5, CSS3, JavaScript, TypeScript</li>
                              <li>React.js, Next.js, Tailwind CSS</li>
                              <li>Responsive Web Design</li>
                            </ul>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Additional Skills:</h3>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2">
                              <li>UI/UX Design Principles</li>
                              <li>Graphic Design (Canva, Photoshop)</li>
                              <li>Office Productivity (MS Office, Google Suite)</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Professional Experience */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">PROFESSIONAL EXPERIENCE</h2>
                        
                        <div className="mb-6">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Freelance Web Developer</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">2024 - Present</span>
                          </div>
                          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2 mt-2 space-y-1">
                            <li>Developed and deployed responsive web applications for diverse clients</li>
                            <li>Implemented modern UI/UX designs using React and Tailwind CSS</li>
                            <li>Optimized websites for performance and accessibility</li>
                          </ul>
                        </div>

                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Graphic Design Consultant</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">2024 - Present</span>
                          </div>
                          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2 mt-2 space-y-1">
                            <li>Created visual content for social media and marketing materials</li>
                            <li>Designed branding assets for small businesses</li>
                            <li>Collaborated with clients to deliver designs meeting their requirements</li>
                          </ul>
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">EDUCATION</h2>
                        
                        <div className="mb-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">BS Software Engineering</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">2024 - Present</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">University of Engineering and Technology, Lahore</p>
                        </div>

                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Diploma in Office Management</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Completed 2024</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">NSTTI Sahiwal (CVPE Punjab)</p>
                        </div>
                      </div>

                      {/* Projects */}
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-2 mb-3">PROJECTS</h2>
                        
                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Portfolio Website</h3>
                          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2 mt-1 space-y-1">
                            <li>Built with React and Tailwind CSS</li>
                            <li>Responsive design with dark mode support</li>
                            <li>Showcased projects and skills effectively</li>
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Calculator Application</h3>
                          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 pl-2 mt-1 space-y-1">
                            <li>Developed with HTML, CSS, and JavaScript</li>
                            <li>Implemented keyboard functionality</li>
                            <li>Intuitive user interface design</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal