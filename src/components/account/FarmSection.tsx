
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tractor } from "lucide-react";
import { UserProfile } from '@/services/firebase/userService';

interface FarmSectionProps {
  userData: UserProfile | null;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const FarmSection = ({ userData, onUpdate }: FarmSectionProps) => {
  const [farmName, setFarmName] = useState(userData?.farm?.farmName || '');
  const [farmSize, setFarmSize] = useState(userData?.farm?.farmSize || '');
  const [mainCrops, setMainCrops] = useState(userData?.farm?.mainCrops || '');
  const [soilType, setSoilType] = useState(userData?.farm?.soilType || '');

  // Update local state when userData changes
  useEffect(() => {
    if (userData?.farm) {
      setFarmName(userData.farm.farmName || '');
      setFarmSize(userData.farm.farmSize || '');
      setMainCrops(userData.farm.mainCrops || '');
      setSoilType(userData.farm.soilType || '');
    }
  }, [userData]);

  const handleFarmNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFarmName = e.target.value;
    setFarmName(newFarmName);
    updateFarm('farmName', newFarmName);
  };

  const handleFarmSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFarmSize = e.target.value;
    setFarmSize(newFarmSize);
    updateFarm('farmSize', newFarmSize);
  };

  const handleMainCropsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMainCrops = e.target.value;
    setMainCrops(newMainCrops);
    updateFarm('mainCrops', newMainCrops);
  };

  const handleSoilTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSoilType = e.target.value;
    setSoilType(newSoilType);
    updateFarm('soilType', newSoilType);
  };

  const updateFarm = (field: string, value: string) => {
    onUpdate({
      farm: {
        ...(userData?.farm || { farmName: '', farmSize: '', mainCrops: '', soilType: '' }),
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tractor className="h-5 w-5" />
          Farm Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="farm-name">Farm Name</Label>
          <Input 
            id="farm-name" 
            placeholder="Enter your farm name" 
            value={farmName}
            onChange={handleFarmNameChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="farm-size">Farm Size (acres)</Label>
          <Input 
            id="farm-size" 
            type="number" 
            placeholder="Enter farm size" 
            value={farmSize}
            onChange={handleFarmSizeChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="crop-types">Main Crops</Label>
          <Textarea 
            id="crop-types" 
            placeholder="Enter the types of crops you grow"
            value={mainCrops}
            onChange={handleMainCropsChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="soil-type">Soil Type</Label>
          <Input 
            id="soil-type" 
            placeholder="Enter your soil type" 
            value={soilType}
            onChange={handleSoilTypeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmSection;
