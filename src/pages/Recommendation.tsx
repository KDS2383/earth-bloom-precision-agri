
// import { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { 
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// // Mock data to simulate crop options
// const CROP_OPTIONS = [
//   "Acai Berry", "Adzuki Bean", "Almond", "Amaranth", "Anise",
//   "Apple", "Apricot", "Areca Nut", "Artichoke", "Arugula",
//   "Ash Gourd", "Asparagus", "Avocado", "Bael", "Bambara Groundnut",
//   "Bamboo", "Banana", "Barley", "Barnyard Millet", "Basil",
//   "Beetroot", "Bell Pepper", "Betel Vine", "Bitter Gourd", "Black Cumin",
//   "Black Gram (Vigna mungo)", "Black Pepper", "Blackberry", "Blueberry", "Bottle Gourd",
//   "Brazil Nut", "Breadfruit", "Broccoli", "Buckwheat", "Cabbage",
//   "Cacao", "Canola", "Carambola (Starfruit)", "Cardamom", "Carrot",
//   "Cashew", "Cassava", "Castor", "Cauliflower", "Celery",
//   "Chamomile", "Cherry", "Chestnut", "Chia", "Chickpea",
//   "Chili Pepper", "Chive", "Cinnamon", "Clove", "Coconut",
//   "Coffee", "Common Bean", "Coriander", "Corn", "Cotton",
//   "Cowpea", "Cranberry", "Cucumber", "Cumin", "Curry Leaf",
//   "Custard Apple", "Date Palm", "Dill", "Dragonfruit", "Drumstick (Moringa)",
//   "Durian", "Eggplant", "Fava Bean", "Fennel", "Fenugreek",
//   "Fig", "Finger Millet", "Flax", "Foxtail Millet", "Galangal",
//   "Garlic", "Ginger", "Gooseberry", "Grape", "Groundnut",
//   "Guava", "Hazelnut", "Hemp", "Horse Gram", "Hyacinth Bean",
//   "Jackfruit", "Jute", "Kenaf", "Kidney Bean", "Kodo Millet",
//   "Kohlrabi", "Lavender", "Leek", "Lemon Grass", "Lentil",
//   "Lettuce", "Lima Bean", "Longan", "Loquat", "Lotus",
//   "Luffa Gourd", "Lychee", "Macadamia Nut", "Maize", "Malabar Spinach",
//   "Mango", "Mangosteen", "Marjoram", "Millet", "Mint",
//   "Moringa", "Moth Bean", "Mulberry", "Mung Bean", "Mushroom",
//   "Muskmelon", "Mustard", "Nutmeg", "Oats", "Oil Palm",
//   "Okra", "Olive", "Onion", "Orange", "Oregano",
//   "Papaya", "Passion Fruit", "Pea", "Peach", "Pear",
//   "Pearl Millet", "Pecan", "Persimmon", "Pigeon Pea", "Pineapple",
//   "Pistachio", "Plantain", "Plum", "Pomegranate", "Pomelo",
//   "Potato", "Proso Millet", "Pumpkin", "Quinoa", "Radish",
//   "Rambutan", "Raspberry", "Rice", "Rice Bean", "Ridge Gourd",
//   "Roselle", "Rosemary", "Rubber", "Rye", "Safflower",
//   "Saffron", "Sage", "Sesame", "Shallot", "Sisal",
//   "Snake Gourd", "Sorghum", "Soursop", "Soybean", "Spelt",
//   "Spinach", "Stevia", "Strawberry", "Sugar Beet", "Sugarcane",
//   "Sunflower", "Sunn Hemp", "Sweet Potato", "Sweet Sorghum", "Tamarind",
//   "Taro", "Tea", "Teff", "Thyme", "Tomato",
//   "Triticale", "Turmeric", "Turnip", "Vanilla", "Velvet Bean",
//   "Walnut", "Watermelon", "Wax Gourd", "Wheat", "Winged Bean",
//   "Yam", "Yam Bean", "Zucchini"
// ];

// // Define types for better type safety
// type LatLng = {
//   lat: number;
//   lng: number;
// };



// // const SOIL_TYPES = [
// //   { value: "clay", label: "Clay" },
// //   { value: "loam", label: "Loam" },
// //   { value: "sandy", label: "Sandy" },
// //   { value: "silt", label: "Silt" },
// //   { value: "peaty", label: "Peaty" },
// //   { value: "chalky", label: "Chalky" }
// // ];

// const AREA_UNITS = [
//   { value: "acres", label: "Acres" },
//   { value: "hectares", label: "Hectares" },
//   { value: "sqm", label: "Square Meters" }
// ];

// const Recommendation = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const DEFAULT_POSITION: LatLng = { lat: 51.505, lng: -0.09 };

//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const mapInstance = useRef<L.Map | null>(null);
//   const markerInstance = useRef<L.Marker | null>(null);

// // State to store the marker's position, address, city, and pincode
// const [markerPosition, setMarkerPosition] = useState<LatLng>(DEFAULT_POSITION);
// const [address, setAddress] = useState('');
// const [city, setCity] = useState('');
// const [pincode, setPincode] = useState('');
// const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     contact: "",
//     location: { lat: 0, lng: 0 },
//     farmArea: "",
//     areaUnit: "acres",
//     soilType: "",
//     pastCrops: []
//   });
  
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
//   const [availableCrops, setAvailableCrops] = useState<string[]>(CROP_OPTIONS);

//   // Function to fetch address from coordinates using Nominatim
//   const getAddressFromCoordinates = async (lat: number, lon: number) => {
//     setIsLoadingAddress(true);
//     try {
//         const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
//         );
//         const data = await response.json();

//         if (data && data.display_name) {
//             const addressParts = data.address || {};
//             const determinedCity =
//                 addressParts.city ||
//                 addressParts.town ||
//                 addressParts.village ||
//                 addressParts.state_district ||
//                 addressParts.county ||
//                 addressParts.region ||
//                 addressParts.state ||
//                 "Unknown";

//             setAddress(data.display_name);
//             setCity(determinedCity);
//             setPincode(addressParts.postcode || "");
//         } else {
//             setAddress("Address not found");
//             setCity("Unknown");
//             setPincode("");
//         }
//     } catch (error) {
//         console.error("Error fetching address:", error);
//         setAddress("Error fetching address");
//         setCity("");
//         setPincode("");
//     } finally {
//         setIsLoadingAddress(false);
//     }
// };

