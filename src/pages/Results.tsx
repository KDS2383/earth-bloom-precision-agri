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

// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// // Define the expected structure of the data within the navigate state
// // This helps clarify what we expect to receive
// // type NavigationStateData = {
// //   recommendations?: { // The object containing the recommendations array and processing time
// //     recommendations: Array<{ /* ... crop properties ... */ }>;
// //     processing_time_seconds: number;
// //   };
// //   weather?: { // Structure matching the weather JSON you provided
// //       latitude: number;
// //       longitude: number;
// //       elevation: number;
// //       timezone: string;
// //       hourly_units: { time: string; relative_humidity_2m: string; /* ... other hourly units ... */ };
// //       hourly: { time: string[]; relative_humidity_2m: number[]; /* ... other hourly data ... */ };
// //       daily_units: { time: string; temperature_2m_max: string; temperature_2m_min: string; precipitation_sum: string; wind_speed_10m_max: string; /* ... other daily units ... */ };
// //       daily: { time: string[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_sum: number[]; wind_speed_10m_max: number[]; /* ... other daily data ... */ };
// //   };
// //   soil?: any; // Define a proper type for soil data if possible
// //   location?: string; // Assuming location *might* be passed here
// // };

// // Helper function to calculate summary weather data from the raw weather JSON
// const calculateWeatherDataSummary = (weatherData) => {
//   if (!weatherData || !weatherData.daily || !weatherData.hourly) {
//     return null; // Return null or a structured empty object if data is missing
//   }

//   const daily = weatherData.daily;
//   const hourly = weatherData.hourly;

//   // Temperature Summary
//   let avgTemp = null;
//   let minTemp = null;
//   let maxTemp = null;
//   if (
//     daily.temperature_2m_max &&
//     daily.temperature_2m_min &&
//     daily.temperature_2m_max.length > 0
//   ) {
//     const totalMax = daily.temperature_2m_max.reduce(
//       (sum, temp) => sum + temp,
//       0
//     );
//     const totalMin = daily.temperature_2m_min.reduce(
//       (sum, temp) => sum + temp,
//       0
//     );
//     avgTemp = (
//       (totalMax + totalMin) /
//       (daily.temperature_2m_max.length * 2)
//     ).toFixed(1); // Average of all daily min/maxes
//     minTemp = Math.min(...daily.temperature_2m_min); // Overall minimum temp
//     maxTemp = Math.max(...daily.temperature_2m_max); // Overall maximum temp
//   }

//   // Precipitation Summary
//   let totalPrecipitation = null;
//   if (daily.precipitation_sum && daily.precipitation_sum.length > 0) {
//     totalPrecipitation = daily.precipitation_sum
//       .reduce((sum, precip) => sum + precip, 0)
//       .toFixed(2); // Sum of daily precipitation
//   }

//   // Humidity Summary (using hourly data)
//   let avgHumidity = null;
//   if (hourly.relative_humidity_2m && hourly.relative_humidity_2m.length > 0) {
//     const totalHumidity = hourly.relative_humidity_2m.reduce(
//       (sum, humidity) => sum + humidity,
//       0
//     );
//     avgHumidity = (totalHumidity / hourly.relative_humidity_2m.length).toFixed(
//       0
//     ); // Average hourly humidity, rounded
//   }

//   // Wind Speed Summary (using daily max wind speed)
//   let avgWindSpeed = null;
//   if (daily.wind_speed_10m_max && daily.wind_speed_10m_max.length > 0) {
//     const totalWindSpeed = daily.wind_speed_10m_max.reduce(
//       (sum, speed) => sum + speed,
//       0
//     );
//     avgWindSpeed = (totalWindSpeed / daily.wind_speed_10m_max.length).toFixed(
//       1
//     ); // Average of daily max wind speeds
//   }

//   // Return the structured summary data
//   return {
//     temperature: {
//       avg: avgTemp,
//       min: minTemp,
//       max: maxTemp,
//     },
//     rainfall: totalPrecipitation, // Renamed from rainfall to precipitation for accuracy
//     humidity: avgHumidity,
//     windSpeed: avgWindSpeed,
//     // Keep original units if needed, but hardcoding them based on your JSON is fine for now
//     temperatureUnit: weatherData.daily_units?.temperature_2m_max || "°C",
//     precipitationUnit: weatherData.daily_units?.precipitation_sum || "mm",
//     humidityUnit: weatherData.hourly_units?.relative_humidity_2m || "%",
//     windSpeedUnit: weatherData.daily_units?.wind_speed_10m_max || "km/h",
//     // You can add daily/hourly arrays here if you want to pass them to a chart component later
//     dailyForecast: daily,
//     hourlyForecast: hourly,
//   };
// };

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
//       organic: null,
//     },
//     soilRecommendations: ["No specific soil recommendations available."], // Default recommendations
//     // Add any other soil fields expected by the UI here with defaults
//   },

//   // Default structure for weather data if not provided or processing fails
//   weatherData: {
//     temperature: { avg: null, min: null, max: null },
//     rainfall: null, // Changed from rainfall to match summary structure
//     humidity: null,
//     windSpeed: null,
//     temperatureUnit: "°C",
//     precipitationUnit: "mm",
//     humidityUnit: "%",
//     windSpeedUnit: "km/h",
//     dailyForecast: null, // Placeholder for full forecast data
//     hourlyForecast: null, // Placeholder for full forecast data
//   },

//   // Recommendations initialized empty
//   recommendations: [], // This will store the *mapped* UI structure

//   // Processing time initialized null
//   processingTime: null,

//   // Any other top-level data keys the UI might expect
// };

// // Helper function to map backend recommendation format (array item) to UI expected format
// const mapBackendCropToUI = (backendCrop, index) => ({
//   id: index + 1, // Simple ID based on index
//   name: backendCrop.crop_name || "Unknown Crop", // Use crop_name, fallback if missing
//   // Placeholder image, replace with actual image logic if available
//   image: `https://via.placeholder.com/500x300?text=${encodeURIComponent(
//     (backendCrop.crop_name || "Crop").replace(" ", "+")
//   )}`,
//   suitability: null, // Suitability percentage is not in the provided JSON
//   details: backendCrop, // The backend crop object *is* the detailed info needed for the dialog
// });

// const Results = () => {
//   const location = useLocation();
//   const [activeTab, setActiveTab] = useState("crops");

//   // State to hold the data displayed by the component
//   const [resultData, setResultData] = useState(fallbackResultData);

//   // Use useEffect to process data received via navigation state
//   useEffect(() => {
//     const stateData = location.state;

//     console.log("Raw state data received:", stateData); // Log the raw state data for debugging

//     if (stateData) {
//       // Process Recommendations
//       const backendRecommendationObject = stateData.recommendations;
//       const backendRecommendationArray =
//         backendRecommendationObject?.recommendations;
//       const processingTime =
//         backendRecommendationObject?.processing_time_seconds;
//       const mappedRecommendations = backendRecommendationArray
//         ? backendRecommendationArray.map(mapBackendCropToUI)
//         : [];

//       // Process Soil Data (Assuming it's already in a somewhat usable structure or needs minimal mapping)
//       const soilDataFromState = stateData.soil;
//       // You might need a mapping function for soil data similar to recommendations
//       // const mappedSoilData = mapBackendSoilToUI(soilDataFromState);
//       // For now, just merge or use directly:
//       const processedSoilData = soilDataFromState
//         ? { ...fallbackResultData.soilData, ...soilDataFromState }
//         : fallbackResultData.soilData;

//       // Process Weather Data using the new helper function
//       const weatherDataFromState = stateData.weather;
//       const processedWeatherData =
//         calculateWeatherDataSummary(weatherDataFromState) ||
//         fallbackResultData.weatherData; // Use fallback if calculation fails

//       // Assuming location *might* be in the state, or defaults
//       const locationFromState =
//         stateData.location || fallbackResultData.location;

//       // Update the state with processed data
//       setResultData({
//         location: locationFromState,
//         soilData: processedSoilData,
//         weatherData: processedWeatherData, // Use the processed weather data
//         recommendations: mappedRecommendations,
//         processingTime:
//           processingTime !== undefined
//             ? processingTime
//             : fallbackResultData.processingTime,
//       });
//     } else {
//       console.warn(
//         "No result data found in navigation state. Displaying fallback data."
//       );
//       // State is already initialized with fallback data
//     }
//     // Dependency array: only re-run if the state object itself changes
//     // Adding stateData as dependency ensures it reacts if state is pushed again
//   }, [location.state]);

//   // Optional: Separate effect to log state *after* it updates (for debugging)
//   useEffect(() => {
//     console.log("Current resultData state:", resultData);
//   }, [resultData]);

//   const handleDownloadReport = () => {
//     console.log("Generating report with data:", resultData);
//     alert("Downloading PDF report..."); // Placeholder action
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
//               Based on your specific soil conditions, location, and farming
//               history, here are our AI-powered recommendations for optimal crop
//               selection
//               {resultData.processingTime !== null && (
//                 <span className="block text-sm text-gray-500 mt-2">
//                   Analysis completed in {resultData.processingTime} seconds.
//                 </span>
//               )}
//             </p>
//           </div>

//           <div className="flex justify-end mb-6">
//             <Button
//               className="bg-farm-accent text-farm-dark hover:bg-farm-accent/80 font-medium"
//               onClick={handleDownloadReport}
//               // disabled={resultData.recommendations.length === 0}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="mr-2"
//               >
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 0 0 1-2-2v-4" />
//                 <polyline points="7 10 12 15 17 10" />
//                 <line x1="12" y1="15" x2="12" y2="3" />
//               </svg>
//               Download Report
//             </Button>
//           </div>

//           <Tabs defaultValue="crops" onValueChange={setActiveTab}>
//             <TabsList className="w-full grid grid-cols-3 mb-8">
//               <TabsTrigger value="crops">Recommended Crops</TabsTrigger>
//               {/* Disable Soil/Weather tabs if data is largely missing */}
//               {/* Improved check for weather data availability */}
//               <TabsTrigger
//                 value="soil"
//                 disabled={
//                   !resultData.soilData ||
//                   (resultData.soilData.ph === null &&
//                     resultData.soilData.texture === "N/A" &&
//                     Object.values(resultData.soilData.nutrients || {}).every(
//                       (val) => val === null
//                     ))
//                 }
//               >
//                 Soil Data
//               </TabsTrigger>
//               <TabsTrigger
//                 value="weather"
//                 disabled={
//                   !resultData.weatherData ||
//                   resultData.weatherData.temperature?.avg === null
//                 }
//               >
//                 Weather Data
//               </TabsTrigger>
//             </TabsList>

//             {/* Crops Tab - No changes needed as this already uses the mapped recommendations */}
//             <TabsContent value="crops" className="animate-fade-in">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {resultData.recommendations.length > 0 ? (
//                   resultData.recommendations.map((crop) => (
//                     <Card key={crop.id} className="farm-card overflow-hidden">
//                       <div className="h-48 overflow-hidden relative">
//                         <img
//                           src={crop.image}
//                           alt={crop.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             const target = e.target as HTMLImageElement;
//                             target.onerror = null;
//                             target.src =
//                               "https://via.placeholder.com/500x300?text=Image+Unavailable";
//                           }}
//                         />
//                       </div>
//                       <CardHeader>
//                         <CardTitle>{crop.name}</CardTitle>
//                         <CardDescription>
//                           Recommended crop for your conditions
//                         </CardDescription>
//                       </CardHeader>
//                       <CardFooter>
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button variant="outline" className="w-full">
//                               View Details
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="sm:max-w-lg">
//                             <DialogHeader>
//                               <DialogTitle>
//                                 {crop.details?.crop_name || "Crop Details"}
//                               </DialogTitle>
//                               <DialogDescription>
//                                 {crop.details?.crop_info ||
//                                   "No crop information available."}
//                               </DialogDescription>
//                             </DialogHeader>
//                             <div className="space-y-4">
//                               <h4 className="font-semibold">
//                                 Growing Information
//                               </h4>
//                               {crop.details?.growing_info ? (
//                                 <div className="grid grid-cols-2 gap-2 text-sm">
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">
//                                       Growing Season
//                                     </p>
//                                     <p>
//                                       {crop.details.growing_info
//                                         .growing_season || "N/A"}
//                                     </p>
//                                   </div>
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">
//                                       Water Needs
//                                     </p>
//                                     <p>
//                                       {crop.details.growing_info.water_needs ||
//                                         "N/A"}
//                                     </p>
//                                   </div>
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">
//                                       Soil Preference
//                                     </p>
//                                     <p>
//                                       {crop.details.growing_info
//                                         .soil_preference || "N/A"}
//                                     </p>
//                                   </div>
//                                   <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
//                                     <p className="font-medium text-farm-primary mb-1">
//                                       Harvest Time
//                                     </p>
//                                     <p>
//                                       {crop.details.growing_info.harvest_time ||
//                                         "N/A"}
//                                     </p>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <p className="text-gray-500 text-sm">
//                                   Growing information not available.
//                                 </p>
//                               )}

//                               <div>
//                                 <h4 className="font-semibold">
//                                   Expected Yield
//                                 </h4>
//                                 {crop.details?.expected_yield ? (
//                                   <div className="bg-farm-light p-4 rounded-md mt-2">
//                                     <p className="text-2xl font-bold text-farm-primary">
//                                       {crop.details.expected_yield
//                                         .in_tons_per_acre ?? "N/A"}
//                                       <span className="text-base font-normal">
//                                         {" "}
//                                         tons/acre
//                                       </span>
//                                     </p>
//                                   </div>
//                                 ) : (
//                                   <p className="text-gray-500 text-sm mt-2">
//                                     Expected yield data not available.
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                             <DialogFooter>
//                               <Button className="bg-farm-primary hover:bg-farm-dark">
//                                 Save to Favorites
//                               </Button>
//                             </DialogFooter>
//                           </DialogContent>
//                         </Dialog>
//                       </CardFooter>
//                     </Card>
//                   ))
//                 ) : (
//                   <div className="md:col-span-3 text-center text-gray-500 p-8 border rounded-md">
//                     {location.state
//                       ? "No crop recommendations found for the provided conditions."
//                       : "Loading recommendations..."}
//                   </div>
//                 )}
//               </div>
//             </TabsContent>

//             {/* Soil Data Tab - Uses state data (fallback or potentially from state) */}
//             <TabsContent value="soil" className="animate-fade-in">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Soil Analysis for {resultData.location}</CardTitle>
//                   <CardDescription>
//                     Understanding your soil composition helps optimize planting
//                     decisions
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <div className="mb-6">
//                         <h3 className="text-lg font-semibold mb-2">
//                           General Properties
//                         </h3>
//                         {resultData.soilData &&
//                         (resultData.soilData.ph !== null ||
//                           resultData.soilData.texture !== "N/A" ||
//                           resultData.soilData.nutrients?.organic !== null) ? (
//                           <div className="grid grid-cols-2 gap-4">
//                             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                               <p className="text-sm text-gray-500">pH Level</p>
//                               <p className="text-2xl font-semibold">
//                                 {resultData.soilData.ph ?? "N/A"}
//                               </p>
//                             </div>
//                             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                               <p className="text-sm text-gray-500">Texture</p>
//                               <p className="text-2xl font-semibold">
//                                 {resultData.soilData.texture}
//                               </p>
//                             </div>
//                             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                               <p className="text-sm text-gray-500">
//                                 Organic Content
//                               </p>
//                               <p className="text-2xl font-semibold">
//                                 {resultData.soilData.nutrients?.organic ??
//                                   "N/A"}
//                                 {resultData.soilData.nutrients?.organic !== null
//                                   ? "%"
//                                   : ""}
//                               </p>
//                             </div>
//                             {/* Add other general properties if available */}
//                           </div>
//                         ) : (
//                           <p className="text-gray-500">
//                             No general soil property data available.
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <h3 className="text-lg font-semibold mb-2">
//                           Soil Recommendations
//                         </h3>
//                         {resultData.soilData?.soilRecommendations &&
//                         resultData.soilData.soilRecommendations.length > 0 &&
//                         resultData.soilData.soilRecommendations[0] !==
//                           "No specific soil recommendations available." ? (
//                           <ul className="space-y-2 text-sm">
//                             {resultData.soilData.soilRecommendations.map(
//                               (rec, index) => (
//                                 <li
//                                   key={index}
//                                   className="flex items-start gap-2"
//                                 >
//                                   <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-5 w-5 text-farm-primary flex-shrink-0"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                   >
//                                     <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//                                     <polyline points="22 4 12 14.01 9 11.01" />
//                                   </svg>
//                                   <span>{rec}</span>
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         ) : (
//                           <p className="text-gray-500">
//                             No specific soil recommendations available.
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">
//                         Nutrient Analysis
//                       </h3>
//                       {resultData.soilData?.nutrients &&
//                       (resultData.soilData.nutrients.nitrogen !== null ||
//                         resultData.soilData.nutrients.phosphorus !== null ||
//                         resultData.soilData.nutrients.potassium !== null) ? (
//                         <div className="space-y-4">
//                           <div>
//                             <div className="flex justify-between mb-1">
//                               <span className="text-sm font-medium">
//                                 Nitrogen (N)
//                               </span>
//                               <span className="text-sm font-medium">
//                                 {resultData.soilData.nutrients.nitrogen ??
//                                   "N/A"}
//                                 {resultData.soilData.nutrients.nitrogen !== null
//                                   ? " ppm"
//                                   : ""}
//                               </span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                               {resultData.soilData.nutrients.nitrogen !==
//                                 null && (
//                                 <div
//                                   className="bg-farm-primary h-2.5 rounded-full"
//                                   style={{
//                                     width: `${Math.min(
//                                       (resultData.soilData.nutrients.nitrogen /
//                                         100) *
//                                         100,
//                                       100
//                                     )}%`,
//                                   }}
//                                 ></div>
//                               )}
//                             </div>
//                           </div>

//                           <div>
//                             <div className="flex justify-between mb-1">
//                               <span className="text-sm font-medium">
//                                 Phosphorus (P)
//                               </span>
//                               <span className="text-sm font-medium">
//                                 {resultData.soilData.nutrients.phosphorus ??
//                                   "N/A"}
//                                 {resultData.soilData.nutrients.phosphorus !==
//                                 null
//                                   ? " ppm"
//                                   : ""}
//                               </span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                               {resultData.soilData.nutrients.phosphorus !==
//                                 null && (
//                                 <div
//                                   className="bg-farm-secondary h-2.5 rounded-full"
//                                   style={{
//                                     width: `${Math.min(
//                                       (resultData.soilData.nutrients
//                                         .phosphorus /
//                                         100) *
//                                         100,
//                                       100
//                                     )}%`,
//                                   }}
//                                 ></div>
//                               )}
//                             </div>
//                           </div>

//                           <div>
//                             <div className="flex justify-between mb-1">
//                               <span className="text-sm font-medium">
//                                 Potassium (K)
//                               </span>
//                               <span className="text-sm font-medium">
//                                 {resultData.soilData.nutrients.potassium ??
//                                   "N/A"}
//                                 {resultData.soilData.nutrients.potassium !==
//                                 null
//                                   ? " ppm"
//                                   : ""}
//                               </span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                               {resultData.soilData.nutrients.potassium !==
//                                 null && (
//                                 <div
//                                   className="bg-farm-accent h-2.5 rounded-full"
//                                   style={{
//                                     width: `${Math.min(
//                                       (resultData.soilData.nutrients.potassium /
//                                         100) *
//                                         100,
//                                       100
//                                     )}%`,
//                                   }}
//                                 ></div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <p className="text-gray-500">
//                           No detailed nutrient data available.
//                         </p>
//                       )}

//                       <div className="mt-8">
//                         <h3 className="text-lg font-semibold mb-2">
//                           Nutrient Chart
//                         </h3>
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
//                   <CardTitle>
//                     Weather Conditions for {resultData.location}
//                   </CardTitle>
//                   <CardDescription>
//                     Climate analysis and forecast for optimal crop planning
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold mb-4">
//                         Forecast Summary
//                       </h3>{" "}
//                       {/* Changed label */}
//                       {resultData.weatherData &&
//                       (resultData.weatherData.temperature?.avg !== null ||
//                         resultData.weatherData.rainfall !== null ||
//                         resultData.weatherData.humidity !== null ||
//                         resultData.weatherData.windSpeed !== null) ? (
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                             <p className="text-sm text-gray-500">
//                               Average Temperature
//                             </p>
//                             {/* Use nullish coalescing operator ?? for safety */}
//                             <p className="text-2xl font-semibold">
//                               {resultData.weatherData.temperature?.avg ?? "N/A"}
//                               {resultData.weatherData.temperatureUnit}
//                             </p>
//                             {/* Check min/max before displaying range */}
//                             {resultData.weatherData.temperature?.min !== null &&
//                               resultData.weatherData.temperature?.max !==
//                                 null && (
//                                 <p className="text-xs text-gray-500 mt-1">
//                                   Range:{" "}
//                                   {resultData.weatherData.temperature.min}
//                                   {
//                                     resultData.weatherData.temperatureUnit
//                                   } - {resultData.weatherData.temperature.max}
//                                   {resultData.weatherData.temperatureUnit}
//                                 </p>
//                               )}
//                           </div>
//                           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                             {/* Updated label */}
//                             <p className="text-sm text-gray-500">
//                               Total Precipitation (Forecast)
//                             </p>
//                             {/* Use nullish coalescing */}
//                             <p className="text-2xl font-semibold">
//                               {resultData.weatherData.rainfall ?? "N/A"}
//                               {resultData.weatherData.precipitationUnit}
//                             </p>
//                             {/* Static text - replace with dynamic if available */}
//                             {resultData.weatherData.rainfall !== null && (
//                               <p className="text-xs text-gray-500 mt-1">
//                                 Over forecast period
//                               </p>
//                             )}
//                           </div>
//                           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                             <p className="text-sm text-gray-500">
//                               Average Humidity
//                             </p>
//                             {/* Use nullish coalescing */}
//                             <p className="text-2xl font-semibold">
//                               {resultData.weatherData.humidity ?? "N/A"}
//                               {resultData.weatherData.humidityUnit}
//                             </p>
//                           </div>
//                           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
//                             <p className="text-sm text-gray-500">
//                               Average Wind Speed
//                             </p>{" "}
//                             {/* Changed label slightly */}
//                             {/* Use nullish coalescing */}
//                             <p className="text-2xl font-semibold">
//                               {resultData.weatherData.windSpeed ?? "N/A"}
//                               {resultData.weatherData.windSpeedUnit}
//                             </p>
//                             {/* Static text - replace with dynamic if available */}
//                             {resultData.weatherData.windSpeed !== null && (
//                               <p className="text-xs text-gray-500 mt-1">
//                                 Average of daily maximums
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       ) : (
//                         <p className="text-gray-500">
//                           No current season weather data available.
//                         </p>
//                       )}
//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold mb-2">
//                           Climate Considerations
//                         </h3>
//                         {/* This section is static - you'd need specific data from the backend for this */}
//                         <ul className="space-y-2 text-sm">
//                           <li className="flex items-start gap-2 text-gray-500">
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5 text-gray-400 flex-shrink-0"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <circle cx="12" cy="12" r="10"></circle>
//                               <line x1="12" y1="8" x2="12" y2="12"></line>
//                               <line x1="12" y1="16" x2="12.01" y2="16"></line>
//                             </svg>
//                             <span>
//                               Climate consideration data not available.
//                             </span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="lg font-semibold mb-4">
//                         Seasonal Forecast
//                       </h3>{" "}
//                       {/* Changed label */}
//                       {resultData.weatherData?.dailyForecast ||
//                       resultData.weatherData?.hourlyForecast ? (
//                         <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
//                           {/* Integrate charting library here (e.g., Chart.js, Recharts) */}
//                           <p className="text-gray-500 text-center">
//                             Temperature and rainfall forecast chart
//                             <br />
//                             (Chart component would be integrated here using
//                             dailyForecast/hourlyForecast)
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
//                           <p className="text-gray-500 text-center">
//                             Forecast data not available to display chart.
//                           </p>
//                         </div>
//                       )}
//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold mb-2">
//                           Weather Impact on Recommended Crops
//                         </h3>
//                         {/* This section is static - ideally would link to the *actual* recommendations */}
//                         {resultData.recommendations.length > 0 ? (
//                           <div className="space-y-3">
//                             {resultData.recommendations.map((crop, index) => (
//                               // Using mapped crop data for this section
//                               <div
//                                 key={index}
//                                 className="p-3 border rounded-md"
//                               >
//                                 <div className="flex items-center justify-between">
//                                   <p className="font-medium">{crop.name}</p>
//                                   {/* Suitability status not in new data */}
//                                   <span
//                                     className={`text-sm px-2 py-0.5 rounded-full ${
//                                       index === 0
//                                         ? "bg-green-100 text-green-800"
//                                         : index === 1
//                                         ? "bg-yellow-100 text-yellow-800"
//                                         : "bg-red-100 text-red-800"
//                                     }`}
//                                   >
//                                     {index === 0
//                                       ? "Highly Suitable"
//                                       : index === 1
//                                       ? "Moderately Suitable"
//                                       : "Sufficiently Suitable"}
//                                   </span>
//                                 </div>
//                                 {/* This text is static - ideally would be backend provided based on weather + crop */}
//                                 <p className="text-sm mt-1">
//                                   Review crop details for weather
//                                   considerations.
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         ) : (
//                           <div className="p-3 border rounded-md text-gray-500">
//                             No recommended crops to show weather impact.
//                           </div>
//                         )}
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
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const PEXELS_API_KEY = "rDoxXAyfz5Ofm67yIzRmbNhPVtDQh2ZqbfHWSit9yMEQmLKyGVebOipT";

// Import Chart.js components and types
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData, // Import ChartData type
  ChartOptions, // Import ChartOptions type
  ChartTypeRegistry, // Import ChartTypeRegistry type for generic types
  PluginOptionsByType, // Import for plugin options
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to calculate summary weather data from the raw weather JSON
const calculateWeatherDataSummary = (weatherData) => {
  if (!weatherData || !weatherData.daily || !weatherData.hourly) {
    return null;
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
    ).toFixed(1);
    minTemp = Math.min(...daily.temperature_2m_min);
    maxTemp = Math.max(...daily.temperature_2m_max);
  }

  // Precipitation Summary
  let totalPrecipitation = null;
  if (daily.precipitation_sum && daily.precipitation_sum.length > 0) {
    totalPrecipitation = daily.precipitation_sum
      .reduce((sum, precip) => sum + precip, 0)
      .toFixed(2);
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
    );
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
    );
  }

  return {
    temperature: { avg: avgTemp, min: minTemp, max: maxTemp },
    rainfall: totalPrecipitation,
    humidity: avgHumidity,
    windSpeed: avgWindSpeed,
    temperatureUnit: weatherData.daily_units?.temperature_2m_max || "°C",
    precipitationUnit: weatherData.daily_units?.precipitation_sum || "mm",
    humidityUnit: weatherData.hourly_units?.relative_humidity_2m || "%",
    windSpeedUnit: weatherData.daily_units?.wind_speed_10m_max || "km/h",
    dailyForecast: daily, // Include full daily data
    hourlyForecast: hourly, // Include full hourly data
  };
};

// Define fallback/default data structure for the component's state
const fallbackResultData = {
  location: "Analyzed Location",
  soilData: {
    ph: null,
    texture: "N/A",
    nutrients: {
      nitrogen: null,
      phosphorus: null,
      potassium: null,
      organic: null,
    },
    soilRecommendations: ["No specific soil recommendations available."],
  },
  weatherData: {
    temperature: { avg: null, min: null, max: null },
    rainfall: null,
    humidity: null,
    windSpeed: null,
    temperatureUnit: "°C",
    precipitationUnit: "mm",
    humidityUnit: "%",
    windSpeedUnit: "km/h",
    dailyForecast: null,
    hourlyForecast: null,
  },
  recommendations: [],
  processingTime: null,
};

// Helper function to map backend recommendation format (array item) to UI expected format
// Helper function to map backend recommendation format (array item) to UI expected format
const mapBackendCropToUI = (backendCrop, index) => {
  let cropName = backendCrop.crop_name || "Unknown Crop";

  // --- Clean the crop name BEFORE lookup ---
  let cleanName = cropName.replace(/\(.*?\)/g, '').trim();
  // Remove common suffixes explicitly (case-insensitive)
  cleanName = cleanName.replace(/ - another variety/i, '').trim();
  cleanName = cleanName.replace(/ - adaptability considerations/i, '').trim();
  // Handle specific renames based on your data list
  if (cleanName === "Peanut") cleanName = "Groundnut";
  if (cleanName === "Maize") cleanName = "Corn"; // Assuming Corn is the primary key you used
  if (cleanName === "Rapeseed") cleanName = "Canola"; // Assuming Canola is the key

  // Lookup in the map using the CLEANED name
  const imageUrl = cropImageMap[cleanName] || PLACEHOLDER_IMAGE_URL; // Use map, fallback to placeholder

  return {
      id: index + 1,
      name: cropName, // Display the original name from backend
      image: imageUrl, // Use the URL from the map or the placeholder
      suitability: null, // Not available from backend
      details: backendCrop, // Keep original details object
  };
};


// Helper function to fetch image URL from Pexels
// Helper function to fetch image URL from Pexels (with improved query)
// Helper function to fetch image URL from Pexels (Further Improved Query)
async function fetchCropImageFromPexels(cropName: string): Promise<string | null> {
  if (!PEXELS_API_KEY || PEXELS_API_KEY === "YOUR_PEXELS_API_KEY") {
      console.warn("Pexels API key not set. Skipping image fetch for", cropName);
      return null;
  }

  const headers = { Authorization: PEXELS_API_KEY };

  // --- Clean the base crop name more aggressively ---
  let baseQuery = cropName;
  // Remove parenthetical additions
  baseQuery = baseQuery.replace(/\(.*?\)/g, '').trim();
  // Remove common suffixes explicitly (case-insensitive)
  baseQuery = baseQuery.replace(/ - another variety/i, '').trim();
  baseQuery = baseQuery.replace(/ - adaptability considerations/i, '').trim();
  baseQuery = baseQuery.replace(/ plant/i, '').trim(); // Remove if 'plant' is already part of name
  baseQuery = baseQuery.replace(/ crop/i, '').trim(); // Remove if 'crop' is already part of name

  // Handle potentially very long names if needed (optional)
  // if (baseQuery.length > 50) { baseQuery = baseQuery.substring(0, 50).trim(); }

  // --- Construct MORE specific queries, ordered by likely relevance ---
  const queriesToTry = [
      // Most specific first (e.g., "Tomato fruit", "Wheat field")
      `${baseQuery} fruit`,       // Good for things often shown as fruit/veg
      `${baseQuery} vegetable`,   // Good for vegetables
      `${baseQuery} grain`,       // Good for cereal crops
      `${baseQuery} field ${baseQuery}`, // Emphasize the crop name again with field context
      `${baseQuery} plant growing`,// Focus on the growing plant
      `${baseQuery} harvest`,      // Harvested produce
      `${baseQuery} crop`,         // Explicitly add "crop" if not present
      `${baseQuery} agriculture`, // General context
      baseQuery                    // Simplest fallback
  ];

  // Remove duplicate queries if cleaning resulted in overlap
  const uniqueQueries = [...new Set(queriesToTry)];

  let imageUrl: string | null = null;

  for (const query of uniqueQueries) {
      // Skip empty queries that might result from cleaning
      if (!query) continue;

      console.log(`Attempting Pexels search for: "${query}"`);
      // Limit results, landscape orientation is often good for fields/plants
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

      try {
          const response = await fetch(url, { headers: headers, signal: AbortSignal.timeout(8000) });
          if (!response.ok) {
              console.error(`Pexels API Error for query "${query}": ${response.status} ${response.statusText}`);
              const errorBody = await response.text();
              console.error("Pexels Error Body:", errorBody);
              continue; // Try the next query
          }
          const data = await response.json();

          if (data?.photos?.length > 0) {
              const foundUrl = data.photos[0]?.src?.large || data.photos[0]?.src?.medium;
              if (foundUrl) {
                  imageUrl = foundUrl;
                  console.log(`SUCCESS: Found image for query "${query}": ${imageUrl}`);
                  break; // !!!!! USE THE FIRST SUCCESSFUL RESULT !!!!!
              }
          } else {
              console.log(`No image found on Pexels for query: "${query}"`);
          }
      } catch (error: any) {
          if (error.name === 'AbortError') {
               console.error(`Error fetching image for query "${query}": Pexels API request timed out.`);
          } else {
              console.error(`Error fetching image for query "${query}" from Pexels:`, error);
          }
      }
  }

  if (!imageUrl) {
       console.warn(`Failed to find any relevant image for "${cropName}" after trying multiple queries.`);
       // Return a default placeholder if NO image is found after all attempts
       imageUrl = `https://via.placeholder.com/500x300?text=${encodeURIComponent(baseQuery.replace(' ', '+'))}+Not+Found`;
  }

  return imageUrl;
}

// --- Your Results Component ---
// const Results = () => { ... } // No changes needed inside the component itself

