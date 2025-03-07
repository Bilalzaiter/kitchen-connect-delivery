
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Truck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-brand-orange/10 to-white">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          <motion.div 
            className="w-full max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Earn Money <span className="text-brand-orange">Delivering</span> Homemade Goodness
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 md:mb-8">
              Join our delivery team and help connect talented home chefs with hungry customers in your neighborhood. Flexible hours, competitive pay, and a supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-sm sm:text-base"
                onClick={() => {
                  const element = document.getElementById("apply-form");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apply Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-sm sm:text-base mt-2 sm:mt-0"
                onClick={() => {
                  const element = document.getElementById("earnings");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Earning Potential
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 md:mt-10">
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-orange">$18-25</span>
                <span className="text-xs sm:text-sm text-gray-500 mt-1 text-center">Avg. Hourly</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-orange">Flexible</span>
                <span className="text-xs sm:text-sm text-gray-500 mt-1 text-center">Work Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-orange">Weekly</span>
                <span className="text-xs sm:text-sm text-gray-500 mt-1 text-center">Payments</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative w-full max-w-md mt-8 md:mt-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Food delivery person" 
              className="w-full h-auto rounded-2xl relative z-10 shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-3 sm:p-4 rounded-xl shadow-lg z-20 flex items-center gap-2 sm:gap-3">
              <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-brand-orange" />
              <div>
                <div className="text-xs text-gray-500">Delivery Time</div>
                <div className="text-sm sm:text-base font-semibold">15-30 mins</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
