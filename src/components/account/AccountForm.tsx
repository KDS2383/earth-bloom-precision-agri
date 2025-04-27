
import React from 'react';
import ProfileSection from './ProfileSection';
import LocationSection from './LocationSection';
import FarmSection from './FarmSection';
import PreferencesSection from './PreferencesSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AccountForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
    toast({
      title: "Success",
      description: "Your account settings have been updated.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
      <ProfileSection />
      <LocationSection />
      <FarmSection />
      <PreferencesSection />
      
      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