// // Function to get current location using Geolocation API
//   const useCurrentLocation = () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 const newPosition = { lat: latitude, lng: longitude };

//                 if (markerInstance.current && mapInstance.current) {
//                      markerInstance.current.setLatLng([latitude, longitude]);
//                      mapInstance.current.setView([latitude, longitude], 13); // Zoom level 13
//                      setMarkerPosition(newPosition);
//                      getAddressFromCoordinates(latitude, longitude);
//                 } else {
//                      // If map not yet initialized, update state and useEffect will handle it
//                      setMarkerPosition(newPosition);
//                 }
//             },
//             (error) => {
//                 console.error("Error fetching current location:", error);
//                 alert("Error fetching current location. Please enable location services and try again.");
//             },
//             { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Options for better accuracy
//         );
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// };

// // Function to update marker position by searching an address (Optional, based on your original JS snippet)
// const updateMarkerFromAddress = async (addressQuery: string) => {
//     if (!addressQuery.trim()) return;

//     try {
//         const response = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}&limit=1`
//         );
//         const data = await response.json();

//         if (data.length > 0) {
//             const { lat, lon } = data[0];
//             const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };

//             if (markerInstance.current && mapInstance.current) {
//                 markerInstance.current.setLatLng([newPosition.lat, newPosition.lng]);
//                 mapInstance.current.setView([newPosition.lat, newPosition.lng], 13); // Zoom level 13
//                 setMarkerPosition(newPosition); // Update state
//                 getAddressFromCoordinates(newPosition.lat, newPosition.lng); // Get address for new position
//             } else {
//                 // If map not yet initialized, update state
//                  setMarkerPosition(newPosition);
//             }
//         } else {
//             alert(`Address "${addressQuery}" not found.`);
//         }
//     } catch (error) {
//         console.error("Error fetching location:", error);
//         alert("Error searching for address.");
//     }
// };


// // --- useEffect for Map Initialization and Cleanup ---
// useEffect(() => {
//     // Initialize map only if it hasn't been initialized yet
//     if (mapRef.current && !mapInstance.current) {
//         mapInstance.current = L.map(mapRef.current).setView(
//             [markerPosition.lat, markerPosition.lng],
//             13 // Initial zoom level
//         );

//         // Add OpenStreetMap tile layer
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         }).addTo(mapInstance.current);

//          // --- Custom Marker Icon ---
//         // This part often requires configuring Leaflet's default icon paths
//         // or overriding the default icon creation. The snippet provides one way.
//         // A common issue is missing default marker images.
//         // Ensure you handle this based on your Leaflet setup.
//         // The provided snippet's approach:
//          try {
//             delete (L.Icon.Default.prototype as any)._getIconUrl;

//             L.Icon.Default.mergeOptions({
//                 iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//                 iconUrl: require('leaflet/dist/images/marker-icon.png'),
//                 shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
//             });
//         } catch (e) {
//             console.warn("Could not override Leaflet default icons. Ensure Leaflet images are available or use a different icon approach.", e);
//             // Fallback or alternative icon setup could go here
//         }


//         // Add draggable marker
//         markerInstance.current = L.marker(
//             [markerPosition.lat, markerPosition.lng],
//             { draggable: true /*, icon: customIcon */ } // Using default icon for simplicity, add back customIcon if you fix asset loading
//         ).addTo(mapInstance.current);

//         // --- Event Listeners ---
//         // Update state and fetch address on marker drag end
//         markerInstance.current.on("dragend", () => {
//             const { lat, lng } = markerInstance.current!.getLatLng();
//             setMarkerPosition({ lat, lng }); // Update state immediately
//             getAddressFromCoordinates(lat, lng);
//         });

//         // Update state and fetch address on map click
//         mapInstance.current.on("click", (event: L.LeafletMouseEvent) => {
//             const { lat, lng } = event.latlng;
//             markerInstance.current!.setLatLng([lat, lng]);
//             setMarkerPosition({ lat, lng }); // Update state immediately
//             getAddressFromCoordinates(lat, lng);
//         });

//         // Initial address fetch for the starting position
//         getAddressFromCoordinates(markerPosition.lat, markerPosition.lng);

//     } else if (mapInstance.current && markerInstance.current) {
//          // If map is already initialized, just ensure the marker is at the current state position
//          // This handles cases where markerPosition state is updated by useCurrentLocation before map initialization
//          markerInstance.current.setLatLng([markerPosition.lat, markerPosition.lng]);
//          mapInstance.current.setView([markerPosition.lat, markerPosition.lng], mapInstance.current.getZoom() || 13);
//     }
//     return () => {
//       if (mapInstance.current) {
//           mapInstance.current.remove();
//           mapInstance.current = null;
//       }
//       // Leaflet automatically cleans up markers attached to a removed map,
//       // but it's good practice to null out the ref if you want to be explicit.
//        markerInstance.current = null;
//   };

// }, [markerPosition]);;
  
//   const handleCropSelection = (crop: string) => {
//     if (selectedCrops.length >= 3) {
//       toast({
//         title: "Maximum crops selected",
//         description: "You can only select up to 3 past crops",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     setSelectedCrops([...selectedCrops, crop]);
//     setAvailableCrops(availableCrops.filter(c => c !== crop));
//   };
  
//   const handleRemoveCrop = (crop: string) => {
//     setSelectedCrops(selectedCrops.filter(c => c !== crop));
//     setAvailableCrops([...availableCrops, crop].sort());
//   };
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
  
//   const handleSelectChange = (name: string, value: string) => {
//     setFormData({ ...formData, [name]: value });
//   };
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (selectedCrops.length < 3) {
//       toast({
//         title: "Incomplete crop selection",
//         description: "Please select 3 past crops",
//         variant: "destructive"
//       });
//       return;
//     }
    
//     // In a real app, this would send data to your API
//     console.log("Form submitted:", { ...formData, pastCrops: selectedCrops });
    
//     toast({
//       title: "Form Submitted",
//       description: "Generating your recommendations...",
//     });
    
//     // Navigate to results page
//     navigate("/results");
//   };

//   return (
//     <Layout>
//       <section className="py-12 bg-farm-cream">
//         <div className="container">
//           <div className="text-center mb-12">
//             <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
//               Get Crop Recommendations
//             </h1>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Enter your farm details below and our AI will analyze your specific conditions
//               to recommend the most suitable crops for optimal yield
//             </p>
//           </div>
          
//           <div className="max-w-4xl mx-auto">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Farm Information</CardTitle>
//                 <CardDescription>
//                   Provide details about your farm to receive personalized recommendations
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Name field */}
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Name</Label>
//                       <Input
//                         id="name"
//                         name="name"
//                         placeholder="Your name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
                    
