// src/components/sections/Services.tsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FaCode, FaPaintBrush, FaMobileAlt, FaShoppingCart, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })
  const services = [
    {
      id: 'web-development',
      icon: <FaCode className="text-3xl" />,
      title: "Web Development",
      description: "Custom-built websites with modern tech stacks that scale with your business needs and deliver exceptional performance.",
    },
    {
      id: 'ui-ux-design',
      icon: <FaPaintBrush className="text-3xl" />,
      title: "UI/UX Design",
      description: "Human-centered designs that combine aesthetics with functionality to create memorable user experiences.",
    },
    {
      id: 'responsive-design',
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Responsive Design",
      description: "Fluid layouts that adapt perfectly to any device, ensuring optimal viewing experience across all platforms.",
    },
    {
      id: 'e-commerce',
      icon: <FaShoppingCart className="text-3xl" />,
      title: "E-Commerce",
      description: "High-converting online stores with seamless checkout flows and integrated payment solutions.",
    }
  ]

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-purple-600 dark:text-purple-400 font-semibold"
          >
            WHAT I OFFER
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2"
          >
            Crafting Digital Excellence
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 h-1 bg-purple-600 dark:bg-purple-400 mx-auto mt-4"
          />
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full"
            >
              {/* Background blob effect */}
              <motion.div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-purple-100 dark:bg-purple-50 opacity-20 group-hover:bg-purple-300 transition-all duration-500"
                initial={{ opacity: 0.2 }}
                whileHover={{ opacity: 0.4 }}
              />

              <div className="p-8 relative z-10">
                {/* Icon container */}
                <motion.div
                  className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 dark:group-hover:bg-purple-700 transition-all duration-300"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <motion.div
                    className="text-purple-600 dark:text-purple-400 group-hover:text-white transition-all duration-300"
                    whileHover={{ rotate: -10 }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>

                {/* Service content */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>

                {/* Learn more link - Updated to use Link */}
                <div className="mt-6">
                  <Link
                    to={`/services/${service.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-block px-4 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white"
                  >
                    <span className="flex items-center">
                      Learn more <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services