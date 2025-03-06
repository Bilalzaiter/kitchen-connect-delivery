
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
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Benefits Section */}
        <BenefitsSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Earnings Section */}
        <EarningsSection />
        
        {/* Application Form */}
        <ApplicationForm />
      </main>
    </div>
  );
};

export default DriverSignup;
