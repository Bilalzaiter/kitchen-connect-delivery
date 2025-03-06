
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/layout/Navbar';
import OrderTracking, { OrderStatus } from '../components/ui/OrderTracking';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bike, 
  ChefHat, 
  MapPin, 
  Clock, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  Filter,
  LocateFixed,
  LogOut,
  Bell
} from 'lucide-react';

// Sample orders data
const sampleOrders = [
  {
    id: "ORD78945612",
    status: "ready" as OrderStatus,
    estimatedDeliveryTime: "25-35 mins",
    customerName: "John Smith",
    chefName: "Maria Rossi",
    orderPlacedTime: "10:15 AM",
    distance: 2.3,
    deliveryFee: 4.50,
    items: 2,
    address: "123 Pine Street, Apt 4B",
    orderTotal: 27.50,
    isPriority: true
  },
  {
    id: "ORD45671234",
    status: "ready" as OrderStatus,
    estimatedDeliveryTime: "15-25 mins",
    customerName: "Emily Johnson",
    chefName: "Ahmed Khan",
    orderPlacedTime: "10:22 AM",
    distance: 1.7,
    deliveryFee: 3.50,
    items: 1,
    address: "45 Oak Avenue",
    orderTotal: 18.75,
    isPriority: false
  },
  {
    id: "ORD12398765",
    status: "picked_up" as OrderStatus,
    estimatedDeliveryTime: "10-15 mins",
    customerName: "Michael Williams",
    chefName: "Sophia Chen",
    driverName: "Current Driver",
    orderPlacedTime: "10:05 AM",
    currentLocation: "On Main Street",
    distance: 0.8,
    deliveryFee: 3.00,
    items: 3,
    address: "789 Maple Road",
    orderTotal: 42.15,
    isPriority: false
  },
  {
    id: "ORD56784321",
    status: "in_delivery" as OrderStatus,
    estimatedDeliveryTime: "5-10 mins",
    customerName: "Sarah Davis",
    chefName: "Carlos Mendez",
    driverName: "Current Driver",
    orderPlacedTime: "9:55 AM",
    currentLocation: "Approaching destination",
    distance: 0.3,
    deliveryFee: 3.50,
    items: 2,
    address: "567 Elm Street",
    orderTotal: 29.80,
    isPriority: true
  }
];

// Sample completed deliveries
const completedDeliveries = [
  {
    id: "ORD34567890",
    customerName: "Robert Brown",
    chefName: "Olivia Green",
    orderPlacedTime: "9:20 AM",
    deliveredTime: "9:45 AM",
    distance: 1.5,
    deliveryFee: 3.50,
    tip: 2.50,
    totalEarned: 6.00
  },
  {
    id: "ORD23456789",
    customerName: "Jennifer Wilson",
    chefName: "Daniel Lee",
    orderPlacedTime: "8:45 AM",
    deliveredTime: "9:15 AM",
    distance: 2.2,
    deliveryFee: 4.00,
    tip: 3.00,
    totalEarned: 7.00
  }
];

