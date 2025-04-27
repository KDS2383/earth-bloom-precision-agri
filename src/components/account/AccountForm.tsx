
import React, { useState } from 'react';
import ProfileSection from './ProfileSection';
import LocationSection from './LocationSection';
import FarmSection from './FarmSection';
import PreferencesSection from './PreferencesSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AccountForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success",
        description: "Your account settings have been updated.",
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
      <ProfileSection />
      <LocationSection />
      <FarmSection />
      <PreferencesSection />
      
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
