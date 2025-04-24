
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data to simulate crop options
const CROP_OPTIONS = [
  "Corn", "Wheat", "Rice", "Soybean", "Barley",
  "Oats", "Cotton", "Sugarcane", "Potatoes", "Tomatoes",
  "Lettuce", "Carrots", "Onions", "Apples", "Oranges",
  "Grapes", "Strawberries", "Almonds", "Walnuts", "Pecans"
];

const SOIL_TYPES = [
  { value: "clay", label: "Clay" },
  { value: "loam", label: "Loam" },
  { value: "sandy", label: "Sandy" },
  { value: "silt", label: "Silt" },
  { value: "peaty", label: "Peaty" },
  { value: "chalky", label: "Chalky" }
];

const AREA_UNITS = [
  { value: "acres", label: "Acres" },
  { value: "hectares", label: "Hectares" },
  { value: "sqm", label: "Square Meters" }
];

const Recommendation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: { lat: 0, lng: 0 },
    farmArea: "",
    areaUnit: "acres",
    soilType: "",
    pastCrops: []
  });
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [availableCrops, setAvailableCrops] = useState<string[]>(CROP_OPTIONS);
  
  const handleCropSelection = (crop: string) => {
    if (selectedCrops.length >= 3) {
      toast({
        title: "Maximum crops selected",
        description: "You can only select up to 3 past crops",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedCrops([...selectedCrops, crop]);
    setAvailableCrops(availableCrops.filter(c => c !== crop));
  };
  
  const handleRemoveCrop = (crop: string) => {
    setSelectedCrops(selectedCrops.filter(c => c !== crop));
    setAvailableCrops([...availableCrops, crop].sort());
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCrops.length < 3) {
      toast({
        title: "Incomplete crop selection",
        description: "Please select 3 past crops",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to your API
    console.log("Form submitted:", { ...formData, pastCrops: selectedCrops });
    
    // Navigate to results page
    navigate("/results");
  };

  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
              Get Crop Recommendations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your farm details below and our AI will analyze your specific conditions
              to recommend the most suitable crops for optimal yield
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Farm Information</CardTitle>
                <CardDescription>
                  Provide details about your farm to receive personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name field */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Contact field */}
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        name="contact"
                        placeholder="Your phone number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Location field - Map placeholder */}
                  <div className="space-y-2">
                    <Label>Farm Location</Label>
                    <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                      <p className="text-gray-500">
                        Interactive map will be displayed here
                        <br />
                        <span className="text-sm">(Click on the map to select your farm location)</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Farm Area and Unit */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmArea">Farm Area</Label>
                      <Input
                        id="farmArea"
                        name="farmArea"
                        type="number"
                        placeholder="Area size"
                        value={formData.farmArea}
                        onChange={handleInputChange}
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="areaUnit">Unit</Label>
                      <Select 
                        defaultValue={formData.areaUnit}
                        onValueChange={(value) => handleSelectChange("areaUnit", value)}
                      >
                        <SelectTrigger id="areaUnit">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {AREA_UNITS.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Soil Type */}
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("soilType", value)}
                    >
                      <SelectTrigger id="soilType">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOIL_TYPES.map((soil) => (
                          <SelectItem key={soil.value} value={soil.value}>
                            {soil.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Past Crops Selection */}
                  <div className="space-y-3">
                    <Label>3 Past Crops</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedCrops.map((crop) => (
                        <div
                          key={crop}
                          className="flex items-center bg-farm-secondary/20 text-farm-primary px-3 py-1 rounded-full text-sm"
                        >
                          {crop}
                          <button
                            type="button"
                            className="ml-2 text-farm-primary/70 hover:text-farm-primary"
                            onClick={() => handleRemoveCrop(crop)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6 6 18"/>
                              <path d="m6 6 12 12"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>

                    <Select disabled={selectedCrops.length >= 3} onValueChange={handleCropSelection}>
                      <SelectTrigger id="pastCrops">
                        <SelectValue placeholder={selectedCrops.length >= 3 ? "3 crops selected" : "Select past crops"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCrops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Please select all 3 crops that you've previously grown
                    </p>
                  </div>
                  
                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full bg-farm-primary hover:bg-farm-dark"
                    size="lg"
                  >
                    Generate Recommendations
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Recommendation;
