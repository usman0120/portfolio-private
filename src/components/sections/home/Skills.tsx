// src/components/sections/Skills.tsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FaUsers, FaLightbulb, FaComments, FaClock, FaBrain, FaHandshake } from 'react-icons/fa'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const technicalSkills = [
    { name: "HTML/CSS", percentage: 95 },
    { name: "JavaScript", percentage: 85 },
    { name: "Tailwind CSS", percentage: 85 },
    { name: "TypeScript", percentage: 75 },
    { name: "React", percentage: 80 },
    { name: "UI/UX Design", percentage: 90 }
  ]

  // Updated soft skills with shorter names for mobile
  const softSkills = [
    { icon: <FaUsers />, name: "Teamwork", mobileName: "Teamwork" },
    { icon: <FaLightbulb />, name: "Problem Solving", mobileName: "Problem Solveing" },
    { icon: <FaComments />, name: "Communication", mobileName: "Communication" },
    { icon: <FaClock />, name: "Time Management", mobileName: "Time management" },
    { icon: <FaBrain />, name: "Creativity", mobileName: "Creativity" },
    { icon: <FaHandshake />, name: "Collaboration", mobileName: "Collaboration" }
  ]

  return (
    <section 
      ref={ref}
      className="relative py-16 bg-gray-50 dark:bg-gray-800 mt-12 md:mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4"
          >
            My Skills
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 sm:w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base"
          >
            A diverse skill set refined through years of hands-on experience and continuous learning.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="px-2 sm:px-0"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white flex items-center">
              <span className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm mr-2 sm:mr-3">
                T
              </span>
              Technical Skills
            </h3>
            <div className="space-y-6 sm:space-y-8">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="skill-item"
                >
                  <div className="flex justify-between mb-2 sm:mb-3">
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">{skill.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="px-2 sm:px-0"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white flex items-center">
              <span className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm mr-2 sm:mr-3">
                S
              </span>
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  whileHover={{ y: -5 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.7 + index * 0.1,
                    y: { type: "spring", stiffness: 300 }
                  }}
                  className="bg-white dark:bg-gray-700 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-600"
                >
                  <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 sm:p-3 rounded-md sm:rounded-lg">
                    {skill.icon}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-center sm:text-left text-xs sm:text-base">
                    <span className="sm:hidden">{skill.mobileName}</span>
                    <span className="hidden sm:inline">{skill.name}</span>
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills