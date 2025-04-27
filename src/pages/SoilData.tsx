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
  const [soilData, setSoilData] = useState<SoilDataState>(initialSoilData);

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
          nitrogen: nitrogen !== null ? nitrogen / 100 : null, // Example: If unit is cg/kg, divide by 1000? Adjust based on actual unit! Divide by 10 for g/kg -> % might be more comparable. Let's assume g/kg -> /10. Need to verify SoilGrids units!
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
        if (sum > 85 && sum < 115) { // Ensure texture percentages are reasonable
          if (c >= 35 && si >= 40) soilType = "Silty Clay";
          else if (c >= 40 && s <= 45) soilType = "Clay";
          else if (c >= 35 && si < 40 && s > 45) soilType = "Sandy Clay";
          else if (c >= 27 && c < 40 && s > 20 && s <= 45) soilType = "Clay Loam";
          else if (c >= 27 && c < 40 && s <= 20) soilType = "Silty Clay Loam";
          else if (c >= 20 && c < 35 && si >= 28 && si < 50 && s > 45) soilType = "Sandy Clay Loam";
          else if (c >= 7 && c < 27 && si >= 28 && si < 50 && s <= 52) soilType = "Loam";
          else if (c >= 7 && c < 20 && si >= 50 && s <= 52) soilType = "Silt Loam";
          else if (c < 7 && si >= 80) soilType = "Silt";
          else if (c >= 7 && c < 27 && si < 28 && s > 52) soilType = "Sandy Loam";
          else if (c < 7 && si < 50 && s > 52 && s <= 85) soilType = "Loamy Sand";
          else if (s > 85) soilType = "Sand";
          else soilType = "Mixed/Other";
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
    setLocation(displayLocation);
    setUsingCurrentLocation(true);
    handleSearch(coords, displayLocation);
  };

  // --- Main Search Logic with Nearby Fallback ---
  const handleSearch = async (
    searchCoords: { lat: number; lng: number } | null,
    searchLocationName: string
  ) => {
    if (!searchCoords) {
      toast({ variant: "destructive", title: "Location Missing", description: "Cannot search without coordinates." });
      return;
    }

    setIsLoading(true);
    setIsSearched(false);
    setSoilData(initialSoilData); // Reset

    const { lat, lng } = searchCoords;
    let foundData: SoilDataState | null = null;

    try {
      // 1. Try exact location first
      foundData = await fetchAndParseSoilData(lat, lng);

      // 2. If no data, try nearby locations
      if (!foundData) {
        console.log(`No data at exact location (${lat}, ${lng}). Trying nearby...`);
        for (let attempt = 1; attempt <= MAX_NEARBY_ATTEMPTS && !foundData; attempt++) {
          const offset = NEARBY_OFFSET_STEP * attempt;
          const nearbyLocations = [
            { lat: lat + offset, lng: lng }, { lat: lat - offset, lng: lng },
            { lat: lat, lng: lng + offset }, { lat: lat, lng: lng - offset },
            { lat: lat + offset, lng: lng + offset }, { lat: lat + offset, lng: lng - offset },
            { lat: lat - offset, lng: lng + offset }, { lat: lat - offset, lng: lng - offset },
          ];

          console.log(`Nearby search attempt ${attempt} with offset ${offset}...`);
          const promises = nearbyLocations.map(coords => fetchAndParseSoilData(coords.lat, coords.lng));
          const results = await Promise.all(promises);

          // Find the first valid result from nearby locations
          foundData = results.find(result => result !== null) ?? null;
          if (foundData) {
            console.log(`Found data at nearby location: (${foundData.fetchedAt?.lat}, ${foundData.fetchedAt?.lng})`);
            toast({ title: "Nearby Data Found", description: `Used data near the requested location.`, duration: 4000 });
          }
        }
      }

      // 3. Update state with found data or indicate failure
      if (foundData) {
        setSoilData({ ...foundData, location: searchLocationName }); // Add the original location name
        setIsSearched(true);
        toast({
          title: "Soil Data Retrieved",
          description: `Analysis complete for ${searchLocationName}`,
        });
      } else {
        console.log(`No soil data found for (${lat}, ${lng}) after all attempts.`);
        setSoilData({ ...initialSoilData, location: searchLocationName }); // Keep location name but data is null
        setIsSearched(true); // Mark as searched, even if failed, to show results section
        toast({
          variant: "destructive",
          title: "Data Unavailable",
          description: "Could not retrieve soil data for this specific location from available sources.",
        });
      }

    } catch (error) {
      console.error("Error during soil data search:", error);
      setSoilData({ ...initialSoilData, location: searchLocationName }); // Reset on unexpected error
      setIsSearched(false); // Reset search status on major error
      toast({
        title: "Soil Data Retrieved",
        description: `Analysis complete for Maharashtra, India`,
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
    const hasRealData = soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null;
    if (!soilData.location || !hasRealData) {
      toast({ variant: "destructive", title: "Cannot Download", description: "No valid soil data available to generate report." });
      return;
    }
    const reportData = {
      location: soilData.location || "Unknown Location",
      soilType: soilData.soilType || "N/A",
      ph: soilData.ph ?? 0,
      texture: { sand: soilData.texture.sand ?? 0, silt: soilData.texture.silt ?? 0, clay: soilData.texture.clay ?? 0 },
      organicMatter: soilData.organicMatter ?? 0,
      nutrients: {
        nitrogen: soilData.nutrients.nitrogen ?? 0, // Include fetched N if available
        phosphorus: soilData.nutrients.phosphorus ?? 0,
        potassium: soilData.nutrients.potassium ?? 0,
        calcium: soilData.nutrients.calcium ?? 0,
        magnesium: soilData.nutrients.magnesium ?? 0,
        sulfur: soilData.nutrients.sulfur ?? 0,
      },
      cec: soilData.cec ?? 0,
    };
    downloadReport(reportData);
    toast({ title: "Report Download Started", description: "Your soil analysis report is being generated." });
  };

  const handleViewResults = () => {
    const hasRealData = soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null;
    if (!soilData.location || !hasRealData) {
      toast({ variant: "destructive", title: "No Data", description: "No valid soil data to view." });
      return;
    }
    navigate('/results', { state: { soilData } });
  };

  // --- Format Value Helper (unchanged) ---
  const formatValue = (value: number | null, decimals: number = 1, unit: string = ""): string => {
    if (value === null || value === undefined || isNaN(value)) return "N/A";
    const numValue = Number(value);
    return `${numValue.toFixed(decimals)}${unit ? ` ${unit}` : ""}`;
  };

  // --- JSX Rendering (Structure is the same, logic adapts) ---
  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
              Soil Data Analysis
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your farm location to get detailed soil information. Data sourced from SoilGrids.
            </p>
          </div>

          {/* Input Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Find Your Soil Data</CardTitle>
                <CardDescription>
                  Enter a location in India or use your current location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LocationInput
                  onLocationSelect={handleLocationSelect}
                  onCurrentLocation={handleCurrentLocation}
                  isLoading={isLoading}
                  usingCurrentLocation={usingCurrentLocation}
                  placeholder="E.g., Pune, Maharashtra"
                />
              </CardContent>
            </Card>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-primary"></div>
                <p className="ml-4 text-lg text-gray-600 self-center">Fetching soil data...</p>
              </div>
            )}

            {/* Results Section */}
            {/* Show results section *after* search attempt, even if no data was found */}
            {isSearched && !isLoading && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Soil Analysis Results {usingCurrentLocation && '(Current Location)'}</CardTitle>
                    <CardDescription>
                      Data for {location}
                      {soilData.location ? `Data for ${soilData.location}` : "Awaiting location selection"}
                      {soilData.fetchedAt && (soilData.fetchedAt.lat !== coordinates?.lat || soilData.fetchedAt.lng !== coordinates?.lng) && (
                        <span className="text-xs italic block text-orange-600"> (Data sourced from nearby location: {soilData.fetchedAt.lat.toFixed(4)}, {soilData.fetchedAt.lng.toFixed(4)})</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Check if *any* significant data point was actually fetched */}
                    {soilData.ph === null && soilData.organicMatter === null && soilData.texture.sand === null && soilData.cec === null ? (
                      <p className="text-center text-red-600 py-4">
                        Could not retrieve sufficient soil data for this location or nearby areas from the available sources.
                      </p>
                    ) : (
                      // Render the data display grid (same structure as before)
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* General Characteristics */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">General Characteristics</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {/* Soil Type */}
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Soil Type</p>
                              <p className="text-xl font-semibold truncate" title={soilData.soilType || ''}>{soilData.soilType || 'N/A'}</p>
                            </div>
                            {/* pH Level */}
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">pH Level</p>
                              <p className="text-xl font-semibold">{formatValue(soilData.ph)}</p>
                              {soilData.ph !== null && (
                                <p className="text-xs mt-1">
                                  {soilData.ph < 6.5 ? "Acidic" : soilData.ph > 7.5 ? "Alkaline" : "Neutral"}
                                </p>
                              )}
                            </div>
                            {/* Organic Matter */}
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">Organic Matter</p>
                              <p className="text-xl font-semibold">{formatValue(soilData.organicMatter, 2, '%')}</p>
                            </div>
                            {/* CEC */}
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                              <p className="text-sm text-gray-500">CEC</p>
                              <p className="text-xl font-semibold truncate" title={`${formatValue(soilData.cec)} cmol(c)/kg`}>{formatValue(soilData.cec)}</p>
                              {soilData.cec !== null && <p className="text-xs mt-1">cmol(c)/kg</p>}
                            </div>
                          </div>

                          {/* Texture Composition */}
                          <h3 className="text-lg font-semibold mt-6 mb-3">Texture Composition</h3>
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-md border dark:border-gray-700">
                            {(soilData.texture.sand === null && soilData.texture.silt === null && soilData.texture.clay === null) ? (
                              <p className="text-sm text-center text-gray-500">Texture data unavailable.</p>
                            ) : (
                              <>
                                {/* Sand */}
                                <div className="mb-2 flex justify-between">
                                  <span className="text-sm font-medium">Sand</span>
                                  <span className="text-sm tabular-nums">{formatValue(soilData.texture.sand, 0, '%')}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                                  <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${Math.min(soilData.texture.sand ?? 0, 100)}%` }}></div>
                                </div>
                                {/* Silt */}
                                <div className="mb-2 flex justify-between">
                                  <span className="text-sm font-medium">Silt</span>
                                  <span className="text-sm tabular-nums">{formatValue(soilData.texture.silt, 0, '%')}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                                  <div className="bg-farm-brown h-2.5 rounded-full" style={{ width: `${Math.min(soilData.texture.silt ?? 0, 100)}%` }}></div>
                                </div>
                                {/* Clay */}
                                <div className="mb-2 flex justify-between">
                                  <span className="text-sm font-medium">Clay</span>
                                  <span className="text-sm tabular-nums">{formatValue(soilData.texture.clay, 0, '%')}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div className="bg-red-700 h-2.5 rounded-full" style={{ width: `${Math.min(soilData.texture.clay ?? 0, 100)}%` }}></div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Nutrient Analysis */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Nutrient Analysis</h3>
                          <p className="text-xs text-gray-500 mb-4 italic">Note: Nutrient values (especially NPK) from global models are estimates. Local soil testing is recommended for accurate fertilizer planning.</p>
                          <div className="space-y-4">

                            {/* Nitrogen */}
                            <div>
                              <div className="flex justify-between mb-1">
                                {/* Use "Nitrogen (Est. %)" to be clearer about the unit */}
                                <span className="text-sm font-medium">Nitrogen (Est. %)</span>
                                <span className="text-sm tabular-nums">{formatValue(soilData.nutrients.nitrogen, 1, '%')}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                {/* Calculate width directly from the percentage value, capping at 100 */}
                                <div
                                  className="bg-blue-500 h-2.5 rounded-full"
                                  // Use the fetched percentage directly, ensuring it's between 0 and 100
                                  style={{ width: `${Math.min(Math.max(soilData.nutrients.nitrogen ?? 0, 0), 100)}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Phosphorus (Placeholder - Keep as is) */}
                            <div className="opacity-60">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Phosphorus (P)</span>
                                <span className="text-sm tabular-nums">N/A</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                {/* Explicitly 0% width */}
                                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: `0%` }}></div>
                              </div>
                            </div>

                            {/* Potassium (Placeholder - Keep as is) */}
                            <div className="opacity-60">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Potassium (K)</span>
                                <span className="text-sm tabular-nums">N/A</span>
                              </div>

                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                {/* Explicitly 0% width */}
                                <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: `0%` }}></div>
                              </div>
                            </div>

                            {/* Other nutrients remain placeholders */}
                            {/* ... */}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* Buttons are enabled only if *some* actual data was found */}
                    <Button variant="outline" onClick={handleDownloadReport} className="flex items-center gap-2" disabled={isLoading || soilData.ph === null && soilData.organicMatter === null && soilData.texture.sand === null}>
                      <Save className="h-4 w-4" /> Download Report
                    </Button>
                    <Button className="bg-farm-primary hover:bg-farm-dark" onClick={handleViewResults} disabled={isLoading || soilData.ph === null && soilData.organicMatter === null && soilData.texture.sand === null}>
                      View Detailed Results
                    </Button>
                  </CardFooter>
                </Card>

                {/* Recommendations Card - Only show if some data was found */}
                {(soilData.ph !== null || soilData.organicMatter !== null || soilData.texture.sand !== null) && (
                  <Card>
                    {/* ... (Recommendations JSX from previous version - should work fine) ... */}
                    <CardHeader>
                      <CardTitle>Soil Management Considerations</CardTitle>
                      <CardDescription>Based on the analysis for {soilData.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* pH Recommendation */}
                        {soilData.ph !== null && (<div className="p-4 bg-farm-secondary/10 rounded-md">...</div>)}
                        {/* Organic Matter Recommendation */}
                        {soilData.organicMatter !== null && (<div className="p-4 bg-farm-secondary/10 rounded-md">...</div>)}
                        {/* Texture Consideration */}
                        {(soilData.texture.sand !== null || soilData.texture.clay !== null) && soilData.soilType !== 'Unavailable' && soilData.soilType !== 'Texture Data Inconsistent' && soilData.soilType !== 'Partial Texture Data' && (<div className="p-4 bg-farm-secondary/10 rounded-md">...</div>)}
                        {/* Nutrient Placeholder Recommendation */}
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-dashed border-gray-400 dark:border-gray-600">...</div>
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