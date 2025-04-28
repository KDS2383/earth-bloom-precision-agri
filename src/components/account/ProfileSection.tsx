
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Image } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from '@/services/firebase/userService';

interface ProfileSectionProps {
  userData: UserProfile | null;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const ProfileSection = ({ userData, onUpdate }: ProfileSectionProps) => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(userData?.displayName || user?.displayName || '');
  const [profileUrl, setProfileUrl] = useState(userData?.photoURL || user?.photoURL || '');
  const [contactNumber, setContactNumber] = useState(userData?.contactNumber || '');
  
  // Update local state when userData changes
  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || user?.displayName || '');
      setProfileUrl(userData.photoURL || user?.photoURL || '');
      setContactNumber(userData.contactNumber || '');
    }
  }, [userData, user]);

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDisplayName = e.target.value;
    setDisplayName(newDisplayName);
    onUpdate({ displayName: newDisplayName });
  };

  const handleContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContactNumber = e.target.value;
    setContactNumber(newContactNumber);
    onUpdate({ contactNumber: newContactNumber });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileUrl = reader.result as string;
        setProfileUrl(newProfileUrl);
        onUpdate({ photoURL: newProfileUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileUrl} />
            <AvatarFallback>
              {displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Label htmlFor="profile-image">Profile Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="display-name">Display Name</Label>
          <Input
            id="display-name"
            value={displayName}
            onChange={handleDisplayNameChange}
            placeholder="Enter your display name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-number">Contact Number</Label>
          <Input
            id="contact-number"
            value={contactNumber}
            onChange={handleContactNumberChange}
            placeholder="Enter your contact number"
            type="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={user?.email || ''}
            disabled
            className="bg-muted"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
