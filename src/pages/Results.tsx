
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

// Mock data for demonstration
const mockResultData = {
  location: "Midwest Region, USA",
  soilData: {
    ph: 6.8,
    texture: "Loamy",
    nutrients: {
      nitrogen: 35,
      phosphorus: 42,
      potassium: 28,
      organic: 3.5
    }
  },
  weatherData: {
    temperature: {
      avg: 22,
      min: 10,
      max: 32
    },
    rainfall: 850,
    humidity: 65,
    windSpeed: 12
  },
  recommendations: [
    {
      id: 1,
      name: "Soybean",
      image: "https://images.unsplash.com/photo-1601459427108-47e20d579a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      suitability: 95,
      details: {
        crop_name: "Soybean",
        crop_info: "A legume species native to East Asia, widely grown for its edible bean, which has numerous uses.",
        growing_info: {
          growing_season: "Late spring to late summer",
          water_needs: "Medium (requires consistent moisture, especially during flowering and pod development)",
          soil_preference: "Loamy, well-drained with pH 6.0-7.5",
          harvest_time: "90-120 days after planting"
        },
        expected_yield: {
          in_tons_per_acre: 3.2
        }
      }
    },
    {
      id: 2,
      name: "Corn",
      image: "https://images.unsplash.com/photo-1543674892-7d64d45b2140?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      suitability: 88,
      details: {
        crop_name: "Corn",
        crop_info: "A cereal grain first domesticated by indigenous peoples in southern Mexico, now one of the most widely grown crops globally.",
        growing_info: {
          growing_season: "Late spring to mid-autumn",
          water_needs: "High (requires consistent moisture, especially during silking and ear development)",
          soil_preference: "Well-drained loam with pH 5.8-7.0",
          harvest_time: "60-100 days after planting depending on variety"
        },
        expected_yield: {
          in_tons_per_acre: 4.5
        }
      }
    },
    {
      id: 3,
      name: "Winter Wheat",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1c1bc9661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      suitability: 82,
      details: {
        crop_name: "Winter Wheat",
        crop_info: "A type of wheat planted in autumn to germinate and develop into young plants that remain in vegetative phase during winter.",
        growing_info: {
          growing_season: "Planted in fall, harvested in early summer",
          water_needs: "Moderate (tolerates drier conditions better than other wheat varieties)",
          soil_preference: "Well-drained loam with pH 5.5-7.5",
          harvest_time: "July to August (approximately 8 months after planting)"
        },
        expected_yield: {
          in_tons_per_acre: 3.8
        }
      }
    }
  ]
};