const DeliveryDashboard = () => {
  const { toast } = useToast();
  const [assignedOrders, setAssignedOrders] = useState<typeof sampleOrders>([sampleOrders[2], sampleOrders[3]]);
  const [availableOrders, setAvailableOrders] = useState<typeof sampleOrders>([sampleOrders[0], sampleOrders[1]]);
  const [earnings, setEarnings] = useState({
    today: 24.50,
    week: 157.75,
    totalDeliveries: completedDeliveries.length
  });
  
  const acceptOrder = (orderId: string) => {
    const orderIndex = availableOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      const order = availableOrders[orderIndex];
      
      // Update order status and add driver name
      const updatedOrder = {
        ...order,
        status: "picked_up" as OrderStatus,
        driverName: "Current Driver",
        currentLocation: "Just picked up"
      };
      
      // Remove from available and add to assigned
      const newAvailable = [...availableOrders];
      newAvailable.splice(orderIndex, 1);
      
      setAvailableOrders(newAvailable);
      setAssignedOrders([...assignedOrders, updatedOrder]);
      
      toast({
        title: "Order Accepted",
        description: `You've accepted order #${orderId.slice(-6)}`,
      });
    }
  };
  
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const orderIndex = assignedOrders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
      const updatedOrders = [...assignedOrders];
      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        status
      };
      
      if (status === "delivered") {
        // Move to completed deliveries and update earnings
        const completedOrder = updatedOrders[orderIndex];
        const tip = Math.round(completedOrder.orderTotal * 0.1 * 2) / 2; // Simulate a tip
        
        setEarnings({
          today: Number((earnings.today + completedOrder.deliveryFee + tip).toFixed(2)),
          week: Number((earnings.week + completedOrder.deliveryFee + tip).toFixed(2)),
          totalDeliveries: earnings.totalDeliveries + 1
        });
        
        // Add to completed deliveries
        const newCompletedDelivery = {
          id: completedOrder.id,
          customerName: completedOrder.customerName,
          chefName: completedOrder.chefName,
          orderPlacedTime: completedOrder.orderPlacedTime,
          deliveredTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          distance: completedOrder.distance,
          deliveryFee: completedOrder.deliveryFee,
          tip,
          totalEarned: Number((completedOrder.deliveryFee + tip).toFixed(2))
        };
        
        // Remove from assigned orders
        updatedOrders.splice(orderIndex, 1);
        
        toast({
          title: "Delivery Completed!",
          description: `You earned $${(completedOrder.deliveryFee + tip).toFixed(2)} for this delivery.`,
        });
      }
      
      setAssignedOrders(updatedOrders);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Delivery Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, <span className="font-medium">Alex</span>
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <LocateFixed size={16} />
                  Update Location
                </Button>
                
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell size={16} />
                  Notifications
                </Button>
                
                <Button variant="outline" size="sm" className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut size={16} />
                  Go Offline
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-green-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Today's Earnings</p>
                  <p className="text-2xl font-bold">${earnings.today.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Week</p>
                  <p className="text-2xl font-bold">${earnings.week.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bike className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Deliveries</p>
                  <p className="text-2xl font-bold">{earnings.totalDeliveries}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Orders and Deliveries */}
          <Tabs defaultValue="assigned" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="assigned" className="text-base">
                My Orders 
                {assignedOrders.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {assignedOrders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="available" className="text-base">
                Available Orders
                {availableOrders.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {availableOrders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-base">
                Completed
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="assigned">
              {assignedOrders.length > 0 ? (
                <div className="space-y-6">
                  {assignedOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-sm border border-border overflow-hidden"
                    >
                      <div className="p-4 border-b border-border">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">Order #{order.id.slice(-6)}</h3>
                          <Badge variant={order.isPriority ? "destructive" : "outline"}>
                            {order.isPriority ? "Priority" : "Regular"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <OrderTracking 
                          orderId={order.id}
                          status={order.status}
                          estimatedDeliveryTime={order.estimatedDeliveryTime}
                          customerName={order.customerName}
                          chefName={order.chefName}
                          driverName="You"
                          orderPlacedTime={order.orderPlacedTime}
                          currentLocation={order.currentLocation}
                          allowUpdates={true}
                          onStatusUpdate={(status) => updateOrderStatus(order.id, status)}
                        />
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                          <div>
                            <p className="text-xs text-gray-500">Distance</p>
                            <div className="flex items-center mt-1">
                              <MapPin size={14} className="text-brand-orange mr-1" />
                              <p className="text-sm font-medium">{order.distance} km</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Delivery Fee</p>
                            <div className="flex items-center mt-1">
                              <DollarSign size={14} className="text-green-600 mr-1" />
                              <p className="text-sm font-medium">${order.deliveryFee.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Items</p>
                            <div className="flex items-center mt-1">
                              <ChefHat size={14} className="text-gray-500 mr-1" />
                              <p className="text-sm font-medium">{order.items} items</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Delivery Address</p>
                            <p className="text-sm font-medium truncate">{order.address}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-500">
                            Expected delivery: <span className="font-medium">{order.estimatedDeliveryTime}</span>
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Get Directions
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            Report Issue
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Bike className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Active Orders</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any active orders right now. Check the available orders tab to pick up deliveries.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => document.querySelector('button[value="available"]')?.click()}
                  >
                    View Available Orders
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available">
              {availableOrders.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Orders Available for Pickup</h2>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter size={16} />
                      Filter
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {availableOrders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-border overflow-hidden"
                      >
                        <div className="p-4 border-b border-border">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Order #{order.id.slice(-6)}</h3>
                            {order.isPriority && (
                              <Badge variant="destructive">Priority</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                              <p className="text-xs text-gray-500">Pickup From</p>
                              <div className="flex items-center mt-1">
                                <ChefHat size={14} className="text-brand-orange mr-1" />
                                <p className="text-sm font-medium">{order.chefName}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500">Distance</p>
                              <div className="flex items-center mt-1">
                                <MapPin size={14} className="text-brand-orange mr-1" />
                                <p className="text-sm font-medium">{order.distance} km</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500">Delivery Fee</p>
                              <div className="flex items-center mt-1">
                                <DollarSign size={14} className="text-green-600 mr-1" />
                                <p className="text-sm font-medium">${order.deliveryFee.toFixed(2)}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-xs text-gray-500">Estimated Time</p>
                              <div className="flex items-center mt-1">
                                <Clock size={14} className="text-gray-500 mr-1" />
                                <p className="text-sm font-medium">{order.estimatedDeliveryTime}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-xs text-gray-500">Delivery Address</p>
                            <p className="text-sm font-medium truncate">{order.address}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <Clock size={16} className="text-gray-500 mr-2" />
                            <span className="text-sm text-gray-500">
                              Order placed: <span className="font-medium">{order.orderPlacedTime}</span>
                            </span>
                          </div>
                          
                          <Button 
                            onClick={() => acceptOrder(order.id)}
                            className="bg-brand-orange hover:bg-brand-orange/90"
                          >
                            Accept Order
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Available Orders</h3>
                  <p className="text-muted-foreground mb-4">
                    There are no available orders in your area right now. Check back soon!
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedDeliveries.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h2 className="font-semibold">Completed Deliveries</h2>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {completedDeliveries.map((delivery) => (
                      <div key={delivery.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">Order #{delivery.id.slice(-6)}</h3>
                            <p className="text-sm text-muted-foreground">
                              {delivery.customerName} • {delivery.chefName}
                            </p>
                          </div>
                          <div className="flex items-center text-sm text-green-600">
                            <CheckCircle size={14} className="mr-1" />
                            Completed
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500">Delivery Time</p>
                            <p className="text-sm font-medium">{delivery.deliveredTime}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Distance</p>
                            <p className="text-sm font-medium">{delivery.distance} km</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Delivery Fee</p>
                            <p className="text-sm font-medium">${delivery.deliveryFee.toFixed(2)}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500">Tip</p>
                            <p className="text-sm font-medium">${delivery.tip.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-2 border-t border-border flex justify-between items-center">
                          <p className="text-xs text-gray-500">
                            Delivered on {new Date().toLocaleDateString()}
                          </p>
                          <p className="font-medium text-green-600">
                            Total: ${delivery.totalEarned.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-border p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No Completed Deliveries</h3>
                  <p className="text-muted-foreground">
                    You haven't completed any deliveries yet. Accept an order to get started!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DeliveryDashboard;
