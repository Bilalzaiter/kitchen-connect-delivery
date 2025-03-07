
import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/driver/HeroSection';
import BenefitsSection from '../components/driver/BenefitsSection';
import HowItWorksSection from '../components/driver/HowItWorksSection';
import EarningsSection from '../components/driver/EarningsSection';
import ApplicationForm from '../components/driver/ApplicationForm';

const DriverSignup = () => {
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
    </div>
  );
};

export default DriverSignup;
