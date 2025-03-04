
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChefHat, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DistanceBadge from '../ui/DistanceBadge';

interface ChefCardProps {
  chef: {
    id: string;
    name: string;
    image: string;
    specialty: string;
    rating: number;
    distance: number;
    dishCount: number;
    featured: boolean;
  };
  index: number;
}

const ChefCard: React.FC<ChefCardProps> = ({ chef, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={chef.image} 
          alt={chef.name} 
          className="w-full h-48 object-cover object-center"
        />
        {chef.featured && (
          <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured Chef
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-xl">{chef.name}</h3>
          <DistanceBadge distance={chef.distance} />
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <ChefHat size={16} className="mr-1.5" />
          <span className="text-sm">{chef.specialty}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Star size={16} fill="#FFC107" className="text-yellow-500 mr-1" />
            <span className="font-medium">{chef.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-muted-foreground">{chef.dishCount} dishes available</span>
        </div>
        
        <Button variant="outline" className="w-full">View Menu</Button>
      </div>
    </motion.div>
  );
};

const FeaturedChefs = () => {
  // Sample chef data
  const chefs = [
    {
      id: "1",
      name: "Maria Rossi",
      image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specialty: "Italian Home Cooking",
      rating: 4.9,
      distance: 1.2,
      dishCount: 15,
      featured: true
    },
    {
      id: "2",
      name: "Ahmed Khan",
      image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specialty: "Middle Eastern Fusion",
      rating: 4.7,
      distance: 2.5,
      dishCount: 12,
      featured: false
    },
    {
      id: "3",
      name: "Sophia Chen",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specialty: "Asian Street Food",
      rating: 4.8,
      distance: 3.1,
      dishCount: 18,
      featured: true
    },
    {
      id: "4",
      name: "Carlos Mendez",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      specialty: "Latin American Flavors",
      rating: 4.6,
      distance: 1.8,
      dishCount: 14,
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-brand-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium">
              Meet Our Home Chefs
            </span>
            <h2 className="text-4xl font-bold mb-4">Talented Chefs Near You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover passionate home chefs in your neighborhood who are ready to share 
              their culinary creations and bring authentic flavors to your doorstep.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefs.map((chef, index) => (
            <ChefCard key={chef.id} chef={chef} index={index} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="btn-outline">View All Chefs</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedChefs;
