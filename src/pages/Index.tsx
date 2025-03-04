
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FeaturedChefs from '../components/home/FeaturedChefs';
import HowItWorks from '../components/home/HowItWorks';
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        <FeaturedChefs />
        <HowItWorks />
        
        {/* Featured Dishes section */}
        <section className="py-20 bg-brand-beige/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 mb-4 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium">
                  Popular Choices
                </span>
                <h2 className="text-4xl font-bold mb-4">Trending Home-Cooked Dishes</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore the most popular homemade dishes in your area, prepared with love 
                  and delivered fresh to your doorstep.
                </p>
              </motion.div>
            </div>

            {/* We'll add the actual dishes in the discover page */}
            <div className="text-center mt-8">
              <Button className="btn-primary" size="lg">
                Explore All Dishes <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-orange-dark to-brand-orange text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to experience home-cooked goodness?</h2>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  Join KitchenConnect today and discover amazing dishes from talented home chefs in your neighborhood.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="btn-secondary" size="lg">
                    Sign Up Now
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white" size="lg">
                    Learn More
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="text-2xl font-semibold flex items-center space-x-2 text-brand-orange mb-6">
                <span className="block h-8 w-8 rounded-full bg-brand-orange text-white flex items-center justify-center">
                  KC
                </span>
                <span>KitchenConnect</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Connecting passionate home chefs with food lovers in communities everywhere.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-brand-beige flex items-center justify-center text-brand-orange-dark hover:bg-brand-orange hover:text-white transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Press'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground hover:text-brand-orange">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">For Users</h3>
              <ul className="space-y-4">
                {['How it Works', 'Become a Chef', 'Deliver with Us', 'Order Now'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground hover:text-brand-orange">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4">
                {['FAQ', 'Contact Us', 'Terms of Service', 'Privacy Policy'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground hover:text-brand-orange">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} KitchenConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
