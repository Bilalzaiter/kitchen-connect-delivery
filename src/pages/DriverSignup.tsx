
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import Navbar from '../components/layout/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Truck, 
  DollarSign, 
  Clock, 
  MapPin, 
  Zap, 
  Shield, 
  PiggyBank,
  Phone,
  Calendar,
  Compass
} from 'lucide-react';

const DriverSignup = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    vehicleType: '',
    experience: '',
    availability: [],
    termsAgreed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, termsAgreed: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAgreed) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Form data submitted:', formData);
    
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
  };

  const benefits = [
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

  const earnings = [
    { title: "Base Delivery Fee", amount: "$3.50 - $7.50", description: "Per delivery, based on distance" },
    { title: "Typical Tips", amount: "$2 - $5", description: "Average per delivery" },
    { title: "Peak Hour Bonus", amount: "+$2", description: "During lunch and dinner rushes" },
    { title: "Weekly Bonus", amount: "Up to $100", description: "Based on 20+ deliveries per week" },
    { title: "Monthly Top Driver", amount: "$250", description: "For highest rated drivers" },
  ];

  const howItWorks = [
    { 
      icon: <Phone className="h-10 w-10 text-brand-orange" />, 
      title: "Apply Online", 
      description: "Fill out the form with your information and vehicle details." 
    },
    { 
      icon: <Calendar className="h-10 w-10 text-brand-orange" />, 
      title: "Quick Approval", 
      description: "Get verified and start delivering in as little as 24 hours." 
    },
    { 
      icon: <Compass className="h-10 w-10 text-brand-orange" />, 
      title: "Start Delivering", 
      description: "Accept orders through the app and deliver delicious meals to customers." 
    },
    { 
      icon: <DollarSign className="h-10 w-10 text-brand-orange" />, 
      title: "Get Paid", 
      description: "Receive weekly payments for all your deliveries plus tips." 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-orange/10 to-white">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <motion.div 
                className="max-w-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Earn Money <span className="text-brand-orange">Delivering</span> Homemade Goodness
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Join our delivery team and help connect talented home chefs with hungry customers in your neighborhood. Flexible hours, competitive pay, and a supportive community.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                    onClick={() => {
                      const element = document.getElementById("apply-form");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => {
                      const element = document.getElementById("earnings");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Earning Potential
                  </Button>
                </div>
                <div className="flex items-center gap-8 mt-10">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-brand-orange">$18-25</span>
                    <span className="text-sm text-gray-500">Avg. Hourly</span>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-brand-orange">Flexible</span>
                    <span className="text-sm text-gray-500">Work Hours</span>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-brand-orange">Weekly</span>
                    <span className="text-sm text-gray-500">Payments</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-brand-orange/20 rounded-full blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Food delivery person" 
                  className="w-full h-auto rounded-2xl relative z-10 shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20 flex items-center gap-3">
                  <Truck className="h-8 w-8 text-brand-orange" />
                  <div>
                    <div className="text-xs text-gray-500">Delivery Time</div>
                    <div className="font-semibold">15-30 mins</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
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
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Becoming a delivery partner is simple. Follow these steps to get started.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col items-center">
                  {howItWorks.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-6 mb-12 relative"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        {index < howItWorks.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 mt-4"></div>
                        )}
                      </div>
                      <div className="pt-2">
                        <div className="mb-1">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Earnings Section */}
        <section id="earnings" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Earning Potential</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here's how you can earn with us. The more you deliver, the more you make.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="earnings" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="earnings">Earnings Breakdown</TabsTrigger>
                  <TabsTrigger value="example">Example Scenarios</TabsTrigger>
                </TabsList>
                <TabsContent value="earnings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Earnings</CardTitle>
                      <CardDescription>
                        Your earnings are based on delivery fees, tips, and bonuses.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {earnings.map((item, index) => (
                          <motion.div 
                            key={index}
                            className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                            <div className="text-xl font-bold text-brand-orange">
                              {item.amount}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="example">
                  <Card>
                    <CardHeader>
                      <CardTitle>Example Earnings</CardTitle>
                      <CardDescription>
                        Here are some real-world examples of what our delivery partners earn.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-lg font-medium mb-2">Part-Time (10-15 hours/week)</h4>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>15-20 deliveries</span>
                              <span className="font-medium">$150-$250</span>
                            </li>
                            <li className="flex justify-between">
                              <span>+ Tips</span>
                              <span className="font-medium">$30-$75</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Average weekly total</span>
                              <span className="font-bold text-brand-orange">$180-$325</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="text-lg font-medium mb-2">Full-Time (30-40 hours/week)</h4>
                          <ul className="space-y-2">
                            <li className="flex justify-between">
                              <span>40-50 deliveries</span>
                              <span className="font-medium">$350-$450</span>
                            </li>
                            <li className="flex justify-between">
                              <span>+ Tips</span>
                              <span className="font-medium">$80-$200</span>
                            </li>
                            <li className="flex justify-between">
                              <span>+ Weekly bonuses</span>
                              <span className="font-medium">$50-$100</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Average weekly total</span>
                              <span className="font-bold text-brand-orange">$480-$750</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="text-sm text-gray-500">
                      Actual earnings may vary based on delivery volume, distance, tips, and other factors.
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Application Form */}
        <section id="apply-form" className="py-16 bg-brand-orange/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-2">Join Our Delivery Team</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        placeholder="Your full name" 
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Your email address" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        placeholder="Your phone number" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        placeholder="City you want to deliver in" 
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Input 
                        id="vehicleType" 
                        name="vehicleType" 
                        placeholder="Bike, Car, Scooter, etc." 
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Delivery Experience</Label>
                      <Input 
                        id="experience" 
                        name="experience" 
                        placeholder="None, 1 year, 2+ years, etc." 
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <Label htmlFor="message">Tell us about yourself</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Why do you want to join our delivery team?" 
                      className="h-32"
                    />
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="termsAgreed" 
                        checked={formData.termsAgreed}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="termsAgreed" className="text-sm">
                        I agree to the terms and conditions, including background checks and verification.
                      </Label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Application</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DriverSignup;
