
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, MapPin, Zap, Shield, PiggyBank } from 'lucide-react';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: BenefitProps[] = [
  { 
    icon: <Clock className="h-12 w-12 text-brand-orange p-2 bg-brand-orange/10 rounded-xl" />, 
    title: "Flexible Hours", 
    description: "Choose when you want to work. Set your own schedule and work as much or as little as you want." 
  },
  { 
    icon: <DollarSign className="h-12 w-12 text-brand-orange p-2 bg-brand-orange/10 rounded-xl" />, 
    title: "Competitive Pay", 
    description: "Earn a base delivery fee plus tips. Special promotions during peak hours can increase your earnings." 
  },
  { 
    icon: <MapPin className="h-12 w-12 text-brand-orange p-2 bg-brand-orange/10 rounded-xl" />, 
    title: "Work Locally", 
    description: "Deliver within your neighborhood or expand your range. You decide how far you want to go." 
  },
  { 
    icon: <Zap className="h-12 w-12 text-brand-orange p-2 bg-brand-orange/10 rounded-xl" />, 
    title: "Quick Payments", 
    description: "Get paid weekly with direct deposit. Track your earnings in real-time through the app." 
  },
  { 
    icon: <Shield className="h-12 w-12 text-brand-orange p-2 bg-brand-orange/10 rounded-xl" />, 
    title: "Insurance Coverage", 
    description: "We provide insurance coverage for all active deliveries. Your safety is our priority." 
  },
  { 
    icon: <PiggyBank className="h-12 w-12 text-brand-orange p-2 bg-brand-orange/10 rounded-xl" />, 
    title: "Delivery Bonuses", 
    description: "Earn extra with our incentive programs based on delivery frequency and customer ratings." 
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Deliver With Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our growing team of delivery partners and enjoy these benefits while helping connect local chefs with hungry customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
