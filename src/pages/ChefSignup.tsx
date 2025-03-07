import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Check, Clock, DollarSign, Percent } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from '../components/layout/Navbar';

const ChefSignup = () => {
  const [planType, setPlanType] = useState<'subscription' | 'percentage'>('percentage');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! We'll contact you shortly to complete your chef registration.");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-orange/10 mb-6">
              <ChefHat size={32} className="text-brand-orange" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Chef Partner</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Turn your passion for cooking into a business. Share your culinary creations with hungry customers in your area.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Benefits & Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Why Join KitchenConnect?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Turn Your Kitchen Into a Business</h3>
                    <p className="text-gray-600">Cook from the comfort of your own kitchen and generate additional income.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Flexible Schedule</h3>
                    <p className="text-gray-600">You decide when you want to cook and how many dishes you want to offer.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Marketing & Delivery Handled</h3>
                    <p className="text-gray-600">We take care of marketing your dishes and connecting you with delivery partners.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={14} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Build Your Brand</h3>
                    <p className="text-gray-600">Create a following of loyal customers who love your unique dishes.</p>
                  </div>
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-12 mb-6">Requirements</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-brand-beige flex items-center justify-center">
                    <Clock size={14} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium">Food Safety Certificate</h3>
                    <p className="text-gray-600">All chefs must have proper food handling certification for their region.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-brand-beige flex items-center justify-center">
                    <Clock size={14} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium">Kitchen Inspection</h3>
                    <p className="text-gray-600">A brief inspection to ensure your kitchen meets basic health and safety standards.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-brand-beige flex items-center justify-center">
                    <Clock size={14} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-medium">Quality Commitment</h3>
                    <p className="text-gray-600">Dedication to maintaining high-quality standards and meeting delivery times.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Registration Form & Plan Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-6">Sign Up as a Chef</h2>
              
              {/* Plan Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Choose Your Earning Model</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${planType === 'subscription' ? 'border-brand-orange bg-brand-beige' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setPlanType('subscription')}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${planType === 'subscription' ? 'border-brand-orange' : 'border-gray-300'}`}>
                        {planType === 'subscription' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>}
                      </div>
                      <div className="font-medium">Monthly Subscription</div>
                    </div>
                    <div className="text-brand-orange-dark font-bold text-xl mt-2 mb-1 flex items-center">
                      <DollarSign size={18} />
                      <span>49.99/month</span>
                    </div>
                    <p className="text-sm text-gray-600">Fixed monthly fee with unlimited sales. Best for high-volume chefs.</p>
                  </div>
                  
                  <div 
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${planType === 'percentage' ? 'border-brand-orange bg-brand-beige' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setPlanType('percentage')}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${planType === 'percentage' ? 'border-brand-orange' : 'border-gray-300'}`}>
                        {planType === 'percentage' && <div className="w-2.5 h-2.5 rounded-full bg-brand-orange"></div>}
                      </div>
                      <div className="font-medium">Commission Based</div>
                    </div>
                    <div className="text-brand-orange-dark font-bold text-xl mt-2 mb-1 flex items-center">
                      <Percent size={18} />
                      <span>15% per sale</span>
                    </div>
                    <p className="text-sm text-gray-600">Pay only when you sell. Great for beginners and part-time chefs.</p>
                  </div>
                </div>
              </div>
              
              {/* Registration Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="chef@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Kitchen Address</Label>
                    <Input id="address" placeholder="123 Main St" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialties">Cuisine Specialties</Label>
                    <Input id="specialties" placeholder="Italian, Mexican, Vegan, etc." required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Cooking Experience</Label>
                    <Input id="experience" type="number" min="0" placeholder="5" required />
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full" size="lg" type="submit">
                      Submit Application
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      By submitting, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
          
          {/* FAQs Section */}
          <motion.div 
            className="mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-medium text-lg mb-2">How do I get paid?</h3>
                <p className="text-gray-600">We process payments weekly directly to your bank account. You'll receive detailed reports of all your sales.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-medium text-lg mb-2">Do I need professional equipment?</h3>
                <p className="text-gray-600">Basic kitchen equipment is sufficient. We'll provide guidance on what's needed based on your menu items.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-medium text-lg mb-2">How many dishes should I offer?</h3>
                <p className="text-gray-600">We recommend starting with 3-5 signature dishes that you can prepare consistently well.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-medium text-lg mb-2">Can I switch between payment plans?</h3>
                <p className="text-gray-600">Yes, you can switch between subscription and percentage models monthly based on your sales volume.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChefSignup;
