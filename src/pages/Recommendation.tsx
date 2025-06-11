// src/pages/Recommendation.tsx

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// --- Remove Leaflet Imports ---
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
// import iconUrl from 'leaflet/dist/images/marker-icon.png';
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { BiCurrentLocation } from "react-icons/bi";
import Swal from 'sweetalert2';
import axios from 'axios';

// --- Import Google Maps Components ---
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import the service and type for your custom user profile
import { getUserProfile, saveUserProfile, UserProfile } from '@/services/firebase/userService';
import { useAuth } from "@/context/AuthContext";

// Import Checkbox component
import { Checkbox } from "@/components/ui/checkbox"; 

// --- Remove Leaflet Icon Fix ---
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({ ... });

// Mock data (remains the same)
const CROP_OPTIONS = [ /* ... crop list ... */
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

// LatLng type remains useful
type LatLng = {
  lat: number;
  lng: number;
};

// Area units remain the same
const AREA_UNITS = [
  { value: "sqm", label: "Square meters" },
  { value: "hectares", label: "Hectare" },
  { value: "acres", label: "Acre" },
  { value: "bigha", label: "Bigha" }
];

// --- Google Maps Configuration ---
const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.375rem', // Corresponds to rounded-md
  border: '1px solid #d1d5db', // Corresponds to border-gray-300
};

// Libraries needed for Google Maps API (geocoding for address lookup)
const libraries: ("places" | "geocoding" | "drawing" | "geometry" | "visualization")[] = ['geocoding', 'places'];

