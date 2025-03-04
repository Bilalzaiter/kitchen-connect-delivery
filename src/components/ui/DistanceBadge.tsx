
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DistanceBadgeProps {
  distance: number; // Distance in kilometers
  className?: string;
}

const DistanceBadge: React.FC<DistanceBadgeProps> = ({ distance, className }) => {
  // Function to determine color based on distance
  const getColorClass = () => {
    if (distance <= 2) return 'bg-green-500';
    if (distance <= 5) return 'bg-brand-orange';
    return 'bg-gray-500';
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-medium",
        getColorClass(),
        className
      )}
    >
      <MapPin size={12} className="shrink-0" />
      <span>{distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`}</span>
    </div>
  );
};

export default DistanceBadge;
