import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { LocationInput } from "@/components/location/LocationInput";
import { downloadReport } from "@/utils/reportGenerator";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SoilData = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>({lat: 0, lng: 0});
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration - will be updated based on location
  const [soilData, setSoilData] = useState({
    location: "Maharashtra, India",
    soilType: "Loam",
    ph: 6.8,
    texture: {
      sand: 40,
      silt: 40,
      clay: 20
    },
    organicMatter: 3.5,
    nutrients: {
      nitrogen: 35,
      phosphorus: 42,
      potassium: 28,
      calcium: 1150,
      magnesium: 220,
      sulfur: 15
    },
    cec: 12.5
  });
  
  // Try to get location when component mounts
  useEffect(() => {
    // Auto-prompt for location when the page loads
    // handleGetCurrentLocation();
  }, []);

  const handleLocationSelect = (location: string, coords: {lat: number, lng: number}) => {
    setLocation(location);
    setCoordinates(coords);
    setUsingCurrentLocation(false);
    handleSearch();
  };

  const handleCurrentLocation = (coords: {lat: number, lng: number}, location: string) => {
    setCoordinates(coords);
    setLocation(location);
    setUsingCurrentLocation(true);
    handleSearch();
  };

  const handleSearch = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSearched(true);
      setSoilData(prevData => ({
        ...prevData,
        location: location
      }));
      
      toast({
        title: "Soil Data Retrieved",
        description: `Analysis complete for Maharashtra, India`,
      });
    }, 1500);
  };

  const handleDownloadReport = () => {
    downloadReport(soilData);
    toast({
      title: "Report Downloaded",
      description: "Your soil analysis report has been downloaded.",
    });
  };

  const handleViewResults = () => {
    navigate('/results', { state: { soilData } });
  };

  return (
    <Layout>
      <section className="py-12 bg-farm-cream dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark dark:text-farm-cream">
              Soil Data Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your farm location to get detailed soil information that will 
              help you make informed decisions about your crops
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8 dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Find Your Soil Data</CardTitle>
                <CardDescription>
                  Enter a location in India to retrieve soil information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
                  <LocationInput
                    onLocationSelect={handleLocationSelect}
                    onCurrentLocation={handleCurrentLocation}
                    isLoading={isLoading}
                    usingCurrentLocation={usingCurrentLocation}
                  />
                </form>
              </CardContent>
            </Card>
            
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-primary"></div>
              </div>
            )}
            
            {isSearched && !isLoading && (
              <div className="space-y-8">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Soil Analysis Results {usingCurrentLocation && '(Current Location)'}</CardTitle>
                    <CardDescription>
                      Data for {location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">General Characteristics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Soil Type</p>
                            <p className="text-xl font-semibold truncate" title={soilData.soilType}>{soilData.soilType}</p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">pH Level</p>
                            <p className="text-xl font-semibold">{soilData.ph}</p>
                            <p className="text-xs mt-1">
                              {soilData.ph < 6.5 ? "Acidic" : soilData.ph > 7.5 ? "Alkaline" : "Neutral"}
                            </p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Organic Matter</p>
                            <p className="text-xl font-semibold">{soilData.organicMatter}%</p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">CEC</p>
                            <p className="text-xl font-semibold truncate" title={`${soilData.cec} meq/100g`}>{soilData.cec} meq/100g</p>
                            <p className="text-xs mt-1">Cation Exchange Capacity</p>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Texture Composition</h3>
                        <div className="bg-white p-4 rounded-md border">
                          <div className="mb-2 flex justify-between">
                            <span className="text-sm font-medium">Sand</span>
                            <span className="text-sm tabular-nums">{soilData.texture.sand}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div 
                              className="bg-yellow-400 h-2.5 rounded-full" 
                              style={{ width: `${Math.min(soilData.texture.sand, 100)}%` }}
                            ></div>
                          </div>
                          
                          <div className="mb-2 flex justify-between">
                            <span className="text-sm font-medium">Silt</span>
                            <span className="text-sm tabular-nums">{soilData.texture.silt}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div 
                              className="bg-farm-brown h-2.5 rounded-full" 
                              style={{ width: `${Math.min(soilData.texture.silt, 100)}%` }}
                            ></div>
                          </div>
                          
                          <div className="mb-2 flex justify-between">
                            <span className="text-sm font-medium">Clay</span>
                            <span className="text-sm tabular-nums">{soilData.texture.clay}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-farm-primary h-2.5 rounded-full" 
                              style={{ width: `${Math.min(soilData.texture.clay, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Nutrient Analysis</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Nitrogen (N)</span>
                              <span className="text-sm tabular-nums">{soilData.nutrients.nitrogen} ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-farm-primary h-2.5 rounded-full" 
                                style={{ width: `${Math.min(soilData.nutrients.nitrogen, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Phosphorus (P)</span>
                              <span className="text-sm tabular-nums">{soilData.nutrients.phosphorus} ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-farm-secondary h-2.5 rounded-full" 
                                style={{ width: `${Math.min(soilData.nutrients.phosphorus, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Potassium (K)</span>
                              <span className="text-sm tabular-nums">{soilData.nutrients.potassium} ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-farm-accent h-2.5 rounded-full" 
                                style={{ width: `${Math.min(soilData.nutrients.potassium, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Calcium (Ca)</span>
                              <span className="text-sm tabular-nums">{soilData.nutrients.calcium} ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-blue-400 h-2.5 rounded-full" 
                                style={{ width: `${Math.min((soilData.nutrients.calcium / 2000) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Magnesium (Mg)</span>
                              <span className="text-sm tabular-nums">{soilData.nutrients.magnesium} ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-purple-400 h-2.5 rounded-full" 
                                style={{ width: `${Math.min((soilData.nutrients.magnesium / 400) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Sulfur (S)</span>
                              <span className="text-sm tabular-nums">{soilData.nutrients.sulfur} ppm</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-orange-400 h-2.5 rounded-full" 
                                style={{ width: `${Math.min((soilData.nutrients.sulfur / 30) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={handleDownloadReport}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Download Report
                    </Button>
                    <div className="space-x-2">
                      <Button 
                        className="bg-farm-primary hover:bg-farm-dark"
                        onClick={handleViewResults}
                      >
                        View Detailed Results
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Soil Management Recommendations</CardTitle>
                    <CardDescription>
                      Based on your soil analysis, here are our recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-farm-secondary/10 rounded-md">
                        <h4 className="font-semibold text-farm-primary mb-2">Optimal pH Maintenance</h4>
                        <p className="text-gray-700 text-sm">
                          Your soil pH is within optimal range. Maintain this by avoiding excessive use of ammonium-based fertilizers that can acidify soil over time.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-farm-secondary/10 rounded-md">
                        <h4 className="font-semibold text-farm-primary mb-2">Nutrient Management</h4>
                        <p className="text-gray-700 text-sm">
                          Phosphorus levels are adequate. Consider applying nitrogen fertilizer at a rate of 100-150 lbs per acre for nitrogen-demanding crops. Potassium could be supplemented with potash at 50 lbs per acre.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-farm-secondary/10 rounded-md">
                        <h4 className="font-semibold text-farm-primary mb-2">Organic Matter Enhancement</h4>
                        <p className="text-gray-700 text-sm">
                          Current organic matter levels are good but could be improved. Consider cover cropping with legumes or applying composted manure at 10-15 tons per acre to enhance soil structure and water retention.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-farm-secondary/10 rounded-md">
                        <h4 className="font-semibold text-farm-primary mb-2">Crop Rotation Strategy</h4>
                        <p className="text-gray-700 text-sm">
                          Based on your soil texture and nutrient profile, a three-year rotation including a legume (soybeans), cereal (corn), and small grain (wheat) would optimize soil health and nutrient cycling.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SoilData;
