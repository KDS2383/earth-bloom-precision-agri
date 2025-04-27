import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { OPENWEATHERMAP_API_KEY, PEXELS_API_KEY } from "@/utils/envVars";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Loader2, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  timestamp: string;
}

interface SoilData {
  location: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  timestamp: string;
}

interface RecommendationData {
  location: string;
  crop: string;
  fertilizer: string;
  timestamp: string;
}

const Results = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [recommendationData, setRecommendationData] =
    useState<RecommendationData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingSoil, setLoadingSoil] = useState(false);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [weatherProgress, setWeatherProgress] = useState(0);
  const [soilProgress, setSoilProgress] = useState(0);
  const [recommendationProgress, setRecommendationProgress] = useState(0);
  const [imagesProgress, setImagesProgress] = useState(0);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocation(e.target.value);
  };

  const fetchWeatherData = async () => {
    if (!OPENWEATHERMAP_API_KEY) {
      toast({
        title: "Missing OpenWeatherMap API Key",
        description:
          "Please set the VITE_OPENWEATHERMAP_API_KEY environment variable.",
        variant: "destructive",
      });
      return;
    }

    setLoadingWeather(true);
    setWeatherProgress(30);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
      );
      setWeatherProgress(70);

      if (!response.ok) {
        throw new Error("Weather data not found");
      }

      const data = await response.json();
      setWeatherData({
        location: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        timestamp: new Date().toLocaleString(),
      });
      setWeatherProgress(100);
    } catch (error: any) {
      toast({
        title: "Error fetching weather data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingWeather(false);
      setWeatherProgress(0);
    }
  };

  const fetchSoilData = async () => {
    setLoadingSoil(true);
    setSoilProgress(30);

    try {
      // Simulate fetching soil data from a database
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate random soil data
      const nitrogen = Math.floor(Math.random() * 100);
      const phosphorus = Math.floor(Math.random() * 100);
      const potassium = Math.floor(Math.random() * 100);
      const ph = Math.floor(Math.random() * 14);

      setSoilData({
        location: location,
        nitrogen: nitrogen,
        phosphorus: phosphorus,
        potassium: potassium,
        ph: ph,
        timestamp: new Date().toLocaleString(),
      });

      setSoilProgress(100);
    } catch (error: any) {
      toast({
        title: "Error fetching soil data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingSoil(false);
      setSoilProgress(0);
    }
  };

  const fetchRecommendationData = async () => {
    setLoadingRecommendation(true);
    setRecommendationProgress(30);

    try {
      // Simulate fetching recommendation data from a database
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate random recommendation data
      const crops = ["Wheat", "Rice", "Corn", "Barley", "Soybean"];
      const fertilizers = ["NPK", "Urea", "DAP", "Potash"];
      const crop = crops[Math.floor(Math.random() * crops.length)];
      const fertilizer =
        fertilizers[Math.floor(Math.random() * fertilizers.length)];

      setRecommendationData({
        location: location,
        crop: crop,
        fertilizer: fertilizer,
        timestamp: new Date().toLocaleString(),
      });

      setRecommendationProgress(100);
    } catch (error: any) {
      toast({
        title: "Error fetching recommendation data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingRecommendation(false);
      setRecommendationProgress(0);
    }
  };

  const fetchPexelsImages = async () => {
    if (!PEXELS_API_KEY) {
      // Handle case where API key is not available
      console.error("Pexels API key is missing");
      toast({
        title: "Missing Pexels API Key",
        description:
          "Please set the VITE_PEXELS_API_KEY environment variable.",
        variant: "destructive",
      });
      return;
    }

    setLoadingImages(true);
    setImagesProgress(30);

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${location}&per_page=3`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );

      setImagesProgress(70);

      if (!response.ok) {
        throw new Error("Image data not found");
      }

      const data = await response.json();
      const imageUrls = data.photos.map((photo: any) => photo.src.medium);
      setImages(imageUrls);

      setImagesProgress(100);
    } catch (error: any) {
      toast({
        title: "Error fetching Pexels images",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingImages(false);
      setImagesProgress(0);
    }
  };

  const handleSearch = async () => {
    if (!location) {
      toast({
        title: "Please enter a location",
        variant: "destructive",
      });
      return;
    }

    await Promise.all([
      fetchWeatherData(),
      fetchSoilData(),
      fetchRecommendationData(),
      fetchPexelsImages(),
    ]);

    // Save data to Firestore
    if (user) {
      const userId = user.uid;
      const resultsCollection = collection(db, "results");
      const resultDocRef = doc(resultsCollection);

      try {
        await setDoc(resultDocRef, {
          userId: userId,
          location: location,
          weatherData: weatherData,
          soilData: soilData,
          recommendationData: recommendationData,
          imageUrls: images,
          timestamp: new Date(),
        });

        toast({
          title: "Search saved to account!",
        });
      } catch (error: any) {
        toast({
          title: "Error saving search to account",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="mb-8 flex items-center space-x-2">
          <Label htmlFor="location">Location:</Label>
          <Input
            type="text"
            id="location"
            placeholder="Enter location"
            value={location}
            onChange={handleLocationChange}
          />
          <Button onClick={handleSearch} disabled={loadingWeather || loadingSoil || loadingRecommendation || loadingImages}>
            {loadingWeather || loadingSoil || loadingRecommendation || loadingImages ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                Search <Search className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {loadingWeather && (
          <div className="mb-4">
            <p>Fetching weather data...</p>
            <Progress value={weatherProgress} />
          </div>
        )}

        {weatherData && (
          <div className="mb-8">
            <h2>Weather Data for {weatherData.location}</h2>
            <Table>
              <TableCaption>
                Weather data fetched on {weatherData.timestamp}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Attribute</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Temperature</TableCell>
                  <TableCell>{weatherData.temperature}°C</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Humidity</TableCell>
                  <TableCell>{weatherData.humidity}%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wind Speed</TableCell>
                  <TableCell>{weatherData.windSpeed} m/s</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Description</TableCell>
                  <TableCell>{weatherData.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {loadingSoil && (
          <div className="mb-4">
            <p>Fetching soil data...</p>
            <Progress value={soilProgress} />
          </div>
        )}

        {soilData && (
          <div className="mb-8">
            <h2>Soil Data for {soilData.location}</h2>
            <Table>
              <TableCaption>
                Soil data fetched on {soilData.timestamp}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Attribute</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nitrogen</TableCell>
                  <TableCell>{soilData.nitrogen}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phosphorus</TableCell>
                  <TableCell>{soilData.phosphorus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Potassium</TableCell>
                  <TableCell>{soilData.potassium}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">pH</TableCell>
                  <TableCell>{soilData.ph}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {loadingRecommendation && (
          <div className="mb-4">
            <p>Fetching recommendation data...</p>
            <Progress value={recommendationProgress} />
          </div>
        )}

        {recommendationData && (
          <div className="mb-8">
            <h2>Recommendation Data for {recommendationData.location}</h2>
            <Table>
              <TableCaption>
                Recommendation data fetched on {recommendationData.timestamp}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Attribute</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Crop</TableCell>
                  <TableCell>{recommendationData.crop}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Fertilizer</TableCell>
                  <TableCell>{recommendationData.fertilizer}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}

        {loadingImages && (
          <div className="mb-4">
            <p>Fetching images...</p>
            <Progress value={imagesProgress} />
          </div>
        )}

        {images.length > 0 && (
          <div className="mb-8">
            <h2>Images for {location}</h2>
            <div className="flex space-x-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={location}
                  className="h-48 w-auto rounded-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Results;
