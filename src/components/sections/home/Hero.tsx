// src/components/sections/Hero.tsx
import { useEffect, useRef } from 'react'
import { FaArrowDown, FaEye } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom';

type HeroProps = {
  onViewResume: () => void
}

const Hero = ({ }: HeroProps) => {
  const [typingRef, typingInView] = useInView({ triggerOnce: true })
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)

  // Typing animation effect
  useEffect(() => {
    if (typingInView) {
      // Animation will be handled by CSS/Animate.css
    }
  }, [typingInView])

  // Blob animation effect
  useEffect(() => {
    const animateBlobs = () => {
      if (blob1Ref.current && blob2Ref.current && blob3Ref.current) {
        const time = Date.now() * 0.001
        blob1Ref.current.style.transform = getBlobTransform(time, 7, 0)
        blob2Ref.current.style.transform = getBlobTransform(time, 7, 2)
        blob3Ref.current.style.transform = getBlobTransform(time, 7, 4)
      }
      requestAnimationFrame(animateBlobs)
    }

    const getBlobTransform = (time: number, duration: number, delay: number) => {
      const progress = ((time + delay) % duration) / duration
      if (progress < 0.33) {
        const p = progress / 0.33
        return `translate(${30 * p}px, ${-50 * p}px) scale(${1 + 0.1 * p})`
      } else if (progress < 0.66) {
        const p = (progress - 0.33) / 0.33
        return `translate(${30 - 50 * p}px, ${-50 + 70 * p}px) scale(${1.1 - 0.2 * p})`
      } else {
        const p = (progress - 0.66) / 0.34
        return `translate(${-20 + 20 * p}px, ${20 - 20 * p}px) scale(${0.9 + 0.1 * p})`
      }
    }

    const animationId = requestAnimationFrame(animateBlobs)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <motion.div
          ref={blob1Ref}
          className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          ref={blob2Ref}
          className="absolute top-1/2 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        />
        <motion.div
          ref={blob3Ref}
          className="absolute bottom-1/4 left-1/3 w-64 h-64 md:w-96 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: 4,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-36 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <div className="lg:w-1/2 mb-12 md:mb-16 lg:mb-0 text-center lg:text-left">
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
                Hi, I'm <br />
                <span className="text-purple-600 dark:text-purple-400 relative inline-block">
                  Usman Ahmad
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 dark:bg-purple-400 transform origin-left transition-all duration-500 scale-x-100"></span>
                </span>
              </h1>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6 font-medium">
              <span
                ref={typingRef}
                className="typing-animation inline-block overflow-hidden whitespace-nowrap border-r-2 border-current"
                style={{ animation: typingInView ? 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite' : 'none' }}
              >
                Software Engineer & Web Developer.
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
              I craft <span className="text-purple-600 dark:text-purple-400 font-medium">exceptional digital
                experiences</span> with clean, efficient code and intuitive designs.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
              <Link to="/hireme" className="relative px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden group transition-all duration-300 hover:shadow-lg">
                <span className="relative z-10 text-sm sm:text-base">Hire Me</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById('portfolio');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="relative px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 overflow-hidden group transition-all duration-300"              >
                <span className="relative z-10 flex items-center text-sm sm:text-base">
                  <FaEye className="mr-2" /> View Work
                </span>
                <span className="absolute inset-0 bg-purple-50 dark:bg-purple-900/20 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              </button>
            </div>
          </div>

          {/* Profile image */}
          <div className="lg:w-1/2 flex justify-center relative mt-10 lg:mt-0">
            <div className="relative group">
              <motion.div
                className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"
                animate={{
                  opacity: [0.7, 0.4, 0.7]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <img
                  src="src/assets/images/profile/profile-pic-circle.png"
                  alt="Usman Ahmad - Web Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-5 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <motion.div
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-1 sm:mr-2"
                    animate={{
                      opacity: [0.2, 1, 0.2]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile, visible on sm and up */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="animate-bounce">
          <div className="w-8 h-12 border-2 border-purple-600 dark:border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-600 dark:bg-purple-400 rounded-full mt-2"></div>
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero