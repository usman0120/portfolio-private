// src/components/sections/Portfolio.tsx
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FaCode, FaPaintBrush, FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const portfolioCategories = [
    {
      icon: <FaCode className="text-blue-600 dark:text-blue-300" />,
      title: "Web Dev",
      description: "Interactive web applications",
      category: "Website",
      backTitle: "Web Projects",
      backDescription: "Explore my collection of modern web applications",
      bgColor: "from-blue-600 to-blue-500 dark:from-blue-800 dark:to-blue-700",
      btnColor: "text-blue-600 hover:bg-blue-50",
      link: "/projects?category=Website"
    },
    {
      icon: <FaPaintBrush className="text-purple-600 dark:text-purple-300" />,
      title: "UI/UX",
      description: "Beautiful interfaces",
      category: "Design",
      backTitle: "UI Designs",
      backDescription: "Discover my user-centered design solutions",
      bgColor: "from-purple-600 to-purple-500 dark:from-purple-800 dark:to-purple-700",
      btnColor: "text-purple-600 hover:bg-purple-50",
      link: "/projects?category=Design"
    },
    {
      icon: <FaShoppingCart className="text-green-600 dark:text-green-300" />,
      title: "Mini Projects",
      description: "Useful tools and utilities",
      category: "Mini Project",
      backTitle: "Mini Projects",
      backDescription: "See my collection of mini projects",
      bgColor: "from-green-600 to-green-500 dark:from-green-800 dark:to-green-700",
      btnColor: "text-green-600 hover:bg-green-50",
      link: "/projects/mini-projects" // Direct link to mini-projects page
    }
  ];

  const Card = ({ item, index }: { item: typeof portfolioCategories[0], index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);
    const scale = useMotionValue(1);
    const zIndex = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const xVal = e.clientX - rect.left;
      const yVal = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      x.set((xVal - centerX) / 8);
      y.set((yVal - centerY) / 8);
      scale.set(1.05);
      zIndex.set(10);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      animate(x, 0, { duration: 0.6, ease: [0.25, 1, 0.5, 1] });
      animate(y, 0, { duration: 0.6, ease: [0.25, 1, 0.5, 1] });
      animate(scale, 1, { duration: 0.4 });
      zIndex.set(0);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: index * 0.15,
            type: "spring",
            stiffness: 100
          }
        } : {}}
        className="portfolio-card w-[280px] h-[360px] perspective-1500 mx-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{ zIndex }}
      >
        {/* Invisible clickable overlay */}
        <Link 
          to={item.link} 
          className="absolute inset-0 z-20" 
          aria-label={`View ${item.title} projects`}
        />
        
        <motion.div
          className="card-inner w-full h-full relative preserve-3d rounded-2xl shadow-lg"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            scale,
            transformStyle: 'preserve-3d',
            transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.8s cubic-bezier(0.68,-0.55,0.265,1.55)'
          }}
        >
          {/* Front of Card */}
          <motion.div
            className="card-face absolute w-full h-full backface-hidden rounded-2xl flex flex-col items-center justify-center p-8"
            style={{
              background: `linear-gradient(135deg, ${item.title === 'Web Dev' ? '#ebf4ff' : item.title === 'UI/UX' ? '#f5f3ff' : '#f0fdf4'}, ${item.title === 'Web Dev' ? '#bfdbfe' : item.title === 'UI/UX' ? '#e9d5ff' : '#dcfce7'})`,
              backgroundColor: item.title === 'Web Dev' ? '#ebf4ff' : item.title === 'UI/UX' ? '#f5f3ff' : '#f0fdf4'
            }}
            initial={{ rotateY: 0 }}
            animate={{ 
              rotateY: isHovered ? 180 : 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
          >
            <div className="card-icon relative mb-6">
              {item.icon}
              <motion.div
                className="absolute inset-0 bg-white opacity-30 rounded-full"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isHovered ? 1 : 0,
                  transition: { 
                    duration: 0.4,
                    ease: "backOut"
                  }
                }}
              />
            </div>
            <motion.h3 
              className="text-xl font-bold text-gray-800 mb-3"
              animate={{
                y: isHovered ? -10 : 0,
                transition: { duration: 0.3 }
              }}
            >
              {item.title}
            </motion.h3>
            <div className="absolute bottom-6 left-0 right-0">
              <motion.div 
                className={`w-16 h-1 ${item.title === 'Web Dev' ? 'bg-blue-500' : item.title === 'UI/UX' ? 'bg-purple-500' : 'bg-green-500'} mx-auto mb-3 rounded-full`}
                animate={{
                  width: isHovered ? '80px' : '64px',
                  transition: { duration: 0.4 }
                }}
              />
              <motion.p 
                className="text-sm text-gray-600 px-4"
                animate={{
                  opacity: isHovered ? 0.8 : 1,
                  y: isHovered ? 5 : 0,
                  transition: { duration: 0.3 }
                }}
              >
                {item.description}
              </motion.p>
            </div>
          </motion.div>

          {/* Back of Card */}
          <motion.div
            className={`card-face absolute w-full h-full backface-hidden rounded-2xl flex flex-col items-center justify-center p-8 bg-gradient-to-br ${item.bgColor}`}
            style={{
              rotateY: 180,
              color: 'white'
            }}
            initial={{ rotateY: 180 }}
            animate={{ 
              rotateY: isHovered ? 360 : 180,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }}
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
                transition: { delay: isHovered ? 0.2 : 0 }
              }}
            >
              {item.backTitle}
            </motion.h3>
            <motion.p 
              className="text-blue-100 dark:text-blue-200 text-sm mb-5 text-center px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
                transition: { delay: isHovered ? 0.3 : 0 }
              }}
            >
              {item.backDescription}
            </motion.p>
           <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ 
    scale: isHovered ? 1 : 0.8,
    opacity: isHovered ? 1 : 0,
    transition: { 
      delay: isHovered ? 0.4 : 0,
      type: "spring",
      stiffness: 500
    }
  }}