const Results = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("crops");
  const [resultData, setResultData] = useState(fallbackResultData);


  // useEffect to process data received via navigation state (Simplified)
  useEffect(() => {
    const stateData = location.state;
    console.log("Raw state data received:", stateData);

    if (stateData) {
      // Process Recommendations
      const backendRecommendationObject = stateData.recommendations;
      const backendRecommendationArray = backendRecommendationObject?.recommendations;
      const processingTime = backendRecommendationObject?.processing_time_seconds;

      // Map using the updated mapBackendCropToUI function which now uses the static map
      const mappedRecommendations = backendRecommendationArray
        ? backendRecommendationArray.map(mapBackendCropToUI)
        : [];

      // Process Soil Data
      const soilDataFromState = stateData.soil;
      const processedSoilData = soilDataFromState
        ? { ...fallbackResultData.soilData, ...soilDataFromState }
        : fallbackResultData.soilData;

      // Process Weather Data
      const weatherDataFromState = stateData.weather;
      const processedWeatherData =
        calculateWeatherDataSummary(weatherDataFromState) ||
        fallbackResultData.weatherData;

      const locationFromState = stateData.location || fallbackResultData.location;

      // --- Set final state ---
      setResultData({
        location: locationFromState,
        soilData: processedSoilData,
        weatherData: processedWeatherData,
        recommendations: mappedRecommendations, // Use the mapped recommendations with correct images
        processingTime: processingTime !== undefined ? processingTime : fallbackResultData.processingTime,
      });

    } else {
      console.warn("No result data found in navigation state. Displaying fallback data.");
      setResultData(fallbackResultData); // Reset to fallback if needed
    }
  }, [location.state]);
  // --- Chart Data and Options ---
  // Use useMemo to memoize chart data and options
  const { chartData, chartOptions, hasWeatherDataForChart } = useMemo(() => {
    const daily = resultData.weatherData?.dailyForecast;
    const precipitationUnit = resultData.weatherData?.precipitationUnit || "mm";
    const temperatureUnit = resultData.weatherData?.temperatureUnit || "°C";

    // Check if we have enough data to render the chart
    const hasData =
      daily &&
      daily.time?.length > 0 &&
      daily.temperature_2m_max?.length === daily.time.length &&
      daily.temperature_2m_min?.length === daily.time.length &&
      daily.precipitation_sum?.length === daily.time.length;

    if (!hasData) {
      return {
        chartData: null,
        chartOptions: null,
        hasWeatherDataForChart: false,
      };
    }

    // Prepare chart data - Explicitly type with ChartData
    const data: ChartData<keyof ChartTypeRegistry> = {
      labels: daily.time.map((t) => {
        // Format date labels (e.g., "Apr 22")
        const date = new Date(t);
        return `${date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`;
      }),
      datasets: [
        {
          type: "line" as const, // Use 'as const' to assert the literal type
          label: `Max Temp (${temperatureUnit})`,
          data: daily.temperature_2m_max,
          borderColor: "rgb(255, 99, 132)", // Reddish
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y-temp", // Link to temperature Y-axis
          tension: 0.3, // Add some curve
          pointRadius: 5,
          pointHoverRadius: 7,
          // Make sure to include only properties valid for 'line' type datasets
          // and exclude properties specific to 'bar' or other types.
          // TypeScript checks help here.
        },
        {
          type: "line" as const, // Use 'as const'
          label: `Min Temp (${temperatureUnit})`,
          data: daily.temperature_2m_min,
          borderColor: "rgb(53, 162, 235)", // Bluish
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          yAxisID: "y-temp", // Link to temperature Y-axis
          tension: 0.3,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          type: "bar" as const, // Use 'as const'
          label: `Precipitation (${precipitationUnit})`,
          data: daily.precipitation_sum,
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal
          borderColor: "rgba(75, 192, 192, 1)",
          yAxisID: "y-precip", // Link to precipitation Y-axis
          barThickness: "flex",
          categoryPercentage: 0.7,
          barPercentage: 0.8,
          // Make sure to include only properties valid for 'bar' type datasets
        },
      ],
    };

    // Prepare chart options - Explicitly type with ChartOptions
    const options: ChartOptions<keyof ChartTypeRegistry> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const, // Use 'as const' or the literal type
        },
        title: {
          display: true,
          text: "Daily Temperature & Precipitation Forecast",
        },
        tooltip: {
          // Customize tooltips
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
        "y-temp": {
          // Temperature Y-axis
          type: "linear" as const, // Use 'as const'
          position: "left" as const, // Use 'as const'
          title: {
            display: true,
            text: `Temperature (${temperatureUnit})`,
          },
        },
        "y-precip": {
          // Precipitation Y-axis
          type: "linear" as const, // Use 'as const'
          position: "right" as const, // Use 'as const'
          title: {
            display: true,
            text: `Precipitation (${precipitationUnit})`,
          },
          min: 0,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      // Include any other options specific to the chart types if needed
      // e.g., interaction, hover modes
    };

    return {
      chartData: data,
      chartOptions: options,
      hasWeatherDataForChart: true,
    };
  }, [resultData.weatherData]); // Recalculate if weatherData changes

  const handleDownloadReport = () => {
    console.log("Generating report with data:", resultData);
    alert("Downloading PDF report...");
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

            {/* Crops Tab - No changes needed */}
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

            {/* Soil Data Tab - No changes needed */}
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
                        <h3 className="lg font-semibold mb-2">
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
                          </div>
                        ) : (
                          <p className="text-gray-500">
                            No general soil property data available.
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="lg font-semibold mb-2">
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
                      <h3 className="lg font-semibold mb-4">
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
                        <h3 className="lg font-semibold mb-2">
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

            {/* Weather Data Tab */}
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
                      <h3 className="lg font-semibold mb-4">
                        Forecast Summary
                      </h3>
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
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.temperature?.avg ?? "N/A"}
                              {resultData.weatherData.temperatureUnit}
                            </p>
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
                            <p className="text-sm text-gray-500">
                              Total Precipitation (Forecast)
                            </p>
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.rainfall ?? "N/A"}
                              {resultData.weatherData.precipitationUnit}
                            </p>
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
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.humidity ?? "N/A"}
                              {resultData.weatherData.humidityUnit}
                            </p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                            <p className="text-sm text-gray-500">
                              Average Wind Speed
                            </p>
                            <p className="text-2xl font-semibold">
                              {resultData.weatherData.windSpeed ?? "N/A"}
                              {resultData.weatherData.windSpeedUnit}
                            </p>
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
                        <h3 className="lg font-semibold mb-2">
                          Climate Considerations
                        </h3>
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
                        Seasonal Forecast Chart
                      </h3>
                      {/* Check if we have data *specifically for the chart* */}
                      {hasWeatherDataForChart ? (
                        // Wrap the chart in a container that helps manage its size
                        <div
                          className="bg-white p-4 rounded-md border"
                          style={{ height: "256px" }}
                        >
                          {" "}
                          {/* Explicit height */}
                          {/* The Chart component replaces the placeholder text */}
                          {/* Use type='bar' for consistency, although datasets override */}
                          <Chart
                            type="bar"
                            data={chartData}
                            options={chartOptions}
                          />
                        </div>
                      ) : (
                        <div className="bg-white p-4 rounded-md border h-64 flex items-center justify-center">
                          <p className="text-gray-500 text-center">
                            Forecast data not available to display chart.
                          </p>
                        </div>
                      )}

                      <div className="mt-6">
                        <h3 className="lg font-semibold mb-2">
                          Weather Impact on Recommended Crops
                        </h3>
                        {resultData.recommendations.length > 0 ? (
                          <div className="space-y-3">
                            {resultData.recommendations.map((crop, index) => (
                              <div
                                key={index}
                                className="p-3 border rounded-md"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="font-medium">{crop.name}</p>
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









// Place this near the top of your src/pages/Results.tsx file
// (Outside the component function)

const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/500x300?text=Image+Not+Available";

// --- Manually Curated Crop Image Map ---
const cropImageMap: Record<string, string> = {
    "Acai Berry": "https://seed2plant.in/cdn/shop/products/IMG_0252_1024x1024_2x_713x_fb95603e-d67d-4494-8573-a9d39060b88e.webp?v=1674817081",
    "Adzuki Bean": "https://upload.wikimedia.org/wikipedia/commons/6/6d/W_azuki2111.jpg",
    "Almond": "https://cdn.britannica.com/04/194904-050-1B92812A/Raw-Food-Almond-food-Nut-Snack.jpg",
    "Amaranth": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSPbKsZltpJEkTr8Gsuxs8obBVAeKt-PDA5xV8lS3d3X45KAtvK3Hm0K-2lCl_90vS6tLhEvujlysnIiszGugcW_Q",
    "Anise": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/str/str02517/y/10.jpg",
    "Apple": "https://m.media-amazon.com/images/I/81aRkv2DltL._AC_UF894,1000_QL80_.jpg",
    "Apricot": "https://m.media-amazon.com/images/I/61s6Yp9zKqL._AC_UF1000,1000_QL80_.jpg",
    "Areca Nut": "https://www.padmamnursery.com/cdn/shop/files/81apsKOu2bL-SL1138-_1.jpg?v=1728317463",
    "Areca Palm": "https://www.padmamnursery.com/cdn/shop/files/81apsKOu2bL-SL1138-_1.jpg?v=1728317463", // Assuming same image as Areca Nut
    "Arecanut": "https://www.padmamnursery.com/cdn/shop/files/81apsKOu2bL-SL1138-_1.jpg?v=1728317463", // Assuming same image as Areca Nut
    "Artichoke": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqiUeI1jRbK73wT4xKt3ZPoGZZYSiiQMLi5w&s",
    "Arugula": "https://www.davidlebovitz.com/wp-content/uploads/2013/05/8730684399_d7c80abaa4_b.jpg",
    "Ash Gourd": "https://post.healthline.com/wp-content/uploads/2020/04/ash-gourd-1296x728-header.jpg",
    "Asparagus": "https://m.media-amazon.com/images/I/81SiLWtQIbL._AC_UF1000,1000_QL80_.jpg",
    "Avocado": "https://m.media-amazon.com/images/I/71cs5TNn-LL.jpg",
    "Bael": "https://www.1mg.com/articles/wp-content/uploads/2024/05/1839.jpg",
    "Bambara Groundnut": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5syDsR3dN3LwHUimSFJwuqSS2wTh7RuHFnA&s",
    "Bamboo": "https://cdn.shopify.com/s/files/1/2114/3697/files/tall-bamboo_480x480.jpg?v=1659724952",
    "Banana": "https://www.koppert.in/content/_processed_/3/9/csm_Banana_8775c22bb9.jpg",
    "Barley": "https://cdn.britannica.com/31/75931-050-FED41F1F/Barley.jpg",
    "Barnyard Millet": "https://www.amar-khamar.com/cdn/shop/products/BarnyardMillet-2.jpg?v=1667813070",
    "Basella": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Basella_alba_flower_buds_and_flowers.jpg/640px-Basella_alba_flower_buds_and_flowers.jpg", // Used Basella Alba as example
    "Basil": "https://upload.wikimedia.org/wikipedia/commons/9/90/Basil-Basilico-Ocimum_basilicum-albahaca.jpg",
    "Beetroot": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Detroitdarkredbeets.png/1200px-Detroitdarkredbeets.png",
    "Bell Pepper": "https://www.healthshots.com/healthshots/en/uploads/2024/07/24112903/1-40.jpg",
    "Bengal Gram": "https://static.toiimg.com/thumb/72022958.cms?width=1200&height=900", // Using Chickpea image
    "Betel Nut": "https://www.padmamnursery.com/cdn/shop/files/81apsKOu2bL-SL1138-_1.jpg?v=1728317463", // Re-using Areca image
    "Betel Vine": "https://lh4.googleusercontent.com/proxy/gmy_RLSya0KypIwcYTMnFWUOAwnb7NkHwRm_WFwTJUoAiTf62KUY0YBDFUkLrhH3nzJlYhJKjQS8Q-vABwC6ohoUq93TCxUJUDh9", // Note: This is a proxy URL, might be unstable
    "Bignay": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Antidesma_bunius_fruits_-_Philippines.jpg/640px-Antidesma_bunius_fruits_-_Philippines.jpg",
    "Bird of Paradise": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Strelitzia_reginae_flower_detail.jpg/640px-Strelitzia_reginae_flower_detail.jpg", // Strelitzia
    "Bitter Gourd": "https://rukminim2.flixcart.com/image/850/1000/xif0q/plant-seed/7/1/u/24-1hbrid-bitter-gourd-seeds-bdsresolve-original-imagrgry59szbsan.jpeg?q=20&crop=false",
    "Black Cumin": "https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/03/black-cumin-1296-728-header.jpg?w=1155&h=1528",
    "Black Gram": "https://i0.wp.com/blog.alittlefarm.co.in/wp-content/uploads/2022/01/BlackGram_big_1.jpg?fit=898%2C888",
    "Black Pepper": "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/fro/fro02955/l/9.jpg",
    "Black-eyed Pea": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Vigna_unguiculata_subsp_unguiculata_-_Museo_de_la_Naturaleza_y_el_Hombre.jpg/640px-Vigna_unguiculata_subsp_unguiculata_-_Museo_de_la_Naturaleza_y_el_Hombre.jpg", // Vigna unguiculata
    "Blackberry": "https://images.immediate.co.uk/production/volatile/sites/10/2018/02/69fa32f9-f2ca-4005-bd3a-40e98aca45f7-c1ec280.jpg",
    "Blueberry": "https://www.bigbasket.com/media/uploads/p/xxl/30009286_12-fresho-blueberry.jpg",
    "Borage": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Borago_officinalis_flower_alternate.jpg/640px-Borago_officinalis_flower_alternate.jpg",
    "Bottle Gourd": "https://budsnblush.com/cdn/shop/files/F1HybridBottleGourdBudsnblush.png?v=1709075516",
    "Bouea macrophylla": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Bouea_macrophylla_Griff._-_fruit_%28AM_AK384807%29.jpg/640px-Bouea_macrophylla_Griff._-_fruit_%28AM_AK384807%29.jpg", // Gandaria/Plum Mango
    "Bougainvillea": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Bougainvillea_spectabilis_001.jpg/640px-Bougainvillea_spectabilis_001.jpg",
    "Brazil Nut": "https://media.post.rvohealth.io/wp-content/uploads/2022/05/brazil-nuts-1296x728-body.jpg",
    "Breadfruit": "https://upload.wikimedia.org/wikipedia/commons/5/57/Artocarpus_altilis_%28fruit%29.jpg",
    "Broccoli": "https://www.health.com/thmb/kSuBATf0vDnmAOj3feuHHA3ztBY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-Stocksy_txp48915e00jrw300_Medium_5965806-1b7dc08bfcbc4b748e5f1f27f67894a5.jpg",
    "Broomcorn": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sorghum_bicolor_var_technicum_MHNT.BOT.2015.20.96.jpg/480px-Sorghum_bicolor_var_technicum_MHNT.BOT.2015.20.96.jpg", // Sorghum bicolor var. technicum
    "Browntop Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Urochloa_ramosa_MHNT.BOT.2015.20.132.jpg/480px-Urochloa_ramosa_MHNT.BOT.2015.20.132.jpg", // Urochloa ramosa
    "Buckwheat": "https://biobasics.org/cdn/shop/files/buy-organic-buckwheat-online-at-bio-basics-store.png?v=1739516228",
    "Burmese Grape": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Baccaurea_ramiflora_fruit_01.jpg/640px-Baccaurea_ramiflora_fruit_01.jpg", // Baccaurea ramiflora
    "Buttercup Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Buttercup_squash.jpg/640px-Buttercup_squash.jpg",
    "Cabbage": "https://assets.clevelandclinic.org/transform/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg",
    "Cacao": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Matadecacao.jpg/1200px-Matadecacao.jpg",
    "Calabaza": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Cucurbita_moschata_Butternut_long.jpg/640px-Cucurbita_moschata_Butternut_long.jpg", // Related Cucurbita moschata
    "Calendula": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Calendula_officinalis_2006-06-24.jpg/640px-Calendula_officinalis_2006-06-24.jpg",
    "Calla Lily": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Zantedeschia_aethiopica_%28cultivated%29.jpg/640px-Zantedeschia_aethiopica_%28cultivated%29.jpg",
    "Callaloo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Starr_080117-1541_Amaranthus_viridis.jpg/640px-Starr_080117-1541_Amaranthus_viridis.jpg", // Using Amaranth image
    "Canarium ovatum": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Pili_nuts_Canarium_ovatum_Philippines.jpg/640px-Pili_nuts_Canarium_ovatum_Philippines.jpg", // Pili Nut
    "Canna Lily": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Canna_indica_%28Indian_Shot%29_in_Hyderabad_W_IMG_8191.jpg/640px-Canna_indica_%28Indian_Shot%29_in_Hyderabad_W_IMG_8191.jpg", // Canna indica
    "Canola": "https://cdn.britannica.com/16/234016-050-0220A0BE/canola-oil-and-canola-blossoms.jpg",
    "Carambola": "https://m.media-amazon.com/images/I/615edakdmSL._AC_UF1000,1000_QL80_.jpg", // Starfruit
    "Cardamom": "https://rukminim2.flixcart.com/image/850/1000/xif0q/spice-masala/y/f/a/100-whole-green-cardamom-l-sabut-hari-elaichi-vacuum-pack-1-original-imagrj2se54xytbs.jpeg?q=90&crop=false",
    "Carrot": "https://www.jiomart.com/images/product/original/590003546/carrot-orange-500-g-product-images-o590003546-p590003546-0-202408070949.jpg?im=Resize=(420,420)",
    "Cashew": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cashew_apples.jpg/1200px-Cashew_apples.jpg",
    "Cassabanana": "https://www.healthbenefitstimes.com/glossary/wp-content/uploads/2020/10/Cassabanana-Sicana-odorifera.jpg",
    "Cassava": "https://www.allrecipes.com/thmb/oYKR2Z1b_CJo8rSjkkEnTKMVsYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1157268325-2000-c92586e6eb2f48f982e47206987fd67b.jpg",
    "Castor": "https://media.post.rvohealth.io/wp-content/uploads/2022/01/castor-bean-oil-732x549-thumbnail.jpg",
    "Cauliflower": "https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg",
    "Celeriac": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Celery_root.jpg/640px-Celery_root.jpg",
    "Celery": "https://media.post.rvohealth.io/wp-content/uploads/sites/3/2020/02/270678_1100-1100x628.jpg",
    "Celosia argentea": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Celosia_argentea_var._cristata_%28Cock%27s_comb%29.JPG/640px-Celosia_argentea_var._cristata_%28Cock%27s_comb%29.JPG", // Lagos Spinach variety
    "Chamomile": "https://5.imimg.com/data5/SELLER/Default/2024/2/390464440/YV/HB/NW/189422104/chamomile.jpg",
    "Chayote Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Chayote_dsc07769.jpg/640px-Chayote_dsc07769.jpg",
    "Cheena": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Panicum_miliaceum_MHNT.BOT.2015.20.123.jpg/480px-Panicum_miliaceum_MHNT.BOT.2015.20.123.jpg", // Panicum miliaceum (Proso Millet)
    "Chenopodium": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Chenopodium_album_plant.jpg/480px-Chenopodium_album_plant.jpg", // Likely Chenopodium album
    "Cherry": "https://m.media-amazon.com/images/I/618flJ0XILL.jpg",
    "Chestnut": "https://www.lansingstatejournal.com/gcdn/-mm-/2785fcf92158ee01201a774fe96e5849d08ab738/c=373-0-2373-2000/local/-/media/2016/12/14/MIGroup/Lansing/636173260035361510-basket-of-chestnuts.jpg",
    "Chia": "https://www.drweil.com/wp-content/uploads/2018/05/Can-Chia-Help-With-Weight-Loss_-531657339-600x450.jpg",
    "Chickpea": "https://www.inspiredtaste.net/wp-content/uploads/2016/06/How-to-Cook-Chickpeas-Recipe-1-1200.jpg",
    "Chili Pepper": "https://media.istockphoto.com/id/1359811139/photo/wooden-plate-with-hot-chili-peppers.jpg?s=612x612&w=0&k=20&c=IqaYg2tAqC8_Zd7saQfIYYxtyWDF_ZwWTN2n8Cm9d2M=",
    "Chilli": "https://media.istockphoto.com/id/1359811139/photo/wooden-plate-with-hot-chili-peppers.jpg?s=612x612&w=0&k=20&c=IqaYg2tAqC8_Zd7saQfIYYxtyWDF_ZwWTN2n8Cm9d2M=", // Use same as Chili Pepper
    "Chinese Yam": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Dioscorea_polystachya_roots.jpg/640px-Dioscorea_polystachya_roots.jpg", // Dioscorea polystachya
    "Chive": "https://www.allrecipes.com/thmb/x2AgDOobIOy68JyZtLpRMgdl9LQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Screen-Shot-2020-10-27-at-3.39.19-PM-be02732875d445009ee2fa74ec36f304.png",
    "Chrysanthemum": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hardy_Chrysanthemum.jpg/640px-Hardy_Chrysanthemum.jpg",
    "Chrysophyllum albidum": "https://tropical.theferns.info/plantimages/sized/0/9/0911c9ac858607a0f5c1206cc0c7199c_480px.jpg", // African Star Apple
    "Cinnamon": "https://images.immediate.co.uk/production/volatile/sites/30/2016/08/cinnamon-benefits44-724deaf.jpg?quality=90&resize=440,400",
    "Cluster Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cyamopsis_tetragonoloba_%28plant%29.jpg/480px-Cyamopsis_tetragonoloba_%28plant%29.jpg", // Cyamopsis tetragonoloba
    "Clove": "https://cdn.britannica.com/27/171027-050-7F7889C9/flower-buds-clove-tree.jpg",
    "Cocoa": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Matadecacao.jpg/1200px-Matadecacao.jpg", // Same as Cacao
    "Coconut": "https://www.jiomart.com/images/product/original/590000086/big-coconut-1-pc-approx-350-g-600-g-product-images-o590000086-p590000086-0-202408070949.jpg?im=Resize=(420,420)",
    "Coffee": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Roasted_coffee_beans.jpg",
    "Colocasia": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Colocasia_esculenta_var._esculenta_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg/480px-Colocasia_esculenta_var._esculenta_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-040.jpg",
    "Common Bean": "https://www.feedipedia.org/sites/default/files/images/phaseolus_vulg_seeds_butko.jpg", // Phaseolus vulgaris
    "Corchorus olitorius": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Corchorus_olitorius_001.JPG/640px-Corchorus_olitorius_001.JPG", // Jute Mallow
    "Coriander": "https://www.foodandwine.com/thmb/kjn7ULvJuySVzZTsLFToPEe-KHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Coriander-vs-cilantro-FT-BLOG0624-cc8f8172b07b49e7ad435157a846dc16.jpg",
    "Corn": "https://globebag.com/cdn/shop/articles/GlobeBagCompanyInc-254376-Corn-and-Maize-blogbanner1.jpg?v=1698325076", // Use same as Maize
    "Costus": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Costus_speciosus_%28flower%29_-_India.jpg/640px-Costus_speciosus_%28flower%29_-_India.jpg", // Costus speciosus
    "Costus speciosus": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Costus_speciosus_%28flower%29_-_India.jpg/640px-Costus_speciosus_%28flower%29_-_India.jpg", // Crepe Ginger
    "Cotton": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CottonPlant.JPG/960px-CottonPlant.JPG",
    "Cowpea": "https://m.media-amazon.com/images/I/51TezATUHML._AC_UF1000,1000_QL80_.jpg",
    "Cranberry": "https://www.nationalgardens.in/177-large_default/cranberry-fruit-seeds.jpg",
    "Crossandra": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Crossandra_infundibuliformis_%27Apricot_Splash%27_Flower_2200px.jpg/640px-Crossandra_infundibuliformis_%27Apricot_Splash%27_Flower_2200px.jpg",
    "Cucumber": "https://gourmetgarden.in/cdn/shop/products/English_Cucumber_1f058483-295b-4a66-b3f1-f0f425b25b0d.jpg?v=1745069137",
    "Cumin": "https://cdn.britannica.com/59/219359-050-662D86EA/Cumin-Spice.jpg",
    "CupuaÃ§u": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Cupua%C3%A7u_-_projectinacan.jpg/640px-Cupua%C3%A7u_-_projectinacan.jpg", // Note: Check character encoding? Use 'Cupuacu' if needed
    "Curcuma longa": "https://m.media-amazon.com/images/I/718WPJQP88L._AC_UF1000,1000_QL80_.jpg", // Turmeric
    "Curry Leaf": "https://cdn.prod.website-files.com/65056ba428fdd5501ff0ef16/6622d419f8be9c555a570649_AdobeStock_109487326-_1_.webp",
    "Custard Apple": "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/cherimoya-1296x728-feature.jpg?w=1155&h=1528", // Cherimoya is related
    "Cyamopsis tetragonoloba": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cyamopsis_tetragonoloba_%28plant%29.jpg/480px-Cyamopsis_tetragonoloba_%28plant%29.jpg", // Guar / Cluster Bean
    "Dacryodes edulis": "https://www.feedipedia.org/sites/default/files/images/Dacryodes_edulis_fruits_complete.jpg", // Safou
    "Date Palm": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dates005.jpg/1200px-Dates005.jpg",
    "Dates": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Dates005.jpg/1200px-Dates005.jpg", // Use same as Date Palm
    "Delicata Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Delicata_squash.jpg/640px-Delicata_squash.jpg",
    "Dill": "https://bombayseeds.com/cdn/shop/files/Dill.jpg?v=1728889865",
    "Dolichos Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lablab_purpureus_-_Köhler–s_Medizinal-Pflanzen-085.jpg/480px-Lablab_purpureus_-_Köhler–s_Medizinal-Pflanzen-085.jpg", // Lablab purpureus / Hyacinth Bean
    "Dragon Fruit": "https://upload.wikimedia.org/wikipedia/commons/4/43/Pitaya_cross_section_ed2.jpg",
    "Dragonfruit": "https://upload.wikimedia.org/wikipedia/commons/4/43/Pitaya_cross_section_ed2.jpg", // Use same
    "Drumstick": "https://nurserylive.com/cdn/shop/products/nurserylive-drumstick-moringa-0-5-kg-seeds_512x512.jpg?v=1658928741", // Moringa
    "Duku": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lansium_domesticum_var_domesticum_%28Duku%29.jpg/640px-Lansium_domesticum_var_domesticum_%28Duku%29.jpg",
    "Durian": "https://m.media-amazon.com/images/I/61hjIVmCvqL._AC_UF1000,1000_QL80_.jpg",
    "Eggplant": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Solanum_melongena_24_08_2012_(1).JPG/1200px-Solanum_melongena_24_08_2012_(1).JPG",
    "Egusi Melon": "https://i0.wp.com/tribuneonlineng.com/wp-content/uploads/2021/08/Egusi-melon.jpg?fit=650%2C450&ssl=1",
    "Elephant Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dillenia_indica_fruit_cross_section_-_India.jpg/640px-Dillenia_indica_fruit_cross_section_-_India.jpg", // Dillenia indica
    "Emilia": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Emilia_sonchifolia_%28Asteraceae%29.jpg/640px-Emilia_sonchifolia_%28Asteraceae%29.jpg", // Emilia sonchifolia
    "Etlingera elatior": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Etlingera_elatior_DS.jpg/640px-Etlingera_elatior_DS.jpg", // Torch Ginger
    "Eucalyptus": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Eucalyptus_camaldulensis_flowers%2C_buds_and_foliage..jpg/640px-Eucalyptus_camaldulensis_flowers%2C_buds_and_foliage..jpg",
    "Fava Bean": "https://5.imimg.com/data5/SELLER/Default/2020/8/IL/NT/TB/5492861/fava-beans-500x500.jpg",
    "Fennel": "https://m.media-amazon.com/images/I/81d52532TiL._AC_UF1000,1000_QL80_.jpg",
    "Fenugreek": "https://hips.hearstapps.com/hmg-prod/images/fenugreek3-1676488319.jpg",
    "Field Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Vicia_faba_field_1.jpg/640px-Vicia_faba_field_1.jpg", // Often Vicia faba
    "Fig": PLACEHOLDER_IMAGE_URL, // URL was missing in your list
    "Figs": PLACEHOLDER_IMAGE_URL, // Use placeholder, or same as Fig if you find one
    "Finger Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Eleusine_coracana_seedheads.jpg/640px-Eleusine_coracana_seedheads.jpg",
    "Flax": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flax_close_up.JPG/640px-Flax_close_up.JPG",
    "Fonio": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Digitaria_exilis_MHNT.BOT.2015.20.119.jpg/480px-Digitaria_exilis_MHNT.BOT.2015.20.119.jpg",
    "Foxtail Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Setaria_italica_MHNT.BOT.2015.20.128.jpg/480px-Setaria_italica_MHNT.BOT.2015.20.128.jpg",
    "French Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Phaseolus_vulgaris_French_beans.jpg/640px-Phaseolus_vulgaris_French_beans.jpg", // Phaseolus vulgaris
    "Galangal": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Alpinia_galanga_rhizomes_-_galangal.jpg/640px-Alpinia_galanga_rhizomes_-_galangal.jpg",
    "Garlic": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Garlic_cloves.jpg/640px-Garlic_cloves.jpg",
    "Geocarpa Groundnut": "https://www.feedipedia.org/sites/default/files/images/geocarpa_pods.jpg",
    "Gherkin": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gherkin_pickle.jpg/640px-Gherkin_pickle.jpg",
    "Gingelly": "https://cdn.shopify.com/s/files/1/0550/9399/5189/products/gingelly-seeds-110343_1024x.jpg?v=1658910315", // Sesame Seeds
    "Ginger": "https://images.immediate.co.uk/production/volatile/sites/30/2021/07/Ginger-root-efe0a62.jpg?quality=90&resize=556,505",
    "Gnetum africanum": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gnetum_africanum_-_Eru.jpg/640px-Gnetum_africanum_-_Eru.jpg", // Eru/Afang
    "Gongura": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hibiscus_sabdariffa_flower_%26_calyx_%28sorrel%2C_roselle%29.jpg/640px-Hibiscus_sabdariffa_flower_%26_calyx_%28sorrel%2C_roselle%29.jpg", // Often refers to Roselle leaves
    "Gooseberry": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ribes_uva-crispa_fruits.jpg/640px-Ribes_uva-crispa_fruits.jpg",
    "Grape": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/640px-Table_grapes_on_white.jpg",
    "Grapes": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/640px-Table_grapes_on_white.jpg", // Use same as Grape
    "Green Gram": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Moong_dal_split.jpg/640px-Moong_dal_split.jpg", // Mung Bean related
    "Groundnut": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Arachis_hypogaea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg/480px-Arachis_hypogaea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg", // Peanut plant
    "Guar": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cyamopsis_tetragonoloba_%28plant%29.jpg/480px-Cyamopsis_tetragonoloba_%28plant%29.jpg", // Same as Cluster Bean
    "Guava": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guava_ID.jpg/640px-Guava_ID.jpg",
    "Guinea Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Panicum_maximum_seedhead.jpg/640px-Panicum_maximum_seedhead.jpg", // Panicum maximum
    "Hausa Groundnut": "https://scialert.net/abstract/?doi=ajft.2011.1.14", // Placeholder - need a real image URL
    "Hazelnut": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Filberts_large.jpg/640px-Filberts_large.jpg",
    "Heliconia": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Heliconia_rostrata_%28hanging_lobster_claws%29.jpg/640px-Heliconia_rostrata_%28hanging_lobster_claws%29.jpg",
    "Heliconia psittacorum": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Heliconia_psittacorum_%27Lady_Di%27_02.jpg/640px-Heliconia_psittacorum_%27Lady_Di%27_02.jpg", // Parrot's Beak
    "Hemp": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Industrial_Hemp_Closeup.jpg/640px-Industrial_Hemp_Closeup.jpg",
    "Hibiscus": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Hibiscus_schizopetalus_in_Rome.jpg/640px-Hibiscus_schizopetalus_in_Rome.jpg", // Example species
    "Hibiscus sabdariffa": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hibiscus_sabdariffa_flower_%26_calyx_%28sorrel%2C_roselle%29.jpg/640px-Hibiscus_sabdariffa_flower_%26_calyx_%28sorrel%2C_roselle%29.jpg", // Roselle
    "Horse Gram": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Macrotyloma_uniflorum_MHNT.BOT.2015.20.169.jpg/640px-Macrotyloma_uniflorum_MHNT.BOT.2015.20.169.jpg",
    "Hubbard Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Blue_Hubbard_Squash_Cross_Section.jpg/640px-Blue_Hubbard_Squash_Cross_Section.jpg",
    "Hyacinth Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lablab_purpureus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-085.jpg/480px-Lablab_purpureus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-085.jpg", // Lablab purpureus
    "Hyssop": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Hyssopus_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-078.jpg/480px-Hyssopus_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-078.jpg",
    "Ice Cream Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Inga_edulis_pods.jpg/640px-Inga_edulis_pods.jpg", // Inga edulis
    "Imbe": "https://tropical.theferns.info/plantimages/sized/d/0/d04d00e5d43c8e8f0fae8d7db454d4c5_320px.jpg", // Garcinia livingstonei
    "Indian Gooseberry": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Amla_fruits_on_tree_-_India.jpg/640px-Amla_fruits_on_tree_-_India.jpg", // Amla
    "Indian Jujube": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Ziziphus_mauritiana_fruits_01.jpg/640px-Ziziphus_mauritiana_fruits_01.jpg", // Ziziphus mauritiana
    "Indian Mustard": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Brassica_juncea_var._juncea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-188.jpg/480px-Brassica_juncea_var._juncea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-188.jpg", // Brassica juncea
    "Inocarpus fagifer": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Inocarpus_fagifer_fruits.jpg/640px-Inocarpus_fagifer_fruits.jpg", // Tahitian Chestnut
    "Italian Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Setaria_italica_MHNT.BOT.2015.20.128.jpg/480px-Setaria_italica_MHNT.BOT.2015.20.128.jpg", // Setaria italica (Foxtail)
    "Ivy Gourd": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Coccinia_grandis_fruit_and_leaves.jpg/640px-Coccinia_grandis_fruit_and_leaves.jpg", // Coccinia grandis
    "Ixora": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Ixora_coccinea_flower_cluster.jpg/640px-Ixora_coccinea_flower_cluster.jpg", // Ixora coccinea
    "Jaboticaba": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Jabuticaba_Myrciaria_cauliflora_fruit.jpg/640px-Jabuticaba_Myrciaria_cauliflora_fruit.jpg",
    "Jack Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Canavalia_ensiformis_MHNT.BOT.2015.20.166.jpg/640px-Canavalia_ensiformis_MHNT.BOT.2015.20.166.jpg", // Canavalia ensiformis
    "Jackfruit": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Jackfruit_hanging.JPG/640px-Jackfruit_hanging.JPG",
    "Jamun": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Syzygium_cumini_-_fruits.jpg/640px-Syzygium_cumini_-_fruits.jpg", // Syzygium cumini
    "Japanese Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Echinochloa_frumentacea_MHNT.BOT.2015.20.120.jpg/480px-Echinochloa_frumentacea_MHNT.BOT.2015.20.120.jpg", // Echinochloa frumentacea
    "Jasmine": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Jasminum_sambac_flower.jpg/640px-Jasminum_sambac_flower.jpg", // Jasminum sambac
    "Jenipapo": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Genipa_americana_fruit.jpg/640px-Genipa_americana_fruit.jpg",
    "Jerusalem Artichoke": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Jerusalem_artichoke_-_Helianthus_tuberosus.jpg/640px-Jerusalem_artichoke_-_Helianthus_tuberosus.jpg",
    "Job's Tears": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Coix_lacryma-jobi_MHNT.BOT.2015.20.115.jpg/480px-Coix_lacryma-jobi_MHNT.BOT.2015.20.115.jpg",
    "Jowar": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sorghum_bicolor_MHNT.BOT.2015.20.91.jpg/480px-Sorghum_bicolor_MHNT.BOT.2015.20.91.jpg", // Use Sorghum image
    "Jute": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Corchorus_capsularis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-042.jpg/480px-Corchorus_capsularis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-042.jpg", // Corchorus capsularis
    "Jute Mallow": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Corchorus_olitorius_001.JPG/640px-Corchorus_olitorius_001.JPG", // Corchorus olitorius
    "Kabocha Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Kabocha_squash.jpg/640px-Kabocha_squash.jpg",
    "Kaempferia galanga": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kaempferia_galanga_%28Sand_Ginger_or_Resurrection_Lily%29_rhizomes.jpg/640px-Kaempferia_galanga_%28Sand_Ginger_or_Resurrection_Lily%29_rhizomes.jpg",
    "Kangkong": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ipomoea_aquatica_Sturm41.jpg/480px-Ipomoea_aquatica_Sturm41.jpg", // Water Spinach
    "Kangni": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Setaria_italica_MHNT.BOT.2015.20.128.jpg/480px-Setaria_italica_MHNT.BOT.2015.20.128.jpg", // Setaria italica (Foxtail Millet)
    "Kanthal": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Jackfruit_hanging.JPG/640px-Jackfruit_hanging.JPG", // Use Jackfruit image
    "Karela": "https://rukminim2.flixcart.com/image/850/1000/xif0q/plant-seed/7/1/u/24-1hbrid-bitter-gourd-seeds-bdsresolve-original-imagrgry59szbsan.jpeg?q=20&crop=false", // Use Bitter Gourd
    "Kava": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Piper_methysticum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-109.jpg/480px-Piper_methysticum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-109.jpg",
    "Kenaf": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Hibiscus_cannabinus_flower_%28Kenaf%29.jpg/640px-Hibiscus_cannabinus_flower_%28Kenaf%29.jpg",
    "Kepel Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Stelechocarpus_burahol_-_Kepel_fruits.jpg/640px-Stelechocarpus_burahol_-_Kepel_fruits.jpg", // Stelechocarpus burahol
    "Kersting's Groundnut": "https://uses.plantnet-project.org/images/200/400/7317.jpg", // Macrotyloma geocarpum
    "Kidney Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Phaseolus_vulgaris_kidney.jpg/640px-Phaseolus_vulgaris_kidney.jpg",
    "Kodo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Paspalum_scrobiculatum_MHNT.BOT.2015.20.124.jpg/480px-Paspalum_scrobiculatum_MHNT.BOT.2015.20.124.jpg", // Paspalum scrobiculatum
    "Kodo Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Paspalum_scrobiculatum_MHNT.BOT.2015.20.124.jpg/480px-Paspalum_scrobiculatum_MHNT.BOT.2015.20.124.jpg",
    "Kohlrabi": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Kohlrabi_plant_with_name.jpg/640px-Kohlrabi_plant_with_name.jpg",
    "Kokum": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Garcinia_indica_fruit_03.jpg/640px-Garcinia_indica_fruit_03.jpg",
    "Kundru": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Coccinia_grandis_fruit_and_leaves.jpg/640px-Coccinia_grandis_fruit_and_leaves.jpg", // Use Ivy Gourd image
    "Kutki": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Panicum_sumatrense_MHNT.BOT.2015.20.122.jpg/480px-Panicum_sumatrense_MHNT.BOT.2015.20.122.jpg", // Panicum sumatrense (Little Millet)
    "Lablab purpureus": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lablab_purpureus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-085.jpg/480px-Lablab_purpureus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-085.jpg", // Hyacinth Bean
    "Lagos Bologi": PLACEHOLDER_IMAGE_URL, // Need specific image
    "Lagos Spinach": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Celosia_argentea_var._cristata_%28Cock%27s_comb%29.JPG/640px-Celosia_argentea_var._cristata_%28Cock%27s_comb%29.JPG", // Celosia argentea
    "Langsat": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Lansium_domesticum_fruits.jpg/640px-Lansium_domesticum_fruits.jpg", // Lansium domesticum
    "Lavender": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lavender_flower_head.jpg/640px-Lavender_flower_head.jpg",
    "Leek": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Leek_plant.jpg/640px-Leek_plant.jpg",
    "Lemon Balm": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-096.jpg/480px-Melissa_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-096.jpg",
    "Lemon Grass": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Cymbopogon_citratus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-198.jpg/480px-Cymbopogon_citratus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-198.jpg",
    "Lemon Verbena": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Aloysia_citrodora_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-007.jpg/480px-Aloysia_citrodora_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-007.jpg",
    "Lentil": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Red_lentils.jpg/640px-Red_lentils.jpg", // Image of seeds
    "Lettuce": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Lactuca_sativa_in_field.jpg/640px-Lactuca_sativa_in_field.jpg",
    "Lima Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Phaseolus_lunatus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-107.jpg/480px-Phaseolus_lunatus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-107.jpg",
    "Linseed": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flax_close_up.JPG/640px-Flax_close_up.JPG", // Use Flax image
    "Little Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Panicum_sumatrense_MHNT.BOT.2015.20.122.jpg/480px-Panicum_sumatrense_MHNT.BOT.2015.20.122.jpg", // Panicum sumatrense
    "Lobia": "https://m.media-amazon.com/images/I/51TezATUHML._AC_UF1000,1000_QL80_.jpg", // Use Cowpea image
    "Long Pepper": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Piper_longum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-108.jpg/480px-Piper_longum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-108.jpg",
    "Longan": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Dimocarpus_longan_-_fruits.jpg/640px-Dimocarpus_longan_-_fruits.jpg",
    "Loquat": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Loquat_fruit_on_tree.jpg/640px-Loquat_fruit_on_tree.jpg",
    "Lotus": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Nelumbo_nucifera_open_flower_-_botanic_garden_adelaide.jpg/640px-Nelumbo_nucifera_open_flower_-_botanic_garden_adelaide.jpg", // Nelumbo nucifera
    "Lovage": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Levisticum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-088.jpg/480px-Levisticum_officinale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-088.jpg",
    "Luffa Gourd": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Luffa_aegyptiaca_young_fruit.jpg/640px-Luffa_aegyptiaca_young_fruit.jpg", // Luffa aegyptiaca (Sponge Gourd)
    "Lychee": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Lychee_on_white_background.jpg/640px-Lychee_on_white_background.jpg",
    "Macadamia Nut": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Macadamia_integrifolia_-_nuts.jpg/640px-Macadamia_integrifolia_-_nuts.jpg",
    "Magnolia champaca": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Magnolia_champaca_flower_%28Michelia%29.JPG/640px-Magnolia_champaca_flower_%28Michelia%29.JPG", // Champak
    "Maize": "https://globebag.com/cdn/shop/articles/GlobeBagCompanyInc-254376-Corn-and-Maize-blogbanner1.jpg?v=1698325076", // Use same as Corn
    "Malabar Spinach": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Basella_alba_flower_buds_and_flowers.jpg/640px-Basella_alba_flower_buds_and_flowers.jpg", // Use Basella Alba
    "Malanga": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Xanthosoma_sagittifolium_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-154.jpg/480px-Xanthosoma_sagittifolium_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-154.jpg", // Often Xanthosoma
    "Mammee Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Mammea_americana_fruit.jpg/640px-Mammea_americana_fruit.jpg",
    "Mango": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/HapusMango.jpg/640px-HapusMango.jpg",
    "Mangosteen": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangosteen_detail.jpg/640px-Mangosteen_detail.jpg",
    "Mangrove Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sonneratia_caseolaris_fruit.jpg/640px-Sonneratia_caseolaris_fruit.jpg", // Sonneratia caseolaris
    "Marama Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tylosema_esculentum_seeds.jpg/640px-Tylosema_esculentum_seeds.jpg",
    "Marjoram": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Origanum_majorana_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-104.jpg/480px-Origanum_majorana_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-104.jpg",
    "Masoor": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Red_lentils.jpg/640px-Red_lentils.jpg", // Red Lentil
    "Medinilla": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Medinilla_magnifica_flower_head.jpg/640px-Medinilla_magnifica_flower_head.jpg", // Medinilla magnifica
    "Mesta": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Hibiscus_sabdariffa_plant_%28Roselle%29.jpg/480px-Hibiscus_sabdariffa_plant_%28Roselle%29.jpg", // Often Hibiscus sabdariffa
    "Millet": "https://cdn.britannica.com/91/190191-050-F407F7EE/Heads-pearl-millet.jpg", // Pearl Millet as example
    "Mint": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mentha_spicata_001.JPG/640px-Mentha_spicata_001.JPG", // Spearmint as example
    "Mizuna": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Mizuna.jpg/640px-Mizuna.jpg",
    "Monkey Jackfruit": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Artocarpus_lacucha_fruit_01.jpg/640px-Artocarpus_lacucha_fruit_01.jpg", // Artocarpus lacucha
    "Moong": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Moong_dal_split.jpg/640px-Moong_dal_split.jpg", // Same as Mung Bean/Green Gram
    "Moringa": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Moringa_oleifera_flower_pods.jpg/640px-Moringa_oleifera_flower_pods.jpg",
    "Moth Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Vigna_aconitifolia_MHNT.BOT.2015.20.173.jpg/640px-Vigna_aconitifolia_MHNT.BOT.2015.20.173.jpg",
    "Mulberry": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Morus_nigra_fruits_and_leaf.jpg/640px-Morus_nigra_fruits_and_leaf.jpg",
    "Mung Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Vigna_radiata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-148.jpg/480px-Vigna_radiata_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-148.jpg",
    "Mushroom": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Agaricus_bisporus_3.jpg/640px-Agaricus_bisporus_3.jpg", // Common Agaricus
    "Muskmelon": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Cucumis_melo_cantaloupe_fruit.jpg/640px-Cucumis_melo_cantaloupe_fruit.jpg", // Cantaloupe type
    "Mussaenda": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Mussaenda_philippica_%27Queen_Sirikit%27.jpg/640px-Mussaenda_philippica_%27Queen_Sirikit%27.jpg",
    "Mustard": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sinapis_alba_field.jpg/640px-Sinapis_alba_field.jpg", // White Mustard field
    "Navy Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Navy_beans_white.jpg/640px-Navy_beans_white.jpg",
    "Nectarine": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Nectarine_fruit.jpg/640px-Nectarine_fruit.jpg",
    "Niger Seed": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Guizotia_abyssinica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-071.jpg/480px-Guizotia_abyssinica_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-071.jpg",
    "Noni": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Morinda_citrifolia_fruit.jpg/640px-Morinda_citrifolia_fruit.jpg",
    "Nutmeg": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Nutmeg_seed_kernel.jpg/640px-Nutmeg_seed_kernel.jpg",
    "Oats": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Avena_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-019.jpg/480px-Avena_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-019.jpg",
    "Oca": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Oca_Oxalis_tuberosa_tubers.jpg/640px-Oca_Oxalis_tuberosa_tubers.jpg",
    "Oil Palm": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Elaeis_guineensis_fruit_bunch.jpg/640px-Elaeis_guineensis_fruit_bunch.jpg",
    "Okinawan Sweet Potato": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Okinawan_Sweet_Potatoes.jpg/640px-Okinawan_Sweet_Potatoes.jpg",
    "Okra": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Okra_plant_with_pods_and_flower.jpg/640px-Okra_plant_with_pods_and_flower.jpg",
    "Olive": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Manzanilla_olives_on_the_tree.jpg/640px-Manzanilla_olives_on_the_tree.jpg",
    "Onion": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/640px-Onion_on_White.JPG",
    "Opo Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Lagenaria_siceraria_%28bottle_gourd%29_fruit.jpg/640px-Lagenaria_siceraria_%28bottle_gourd%29_fruit.jpg", // Bottle Gourd family
    "Orange": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/640px-Orange-Fruit-Pieces.jpg",
    "Oregano": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Origanum_vulgare_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-103.jpg/480px-Origanum_vulgare_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-103.jpg",
    "Papaya": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Papaya_cross_section_BNC.jpg/640px-Papaya_cross_section_BNC.jpg",
    "Parsnip": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Parsnips.jpg/640px-Parsnips.jpg",
    "Parwal": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Trichosanthes_dioica_fruit.jpg/640px-Trichosanthes_dioica_fruit.jpg", // Pointed Gourd
    "Paspalum scrobiculatum": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Paspalum_scrobiculatum_MHNT.BOT.2015.20.124.jpg/480px-Paspalum_scrobiculatum_MHNT.BOT.2015.20.124.jpg", // Kodo Millet
    "Passion Fruit": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Passiflora_edulis_fruit_cross-section.jpg/640px-Passiflora_edulis_fruit_cross-section.jpg",
    "Patchouli": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pogostemon_cablin_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-111.jpg/480px-Pogostemon_cablin_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-111.jpg",
    "Pea": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Pea_pods_and_peas.jpg/640px-Pea_pods_and_peas.jpg",
    "Peach": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Autumn_Red_peaches.jpg/640px-Autumn_Red_peaches.jpg",
    "Peanut": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Arachis_hypogaea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg/480px-Arachis_hypogaea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-010.jpg", // Use Groundnut image
    "Pear": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Pears.jpg/640px-Pears.jpg",
    "Pearl Millet": "https://cdn.britannica.com/91/190191-050-F407F7EE/Heads-pearl-millet.jpg",
    "Peas": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Pea_pods_and_peas.jpg/640px-Pea_pods_and_peas.jpg", // Use same as Pea
    "Pecan": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Pecan_nuts.jpg/640px-Pecan_nuts.jpg",
    "Pepper": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Piper_nigrum_fruits.jpg/640px-Piper_nigrum_fruits.jpg", // Black Pepper
    "Persicaria odorata": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Persicaria_odorata_%28Rau_Ram%29.jpg/640px-Persicaria_odorata_%28Rau_Ram%29.jpg", // Vietnamese Coriander
    "Persimmon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Diospyros_kaki_persimmon_fruit.jpg/640px-Diospyros_kaki_persimmon_fruit.jpg",
    "Phalsa": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Grewia_asiatica_fruits_%28Phalsa%29.jpg/640px-Grewia_asiatica_fruits_%28Phalsa%29.jpg", // Grewia asiatica
    "Pigeon Pea": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Cajanus_cajan_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg/480px-Cajanus_cajan_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg", // Cajanus cajan
    "Pigeonpea": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Cajanus_cajan_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg/480px-Cajanus_cajan_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-026.jpg", // Cajanus cajan
    "Pili Nut": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Pili_nuts_Canarium_ovatum_Philippines.jpg/640px-Pili_nuts_Canarium_ovatum_Philippines.jpg", // Canarium ovatum
    "Pineapple": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/640px-Pineapple_and_cross_section.jpg",
    "Piper sarmentosum": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Piper_sarmentosum_leaves_%28Wild_Betel%29.jpg/640px-Piper_sarmentosum_leaves_%28Wild_Betel%29.jpg",
    "Pistachio": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Pistachio_macro.jpg/640px-Pistachio_macro.jpg",
    "Plantain": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Plantain_bundle.jpg/640px-Plantain_bundle.jpg",
    "Plum": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Plums_on_a_plate.jpg/640px-Plums_on_a_plate.jpg",
    "Plumeria": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Plumeria_alba_flower.jpg/640px-Plumeria_alba_flower.jpg", // Frangipani
    "Pointed Gourd": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Trichosanthes_dioica_fruit.jpg/640px-Trichosanthes_dioica_fruit.jpg", // Trichosanthes dioica
    "Polygonum minus": "https://herbsocietyblog.files.wordpress.com/2018/10/polygonum_minus.jpg?w=768", // Kesum
    "Pomegranate": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pomegranate_fruit_and_cross_section.jpg/640px-Pomegranate_fruit_and_cross_section.jpg",
    "Pomelo": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pomelo_fruit.jpg/640px-Pomelo_fruit.jpg",
    "Potato": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/640px-Patates.jpg",
    "Proso Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Panicum_miliaceum_MHNT.BOT.2015.20.123.jpg/480px-Panicum_miliaceum_MHNT.BOT.2015.20.123.jpg",
    "Pudhina": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mentha_spicata_001.JPG/640px-Mentha_spicata_001.JPG", // Use Mint image
    "Pulasan": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Nephelium_mutabile_fruits.jpg/640px-Nephelium_mutabile_fruits.jpg",
    "Pumpkin": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Cucurbita_maxima_Duchesne_ex_Lamarck_1.jpg/640px-Cucurbita_maxima_Duchesne_ex_Lamarck_1.jpg",
    "Quinoa": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Chenopodium_quinoa_plants.jpg/640px-Chenopodium_quinoa_plants.jpg",
    "Radish": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Radish_roots.jpg/640px-Radish_roots.jpg",
    "Ragi": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Eleusine_coracana_seedheads.jpg/640px-Eleusine_coracana_seedheads.jpg", // Use Finger Millet image
    "Rain Lily": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Zephyranthes_candida_flower_01.jpg/640px-Zephyranthes_candida_flower_01.jpg", // Zephyranthes candida
    "Rajma": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Phaseolus_vulgaris_kidney.jpg/640px-Phaseolus_vulgaris_kidney.jpg", // Use Kidney Bean image
    "Rambutan": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nephelium_lappaceum_fruits.jpg/640px-Nephelium_lappaceum_fruits.jpg",
    "Ramdana": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Starr_080117-1541_Amaranthus_viridis.jpg/640px-Starr_080117-1541_Amaranthus_viridis.jpg", // Use Amaranth image
    "Ramphal": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Annona_reticulata_fruit.jpg/640px-Annona_reticulata_fruit.jpg", // Annona reticulata
    "Rapeseed": "https://cdn.britannica.com/16/234016-050-0220A0BE/canola-oil-and-canola-blossoms.jpg", // Use Canola image
    "Raspberry": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Raspberries_white_background.jpg/640px-Raspberries_white_background.jpg",
    "Rice": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Oryza_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-105.jpg/480px-Oryza_sativa_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-105.jpg",
    "Rice Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Vigna_umbellata_seeds.jpg/640px-Vigna_umbellata_seeds.jpg", // Vigna umbellata seeds
    "Ricebean": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Vigna_umbellata_seeds.jpg/640px-Vigna_umbellata_seeds.jpg", // Use same
    "Ridge Gourd": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Luffa_acutangula_fruit.jpg/640px-Luffa_acutangula_fruit.jpg", // Luffa acutangula
    "Rivea": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rivea_corymbosa_-_flower_%28Turbina_corymbosa%29.jpg/640px-Rivea_corymbosa_-_flower_%28Turbina_corymbosa%29.jpg", // Rivea corymbosa
    "Rose": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Rosa_rubiginosa_1.jpg/640px-Rosa_rubiginosa_1.jpg", // Example rose
    "Roselle": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hibiscus_sabdariffa_flower_%26_calyx_%28sorrel%2C_roselle%29.jpg/640px-Hibiscus_sabdariffa_flower_%26_calyx_%28sorrel%2C_roselle%29.jpg", // Hibiscus sabdariffa
    "Rosemary": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Rosmarinus_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-123.jpg/480px-Rosmarinus_officinalis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-123.jpg",
    "Rubber": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Hevea_brasiliensis_tapping.jpg/640px-Hevea_brasiliensis_tapping.jpg", // Hevea brasiliensis tapping
    "Rutabaga": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Rutabaga_%28Brassica_napus_subsp._rapifera%29.jpg/640px-Rutabaga_%28Brassica_napus_subsp._rapifera%29.jpg",
    "Rye": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Secale_cereale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-131.jpg/480px-Secale_cereale_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-131.jpg",
    "Safflower": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Safflower_plant_Carthamus_tinctorius.jpg/640px-Safflower_plant_Carthamus_tinctorius.jpg",
    "Saffron": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Crocus_sativus_October_2007_-_1.jpg/640px-Crocus_sativus_October_2007_-_1.jpg",
    "Safou": "https://www.feedipedia.org/sites/default/files/images/Dacryodes_edulis_fruits_complete.jpg", // Dacryodes edulis
    "Sage": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Salvia_officinalis_0001.jpg/640px-Salvia_officinalis_0001.jpg",
    "Salak": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salacca_zalacca_fruits.jpg/640px-Salacca_zalacca_fruits.jpg",
    "Samak Rice": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Panicum_miliaceum_MHNT.BOT.2015.20.123.jpg/480px-Panicum_miliaceum_MHNT.BOT.2015.20.123.jpg", // Use Proso Millet
    "Sandalwood": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Santalum_album_wood.jpg/640px-Santalum_album_wood.jpg", // Wood shown
    "Sapodilla": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Manilkara_zapota_fruits.jpg/640px-Manilkara_zapota_fruits.jpg",
    "Sawa": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Echinochloa_frumentacea_MHNT.BOT.2015.20.120.jpg/480px-Echinochloa_frumentacea_MHNT.BOT.2015.20.120.jpg", // Use Japanese Millet
    "Sawa Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Echinochloa_frumentacea_MHNT.BOT.2015.20.120.jpg/480px-Echinochloa_frumentacea_MHNT.BOT.2015.20.120.jpg", // Use Japanese Millet
    "Sesame": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sesame_seed_pods.jpg/640px-Sesame_seed_pods.jpg",
    "Shallot": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Shallots.jpg/640px-Shallots.jpg",
    "Shama Millet": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Echinochloa_colona_MHNT.BOT.2015.20.121.jpg/480px-Echinochloa_colona_MHNT.BOT.2015.20.121.jpg", // Echinochloa colona
    "Sisal": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Agave_sisalana_plantation.jpg/640px-Agave_sisalana_plantation.jpg",
    "Sitaphal": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Annona_squamosa_fruit_and_cross_section.jpg/640px-Annona_squamosa_fruit_and_cross_section.jpg", // Annona squamosa (Custard Apple)
    "Snake Gourd": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Trichosanthes_cucumerina_var_anguina_fruit.jpg/640px-Trichosanthes_cucumerina_var_anguina_fruit.jpg",
    "Solanum macrocarpon": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Solanum_macrocarpon_fruits.jpg/640px-Solanum_macrocarpon_fruits.jpg", // African Eggplant
    "Sorghum": "https://cdn.britannica.com/21/136021-050-FA97E7C7/Sorghum.jpg",
    "Soursop": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Annona_muricata_fruit_and_cross_section.jpg/640px-Annona_muricata_fruit_and_cross_section.jpg",
    "Soybean": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/SoybeanGlycineMax.jpg/640px-SoybeanGlycineMax.jpg",
    "Spaghetti Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Spaghetti_squash_1.jpg/640px-Spaghetti_squash_1.jpg",
    "Spelt": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Spelt_grains.jpg/640px-Spelt_grains.jpg",
    "Spider Lily": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Hymenocallis_littoralis_%28Spider_Lily%29_flower.jpg/640px-Hymenocallis_littoralis_%28Spider_Lily%29_flower.jpg",
    "Spinach": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Spinach.jpg/640px-Spinach.jpg",
    "Spiny Gourd": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Momordica_dioica_fruit.jpg/640px-Momordica_dioica_fruit.jpg", // Momordica dioica
    "Sponge Gourd": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Luffa_aegyptiaca_young_fruit.jpg/640px-Luffa_aegyptiaca_young_fruit.jpg", // Luffa aegyptiaca
    "Star Anise": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Illicium_verum_fruits_and_seeds.jpg/640px-Illicium_verum_fruits_and_seeds.jpg",
    "Star Fruit": "https://m.media-amazon.com/images/I/615edakdmSL._AC_UF1000,1000_QL80_.jpg", // Use Carambola image
    "Sterculia monosperma": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Sterculia_monosperma_seeds.jpg/640px-Sterculia_monosperma_seeds.jpg", // Chinese Chestnut
    "Stevia": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Stevia_rebaudiana_001.JPG/640px-Stevia_rebaudiana_001.JPG",
    "Strawberry": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/640px-PerfectStrawberry.jpg",
    "Sugar Beet": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Beta_vulgaris_var._altissima.jpg/640px-Beta_vulgaris_var._altissima.jpg",
    "Sugarcane": "https://www.mahagro.com/cdn/shop/articles/iStock_000063947343_Medium_4e1c882b-faf0-4487-b45b-c2b557d32442.jpg?v=1541408129",
    "Summer Savory": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Satureja_hortensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-127.jpg/480px-Satureja_hortensis_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-127.jpg",
    "Sunflower": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/1200px-Sunflower_sky_backdrop.jpg",
    "Sunn Hemp": "https://www.feedipedia.org/sites/default/files/images/sunn_hemp_pods.jpg",
    "Sweet Basil": "https://upload.wikimedia.org/wikipedia/commons/9/90/Basil-Basilico-Ocimum_basilicum-albahaca.jpg", // Use Basil image
    "Sweet Dumpling Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Sweet_Dumpling_Squash.jpg/640px-Sweet_Dumpling_Squash.jpg",
    "Sweet Pepper": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Red_capsicum.jpg/640px-Red_capsicum.jpg", // Red Bell Pepper
    "Sweet Potato": "https://c.ndtvimg.com/gws/ms/health-benefits-of-sweet-potatoes/assets/5.png",
    "Sweet Sorghum": "https://cdn.britannica.com/21/136021-050-FA97E7C7/Sorghum.jpg", // Use Sorghum image
    "Sweetcorn": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Corncobs.jpg/640px-Corncobs.jpg", // Use Corn image
    "Sword Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Canavalia_gladiata_flower_pods.jpg/640px-Canavalia_gladiata_flower_pods.jpg", // Canavalia gladiata
    "Tamarind": "https://www.paudhewale.com/s/660a356584d1ac2391ae69de/66336a3e8591daee3f787105/f65ceef8-c46d-400f-8576-849403f19778.png",
    "Tannia": PLACEHOLDER_IMAGE_URL, // Needs image - possibly Xanthosoma sagittifolium
    "Tapioca": "https://www.allrecipes.com/thmb/oYKR2Z1b_CJo8rSjkkEnTKMVsYI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1157268325-2000-c92586e6eb2f48f982e47206987fd67b.jpg", // Use Cassava root image
    "Taro": "https://draxe.com/wp-content/uploads/2020/01/DrAxeTaroRoot_Thumbnail.jpg",
    "Tarragon": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Artemisia_dracunculus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-014.jpg/480px-Artemisia_dracunculus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-014.jpg",
    "Tatsoi": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tatsoi_%28Brassica_rapa_subsp._narinosa%29_-_Leafy_Greens.jpg/640px-Tatsoi_%28Brassica_rapa_subsp._narinosa%29_-_Leafy_Greens.jpg",
    "Tea": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Tea_plant_Camellia_sinensis_in_different_stages_of_growth.jpg/640px-Tea_plant_Camellia_sinensis_in_different_stages_of_growth.jpg",
    "Teak": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Teak_plantation_in_Kerala.jpg/640px-Teak_plantation_in_Kerala.jpg",
    "Teff": "https://i.cdn.newsbytesapp.com/images/l35220241126155735.jpeg",
    "Telfairia occidentalis": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Telfairia_occidentalis_leaves_and_tendrils.jpg/640px-Telfairia_occidentalis_leaves_and_tendrils.jpg", // Fluted Pumpkin
    "Tepary Bean": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Phaseolus_acutifolius_var_latifolius.jpg/640px-Phaseolus_acutifolius_var_latifolius.jpg", // Phaseolus acutifolius
    "Thunbergia grandiflora": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Thunbergia_grandiflora_flower_01.jpg/640px-Thunbergia_grandiflora_flower_01.jpg", // Bengal Clockvine
    "Thyme": "https://www.thespruce.com/thmb/NwgWg8-NjddC5oZRgZgxNKbCDfg=/5304x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-grow-thyme-1402630-hero-d44ccea3e3604c1db97d23761b25de52.jpg",
    "Tigernut": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Cyperus_esculentus_tubers_%28Tiger_nuts%29.jpg/640px-Cyperus_esculentus_tubers_%28Tiger_nuts%29.jpg",
    "Tinda": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Indian_squash_or_Tinda.jpg/640px-Indian_squash_or_Tinda.jpg",
    "Tomato": "https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg",
    "Torch Ginger": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Etlingera_elatior_DS.jpg/640px-Etlingera_elatior_DS.jpg", // Etlingera elatior
    "Triticale": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Triticale_grains.jpg/640px-Triticale_grains.jpg",
    "Tuberose": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Polianthes_tuberosa_flower.jpg/640px-Polianthes_tuberosa_flower.jpg", // Polianthes tuberosa
    "Turban Squash": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Turban_squash.jpg/640px-Turban_squash.jpg",
    "Turmeric": "https://m.media-amazon.com/images/I/718WPJQP88L._AC_UF1000,1000_QL80_.jpg",
    "Turnip": "https://cdn-prod.medicalnewstoday.com/content/images/articles/284/284815/a-bunch-of-turnips-on-a-table.jpg",
    "Uapaca kirkiana": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Uapaca_kirkiana_fruits.jpg/640px-Uapaca_kirkiana_fruits.jpg", // Sugarplum
    "Ube": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Dioscorea_alata_%28Ube%29_tubers.jpg/640px-Dioscorea_alata_%28Ube%29_tubers.jpg", // Often Dioscorea alata
    "Ulluco": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Ullucus_tuberosus_tubers.jpg/640px-Ullucus_tuberosus_tubers.jpg",
    "Urad": "https://i0.wp.com/blog.alittlefarm.co.in/wp-content/uploads/2022/01/BlackGram_big_1.jpg?fit=898%2C888", // Use Black Gram image
    "Valor Papdi": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Lablab_purpureus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-085.jpg/480px-Lablab_purpureus_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-085.jpg", // Use Lablab/Hyacinth Bean image
    "Vanilla": "https://m.media-amazon.com/images/I/71BOfJ1VaSL.jpg",
    "Velvet Bean": "https://m.media-amazon.com/images/I/61sDBiG-CZL._AC_UF1000,1000_QL80_.jpg", // Mucuna pruriens
    "Vetiver": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Chrysopogon_zizanioides_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-038.jpg/480px-Chrysopogon_zizanioides_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-038.jpg", // Chrysopogon zizanioides
    "Walnut": "https://drearth.com/wp-content/uploads/Walnuts-iStock-1058321136.jpg",
    "Water Caltrop": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Trapa_natans_fruits.jpg/640px-Trapa_natans_fruits.jpg", // Trapa natans
    "Water Chestnut": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Eleocharis_dulcis_-_Water_Chestnut.jpg/640px-Eleocharis_dulcis_-_Water_Chestnut.jpg", // Eleocharis dulcis
    "Water Lily": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Nymphaea_alba_flower.jpg/640px-Nymphaea_alba_flower.jpg", // Nymphaea alba
    "Water Spinach": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ipomoea_aquatica_Sturm41.jpg/480px-Ipomoea_aquatica_Sturm41.jpg",
    "Watermelon": "https://static.toiimg.com/photo/120054440.cms",
    "Wax Gourd": "https://i0.wp.com/www.thecreolemeltingpot.com/wp-content/uploads/2018/04/Wax-Gourd.jpg?fit=638%2C442&ssl=1",
    "West Indian Pumpkin": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Cucurbita_moschata_Butternut_long.jpg/640px-Cucurbita_moschata_Butternut_long.jpg", // Cucurbita moschata often
    "Wheat": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Vehn%C3%A4pelto_6.jpg/960px-Vehn%C3%A4pelto_6.jpg",
    "Winged Bean": "https://www.epicgardening.com/wp-content/uploads/2022/04/A-close-up-shot-of-several-developing-winged-bean.jpg",
    "Winter Savory": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Satureja_montana_01.jpg/640px-Satureja_montana_01.jpg", // Satureja montana
    "Wood Apple": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Limonia_acidissima_fruit.jpg/640px-Limonia_acidissima_fruit.jpg", // Limonia acidissima
    "Xanthosoma": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Xanthosoma_sagittifolium_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-154.jpg/480px-Xanthosoma_sagittifolium_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-154.jpg",
    "Yacon": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Smallanthus_sonchifolius_tubers.jpg/640px-Smallanthus_sonchifolius_tubers.jpg",
    "Yam": "https://media.post.rvohealth.io/wp-content/uploads/2023/09/whole-and-halved-raw-african-yam-1296x728-header.jpg",
    "Yam Bean": "https://www.environewsnigeria.com/wp-content/uploads/2023/02/images-2023-02-15T144339.618.jpeg", // Pachyrhizus erosus
    "Yautia": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Xanthosoma_sagittifolium_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-154.jpg/480px-Xanthosoma_sagittifolium_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-154.jpg", // Often Xanthosoma
    "Ylang-Ylang": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Cananga_odorata_flowers.jpg/640px-Cananga_odorata_flowers.jpg", // Cananga odorata
    "Zucchini": "https://images.healthshots.com/healthshots/en/uploads/2023/12/23191220/zucchini.jpg",
    // Add any other crops from your full list here...
};