
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Compass, DollarSign } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const howItWorks: StepProps[] = [
  { 
    icon: <Phone className="h-10 w-10 text-brand-orange" />, 
    title: "Apply Online", 
    description: "Fill out the form with your information and vehicle details." 
  },
  { 
    icon: <Calendar className="h-10 w-10 text-brand-orange" />, 
    title: "Quick Approval", 
    description: "Get verified and start delivering in as little as 24 hours." 
  },
  { 
    icon: <Compass className="h-10 w-10 text-brand-orange" />, 
    title: "Start Delivering", 
    description: "Accept orders through the app and deliver delicious meals to customers." 
  },
  { 
    icon: <DollarSign className="h-10 w-10 text-brand-orange" />, 
    title: "Get Paid", 
    description: "Receive weekly payments for all your deliveries plus tips." 
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Becoming a delivery partner is simple. Follow these steps to get started.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center">
              {howItWorks.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-6 mb-12 relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    {index < howItWorks.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-4"></div>
                    )}
                  </div>
                  <div className="pt-2">
                    <div className="mb-1">{step.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
