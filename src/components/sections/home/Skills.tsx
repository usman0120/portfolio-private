// src/components/sections/Skills.tsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { 
  FaUsers, FaLightbulb, FaComments, FaClock, FaBrain, FaHandshake,
  FaCode, FaNetworkWired, FaDatabase, FaShieldAlt, FaCube,
  FaFigma, FaGithub, FaAndroid, FaGoogle, FaMicrosoft, FaPaintBrush, 
} from 'react-icons/fa'
import { 
  SiVercel, SiCanva, SiPostman, SiSlack, SiTrello 
} from 'react-icons/si'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const technicalSkills = [
    { name: "HTML/CSS", percentage: 95 },
    { name: "UI/UX Design", percentage: 90 },
    { name: "Tailwind CSS", percentage: 85 },
    { name: "JavaScript", percentage: 85 },
    { name: "React", percentage: 80 },
    { name: "Firebase", percentage: 80 },
    { name: "SQL Server", percentage: 80 },
    { name: "C++", percentage: 80 },
    { name: "TypeScript", percentage: 75 },
    { name: "Flutter", percentage: 60 },
  ]

  // Updated soft skills with shorter names for mobile
  const softSkills = [
    { icon: <FaUsers />, name: "Teamwork", mobileName: "Teamwork" },
    { icon: <FaLightbulb />, name: "Problem Solving", mobileName: "Problem Solving" },
    { icon: <FaComments />, name: "Communication", mobileName: "Communication" },
    { icon: <FaClock />, name: "Time Management", mobileName: "Time Management" },
    { icon: <FaBrain />, name: "Creativity", mobileName: "Creativity" },
    { icon: <FaHandshake />, name: "Collaboration", mobileName: "Collaboration" }
  ]

  // Foundations & Core Concepts
  const foundationSkills = [
    { 
      icon: <FaCode />, 
      name: "OOP & DSA", 
      level: "Advanced",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    { 
      icon: <FaNetworkWired />, 
      name: "Computer Networks", 
      level: "Intermediate",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    { 
      icon: <FaDatabase />, 
      name: "DBMS", 
      level: "Advanced",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      iconColor: "text-orange-600 dark:text-orange-400"
    },
    { 
      icon: <FaShieldAlt />, 
      name: "Cyber Security", 
      level: "Intermediate",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    { 
      icon: <FaCube />, 
      name: "OS Fundamentals", 
      level: "Intermediate",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    }
  ]

  // Tools & Technologies - Compact version
  const tools = [
    { icon: <FaMicrosoft />, name: "VS Code", proficiency: 95 },
    { icon: <FaFigma />, name: "Figma", proficiency: 85 },
    { icon: <FaGithub />, name: "GitHub", proficiency: 90 },
    { icon: <FaAndroid />, name: "Android Studio", proficiency: 75 },
    { icon: <FaGoogle />, name: "Firebase", proficiency: 80 },
    { icon: <SiVercel />, name: "Vercel", proficiency: 85 },
    { icon: <SiCanva />, name: "Canva", proficiency: 80 },
    { icon: <SiPostman />, name: "Postman", proficiency: 85 },
    { icon: <FaMicrosoft />, name: "SQL Server", proficiency: 80 },
    { icon: <FaPaintBrush />, name: "Pencil", proficiency: 70 },
    { icon: <SiSlack />, name: "Slack", proficiency: 90 },
    { icon: <SiTrello />, name: "Trello", proficiency: 85 }
  ]

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Advanced": return "text-green-600 dark:text-green-400";
      case "Intermediate": return "text-yellow-600 dark:text-yellow-400";
      case "Basic": return "text-blue-600 dark:text-blue-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  }

  const getProficiencyColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 80) return "bg-blue-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-gray-400";
  }

  const getProficiencyText = (percentage: number) => {
    if (percentage >= 90) return "Expert";
    if (percentage >= 80) return "Advanced";
    if (percentage >= 70) return "Intermediate";
    return "Basic";
  }

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

          {/* Right Column - Soft Skills and Foundations */}
          <div className="space-y-8 md:space-y-12">
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

            {/* Foundations & Core Concepts - New Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="px-2 sm:px-0"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white flex items-center">
                <span className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center text-white text-xs sm:text-sm mr-2 sm:mr-3">
                  F
                </span>
                Foundations & Core Concepts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {foundationSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.9 + index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    className="group relative bg-white dark:bg-gray-700 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Gradient Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-3">
                        <div className={`${skill.bgColor} p-2 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                          <div className={`text-lg ${skill.iconColor}`}>
                            {skill.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm leading-tight break-words">
                            {skill.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className={`text-xs font-medium ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                            {/* Animated Dot */}
                            <div className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)} opacity-70 group-hover:animate-pulse`} />
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar Indicator */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-500 group-hover:shadow-sm`}
                            style={{
                              width: skill.level === "Advanced" ? "90%" : 
                                     skill.level === "Intermediate" ? "75%" : "60%"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tools & Technologies - Compact & Powerful Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 md:mt-16 px-2 sm:px-0"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-white flex items-center justify-center">
            <span className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm mr-2 sm:mr-3">
              ⚙️
            </span>
            Tools & Technologies
          </h3>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: 1.1 + index * 0.03,
                    type: "spring",
                    stiffness: 400
                  }}
                  className="group relative bg-gray-50 dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500 hover:border-orange-300 dark:hover:border-orange-400 transition-all duration-200"
                >
                  {/* Tool Icon with Proficiency Indicator */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 relative">
                      {tool.icon}
                      {/* Proficiency Badge */}
                      <div className={`absolute -top-1 -right-1 w-3 h-3 ${getProficiencyColor(tool.proficiency)} rounded-full border-2 border-white dark:border-gray-700`} />
                    </div>
                    
                    {/* Tool Name */}
                    <span className="font-medium text-gray-800 dark:text-white text-xs text-center leading-tight">
                      {tool.name}
                    </span>
                    
                    {/* Proficiency Level & Percentage */}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          {getProficiencyText(tool.proficiency)}
                        </span>
                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
                          {tool.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-500 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${getProficiencyColor(tool.proficiency)} transition-all duration-500`}
                          style={{ width: `${tool.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Compact Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="text-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
            >
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                Proficient with modern development tools & platforms
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills