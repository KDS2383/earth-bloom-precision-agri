import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast"; // Keep if used elsewhere, remove if not
import { LocationInput } from "@/components/location/LocationInput";
import { useWeatherData } from "@/utils/weatherApi"; // Import the updated hook
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, saveUserWeatherData } from "@/services/firebase/userService";
import { useToast } from "@/components/ui/use-toast";

const Weather = () => {
  const [displayLocation, setDisplayLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Use the hook to fetch real data
  const { data: apiWeatherData, isLoading: isWeatherLoading, isError } = useWeatherData(
    coordinates?.lat ?? null,
    coordinates?.lng ?? null
  );

  useEffect(() => {
    // Fetch user's weather data if they're logged in
    if (user) {
      fetchUserWeatherData();
    }
  }, [user]);

  // Function to fetch user's weather data
  const fetchUserWeatherData = async () => {
    if (!user) return;
    
    setIsLoadingUserData(true);
    try {
      const userProfile = await getUserProfile();
      
      // If user has weather data, use the most recent one
      if (userProfile?.weatherData?.length) {
        const recentWeatherData = userProfile.weatherData[userProfile.weatherData.length - 1];
        
        // Try to get coordinates for this location or use the location name
        if (recentWeatherData.location) {
          setDisplayLocation(recentWeatherData.location);
          // You could implement geocoding here to get coordinates from the location name
        }
      }
    } catch (error: any) {
      console.error("Error fetching user weather data:", error);
      toast({
        title: "Error fetching saved weather data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingUserData(false);
    }
  };

  const handleLocationSelect = (location: string, coords: {lat: number, lng: number}) => {
    setDisplayLocation(location);
    setCoordinates(coords);
    setUsingCurrentLocation(false);
  };

  const handleCurrentLocation = (coords: {lat: number, lng: number}, location: string) => {
    setCoordinates(coords);
    setDisplayLocation(location || "Current Location");
    setUsingCurrentLocation(true);
  };

  // Save weather data when it's loaded (for logged-in users)
  useEffect(() => {
    if (user && apiWeatherData && !isWeatherLoading && !isError && displayLocation) {
      // Save the current weather data to the user's profile
      const saveData = async () => {
        try {
          const weatherDataToSave = {
            location: displayLocation || apiWeatherData.locationName,
            temperature: apiWeatherData.current.temperature,
            humidity: apiWeatherData.current.humidity,
            windSpeed: apiWeatherData.current.wind.speed,
            description: apiWeatherData.current.conditionDescription,
            timestamp: new Date().toLocaleString(),
          };
          
          await saveUserWeatherData(weatherDataToSave);
          console.log("Weather data saved to user profile");
        } catch (error) {
          console.error("Error saving weather data to user profile:", error);
        }
      };
      
      saveData();
    }
  }, [apiWeatherData, isWeatherLoading, isError, user, displayLocation]);

  // --- Updated getWeatherIcon ---
  // Takes the 'main' condition string from OpenWeatherMap (e.g., "Clear", "Clouds", "Rain")
  // Or alternatively, could take the icon code (e.g., "01d") and return an <img> tag
  const getWeatherIcon = (condition: string, description?: string) => {
    const lowerCaseCondition = condition.toLowerCase();
    const lowerCaseDescription = description?.toLowerCase();

    switch (lowerCaseCondition) {
      case "clear":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-yellow-500">
            {/* Sunny Icon SVG */}
            <circle cx="12" cy="12" r="4"></circle> <path d="M12 2v2"></path> <path d="M12 20v2"></path> <path d="m4.93 4.93 1.41 1.41"></path> <path d="m17.66 17.66 1.41 1.41"></path> <path d="M2 12h2"></path> <path d="M20 12h2"></path> <path d="m6.34 17.66-1.41 1.41"></path> <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        );
      case "clouds":
        if (lowerCaseDescription?.includes("few") || lowerCaseDescription?.includes("scattered")) {
          return ( // Partly Cloudy Icon
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-400">
              {/* Partly Cloudy Icon SVG */}
              <path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 12h2"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M17.5 20.5a8.49 8.49 0 0 1-4.6-1.3"></path><path d="M16 14a5 5 0 1 0-5.59-7.5"></path><path d="M15.9 6.09A4.5 4.5 0 0 0 17.5 15h.5a2.5 2.5 0 1 1 0 5h-11a5 5 0 0 1-1.5-9.78"></path>
            </svg>
          );
        }
        return ( // Cloudy Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400">
            {/* Cloudy Icon SVG */}
             <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          </svg>
        );
      case "rain":
      case "drizzle":
      case "thunderstorm": // Grouping thunderstorm with rain for icon simplicity
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-500">
            {/* Rain Icon SVG */}
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path> <path d="M8 19v1"></path> <path d="M8 14v1"></path> <path d="M16 19v1"></path> <path d="M16 14v1"></path> <path d="M12 21v1"></path> <path d="M12 16v1"></path>
          </svg>
        );
       case "snow":
         return ( // Add a simple snowflake or use cloudy/default
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-300"><path d="M20 7.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1h.5v.5a.5.5 0 0 0 .5.5z"/><path d="M16 10a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1h.5v.5a.5.5 0 0 0 .5.5z"/><path d="M12 12.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1h.5v.5a.5.5 0 0 0 .5.5z"/><path d="M8.5 15a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1z"/><path d="M4 17.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0 0 1h.5v.5a.5.5 0 0 0 .5.5z"/><path d="M4 7.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1H4v.5A.5.5 0 0 1 4 7.5z"/><path d="M7.5 10a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-.5v.5a.5.5 0 0 1-.5.5z"/><path d="M11.5 12.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-.5v.5a.5.5 0 0 1-.5.5z"/><path d="M15 15a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1z"/><path d="M19.5 17.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-.5v.5a.5.5 0 0 1-.5.5z"/><path d="m4.93 4.93-.71-.71a.5.5 0 0 0-.71 0l-.71.71a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0l.71-.71a.5.5 0 0 0 0-.71z"/><path d="m11 4.22-.5.86a.5.5 0 0 0 .43.75h1.14a.5.5 0 0 0 .43-.75l-.5-.86a.5.5 0 0 0-.86 0z"/><path d="m19.07 4.93-.71.71a.5.5 0 0 1-.71 0l-.71-.71a.5.5 0 0 1 0-.71l.71-.71a.5.5 0 0 1 .71 0l.71.71a.5.5 0 0 1 0 .71z"/><path d="M21.78 11l-.87.5a.5.5 0 0 1-.75-.43V9.93a.5.5 0 0 1 .75-.43l.87.5a.5.5 0 0 1 0 .86z"/><path d="m19.07 19.07-.71.71a.5.5 0 0 1-.71 0l-.71-.71a.5.5 0 0 1 0-.71l.71-.71a.5.5 0 0 1 .71 0l.71.71a.5.5 0 0 1 0 .71z"/><path d="m13 19.78-.5.86a.5.5 0 0 1-.86 0l-.5-.86a.5.5 0 0 1 .43-.75h1.14a.5.5 0 0 1 .43.75z"/><path d="m4.93 19.07-.71-.71a.5.5 0 0 0-.71 0l-.71.71a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0l.71-.71a.5.5 0 0 0 0-.71z"/><path d="m2.22 13 .87-.5a.5.5 0 0 1 .75.43v1.14a.5.5 0 0 1-.75.43l-.87-.5a.5.5 0 0 1 0-.86z"/></svg>
         );
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
      case "sand":
      case "ash":
      case "squall":
      case "tornado":
      default: // Default to cloudy/generic icon
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400">
             <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          </svg>
        );
    }
  };

  const getUvDescription = (uv: number): string => {
    if (uv < 3) return "Low";
    if (uv < 6) return "Moderate";
    if (uv < 8) return "High";
    if (uv < 11) return "Very High";
    return "Extreme";
  }

  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
              Weather Forecast & Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access real-time weather data and forecasts for your location in India
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Loading state for user data fetch */}
            {isLoadingUserData && (
              <div className="flex justify-center py-6 mb-4">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-primary mb-2"></div>
                  <p>Loading your saved weather data...</p>
                </div>
              </div>
            )}
          
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Check Weather Conditions</CardTitle>
                <CardDescription>
                  Enter a location or use your current location to get weather information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-4">
                  <LocationInput
                    onLocationSelect={handleLocationSelect}
                    onCurrentLocation={handleCurrentLocation}
                    isLoading={isLoadingLocation}
                    usingCurrentLocation={usingCurrentLocation}
                  />
                </form>
              </CardContent>
            </Card>

            {(isWeatherLoading || isLoadingLocation) && ( // Show spinner if fetching weather OR location
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-primary"></div>
              </div>
            )}

            {isError && !isWeatherLoading && ( // Show error only if weather fetch failed
              <Card className="text-center py-8 bg-red-50 border border-red-200">
                <CardContent>
                  <p className="text-red-600 font-medium">Failed to fetch weather data.</p>
                  <p className="text-red-500 text-sm mt-1">Please check your connection or try a different location.</p>
                </CardContent>
              </Card>
            )}

            {/* Use apiWeatherData from the hook */}
            {apiWeatherData && !isWeatherLoading && !isError && (
              <div className="space-y-8">
                <Tabs defaultValue="current">
                  <TabsList className="w-full grid grid-cols-1 sm:grid-cols-2 mb-6">
                    <TabsTrigger value="current">Current Weather</TabsTrigger>
                    <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
                  </TabsList>

                  {/* Current Weather Tab */}
                  <TabsContent value="current" className="animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Weather for {displayLocation || apiWeatherData.locationName}</CardTitle>
                        <CardDescription>
                          {/* Format the timestamp from the API */}
                          Last updated: {new Date(apiWeatherData.current.dt * 1000).toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Main Temp & Condition */}
                          <div className="bg-white rounded-lg p-6 flex items-center border">
                            <div className="mr-6">
                              {getWeatherIcon(apiWeatherData.current.condition, apiWeatherData.current.conditionDescription)}
                            </div>
                            <div>
                              <h3 className="text-4xl font-bold mb-1">{apiWeatherData.current.temperature}°C</h3>
                              <p className="text-gray-600 capitalize">{apiWeatherData.current.conditionDescription}</p>
                            </div>
                          </div>

                          {/* Other Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Humidity</p>
                              <p className="text-2xl font-semibold">{apiWeatherData.current.humidity}%</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Wind</p>
                              <p className="text-2xl font-semibold">
                                {apiWeatherData.current.wind.speed} km/h
                              </p>
                              <p className="text-xs mt-1">Direction: {apiWeatherData.current.wind.direction}</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Precipitation (1h)</p>
                              <p className="text-2xl font-semibold">{apiWeatherData.current.precipitation.toFixed(1)} mm</p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
    <p className="text-sm text-gray-500">UV Index</p>
    {/* Check if UV is 'N/A' */}
    {apiWeatherData.current.uv === 'N/A' ? (
         <p className="text-2xl font-semibold text-gray-500">N/A</p>
    ) : (
        <>
            <p className="text-2xl font-semibold">{apiWeatherData.current.uv}</p>
            {/* You might need to adjust getUvDescription if uv is not a number */}
            {/* <p className="text-xs mt-1">{getUvDescription(apiWeatherData.current.uv)}</p> */}
        </>
    )}
</div>
                           
                          </div>
                        </div>

                        {/* Agricultural Metrics Removed - Add note or alternative source if needed */}
                         <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-700">
                                Note: Specific agricultural metrics like Growing Degree Days (GDD) and Chill Hours require specialized data or calculations not included in the standard forecast. Consult agricultural resources for these metrics.
                            </p>
                         </div>

                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Forecast Tab */}
                  <TabsContent value="forecast" className="animate-fade-in">
                    <Card>
                      <CardHeader>
                        <CardTitle>7-Day Forecast for {displayLocation || apiWeatherData.locationName}</CardTitle>
                        <CardDescription>
                          Daily weather predictions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 md:gap-4">
                          {apiWeatherData.forecast.map((day, index) => (
                            <div key={index} className="bg-white p-3 md:p-4 rounded-lg border text-center">
                              <p className="font-medium mb-2 text-sm md:text-base">{day.day}</p>
                              <div className="mb-2 flex justify-center">
                                {getWeatherIcon(day.condition, day.conditionDescription)}
                              </div>
                              <p className="text-xs md:text-sm capitalize">{day.conditionDescription}</p>
                              <div className="flex justify-center items-center gap-1 md:gap-2 mt-2">
                                <span className="text-red-500 font-medium text-sm md:text-base">{day.high}°</span>
                                <span className="text-xs text-gray-400">|</span>
                                <span className="text-blue-500 font-medium text-sm md:text-base">{day.low}°</span>
                              </div>
                              <p className="text-xs mt-2">
                                <span className="text-blue-600">{day.precipitation}%</span> precip.
                              </p>
                            </div>
                          ))}
                        </div>
                         {/* Agricultural Metrics Removed - Add note or alternative source if needed */}
                         <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-700">
                                Note: Specific agricultural metrics like Growing Degree Days (GDD) and Chill Hours require specialized data or calculations not included in the standard forecast. Consult agricultural resources for these metrics.
                            </p>
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
