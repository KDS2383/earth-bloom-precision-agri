
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocationSection = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const { toast } = useToast();

  const handleSaveLocation = () => {
    // This would typically save to a database, but for now we'll just show a success toast
    toast({
      title: "Location updated",
      description: "Your location information has been saved."
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
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              placeholder="Enter your city" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input 
              id="state" 
              placeholder="Enter your state" 
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal-code">Postal Code</Label>
          <Input 
            id="postal-code" 
            placeholder="Enter your postal code" 
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <Button onClick={handleSaveLocation} className="w-full mt-2">Save Location</Button>
      </CardContent>
    </Card>
  );
};

export default LocationSection;