const Recommendation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user } = useAuth();

  const DEFAULT_POSITION: LatLng = { lat: 19.99675137006276, lng: 73.78974342339409 };

  // --- Remove Leaflet Refs ---
  // const mapRef = useRef<HTMLDivElement | null>(null); // No longer needed for div ref
  // const mapInstance = useRef<L.Map | null>(null);
  // const markerInstance = useRef<L.Marker | null>(null);

  // --- Google Maps State ---
  const mapRef = useRef<google.maps.Map | null>(null); // Ref to store map instance

  // State for map location and address details
  const [markerPosition, setMarkerPosition] = useState<LatLng>(DEFAULT_POSITION);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  
  // state for the "Save Profile" checkbox
  const [shouldUpdateProfile, setShouldUpdateProfile] = useState(false);

  // Add state to hold the rich user profile data from your service
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Form state (remains the same)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    farmArea: "",
    areaUnit: AREA_UNITS[0].value,
  });

  // Add a new useEffect to fetch the full user profile from your service
  useEffect(() => {
    // We only fetch the profile if the user is authenticated
    if (user) {
      const fetchProfileData = async () => {
        try {
          const profile = await getUserProfile();
          if (profile) {
            setUserProfile(profile);
          }
        } catch (error) {
          console.error("Failed to fetch user profile on recommendation page:", error);
          // Optional: You could show a non-blocking toast here if needed
        }
      };
      fetchProfileData();
    }
  }, [user]); // This effect runs when the auth state is confirmed

  // Add a useEffect to pre-fill the form when the user data is available
  useEffect(() => {
    // This effect now depends on both the basic auth user and the fetched profile
    if (user) {
      // Prioritize the name from the editable profile, but fall back to the auth name
      const nameToSet = userProfile?.displayName || user.displayName || '';
      
      // The contact number can now be correctly fetched from our custom profile data
      const contactToSet = userProfile?.contactNumber || '';

      // Update the form data state
      setFormData(currentData => ({
        ...currentData,
        name: nameToSet,
        contact: contactToSet,
      }));
    }
  }, [user, userProfile]); // This effect runs when auth state is confirmed OR when the full profile is fetched


  // Crop state (remains the same)
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [availableCrops, setAvailableCrops] = useState<string[]>(CROP_OPTIONS);

  // Error state (remains the same)
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  // --- Load Google Maps Script ---
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // Access env variable
    libraries: libraries,
  });

  // --- Geocoding Functions (using Google Maps Geocoder) ---

  // Helper to parse address components from Google Geocoder result
  const parseGoogleAddress = (results: google.maps.GeocoderResult[] | null) => {
    if (!results || results.length === 0) {
      return { displayAddress: "Address not found", city: "Unknown", pincode: "" };
    }
    const result = results[0]; // Use the first result
    const displayAddress = result.formatted_address || "Address details unavailable";
    let foundCity = "Unknown";
    let foundPincode = "";

    // Loop through address components to find city and postal code
    result.address_components?.forEach(component => {
      const types = component.types;
      if (types.includes('locality') || types.includes('administrative_area_level_3')) {
        foundCity = component.long_name;
      } else if ((types.includes('administrative_area_level_2') || types.includes('administrative_area_level_1')) && foundCity === 'Unknown') {
        // Fallback to broader administrative areas if specific locality isn't found
        foundCity = component.long_name;
      } else if (types.includes('postal_code')) {
        foundPincode = component.long_name;
      }
    });

    // Sometimes city isn't in 'locality', might be in sublocality or neighborhood for villages/towns
    if (foundCity === "Unknown") {
      const sublocality = result.address_components?.find(c => c.types.includes("sublocality"));
      if (sublocality) foundCity = sublocality.long_name;
      else {
        const neighborhood = result.address_components?.find(c => c.types.includes("neighborhood"));
        if (neighborhood) foundCity = neighborhood.long_name;
      }
    }

    return { displayAddress, city: foundCity, pincode: foundPincode };
  };


  // Function to fetch address from coordinates using Google Geocoder
  const getAddressFromCoordinates = useCallback(async (lat: number, lng: number) => {
    if (!isLoaded || !window.google) return; // Ensure Maps API is loaded

    setIsLoadingAddress(true);
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);

    try {
      const response = await geocoder.geocode({ location: latLng });
      const { displayAddress, city: determinedCity, pincode: determinedPincode } = parseGoogleAddress(response.results);

      setAddress(displayAddress);
      setCity(determinedCity);
      setPincode(determinedPincode);

      if (displayAddress !== "Address not found" && errors.location) {
        setErrors(currentErrors => ({ ...currentErrors, location: undefined }));
      }
    } catch (error: any) {
      console.error("Error fetching address via Google Geocoder:", error);
      setAddress("Error fetching address");
      setCity("");
      setPincode("");
      toast({ title: "Geocoding Error", description: `Could not fetch address: ${error?.message || 'Unknown error'}`, variant: "destructive" });
    } finally {
      setIsLoadingAddress(false);
    }
  }, [isLoaded, errors.location]); // Depend on isLoaded and error state


  // Function to get current location (remains mostly the same, but updates map differently)
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingAddress(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };

          setMarkerPosition(newPosition); // Update state triggers re-render

          // Pan the map to the new location if map is loaded
          if (mapRef.current) {
            mapRef.current.panTo(newPosition);
            mapRef.current.setZoom(14); // Zoom in a bit more
          }
          // Fetch address (will be called by useEffect watching markerPosition)
          // getAddressFromCoordinates(latitude, longitude); // No need to call directly, useEffect handles it
        },
        (error) => {
          console.error("Error fetching current location:", error);
          setIsLoadingAddress(false);
          toast({
            title: "Location Error",
            description: "Could not fetch current location. Please enable location services.",
            variant: "destructive"
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
    }
  };

  // Function to update marker position by searching an address (using Google Geocoder)
  const updateMarkerFromAddress = async (addressQuery: string) => {
    if (!addressQuery.trim() || !isLoaded || !window.google) return;

    setIsLoadingAddress(true);
    const geocoder = new window.google.maps.Geocoder();

    try {
      const response = await geocoder.geocode({ address: addressQuery });

      if (response.results && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        const newPosition = { lat: location.lat(), lng: location.lng() };

        setMarkerPosition(newPosition); // Update state triggers re-render

        // Pan the map to the new location
        if (mapRef.current) {
          mapRef.current.panTo(newPosition);
          mapRef.current.setZoom(14);
        }
        // Fetch address for the found coordinates (will be called by useEffect)
        // getAddressFromCoordinates(newPosition.lat, newPosition.lng); // No need to call directly

        setSearchAddress(''); // Clear search input
      } else {
        toast({
          title: "Address Not Found",
          description: `No location found for "${addressQuery}"`,
          variant: "destructive"
        });
        setIsLoadingAddress(false);
      }
    } catch (error: any) {
      console.error("Error fetching location via Google Geocoder:", error);
      toast({
        title: "Search Error",
        description: `Error searching for address: ${error?.message || 'Unknown error'}`,
        variant: "destructive"
      });
      setIsLoadingAddress(false);
    }
    // setIsLoadingAddress(false); // Moved inside try/catch/finally
  };


  // --- useEffect for Initial Address Fetch & when MarkerPosition changes ---
  useEffect(() => {
    // Fetch address whenever markerPosition changes, but only if the API is loaded
    if (isLoaded) {
      getAddressFromCoordinates(markerPosition.lat, markerPosition.lng);
    }
    // No cleanup needed here for Google Maps components themselves
  }, [markerPosition, isLoaded, getAddressFromCoordinates]); // Add getAddressFromCoordinates dependency


  // --- Map Event Handlers ---
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map; // Store map instance
    // Optionally set initial bounds or other map options here
  }, []);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  }, []);

  const onMarkerDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  }, []);

  const onMapUnmount = useCallback(() => {
    mapRef.current = null; // Clean up map instance ref
  }, []);


  // --- Form Handling (handleCropSelection, handleRemoveCrop, handleInputChange, handleSelectChange) ---
  // These remain exactly the same as before.
  // ... (copy the existing functions here) ...
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


  // --- Validation (validateForm) ---
  // Remains the same.
  // ... (copy the existing function here) ...
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

    // Check if address was successfully determined
    if (!address.trim() || !city.trim() || city === 'Unknown' || !pincode.trim() || address === 'Address not found' || address === 'Error fetching address') {
      currentErrors.location = "Valid location with address, city, and pincode required. Please select on map or search.";
      // isValid = false; // Keep validation, but maybe allow submission if only pincode is missing sometimes? Decide on strictness. For now, require all.
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


  // --- Data Fetching Helper (fetchSoilData) ---
  // Remains the same.
  // ... (copy the existing function here) ...
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
        const soilApi = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${currentLng}&lat=${currentLat}&properties=phh2o,nitrogen,soc,cec,wv0010,potassium_extractable&depth=0-5cm`;
        const soilResponse = await axios.get(soilApi, { timeout: 15000 }); // Increased timeout

        console.log("Soil API Response Status:", soilResponse.status);

        const layers = soilResponse.data?.properties?.layers;
        if (soilResponse.status === 200 && layers && layers.length > 0) {
          let hasValidData = false;
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
          }
        } else {
          console.warn(`⚠️ Attempt ${i + 1}: Soil API returned success but data structure is unexpected or empty.`);
        }

      } catch (error: any) {
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
          }
        } else if (axios.isAxiosError(error) && error.request) {
          console.error("No response received from Soil API. Request details:", error.request);
          console.warn(`⚠️ Soil API request failed (network or timeout). Trying nearby...`);
        } else {
          console.error("Error setting up Soil API request:", error.message);
        }
      }
      await new Promise(resolve => setTimeout(resolve, 700));
    }

    console.error("❌ Soil data could not be fetched after multiple attempts.");
    return null;
  };


  // --- Submission Handling (handleSubmit) ---
  // Remains mostly the same, just ensure it uses the correct state variables (address, city, pincode, markerPosition)
  // ... (copy the existing function here, double-check variable names match state) ...
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

    // Helper to update Swal step
    const updateSwalStep = (stepNumber: number, status: 'processing' | 'done' | 'warning' | 'error', text?: string) => {
      const stepElement = Swal.getHtmlContainer()?.querySelector(`#swal-step${stepNumber}`) as HTMLElement | null; // Cast needed
      if (stepElement) {
        stepElement.textContent = `${stepNumber}. ${text || stepElement.textContent?.substring(3)}`; // Update text if provided
        if (status === 'done') stepElement.innerHTML = `✅ ${stepElement.textContent}`;
        else if (status === 'warning') stepElement.innerHTML = `⚠️ ${stepElement.textContent}`;
        else if (status === 'error') stepElement.innerHTML = `❌ ${stepElement.textContent}`;
        else {
          stepElement.style.color = 'black'; // Reset color for processing
        }
      }
      const nextStepElement = Swal.getHtmlContainer()?.querySelector(`#swal-step${stepNumber + 1}`) as HTMLElement | null; // Cast needed
      if (nextStepElement && status === 'done') {
        nextStepElement.style.color = 'black'; // Make next step active
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
      farmFormData.append("address", address); // Use state variable
      farmFormData.append("city", city);       // Use state variable
      farmFormData.append("pincode", pincode); // Use state variable
      farmFormData.append("contactNum", formData.contact);
      farmFormData.append("markerPosition", JSON.stringify(markerPosition)); // Use state variable

      console.log("Sending Farm Data:", {
        username: formData.name, area: formData.farmArea, measureScale: formData.areaUnit,
        previousCrops: selectedCrops, address, city, pincode, contactNum: formData.contact, markerPosition
      });

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
        soil_ph: 7.0, // Defaults in case of failure
        soil_nitrogen: 100,
        soil_phosphorus: 100,
        soil_potassium: 150,
        soil_moisture: 20,
        soil_cec: 20,
        raw_soil_data: null as any // Keep raw response for result page if needed
      };

      if (soilResponse && soilResponse.data && soilResponse.data.properties && soilResponse.data.properties.layers) {
        soilDataForModel.raw_soil_data = soilResponse.data.properties; // Store properties
        const layers = soilResponse.data.properties.layers;
        const findMean = (propName: string): number | null => {
          const layer = layers.find((l: any) => l.name === propName);
          return layer?.depths?.[0]?.values?.mean ?? null;
        };

        soilDataForModel.soil_ph = (findMean("phh2o") ?? 70) / 10;
        soilDataForModel.soil_nitrogen = findMean("nitrogen") ?? 100;
        soilDataForModel.soil_phosphorus = findMean("soc") ?? 100; // Using SOC as proxy
        soilDataForModel.soil_potassium = findMean("potassium_extractable") ?? 150;
        soilDataForModel.soil_moisture = (findMean("wv0010") ?? 200) / 10; // Check units
        soilDataForModel.soil_cec = (findMean("cec") ?? 200) / 10; // Check units

        console.log("Processed Soil Data:", soilDataForModel);
        updateSwalStep(2, 'done');
      } else {
        console.warn("Soil data processing failed or data is incomplete.");
        soilFetchStatus = 'warning';
        updateSwalStep(2, 'warning', 'Soil data fetch incomplete/failed. Using defaults.');
        // Defaults are already set
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
      const elevation = elevationRes.data.elevation?.[0] ?? 500; // Default elevation
      updateSwalStep(4, 'done');


      // Process Weather Data for Model
      const safeReduce = (arr: number[] | undefined, initial: number = 0) => arr?.reduce((sum, val) => sum + (val ?? 0), initial) ?? initial;
      const safeMin = (arr: number[] | undefined, defaultVal: number) => arr && arr.length > 0 ? Math.min(...arr.filter(v => v !== null) as number[]) : defaultVal;
      const safeAvg = (arr: number[] | undefined, defaultVal: number) => {
        const validItems = arr?.filter(v => v !== null) as number[] | undefined;
        return validItems && validItems.length > 0 ? safeReduce(validItems) / validItems.length : defaultVal;
      };

      const avgHourlyHumidity = safeAvg(weatherDataHourly?.relative_humidity_2m, 60);
      const minHourlyHumidity = safeMin(weatherDataHourly?.relative_humidity_2m, 40);
      const avgDailyTemp = safeAvg(weatherDataDaily?.temperature_2m_max, 25);
      const minDailyTemp = safeMin(weatherDataDaily?.temperature_2m_min, 15);
      const avgWindSpeed = safeAvg(weatherDataDaily?.wind_speed_10m_max, 10);
      const totalRainfall = safeReduce(weatherDataDaily?.precipitation_sum);


      // Step 5: Merge Data for Recommendation API
      updateSwalStep(5, 'processing');
      const mergedData = {
        latitude: markerPosition.lat,
        longitude: markerPosition.lng,
        elevation: Math.round(elevation),
        soil_ph: parseFloat(soilDataForModel.soil_ph.toFixed(1)),
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
      const backendUrl = "https://crop-recommendation-fastapi.onrender.com/recommend";
      console.log(`Sending data to backend: ${backendUrl}`);

      const recommendationResponse = await axios.post(backendUrl, mergedData, { timeout: 30000 });

      if (recommendationResponse.status !== 200 && recommendationResponse.status !== 201) {
        updateSwalStep(5, 'error');
        throw new Error("Failed to get recommendation data from API.");
      }
      updateSwalStep(5, 'done');

      console.log("Recommendation Response:", recommendationResponse.data);

      // Prepare data for Results page
      const soilDataForResultsPage = {
        ph: mergedData.soil_ph,
        nitrogen: mergedData.soil_nitrogen,
        phosphorus: mergedData.soil_phosphorus,
        potassium: mergedData.soil_potassium,
        cec: mergedData.soil_cec,
        moisture: mergedData.soil_moisture,
        texture: "N/A",
        organic: null,
        soilRecommendations: ["Review nutrient levels based on recommended crops."],
        // raw_soil_properties: soilDataForModel.raw_soil_data // Optionally pass raw data
      };

      if (shouldUpdateProfile) {
        // Prepare the data to be saved.
        // We merge the existing profile with the new form data to avoid
        // accidentally deleting fields that aren't on this form (like photoURL).
        const profileDataToSave: UserProfile = {
          ...userProfile, // Spread existing profile data first
          displayName: formData.name,
          contactNumber: formData.contact,
        };
        
        console.log("Saving updated profile data:", profileDataToSave);
        await saveUserProfile(profileDataToSave);
        // Optional: show a small, non-blocking toast for this specific action
        toast({ title: "Profile details saved." });
      }



      // Final Success Message
      Swal.fire({
        title: "Success!",
        text: "Recommendations generated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Step 7: Navigate to result page
        navigate("/results", {
          state: {
            recommendations: recommendationResponse.data,
            weather: weatherResponse.data,
            soil: soilDataForResultsPage,
            location: city || address.split(',')[0] || "Selected Location",
          }
        });
      });


    } catch (error: any) {
      console.error("Error during submission process:", error);
      Swal.close(); // Close loading Swal

      let errorMessage = "An unexpected error occurred during submission.";
      let errorDetails = "";

      if (axios.isAxiosError(error)) {
        errorDetails = error.message;
        if (error.response) {
          errorMessage = `API Error (${error.response.status})`;
          errorDetails = error.response.data?.detail || JSON.stringify(error.response.data) || error.message;
          errorMessage += `: ${errorDetails.substring(0, 100)}${errorDetails.length > 100 ? '...' : ''}`;
        } else if (error.request) {
          errorMessage = "Network Error";
          errorDetails = "Could not reach one or more data services. Please check your connection and try again.";
        } else {
          errorMessage = "Request Setup Error";
          errorDetails = error.message;
        }
      } else {
        errorMessage = "Processing Error";
        errorDetails = error.message;
      }


      Swal.fire("Submission Failed", `${errorMessage}. ${errorDetails}`, "error");
      toast({
        title: errorMessage,
        description: errorDetails.substring(0, 150) + (errorDetails.length > 150 ? '...' : ''),
        variant: "destructive",
        duration: 7000
      });
    }
  };


  // --- Render Logic ---
  if (loadError) {
    return (
      <Layout>
        <section className="py-12 bg-farm-cream">
          <div className="container text-center text-red-600">
            Error loading Google Maps. Please check your API key setup and network connection. <br />
            Error details: {loadError.message}
          </div>
        </section>
      </Layout>
    );
  }


  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          <div className="text-center mb-12">
            {/* ... */}
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                {/* ... */}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
                    <legend className="text-lg font-semibold px-2">Contact Details</legend>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                      <Input
                        id="name" name="name" placeholder="Your full name"
                        value={formData.name} // This value is now controlled by the state
                        onChange={handleInputChange} required
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number<span className="text-red-500">*</span></Label>
                      <Input
                        id="contact" name="contact" placeholder="10-digit mobile number"
                        value={formData.contact}
                        onChange={handleInputChange} required
                        type="tel" maxLength={10} pattern="[1-9]{1}[0-9]{9}"
                        className={errors.contact ? "border-red-500" : ""}
                      />
                      {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                    </div>

                    {/* Add the Checkbox UI to the form --- */}
                     <div className="flex items-center space-x-2 md:col-span-2 mt-2">
                        <Checkbox
                          id="update-profile"
                          checked={shouldUpdateProfile}
                          onCheckedChange={(checked) => setShouldUpdateProfile(Boolean(checked))}
                        />
                        <Label htmlFor="update-profile" className="text-sm font-normal cursor-pointer">
                          Save these details to my profile for next time.
                        </Label>
                      </div>


                  </fieldset>

                  {/* --- Location Details (uses Google Map) --- */}
                  <fieldset className="space-y-4 border p-4 rounded-md">
                    <legend className="text-lg font-semibold px-2">Farm Location<span className="text-red-500">*</span></legend>
                    {/* Address Search (remains the same) */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="text" placeholder="Search address or place name..."
                        value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); updateMarkerFromAddress(searchAddress); } }}
                        disabled={isLoadingAddress || !isLoaded} // Disable if map not loaded
                        className="flex-grow"
                      />
                      <Button type="button" onClick={() => updateMarkerFromAddress(searchAddress)} disabled={isLoadingAddress || !searchAddress.trim() || !isLoaded} className="w-full sm:w-auto">
                        {isLoadingAddress && searchAddress ? 'Searching...' : 'Search'}
                      </Button>
                      <Button type="button" onClick={useCurrentLocation} variant="outline"
                        disabled={isLoadingAddress || !isLoaded} // Disable if map not loaded
                        className="w-full sm:w-auto"
                      >
                        {isLoadingAddress && !searchAddress ? 'Fetching...' : <><BiCurrentLocation className="mr-1" /> Use Current</>}
                      </Button>
                    </div>
                    {errors.location && <p className="text-red-500 text-sm -mt-2 mb-2">{errors.location}</p>}

                    {/* Google Map Container */}
                    <div className="relative"> {/* Added relative positioning for loading overlay */}
                      {!isLoaded ? (
                        <div style={mapContainerStyle} className="flex items-center justify-center bg-gray-200 text-gray-600">
                          Loading Map...
                        </div>
                      ) : (
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          center={markerPosition} // Center map on marker position
                          zoom={13}
                          onLoad={onMapLoad}
                          onUnmount={onMapUnmount}
                          onClick={onMapClick}
                          options={{ // Optional: Disable some controls if desired
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                          }}
                        >
                          <MarkerF
                            position={markerPosition}
                            draggable={true}
                            onDragEnd={onMarkerDragEnd}
                          />
                        </GoogleMap>
                      )}
                      {/* Loading Overlay for Address Fetch */}
                      {isLoadingAddress && isLoaded && (
                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 pointer-events-none">
                          <p className="text-gray-700 font-semibold bg-white/80 px-4 py-2 rounded shadow">Loading location data...</p>
                        </div>
                      )}
                    </div>


                    {/* Displayed Location Info (remains the same) */}
                    <div className="space-y-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
                      <p><strong>Selected Coordinates:</strong> {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}</p>
                      <p><strong>Address:</strong> {isLoadingAddress && !address ? <span className="italic">Fetching...</span> : (address || <span className="italic text-gray-500">Click on map or search</span>)}</p>
                      <p><strong>City/Town:</strong> {city || '-'}</p>
                      <p><strong>Pincode:</strong> {pincode || '-'}</p>
                    </div>
                  </fieldset>

                  {/* --- Farm & Crop Details (remains the same) --- */}
                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-md">
                    <legend className="text-lg font-semibold px-2">Farm & Crop History</legend>
                    {/* Farm Area and Unit */}
                    <div className="space-y-2">
                      <Label htmlFor="farmArea">Farm Area<span className="text-red-500">*</span></Label>
                      <div className="flex gap-2">
                        <Input
                          id="farmArea" name="farmArea" type="number" placeholder="Area size"
                          value={formData.farmArea} onChange={handleInputChange} required min="0" step="any"
                          className={`flex-grow ${errors.farmArea ? "border-red-500" : ""}`}
                        />
                        <Select value={formData.areaUnit} onValueChange={(value) => handleSelectChange("areaUnit", value)}>
                          <SelectTrigger id="areaUnit" className="w-[150px]">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {AREA_UNITS.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.farmArea && <p className="text-red-500 text-sm">{errors.farmArea}</p>}
                    </div>
                    {/* Past Crops Selection */}
                    <div className="space-y-3 md:col-span-2">
                      <Label>3 Past Crops<span className="text-red-500">*</span></Label>
                      <p className="text-xs text-gray-500 -mt-2">Select exactly 3 crops previously grown here.</p>
                      <div className="flex flex-wrap gap-2 mb-3 min-h-[30px] p-2 border rounded-md bg-gray-50">
                        {selectedCrops.length === 0 && <span className="text-sm text-gray-400 italic">No crops selected</span>}
                        {selectedCrops.map((crop) => (
                          <div key={crop} className="flex items-center bg-farm-secondary/20 text-farm-primary px-3 py-1 rounded-full text-sm whitespace-nowrap">
                            {crop}
                            <button type="button" className="ml-2 text-farm-primary/70 hover:text-red-600 focus:outline-none" onClick={() => handleRemoveCrop(crop)} aria-label={`Remove ${crop}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <Select disabled={selectedCrops.length >= 3} onValueChange={(value) => value && handleCropSelection(value)} value="">
                        <SelectTrigger id="pastCrops" className={errors.pastCrops ? "border-red-500" : ""}>
                          <SelectValue placeholder={selectedCrops.length >= 3 ? "Maximum 3 crops selected" : "Add a past crop..."} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCrops.map((crop) => (<SelectItem key={crop} value={crop}>{crop}</SelectItem>))}
                        </SelectContent>
                      </Select>
                      {errors.pastCrops && <p className="text-red-500 text-sm">{errors.pastCrops}</p>}
                    </div>
                  </fieldset>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="w-full bg-farm-primary hover:bg-farm-dark text-lg py-3"
                    size="lg"
                    disabled={isLoadingAddress || !isLoaded} // Also disable if map is not loaded
                  >
                    {!isLoaded ? 'Map Loading...' : isLoadingAddress ? 'Finalizing Location...' : 'Generate Recommendations'}
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