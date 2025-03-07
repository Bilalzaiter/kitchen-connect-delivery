
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2 } from 'lucide-react';

interface ApplicationSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationSuccessDialog = ({ isOpen, onClose }: ApplicationSuccessDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">Application Submitted!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Thank you for applying to join our delivery team. We've received your application and will review it shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-gray-50 p-4 rounded-md my-4">
          <h4 className="font-medium text-gray-800 mb-2">What happens next?</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs mt-0.5">1</div>
              <span>We'll review your application (typically within 24-48 hours)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs mt-0.5">2</div>
              <span>You'll receive an email with next steps</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs mt-0.5">3</div>
              <span>Complete a brief orientation and start delivering!</span>
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Button 
            className="w-full bg-brand-orange hover:bg-brand-orange/90"
            onClick={onClose}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationSuccessDialog;
