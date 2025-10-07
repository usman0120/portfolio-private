import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaFonticonsFi } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import { AnchorLink } from "../../common/AnchorLink";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../src/firebase"; // adjust if needed
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      await addDoc(collection(db, "newsletter"), {
        email,
        timestamp: new Date(),
      });
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error adding email:", error);
      toast.error("Failed to subscribe. Try again later.");
    }
  };

  const socialLinks = [
    {
      icon: <FaLinkedinIn className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      color: "hover:text-[#0A66C2]",
    },
    {
      icon: <SiUpwork className="h-5 w-5" />,
      label: "Upwork",
      url: "https://upwork.com/freelancers/~yourprofile",
      color: "hover:text-[#14A800]",
    },
    {
      icon: <FaFonticonsFi className="h-5 w-5" />,
      label: "Fiverr",
      url: "https://fiverr.com/yourprofile",
      color: "hover:text-[#1DBF73]",
    },
    {
      icon: <FaGithub className="h-5 w-5" />,
      label: "GitHub",
      url: "https://github.com/yourprofile",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
  ];

  const quickLinks = [
    { name: "Home", url: "#home" },
    { name: "About", url: "#about" },
    { name: "Services", url: "#services" },
    { name: "Portfolio", url: "#portfolio" },
    { name: "Contact", url: "#contact" },
  ];

  const servicesLinks = [
    { name: "Web Development", url: "#" },
    { name: "UI/UX Design", url: "#" },
    { name: "Responsive Design", url: "#" },
    { name: "E-Commerce", url: "#" },
    { name: "SEO Optimization", url: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-12 relative overflow-hidden">
      {/* Floating elements */}
      <motion.div
        className="absolute bottom-20 left-1/4 w-48 h-48 bg-blue-500 rounded-full opacity-5 -z-10"
        animate={{
          scale: [1, 1.1, 1],
          x: [-20, 20, -20],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-5 -z-10"
        animate={{
          scale: [1, 1.1, 1],
          x: [20, -20, 20],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* About */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">UA</span>
              </div>
              <span className="font-bold text-xl text-white">Usman Ahmad</span>
            </div>
            <p className="text-gray-400 mb-4">
              Creating exceptional digital experiences through innovative design and clean, efficient code.
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
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnchorLink to={link.url} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </AnchorLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnchorLink to={link.url} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </AnchorLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new projects.</p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-l-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-r-xl text-white hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                <span className="sr-only">Subscribe</span>
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Usman Ahmad. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/legal/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/legal/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="/legal/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
