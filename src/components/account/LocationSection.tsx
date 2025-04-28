
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { UserProfile } from '@/services/firebase/userService';

interface LocationSectionProps {
  userData: UserProfile | null;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const LocationSection = ({ userData, onUpdate }: LocationSectionProps) => {
  const [address, setAddress] = useState(userData?.location?.address || '');
  const [city, setCity] = useState(userData?.location?.city || '');
  const [state, setState] = useState(userData?.location?.state || '');
  const [postalCode, setPostalCode] = useState(userData?.location?.postalCode || '');

  // Update local state when userData changes
  useEffect(() => {
    if (userData?.location) {
      setAddress(userData.location.address || '');
      setCity(userData.location.city || '');
      setState(userData.location.state || '');
      setPostalCode(userData.location.postalCode || '');
    }
  }, [userData]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    updateLocation('address', newAddress);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);
    updateLocation('city', newCity);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = e.target.value;
    setState(newState);
    updateLocation('state', newState);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPostalCode = e.target.value;
    setPostalCode(newPostalCode);
    updateLocation('postalCode', newPostalCode);
  };

  const updateLocation = (field: string, value: string) => {
    onUpdate({
      location: {
        ...(userData?.location || { address: '', city: '', state: '', postalCode: '' }),
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input 
            id="address" 
            placeholder="Enter your street address" 
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              placeholder="Enter your city" 
              value={city}
              onChange={handleCityChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input 
              id="state" 
              placeholder="Enter your state" 
              value={state}
              onChange={handleStateChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal-code">Postal Code</Label>
          <Input 
            id="postal-code" 
            placeholder="Enter your postal code" 
            value={postalCode}
            onChange={handlePostalCodeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSection;
