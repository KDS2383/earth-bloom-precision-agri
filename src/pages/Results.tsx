// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { useState } from "react";

// // Mock data for demonstration
// const mockResultData = {
//   location: "Midwest Region, USA",
//   soilData: {
//     ph: 6.8,
//     texture: "Loamy",
//     nutrients: {
//       nitrogen: 35,
//       phosphorus: 42,
//       potassium: 28,
//       organic: 3.5
//     }
//   },
//   weatherData: {
//     temperature: {
//       avg: 22,
//       min: 10,
//       max: 32
//     },
//     rainfall: 850,
//     humidity: 65,
//     windSpeed: 12
//   },
//   recommendations: [
//     {
//       id: 1,
//       name: "Soybean",
//       image: "https://images.unsplash.com/photo-1601459427108-47e20d579a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       suitability: 95,
//       details: {
//         crop_name: "Soybean",
//         crop_info: "A legume species native to East Asia, widely grown for its edible bean, which has numerous uses.",
//         growing_info: {
//           growing_season: "Late spring to late summer",
//           water_needs: "Medium (requires consistent moisture, especially during flowering and pod development)",
//           soil_preference: "Loamy, well-drained with pH 6.0-7.5",
//           harvest_time: "90-120 days after planting"
//         },
//         expected_yield: {
//           in_tons_per_acre: 3.2
//         }
//       }
//     },
//     {
//       id: 2,
//       name: "Corn",
//       image: "https://images.unsplash.com/photo-1543674892-7d64d45b2140?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       suitability: 88,
//       details: {
//         crop_name: "Corn",
//         crop_info: "A cereal grain first domesticated by indigenous peoples in southern Mexico, now one of the most widely grown crops globally.",
//         growing_info: {
//           growing_season: "Late spring to mid-autumn",
//           water_needs: "High (requires consistent moisture, especially during silking and ear development)",
//           soil_preference: "Well-drained loam with pH 5.8-7.0",
//           harvest_time: "60-100 days after planting depending on variety"
//         },
//         expected_yield: {
//           in_tons_per_acre: 4.5
//         }
//       }
//     },
//     {
//       id: 3,
//       name: "Winter Wheat",
//       image: "https://images.unsplash.com/photo-1574323347407-f5e1c1bc9661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//       suitability: 82,
//       details: {
//         crop_name: "Winter Wheat",
//         crop_info: "A type of wheat planted in autumn to germinate and develop into young plants that remain in vegetative phase during winter.",
//         growing_info: {
//           growing_season: "Planted in fall, harvested in early summer",
//           water_needs: "Moderate (tolerates drier conditions better than other wheat varieties)",
//           soil_preference: "Well-drained loam with pH 5.5-7.5",
//           harvest_time: "July to August (approximately 8 months after planting)"
//         },
//         expected_yield: {
//           in_tons_per_acre: 3.8
//         }
//       }
//     }
//   ]
// };

// const Results = () => {
//   const [activeTab, setActiveTab] = useState("crops");

//   const handleDownloadReport = () => {
//     // In a real app, this would generate and download a PDF
//     alert("Downloading PDF report...");
//   };

//   return (
//     <Layout>
//       <section className="py-12 bg-farm-cream">
//         <div className="container">
//           <div className="text-center mb-12">
//             <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
//               Your Farming Recommendations
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Based on your specific soil conditions, location, and farming history,
//               here are our AI-powered recommendations for optimal crop selection
//             </p>
//           </div>

//           <div className="flex justify-end mb-6">
//             <Button
//               className="bg-farm-accent text-farm-dark hover:bg-farm-accent/80 font-medium"
//               onClick={handleDownloadReport}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                 <polyline points="7 10 12 15 17 10"/>
//                 <line x1="12" y1="15" x2="12" y2="3"/>
//               </svg>
//               Download Report
//             </Button>
//           </div>

//           <Tabs defaultValue="crops" onValueChange={setActiveTab}>
//             <TabsList className="w-full grid grid-cols-3 mb-8">
//               <TabsTrigger value="crops">Recommended Crops</TabsTrigger>
//               <TabsTrigger value="soil">Soil Data</TabsTrigger>
//               <TabsTrigger value="weather">Weather Data</TabsTrigger>
//             </TabsList>

//             {/* Crops Tab */}
//             <TabsContent value="crops" className="animate-fade-in">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {mockResultData.recommendations.map((crop) => (
//                   <Card key={crop.id} className="farm-card overflow-hidden">
//                     <div className="h-48 overflow-hidden relative">
//                       <img
//                         src={crop.image}
//                         alt={crop.name}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute top-2 right-2 bg-farm-accent text-farm-dark font-medium text-sm px-3 py-1 rounded-full">
//                         {crop.suitability}% Match
//                       </div>
//                     </div>
//                     <CardHeader>
//                       <CardTitle>{crop.name}</CardTitle>
//                       <CardDescription>Recommended crop for your conditions</CardDescription>
//                     </CardHeader>
//                     <CardFooter>
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button variant="outline" className="w-full">View Details</Button>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-lg">
//                           <DialogHeader>
//                             <DialogTitle>{crop.details.crop_name}</DialogTitle>
//                             <DialogDescription>
//                               {crop.details.crop_info}
//                             </DialogDescription>
//                           </DialogHeader>
//                           <div className="space-y-4">
//                             <h4 className="font-semibold">Growing Information</h4>
//                             <div className="grid grid-cols-2 gap-2 text-sm">
//                               <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                 <p className="font-medium text-farm-primary mb-1">Growing Season</p>
//                                 <p>{crop.details.growing_info.growing_season}</p>
//                               </div>
//                               <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                 <p className="font-medium text-farm-primary mb-1">Water Needs</p>
//                                 <p>{crop.details.growing_info.water_needs}</p>
//                               </div>
//                               <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                 <p className="font-medium text-farm-primary mb-1">Soil Preference</p>
//                                 <p>{crop.details.growing_info.soil_preference}</p>
//                               </div>
//                               <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                 <p className="font-medium text-farm-primary mb-1">Harvest Time</p>
//                                 <p>{crop.details.growing_info.harvest_time}</p>
//                               </div>
//                             </div>

//                             <div>
//                               <h4 className="font-semibold">Expected Yield</h4>
//                               <div className="bg-farm-light p-4 rounded-md mt-2">
//                                 <p className="text-2xl font-bold text-farm-primary">
//                                   {crop.details.expected_yield.in_tons_per_acre} <span className="text-base font-normal">tons/acre</span>
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                           <DialogFooter>
//                             <Button className="bg-farm-primary hover:bg-farm-dark">Save to Favorites</Button>
//                           </DialogFooter>
//                         </DialogContent>
//                       </Dialog>
//                     </CardFooter>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             {/* Soil Data Tab */}
//             <TabsContent value="soil" className="animate-fade-in">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Soil Analysis for {mockResultData.location}</CardTitle>
//                   <CardDescription>
//                     Understanding your soil composition helps optimize planting decisions
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <div className="mb-6">
//                         <h3 className="text-lg font-semibold mb-2">General Properties</h3>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                             <p className="text-sm text-gray-500">pH Level</p>
//                             <p className="text-2xl font-semibold">{mockResultData.soilData.ph}</p>
//                           </div>
//                           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                             <p className="text-sm text-gray-500">Texture</p>
//                             <p className="text-2xl font-semibold">{mockResultData.soilData.texture}</p>
//                           </div>
//                           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                             <p className="text-sm text-gray-500">Organic Content</p>
//                             <p className="text-2xl font-semibold">{mockResultData.soilData.nutrients.organic}%</p>
//                           </div>
//                         </div>
//                       </div>

//                       <div>
//                         <h3 className="text-lg font-semibold mb-2">Soil Recommendations</h3>
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start gap-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                               <polyline points="22 4 12 14.01 9 11.01"/>
//                             </svg>
//                             <span>Your soil pH is ideal for most crops with minimal adjustment needed</span>
//                           </li>
//                           <li className="flex items-start gap-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                               <polyline points="22 4 12 14.01 9 11.01"/>
//                             </svg>
//                             <span>Consider increasing organic matter to improve soil structure</span>
//                           </li>
//                           <li className="flex items-start gap-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                               <polyline points="22 4 12 14.01 9 11.01"/>
//                             </svg>
//                             <span>Nitrogen levels are sufficient but could be supplemented for nitrogen-hungry crops</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Nutrient Analysis</h3>
//                       <div className="space-y-4">
//                         <div>
//                           <div className="flex justify-between mb-1">
//                             <span className="text-sm font-medium">Nitrogen (N)</span>
//                             <span className="text-sm font-medium">{mockResultData.soilData.nutrients.nitrogen} ppm</span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div
//                               className="bg-farm-primary h-2.5 rounded-full"
//                               style={{ width: `${(mockResultData.soilData.nutrients.nitrogen / 100) * 100}%` }}
//                             ></div>
//                           </div>
//                         </div>

//                         <div>
//                           <div className="flex justify-between mb-1">
//                             <span className="text-sm font-medium">Phosphorus (P)</span>
//                             <span className="text-sm font-medium">{mockResultData.soilData.nutrients.phosphorus} ppm</span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div
//                               className="bg-farm-secondary h-2.5 rounded-full"
//                               style={{ width: `${(mockResultData.soilData.nutrients.phosphorus / 100) * 100}%` }}
//                             ></div>
//                           </div>
//                         </div>

//                         <div>
//                           <div className="flex justify-between mb-1">
//                             <span className="text-sm font-medium">Potassium (K)</span>
//                             <span className="text-sm font-medium">{mockResultData.soilData.nutrients.potassium} ppm</span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2.5">
//                             <div
//                               className="bg-farm-accent h-2.5 rounded-full"
//                               style={{ width: `${(mockResultData.soilData.nutrients.potassium / 100) * 100}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-8">
//                         <h3 className="text-lg font-semibold mb-2">Nutrient Chart</h3>
//                         <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
//                           <p className="text-gray-500">
//                             Pie chart visualization of soil nutrients
//                             <br />
//                             (Chart component would be integrated here)
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Weather Data Tab */}
//             <TabsContent value="weather" className="animate-fade-in">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Weather Conditions for {mockResultData.location}</CardTitle>
//                   <CardDescription>
//                     Climate analysis and forecast for optimal crop planning
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Current Season Overview</h3>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                           <p className="text-sm text-gray-500">Average Temperature</p>
//                           <p className="text-2xl font-semibold">{mockResultData.weatherData.temperature.avg}°C</p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             Range: {mockResultData.weatherData.temperature.min}° - {mockResultData.weatherData.temperature.max}°C
//                           </p>
//                         </div>
//                         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                           <p className="text-sm text-gray-500">Annual Rainfall</p>
//                           <p className="text-2xl font-semibold">{mockResultData.weatherData.rainfall} mm</p>
//                           <p className="text-xs text-gray-500 mt-1">Moderately wet climate</p>
//                         </div>
//                         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                           <p className="text-sm text-gray-500">Average Humidity</p>
//                           <p className="text-2xl font-semibold">{mockResultData.weatherData.humidity}%</p>
//                         </div>
//                         <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                           <p className="text-sm text-gray-500">Wind Speed</p>
//                           <p className="text-2xl font-semibold">{mockResultData.weatherData.windSpeed} km/h</p>
//                           <p className="text-xs text-gray-500 mt-1">Moderate winds</p>
//                         </div>
//                       </div>

//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold mb-2">Climate Considerations</h3>
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start gap-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                               <polyline points="22 4 12 14.01 9 11.01"/>
//                             </svg>
//                             <span>Temperature range supports growth of recommended crops</span>
//                           </li>
//                           <li className="flex items-start gap-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                               <polyline points="22 4 12 14.01 9 11.01"/>
//                             </svg>
//                             <span>Consider irrigation planning for dry periods in mid-summer</span>
//                           </li>
//                           <li className="flex items-start gap-2">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
//                               <line x1="12" y1="9" x2="12" y2="13"></line>
//                               <line x1="12" y1="17" x2="12.01" y2="17"></line>
//                             </svg>
//                             <span>Risk of early frost in fall - monitor forecasts carefully</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Seasonal Forecast</h3>
//                       <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
//                         <p className="text-gray-500">
//                           Temperature and rainfall forecast chart
//                           <br />
//                           (Chart component would be integrated here)
//                         </p>
//                       </div>

//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold mb-2">Weather Impact on Recommended Crops</h3>
//                         <div className="space-y-3">
//                           <div className="p-3 border rounded-md">
//                             <div className="flex items-center justify-between">
//                               <p className="font-medium">Soybean</p>
//                               <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
//                                 Highly Suitable
//                               </span>
//                             </div>
//                             <p className="text-sm mt-1">Current climate provides ideal conditions for soybean cultivation.</p>
//                           </div>

//                           <div className="p-3 border rounded-md">
//                             <div className="flex items-center justify-between">
//                               <p className="font-medium">Corn</p>
//                               <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
//                                 Well Suited
//                               </span>
//                             </div>
//                             <p className="text-sm mt-1">Good temperature range, may need irrigation during dry periods.</p>
//                           </div>

//                           <div className="p-3 border rounded-md">
//                             <div className="flex items-center justify-between">
//                               <p className="font-medium">Winter Wheat</p>
//                               <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
//                                 Moderately Suited
//                               </span>
//                             </div>
//                             <p className="text-sm mt-1">Watch for early frost risk, but overall viable with proper timing.</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Results;

// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { useState, useEffect } from "react"; // Import useEffect
// import { useLocation } from "react-router-dom"; // Import useLocation

