
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Truck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-brand-orange/10 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div 
            className="max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Earn Money <span className="text-brand-orange">Delivering</span> Homemade Goodness
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join our delivery team and help connect talented home chefs with hungry customers in your neighborhood. Flexible hours, competitive pay, and a supportive community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
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
                onClick={() => {
                  const element = document.getElementById("earnings");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Earning Potential
              </Button>
            </div>
            <div className="flex items-center gap-8 mt-10">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-brand-orange">$18-25</span>
                <span className="text-sm text-gray-500">Avg. Hourly</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-brand-orange">Flexible</span>
                <span className="text-sm text-gray-500">Work Hours</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-brand-orange">Weekly</span>
                <span className="text-sm text-gray-500">Payments</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="relative w-full max-w-md"
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
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3">
              <Truck className="h-8 w-8 text-brand-orange" />
              <div>
                <div className="text-xs text-gray-500">Delivery Time</div>
                <div className="font-semibold">15-30 mins</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
