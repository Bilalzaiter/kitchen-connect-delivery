
import React, { useState } from 'react';
import { Star, Clock, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import DistanceBadge from './DistanceBadge';
import { Button } from '@/components/ui/button';

interface DishCardProps {
  id: string;
  name: string;
  image: string;
  chef: {
    name: string;
    avatar: string;
  };
  price: number;
  rating: number;
  distance: number;
  prepTime: number; // in minutes
  className?: string;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  image,
  chef,
  price,
  rating,
  distance,
  prepTime,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm transition-all duration-500",
        isHovered ? "shadow-xl" : "shadow-sm",
        className
      )}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Distance Badge */}
        <div className="absolute top-3 left-3">
          <DistanceBadge distance={distance} />
        </div>
        
        {/* Price */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-brand-orange font-medium">
          ${price.toFixed(2)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg leading-tight mb-1">{name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={chef.avatar} 
                alt={chef.name} 
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">{chef.name}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Star size={14} className="text-yellow-500" fill="#F59E0B" />
              <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock size={14} />
              <span className="text-sm ml-1">{prepTime} min</span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            aria-label="Add to cart"
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