>
  <Link 
    to={item.link}
    className={`card-btn bg-white ${item.btnColor} px-6 py-2 rounded-full font-medium flex items-center shadow-md hover:shadow-lg`}
  >
    View {item.category === 'Website' ? 'Projects' : item.category === 'Design' ? 'Designs' : 'Mini Projects'}
    <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</motion.div>
          </motion.div>
        </motion.div>

        {/* Card Shadow */}
        <motion.div
          className="absolute w-[90%] h-6 bg-black/10 bottom-[-15px] left-[5%] rounded-[50%] filter blur-[10px] z-[-1]"
          initial={{ opacity: 0.1, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 0.25 : 0.1,
            scale: isHovered ? 1.1 : 0.9,
            y: isHovered ? 10 : 0
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      </motion.div>
    );
  };

  return (
    <section 
      id="portfolio" 
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-20"
          animate={{
            x: [0, -10, 5, 0],
            y: [0, -15, 10, 0],
            rotate: [0, 2, -1, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}/>
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-10"
          animate={{
            x: [0, 15, -5, 0],
            y: [0, 10, -10, 0],
            rotate: [0, -1, 1, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-100 dark:bg-green-900/20 rounded-full filter blur-3xl opacity-15"
          animate={{
            x: [0, 5, -10, 0],
            y: [0, -10, 15, 0],
            rotate: [0, 1, -1, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
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
            className="text-sm font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase"
          >
            Featured Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2"
          >
            My Creative Portfolio
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 h-1 bg-purple-600 mx-auto mt-4 rounded-full"
          />
        </motion.div>

        {/* 3D Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="portfolio-grid flex flex-wrap justify-center gap-10"
        >
          {portfolioCategories.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-base font-medium rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-900/30 transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10">Explore Full Portfolio</span>
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            <span className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;