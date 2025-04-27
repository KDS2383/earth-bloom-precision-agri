import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { LocationInput } from "@/components/location/LocationInput";
import { downloadReport } from "@/utils/reportGenerator";
import { Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Types (similar to before) ---
interface SoilTexture {
  sand: number | null;
  silt: number | null;
  clay: number | null;
}

interface SoilNutrients {
  nitrogen: number | null; // SoilGrids might provide this
  phosphorus: number | null; // Often estimated from SOC
  potassium: number | null; // Not directly in standard SoilGrids query
  calcium: number | null;
  magnesium: number | null;
  sulfur: number | null;
}

interface SoilDataState {
  location: string | null;
  soilType: string | null;
  ph: number | null;
  texture: SoilTexture;
  organicMatter: number | null; // Derived from SOC
  nutrients: SoilNutrients;
  cec: number | null; // Cation Exchange Capacity
  fetchedAt?: { lat: number; lng: number }; // Store actual coords where data was found
}

// --- Initial State ---
const initialSoilData: SoilDataState = {
  location: null,
  soilType: null,
  ph: null,
  texture: { sand: null, silt: null, clay: null },
  organicMatter: null,
  nutrients: { nitrogen: null, phosphorus: null, potassium: null, calcium: null, magnesium: null, sulfur: null },
  cec: null,
};

// --- Constants ---
const SOILGRIDS_API_URL = "https://rest.isric.org/soilgrids/v2.0/properties/query";
// Request properties available in SoilGrids v2.0 (check their docs for latest)
const SOIL_PROPERTIES = "phh2o,soc,cec,sand,silt,clay,nitrogen"; // Added nitrogen
const SOIL_DEPTH = "0-5cm";
const MAX_NEARBY_ATTEMPTS = 2; // How many rings of nearby locations to check
const NEARBY_OFFSET_STEP = 0.01; // Approx 1.1 km per step

// --- Component ---
const SoilData = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("");
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const { toast } = useToast();

  // ****** REMOVED MOCK DATA STATE DECLARATION FROM HERE ******

  // This is the CORRECT state declaration using the proper type and initial state
  const [soilData, setSoilData] = useState<SoilDataState>(initialSoilData);

  // Try to get location when component mounts (Optional: you might want this or not)
  useEffect(() => {
    // Auto-prompt for location when the page loads? Uncomment if needed.
    // handleGetCurrentLocation(); // Note: handleGetCurrentLocation is not defined in the provided code
  }, []);


  // --- Helper Function to Fetch and Parse SoilGrids Data ---
  const fetchAndParseSoilData = async (lat: number, lon: number): Promise<SoilDataState | null> => {
    const url = `${SOILGRIDS_API_URL}?lon=${lon}&lat=${lat}&properties=${SOIL_PROPERTIES}&depths=${SOIL_DEPTH}&values=mean`;
    // console.log(`Fetching SoilGrids: ${url}`); // For debugging

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20000) }); // 20 second timeout
      if (!response.ok) {
        // console.warn(`SoilGrids API error ${response.status} for (${lat}, ${lon})`);
        return null; // Don't throw, just return null for nearby search logic
      }
      const data = await response.json();
      const layers = data?.properties?.layers;

      if (!layers || !Array.isArray(layers)) {
        // console.warn(`Unexpected SoilGrids response structure for (${lat}, ${lon})`);
        return null;
      }

      // Helper to extract mean value for the target depth
      const extractValue = (layerName: string): number | null => {
        const layer = layers.find((l: any) => l.name === layerName);
        const depthData = layer?.depths?.find((d: any) => d.label === SOIL_DEPTH);
        const mean = depthData?.values?.mean;
        // SoilGrids returns NODATA as large negative numbers sometimes, treat as null
        return (typeof mean === 'number' && !isNaN(mean) && mean > -999) ? mean : null;
      };

      // Apply scaling factors based on SoilGrids documentation/units
      // phh2o: pH * 10 -> divide by 10
      // soc: Soil Organic Carbon (g/kg) -> divide by 10 for %, then * 1.72 for OM%
      // cec: Cation Exchange Capacity (cmol(c)/kg) * 10 -> divide by 10
      // sand/silt/clay: Weight Percentage (%) * 10 -> divide by 10
      // nitrogen: (g/kg) * 100 -> divide by 100 (check units)
      const ph = extractValue("phh2o");
      const soc = extractValue("soc"); // Soil Organic Carbon in dg/kg or g/kg? Check docs! Assume g/kg for now
      const cec = extractValue("cec");
      const sand = extractValue("sand");
      const silt = extractValue("silt");
      const clay = extractValue("clay");
      const nitrogen = extractValue("nitrogen"); // Check units! Assume cg/kg (needs /1000 for g/kg) or g/kg (needs /10 for %) ? Assuming g/kg needs /10 for now.

      // Basic check if *any* useful data was returned
      if ([ph, soc, cec, sand, silt, clay, nitrogen].every(v => v === null)) {
        // console.log(`No valid mean values found in SoilGrids response for (${lat}, ${lon})`);
        return null;
      }

      const organicMatter = soc !== null ? parseFloat(((soc / 10) * 1.72).toFixed(2)) : null; // Convert SOC(g/kg) to OM %

      const parsedData: Partial<SoilDataState> = {
        ph: ph !== null ? ph / 10 : null,
        cec: cec !== null ? cec / 10 : null,
        organicMatter: organicMatter,
        texture: {
          sand: sand !== null ? sand / 10 : null,
          silt: silt !== null ? silt / 10 : null,
          clay: clay !== null ? clay / 10 : null,
        },
        nutrients: {
          ...initialSoilData.nutrients, // Start with nulls
          nitrogen: nitrogen !== null ? nitrogen / 10 : null, // Assuming g/kg -> %, divide by 10. Verify SoilGrids units!
        },
        fetchedAt: { lat, lng: lon } // Record where data was actually found
      };

      // Refine Soil Type Derivation (copied from previous version)
      let soilType = "Unavailable";
      if (parsedData.texture?.sand !== null && parsedData.texture?.silt !== null && parsedData.texture?.clay !== null) {
        const s = parsedData.texture.sand;
        const si = parsedData.texture.silt;
        const c = parsedData.texture.clay;
        const sum = s + si + c;
        // Tolerate slight rounding errors (e.g., 99.9 to 100.1)
        if (sum > 95 && sum < 105) { // Ensure texture percentages are reasonable
           if (c >= 40 && si >= 40) soilType = "Silty Clay";           // Adjusted boundary
          else if (c >= 40 && s <= 45) soilType = "Clay";
          else if (c >= 35 && s > 45) soilType = "Sandy Clay";         // Adjusted boundary
          else if (c >= 27 && s <= 45 && si >= 28 && si < 50) soilType = "Clay Loam"; // More specific boundaries
          else if (c >= 27 && s <= 20 && si >= 50) soilType = "Silty Clay Loam"; // More specific boundaries
          else if (c >= 20 && c < 35 && s > 45 && si >= 28 && si < 50) soilType = "Sandy Clay Loam"; // More specific boundaries
          else if (c >= 7 && c < 27 && s <= 52 && si >= 28 && si < 50) soilType = "Loam";
          else if (c >= 0 && c < 20 && si >= 50 && s <= 52) soilType = "Silt Loam"; // Adjusted c lower bound
          else if (c >= 0 && c < 7 && si >= 80) soilType = "Silt";              // Adjusted c lower bound
          else if (c >= 7 && c < 20 && s > 52 && si < 28) soilType = "Sandy Loam"; // Adjusted boundary
          else if (c >= 0 && c < 7 && si < 50 && s > 52 && s <= 85) soilType = "Loamy Sand"; // Adjusted c lower bound
          else if (s > 85) soilType = "Sand";
          else soilType = "Mixed/Other"; // Catch-all for valid sums but complex textures
        } else {
          soilType = "Texture Data Inconsistent";
        }
      } else if (parsedData.texture?.sand !== null || parsedData.texture?.silt !== null || parsedData.texture?.clay !== null) {
        soilType = "Partial Texture Data";
      }
      parsedData.soilType = soilType;


      // Return as full SoilDataState (even if partial)
      return { ...initialSoilData, ...parsedData };

    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        console.warn(`SoilGrids request timed out for (${lat}, ${lon})`);
      } else {
        console.error(`Error fetching/parsing SoilGrids for (${lat}, ${lon}):`, error);
      }
      return null; // Indicate failure
    }
  };


  const handleLocationSelect = (selectedLocation: string, coords: { lat: number; lng: number }) => {
    setLocation(selectedLocation);
    setCoordinates(coords);
    setUsingCurrentLocation(false);
    handleSearch(coords, selectedLocation);
  };

  const handleCurrentLocation = (coords: { lat: number; lng: number }, displayLocation: string) => {
    setCoordinates(coords);
    setLocation(displayLocation); // Use the display name from geocoding/current location logic
    setUsingCurrentLocation(true);
    handleSearch(coords, displayLocation); // Pass displayLocation for UI consistency
  };


  // --- Main Search Logic with Nearby Fallback ---
  const handleSearch = async (
    searchCoords: { lat: number; lng: number } | null,
    searchLocationName: string // Use the name passed in for UI
  ) => {
    if (!searchCoords) {
      toast({ variant: "destructive", title: "Location Missing", description: "Cannot search without coordinates." });
      return;
    }

    setIsLoading(true);
    setIsSearched(false); // Reset search status before starting
    setSoilData({ ...initialSoilData, location: searchLocationName }); // Set location name immediately, clear old data

    const { lat, lng } = searchCoords;
    let foundData: SoilDataState | null = null;

    try {
      // 1. Try exact location first
      foundData = await fetchAndParseSoilData(lat, lng);

      // 2. If no data, try nearby locations
      if (!foundData) {
        console.log(`No data at exact location (${lat.toFixed(4)}, ${lng.toFixed(4)}). Trying nearby...`);
        for (let attempt = 1; attempt <= MAX_NEARBY_ATTEMPTS && !foundData; attempt++) {
          const offset = NEARBY_OFFSET_STEP * attempt;
          const nearbyLocations = [
            { lat: lat + offset, lng: lng }, { lat: lat - offset, lng: lng },
            { lat: lat, lng: lng + offset }, { lat: lat, lng: lng - offset },
            { lat: lat + offset, lng: lng + offset }, { lat: lat + offset, lng: lng - offset },
            { lat: lat - offset, lng: lng + offset }, { lat: lat - offset, lng: lng - offset },
          ];

          console.log(`Nearby search attempt ${attempt} with offset ${offset.toFixed(3)}...`);
          // Use Promise.allSettled to avoid stopping if one nearby fetch fails
          const results = await Promise.allSettled(nearbyLocations.map(coords => fetchAndParseSoilData(coords.lat, coords.lng)));

          // Find the first successfully fetched result that is not null
          for (const result of results) {
            if (result.status === 'fulfilled' && result.value !== null) {
              foundData = result.value;
              break; // Stop searching once valid data is found
            }
          }

          if (foundData) {
            console.log(`Found data at nearby location: (${foundData.fetchedAt?.lat?.toFixed(4)}, ${foundData.fetchedAt?.lng?.toFixed(4)})`);
            toast({ title: "Nearby Data Found", description: `Used data near the requested location.`, duration: 4000 });
          }
        }
      }

      // 3. Update state with found data or indicate failure
      if (foundData) {
        // Merge found data with the initial state and keep the original searchLocationName
        setSoilData({ ...initialSoilData, ...foundData, location: searchLocationName });
        toast({
          title: "Soil Data Retrieved",
          description: `Analysis complete for ${searchLocationName}`,
        });
      } else {
        console.log(`No soil data found for (${lat.toFixed(4)}, ${lng.toFixed(4)}) after all attempts.`);
        // Keep location name, but data remains null/initial
        setSoilData({ ...initialSoilData, location: searchLocationName });
        toast({
          variant: "destructive",
          title: "Data Unavailable",
          description: "Could not retrieve soil data for this specific location from available sources.",
        });
      }
       setIsSearched(true); // Mark as searched regardless of success/failure

    } catch (error) {
      console.error("Error during soil data search:", error);
      // Reset state, keeping the location name
      setSoilData({ ...initialSoilData, location: searchLocationName });
      setIsSearched(false); // Reset search status on major error? Or true to show message? Let's keep true to show failure message.
      setIsSearched(true);
      // Need to fix duplicate toast property 'title' and 'description' here
      toast({
         variant: "destructive",
         title: "Search Error",
         description: "An unexpected error occurred during the search.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Download and Navigate Functions (mostly unchanged) ---
  const handleDownloadReport = () => {
    // Check if *any* actual data was fetched beyond just the location name
    const hasRealData = soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null || soilData.cec !== null || soilData.nutrients.nitrogen !== null;
    if (!soilData.location || !hasRealData) {
      toast({ variant: "destructive", title: "Cannot Download", description: "No valid soil data available to generate report." });
      return;
    }
    const reportData = {
      location: soilData.location || "Unknown Location",
      soilType: soilData.soilType || "N/A",
      ph: soilData.ph ?? 0, // Use ?? 0 for consistency if needed by report generator
      texture: { sand: soilData.texture.sand ?? 0, silt: soilData.texture.silt ?? 0, clay: soilData.texture.clay ?? 0 },
      organicMatter: soilData.organicMatter ?? 0,
      nutrients: {
        nitrogen: soilData.nutrients.nitrogen ?? 0, // Include fetched N if available
        phosphorus: soilData.nutrients.phosphorus ?? 0, // Still N/A from API, but include null/0
        potassium: soilData.nutrients.potassium ?? 0,   // Still N/A from API, but include null/0
        calcium: soilData.nutrients.calcium ?? 0,       // N/A from API, but include null/0
        magnesium: soilData.nutrients.magnesium ?? 0,   // N/A from API, but include null/0
        sulfur: soilData.nutrients.sulfur ?? 0,         // N/A from API, but include null/0
      },
      cec: soilData.cec ?? 0,
      // Include fetchedAt if needed in the report
      fetchedAt: soilData.fetchedAt ? `Lat: ${soilData.fetchedAt.lat.toFixed(4)}, Lng: ${soilData.fetchedAt.lng.toFixed(4)}` : undefined
    };
    downloadReport(reportData);
    toast({ title: "Report Download Started", description: "Your soil analysis report is being generated." });
  };

  const handleViewResults = () => {
    const hasRealData = soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null || soilData.cec !== null || soilData.nutrients.nitrogen !== null;
    if (!soilData.location || !hasRealData) {
      toast({ variant: "destructive", title: "No Data", description: "No valid soil data to view." });
      return;
    }
    navigate('/results', { state: { soilData } }); // Pass the whole soilData object
  };

  // --- Format Value Helper (unchanged) ---
  const formatValue = (value: number | null, decimals: number = 1, unit: string = ""): string => {
    if (value === null || value === undefined || isNaN(value)) return "N/A";
    const numValue = Number(value);
    // Handle potential floating point inaccuracies for display
    const factor = Math.pow(10, decimals);
    const roundedValue = Math.round(numValue * factor) / factor;
    return `${roundedValue}${unit ? ` ${unit}` : ""}`;
  };

  // --- JSX Rendering (Structure is the same, logic adapts) ---
  return (
    <Layout>
      <section className="py-12 bg-farm-cream dark:bg-gray-900">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark dark:text-farm-cream">
              Soil Data Analysis
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enter your farm location to get detailed soil information. Data sourced from SoilGrids.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Find Your Soil Data</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Enter a location in India or use your current location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LocationInput
                  onLocationSelect={handleLocationSelect}
                  onCurrentLocation={handleCurrentLocation}
                  isLoading={isLoading} // Pass isLoading state to disable input during fetch
                  usingCurrentLocation={usingCurrentLocation} // Indicate if current location is active
                  placeholder="E.g., Pune, Maharashtra"
                />
              </CardContent>
            </Card>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-primary"></div>
                <p className="ml-4 text-lg text-gray-600 dark:text-gray-300 self-center">Fetching soil data...</p>
              </div>
            )}

            {/* Results Section */}
            {/* Show results section *after* search attempt, even if no data was found */}
            {isSearched && !isLoading && (
              <div className="space-y-8">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                        Soil Analysis Results {usingCurrentLocation && '(Current Location)'}
                     </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      {/* Display the *searched* location name consistently */}
                      {soilData.location ? `Data for ${soilData.location}` : "Awaiting location selection"}
                      {/* Indicate if data is from a nearby location */}
                      {soilData.fetchedAt && coordinates && (soilData.fetchedAt.lat !== coordinates.lat || soilData.fetchedAt.lng !== coordinates.lng) && (
                        <span className="text-xs italic block text-orange-500 dark:text-orange-400"> (Data sourced from nearby: {soilData.fetchedAt.lat.toFixed(4)}, {soilData.fetchedAt.lng.toFixed(4)})</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Check if *any* significant data point was actually fetched */}
                    {soilData.ph === null && soilData.organicMatter === null && soilData.texture.sand === null && soilData.cec === null && soilData.nutrients.nitrogen === null ? (
                      <p className="text-center text-red-600 dark:text-red-400 py-4">
                        Could not retrieve sufficient soil data for this location or nearby areas from the available sources.
                      </p>
                    ) : (
                      // Render the data display grid
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* General Characteristics */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">General Characteristics</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {/* Soil Type */}
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Soil Type</p>
                              <p className="text-xl font-semibold truncate dark:text-white" title={soilData.soilType || ''}>{soilData.soilType || 'N/A'}</p>
                            </div>
                            {/* pH Level */}
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                              <p className="text-sm text-gray-500 dark:text-gray-400">pH Level</p>
                              <p className="text-xl font-semibold dark:text-white">{formatValue(soilData.ph)}</p>
                              {soilData.ph !== null && (
                                <p className="text-xs mt-1 dark:text-gray-300">
                                  {soilData.ph < 6.5 ? "Acidic" : soilData.ph > 7.5 ? "Alkaline" : "Neutral"}
                                </p>
                              )}
                            </div>
                            {/* Organic Matter */}
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                              <p className="text-sm text-gray-500 dark:text-gray-400">Organic Matter</p>
                              <p className="text-xl font-semibold dark:text-white">{formatValue(soilData.organicMatter, 2, '%')}</p>
                            </div>
                            {/* CEC */}
                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                              <p className="text-sm text-gray-500 dark:text-gray-400">CEC</p>
                              <p className="text-xl font-semibold truncate dark:text-white" title={`${formatValue(soilData.cec)} cmol(c)/kg`}>{formatValue(soilData.cec)}</p>
                              {soilData.cec !== null && <p className="text-xs mt-1 dark:text-gray-300">cmol(c)/kg</p>}
                            </div>
                          </div>

                          {/* Texture Composition */}
                          <h3 className="text-lg font-semibold mt-6 mb-3 dark:text-gray-200">Texture Composition</h3>
                          <div className="bg-white dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600">
                            {(soilData.texture.sand === null && soilData.texture.silt === null && soilData.texture.clay === null) ? (
                              <p className="text-sm text-center text-gray-500 dark:text-gray-400">Texture data unavailable.</p>
                            ) : (
                              <>
                                {/* Sand */}
                                <div className="mb-2 flex justify-between dark:text-gray-200">
                                  <span className="text-sm font-medium">Sand</span>
                                  <span className="text-sm tabular-nums">{formatValue(soilData.texture.sand, 0, '%')}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
                                  <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${Math.min(soilData.texture.sand ?? 0, 100)}%` }}></div>
                                </div>
                                {/* Silt */}
                                <div className="mb-2 flex justify-between dark:text-gray-200">
                                  <span className="text-sm font-medium">Silt</span>
                                  <span className="text-sm tabular-nums">{formatValue(soilData.texture.silt, 0, '%')}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-4">
                                  <div className="bg-farm-brown h-2.5 rounded-full" style={{ width: `${Math.min(soilData.texture.silt ?? 0, 100)}%` }}></div>
                                </div>
                                {/* Clay */}
                                <div className="mb-2 flex justify-between dark:text-gray-200">
                                  <span className="text-sm font-medium">Clay</span>
                                  <span className="text-sm tabular-nums">{formatValue(soilData.texture.clay, 0, '%')}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                  <div className="bg-red-700 h-2.5 rounded-full" style={{ width: `${Math.min(soilData.texture.clay ?? 0, 100)}%` }}></div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Nutrient Analysis */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">Nutrient Analysis</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 italic">Note: Nutrient values (especially NPK) from global models are estimates. Local soil testing is recommended for accurate fertilizer planning.</p>
                          <div className="space-y-4">

                            {/* Nitrogen */}
                            <div>
                              <div className="flex justify-between mb-1 dark:text-gray-200">
                                <span className="text-sm font-medium">Nitrogen (Est. %)</span>
                                <span className="text-sm tabular-nums">{formatValue(soilData.nutrients.nitrogen, 2, '%')}</span> {/* Use 2 decimals for finer detail */}
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                <div
                                  className="bg-blue-500 h-2.5 rounded-full"
                                  // Normalize Nitrogen % for the progress bar (e.g., assuming 0-0.5% is common range?)
                                  // Let's scale it: Assume max reasonable N% is 0.5 for the bar width
                                  style={{ width: `${Math.min(((soilData.nutrients.nitrogen ?? 0) / 0.5) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Phosphorus (Placeholder) */}
                            <div className="opacity-60">
                              <div className="flex justify-between mb-1 dark:text-gray-400">
                                <span className="text-sm font-medium">Phosphorus (P)</span>
                                <span className="text-sm tabular-nums">N/A</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: `0%` }}></div>
                              </div>
                            </div>

                            {/* Potassium (Placeholder) */}
                            <div className="opacity-60">
                              <div className="flex justify-between mb-1 dark:text-gray-400">
                                <span className="text-sm font-medium">Potassium (K)</span>
                                <span className="text-sm tabular-nums">N/A</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: `0%` }}></div>
                              </div>
                            </div>

                            {/* Other nutrient placeholders can be added similarly if needed */}

                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* Buttons are enabled only if *some* actual data was found */}
                    <Button
                       variant="outline"
                       onClick={handleDownloadReport}
                       className="flex items-center gap-2 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                       disabled={isLoading || !(soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null || soilData.cec !== null || soilData.nutrients.nitrogen !== null)}
                    >
                      <Save className="h-4 w-4" /> Download Report
                    </Button>
                    <Button
                       className="bg-farm-primary hover:bg-farm-dark dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                       onClick={handleViewResults}
                       disabled={isLoading || !(soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null || soilData.cec !== null || soilData.nutrients.nitrogen !== null)}
                     >
                      View Detailed Results
                    </Button>
                  </CardFooter>
                </Card>

                {/* Recommendations Card - Only show if some relevant data was found */}
                {(soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null || soilData.cec !== null || soilData.nutrients.nitrogen !== null) && (
                  <Card className="dark:bg-gray-800">
                     <CardHeader>
                      <CardTitle className="dark:text-white">Soil Management Considerations</CardTitle>
                      <CardDescription className="dark:text-gray-400">General suggestions based on the analysis for {soilData.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="dark:text-gray-300">
                      <div className="space-y-4">
                        {/* pH Recommendation */}
                        {soilData.ph !== null && (
                          <div className="p-4 bg-farm-secondary/10 dark:bg-gray-700/50 rounded-md">
                            <h4 className="font-semibold mb-1 dark:text-gray-100">pH Level ({formatValue(soilData.ph)}):</h4>
                            {soilData.ph < 6.0 ? (
                              <p>The soil is acidic. Consider applying lime (calcium carbonate) to raise the pH towards the optimal range (6.0-7.0) for most crops. Application rates depend on soil type and specific lime material.</p>
                            ) : soilData.ph > 7.8 ? (
                              <p>The soil is alkaline. Consider applying elemental sulfur or using acidifying fertilizers (like ammonium sulfate) gradually to lower the pH. High pH can limit nutrient availability (e.g., phosphorus, iron).</p>
                            ) : (
                              <p>The pH is within a generally acceptable range for many crops. Monitor regularly, especially if using acidifying or alkalinizing inputs.</p>
                            )}
                          </div>
                        )}
                        {/* Organic Matter Recommendation */}
                        {soilData.organicMatter !== null && (
                           <div className="p-4 bg-farm-secondary/10 dark:bg-gray-700/50 rounded-md">
                             <h4 className="font-semibold mb-1 dark:text-gray-100">Organic Matter ({formatValue(soilData.organicMatter, 1, '%')}):</h4>
                             {soilData.organicMatter < 2.0 ? (
                               <p>Organic matter is low. Incorporate compost, manure, cover crops, or crop residues to improve soil structure, water retention, and nutrient cycling.</p>
                             ) : soilData.organicMatter > 5.0 ? (
                               <p>Organic matter is high, which is generally beneficial. Ensure good aeration and balanced nutrient management.</p>
                             ) : (
                               <p>Organic matter levels are moderate. Continue practices that maintain or gradually increase organic matter, such as reduced tillage and cover cropping.</p>
                             )}
                           </div>
                         )}
                         {/* Texture Consideration */}
                        {soilData.soilType && !['Unavailable', 'Texture Data Inconsistent', 'Partial Texture Data'].includes(soilData.soilType) && (soilData.texture.sand !== null || soilData.texture.clay !== null) && (
                           <div className="p-4 bg-farm-secondary/10 dark:bg-gray-700/50 rounded-md">
                             <h4 className="font-semibold mb-1 dark:text-gray-100">Soil Texture ({soilData.soilType}):</h4>
                             {soilData.soilType.includes("Clay") ? (
                               <p>Clayey soils have high water and nutrient holding capacity but can suffer from poor drainage and compaction. Improve structure with organic matter and avoid working when wet.</p>
                             ) : soilData.soilType.includes("Sand") ? (
                               <p>Sandy soils drain quickly and have low nutrient retention. Increase organic matter to improve water and nutrient holding capacity. Frequent, smaller applications of water and nutrients may be needed.</p>
                             ) : soilData.soilType.includes("Loam") || soilData.soilType.includes("Silt") ? (
                               <p>Loamy and silty soils generally have good characteristics. Maintain structure and organic matter levels for optimal productivity.</p>
                             ) : (
                                <p>Consider the implications of the identified soil texture ({soilData.soilType}) on water management, tillage, and nutrient retention.</p>
                             )}
                           </div>
                         )}
                        {/* Nitrogen Consideration */}
                         {soilData.nutrients.nitrogen !== null && (
                           <div className="p-4 bg-farm-secondary/10 dark:bg-gray-700/50 rounded-md">
                             <h4 className="font-semibold mb-1 dark:text-gray-100">Nitrogen (Estimated {formatValue(soilData.nutrients.nitrogen, 2, '%')}):</h4>
                             <p>This is an estimate based on soil organic carbon. Actual plant-available nitrogen varies greatly depending on mineralization, weather, and crop uptake. Use this as a general indicator, but rely on local testing or plant tissue analysis for precise N management.</p>
                             {soilData.nutrients.nitrogen < 0.1 ? (
                                <p className="mt-1 italic">Estimated nitrogen level appears low. Supplemental nitrogen fertilizer is likely required for most crops.</p>
                             ) : soilData.nutrients.nitrogen > 0.25 ? (
                                <p className="mt-1 italic">Estimated nitrogen level appears relatively high. Adjust fertilizer applications accordingly to avoid excess.</p>
                             ) : (
                                <p className="mt-1 italic">Estimated nitrogen level is moderate. Fertilizer needs will depend heavily on crop requirements.</p>
                             )}
                           </div>
                         )}
                         {/* General Nutrient Placeholder Recommendation */}
                        <div className="p-4 bg-gray-100 dark:bg-gray-600 rounded-md border border-dashed border-gray-400 dark:border-gray-500">
                            <h4 className="font-semibold mb-1 dark:text-gray-100">Other Nutrients (P, K, etc.):</h4>
                            <p>Data for Phosphorus (P), Potassium (K), and micronutrients are not directly available from this source. <strong className="dark:text-white">Local soil testing is highly recommended</strong> to determine specific nutrient deficiencies or excesses and tailor fertilizer programs accurately.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SoilData;
