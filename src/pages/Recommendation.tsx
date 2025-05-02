// src/pages/Recommendation.tsx

// ... (imports and other code remain the same) ...
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
        // Clear location error if address is found
        if (errors.location) {
             setErrors(currentErrors => ({...currentErrors, location: undefined}));
        }
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
            // Fetch address immediately even if map isn't ready
            getAddressFromCoordinates(latitude, longitude);
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
          // Fetch address immediately even if map isn't ready
          getAddressFromCoordinates(newPosition.lat, newPosition.lng);
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
    // Prevent initialization if map already exists
    if (!mapRef.current || mapInstance.current) return;

    // Initialize map
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
    markerInstance.current.on("dragend", () => {
      if (!markerInstance.current) return;
      const { lat, lng } = markerInstance.current.getLatLng();
      setMarkerPosition({ lat, lng }); // Update state triggers address fetch via separate useEffect
    });

    mapInstance.current.on("click", (event: L.LeafletMouseEvent) => {
      if (!markerInstance.current) return;
      const { lat, lng } = event.latlng;
      markerInstance.current.setLatLng([lat, lng]);
      setMarkerPosition({ lat, lng }); // Update state triggers address fetch via separate useEffect
    });

    // Initial address fetch for the starting position if address is not already set
    if (!address) {
       getAddressFromCoordinates(markerPosition.lat, markerPosition.lng);
    }

    // --- Cleanup function ---
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      markerInstance.current = null; // Explicitly nullify marker ref on cleanup
    };

  }, []); // Empty dependency array ensures this runs only once on mount for initialization

   // Effect to fetch address ONLY when markerPosition changes
    useEffect(() => {
        // Don't run on initial mount if coordinates are default, wait for interaction or useCurrentLocation
        if (markerPosition.lat !== DEFAULT_POSITION.lat || markerPosition.lng !== DEFAULT_POSITION.lng || address === '') {
            getAddressFromCoordinates(markerPosition.lat, markerPosition.lng);
        }
    }, [markerPosition]); // Depend only on markerPosition


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
        // Allow submission even if address isn't fully resolved, but have validation error
        if (!address.trim() || !city.trim() || !pincode.trim() || address === 'Address not found' || address === 'Error fetching address' ) {
             currentErrors.location = "Valid location with address, city, and pincode required. Please select on map or search.";
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
                              // Still continue trying nearby points in this case too
                         }
                    } else if (axios.isAxiosError(error) && error.request) {
                         console.error("No response received from Soil API. Request details:", error.request);
                         console.warn(`⚠️ Soil API request failed (network or timeout). Trying nearby...`);
                         // Continue trying nearby locations on network/timeout errors
                    } else {
                         console.error("Error setting up Soil API request:", error.message);
                         // Don't necessarily stop retrying for setup errors, maybe temporary issue
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
      confirmButtonColor: "#3085d6", // Blue
      cancelButtonColor: "#d33", // Red
      confirmButtonText: "Yes, Submit!",
    });

    if (!confirmationResult.isConfirmed) {
      return; // Stop if user cancels
    }

    // --- Start Submission Process ---
    // Show "Submitting..." loading state
    Swal.fire({
      title: "Processing Your Request",
      html: `
        <div style="text-align: left; padding: 10px;">
          <p id="swal-step1">1. Saving farm details...</p>
          <p id="swal-step2" style="color: grey;">2. Fetching soil data...</p>
          <p id="swal-step3" style="color: grey;">3. Fetching weather data...</p>
          <p id="swal-step4" style="color: grey;">4. Fetching elevation data...</p>
          <p id="swal-step5" style="color: grey;">5. Generating recommendations...</p>
        </div>
      `,
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Show spinner
      },
      showConfirmButton: false, // Hide the default OK button
    });

     // Helper to update Swal step - Fixed TypeScript errors by properly casting elements
     const updateSwalStep = (stepNumber: number, status: 'processing' | 'done' | 'warning' | 'error', text?: string) => {
        const stepElement = Swal.getHtmlContainer()?.querySelector(`#swal-step${stepNumber}`);
        if (stepElement) {
          stepElement.textContent = `${stepNumber}. ${text || stepElement.textContent?.substring(3)}`; // Update text if provided
          if (status === 'done') stepElement.innerHTML = `✅ ${stepElement.textContent}`;
          else if (status === 'warning') stepElement.innerHTML = `⚠️ ${stepElement.textContent}`;
          else if (status === 'error') stepElement.innerHTML = `❌ ${stepElement.textContent}`;
          else {
            // Use setAttribute instead of direct style assignment
            stepElement.setAttribute('style', 'color: black');
          }
        }
         // Make next step grey initially
        const nextStepElement = Swal.getHtmlContainer()?.querySelector(`#swal-step${stepNumber + 1}`);
         if (nextStepElement && status === 'done') {
           // Use setAttribute instead of direct style assignment
           nextStepElement.setAttribute('style', 'color: black');
        }
    };


    try {
      // Step 1: Prepare and Send Farm Data
      updateSwalStep(1, 'processing', 'Saving farm details...');
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

      // Omitted file upload logic

      console.log("Sending Farm Data:", { /* ... data ... */ });

      // Send farm data to your backend
      const farmDataResponse = await axios.post("https://backend-dev-deployed.vercel.app/api/submit-farm-data", farmFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (farmDataResponse.status !== 200 && farmDataResponse.status !== 201) {
        updateSwalStep(1, 'error');
        throw new Error("Failed to save farm data to backend.");
      }
      updateSwalStep(1, 'done');

      // Step 2: Fetch Soil Data
      updateSwalStep(2, 'processing');
      let soilResponse = await fetchSoilData(markerPosition.lat, markerPosition.lng);
      let soilFetchStatus: 'done' | 'warning' | 'error' = 'done';

      // Process soil data
       const soilDataForModel = {
        soil_ph: 0, // Default values
        soil_nitrogen: 0,
        soil_phosphorus: 0,
        soil_potassium: 0,
        soil_moisture: 0,
        soil_cec: 0,
        // Keep raw response for result page if needed
        raw_soil_data: soilResponse?.data?.properties || null // Store only properties
      };

      if (soilResponse && soilResponse.data && soilResponse.data.properties && soilResponse.data.properties.layers) {
        const layers = soilResponse.data.properties.layers;
        const findMean = (propName: string): number | null => {
            const layer = layers.find((l: any) => l.name === propName);
            return layer?.depths?.[0]?.values?.mean ?? null; // Return null if not found or mean is null
        };

        // Assign values, converting units if necessary and handling nulls
        soilDataForModel.soil_ph = (findMean("phh2o") ?? 70) / 10; // pH needs division by 10
        soilDataForModel.soil_nitrogen = findMean("nitrogen") ?? 100; // N (mg/kg) - Provide a reasonable default if null
        soilDataForModel.soil_phosphorus = findMean("soc") ?? 100; // Using SOC (dg/kg) as P proxy - check units/conversion if needed, provide default
        soilDataForModel.soil_potassium = findMean("potassium_extractable") ?? 150; // K (mg/kg) - Provide default
        soilDataForModel.soil_moisture = (findMean("wv0010") ?? 200) / 10; // wv0010 (cm3/dm3 -> %) needs division by 10? Check SoilGrids docs - Provide default
        soilDataForModel.soil_cec = (findMean("cec") ?? 200) / 10; // CEC (mmol(c)/kg -> cmol(+)/kg or meq/100g) needs division by 10 - Provide default

         console.log("Processed Soil Data:", soilDataForModel);
         updateSwalStep(2, 'done');
      } else {
           console.warn("Soil data processing failed or data is incomplete.");
           soilFetchStatus = 'warning'; // Mark as warning if fetch failed
           updateSwalStep(2, 'warning', 'Soil data fetch incomplete/failed. Using defaults.');
           // Assign defaults explicitly again just in case
            soilDataForModel.soil_ph = 7.0;
            soilDataForModel.soil_nitrogen = 100;
            soilDataForModel.soil_phosphorus = 100;
            soilDataForModel.soil_potassium = 150;
            soilDataForModel.soil_moisture = 20;
            soilDataForModel.soil_cec = 20;
      }


      // Step 3: Fetch Weather Data
      updateSwalStep(3, 'processing');
      const weatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${markerPosition.lat}&longitude=${markerPosition.lng}&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&forecast_days=16`;
      const weatherResponse = await axios.get(weatherApi);
      const weatherDataDaily = weatherResponse.data.daily;
      const weatherDataHourly = weatherResponse.data.hourly;
      updateSwalStep(3, 'done');


      // Step 4: Fetch Elevation Data
      updateSwalStep(4, 'processing');
      const elevationApi = `https://api.open-meteo.com/v1/elevation?latitude=${markerPosition.lat}&longitude=${markerPosition.lng}`;
      const elevationRes = await axios.get(elevationApi);
      const elevation = elevationRes.data.elevation?.[0] ?? 500; // Default elevation if API fails
      updateSwalStep(4, 'done');


      // Process Weather Data for Model (Using defaults if API failed or data missing)
      const safeReduce = (arr: number[] | undefined, initial: number = 0) => arr?.reduce((sum, val) => sum + (val ?? 0), initial) ?? initial;
      const safeLength = (arr: any[] | undefined) => arr?.length ?? 0;
      const safeMin = (arr: number[] | undefined, defaultVal: number) => arr && arr.length > 0 ? Math.min(...arr.filter(v => v !== null) as number[]) : defaultVal;
      const safeAvg = (arr: number[] | undefined, defaultVal: number) => {
          const validItems = arr?.filter(v => v !== null) as number[] | undefined;
          return validItems && validItems.length > 0 ? safeReduce(validItems) / validItems.length : defaultVal;
      };


      const avgHourlyHumidity = safeAvg(weatherDataHourly?.relative_humidity_2m, 60); // Default 60%
      const minHourlyHumidity = safeMin(weatherDataHourly?.relative_humidity_2m, 40); // Default 40%

      const avgDailyTemp = safeAvg(weatherDataDaily?.temperature_2m_max, 25); // Default 25 C
      const minDailyTemp = safeMin(weatherDataDaily?.temperature_2m_min, 15); // Default 15 C

      const avgWindSpeed = safeAvg(weatherDataDaily?.wind_speed_10m_max, 10); // Default 10 km/h
      const totalRainfall = safeReduce(weatherDataDaily?.precipitation_sum); // Default 0


      // Step 5: Merge Data for Recommendation API
       updateSwalStep(5, 'processing'); // Indicate this step starts
      const mergedData = {
        latitude: markerPosition.lat,
        longitude: markerPosition.lng,
        elevation: Math.round(elevation), // Send rounded elevation
        soil_ph: parseFloat(soilDataForModel.soil_ph.toFixed(1)), // Ensure correct format/precision
        soil_nitrogen: Math.round(soilDataForModel.soil_nitrogen),
        soil_phosphorus: Math.round(soilDataForModel.soil_phosphorus),
        soil_potassium: Math.round(soilDataForModel.soil_potassium),
        soil_moisture: Math.round(soilDataForModel.soil_moisture),
        soil_cec: Math.round(soilDataForModel.soil_cec),
        avg_temperature: parseFloat(avgDailyTemp.toFixed(1)),
        min_temperature: parseFloat(minDailyTemp.toFixed(1)),
        avg_humidity: parseFloat(avgHourlyHumidity.toFixed(1)),
        min_humidity: parseFloat(minHourlyHumidity.toFixed(1)),
        avg_wind_speed: parseFloat(avgWindSpeed.toFixed(1)),
        total_rainfall: parseFloat(totalRainfall.toFixed(1)),
        historical_crops: selectedCrops,
      };

      console.log("Merged Data for Recommendation:", mergedData);

      // Step 6: Send Merged Data to Recommendation API
      // WARNING: ngrok URLs are temporary. Replace with a stable backend URL.
      // const backendUrl = "https://squid-intense-nearly.ngrok-free.app/recommend"; // Store in variable
      const backendUrl = "https://crop-recommendation-fastapi.onrender.com/recommend"; // Store in variable
      console.log(`Sending data to backend: ${backendUrl}`);

      const recommendationResponse = await axios.post(backendUrl, mergedData, { timeout: 30000 }); // Increased timeout

      if (recommendationResponse.status !== 200 && recommendationResponse.status !== 201) {
        updateSwalStep(5, 'error');
        throw new Error("Failed to get recommendation data from API.");
      }
      updateSwalStep(5, 'done');

      console.log("Recommendation Response:", recommendationResponse.data);

      // Prepare data for Results page
      const soilDataForResultsPage = {
          ph: mergedData.soil_ph, // Use the values sent to the model
          nitrogen: mergedData.soil_nitrogen,
          phosphorus: mergedData.soil_phosphorus,
          potassium: mergedData.soil_potassium,
          cec: mergedData.soil_cec,
          moisture: mergedData.soil_moisture,
          texture: "N/A", // Texture not available from this API
          organic: null,  // Organic not directly available (SOC used as proxy for P)
          soilRecommendations: ["Review nutrient levels based on recommended crops."], // Generic recommendation
          // You could potentially pass the raw soil properties if needed for display
          // raw_soil_properties: soilDataForModel.raw_soil_data
      };


      // Final Success Message
      Swal.fire({
        title: "Success!",
        text: "Recommendations generated successfully.",
        icon: "success",
        timer: 1500, // Automatically close after 1.5 seconds
        showConfirmButton: false,
      }).then(() => {
          // Step 7: Navigate to result page, passing data in state
          navigate("/results", {
              state: {
                  recommendations: recommendationResponse.data, // Object from backend { recommendations: [], processing_time_seconds: X }
                  weather: weatherResponse.data,        // Raw weather data for charts on results page
                  soil: soilDataForResultsPage,         // Pass the PROCESSED soil data object for display
                  location: city || address.split(',')[0] || "Selected Location", // Best available location string
              }
          });
      });


    } catch (error: any) { // Use 'any' for error type or handle specific types
      console.error("Error during submission process:", error);
      // Close any Swal loading messages first
      Swal.close();

      let errorMessage = "An unexpected error occurred during submission.";
      let errorDetails = ""; // To hold specific details for the toast

      if (axios.isAxiosError(error)) {
        errorDetails = error.message;
        if (error.response) {
           // API returned an error status code (4xx or 5xx)
           errorMessage = `API Error (${error.response.status})`;
           errorDetails = error.response.data?.detail || JSON.stringify(error.response.data) || error.message;
           errorMessage += `: ${errorDetails.substring(0, 100)}${errorDetails.length > 100 ? '...' : ''}`; // Truncate long details
        } else if (error.request) {
           // Request was made but no response received (network error, timeout)
           errorMessage = "Network Error";
           errorDetails = "Could not reach one or more data services. Please check your connection and try again.";
        } else {
           // Error setting up the request
           errorMessage = "Request Setup Error";
           errorDetails = error.message;
        }
      } else {
          // General JavaScript error
          errorMessage = "Processing Error";
          errorDetails = error.message;
      }


      Swal.fire("Submission Failed", `${errorMessage}. ${errorDetails}`, "error");
       toast({
            title: errorMessage,
            description: errorDetails.substring(0, 150) + (errorDetails.length > 150 ? '...' : ''), // Show truncated details in toast
            variant: "destructive",
            duration: 7000 // Longer duration for errors
        });
    }
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
                  {/* --- Personal Details --- */}
                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
                    <legend className="text-lg font-semibold px-2">Contact Details</legend>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number<span className="text-red-500">*</span></Label>
                      <Input
                        id="contact"
                        name="contact"
                        placeholder="10-digit mobile number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                        type="tel"
                        maxLength={10}
                        pattern="[1-9]{1}[0-9]{9}" // HTML5 pattern validation
                        className={errors.contact ? "border-red-500" : ""}
                      />
                      {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                    </div>
                  </fieldset>

                  {/* --- Location Details --- */}
                   <fieldset className="space-y-4 border p-4 rounded-md">
                      <legend className="text-lg font-semibold px-2">Farm Location<span className="text-red-500">*</span></legend>
                       {/* Address Search */}
                       <div className="flex flex-col sm:flex-row gap-2">
                           <Input
                               type="text"
                               placeholder="Search address or place name..."
                               value={searchAddress}
                               onChange={(e) => setSearchAddress(e.target.value)}
                               onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); updateMarkerFromAddress(searchAddress); } }}
                               disabled={isLoadingAddress}
                               className="flex-grow"
                           />
                           <Button type="button" onClick={() => updateMarkerFromAddress(searchAddress)} disabled={isLoadingAddress || !searchAddress.trim()} className="w-full sm:w-auto">
                               {isLoadingAddress && searchAddress ? 'Searching...' : 'Search'}
                           </Button>
                           <Button
                               type="button"
                               onClick={useCurrentLocation}
                               variant="outline"
                               disabled={isLoadingAddress}
                               className="w-full sm:w-auto"
                           >
                               {isLoadingAddress && !searchAddress ? 'Fetching...' : <><BiCurrentLocation className="mr-1" /> Use Current</>}
                           </Button>
                       </div>
                       {errors.location && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.location}</p>}

                       {/* Leaflet Map Container */}
                      <div id="farm-location-map" ref={mapRef} className="w-full h-[400px] rounded-md border border-gray-300 bg-gray-100">
                        {/* Map renders here */}
                         {isLoadingAddress && (
                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                                <p className="text-gray-700 font-semibold">Loading location data...</p>
                             </div>
                         )}
                      </div>

                      {/* Displayed Location Info */}
                      <div className="space-y-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
                        <p><strong>Selected Coordinates:</strong> {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}</p>
                        <p><strong>Address:</strong> {isLoadingAddress ? <span className="italic">Fetching...</span> : (address || <span className="italic text-gray-500">Click on map or search</span>)}</p>
                        <p><strong>City/Town:</strong> {city || '-'}</p>
                        <p><strong>Pincode:</strong> {pincode || '-'}</p>
                      </div>
                  </fieldset>


                  {/* --- Farm & Crop Details --- */}
                   <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
                       <legend className="text-lg font-semibold px-2">Farm & Crop History</legend>

                       {/* Farm Area and Unit */}
                       <div className="space-y-2">
                         <Label htmlFor="farmArea">Farm Area<span className="text-red-500">*</span></Label>
                         <div className="flex gap-2">
                             <Input
                                 id="farmArea"
                                 name="farmArea"
                                 type="number"
                                 placeholder="Area size"
                                 value={formData.farmArea}
                                 onChange={handleInputChange}
                                 required
                                 min="0"
                                 step="any" // Allow any decimal
                                 className={`flex-grow ${errors.farmArea ? "border-red-500" : ""}`}
                             />
                             <Select
                                 value={formData.areaUnit}
                                 onValueChange={(value) => handleSelectChange("areaUnit", value)}
                             >
                                 <SelectTrigger id="areaUnit" className="w-[150px]"> {/* Fixed width for unit dropdown */}
                                     <SelectValue placeholder="Unit" />
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
                           {errors.farmArea && <p className="text-red-500 text-sm">{errors.farmArea}</p>}
                       </div>

                       {/* Past Crops Selection */}
                       <div className="space-y-3 md:col-span-2"> {/* Span full width on medium screens */}
                         <Label>3 Past Crops<span className="text-red-500">*</span></Label>
                          <p className="text-xs text-gray-500 -mt-2">Select exactly 3 crops previously grown here.</p>
                         <div className="flex flex-wrap gap-2 mb-3 min-h-[30px] p-2 border rounded-md bg-gray-50"> {/* Added background and min-height */}
                           {selectedCrops.length === 0 && <span className="text-sm text-gray-400 italic">No crops selected</span>}
                           {selectedCrops.map((crop) => (
                             <div
                               key={crop}
                               className="flex items-center bg-farm-secondary/20 text-farm-primary px-3 py-1 rounded-full text-sm whitespace-nowrap"
                             >
                               {crop}
                               <button
                                 type="button"
                                 className="ml-2 text-farm-primary/70 hover:text-red-600 focus:outline-none"
                                 onClick={() => handleRemoveCrop(crop)}
                                 aria-label={`Remove ${crop}`}
                               >
                                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                               </button>
                             </div>
                           ))}
                         </div>

                         <Select
                              disabled={selectedCrops.length >= 3}
                              onValueChange={(value) => value && handleCropSelection(value)} // Ensure value is not null/undefined
                              value="" // Keep Select uncontrolled for adding items
                         >
                           <SelectTrigger id="pastCrops" className={errors.pastCrops ? "border-red-500" : ""}>
                             <SelectValue placeholder={selectedCrops.length >= 3 ? "Maximum 3 crops selected" : "Add a past crop..."} />
                           </SelectTrigger>
                           <SelectContent>
                             {/* Add a search input inside dropdown? (Optional complex enhancement) */}
                             {availableCrops.map((crop) => (
                               <SelectItem key={crop} value={crop}>
                                 {crop}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                         {errors.pastCrops && <p className="text-red-500 text-sm">{errors.pastCrops}</p>}

                       </div>
                   </fieldset>


                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full bg-farm-primary hover:bg-farm-dark text-lg py-3" // Larger button
                    size="lg"
                    disabled={isLoadingAddress} // Disable submit while fetching address/location info
                  >
                    {isLoadingAddress ? 'Finalizing Location...' : 'Generate Recommendations'}
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