// // Define the expected structure of the data within the navigate state
// // This helps clarify what we expect to receive
// // type NavigationStateData = {
// //   recommendations?: { // The object containing the recommendations array and processing time
// //     recommendations: Array<{
// //         crop_name: string;
// //         crop_info: string;
// //         growing_info: {
// //             growing_season: string;
// //             water_needs: string;
// //             soil_preference: string;
// //             harvest_time: string;
// //         };
// //         expected_yield: {
// //             in_tons_per_acre: number;
// //         };
// //     }>;
// //     processing_time_seconds: number;
// //   };
// //   weather?: any; // Define a proper type for weather data if possible
// //   soil?: any; // Define a proper type for soil data if possible
// //   location?: string; // Assuming location *might* be passed here, or falls back
// // };

// // Define fallback/default data structure for the component's state
// // This ensures the component has a structure even if state data is missing
// const fallbackResultData = {
//   // Location: Use a default or receive from state/prop
//   // Assuming location is NOT passed in the state based on the example, use a default
//   location: "Analyzed Location", // Can update this if location is added to state

//   // Default structure for soil data if not provided in state
//   soilData: {
//     ph: null,
//     texture: "N/A",
//     nutrients: {
//       nitrogen: null,
//       phosphorus: null,
//       potassium: null,
//       organic: null
//     },
//     soilRecommendations: ["No specific soil recommendations available."] // Default recommendations
//     // Add any other soil fields expected by the UI here with defaults
//   },

//   // Default structure for weather data if not provided in state
//   weatherData: {
//     temperature: { avg: null, min: null, max: null },
//     rainfall: null,
//     humidity: null,
//     windSpeed: null,
//     // Add any other weather fields expected by the UI here with defaults
//   },

//   // Recommendations initialized empty
//   recommendations: [], // This will store the *mapped* UI structure

//   // Processing time initialized null
//   processingTime: null,

//   // Any other top-level data keys the UI might expect
// };

// // Helper function to map backend recommendation format (array item) to UI expected format
// // This function now expects a single backend crop object and adds UI-specific fields
// const mapBackendCropToUI = (backendCrop, index) => ({
//     id: index + 1, // Simple ID based on index
//     name: backendCrop.crop_name || 'Unknown Crop', // Use crop_name, fallback if missing
//     // Placeholder image, replace with actual image logic if available
//     image: `https://via.placeholder.com/500x300?text=${encodeURIComponent((backendCrop.crop_name || 'Crop').replace(' ', '+'))}`,
//     suitability: null, // Suitability percentage is not in the provided JSON
//     details: backendCrop // The backend crop object *is* the detailed info needed for the dialog
// });

// const Results = () => {
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("crops");

//   // State to hold the data displayed by the component
//   // Initialize with fallback data, will be updated by useEffect
//   const [resultData, setResultData] = useState(fallbackResultData);

//   // Use useEffect to process data received via navigation state
//   useEffect(() => {
//     // Access the state object passed during navigation
//     const stateData = location.state;

//     console.log("Raw state data received:", stateData); // Log the raw state data for debugging

//     if (stateData) {
//       // Extract data based on the *new* state structure
//       const backendRecommendationObject = stateData.recommendations; // This is { recommendations: [...], processing_time_seconds: ... }
//       const backendRecommendationArray = backendRecommendationObject?.recommendations; // This is the array of crops

//       const processingTime = backendRecommendationObject?.processing_time_seconds;
//       const soilDataFromState = stateData.soil;
//       const weatherDataFromState = stateData.weather;
//       // Assuming location is NOT in the state, but if it is, uncomment:
//       // const locationFromState = stateData.location;

//       // Map the received backend recommendations array to the UI format
//       const mappedRecommendations = backendRecommendationArray
//                                      ? backendRecommendationArray.map(mapBackendCropToUI)
//                                      : []; // Handle case where recommendations array is missing

//       // Update the state
//       setResultData(prevData => ({
//         // Start with previous state (containing fallback defaults)
//         ...prevData,
//         // Update fields with data from state if available, otherwise keep previous state's value
//         // Use optional chaining (?.) and nullish coalescing (??) or || for robust access
//         location: stateData.location || prevData.location, // If location is in state, use it, else use previous/fallback
//         soilData: soilDataFromState ? { ...prevData.soilData, ...soilDataFromState } : prevData.soilData, // Merge state soil data into fallback, prefer state
//         weatherData: weatherDataFromState ? { ...prevData.weatherData, ...weatherDataFromState } : prevData.weatherData, // Merge state weather data, prefer state
//         recommendations: mappedRecommendations, // Use the mapped recommendations
//         processingTime: processingTime !== undefined ? processingTime : prevData.processingTime, // Use processing time if available, check for undefined
//       }));

//     } else {
//         // Handle the case where no data was passed in the state (e.g., user navigated directly)
//         console.warn("No result data found in navigation state. Displaying fallback data.");
//         // State is already initialized with fallback data
//     }
//      // Dependency array: only re-run if the state object itself changes
//   }, [location.state]);

//   // Optional: Separate effect to log state *after* it updates (for debugging)
//   useEffect(() => {
//       console.log("Current resultData state:", resultData);
//   }, [resultData]);

//   const handleDownloadReport = () => {
//     // Use the current state (resultData) to generate the report
//     console.log("Generating report with data:", resultData);
//     alert("Downloading PDF report..."); // Placeholder action
//     // In a real app, you'd call an API or function here to create the PDF
//   };

//   // Render logic now uses the `resultData` state

//   return (
//     <Layout>
//       <section className="py-12 bg-farm-cream">
//         <div className="container">
//           <div className="text-center mb-12">
//             <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
//               Your Farming Recommendations
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Based on your specific soil conditions, location, and farming history,
//               here are our AI-powered recommendations for optimal crop selection
//               {resultData.processingTime !== null && ( // Check if processingTime is not null
//                   <span className="block text-sm text-gray-500 mt-2">
//                       Analysis completed in {resultData.processingTime} seconds.
//                   </span>
//               )}
//             </p>
//           </div>

//           <div className="flex justify-end mb-6">
//             <Button
//               className="bg-farm-accent text-farm-dark hover:bg-farm-accent/80 font-medium"
//               onClick={handleDownloadReport}
//               // Optional: Disable download button if no recommendations exist
//               // disabled={resultData.recommendations.length === 0}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 0 0 1-2-2v-4"/>
//                 <polyline points="7 10 12 15 17 10"/>
//                 <line x1="12" y1="15" x2="12" y2="3"/>
//               </svg>
//               Download Report
//             </Button>
//           </div>

//           <Tabs defaultValue="crops" onValueChange={setActiveTab}>
//              {/* You might conditionally render tabs based on data availability */}
//             <TabsList className="w-full grid grid-cols-3 mb-8">
//               <TabsTrigger value="crops">Recommended Crops</TabsTrigger>
//                {/* Disable Soil/Weather tabs if data is largely missing */}
//               <TabsTrigger value="soil" disabled={!resultData.soilData || (resultData.soilData.ph === null && resultData.soilData.texture === 'N/A' && Object.values(resultData.soilData.nutrients).every(val => val === null))}>Soil Data</TabsTrigger>
//               <TabsTrigger value="weather" disabled={!resultData.weatherData || resultData.weatherData.temperature?.avg === null}>Weather Data</TabsTrigger>
//             </TabsList>

