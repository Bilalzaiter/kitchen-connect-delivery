
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { 
  Check, 
  Clock, 
  AlarmClock, 
  ChefHat, 
  PackageCheck, 
  Bike, 
  MapPin, 
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type OrderStatus = 
  | 'placed' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'picked_up' 
  | 'in_delivery' 
  | 'delivered';

export interface OrderTrackingProps {
  orderId: string;
  status: OrderStatus;
  estimatedDeliveryTime?: string;
  customerName: string;
  chefName: string;
  driverName?: string;
  orderPlacedTime: string;
  currentLocation?: string;
  className?: string;
  allowUpdates?: boolean;
  onStatusUpdate?: (status: OrderStatus) => void;
}

const statusSteps = [
  { status: 'placed', label: 'Order Placed', icon: Clock, roleUpdates: ['admin'] },
  { status: 'confirmed', label: 'Order Confirmed', icon: Check, roleUpdates: ['admin', 'chef'] },
  { status: 'preparing', label: 'Preparing', icon: ChefHat, roleUpdates: ['admin', 'chef'] },
  { status: 'ready', label: 'Ready for Pickup', icon: PackageCheck, roleUpdates: ['admin', 'chef'] },
  { status: 'picked_up', label: 'Picked Up', icon: Bike, roleUpdates: ['admin', 'delivery'] },
  { status: 'in_delivery', label: 'In Delivery', icon: MapPin, roleUpdates: ['admin', 'delivery'] },
  { status: 'delivered', label: 'Delivered', icon: User, roleUpdates: ['admin', 'delivery'] },
];

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  orderId,
  status,
  estimatedDeliveryTime,
  customerName,
  chefName,
  driverName,
  orderPlacedTime,
  currentLocation,
  className,
  allowUpdates = false,
  onStatusUpdate
}) => {
  const { toast } = useToast();
  const [activeStatus, setActiveStatus] = useState<OrderStatus>(status);
  
  // Find the current step index
  const currentStepIndex = statusSteps.findIndex(step => step.status === activeStatus);
  
  const handleStatusUpdate = (newStatus: OrderStatus) => {
    setActiveStatus(newStatus);
    
    if (onStatusUpdate) {
      onStatusUpdate(newStatus);
    }
    
    // Show toast notification
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId.slice(-6)} is now ${statusSteps.find(step => step.status === newStatus)?.label}`,
    });
  };

  return (
    <div className={cn("bg-white rounded-xl border border-border shadow-sm p-6", className)}>
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">Order #{orderId.slice(-6)}</h3>
          <p className="text-sm text-muted-foreground">Placed at {orderPlacedTime}</p>
        </div>
        
        <div className="flex items-center bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full">
          <AlarmClock size={16} className="mr-1" />
          <span className="text-sm font-medium">
            {estimatedDeliveryTime ? estimatedDeliveryTime : "Calculating..."}
          </span>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
            <div 
              className="h-full bg-brand-orange transition-all duration-500" 
              style={{ 
                width: `${Math.min(100, (currentStepIndex / (statusSteps.length - 1)) * 100)}%`
              }}
            />
          </div>
          
          {/* Steps */}
          <div className="flex justify-between relative">
            {statusSteps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const isCurrentStep = index === currentStepIndex;
              const StepIcon = step.icon;
              
              return (
                <div 
                  key={step.status} 
                  className="flex flex-col items-center z-10"
                  onClick={() => {
                    if (allowUpdates && index === currentStepIndex + 1) {
                      handleStatusUpdate(step.status as OrderStatus);
                    }
                  }}
                >
                  <motion.div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      isActive 
                        ? "border-brand-orange bg-brand-orange text-white" 
                        : "border-gray-200 bg-white text-gray-400",
                      allowUpdates && index === currentStepIndex + 1 
                        ? "cursor-pointer hover:bg-brand-orange/10" 
                        : ""
                    )}
                    initial={false}
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <StepIcon size={18} />
                  </motion.div>
                  
                  <div className="mt-2 text-center">
                    <p className={cn(
                      "text-xs font-medium",
                      isActive ? "text-brand-orange" : "text-gray-400"
                    )}>
                      {step.label}
                    </p>
                    {isCurrentStep && (
                      <span className="text-[10px] text-muted-foreground">Current</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Order Details</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p className="text-sm font-medium">{customerName}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Chef</p>
            <p className="text-sm font-medium">{chefName}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Delivery Driver</p>
            <p className="text-sm font-medium">{driverName || "Not assigned yet"}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500">Current Location</p>
            <p className="text-sm font-medium">{currentLocation || "Waiting for update"}</p>
          </div>
        </div>
      </div>
      
      {allowUpdates && currentStepIndex < statusSteps.length - 1 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Click the next step icon to update order status
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
