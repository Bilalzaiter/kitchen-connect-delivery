
import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChefHat, Bike, ShoppingBag } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "Browse home-cooked meals from local chefs in your neighborhood based on your location.",
      color: "bg-blue-500",
    },
    {
      icon: ShoppingBag,
      title: "Order",
      description: "Choose your favorite dishes and place an order directly through our platform.",
      color: "bg-green-500",
    },
    {
      icon: ChefHat,
      title: "Cook",
      description: "Home chefs prepare your meal with fresh ingredients and personal touch.",
      color: "bg-purple-500",
    },
    {
      icon: Bike,
      title: "Deliver",
      description: "Local delivery partners bring the meal straight to your door, hot and fresh.",
      color: "bg-brand-orange",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold mb-4">How KitchenConnect Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform connects home chefs, customers, and delivery partners in a 
              seamless ecosystem that brings homemade food to your doorstep.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative"
              variants={itemVariants}
            >
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                <div className={`${step.color} w-14 h-14 rounded-full flex items-center justify-center text-white mb-6 mx-auto`}>
                  <step.icon size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </div>
              
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-full w-full h-[2px] bg-border z-0">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-orange"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 p-8 bg-brand-beige rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Want to join our community?</h3>
              <p className="text-muted-foreground mb-6">
                Whether you're a passionate home chef looking to share your culinary creations, 
                or someone interested in flexible delivery opportunities, KitchenConnect offers 
                a platform to connect and grow.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/chef-signup" className="btn-primary inline-block">Become a Chef</a>
                <a href="/driver-signup" className="btn-outline inline-block">Join as Delivery Partner</a>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Kitchen Connect Community" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                        <img 
                          src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} 
                          alt="Community member" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-medium">
                    Join 1,200+ members
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