//             {/* Crops Tab */}
//             <TabsContent value="crops" className="animate-fade-in">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {resultData.recommendations.length > 0 ? (
//                   resultData.recommendations.map((crop) => (
//                     // Use the mapped structure for rendering
//                     <Card key={crop.id} className="farm-card overflow-hidden">
//                       <div className="h-48 overflow-hidden relative">
//                         <img
//                           src={crop.image} // Mapped image URL (placeholder)
//                           alt={crop.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement;
//                             target.onerror = null;
//                             target.src = "https://via.placeholder.com/500x300?text=Image+Unavailable";
//                           }} // Fallback image on error
//                         />
//                          {/* Suitability removed as it's not in the provided JSON */}
//                       </div>
//                       <CardHeader>
//                         <CardTitle>{crop.name}</CardTitle>
//                         <CardDescription>Recommended crop for your conditions</CardDescription>
//                       </CardHeader>
//                       <CardFooter>
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button variant="outline" className="w-full">View Details</Button>
//                           </DialogTrigger>
//                            {/* Use crop.details which holds the original backend object */}
//                           <DialogContent className="sm:max-w-lg">
//                             <DialogHeader>
//                               <DialogTitle>{crop.details?.crop_name || 'Crop Details'}</DialogTitle> {/* Use optional chaining */}
//                               <DialogDescription>
//                                 {crop.details?.crop_info || 'No crop information available.'} {/* Use optional chaining */}
//                               </DialogDescription>
//                             </DialogHeader>
//                             <div className="space-y-4">
//                               <h4 className="font-semibold">Growing Information</h4>
//                                {/* Check if growing_info exists before mapping over it */}
//                                {crop.details?.growing_info ? (
//                                 <div className="grid grid-cols-2 gap-2 text-sm">
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">Growing Season</p>
//                                     <p>{crop.details.growing_info.growing_season || 'N/A'}</p>
//                                   </div>
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">Water Needs</p>
//                                     <p>{crop.details.growing_info.water_needs || 'N/A'}</p>
//                                   </div>
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">Soil Preference</p>
//                                     <p>{crop.details.growing_info.soil_preference || 'N/A'}</p>
//                                   </div>
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">Harvest Time</p>
//                                     <p>{crop.details.growing_info.harvest_time || 'N/A'}</p>
//                                   </div>
//                                 </div>
//                                ) : (
//                                    <p className="text-gray-500 text-sm">Growing information not available.</p>
//                                )}

//                               <div>
//                                 <h4 className="font-semibold">Expected Yield</h4>
//                                 {/* Check if expected_yield exists */}
//                                {crop.details?.expected_yield ? (
//                                 <div className="bg-farm-light p-4 rounded-md mt-2">
//                                   <p className="text-2xl font-bold text-farm-primary">
//                                     {/* Use nullish coalescing operator ?? for robustness */}
//                                     {crop.details.expected_yield.in_tons_per_acre ?? 'N/A'}
//                                      <span className="text-base font-normal"> tons/acre</span>
//                                   </p>
//                                 </div>
//                                ) : (
//                                     <p className="text-gray-500 text-sm mt-2">Expected yield data not available.</p>
//                                )}
//                               </div>
//                             </div>
//                             <DialogFooter>
//                               <Button className="bg-farm-primary hover:bg-farm-dark">Save to Favorites</Button>
//                             </DialogFooter>
//                           </DialogContent>
//                         </Dialog>
//                       </CardFooter>
//                     </Card>
//                   ))
//                 ) : (
//                    // Message when no recommendations are loaded or available
//                    <div className="md:col-span-3 text-center text-gray-500 p-8 border rounded-md">
//                        {/* Check if state exists to differentiate loading vs no data */}
//                        {location.state ? "No crop recommendations found for the provided conditions." : "Loading recommendations..."}
//                    </div>
//                 )}
//               </div>
//             </TabsContent>

//             {/* Soil Data Tab - Uses state data (fallback or potentially from state) */}
//             <TabsContent value="soil" className="animate-fade-in">
//               <Card>
//                 <CardHeader>
//                   {/* Use resultData.location from state (or fallback) */}
//                   <CardTitle>Soil Analysis for {resultData.location}</CardTitle>
//                   <CardDescription>
//                     Understanding your soil composition helps optimize planting decisions
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <div className="mb-6">
//                         <h3 className="text-lg font-semibold mb-2">General Properties</h3>
//                          {/* Check if soil data is available */}
//                          {resultData.soilData && (resultData.soilData.ph !== null || resultData.soilData.texture !== 'N/A' || resultData.soilData.nutrients?.organic !== null) ? (
//                            <div className="grid grid-cols-2 gap-4">
//                              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                                <p className="text-sm text-gray-500">pH Level</p>
//                                {/* Use nullish coalescing operator ?? */}
//                                <p className="text-2xl font-semibold">{resultData.soilData.ph ?? 'N/A'}</p>
//                              </div>
//                              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                                <p className="text-sm text-gray-500">Texture</p>
//                                <p className="text-2xl font-semibold">{resultData.soilData.texture}</p>
//                              </div>
//                              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                                <p className="text-sm text-gray-500">Organic Content</p>
//                                {/* Check for nutrients before accessing organic, use nullish coalescing */}
//                                <p className="text-2xl font-semibold">{resultData.soilData.nutrients?.organic ?? 'N/A'}{resultData.soilData.nutrients?.organic !== null ? '%' : ''}</p>
//                              </div>
//                              {/* Add other general properties if available */}
//                            </div>
//                         ) : (
//                             <p className="text-gray-500">No general soil property data available.</p>
//                         )}
//                       </div>

//                       <div>
//                         <h3 className="text-lg font-semibold mb-2">Soil Recommendations</h3>
//                          {/* Display recommendations from state if available, otherwise fallback */}
//                          {/* Check if recommendations exist and the first isn't the default fallback message */}
//                          {resultData.soilData?.soilRecommendations && resultData.soilData.soilRecommendations.length > 0 && resultData.soilData.soilRecommendations[0] !== "No specific soil recommendations available." ? (
//                              <ul className="space-y-2 text-sm">
//                                  {resultData.soilData.soilRecommendations.map((rec, index) => (
//                                      <li key={index} className="flex items-start gap-2">
//                                          {/* Using a generic checkmark icon */}
//                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-farm-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
//                                              <polyline points="22 4 12 14.01 9 11.01"/>
//                                          </svg>
//                                          <span>{rec}</span>
//                                      </li>
//                                  ))}
//                              </ul>
//                          ) : (
//                               <p className="text-gray-500">No specific soil recommendations available.</p>
//                          )}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Nutrient Analysis</h3>
//                        {/* Check if nutrient data is available */}
//                        {resultData.soilData?.nutrients && (resultData.soilData.nutrients.nitrogen !== null || resultData.soilData.nutrients.phosphorus !== null || resultData.soilData.nutrients.potassium !== null) ? (
//                            <div className="space-y-4">
//                              {/* Nitrogen */}
//                              <div>
//                                <div className="flex justify-between mb-1">
//                                  <span className="text-sm font-medium">Nitrogen (N)</span>
//                                  {/* Use nullish coalescing operator ?? */}
//                                  <span className="text-sm font-medium">{resultData.soilData.nutrients.nitrogen ?? 'N/A'}{resultData.soilData.nutrients.nitrogen !== null ? ' ppm' : ''}</span>
//                                </div>
//                                <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                  {/* Only render the bar if data is available */}
//                                  {resultData.soilData.nutrients.nitrogen !== null && (
//                                     <div
//                                       className="bg-farm-primary h-2.5 rounded-full"
//                                       style={{ width: `${Math.min((resultData.soilData.nutrients.nitrogen / 100) * 100, 100)}%` }} // Assuming a max value for the bar scale (adjust as needed)
//                                     ></div>
//                                  )}
//                                </div>
//                              </div>