const Results = () => {
  const [activeTab, setActiveTab] = useState("crops");

  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading PDF report...");
  };

  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
              Your Farming Recommendations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your specific soil conditions, location, and farming history,
              here are our AI-powered recommendations for optimal crop selection
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Button 
              className="bg-farm-accent text-farm-dark hover:bg-farm-accent/80 font-medium"
              onClick={handleDownloadReport}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Report
            </Button>
          </div>
          
          <Tabs defaultValue="crops" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="crops">Recommended Crops</TabsTrigger>
              <TabsTrigger value="soil">Soil Data</TabsTrigger>
              <TabsTrigger value="weather">Weather Data</TabsTrigger>
            </TabsList>
            
            {/* Crops Tab */}
            <TabsContent value="crops" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockResultData.recommendations.map((crop) => (
                  <Card key={crop.id} className="farm-card overflow-hidden">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={crop.image} 
                        alt={crop.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-farm-accent text-farm-dark font-medium text-sm px-3 py-1 rounded-full">
                        {crop.suitability}% Match
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{crop.name}</CardTitle>
                      <CardDescription>Recommended crop for your conditions</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{crop.details.crop_name}</DialogTitle>
                            <DialogDescription>
                              {crop.details.crop_info}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <h4 className="font-semibold">Growing Information</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                <p className="font-medium text-farm-primary mb-1">Growing Season</p>
                                <p>{crop.details.growing_info.growing_season}</p>
                              </div>
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                <p className="font-medium text-farm-primary mb-1">Water Needs</p>
                                <p>{crop.details.growing_info.water_needs}</p>
                              </div>
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                <p className="font-medium text-farm-primary mb-1">Soil Preference</p>
                                <p>{crop.details.growing_info.soil_preference}</p>
                              </div>
                              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                <p className="font-medium text-farm-primary mb-1">Harvest Time</p>
                                <p>{crop.details.growing_info.harvest_time}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold">Expected Yield</h4>
                              <div className="bg-farm-light p-4 rounded-md mt-2">
                                <p className="text-2xl font-bold text-farm-primary">
                                  {crop.details.expected_yield.in_tons_per_acre} <span className="text-base font-normal">tons/acre</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button className="bg-farm-primary hover:bg-farm-dark">Save to Favorites</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Soil Data Tab */}
            <TabsContent value="soil" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Soil Analysis for {mockResultData.location}</CardTitle>
                  <CardDescription>
                    Understanding your soil composition helps optimize planting decisions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">General Properties</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">pH Level</p>
                            <p className="text-2xl font-semibold">{mockResultData.soilData.ph}</p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Texture</p>
                            <p className="text-2xl font-semibold">{mockResultData.soilData.texture}</p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">Organic Content</p>
                            <p className="text-2xl font-semibold">{mockResultData.soilData.nutrients.organic}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Soil Recommendations</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span>Your soil pH is ideal for most crops with minimal adjustment needed</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span>Consider increasing organic matter to improve soil structure</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span>Nitrogen levels are sufficient but could be supplemented for nitrogen-hungry crops</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Nutrient Analysis</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Nitrogen (N)</span>
                            <span className="text-sm font-medium">{mockResultData.soilData.nutrients.nitrogen} ppm</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-farm-primary h-2.5 rounded-full" 
                              style={{ width: `${(mockResultData.soilData.nutrients.nitrogen / 100) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Phosphorus (P)</span>
                            <span className="text-sm font-medium">{mockResultData.soilData.nutrients.phosphorus} ppm</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-farm-secondary h-2.5 rounded-full" 
                              style={{ width: `${(mockResultData.soilData.nutrients.phosphorus / 100) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Potassium (K)</span>
                            <span className="text-sm font-medium">{mockResultData.soilData.nutrients.potassium} ppm</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-farm-accent h-2.5 rounded-full" 
                              style={{ width: `${(mockResultData.soilData.nutrients.potassium / 100) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Nutrient Chart</h3>
                        <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
                          <p className="text-gray-500">
                            Pie chart visualization of soil nutrients
                            <br />
                            (Chart component would be integrated here)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Weather Data Tab */}
            <TabsContent value="weather" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Weather Conditions for {mockResultData.location}</CardTitle>
                  <CardDescription>
                    Climate analysis and forecast for optimal crop planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Current Season Overview</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                          <p className="text-sm text-gray-500">Average Temperature</p>
                          <p className="text-2xl font-semibold">{mockResultData.weatherData.temperature.avg}°C</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Range: {mockResultData.weatherData.temperature.min}° - {mockResultData.weatherData.temperature.max}°C
                          </p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                          <p className="text-sm text-gray-500">Annual Rainfall</p>
                          <p className="text-2xl font-semibold">{mockResultData.weatherData.rainfall} mm</p>
                          <p className="text-xs text-gray-500 mt-1">Moderately wet climate</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                          <p className="text-sm text-gray-500">Average Humidity</p>
                          <p className="text-2xl font-semibold">{mockResultData.weatherData.humidity}%</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                          <p className="text-sm text-gray-500">Wind Speed</p>
                          <p className="text-2xl font-semibold">{mockResultData.weatherData.windSpeed} km/h</p>
                          <p className="text-xs text-gray-500 mt-1">Moderate winds</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Climate Considerations</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span>Temperature range supports growth of recommended crops</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            <span>Consider irrigation planning for dry periods in mid-summer</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                              <line x1="12" y1="9" x2="12" y2="13"></line>
                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <span>Risk of early frost in fall - monitor forecasts carefully</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Seasonal Forecast</h3>
                      <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
                        <p className="text-gray-500">
                          Temperature and rainfall forecast chart
                          <br />
                          (Chart component would be integrated here)
                        </p>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Weather Impact on Recommended Crops</h3>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-md">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">Soybean</p>
                              <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Highly Suitable
                              </span>
                            </div>
                            <p className="text-sm mt-1">Current climate provides ideal conditions for soybean cultivation.</p>
                          </div>
                          
                          <div className="p-3 border rounded-md">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">Corn</p>
                              <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Well Suited
                              </span>
                            </div>
                            <p className="text-sm mt-1">Good temperature range, may need irrigation during dry periods.</p>
                          </div>
                          
                          <div className="p-3 border rounded-md">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">Winter Wheat</p>
                              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                Moderately Suited
                              </span>
                            </div>
                            <p className="text-sm mt-1">Watch for early frost risk, but overall viable with proper timing.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Results;
