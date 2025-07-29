// src/components/sections/SecondaryFooter.tsx
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaGithub, FaRegClock, FaRegMap } from 'react-icons/fa';
import { SiUpwork, SiFiverr } from 'react-icons/si';
import { Link } from 'react-router-dom';

const SecondaryFooter = () => {
  const socialLinks = [
    {
      icon: <FaLinkedinIn className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      color: "hover:text-[#0A66C2]"
    },
    {
      icon: <SiUpwork className="h-5 w-5" />,
      label: "Upwork",
      url: "https://upwork.com/freelancers/~yourprofile",
      color: "hover:text-[#14A800]"
    },
    {
      icon: <SiFiverr className="h-5 w-5" />,
      label: "Fiverr",
      url: "https://fiverr.com/yourprofile",
      color: "hover:text-[#1DBF73]"
    },
    {
      icon: <FaGithub className="h-5 w-5" />,
      label: "GitHub",
      url: "https://github.com/yourprofile",
      color: "hover:text-gray-900 dark:hover:text-white"
    },
  ];

  const usefulLinks = [
    { name: "Latest Projects", path: "/projects", desc: "See my recent work" },
    { name: "Tech Stack", path: "/hire-me#skills", desc: "Technologies I use" },
    { name: "Client Testimonials", path: "/hire-me#testimonials", desc: "What clients say" },
  ];

  const workInfo = [
    {
      icon: <FaRegClock className="h-4 w-4" />,
      title: "Working Hours",
      text: "Mon-Fri: 9AM - 6PM (GMT)"
    },
    {
      icon: <FaRegMap className="h-4 w-4" />,
      title: "Service Areas",
      text: "Available for remote work worldwide"
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Branding Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">US</span>
              </div>
              <span className="font-bold text-xl text-white">Usman Ahmad</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating digital solutions that drive business growth and user engagement.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${link.color} transition-colors duration-300`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                  <span className="sr-only">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className="group text-gray-400 hover:text-white transition-colors duration-300 block"
                  >
                    <span className="font-medium group-hover:text-purple-400">{link.name}</span>
                    <p className="text-sm text-gray-500">{link.desc}</p>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Work Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Work Info</h3>
            <div className="space-y-4">
              {workInfo.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-start space-x-3"
                >
                  <div className="text-purple-400 mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-200">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Usman Ahmad. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link 
              to="/legal/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link 
              to="/legal/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Terms
            </Link>
            <Link 
              to="/legal/cookies"
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SecondaryFooter;