
import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/50 to-background -z-10"></div>
      
      {/* Decorative circles */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-orange-light/10 -z-5"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-brand-orange/5 -z-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      ></motion.div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 mb-4 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium">
              Home-cooked meals, delivered with love
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
            <span className="block">Connect with local chefs</span>
            <span className="text-gradient">right in your neighborhood</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover authentic home-cooking, support local culinary talent, and enjoy meals 
            from passionate home chefs in your community.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <div className="flex items-center w-full">
              <div className="relative flex-grow">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="text" 
                  placeholder="Enter your location..." 
                  className="pl-12 pr-4 py-6 rounded-l-full border-r-0 text-base focus-visible:ring-brand-orange focus-visible:ring-2"
                />
              </div>
              <Button className="rounded-r-full h-[50px] px-6 bg-brand-orange hover:bg-brand-orange-light">
                <Search size={18} className="mr-2" /> Find Food
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {[
              { 
                title: "Home-cooked meals", 
                description: "Authentic dishes made with love by home chefs" 
              },
              { 
                title: "Local delivery", 
                description: "Meals delivered by neighbors, for neighbors" 
              },
              { 
                title: "Support community", 
                description: "Help local culinary talent grow their passion" 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                className="glass-panel p-6"
              >
                <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-sm mb-2">Scroll to explore</p>
        <ArrowRight className="rotate-90" size={16} />
      </motion.div>
    </div>
  );
};

export default Hero;
