
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { OrderStatus } from './OrderTracking';
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  ChefHat, 
  PackageCheck, 
  AlertCircle,
  Check,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChefOrderProps {
  id: string;
  customerName: string;
  orderItems: {
    name: string;
    quantity: number;
    specialInstructions?: string;
  }[];
  orderTotal: number;
  status: OrderStatus;
  orderTime: string;
  estimatedReadyTime?: string;
  className?: string;
}

const ChefOrderManagement: React.FC<ChefOrderProps> = ({
  id,
  customerName,
  orderItems,
  orderTotal,
  status,
  orderTime,
  estimatedReadyTime,
  className
}) => {
  const { toast } = useToast();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(status);
  const [preparationTime, setPreparationTime] = useState(estimatedReadyTime || "20-30 mins");
  
  const handleUpdateStatus = (newStatus: OrderStatus) => {
    setOrderStatus(newStatus);
    
    // Notify all relevant parties via toast (in a real app, this would be a backend call)
    toast({
      title: "Order Status Updated",
      description: `Order #${id.slice(-6)} is now ${newStatus === 'confirmed' ? 'confirmed' : 
                                                  newStatus === 'preparing' ? 'being prepared' : 
                                                  'ready for pickup'}`,
    });
  };
  
  const getStatusButton = () => {
    switch(orderStatus) {
      case 'placed':
        return (
          <Button 
            className="w-full gap-2" 
            onClick={() => handleUpdateStatus('confirmed')}
          >
            <Check size={16} />
            Confirm Order
          </Button>
        );
      case 'confirmed':
        return (
          <Button 
            className="w-full gap-2" 
            onClick={() => handleUpdateStatus('preparing')}
          >
            <ChefHat size={16} />
            Start Preparing
          </Button>
        );
      case 'preparing':
        return (
          <Button 
            className="w-full gap-2" 
            onClick={() => handleUpdateStatus('ready')}
          >
            <PackageCheck size={16} />
            Mark as Ready
          </Button>
        );
      case 'ready':
        return (
          <Button 
            variant="outline" 
            className="w-full gap-2 bg-green-50 text-green-600 border-green-200"
            disabled
          >
            <Check size={16} />
            Ready for Pickup
          </Button>
        );
      default:
        return null;
    }
  };
  
  const getStatusIndicator = () => {
    switch(orderStatus) {
      case 'placed':
        return (
          <div className="flex items-center gap-1 text-amber-500">
            <AlertCircle size={14} />
            <span className="text-xs font-medium">New Order</span>
          </div>
        );
      case 'confirmed':
        return (
          <div className="flex items-center gap-1 text-blue-500">
            <Check size={14} />
            <span className="text-xs font-medium">Confirmed</span>
          </div>
        );
      case 'preparing':
        return (
          <div className="flex items-center gap-1 text-purple-500">
            <ChefHat size={14} />
            <span className="text-xs font-medium">Preparing</span>
          </div>
        );
      case 'ready':
        return (
          <div className="flex items-center gap-1 text-green-500">
            <PackageCheck size={14} />
            <span className="text-xs font-medium">Ready</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={cn(
        "bg-white rounded-xl border border-border shadow-sm overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Order #{id.slice(-6)}</h3>
          <p className="text-sm text-muted-foreground">{orderTime}</p>
        </div>
        {getStatusIndicator()}
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Customer: {customerName}</h4>
            <div className="flex items-center gap-1 text-brand-orange text-sm">
              <Timer size={14} />
              <span>{preparationTime}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          {orderItems.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.quantity}x</span>
                  <span>{item.name}</span>
                </div>
                {item.specialInstructions && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Note: {item.specialInstructions}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between pt-3 border-t border-border">
          <span className="font-medium">Order Total:</span>
          <span className="font-bold">${orderTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50">
        {getStatusButton()}
      </div>
    </motion.div>
  );
};

export default ChefOrderManagement;
