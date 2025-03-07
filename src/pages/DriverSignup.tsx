
import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/driver/HeroSection';
import BenefitsSection from '../components/driver/BenefitsSection';
import HowItWorksSection from '../components/driver/HowItWorksSection';
import EarningsSection from '../components/driver/EarningsSection';
import ApplicationForm from '../components/driver/ApplicationForm';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const DriverSignup = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const checkScroll = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Benefits Section */}
        <div className="py-12 md:py-16">
          <BenefitsSection />
        </div>
        
        {/* How It Works Section */}
        <div className="py-12">
          <HowItWorksSection />
        </div>
        
        {/* Earnings Section */}
        <div className="py-12 md:py-16">
          <EarningsSection />
        </div>
        
        {/* Application Form */}
        <div className="py-12 md:py-16">
          <ApplicationForm />
        </div>
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-brand-orange text-white shadow-lg hover:bg-brand-orange/90 z-50"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default DriverSignup;
