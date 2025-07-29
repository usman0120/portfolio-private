// src/components/sections/About.tsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FaHandsHelping, FaChartLine, FaStore, FaGraduationCap, FaFileAlt } from 'react-icons/fa'
import Counter from '../../common/Counter'
import resumePdf from '../../../assets/resume.pdf';
type AboutProps = {
  onViewResume: () => void
}

const About = ({ onViewResume }: AboutProps) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  })

  const helpItems = [
    {
      icon: <FaChartLine className="text-xl" />,
      title: "Startups",
      description: "Fast, modern web presence to establish your brand and attract customers."
    },
    {
      icon: <FaStore className="text-xl" />,
      title: "Small Businesses",
      description: "Upgrade your online visibility with professional, conversion-focused designs."
    },
    {
      icon: <FaGraduationCap className="text-xl" />,
      title: "Students & Educators",
      description: "Beautiful portfolio and project websites to showcase your work."
    }
  ]

  const stats = [
    { value: 2, label: "Years Experience" },
    { value: 20, label: "Happy Clients" },
    { value: 50, label: "Projects Completed" }
  ]

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-24 bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30"
          animate={{
            x: [0, -10, 5, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-60 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30"
          animate={{
            x: [0, 15, -5, 0],
            y: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 dark:opacity-30"
          animate={{
            x: [0, 5, -10, 0],
            y: [0, -10, 15, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: 4,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 relative inline-block group"
          >
            About Me
            <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600 dark:bg-purple-400 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Profile card with image and intro - Image hidden on mobile */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="hidden lg:block lg:w-1/3 justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <div className="relative w-auto h-auto rounded-lg overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <img 
                  src="src/assets/images/profile/profile-pic-full.png" 
                  alt="profile-photo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 relative pl-6 border-l-4 border-purple-600 dark:border-purple-400">
              I'm a passionate web developer with expertise in creating visually stunning and highly
              functional digital experiences. My approach combines technical precision with creative
              problem-solving to deliver solutions that are both beautiful and intuitive.
            </p>

            {/* Signature */}
            <div className="flex items-center mt-8">
              <div className="font-signature text-3xl text-purple-600 dark:text-purple-400">Usman Ahmad</div>
            </div>
          </div>
        </motion.div>

        {/* I Help section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center text-white mr-3">
              <FaHandsHelping className="text-sm" />
            </span>
            How I Can Help You
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {helpItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center">
            <span className="w-8 h-8 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center text-white mr-3">
              <FaChartLine className="text-sm" />
            </span>
            By The Numbers
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  <Counter 
                    from={0} 
                    to={stat.value} 
                    duration={2} 
                    delay={0.9 + index * 0.3} 
                    trigger={inView} 
                  />+
                </div>
                <div className="text-gray-600 dark:text-gray-300 uppercase text-sm tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-wrap gap-6 justify-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button 
  className="relative px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden group"
  onClick={() => {
  const link = document.createElement('a');
  link.href = resumePdf;
  link.download = 'UsmanAhmad_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}}
>
  <span className="relative z-10">Download Resume</span>
  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition duration-300"></span>
</button>

          <button 
            onClick={onViewResume}
            className="relative px-8 py-4 rounded-full font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              <FaFileAlt className="mr-2" />View Resume
            </span>
            <span className="absolute inset-0 bg-purple-50 dark:bg-purple-900/30 opacity-0 group-hover:opacity-100 transition duration-300"></span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default About