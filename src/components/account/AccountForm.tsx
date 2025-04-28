
import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection';
import LocationSection from './LocationSection';
import FarmSection from './FarmSection';
import PreferencesSection from './PreferencesSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getUserProfile, saveUserProfile, UserProfile } from '@/services/firebase/userService';

const AccountForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await getUserProfile();
        if (profile) {
          setUserData(profile);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load user data.",
          variant: "destructive"
        });
      }
    };

    fetchUserData();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveUserProfile(userData || {});
      toast({
        title: "Success",
        description: "Your account settings have been updated.",
      });
    } catch (error) {
      console.error('Error saving user data:', error);
      toast({
        title: "Error",
        description: "Failed to save your settings.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateUserData = (sectionData: Partial<UserProfile>) => {
    setUserData(prev => ({
      ...prev,
      ...sectionData
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
      <ProfileSection 
        userData={userData}
        onUpdate={updateUserData}
      />
      <LocationSection 
        userData={userData}
        onUpdate={updateUserData}
      />
      <FarmSection 
        userData={userData}
        onUpdate={updateUserData}
      />
      <PreferencesSection 
        userData={userData}
        onUpdate={updateUserData}
      />
      
      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
