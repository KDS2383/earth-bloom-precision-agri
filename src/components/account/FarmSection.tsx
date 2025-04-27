
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Farm } from "lucide-react";

const FarmSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Farm className="h-5 w-5" />
          Farm Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="farm-name">Farm Name</Label>
          <Input id="farm-name" placeholder="Enter your farm name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="farm-size">Farm Size (acres)</Label>
          <Input 
            id="farm-size" 
            type="number" 
            placeholder="Enter farm size" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="crop-types">Main Crops</Label>
          <Textarea 
            id="crop-types" 
            placeholder="Enter the types of crops you grow"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="soil-type">Soil Type</Label>
          <Input id="soil-type" placeholder="Enter your soil type" />
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmSection;