//                     {/* Contact field */}
//                     <div className="space-y-2">
//                       <Label htmlFor="contact">Contact Number</Label>
//                       <Input
//                         id="contact"
//                         name="contact"
//                         placeholder="Your phone number"
//                         value={formData.contact}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Location field - Map placeholder */}
//                   <div className="space-y-4"> {/* Increased space-y for more room */}
//             <div>
//                  <Label htmlFor="farm-location-map">Farm Location</Label> {/* Added htmlFor for accessibility */}
//                  {/* The div for the map. Added id for potential linking with Label */}
//                  {/* Used Tailwind height class and matched the JS snippet's desired height with h-[400px] */}
//                  {/* Removed the placeholder background and text */}
//                  {/* Added a border for clarity */}
//                  <div id="farm-location-map" ref={mapRef} className="w-full h-[400px] rounded-md border border-gray-300">
//                     {/* The map will be rendered inside this div by Leaflet */}
//                  </div>
//             </div>

//             {/* Display fetched location details */}
//             {/* Added conditional rendering for loading state */}
//             <div className="space-y-2 text-sm text-gray-700">
//                 <p><strong>Selected Coordinates:</strong> {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}</p>
//                 <p><strong>Address:</strong> {isLoadingAddress ? 'Fetching address...' : address || 'Select a location on the map'}</p>
//                 <p><strong>City/Town:</strong> {city || '-'}</p>
//                 <p><strong>Pincode:</strong> {pincode || '-'}</p>
//             </div>

//             {/* Add actions */}
//             <div className="flex space-x-2">
//                  <button
//                      type="button" // Important for buttons inside forms
//                      onClick={useCurrentLocation}
//                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                      // Add a disabled state if fetching current location is in progress (though not implemented here)
//                      // disabled={isFetchingLocation}
//                  >
//                      Use My Current Location
//                  </button>
//                  {/* You could add an input and button for searching by address here */}
//                  {/* Example: */}
//                  {/*
//                  <input
//                      type="text"
//                      placeholder="Search address..."
//                      value={searchAddress}
//                      onChange={(e) => setSearchAddress(e.target.value)}
//                      className="border px-2 py-1 rounded-md flex-grow"
//                  />
//                  <button
//                       type="button"
//                       onClick={() => updateMarkerFromAddress(searchAddress)}
//                       className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
//                  >
//                       Search
//                  </button>
//                  */}
//             </div>
//         </div>
                  
//                   {/* Farm Area and Unit */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="farmArea">Farm Area</Label>
//                       <Input
//                         id="farmArea"
//                         name="farmArea"
//                         type="number"
//                         placeholder="Area size"
//                         value={formData.farmArea}
//                         onChange={handleInputChange}
//                         required
//                         min="0"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="areaUnit">Unit</Label>
//                       <Select 
//                         defaultValue={formData.areaUnit}
//                         onValueChange={(value) => handleSelectChange("areaUnit", value)}
//                       >
//                         <SelectTrigger id="areaUnit">
//                           <SelectValue placeholder="Select unit" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {AREA_UNITS.map((unit) => (
//                             <SelectItem key={unit.value} value={unit.value}>
//                               {unit.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
                  
//                   {/* Soil Type */}
//                   {/* <div className="space-y-2">
//                     <Label htmlFor="soilType">Soil Type</Label>
//                     <Select
//                       onValueChange={(value) => handleSelectChange("soilType", value)}
//                     >
//                       <SelectTrigger id="soilType">
//                         <SelectValue placeholder="Select soil type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {SOIL_TYPES.map((soil) => (
//                           <SelectItem key={soil.value} value={soil.value}>
//                             {soil.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div> */}
                  
