
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FarmSection = () => {
  const [farmName, setFarmName] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [mainCrops, setMainCrops] = useState('');
  const [soilType, setSoilType] = useState('');
  const { toast } = useToast();

  const handleSaveLocal = () => {
    // This would typically save to a database, but for now we'll just show a success toast
    toast({
      title: "Farm details updated",
      description: "Your farm information has been saved."
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
            onChange={(e) => setFarmName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="farm-size">Farm Size (acres)</Label>
          <Input 
            id="farm-size" 
            type="number" 
            placeholder="Enter farm size" 
            value={farmSize}
            onChange={(e) => setFarmSize(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="crop-types">Main Crops</Label>
          <Textarea 
            id="crop-types" 
            placeholder="Enter the types of crops you grow"
            value={mainCrops}
            onChange={(e) => setMainCrops(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="soil-type">Soil Type</Label>
          <Input 
            id="soil-type" 
            placeholder="Enter your soil type" 
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          />
        </div>
        <Button onClick={handleSaveLocal} className="w-full mt-2">Save Farm Information</Button>
      </CardContent>
    </Card>
  );
};

export default FarmSection;
