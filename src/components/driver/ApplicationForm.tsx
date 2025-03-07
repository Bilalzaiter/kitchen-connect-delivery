
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ApplicationSuccessDialog from './ApplicationSuccessDialog';
import { CheckCircle, ChevronRight, Info } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  experience: string;
  message: string;
  availability: string[];
  termsAgreed: boolean;
}

interface FormErrors {
  [key: string]: string;
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
    message: '',
    availability: [],
    termsAgreed: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, termsAgreed: checked }));
    
    if (errors.termsAgreed) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.termsAgreed;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.vehicleType.trim()) newErrors.vehicleType = "Vehicle type is required";
    if (!formData.termsAgreed) newErrors.termsAgreed = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Form data submitted:', formData);
      setIsSubmitting(false);
      setShowSuccessDialog(true);
    }, 1500);
  };

  return (
    <section id="apply-form" className="py-16 bg-brand-orange/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Delivery Team</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
            
            {/* Application Progress */}
            <div className="flex justify-center mt-8">
              <div className="w-full max-w-md flex items-center">
                <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 
                  ${currentStep >= 1 ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-400 border-gray-300'}`}>
                  1
                </div>
                <div className={`h-1 flex-1 ${currentStep >= 2 ? 'bg-brand-orange' : 'bg-gray-300'}`}></div>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 
                  ${currentStep >= 2 ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-400 border-gray-300'}`}>
                  2
                </div>
                <div className={`h-1 flex-1 ${currentStep >= 3 ? 'bg-brand-orange' : 'bg-gray-300'}`}></div>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 
                  ${currentStep >= 3 ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-400 border-gray-300'}`}>
                  3
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Label htmlFor="fullName" className="flex items-center gap-1">
                      Full Name 
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      placeholder="Your full name" 
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-1">
                      Email Address
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="Your email address" 
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-1">
                      Phone Number
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      placeholder="Your phone number" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city" className="flex items-center gap-1">
                      City
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="city" 
                      name="city" 
                      placeholder="City you want to deliver in" 
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="vehicleType" className="flex items-center gap-1">
                      Vehicle Type
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="vehicleType" 
                      name="vehicleType" 
                      placeholder="Bike, Car, Scooter, etc." 
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className={errors.vehicleType ? "border-red-500" : ""}
                    />
                    {errors.vehicleType && (
                      <p className="mt-1 text-xs text-red-500">{errors.vehicleType}</p>
                    )}
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
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-8">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-brand-orange mt-0.5" />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-800">Important Information</p>
                      <p>By applying, you confirm that you:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Are at least 18 years old</li>
                        <li>Have valid transport and license (if applicable)</li>
                        <li>Can work legally in your location</li>
                        <li>Have a smartphone with reliable data connection</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="termsAgreed" 
                      checked={formData.termsAgreed}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label 
                      htmlFor="termsAgreed" 
                      className={`text-sm ${errors.termsAgreed ? "text-red-500" : ""}`}
                    >
                      I agree to the terms and conditions, including background checks and verification.
                    </Label>
                  </div>
                  {errors.termsAgreed && (
                    <p className="mt-1 text-xs text-red-500">{errors.termsAgreed}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-orange hover:bg-brand-orange/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Application
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Dialog */}
      <ApplicationSuccessDialog 
        isOpen={showSuccessDialog} 
        onClose={() => setShowSuccessDialog(false)} 
      />
    </section>
  );
};

export default ApplicationForm;