//                   {/* Past Crops Selection */}
//                   <div className="space-y-3">
//                     <Label>3 Past Crops</Label>
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {selectedCrops.map((crop) => (
//                         <div
//                           key={crop}
//                           className="flex items-center bg-farm-secondary/20 text-farm-primary px-3 py-1 rounded-full text-sm"
//                         >
//                           {crop}
//                           <button
//                             type="button"
//                             className="ml-2 text-farm-primary/70 hover:text-farm-primary"
//                             onClick={() => handleRemoveCrop(crop)}
//                           >
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                               <path d="M18 6 6 18"/>
//                               <path d="m6 6 12 12"/>
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                     </div>

//                     <Select disabled={selectedCrops.length >= 3} onValueChange={handleCropSelection}>
//                       <SelectTrigger id="pastCrops">
//                         <SelectValue placeholder={selectedCrops.length >= 3 ? "3 crops selected" : "Select past crops"} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {availableCrops.map((crop) => (
//                           <SelectItem key={crop} value={crop}>
//                             {crop}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <p className="text-xs text-gray-500">
//                       Please select all 3 crops that you've previously grown
//                     </p>
//                   </div>
                  
//                   {/* Submit button */}
//                   <Button
//                     type="submit"
//                     className="w-full bg-farm-primary hover:bg-farm-dark"
//                     size="lg"
//                   >
//                     Generate Recommendations
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Recommendation;












import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Leaflet's default icon paths can be tricky with bundlers.
// This hack helps, but ensure your build process copies Leaflet images
// or consider using a different icon method (e.g., L.divIcon).
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { BiCurrentLocation } from "react-icons/bi"; // Assuming you have react-icons installed
import Swal from 'sweetalert2'; // Assuming sweetalert2 is installed
import axios from 'axios'; // Assuming axios is installed

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


// Fix Leaflet default icon issue
// @ts-ignore - Ignore TypeScript error for _getIconUrl
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});


// Mock data to simulate crop options (Using the larger list from Recommendation.tsx)
const CROP_OPTIONS = [
  "Acai Berry", "Adzuki Bean", "Almond", "Amaranth", "Anise",
  "Apple", "Apricot", "Areca Nut", "Artichoke", "Arugula",
  "Ash Gourd", "Asparagus", "Avocado", "Bael", "Bambara Groundnut",
  "Bamboo", "Banana", "Barley", "Barnyard Millet", "Basil",
  "Beetroot", "Bell Pepper", "Betel Vine", "Bitter Gourd", "Black Cumin",
  "Black Gram (Vigna mungo)", "Black Pepper", "Blackberry", "Blueberry", "Bottle Gourd",
  "Brazil Nut", "Breadfruit", "Broccoli", "Buckwheat", "Cabbage",
  "Cacao", "Canola", "Carambola (Starfruit)", "Cardamom", "Carrot",
  "Cashew", "Cassava", "Castor", "Cauliflower", "Celery",
  "Chamomile", "Cherry", "Chestnut", "Chia", "Chickpea",
  "Chili Pepper", "Chive", "Cinnamon", "Clove", "Coconut",
  "Coffee", "Common Bean", "Coriander", "Corn", "Cotton",
  "Cowpea", "Cranberry", "Cucumber", "Cumin", "Curry Leaf",
  "Custard Apple", "Date Palm", "Dill", "Dragonfruit", "Drumstick (Moringa)",
  "Durian", "Eggplant", "Fava Bean", "Fennel", "Fenugreek",
  "Fig", "Finger Millet", "Flax", "Foxtail Millet", "Galangal",
  "Garlic", "Ginger", "Gooseberry", "Grape", "Groundnut",
  "Guava", "Hazelnut", "Hemp", "Horse Gram", "Hyacinth Bean",
  "Jackfruit", "Jute", "Kenaf", "Kidney Bean", "Kodo Millet",
  "Kohlrabi", "Lavender", "Leek", "Lemon Grass", "Lentil",
  "Lettuce", "Lima Bean", "Longan", "Loquat", "Lotus",
  "Luffa Gourd", "Lychee", "Macadamia Nut", "Maize", "Malabar Spinach",
  "Mango", "Mangosteen", "Marjoram", "Millet", "Mint",
  "Moringa", "Moth Bean", "Mulberry", "Mung Bean", "Mushroom",
  "Muskmelon", "Mustard", "Nutmeg", "Oats", "Oil Palm",
  "Okra", "Olive", "Onion", "Orange", "Oregano",
  "Papaya", "Passion Fruit", "Pea", "Peach", "Pear",
  "Pearl Millet", "Pecan", "Persimmon", "Pigeon Pea", "Pineapple",
  "Pistachio", "Plantain", "Plum", "Pomegranate", "Pomelo",
  "Potato", "Proso Millet", "Pumpkin", "Quinoa", "Radish",
  "Rambutan", "Raspberry", "Rice", "Rice Bean", "Ridge Gourd",
  "Roselle", "Rosemary", "Rubber", "Rye", "Safflower",
  "Saffron", "Sage", "Sesame", "Shallot", "Sisal",
  "Snake Gourd", "Sorghum", "Soursop", "Soybean", "Spelt",
  "Spinach", "Stevia", "Strawberry", "Sugar Beet", "Sugarcane",
  "Sunflower", "Sunn Hemp", "Sweet Potato", "Sweet Sorghum", "Tamarind",
  "Taro", "Tea", "Teff", "Thyme", "Tomato",
  "Triticale", "Turmeric", "Turnip", "Vanilla", "Velvet Bean",
  "Walnut", "Watermelon", "Wax Gourd", "Wheat", "Winged Bean",
  "Yam", "Yam Bean", "Zucchini"
];

// Define types for better type safety
type LatLng = {
  lat: number;
  lng: number;
};

// Using the AREA_UNITS from Recommendation.tsx structure
const AREA_UNITS = [
  { value: "sqm", label: "Square meters" }, // Corresponds to "Square meters" in InputForm
  { value: "hectares", label: "Hectare" },    // Corresponds to "Hectare" in InputForm
  { value: "acres", label: "Acre" },       // Corresponds to "Acre" in InputForm
  // Add "Bigha" if needed, or remove if not supported by backend
  { value: "bigha", label: "Bigha" }       // Corresponds to "Bigha" in InputForm
];

const Recommendation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Default position (Can use the one from InputForm.js if it's more relevant)
  // const DEFAULT_POSITION: LatLng = { lat: 51.505, lng: -0.09 }; // Rec.tsx default
  const DEFAULT_POSITION: LatLng = { lat: 19.99675137006276, lng: 73.78974342339409 }; // InputForm.js default

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerInstance = useRef<L.Marker | null>(null);

  // State for map location and address details (from both files, combined)
  const [markerPosition, setMarkerPosition] = useState<LatLng>(DEFAULT_POSITION);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [searchAddress, setSearchAddress] = useState(''); // For address search input

  // Form state (combined from both files)
  const [formData, setFormData] = useState({
    name: "",          // username from InputForm
    contact: "",       // contactNum from InputForm
    farmArea: "",      // area from InputForm
    areaUnit: AREA_UNITS[0].value, // measureScale from InputForm, default to sqm
    // soilType: "",   // Omitted as per Recommendation.tsx commented out code
    // location will be taken from markerPosition state
  });

  // State for past crops (from Recommendation.tsx selection model)
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [availableCrops, setAvailableCrops] = useState<string[]>(CROP_OPTIONS);

  // State for form validation errors
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});


  // --- Geolocation and Address Fetching ---

  // Function to fetch address from coordinates using Nominatim
  const getAddressFromCoordinates = async (lat: number, lon: number) => {
    setIsLoadingAddress(true);
    try {
      // Use the more complete Nominatim format from InputForm.js
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();

      if (data && data.display_name) {
        const addressParts = data.address || {};
        // Determine city more robustly as in InputForm.js
        const determinedCity =
          addressParts.city ||
          addressParts.town ||
          addressParts.village ||
          addressParts.state_district ||
          addressParts.county ||
          addressParts.region ||
          addressParts.state ||
          "Unknown";

        setAddress(data.display_name);
        setCity(determinedCity);
        setPincode(addressParts.postcode || "");
      } else {
        setAddress("Address not found"); // Or "" as in InputForm.js
        setCity("Unknown");           // Or "" as in InputForm.js
        setPincode("");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
      setCity("");
      setPincode("");
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Function to get current location using Geolocation API
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingAddress(true); // Show loading while getting location and address
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };

          // Update map/marker if map is initialized
          if (markerInstance.current && mapInstance.current) {
            markerInstance.current.setLatLng([latitude, longitude]);
            mapInstance.current.setView([latitude, longitude], 13); // Zoom level 13
            setMarkerPosition(newPosition); // Update state
            getAddressFromCoordinates(latitude, longitude); // Fetch address
          } else {
            // If map not yet initialized, update state; useEffect will handle map init
            setMarkerPosition(newPosition);
          }
        },
        (error) => {
          console.error("Error fetching current location:", error);
          setIsLoadingAddress(false); // Stop loading on error
          toast({
            title: "Location Error",
            description: "Could not fetch current location. Please enable location services.",
            variant: "destructive"
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Options
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
    }
  };

  // Function to update marker position by searching an address (from InputForm.js)
  const updateMarkerFromAddress = async (addressQuery: string) => {
    if (!addressQuery.trim()) return;
    setIsLoadingAddress(true); // Indicate loading while searching/fetching

    try {
      const response = await fetch(
        // Limit to 1 result and format as json
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };

        // Update map/marker if map is initialized
        if (markerInstance.current && mapInstance.current) {
          markerInstance.current.setLatLng([newPosition.lat, newPosition.lng]);
          mapInstance.current.setView([newPosition.lat, newPosition.lng], 13); // Zoom level 13
          setMarkerPosition(newPosition); // Update state
          getAddressFromCoordinates(newPosition.lat, newPosition.lng); // Get address for new position
        } else {
          // If map not yet initialized, update state; useEffect will handle map init
          setMarkerPosition(newPosition);
        }
         // Clear search input after successful search
         setSearchAddress('');
      } else {
        toast({
          title: "Address Not Found",
          description: `No location found for "${addressQuery}"`,
          variant: "destructive"
        });
        setIsLoadingAddress(false); // Stop loading
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      toast({
        title: "Search Error",
        description: "Error searching for address.",
        variant: "destructive"
      });
      setIsLoadingAddress(false); // Stop loading
    }
  };


  // --- useEffect for Map Initialization and Cleanup ---
  useEffect(() => {
    // Initialize map only if it hasn't been initialized yet
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        [markerPosition.lat, markerPosition.lng],
        13 // Initial zoom level
      );

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Add draggable marker (using default icon after the fix above)
      markerInstance.current = L.marker(
        [markerPosition.lat, markerPosition.lng],
        { draggable: true }
      ).addTo(mapInstance.current);

      // --- Event Listeners ---
      // Update state and fetch address on marker drag end
      markerInstance.current.on("dragend", () => {
        const { lat, lng } = markerInstance.current!.getLatLng();
        setMarkerPosition({ lat, lng }); // Update state immediately
        getAddressFromCoordinates(lat, lng);
      });

      // Update state and fetch address on map click
      mapInstance.current.on("click", (event: L.LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        markerInstance.current!.setLatLng([lat, lng]);
        setMarkerPosition({ lat, lng }); // Update state immediately
        getAddressFromCoordinates(lat, lng);
      });

      // Initial address fetch for the starting position if address is not already set
      // This prevents re-fetching if state was populated by useCurrentLocation before map loaded
      if (!address) {
         getAddressFromCoordinates(markerPosition.lat, markerPosition.lng);
      }


      // Set mapLoaded state if needed (though not used currently)
      // setMapLoaded(true);
    } else if (mapInstance.current && markerInstance.current) {
      // If map is already initialized, just ensure the marker is at the current state position
      // This handles cases where markerPosition state is updated by useCurrentLocation
      // or address search before the map rerenders.
      const currentLatLng = markerInstance.current.getLatLng();
      if (currentLatLng.lat !== markerPosition.lat || currentLatLng.lng !== markerPosition.lng) {
          markerInstance.current.setLatLng([markerPosition.lat, markerPosition.lng]);
           mapInstance.current.setView([markerPosition.lat, markerPosition.lng], mapInstance.current.getZoom() || 13);
      }
    }

    // --- Cleanup function ---
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      // Leaflet automatically cleans up markers attached to a removed map,
      // but nulling the ref is good practice.
      markerInstance.current = null;
    };

     // Depend on markerPosition so the effect reruns to *potentially* center the map
     // if markerPosition is set *before* the initial effect runs (e.g., by useCurrentLocation)
     // However, be careful this doesn't cause infinite loops if getAddressFromCoordinates
     // somehow indirectly modifies markerPosition. The current setup should be fine.
     // A safer dependency list might be an empty array [], relying purely on map events
     // and state updates to move the marker and view after initial load.
     // Let's try the empty array first as it's more typical for map initialization.
     // If marker doesn't move on current location/search before map loads, revisit.
  }, []); // Empty dependency array ensures this runs only once on mount for initialization


   // Effect to fetch address if markerPosition changes after map initialization
    useEffect(() => {
        // Only fetch if map is initialized and markerPosition state changes
        // This handles cases where markerPosition is set before map is ready,
        // or when the map is interacted with (dragend, click)
        if (mapInstance.current && (markerPosition.lat !== DEFAULT_POSITION.lat || markerPosition.lng !== DEFAULT_POSITION.lng)) {
             getAddressFromCoordinates(markerPosition.lat, markerPosition.lng);
        }
         // Also fetch for default position if it wasn't done in the init effect
        if (!address && mapInstance.current && markerPosition.lat === DEFAULT_POSITION.lat && markerPosition.lng === DEFAULT_POSITION.lng) {
             getAddressFromCoordinates(markerPosition.lat, markerPosition.lng);
        }
    }, [markerPosition, mapInstance.current, address]); // Depend on markerPosition, mapInstance, and address (to avoid re-fetching if already set)


  // --- Form Handling ---

  const handleCropSelection = (crop: string) => {
    if (selectedCrops.length >= 3) {
      toast({
        title: "Maximum crops selected",
        description: "You can only select up to 3 past crops",
        variant: "destructive"
      });
      return;
    }

    if (!crop) return; // Prevent adding empty string

    setSelectedCrops([...selectedCrops, crop]);
    setAvailableCrops(availableCrops.filter(c => c !== crop));

    // Clear validation error for pastCrops if present
    if (errors.pastCrops) {
        setErrors(currentErrors => {
            const newErrors = { ...currentErrors };
            delete newErrors.pastCrops;
            return newErrors;
        });
    }
  };

  const handleRemoveCrop = (crop: string) => {
    setSelectedCrops(selectedCrops.filter(c => c !== crop));
    setAvailableCrops([...availableCrops, crop].sort());
  };

  // Handle input changes for text/number fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field
    if (errors[name]) {
        setErrors(currentErrors => {
            const newErrors = { ...currentErrors };
            delete newErrors[name];
            return newErrors;
        });
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });

    // Clear error for this field if applicable (e.g., areaUnit)
    if (errors[name]) {
         setErrors(currentErrors => {
            const newErrors = { ...currentErrors };
            delete newErrors[name];
            return newErrors;
        });
    }
  };


   // --- Validation ---
    const validateForm = () => {
        let currentErrors: { [key: string]: string | undefined } = {};
        let isValid = true;

        if (!formData.name.trim()) {
            currentErrors.name = "Name is required.";
            isValid = false;
        }

        if (!formData.farmArea.trim() || isNaN(parseFloat(formData.farmArea)) || parseFloat(formData.farmArea) <= 0) {
            currentErrors.farmArea = "Enter a valid area size.";
            isValid = false;
        }

         const phonePattern = /^[1-9]\d{9}$/; // Simple 10-digit number starting 1-9
         if (!formData.contact.trim() || !phonePattern.test(formData.contact)) {
             currentErrors.contact = "Enter a valid 10-digit contact number.";
             isValid = false;
         }

        // Check if address was successfully determined (user selected on map or searched)
        if (!address.trim() || !city.trim() || !pincode.trim()) {
             currentErrors.location = "Please select a specific location on the map to get full address details.";
             isValid = false;
        }


        // Must select exactly 3 past crops
        if (selectedCrops.length !== 3) {
             currentErrors.pastCrops = "Please select exactly 3 past crops.";
             isValid = false;
        }


        setErrors(currentErrors);
        return isValid;
    };


  // --- Data Fetching Helper (from InputForm.js) ---
  const fetchSoilData = async (lat: number, lng: number) => {
            let maxAttempts = 5;
            let offset = 0.005; // Start with a small offset

            for (let i = 0; i < maxAttempts; i++) {
                // Vary coordinates slightly to find a covered tile
                let currentLat = lat + (i % 2 === 0 ? offset : -offset);
                let currentLng = lng + (i % 2 === 0 ? (i < 2 ? 0 : offset) : (i < 2 ? 0 : -offset)); // Alternate lat/lng adjustments

                if (i > 1) offset += 0.005; // Increase offset after first couple attempts

                try {
                    console.log(`Attempt ${i + 1}: Fetching soil data at lat=${currentLat.toFixed(6)}, lng=${currentLng.toFixed(6)}`);
                    // Use the SoilGrids API and properties from InputForm.js
                    const soilApi = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${currentLng}&lat=${currentLat}&properties=phh2o,nitrogen,soc,cec,wv0010,potassium_extractable&depth=0-5cm`;
                    const soilResponse = await axios.get(soilApi, { timeout: 15000 }); // Increased timeout

                    console.log("Soil API Response Status:", soilResponse.status);
                    // console.log("Soil API Response Data:", soilResponse.data); // Log full response - can be verbose

                    // Check for valid data within the expected structure
                    const layers = soilResponse.data?.properties?.layers;
                    if (soilResponse.status === 200 && layers && layers.length > 0) {
                         let hasValidData = false;
                         // Check if *any* layer for the specified depth has a non-null mean value
                         for (const layer of layers) {
                             if (layer.depths?.length > 0 && layer.depths[0].values.mean !== null) {
                                 hasValidData = true;
                                 break;
                             }
                         }

                        if (hasValidData) {
                             console.log("✅ Soil Data Found:", soilResponse.data.properties);
                             return soilResponse;
                        } else {
                            console.warn(`⚠️ Attempt ${i + 1}: Soil data available but mean values are null for depth 0-5cm. Trying nearby...`);
                            // Continue trying nearby locations if data is all null for the target depth
                        }
                    } else {
                        console.warn(`⚠️ Attempt ${i + 1}: Soil API returned success but data structure is unexpected or empty.`);
                         // Continue trying nearby locations if structure is bad
                    }

                } catch (error: any) { // Use 'any' or a more specific type if you handle axios errors typed
                    console.error(`❌ Error Fetching Soil Data (Attempt ${i + 1}):`, error.message);

                    if (axios.isAxiosError(error) && error.response) {
                         console.error("Error Response Data:", error.response.data);
                         console.error("Error Response Status:", error.response.status);
                         if (error.response.status === 400 || error.response.status === 404) {
                              console.warn(`⚠️ Coordinates out of bounds or not covered by SoilGrids. Trying nearby...`);
                         } else if (error.response.status >= 500) {
                              console.warn(`⚠️ Soil API server error. Trying nearby...`);
                         } else {
                              console.error("Non-recoverable API error.");
                              return null; // Stop retrying for unhandled HTTP errors
                         }
                    } else if (axios.isAxiosError(error) && error.request) {
                         console.error("No response received from Soil API. Request details:", error.request);
                         console.warn(`⚠️ Soil API request failed (network or timeout). Trying nearby...`);
                         // Continue trying nearby locations on network/timeout errors
                    } else {
                         console.error("Error setting up Soil API request:", error.message);
                         return null; // Stop retrying for request setup errors
                    }
                }
                // Add a small delay before retrying
                await new Promise(resolve => setTimeout(resolve, 700)); // Increased delay slightly
            }

            console.error("❌ Soil data could not be fetched after multiple attempts.");
            return null; // Return null if all attempts fail
        };


  // --- Submission Handling (Combined logic from InputForm.js submitPopUp and handleSubmit) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill all required fields correctly.",
        icon: "error",
      });
      toast({
        title: "Validation Failed",
        description: "Please check the highlighted fields.",
        variant: "destructive"
      });
      return;
    }

    // Show confirmation pop-up using Swal
    const confirmationResult = await Swal.fire({
      title: "Confirm Submission?",
      text: "Submit your farm details to get recommendations?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    });

    if (!confirmationResult.isConfirmed) {
      return; // Stop if user cancels
    }

    // --- Start Submission Process ---
    // Show "Submitting..." loading state
    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we process your data.",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    try {
      // Step 1: Prepare and Send Farm Data
      const farmFormData = new FormData();
      farmFormData.append("username", formData.name);
      farmFormData.append("area", formData.farmArea);
      farmFormData.append("measureScale", formData.areaUnit);
      farmFormData.append("previousCrops", JSON.stringify(selectedCrops));
      farmFormData.append("address", address);
      farmFormData.append("city", city);
      farmFormData.append("pincode", pincode);
      farmFormData.append("contactNum", formData.contact);
      farmFormData.append("markerPosition", JSON.stringify(markerPosition));

      // Omitted file upload logic from InputForm.js as FileUploadPreview component wasn't provided

      console.log("Sending Farm Data:", {
        username: formData.name,
        area: formData.farmArea,
        measureScale: formData.areaUnit,
        previousCrops: selectedCrops,
        address, city, pincode,
        contactNum: formData.contact,
        markerPosition
      });

      // Send farm data to your backend
      const farmDataResponse = await axios.post("https://backend-dev-deployed.vercel.app/api/submit-farm-data", farmFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (farmDataResponse.status !== 200 && farmDataResponse.status !== 201) {
        throw new Error("Failed to save farm data to backend.");
      }

      // Step 2: Fetch Soil Data
      Swal.update({ title: "Fetching Soil Data...", text: "Please wait...", icon: "info" });
      let soilResponse = await fetchSoilData(markerPosition.lat, markerPosition.lng);

      // Process soil data even if fetchSoilData returned null (meaning it failed after retries)
      const soilDataForModel = {
        soil_ph: 0,
        soil_nitrogen: 0,
        soil_phosphorus: 0,
        soil_potassium: 0,
        soil_moisture: 0,
        soil_cec: 0,
        // Keep raw response for result page if needed
        raw_soil_data: soilResponse?.data || null
      };

      if (soilResponse && soilResponse.data && soilResponse.data.properties && soilResponse.data.properties.layers) {
        const layers = soilResponse.data.properties.layers;
        layers.forEach(layer => {
          if (layer.depths?.length > 0) {
            const meanValue = layer.depths[0].values.mean; // Using 0-5cm depth
            if (meanValue !== null) {
              switch (layer.name) {
                case "phh2o": soilDataForModel.soil_ph = meanValue; break;
                case "nitrogen": soilDataForModel.soil_nitrogen = meanValue; break;
                case "soc": soilDataForModel.soil_phosphorus = meanValue; break; // Using SOC as proxy for P
                case "wv0010": soilDataForModel.soil_moisture = meanValue; break;
                case "cec": soilDataForModel.soil_cec = meanValue; break;
                case "potassium_extractable": soilDataForModel.soil_potassium = meanValue; break;
              }
            }
          }
        });
        console.log("Processed Soil Data:", soilDataForModel);
      } else {
           console.warn("Soil data processing failed or data is incomplete.");
           Swal.update({
                title: "Warning",
                text: "Could not fetch accurate soil data. Recommendations may be less precise.",
                icon: "warning",
                showConfirmButton: true,
                confirmButtonText: "Continue"
            });
           await Swal.fire({}); // Wait for the user to click Continue
      }


      // Step 3: Fetch Weather Data
      Swal.update({ title: "Fetching Weather Data...", text: "Please wait...", icon: "info" });
      const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${markerPosition.lat}&longitude=${markerPosition.lng}&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&forecast_days=16`;
      const weatherResponse = await axios.get(weatherApi);
      const weatherDataDaily = weatherResponse.data.daily;
      const weatherDataHourly = weatherResponse.data.hourly;


      // Step 4: Fetch Elevation Data
      Swal.update({ title: "Fetching Elevation Data...", text: "Please wait...", icon: "info" });
      const elevationApi = `https://api.open-meteo.com/v1/elevation?latitude=${markerPosition.lat}&longitude=${markerPosition.lng}`;
      const elevationRes = await axios.get(elevationApi);
      const elevation = elevationRes.data.elevation?.[0] ?? 0; // Use optional chaining and default to 0


      // Process Weather Data for Model
      let avgHourlyHumidity = 0, minHourlyHumidity = 0;
      if (weatherDataHourly?.relative_humidity_2m?.length > 0) {
           avgHourlyHumidity = weatherDataHourly.relative_humidity_2m.reduce((sum: number, value: number) => sum + value, 0) / weatherDataHourly.relative_humidity_2m.length;
           minHourlyHumidity = Math.min(...weatherDataHourly.relative_humidity_2m);
      }

      let avgDailyTemp = 0, minDailyTemp = 0;
       if (weatherDataDaily?.temperature_2m_max?.length > 0) {
            avgDailyTemp = weatherDataDaily.temperature_2m_max.reduce((a: number, b: number) => a + b, 0) / weatherDataDaily.temperature_2m_max.length;
       }
       if (weatherDataDaily?.temperature_2m_min?.length > 0) {
            minDailyTemp = Math.min(...weatherDataDaily.temperature_2m_min);
       }

      let avgWindSpeed = 0;
       if (weatherDataDaily?.wind_speed_10m_max?.length > 0) {
            avgWindSpeed = weatherDataDaily.wind_speed_10m_max.reduce((a: number, b: number) => a + b, 0) / weatherDataDaily.wind_speed_10m_max.length;
       }

      let totalRainfall = 0;
       if (weatherDataDaily?.precipitation_sum?.length > 0) {
            totalRainfall = weatherDataDaily.precipitation_sum.reduce((a: number, b: number) => a + b, 0);
       }


      // Step 5: Merge Data for Recommendation API
      const mergedData = {
        latitude: markerPosition.lat,
        longitude: markerPosition.lng,
        elevation: elevation,
        soil_ph: soilDataForModel.soil_ph,
        soil_nitrogen: soilDataForModel.soil_nitrogen,
        soil_phosphorus: soilDataForModel.soil_phosphorus,
        soil_potassium: soilDataForModel.soil_potassium,
        soil_moisture: soilDataForModel.soil_moisture,
        soil_cec: soilDataForModel.soil_cec,
        avg_temperature: avgDailyTemp,
        min_temperature: minDailyTemp,
        avg_humidity: avgHourlyHumidity,
        min_humidity: minHourlyHumidity,
        avg_wind_speed: avgWindSpeed,
        total_rainfall: totalRainfall,
        historical_crops: selectedCrops, // Use selectedCrops array
      };

      console.log("Merged Data for Recommendation:", mergedData);

      // Step 6: Send Merged Data to Recommendation API
      Swal.update({ title: "Getting Recommendations...", text: "Analyzing data...", icon: "info" });
      // WARNING: ngrok URLs are temporary. Replace with a stable backend URL.
      const recommendationResponse = await axios.post("https://squid-intense-nearly.ngrok-free.app/recommend", mergedData);

      if (recommendationResponse.status !== 200 && recommendationResponse.status !== 201) {
        throw new Error("Failed to get recommendation data from API.");
      }

      console.log("Recommendation Response:", recommendationResponse.data);

      // Store recommendation response data in local storage or pass state (passing state is cleaner)
      // localStorage.setItem('recommendationData', JSON.stringify(recommendationResponse.data));


      // Final Success Message
      Swal.fire({
        title: "Success",
        text: "Data processed and recommendations generated!",
        icon: "success"
      }).then(() => {
        // Step 7: Navigate to result page, passing data in state
        navigate("/results", { // Navigating to "/results" as in original Recommendation.tsx
            state: {
                recommendations: recommendationResponse.data,
                weather: weatherResponse.data, // Pass full weather data if needed on result page
                soil: soilDataForModel.raw_soil_data // Pass raw soil data
                // Include other data if needed, like elevation
            }
        });
      });


    } catch (error: any) { // Use 'any' for error type or handle specific types
      console.error("Error during submission process:", error);
      // Dismiss any previous Swal loading messages
      Swal.close();

      let errorMessage = "An unexpected error occurred during submission.";

      if (error.message === "Failed to save farm data to backend.") {
          errorMessage = "Failed to save farm data. Please check your input and try again.";
      } else if (error.message.startsWith("Failed to get recommendation data from API.")) {
          errorMessage = "Failed to get crop recommendations. The recommendation service might be temporarily unavailable.";
          if (axios.isAxiosError(error) && error.response?.data?.detail) {
              errorMessage += ` Details: ${error.response.data.detail}`;
          }
      } else if (axios.isAxiosError(error)) {
         if (error.response) {
             errorMessage = `API Error: ${error.response.status} - ${error.response.data?.detail || error.message}`;
         } else if (error.request) {
             errorMessage = `Network Error: Could not reach one of the data services.`;
         } else {
             errorMessage = `Request Setup Error: ${error.message}`;
         }
      } else {
          errorMessage = `General Error: ${error.message}`;
      }


      Swal.fire("Error", errorMessage, "error");
       toast({
            title: "Submission Failed",
            description: errorMessage,
            variant: "destructive",
            duration: 5000
        });
    }
  };


  // Removed the handleReturn function as this is the Recommendation page itself,
  // usually linked from Home.

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
                      <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required // Basic browser validation
                        is-invalid={errors.name ? "true" : undefined} // Custom attribute for styling if needed
                      />
                       {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Contact field */}
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number<span className="text-red-500">*</span></Label>
                      <Input
                        id="contact"
                        name="contact"
                        placeholder="Your phone number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required // Basic browser validation
                         type="tel" // Use type tel for mobile keyboards
                         is-invalid={errors.contact ? "true" : undefined}
                      />
                      {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                    </div>
                  </div>

                  {/* Location field - Map */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="farm-location-map">Farm Location<span className="text-red-500">*</span></Label>
                      {/* Added address search input and button */}
                        <div className="flex gap-2 mb-2">
                             <Input
                                 type="text"
                                 placeholder="Search for your farm address..."
                                 value={searchAddress}
                                 onChange={(e) => setSearchAddress(e.target.value)}
                                 onKeyPress={(e) => { if(e.key === 'Enter') { e.preventDefault(); updateMarkerFromAddress(searchAddress); }}} // Allow search on Enter
                                 disabled={isLoadingAddress}
                             />
                             <Button type="button" onClick={() => updateMarkerFromAddress(searchAddress)} disabled={isLoadingAddress || !searchAddress.trim()}>
                                 Search
                             </Button>
                        </div>
                       {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}

                      <div id="farm-location-map" ref={mapRef} className="w-full h-[400px] rounded-md border border-gray-300">
                        {/* The map will be rendered inside this div by Leaflet */}
                      </div>
                    </div>

                    {/* Display fetched location details */}
                    <div className="space-y-1 text-sm text-gray-700">
                      <p><strong>Selected Coordinates:</strong> {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}</p>
                      <p><strong>Address:</strong> {isLoadingAddress ? 'Fetching address...' : address || 'Select a location on the map or search'}</p>
                      <p><strong>City/Town:</strong> {city || '-'}</p>
                      <p><strong>Pincode:</strong> {pincode || '-'}</p>
                    </div>

                    {/* Use Current Location button */}
                    <div>
                       <Button
                           type="button" // Important for buttons inside forms
                           onClick={useCurrentLocation}
                           variant="outline" // Use outline variant
                           disabled={isLoadingAddress}
                       >
                           {isLoadingAddress ? 'Fetching Location...' : <><BiCurrentLocation className="mr-2" /> Use My Current Location</>}
                       </Button>
                    </div>
                  </div>

                  {/* Farm Area and Unit */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmArea">Farm Area<span className="text-red-500">*</span></Label>
                      <Input
                        id="farmArea"
                        name="farmArea"
                        type="number"
                        placeholder="Area size"
                        value={formData.farmArea}
                        onChange={handleInputChange}
                        required
                        min="0"
                         step="0.01" // Allow decimal values
                         is-invalid={errors.farmArea ? "true" : undefined}
                      />
                       {errors.farmArea && <p className="text-red-500 text-sm">{errors.farmArea}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="areaUnit">Unit</Label>
                      <Select
                        value={formData.areaUnit} // Use value prop to control selected item
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

                  {/* Soil Type - Kept commented out as in original Recommendation.tsx */}
                  {/*
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("soilType", value)}
                       value={formData.soilType}
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
                  */}

                  {/* Past Crops Selection */}
                  <div className="space-y-3">
                    <Label>3 Past Crops<span className="text-red-500">*</span></Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedCrops.map((crop) => (
                        <div
                          key={crop}
                          className="flex items-center bg-farm-secondary/20 text-farm-primary px-3 py-1 rounded-full text-sm"
                        >
                          {crop}
                          <button
                            type="button"
                            className="ml-2 text-farm-primary/70 hover:text-farm-primary focus:outline-none"
                            onClick={() => handleRemoveCrop(crop)}
                            aria-label={`Remove ${crop}`}
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
                         {/* Filter out crops already selected */}
                        {CROP_OPTIONS.filter(crop => !selectedCrops.includes(crop)).map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.pastCrops && <p className="text-red-500 text-sm">{errors.pastCrops}</p>}
                    <p className="text-xs text-gray-500">
                      Please select exactly 3 crops that you've previously grown
                    </p>
                  </div>

                  {/* File Upload - Omitted for simplicity as component wasn't provided */}
                  {/*
                    <label>Reports (if any):</label>
                    <FileUploadPreview />
                  */}


                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full bg-farm-primary hover:bg-farm-dark"
                    size="lg"
                    disabled={isLoadingAddress} // Disable submit while fetching address/location info
                  >
                    {isLoadingAddress ? 'Loading Location...' : 'Generate Recommendations'}
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