//                              {/* Phosphorus */}
//                              <div>
//                                <div className="flex justify-between mb-1">
//                                  <span className="text-sm font-medium">Phosphorus (P)</span>
//                                   {/* Use nullish coalescing operator ?? */}
//                                  <span className="text-sm font-medium">{resultData.soilData.nutrients.phosphorus ?? 'N/A'}{resultData.soilData.nutrients.phosphorus !== null ? ' ppm' : ''}</span>
//                                </div>
//                                <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                  {/* Only render the bar if data is available */}
//                                  {resultData.soilData.nutrients.phosphorus !== null && (
//                                     <div
//                                       className="bg-farm-secondary h-2.5 rounded-full"
//                                        style={{ width: `${Math.min((resultData.soilData.nutrients.phosphorus / 100) * 100, 100)}%` }} // Assuming a max value
//                                     ></div>
//                                  )}
//                                </div>
//                              </div>

//                              {/* Potassium */}
//                              <div>
//                                <div className="flex justify-between mb-1">
//                                  <span className="text-sm font-medium">Potassium (K)</span>
//                                   {/* Use nullish coalescing operator ?? */}
//                                  <span className="text-sm font-medium">{resultData.soilData.nutrients.potassium ?? 'N/A'}{resultData.soilData.nutrients.potassium !== null ? ' ppm' : ''}</span>
//                                </div>
//                                <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                   {/* Only render the bar if data is available */}
//                                   {resultData.soilData.nutrients.potassium !== null && (
//                                      <div
//                                        className="bg-farm-accent h-2.5 rounded-full"
//                                        style={{ width: `${Math.min((resultData.soilData.nutrients.potassium / 100) * 100, 100)}%` }} // Assuming a max value
//                                      ></div>
//                                   )}
//                                </div>
//                              </div>
//                            </div>
//                        ) : (
//                            <p className="text-gray-500">No detailed nutrient data available.</p>
//                        )}

//                       <div className="mt-8">
//                         <h3 className="text-lg font-semibold mb-2">Nutrient Chart</h3>
//                         <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
//                           <p className="text-gray-500 text-center">
//                             Pie chart visualization of soil nutrients
//                             <br />
//                             (Chart component would be integrated here)
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Weather Data Tab - Uses state data (fallback or potentially from state) */}
//             <TabsContent value="weather" className="animate-fade-in">
//               <Card>
//                 <CardHeader>
//                    {/* Use resultData.location from state (or fallback) */}
//                   <CardTitle>Weather Conditions for {resultData.location}</CardTitle>
//                   <CardDescription>
//                     Climate analysis and forecast for optimal crop planning
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Current Season Overview</h3>
//                        {/* Check if weather data is available */}
//                        {resultData.weatherData && (resultData.weatherData.temperature?.avg !== null || resultData.weatherData.rainfall !== null || resultData.weatherData.humidity !== null || resultData.weatherData.windSpeed !== null) ? (
//                             <div className="grid grid-cols-2 gap-4">
//                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                                  <p className="text-sm text-gray-500">Average Temperature</p>
//                                   {/* Use optional chaining and nullish coalescing */}
//                                  <p className="text-2xl font-semibold">{resultData.weatherData.temperature?.avg ?? 'N/A'}{resultData.weatherData.temperature?.avg !== null ? '°C' : ''}</p>
//                                  {/* Check min/max before displaying range */}
//                                  {resultData.weatherData.temperature?.min !== null && resultData.weatherData.temperature?.max !== null && (
//                                     <p className="text-xs text-gray-500 mt-1">
//                                       Range: {resultData.weatherData.temperature.min}° - {resultData.weatherData.temperature.max}°C
//                                     </p>
//                                  )}
//                                </div>
//                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                                  <p className="text-sm text-gray-500">Annual Rainfall</p>
//                                   {/* Use nullish coalescing */}
//                                  <p className="text-2xl font-semibold">{resultData.weatherData.rainfall ?? 'N/A'}{resultData.weatherData.rainfall !== null ? ' mm' : ''}</p>
//                                  {/* Static text - replace with dynamic if available */}
//                                  {resultData.weatherData.rainfall !== null && <p className="text-xs text-gray-500 mt-1">Moderately wet climate</p>}
//                                </div>
//                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                                  <p className="text-sm text-gray-500">Average Humidity</p>
//                                   {/* Use nullish coalescing */}
//                                  <p className="text-2xl font-semibold">{resultData.weatherData.humidity ?? 'N/A'}{resultData.weatherData.humidity !== null ? '%' : ''}</p>
//                                </div>
//                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                                  <p className="text-sm text-gray-500">Wind Speed</p>
//                                   {/* Use nullish coalescing */}
//                                  <p className="text-2xl font-semibold">{resultData.weatherData.windSpeed ?? 'N/A'}{resultData.weatherData.windSpeed !== null ? ' km/h' : ''}</p>
//                                   {/* Static text - replace with dynamic if available */}
//                                  {resultData.weatherData.windSpeed !== null && <p className="text-xs text-gray-500 mt-1">Moderate winds</p>}
//                                </div>
//                              </div>
//                        ) : (
//                             <p className="text-gray-500">No current season weather data available.</p>
//                        )}

//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold mb-2">Climate Considerations</h3>
//                          {/* This section is static - you'd need specific data from the backend for this */}
//                         <ul className="space-y-2 text-sm">
//                            <li className="flex items-start gap-2 text-gray-500">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
//                                 <span>Climate consideration data not available.</span>
//                             </li>
//                         </ul>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">Seasonal Forecast</h3>
//                       <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
//                         <p className="text-gray-500 text-center">
//                           Temperature and rainfall forecast chart
//                           <br />
//                           (Chart component would be integrated here)
//                         </p>
//                       </div>

