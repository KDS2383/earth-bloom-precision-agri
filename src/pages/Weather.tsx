
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const weatherData = {
    location: "Midwest Region, USA",
    current: {
      temperature: 22,
      condition: "Partly Cloudy",
      humidity: 65,
      wind: {
        speed: 12,
        direction: "NW"
      },
      precipitation: 0,
      uv: 5
    },
    forecast: [
      { day: "Today", high: 24, low: 18, condition: "Partly Cloudy", precipitation: 10 },
      { day: "Tomorrow", high: 26, low: 19, condition: "Sunny", precipitation: 0 },
      { day: "Wednesday", high: 25, low: 17, condition: "Partly Cloudy", precipitation: 20 },
      { day: "Thursday", high: 22, low: 16, condition: "Rain Showers", precipitation: 60 },
      { day: "Friday", high: 21, low: 15, condition: "Rain", precipitation: 80 },
      { day: "Saturday", high: 20, low: 14, condition: "Rain Showers", precipitation: 40 },
      { day: "Sunday", high: 23, low: 15, condition: "Partly Cloudy", precipitation: 20 }
    ],
    seasonal: {
      temperature: {
        spring: { avg: 15, min: 5, max: 25 },
        summer: { avg: 28, min: 18, max: 38 },
        fall: { avg: 18, min: 8, max: 28 },
        winter: { avg: 2, min: -8, max: 12 }
      },
      rainfall: {
        spring: 250,
        summer: 350,
        fall: 200,
        winter: 150
      }
    },
    agriculturalMetrics: {
      growingDegreeDays: 1250,
      chillHours: 850,
      frostRiskDays: 5,
      soilTemperature: 18
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location to search",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSearched(true);
      toast({
        title: "Weather Data Retrieved",
        description: `Weather information for ${location} has been loaded`,
      });
    }, 1500);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-yellow-500">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        );
      case "partly cloudy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400">
            <path d="M12 2v2"></path>
            <path d="M12 8v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M6.34 17.66l-1.41 1.41"></path>
            <path d="M22 12h-2"></path>
            <path d="M19.07 4.93l-1.41 1.41"></path>
            <path d="M10.26 5.77A7 7 0 0 0 5.76 10.26"></path>
            <path d="M16 14a5 5 0 1 0-5.59-7.5"></path>
            <path d="M8 16a5 5 0 1 0 7.5-5.6"></path>
          </svg>
        );
      case "rain showers":
      case "rain":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-500">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M8 19v1"></path>
            <path d="M8 14v1"></path>
            <path d="M16 19v1"></path>
            <path d="M16 14v1"></path>
            <path d="M12 21v1"></path>
            <path d="M12 16v1"></path>
          </svg>
        );
      case "cloudy":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          </svg>
        );
    }
  };

  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
              Weather Forecast & Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access real-time weather data and seasonal forecasts to make informed farming decisions
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Check Weather Conditions</CardTitle>
                <CardDescription>
                  Enter a location to get current weather and forecast information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2 md:col-span-3">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter city, region, or farm location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        type="submit" 
                        className="w-full bg-farm-primary hover:bg-farm-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? "Searching..." : "Check Weather"}
                      </Button>
                    </div>
                  </div>
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
                <Tabs defaultValue="current">
                  <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3 mb-6">
                    <TabsTrigger value="current">Current Weather</TabsTrigger>
                    <TabsTrigger value="forecast">Forecast</TabsTrigger>
                    <TabsTrigger value="seasonal">Seasonal Data</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="current" className="animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Weather for {weatherData.location}</CardTitle>
                        <CardDescription>
                          Last updated: {new Date().toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="bg-white rounded-lg p-6 flex items-center">
                            <div className="mr-6">
                              {getWeatherIcon(weatherData.current.condition)}
                            </div>
                            <div>
                              <h3 className="text-4xl font-bold mb-1">{weatherData.current.temperature}°C</h3>
                              <p className="text-gray-600">{weatherData.current.condition}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Humidity</p>
                              <p className="text-2xl font-semibold">{weatherData.current.humidity}%</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Wind</p>
                              <p className="text-2xl font-semibold">
                                {weatherData.current.wind.speed} km/h
                              </p>
                              <p className="text-xs mt-1">Direction: {weatherData.current.wind.direction}</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Precipitation</p>
                              <p className="text-2xl font-semibold">{weatherData.current.precipitation} mm</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">UV Index</p>
                              <p className="text-2xl font-semibold">{weatherData.current.uv}</p>
                              <p className="text-xs mt-1">
                                {weatherData.current.uv < 3 ? "Low" : weatherData.current.uv < 6 ? "Moderate" : "High"}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <h3 className="font-semibold text-lg mb-4">Agricultural Weather Metrics</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-farm-light p-4 rounded-md">
                              <p className="text-sm text-gray-600">Growing Degree Days</p>
                              <p className="text-xl font-semibold text-farm-primary">
                                {weatherData.agriculturalMetrics.growingDegreeDays}
                              </p>
                            </div>
                            <div className="bg-farm-light p-4 rounded-md">
                              <p className="text-sm text-gray-600">Chill Hours</p>
                              <p className="text-xl font-semibold text-farm-primary">
                                {weatherData.agriculturalMetrics.chillHours}
                              </p>
                            </div>
                            <div className="bg-farm-light p-4 rounded-md">
                              <p className="text-sm text-gray-600">Frost Risk Days</p>
                              <p className="text-xl font-semibold text-farm-primary">
                                {weatherData.agriculturalMetrics.frostRiskDays}
                              </p>
                            </div>
                            <div className="bg-farm-light p-4 rounded-md">
                              <p className="text-sm text-gray-600">Soil Temperature</p>
                              <p className="text-xl font-semibold text-farm-primary">
                                {weatherData.agriculturalMetrics.soilTemperature}°C
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="forecast" className="animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>7-Day Forecast for {weatherData.location}</CardTitle>
                        <CardDescription>
                          Plan your farming activities with our weekly forecast
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                          {weatherData.forecast.map((day, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border text-center">
                              <p className="font-medium mb-2">{day.day}</p>
                              <div className="mb-2 flex justify-center">
                                {getWeatherIcon(day.condition)}
                              </div>
                              <p className="text-sm">{day.condition}</p>
                              <div className="flex justify-center items-center gap-2 mt-2">
                                <span className="text-red-500 font-medium">{day.high}°</span>
                                <span className="text-xs text-gray-400">|</span>
                                <span className="text-blue-500 font-medium">{day.low}°</span>
                              </div>
                              <p className="text-xs mt-2">
                                <span className="text-blue-500">{day.precipitation}%</span> precip.
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 bg-white p-6 rounded-lg border">
                          <h3 className="font-semibold text-lg mb-4">Precipitation Forecast</h3>
                          <div className="h-48 bg-gray-100 flex items-center justify-center">
                            <p className="text-gray-500">
                              Precipitation forecast chart
                              <br />
                              (Chart component would be integrated here)
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <h3 className="font-semibold text-lg mb-4">Farming Recommendations</h3>
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2 p-3 bg-farm-secondary/10 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v2"/>
                                <path d="M12 8v2"/>
                                <path d="m4.93 4.93 1.41 1.41"/>
                                <path d="m17.66 17.66 1.41 1.41"/>
                                <path d="M2 12h2"/>
                                <path d="M20 12h2"/>
                                <path d="m6.34 17.66-1.41 1.41"/>
                                <path d="m19.07 4.93-1.41 1.41"/>
                              </svg>
                              <span>Optimal planting conditions for the next 3 days with warm temperatures and no precipitation.</span>
                            </li>
                            <li className="flex items-start gap-2 p-3 bg-farm-secondary/10 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                                <path d="M8 19v1"/>
                                <path d="M8 14v1"/>
                                <path d="M16 19v1"/>
                                <path d="M16 14v1"/>
                                <path d="M12 21v1"/>
                                <path d="M12 16v1"/>
                              </svg>
                              <span>Consider irrigation planning for Thursday onward, as significant rainfall is expected.</span>
                            </li>
                            <li className="flex items-start gap-2 p-3 bg-farm-secondary/10 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                              <span>Moderate risk of heavy rain on Friday - secure any vulnerable seedlings and ensure proper drainage.</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="seasonal" className="animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>Seasonal Climate Data for {weatherData.location}</CardTitle>
                        <CardDescription>
                          Plan your long-term farming strategy with seasonal patterns
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Temperature Patterns</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
                                <p className="font-medium mb-2">Winter</p>
                                <p className="text-xl font-semibold">{weatherData.seasonal.temperature.winter.avg}°C</p>
                                <p className="text-xs">
                                  Range: {weatherData.seasonal.temperature.winter.min}° - {weatherData.seasonal.temperature.winter.max}°C
                                </p>
                              </div>
                              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md">
                                <p className="font-medium mb-2">Spring</p>
                                <p className="text-xl font-semibold">{weatherData.seasonal.temperature.spring.avg}°C</p>
                                <p className="text-xs">
                                  Range: {weatherData.seasonal.temperature.spring.min}° - {weatherData.seasonal.temperature.spring.max}°C
                                </p>
                              </div>
                              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-md">
                                <p className="font-medium mb-2">Summer</p>
                                <p className="text-xl font-semibold">{weatherData.seasonal.temperature.summer.avg}°C</p>
                                <p className="text-xs">
                                  Range: {weatherData.seasonal.temperature.summer.min}° - {weatherData.seasonal.temperature.summer.max}°C
                                </p>
                              </div>
                              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-md">
                                <p className="font-medium mb-2">Fall</p>
                                <p className="text-xl font-semibold">{weatherData.seasonal.temperature.fall.avg}°C</p>
                                <p className="text-xs">
                                  Range: {weatherData.seasonal.temperature.fall.min}° - {weatherData.seasonal.temperature.fall.max}°C
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Seasonal Rainfall</h3>
                            <div className="bg-white p-6 rounded-lg border">
                              <div className="h-48 bg-gray-100 flex items-center justify-center">
                                <p className="text-gray-500">
                                  Seasonal rainfall chart
                                  <br />
                                  (Chart component would be integrated here)
                                </p>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <div>
                                  <p className="text-sm text-gray-500">Winter</p>
                                  <p className="text-xl font-semibold">{weatherData.seasonal.rainfall.winter} mm</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Spring</p>
                                  <p className="text-xl font-semibold">{weatherData.seasonal.rainfall.spring} mm</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Summer</p>
                                  <p className="text-xl font-semibold">{weatherData.seasonal.rainfall.summer} mm</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Fall</p>
                                  <p className="text-xl font-semibold">{weatherData.seasonal.rainfall.fall} mm</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Crop Planning Calendar</h3>
                            <div className="bg-white p-6 rounded-lg border">
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                                  <p className="font-medium mb-2">Winter (Dec-Feb)</p>
                                  <ul className="text-sm space-y-1">
                                    <li>• Planning & preparation</li>
                                    <li>• Equipment maintenance</li>
                                    <li>• Soil testing</li>
                                  </ul>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-md">
                                  <p className="font-medium mb-2">Spring (Mar-May)</p>
                                  <ul className="text-sm space-y-1">
                                    <li>• Soil preparation</li>
                                    <li>• Early crop planting</li>
                                    <li>• Fertilizer application</li>
                                  </ul>
                                </div>
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
                                  <p className="font-medium mb-2">Summer (Jun-Aug)</p>
                                  <ul className="text-sm space-y-1">
                                    <li>• Irrigation management</li>
                                    <li>• Pest control</li>
                                    <li>• Early harvesting</li>
                                  </ul>
                                </div>
                                <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-md">
                                  <p className="font-medium mb-2">Fall (Sep-Nov)</p>
                                  <ul className="text-sm space-y-1">
                                    <li>• Main harvest season</li>
                                    <li>• Cover crop planting</li>
                                    <li>• Soil amendments</li>
                                  </ul>
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
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Weather;
