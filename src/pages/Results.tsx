
import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Icons for considerations
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { TestTube, FlaskConical, Virus } from "lucide-react";

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

// Helper function to calculate summary weather data (Unchanged)
const calculateWeatherDataSummary = (weatherData: any) => {
  if (!weatherData || !weatherData.daily || !weatherData.hourly) { return null; }
  const daily = weatherData.daily;
  const hourly = weatherData.hourly;
  let avgTemp = null, minTemp = null, maxTemp = null;
  if (daily.temperature_2m_max && daily.temperature_2m_min && daily.temperature_2m_max.length > 0) {
    const validMaxTemps = daily.temperature_2m_max.filter((t: number | null) => t !== null) as number[];
    const validMinTemps = daily.temperature_2m_min.filter((t: number | null) => t !== null) as number[];
    if (validMaxTemps.length > 0 || validMinTemps.length > 0) {
      const totalMax = validMaxTemps.reduce((sum, temp) => sum + temp, 0);
      const totalMin = validMinTemps.reduce((sum, temp) => sum + temp, 0);
      const totalCount = validMaxTemps.length + validMinTemps.length;
      if (totalCount > 0) { avgTemp = ((totalMax + totalMin) / totalCount).toFixed(1); }
      if (validMinTemps.length > 0) { minTemp = Math.min(...validMinTemps); }
      if (validMaxTemps.length > 0) { maxTemp = Math.max(...validMaxTemps); }
    }
  }
  let totalPrecipitation = null;
  if (daily.precipitation_sum && daily.precipitation_sum.length > 0) {
    const validPrecip = daily.precipitation_sum.filter((p: number | null) => p !== null) as number[];
    if (validPrecip.length > 0) { totalPrecipitation = validPrecip.reduce((sum, precip) => sum + precip, 0).toFixed(2); }
  }
  let avgHumidity = null;
  if (hourly.relative_humidity_2m && hourly.relative_humidity_2m.length > 0) {
    const validHumidity = hourly.relative_humidity_2m.filter((h: number | null) => h !== null) as number[];
    if (validHumidity.length > 0) {
      const totalHumidity = validHumidity.reduce((sum, humidity) => sum + humidity, 0);
      avgHumidity = (totalHumidity / validHumidity.length).toFixed(0);
    }
  }
  let avgWindSpeed = null;
  if (daily.wind_speed_10m_max && daily.wind_speed_10m_max.length > 0) {
     const validWindSpeeds = daily.wind_speed_10m_max.filter((s: number | null) => s !== null) as number[];
     if (validWindSpeeds.length > 0) {
        const totalWindSpeed = validWindSpeeds.reduce((sum, speed) => sum + speed, 0);
        avgWindSpeed = (totalWindSpeed / validWindSpeeds.length).toFixed(1);
     }
  }
  return {
    temperature: { avg: avgTemp, min: minTemp, max: maxTemp, },
    rainfall: totalPrecipitation, humidity: avgHumidity, windSpeed: avgWindSpeed,
    temperatureUnit: weatherData.daily_units?.temperature_2m_max || "°C",
    precipitationUnit: weatherData.daily_units?.precipitation_sum || "mm",
    humidityUnit: weatherData.hourly_units?.relative_humidity_2m || "%",
    windSpeedUnit: weatherData.daily_units?.wind_speed_10m_max || "km/h",
    dailyForecast: daily, hourlyForecast: hourly,
  };
};

// Define fallback/default data structure (Unchanged)
const fallbackResultData = {
  location: "Analyzed Location",
  soilData: {
    ph: null, texture: "N/A", nitrogen: null, phosphorus: null, potassium: null,
    organic: null, cec: null, moisture: null,
    nutrients: { nitrogen: null, phosphorus: null, potassium: null, organic: null, },
    soilRecommendations: ["No specific soil recommendations available."],
  },
  weatherData: {
    temperature: { avg: null, min: null, max: null }, rainfall: null, humidity: null,
    windSpeed: null, temperatureUnit: "°C", precipitationUnit: "mm", humidityUnit: "%",
    windSpeedUnit: "km/h", dailyForecast: null, hourlyForecast: null,
  },
  recommendations: [], // Will hold mapped data including 'details' (which contains diseases)
  processingTime: null,
};