//                        <div className="mt-6">
//                         <h3 className="text-lg font-semibold mb-2">Weather Impact on Recommended Crops</h3>
//                          {resultData.recommendations.length > 0 ? (
//                              <div className="space-y-3">
//                                  {resultData.recommendations.map((crop, index) => (
//                                       // Using mapped crop data for this section
//                                      <div key={index} className="p-3 border rounded-md">
//                                          <div className="flex items-center justify-between">
//                                              <p className="font-medium">{crop.name}</p>
//                                              {/* Suitability status not in new data */}
//                                              <span className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
//                                                 Suitability N/A
//                                              </span>
//                                          </div>
//                                          {/* This text is static - ideally would be backend provided based on weather + crop */}
//                                          <p className="text-sm mt-1">Review crop details for weather considerations.</p>
//                                      </div>
//                                  ))}
//                              </div>
//                          ) : (
//                              <div className="p-3 border rounded-md text-gray-500">
//                                  No recommended crops to show weather impact.
//                              </div>
//                          )}
//                     </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Results;

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Define the expected structure of the data within the navigate state
// This helps clarify what we expect to receive
// type NavigationStateData = {
//   recommendations?: { // The object containing the recommendations array and processing time
//     recommendations: Array<{ /* ... crop properties ... */ }>;
//     processing_time_seconds: number;
//   };
//   weather?: { // Structure matching the weather JSON you provided
//       latitude: number;
//       longitude: number;
//       elevation: number;
//       timezone: string;
//       hourly_units: { time: string; relative_humidity_2m: string; /* ... other hourly units ... */ };
//       hourly: { time: string[]; relative_humidity_2m: number[]; /* ... other hourly data ... */ };
//       daily_units: { time: string; temperature_2m_max: string; temperature_2m_min: string; precipitation_sum: string; wind_speed_10m_max: string; /* ... other daily units ... */ };
//       daily: { time: string[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_sum: number[]; wind_speed_10m_max: number[]; /* ... other daily data ... */ };
//   };
//   soil?: any; // Define a proper type for soil data if possible
//   location?: string; // Assuming location *might* be passed here
// };

// Helper function to calculate summary weather data from the raw weather JSON
const calculateWeatherDataSummary = (weatherData) => {
  if (!weatherData || !weatherData.daily || !weatherData.hourly) {
    return null; // Return null or a structured empty object if data is missing
  }

  const daily = weatherData.daily;
  const hourly = weatherData.hourly;

  // Temperature Summary
  let avgTemp = null;
  let minTemp = null;
  let maxTemp = null;
  if (
    daily.temperature_2m_max &&
    daily.temperature_2m_min &&
    daily.temperature_2m_max.length > 0
  ) {
    const totalMax = daily.temperature_2m_max.reduce(
      (sum, temp) => sum + temp,
      0
    );
    const totalMin = daily.temperature_2m_min.reduce(
      (sum, temp) => sum + temp,
      0
    );
    avgTemp = (
      (totalMax + totalMin) /
      (daily.temperature_2m_max.length * 2)
    ).toFixed(1); // Average of all daily min/maxes
    minTemp = Math.min(...daily.temperature_2m_min); // Overall minimum temp
    maxTemp = Math.max(...daily.temperature_2m_max); // Overall maximum temp
  }

  // Precipitation Summary
  let totalPrecipitation = null;
  if (daily.precipitation_sum && daily.precipitation_sum.length > 0) {
    totalPrecipitation = daily.precipitation_sum
      .reduce((sum, precip) => sum + precip, 0)
      .toFixed(2); // Sum of daily precipitation
  }

  // Humidity Summary (using hourly data)
  let avgHumidity = null;
  if (hourly.relative_humidity_2m && hourly.relative_humidity_2m.length > 0) {
    const totalHumidity = hourly.relative_humidity_2m.reduce(
      (sum, humidity) => sum + humidity,
      0
    );
    avgHumidity = (totalHumidity / hourly.relative_humidity_2m.length).toFixed(
      0
    ); // Average hourly humidity, rounded
  }

  // Wind Speed Summary (using daily max wind speed)
  let avgWindSpeed = null;
  if (daily.wind_speed_10m_max && daily.wind_speed_10m_max.length > 0) {
    const totalWindSpeed = daily.wind_speed_10m_max.reduce(
      (sum, speed) => sum + speed,
      0
    );
    avgWindSpeed = (totalWindSpeed / daily.wind_speed_10m_max.length).toFixed(
      1
    ); // Average of daily max wind speeds
  }

  // Return the structured summary data
  return {
    temperature: {
      avg: avgTemp,
      min: minTemp,
      max: maxTemp,
    },
    rainfall: totalPrecipitation, // Renamed from rainfall to precipitation for accuracy
    humidity: avgHumidity,
    windSpeed: avgWindSpeed,
    // Keep original units if needed, but hardcoding them based on your JSON is fine for now
    temperatureUnit: weatherData.daily_units?.temperature_2m_max || "°C",
    precipitationUnit: weatherData.daily_units?.precipitation_sum || "mm",
    humidityUnit: weatherData.hourly_units?.relative_humidity_2m || "%",
    windSpeedUnit: weatherData.daily_units?.wind_speed_10m_max || "km/h",
    // You can add daily/hourly arrays here if you want to pass them to a chart component later
    dailyForecast: daily,
    hourlyForecast: hourly,
  };
};

// Define fallback/default data structure for the component's state
// This ensures the component has a structure even if state data is missing
const fallbackResultData = {
  // Location: Use a default or receive from state/prop
  // Assuming location is NOT passed in the state based on the example, use a default
  location: "Analyzed Location", // Can update this if location is added to state

  // Default structure for soil data if not provided in state
  soilData: {
    ph: null,
    texture: "N/A",
    nutrients: {
      nitrogen: null,
      phosphorus: null,
      potassium: null,
      organic: null,
    },
    soilRecommendations: ["No specific soil recommendations available."], // Default recommendations
    // Add any other soil fields expected by the UI here with defaults
  },

  // Default structure for weather data if not provided or processing fails
  weatherData: {
    temperature: { avg: null, min: null, max: null },
    rainfall: null, // Changed from rainfall to match summary structure
    humidity: null,
    windSpeed: null,
    temperatureUnit: "°C",
    precipitationUnit: "mm",
    humidityUnit: "%",
    windSpeedUnit: "km/h",
    dailyForecast: null, // Placeholder for full forecast data
    hourlyForecast: null, // Placeholder for full forecast data
  },

  // Recommendations initialized empty
  recommendations: [], // This will store the *mapped* UI structure

  // Processing time initialized null
  processingTime: null,

  // Any other top-level data keys the UI might expect
};

// Helper function to map backend recommendation format (array item) to UI expected format
const mapBackendCropToUI = (backendCrop, index) => ({
  id: index + 1, // Simple ID based on index
  name: backendCrop.crop_name || "Unknown Crop", // Use crop_name, fallback if missing
  // Placeholder image, replace with actual image logic if available
  image: `https://via.placeholder.com/500x300?text=${encodeURIComponent(
    (backendCrop.crop_name || "Crop").replace(" ", "+")
  )}`,
  suitability: null, // Suitability percentage is not in the provided JSON
  details: backendCrop, // The backend crop object *is* the detailed info needed for the dialog
});

