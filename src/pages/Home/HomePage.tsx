// src/pages/Home.tsx
import { useState } from 'react';
import Header from '../../components/sections/home/Header';
import Hero from '../../components/sections/home/Hero';
import About from '../../components/sections/home/About';
import Skills from '../../components/sections/home/Skills';
import Services from '../../components/sections/home/Services';
import Portfolio from '../../components/sections/home/Portfolio';
import Contact from '../../components/sections/home/Contact';
import Footer from '../../components/sections/home/Footer';
import BackToTop from '../../components/common/BackToTop';
import ResumeModal from '../../components/ui/modals/ResumeModal';
import LoadingLine from '../../components/common/LoadingLine'
import { Toaster } from "react-hot-toast";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="font-sans">
      <Toaster position="top-right" />
      <Header />
      <LoadingLine />
      <main className='bg-gray-100 dark:bg-gray-900'>
        <Hero onViewResume={() => setIsModalOpen(true)} />
        <About onViewResume={() => setIsModalOpen(true)} />
        <Skills />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ResumeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;