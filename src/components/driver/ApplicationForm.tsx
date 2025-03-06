
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  experience: string;
  availability: string[];
  termsAgreed: boolean;
}

const ApplicationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
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

  return (
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
  );
};

export default ApplicationForm;