const Results = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("crops");

  // State to hold the data displayed by the component
  const [resultData, setResultData] = useState(fallbackResultData);

  // Use useEffect to process data received via navigation state
  useEffect(() => {
    const stateData = location.state;

    console.log("Raw state data received:", stateData); // Log the raw state data for debugging

    if (stateData) {
      // Process Recommendations
      const backendRecommendationObject = stateData.recommendations;
      const backendRecommendationArray =
        backendRecommendationObject?.recommendations;
      const processingTime =
        backendRecommendationObject?.processing_time_seconds;
      const mappedRecommendations = backendRecommendationArray
        ? backendRecommendationArray.map(mapBackendCropToUI)
        : [];

      // Process Soil Data (Assuming it's already in a somewhat usable structure or needs minimal mapping)
      const soilDataFromState = stateData.soil;
      // You might need a mapping function for soil data similar to recommendations
      // const mappedSoilData = mapBackendSoilToUI(soilDataFromState);
      // For now, just merge or use directly:
      const processedSoilData = soilDataFromState
        ? { ...fallbackResultData.soilData, ...soilDataFromState }
        : fallbackResultData.soilData;

      // Process Weather Data using the new helper function
      const weatherDataFromState = stateData.weather;
      const processedWeatherData =
        calculateWeatherDataSummary(weatherDataFromState) ||
        fallbackResultData.weatherData; // Use fallback if calculation fails

      // Assuming location *might* be in the state, or defaults
      const locationFromState =
        stateData.location || fallbackResultData.location;

      // Update the state with processed data
      setResultData({
        location: locationFromState,
        soilData: processedSoilData,
        weatherData: processedWeatherData, // Use the processed weather data
        recommendations: mappedRecommendations,
        processingTime:
          processingTime !== undefined
            ? processingTime
            : fallbackResultData.processingTime,
      });
    } else {
      console.warn(
        "No result data found in navigation state. Displaying fallback data."
      );
      // State is already initialized with fallback data
    }
    // Dependency array: only re-run if the state object itself changes
    // Adding stateData as dependency ensures it reacts if state is pushed again
  }, [location.state]);

  // Optional: Separate effect to log state *after* it updates (for debugging)
  useEffect(() => {
    console.log("Current resultData state:", resultData);
  }, [resultData]);

  const handleDownloadReport = () => {
    console.log("Generating report with data:", resultData);
    alert("Downloading PDF report..."); // Placeholder action
  };

  // Render logic now uses the `resultData` state

  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
              Your Farming Recommendations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your specific soil conditions, location, and farming
              history, here are our AI-powered recommendations for optimal crop
              selection
              {resultData.processingTime !== null && (
                <span className="block text-sm text-gray-500 mt-2">
                  Analysis completed in {resultData.processingTime} seconds.
                </span>
              )}
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Button
              className="bg-farm-accent text-farm-dark hover:bg-farm-accent/80 font-medium"
              onClick={handleDownloadReport}
              // disabled={resultData.recommendations.length === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Report
            </Button>
          </div>

          <Tabs defaultValue="crops" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="crops">Recommended Crops</TabsTrigger>
              {/* Disable Soil/Weather tabs if data is largely missing */}
              {/* Improved check for weather data availability */}
              <TabsTrigger
                value="soil"
                disabled={
                  !resultData.soilData ||
                  (resultData.soilData.ph === null &&
                    resultData.soilData.texture === "N/A" &&
                    Object.values(resultData.soilData.nutrients || {}).every(
                      (val) => val === null
                    ))
                }
              >
                Soil Data
              </TabsTrigger>
              <TabsTrigger
                value="weather"
                disabled={
                  !resultData.weatherData ||
                  resultData.weatherData.temperature?.avg === null
                }
              >
                Weather Data
              </TabsTrigger>
            </TabsList>

            {/* Crops Tab - No changes needed as this already uses the mapped recommendations */}
            <TabsContent value="crops" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resultData.recommendations.length > 0 ? (
                  resultData.recommendations.map((crop) => (
                    <Card key={crop.id} className="farm-card overflow-hidden">
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://via.placeholder.com/500x300?text=Image+Unavailable";
                          }}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{crop.name}</CardTitle>
                        <CardDescription>
                          Recommended crop for your conditions
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>
                                {crop.details?.crop_name || "Crop Details"}
                              </DialogTitle>
                              <DialogDescription>
                                {crop.details?.crop_info ||
                                  "No crop information available."}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <h4 className="font-semibold">
                                Growing Information
                              </h4>
                              {crop.details?.growing_info ? (
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">
                                      Growing Season
                                    </p>
                                    <p>
                                      {crop.details.growing_info
                                        .growing_season || "N/A"}
                                    </p>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">
                                      Water Needs
                                    </p>
                                    <p>
                                      {crop.details.growing_info.water_needs ||
                                        "N/A"}
                                    </p>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">
                                      Soil Preference
                                    </p>
                                    <p>
                                      {crop.details.growing_info
                                        .soil_preference || "N/A"}
                                    </p>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">
                                      Harvest Time
                                    </p>
                                    <p>
                                      {crop.details.growing_info.harvest_time ||
                                        "N/A"}
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">
                                  Growing information not available.
                                </p>
                              )}

                              <div>
                                <h4 className="font-semibold">
                                  Expected Yield
                                </h4>
                                {crop.details?.expected_yield ? (
                                  <div className="bg-farm-light p-4 rounded-md mt-2">
                                    <p className="text-2xl font-bold text-farm-primary">
                                      {crop.details.expected_yield
                                        .in_tons_per_acre ?? "N/A"}
                                      <span className="text-base font-normal">
                                        {" "}
                                        tons/acre
                                      </span>
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm mt-2">
                                    Expected yield data not available.
                                  </p>
                                )}
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="bg-farm-primary hover:bg-farm-dark">
                                Save to Favorites
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="md:col-span-3 text-center text-gray-500 p-8 border rounded-md">
                    {location.state
                      ? "No crop recommendations found for the provided conditions."
                      : "Loading recommendations..."}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Soil Data Tab - Uses state data (fallback or potentially from state) */}
            <TabsContent value="soil" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Soil Analysis for {resultData.location}</CardTitle>
                  <CardDescription>
                    Understanding your soil composition helps optimize planting
                    decisions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">
                          General Properties
                        </h3>
                        {resultData.soilData &&
                        (resultData.soilData.ph !== null ||
                          resultData.soilData.texture !== "N/A" ||
                          resultData.soilData.nutrients?.organic !== null) ? (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">pH Level</p>
                              <p className="text-2xl font-semibold">
                                {resultData.soilData.ph ?? "N/A"}
                              </p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Texture</p>
                              <p className="text-2xl font-semibold">
                                {resultData.soilData.texture}
                              </p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">
                                Organic Content
                              </p>
                              <p className="text-2xl font-semibold">
                                {resultData.soilData.nutrients?.organic ??
                                  "N/A"}
                                {resultData.soilData.nutrients?.organic !== null
                                  ? "%"
                                  : ""}
                              </p>
                            </div>
                            {/* Add other general properties if available */}
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            No general soil property data available.
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Soil Recommendations
                        </h3>
                        {resultData.soilData?.soilRecommendations &&
                        resultData.soilData.soilRecommendations.length > 0 &&
                        resultData.soilData.soilRecommendations[0] !==
                          "No specific soil recommendations available." ? (
                          <ul className="space-y-2 text-sm">
                            {resultData.soilData.soilRecommendations.map(
                              (rec, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-farm-primary flex-shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                  </svg>
                                  <span>{rec}</span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-500">
                            No specific soil recommendations available.
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Nutrient Analysis
                      </h3>
                      {resultData.soilData?.nutrients &&
                      (resultData.soilData.nutrients.nitrogen !== null ||
                        resultData.soilData.nutrients.phosphorus !== null ||
                        resultData.soilData.nutrients.potassium !== null) ? (
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Nitrogen (N)
                              </span>
                              <span className="text-sm font-medium">
                                {resultData.soilData.nutrients.nitrogen ??
                                  "N/A"}
                                {resultData.soilData.nutrients.nitrogen !== null
                                  ? " ppm"
                                  : ""}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              {resultData.soilData.nutrients.nitrogen !==
                                null && (
                                <div
                                  className="bg-farm-primary h-2.5 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      (resultData.soilData.nutrients.nitrogen /
                                        100) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Phosphorus (P)
                              </span>
                              <span className="text-sm font-medium">
                                {resultData.soilData.nutrients.phosphorus ??
                                  "N/A"}
                                {resultData.soilData.nutrients.phosphorus !==
                                null
                                  ? " ppm"
                                  : ""}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              {resultData.soilData.nutrients.phosphorus !==
                                null && (
                                <div
                                  className="bg-farm-secondary h-2.5 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      (resultData.soilData.nutrients
                                        .phosphorus /
                                        100) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">
                                Potassium (K)
                              </span>
                              <span className="text-sm font-medium">
                                {resultData.soilData.nutrients.potassium ??
                                  "N/A"}
                                {resultData.soilData.nutrients.potassium !==
                                null
                                  ? " ppm"
                                  : ""}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              {resultData.soilData.nutrients.potassium !==
                                null && (
                                <div
                                  className="bg-farm-accent h-2.5 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      (resultData.soilData.nutrients.potassium /
                                        100) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          No detailed nutrient data available.
                        </p>
                      )}

                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">
                          Nutrient Chart
                        </h3>
                        <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
                          <p className="text-gray-500 text-center">
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

            {/* Weather Data Tab - Uses state data (fallback or potentially from state) */}
            <TabsContent value="weather" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Weather Conditions for {resultData.location}
                  </CardTitle>
                  <CardDescription>
                    Climate analysis and forecast for optimal crop planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Forecast Summary
                      </h3>{" "}
                      {/* Changed label */}
                      {resultData.weatherData &&
                      (resultData.weatherData.temperature?.avg !== null ||
                        resultData.weatherData.rainfall !== null ||
                        resultData.weatherData.humidity !== null ||
                        resultData.weatherData.windSpeed !== null) ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">
                              Average Temperature
                            </p>
                            {/* Use nullish coalescing operator ?? for safety */}
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.temperature?.avg ?? "N/A"}
                              {resultData.weatherData.temperatureUnit}
                            </p>
                            {/* Check min/max before displaying range */}
                            {resultData.weatherData.temperature?.min !== null &&
                              resultData.weatherData.temperature?.max !==
                                null && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Range:{" "}
                                  {resultData.weatherData.temperature.min}
                                  {
                                    resultData.weatherData.temperatureUnit
                                  } - {resultData.weatherData.temperature.max}
                                  {resultData.weatherData.temperatureUnit}
                                </p>
                              )}
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            {/* Updated label */}
                            <p className="text-sm text-gray-500">
                              Total Precipitation (Forecast)
                            </p>
                            {/* Use nullish coalescing */}
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.rainfall ?? "N/A"}
                              {resultData.weatherData.precipitationUnit}
                            </p>
                            {/* Static text - replace with dynamic if available */}
                            {resultData.weatherData.rainfall !== null && (
                              <p className="text-xs text-gray-500 mt-1">
                                Over forecast period
                              </p>
                            )}
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">
                              Average Humidity
                            </p>
                            {/* Use nullish coalescing */}
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.humidity ?? "N/A"}
                              {resultData.weatherData.humidityUnit}
                            </p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">
                              Average Wind Speed
                            </p>{" "}
                            {/* Changed label slightly */}
                            {/* Use nullish coalescing */}
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.windSpeed ?? "N/A"}
                              {resultData.weatherData.windSpeedUnit}
                            </p>
                            {/* Static text - replace with dynamic if available */}
                            {resultData.weatherData.windSpeed !== null && (
                              <p className="text-xs text-gray-500 mt-1">
                                Average of daily maximums
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          No current season weather data available.
                        </p>
                      )}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Climate Considerations
                        </h3>
                        {/* This section is static - you'd need specific data from the backend for this */}
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400 flex-shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>
                              Climate consideration data not available.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="lg font-semibold mb-4">
                        Seasonal Forecast
                      </h3>{" "}
                      {/* Changed label */}
                      {resultData.weatherData?.dailyForecast ||
                      resultData.weatherData?.hourlyForecast ? (
                        <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
                          {/* Integrate charting library here (e.g., Chart.js, Recharts) */}
                          <p className="text-gray-500 text-center">
                            Temperature and rainfall forecast chart
                            <br />
                            (Chart component would be integrated here using
                            dailyForecast/hourlyForecast)
                          </p>
                        </div>
                      ) : (
                        <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
                          <p className="text-gray-500 text-center">
                            Forecast data not available to display chart.
                          </p>
                        </div>
                      )}
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Weather Impact on Recommended Crops
                        </h3>
                        {/* This section is static - ideally would link to the *actual* recommendations */}
                        {resultData.recommendations.length > 0 ? (
                          <div className="space-y-3">
                            {resultData.recommendations.map((crop, index) => (
                              // Using mapped crop data for this section
                              <div
                                key={index}
                                className="p-3 border rounded-md"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">{crop.name}</p>
                                  {/* Suitability status not in new data */}
                                  <span
                                    className={`text-sm px-2 py-0.5 rounded-full ${
                                      index === 0
                                        ? "bg-green-100 text-green-800"
                                        : index === 1
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {index === 0
                                      ? "Highly Suitable"
                                      : index === 1
                                      ? "Moderately Suitable"
                                      : "Sufficiently Suitable"}
                                  </span>
                                </div>
                                {/* This text is static - ideally would be backend provided based on weather + crop */}
                                <p className="text-sm mt-1">
                                  Review crop details for weather
                                  considerations.
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 border rounded-md text-gray-500">
                            No recommended crops to show weather impact.
                          </div>
                        )}
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