// Placeholder Image URL
const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/500x300?text=Image+Not+Available";

// Helper function to map backend data to UI (Updated to include diseases)
const mapBackendCropToUI = (backendCrop: any, index: number) => {
    const imageUrlFromApi = backendCrop.image_url;
    // 'diseases' and 'predicted_diseases' are now part of backendCrop (passed within details)
    return {
        id: index + 1,
        name: backendCrop.crop_name || "Unknown Crop",
        image: imageUrlFromApi || PLACEHOLDER_IMAGE_URL,
        suitability: null, // Not available from backend
        details: backendCrop, // Pass the entire backend object
    };
};

// --- Results Component ---
const Results = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("crops");
  const [resultData, setResultData] = useState(fallbackResultData);

  // useEffect to process data received via navigation state (Unchanged)
  useEffect(() => {
    const stateData = location.state;
    console.log("Raw state data received:", stateData);
    if (stateData) {
      const backendRecommendationObject = stateData.recommendations;
      const mappedRecommendations = backendRecommendationObject?.recommendations?.map(mapBackendCropToUI) ?? [];
      const processingTime = backendRecommendationObject?.processing_time_seconds;
      const soilDataFromState = stateData.soil;
      console.log("Soil data from state:", soilDataFromState);
      const processedSoilData = {
         ...fallbackResultData.soilData,
         ph: soilDataFromState?.ph ?? fallbackResultData.soilData.ph,
         texture: soilDataFromState?.texture ?? fallbackResultData.soilData.texture,
         nitrogen: soilDataFromState?.nitrogen ?? fallbackResultData.soilData.nitrogen,
         phosphorus: soilDataFromState?.phosphorus ?? fallbackResultData.phosphorus,
         potassium: soilDataFromState?.potassium ?? fallbackResultData.potassium,
         organic: soilDataFromState?.organic ?? fallbackResultData.organic,
         cec: soilDataFromState?.cec ?? fallbackResultData.cec,
         moisture: soilDataFromState?.moisture ?? fallbackResultData.moisture,
         nutrients: {
             nitrogen: soilDataFromState?.nitrogen ?? fallbackResultData.soilData.nutrients.nitrogen,
             phosphorus: soilDataFromState?.phosphorus ?? fallbackResultData.soilData.nutrients.phosphorus,
             potassium: soilDataFromState?.potassium ?? fallbackResultData.soilData.nutrients.potassium,
             organic: soilDataFromState?.organic ?? fallbackResultData.soilData.nutrients.organic,
         },
         soilRecommendations: soilDataFromState?.soilRecommendations ?? fallbackResultData.soilData.soilRecommendations,
      };
      console.log("Processed soil data:", processedSoilData);
      const weatherDataFromState = stateData.weather;
      const processedWeatherData = calculateWeatherDataSummary(weatherDataFromState) || fallbackResultData.weatherData;
      const locationFromState = stateData.location || fallbackResultData.location;
      setResultData({ 
        location: locationFromState, 
        soilData: processedSoilData, 
        weatherData: processedWeatherData,
        recommendations: mappedRecommendations, // Set the mapped recommendations
        processingTime: processingTime !== undefined && processingTime !== null ? Number(processingTime) : fallbackResultData.processingTime,
      });
    } else {
      console.warn("No result data found in navigation state. Displaying fallback data.");
      setResultData(fallbackResultData);
    }
  }, [location.state]);

  // --- Weather Chart Data and Options (Unchanged) ---
  const { chartData: weatherChartData, chartOptions: weatherChartOptions, hasWeatherDataForChart } = useMemo(() => {
    const daily = resultData.weatherData?.dailyForecast;
    if (!daily?.time?.length) return { chartData: null, chartOptions: null, hasWeatherDataForChart: false };
    const precipitationUnit = resultData.weatherData?.precipitationUnit || "mm";
    const temperatureUnit = resultData.weatherData?.temperatureUnit || "°C";
    const validTimes = daily.time || [];
    const validMaxTemps = (daily.temperature_2m_max || []).map((t: number | null) => t === null ? NaN : t);
    const validMinTemps = (daily.temperature_2m_min || []).map((t: number | null) => t === null ? NaN : t);
    const validPrecip = (daily.precipitation_sum || []).map((p: number | null) => p === null ? NaN : p);
    const data: ChartData<keyof ChartTypeRegistry> = {
      labels: validTimes.map((t: string) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" })),
      datasets: [
        { type: "line" as const, label: `Max Temp (${temperatureUnit})`, data: validMaxTemps, borderColor: "rgb(255, 99, 132)", backgroundColor: "rgba(255, 99, 132, 0.5)", yAxisID: "y-temp", tension: 0.3, pointRadius: 3, pointHoverRadius: 5, spanGaps: true },
        { type: "line" as const, label: `Min Temp (${temperatureUnit})`, data: validMinTemps, borderColor: "rgb(53, 162, 235)", backgroundColor: "rgba(53, 162, 235, 0.5)", yAxisID: "y-temp", tension: 0.3, pointRadius: 3, pointHoverRadius: 5, spanGaps: true },
        { type: "bar" as const, label: `Precipitation (${precipitationUnit})`, data: validPrecip, backgroundColor: "rgba(75, 192, 192, 0.6)", borderColor: "rgba(75, 192, 192, 1)", yAxisID: "y-precip", barThickness: "flex", categoryPercentage: 0.7, barPercentage: 0.8 },
      ],
    };
    const options: ChartOptions<keyof ChartTypeRegistry> = {
      responsive: true, 
      maintainAspectRatio: false,
      plugins: { 
        legend: { position: "top" as const }, 
        title: { display: true, text: "Daily Temperature & Precipitation Forecast" }, 
        tooltip: { mode: "index", intersect: false } 
      },
      scales: {
        x: { title: { display: true, text: "Date" } },
        "y-temp": { 
          type: "linear" as const, 
          position: "left" as const, 
          title: { display: true, text: `Temperature (${temperatureUnit})` }, 
          beginAtZero: false 
        },
        "y-precip": { 
          type: "linear" as const, 
          position: "right" as const, 
          title: { display: true, text: `Precipitation (${precipitationUnit})` }, 
          min: 0, 
          grid: { drawOnChartArea: false } 
        },
      },
    };
    return { chartData: data, chartOptions: options, hasWeatherDataForChart: true };
  }, [resultData.weatherData]);

  // --- Nutrient Chart Data and Options (Unchanged) ---
  const { nutrientChartData, nutrientChartOptions, hasNutrientDataForChart } = useMemo(() => {
    const soil = resultData.soilData;
    const nutrients = [
      { label: 'Nitrogen (N)', value: soil?.nitrogen, color: 'rgba(54, 162, 235, 0.6)' },
      { label: 'Phosphorus (P)', value: soil?.phosphorus, color: 'rgba(255, 159, 64, 0.6)' },
      { label: 'Potassium (K)', value: soil?.potassium, color: 'rgba(75, 192, 192, 0.6)' },
    ];
    const validNutrients = nutrients.filter(n => typeof n.value === 'number' && n.value !== null);
    if (validNutrients.length === 0) {
      return { nutrientChartData: null, nutrientChartOptions: null, hasNutrientDataForChart: false };
    }
    const data: ChartData<'bar'> = {
      labels: validNutrients.map(n => n.label),
      datasets: [{ 
        label: 'Level (ppm)', 
        data: validNutrients.map(n => n.value as number),
        backgroundColor: validNutrients.map(n => n.color), 
        borderColor: validNutrients.map(n => n.color.replace('0.6', '1')), 
        borderWidth: 1 
      }],
    };
    const options: ChartOptions<'bar'> = {
      responsive: true, 
      maintainAspectRatio: false, 
      indexAxis: 'y',
      plugins: { 
        legend: { display: false }, 
        title: { display: true, text: 'Soil Nutrient Levels (ppm)' },
        tooltip: { 
          callbacks: { 
            label: function(context) { 
              return ` ${context.parsed.x !== null ? context.parsed.x : ''} ppm`; 
            } 
          } 
        }
      },
      scales: { 
        x: { beginAtZero: true, title: { display: true, text: 'Level (ppm)' } }, 
        y: { title: { display: false } } 
      }
    };
    return { nutrientChartData: data, nutrientChartOptions: options, hasNutrientDataForChart: true };
  }, [resultData.soilData]);

  const handleDownloadReport = () => {
    console.log("Generating report with data:", resultData);
    alert("Downloading PDF report...");
  };

  // Helper function to get nutrient level category (Unchanged)
  const getNutrientCategory = (type: 'N' | 'P' | 'K', value: number | null): { category: string; colorClass: string } => {
      if (value === null) return { category: 'N/A', colorClass: 'text-gray-500' };
      const thresholds = { N: { low: 80, high: 160 }, P: { low: 50, high: 100 }, K: { low: 100, high: 200 } };
      if (value < thresholds[type].low) return { category: 'Low', colorClass: 'text-orange-600' };
      if (value > thresholds[type].high) return { category: 'High', colorClass: 'text-red-600' };
      return { category: 'Medium', colorClass: 'text-green-600' };
  };

   // Helper to generate Climate Considerations (Unchanged)
    const climateConsiderations = useMemo(() => {
        const considerations: { text: string, type: 'info' | 'warning' | 'good' }[] = [];
        const weather = resultData.weatherData;
        if (!weather || !weather.temperature || weather.temperature.avg === null) {
            return [{ text: "Detailed climate consideration data not available.", type: 'info' as const }];
        }
        const avgTemp = parseFloat(weather.temperature.avg);
        const minTemp = weather.temperature.min;
        const maxTemp = weather.temperature.max;
        const rainfall = parseFloat(weather.rainfall);
        const forecastDays = weather.dailyForecast?.time?.length || 16;
        const avgDailyRain = forecastDays > 0 ? rainfall / forecastDays : 0;
        const humidity = parseFloat(weather.humidity);
        const wind = parseFloat(weather.windSpeed);

        if (!isNaN(avgTemp)) {
            if (avgTemp > 30) considerations.push({ text: `High average temperatures (${avgTemp}°C) forecast; ensure heat tolerance or mitigation.`, type: 'warning' });
            else if (avgTemp < 15) considerations.push({ text: `Low average temperatures (${avgTemp}°C) forecast; ensure cold tolerance.`, type: 'warning' });
            else considerations.push({ text: `Average temperature (${avgTemp}°C) appears moderate for many crops.`, type: 'good' });
        }
        if (minTemp !== null && typeof minTemp === 'number' && minTemp < 10) { 
            considerations.push({ text: `Low minimum temperatures (${minTemp}°C) pose frost risk for sensitive crops.`, type: 'warning' }); 
        }
        if (maxTemp !== null && typeof maxTemp === 'number' && maxTemp > 35) { 
            considerations.push({ text: `High maximum temperatures (${maxTemp}°C) may cause heat stress.`, type: 'warning' }); 
        }
        if (!isNaN(rainfall)) {
             if (avgDailyRain > 10) considerations.push({ text: `High rainfall forecast (~${avgDailyRain.toFixed(1)} mm/day); ensure good drainage.`, type: 'warning' });
             else if (avgDailyRain < 2) considerations.push({ text: `Low rainfall forecast (~${avgDailyRain.toFixed(1)} mm/day); irrigation likely required.`, type: 'warning' });
             else considerations.push({ text: `Moderate rainfall expected (~${avgDailyRain.toFixed(1)} mm/day); monitor soil moisture.`, type: 'info' });
        }
        if (!isNaN(humidity)) {
             if (humidity > 80) considerations.push({ text: `High average humidity (${humidity}%) forecast; increased risk of fungal diseases.`, type: 'warning' });
             else if (humidity < 40) considerations.push({ text: `Low average humidity (${humidity}%) forecast; may increase water needs.`, type: 'warning' });
             else considerations.push({ text: `Average humidity (${humidity}%) appears moderate.`, type: 'info' });
        }
        if (!isNaN(wind)) {
             if (wind > 20) considerations.push({ text: `High average wind speeds (~${wind} km/h) forecast; consider wind protection.`, type: 'warning' });
             else considerations.push({ text: `Average wind speeds (~${wind} km/h) appear moderate.`, type: 'info' });
        }
        if (considerations.length > 0) { 
            considerations.push({ text: "These interpretations are based on the forecast period. Actual conditions and specific crop needs may vary.", type: 'info'}); 
        }
        return considerations.length > 0 ? considerations : [{ text: "Climate consideration data not available.", type: 'info' as const }];
    }, [resultData.weatherData]);

  return (
    <Layout>
      <section className="py-12 bg-farm-cream">
        <div className="container">
          {/* Header and Download Button */}
           <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-farm-dark">
              Your Farming Recommendations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your specific soil conditions, location, and farming
              history, here are our AI-powered recommendations for optimal crop
              selection
              {resultData.processingTime !== null && !isNaN(resultData.processingTime) && (
                <span className="block text-sm text-gray-500 mt-2">
                  Analysis completed in {resultData.processingTime.toFixed(2)} seconds.
                </span>
              )}
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

          {/* Tabs Navigation */}
          <Tabs defaultValue="crops" onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="crops">Recommended Crops</TabsTrigger>
              <TabsTrigger
                value="soil"
                disabled={
                  !resultData.soilData ||
                  (resultData.soilData.ph === null &&
                   resultData.soilData.nitrogen === null &&
                   resultData.soilData.phosphorus === null &&
                   resultData.soilData.potassium === null &&
                   resultData.soilData.cec === null &&
                   resultData.soilData.moisture === null)
                }
              >
                Soil Data
              </TabsTrigger>
              <TabsTrigger
                value="weather"
                disabled={!hasWeatherDataForChart} // Use weather chart flag
              >
                Weather Data
              </TabsTrigger>
            </TabsList>

            {/* ================== Tabs Content ================== */}

            {/* Crops Tab Content */}
            <TabsContent value="crops" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resultData.recommendations.length > 0 ? (
                  resultData.recommendations.map((crop) => ( // crop now includes 'details' which has 'diseases'
                    <Card key={crop.id} className="farm-card overflow-hidden flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = PLACEHOLDER_IMAGE_URL;
                          }}
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{crop.name}</CardTitle>
                        <CardDescription>
                          Recommended crop for your conditions
                        </CardDescription>
                      </CardHeader>
                      {/* Added CardContent for disease preview */}
                      <CardContent className="flex-grow pt-2">
                        {/* Disease Preview on Card */}
                        {/* Access predicted_diseases from crop.details */}
                        {crop.details?.predicted_diseases && crop.details.predicted_diseases.length > 0 && (
                          <div className="mt-1">
                            <h4 className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">Potential Disease Risk:</h4>
                            <ul className="text-sm space-y-0.5">
                              {/* Use predicted_diseases for the preview */}
                              {crop.details.predicted_diseases.slice(0, 3).map((diseaseName: string, index: number) => ( 
                                <li key={index} className="text-red-600 dark:text-red-400 truncate flex items-center gap-1" title={diseaseName}>
                                  <FaExclamationTriangle className="inline-block flex-shrink-0 h-3 w-3"/> {diseaseName}
                                </li>
                              ))}
                              {crop.details.predicted_diseases.length > 3 && (
                                <li className="text-xs text-gray-400 italic">...more in details</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </CardContent>
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
                            {/* Content inside the Dialog */}
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
                              {/* Growing Information */}
                              <h4 className="font-semibold text-base">Growing Information</h4>
                              {crop.details?.growing_info ? (
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">Growing Season</p>
                                    <p>{crop.details.growing_info.growing_season || "N/A"}</p>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">Water Needs</p>
                                    <p>{crop.details.growing_info.water_needs || "N/A"}</p>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">Soil Preference</p>
                                    <p>{crop.details.growing_info.soil_preference || "N/A"}</p>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                                    <p className="font-medium text-farm-primary mb-1">Harvest Time</p>
                                    <p>{crop.details.growing_info.harvest_time || "N/A"}</p>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-gray-500 text-sm">Growing information not available.</p>
                              )}

                              {/* Expected Yield */}
                              <div>
                                <h4 className="font-semibold text-base">Expected Yield</h4>
                                {crop.details?.expected_yield ? (
                                  <div className="bg-farm-light p-4 rounded-md mt-2">
                                    <p className="text-2xl font-bold text-farm-primary">
                                      {crop.details.expected_yield.in_tons_per_acre ?? "N/A"}
                                      <span className="text-base font-normal"> tons/acre</span>
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm mt-2">Expected yield data not available.</p>
                                )}
                              </div>

                              {/* Common Diseases Section - IMPROVED UI */}
                              <div>
                                <h4 className="font-semibold text-base flex items-center gap-2 mb-3">
                                  <Virus className="h-5 w-5 text-red-600" />
                                  Potential Disease Risks
                                </h4>
                                {/* Access diseases details list */}
                                {crop.details?.diseases && crop.details.diseases.length > 0 ? (
                                  <div className="mt-2 space-y-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                      Based on current conditions, the following diseases pose a potential risk:
                                    </p>
                                    <div className="grid grid-cols-1 gap-4">
                                      {crop.details.diseases.map((disease: any, index: number) => (
                                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-red-200 dark:border-red-900 overflow-hidden shadow-sm">
                                          <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2">
                                            <h5 className="text-white font-semibold flex items-center gap-2">
                                              <FaExclamationTriangle className="h-4 w-4" />
                                              {disease.name || "Unknown Disease"}
                                            </h5>
                                          </div>
                                          
                                          <div className="p-4 space-y-3">
                                            {disease.symptoms && disease.symptoms !== 'Not Available' && (
                                              <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                  <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs px-2 py-1 rounded-md font-semibold inline-flex items-center gap-1">
                                                    <TestTube className="h-3 w-3" /> Symptoms
                                                  </span>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{disease.symptoms}</p>
                                              </div>
                                            )}
                                            
                                            {disease.treatment && disease.treatment !== 'Not Available' && (
                                              <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-md font-semibold inline-flex items-center gap-1">
                                                    <FlaskConical className="h-3 w-3" /> Treatment
                                                  </span>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">{disease.treatment}</p>
                                              </div>
                                            )}
                                            
                                            {(!disease.symptoms || disease.symptoms === 'Not Available') && 
                                             (!disease.treatment || disease.treatment === 'Not Available') && (
                                              <p className="text-sm italic text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                                                Further details not available in database.
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                                    No specific high-risk diseases identified based on current conditions and available data.
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
                  <div className="md:col-span-3 text-center text-gray-500">
                    <div className="p-8 bg-gray-50 rounded-lg">
                      <p className="text-xl">No crop recommendations available.</p>
                      <p className="mt-2">Please submit soil data to generate crop recommendations.</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Soil Data Tab Content */}
            <TabsContent value="soil">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Soil Properties Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Soil Properties</CardTitle>
                    <CardDescription>Analysis of your soil sample</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-500">pH Level</p>
                          <p className="text-2xl font-bold">{resultData.soilData?.ph ?? 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-500">Soil Texture</p>
                          <p className="text-2xl font-bold">{resultData.soilData?.texture ?? 'N/A'}</p>
                        </div>
                      </div>

                      {/* Nutrients Section */}
                      <div className="pt-4 border-t">
                        <h4 className="font-medium text-base mb-3">Nutrient Levels</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Nitrogen (N)</span>
                            <span className={getNutrientCategory('N', resultData.soilData?.nitrogen).colorClass}>
                              {resultData.soilData?.nitrogen ?? 'N/A'} ppm
                              <span className="text-gray-500 ml-2">
                                ({getNutrientCategory('N', resultData.soilData?.nitrogen).category})
                              </span>
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Phosphorus (P)</span>
                            <span className={getNutrientCategory('P', resultData.soilData?.phosphorus).colorClass}>
                              {resultData.soilData?.phosphorus ?? 'N/A'} ppm
                              <span className="text-gray-500 ml-2">
                                ({getNutrientCategory('P', resultData.soilData?.phosphorus).category})
                              </span>
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Potassium (K)</span>
                            <span className={getNutrientCategory('K', resultData.soilData?.potassium).colorClass}>
                              {resultData.soilData?.potassium ?? 'N/A'} ppm
                              <span className="text-gray-500 ml-2">
                                ({getNutrientCategory('K', resultData.soilData?.potassium).category})
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nutrient Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrient Visualization</CardTitle>
                    <CardDescription>Visual representation of soil nutrient levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      {hasNutrientDataForChart ? (
                        <Chart type="bar" data={nutrientChartData} options={nutrientChartOptions} />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-gray-500">No nutrient data available for visualization</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Soil Recommendations */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Soil Recommendations</CardTitle>
                    <CardDescription>Suggested actions based on your soil analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {resultData.soilData?.soilRecommendations && resultData.soilData.soilRecommendations.length > 0 ? (
                        resultData.soilData.soilRecommendations.map((rec, idx) => (
                          <li key={idx} className="bg-gray-50 p-3 rounded flex items-start gap-2">
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No soil recommendations available</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Weather Data Tab Content */}
            <TabsContent value="weather">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Weather Overview */}
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Weather Forecast</CardTitle>
                    <CardDescription>Temperature and precipitation forecast for your location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      {hasWeatherDataForChart ? (
                        <Chart type="bar" data={weatherChartData} options={weatherChartOptions} />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-gray-500">No weather data available for visualization</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Weather Summary */}
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Weather Summary</CardTitle>
                    <CardDescription>Key weather metrics for farming decisions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="text-sm font-medium text-gray-500">Average Temperature</p>
                        <p className="text-2xl font-bold">
                          {resultData.weatherData?.temperature?.avg ?? 'N/A'}
                          <span className="text-sm font-normal ml-1">{resultData.weatherData?.temperatureUnit}</span>
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="text-sm font-medium text-gray-500">Total Rainfall</p>
                        <p className="text-2xl font-bold">
                          {resultData.weatherData?.rainfall ?? 'N/A'}
                          <span className="text-sm font-normal ml-1">{resultData.weatherData?.precipitationUnit}</span>
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="text-sm font-medium text-gray-500">Average Humidity</p>
                        <p className="text-2xl font-bold">
                          {resultData.weatherData?.humidity ?? 'N/A'}
                          <span className="text-sm font-normal ml-1">{resultData.weatherData?.humidityUnit}</span>
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="text-sm font-medium text-gray-500">Average Wind Speed</p>
                        <p className="text-2xl font-bold">
                          {resultData.weatherData?.windSpeed ?? 'N/A'}
                          <span className="text-sm font-normal ml-1">{resultData.weatherData?.windSpeedUnit}</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Climate Considerations */}
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>Climate Considerations</CardTitle>
                    <CardDescription>Impact of weather conditions on farming</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {climateConsiderations.map((consideration, idx) => (
                        <li key={idx} className={`bg-gray-50 p-3 rounded-md flex items-start gap-3 ${
                          consideration.type === 'warning' 
                            ? 'border-l-4 border-orange-500' 
                            : consideration.type === 'good'
                              ? 'border-l-4 border-green-500'
                              : 'border-l-4 border-blue-500'
                        }`}>
                          {consideration.type === 'warning' && (
                            <FaExclamationTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                          )}
                          {consideration.type === 'good' && (
                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          )}
                          {consideration.type === 'info' && (
                            <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
                          )}
                          <span>{consideration.text}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Results;
