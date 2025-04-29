
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { OPENWEATHERMAP_API_KEY, PEXELS_API_KEY } from "@/utils/envVars";
import { 
  getUserProfile, 
  saveUserRecommendation, 
  saveUserSoilData, 
  saveUserWeatherData 
} from "@/services/firebase/userService";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  timestamp: string;
}

export interface SoilData {
  location: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  timestamp: string;
}

export interface RecommendationData {
  location: string;
  crop: string;
  fertilizer: string;
  timestamp: string;
}

export const useResultsData = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [recommendationData, setRecommendationData] = useState<RecommendationData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingSoil, setLoadingSoil] = useState(false);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  
  const [weatherProgress, setWeatherProgress] = useState(0);
  const [soilProgress, setSoilProgress] = useState(0);
  const [recommendationProgress, setRecommendationProgress] = useState(0);
  const [imagesProgress, setImagesProgress] = useState(0);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const db = getFirestore();

  const isLoading = loadingWeather || loadingSoil || loadingRecommendation || loadingImages;

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    } else {
      // Fetch user data if logged in
      fetchUserData();
    }
  }, [user, navigate]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setIsLoadingUserData(true);
    try {
      const userProfile = await getUserProfile();
      
      // If user has weather data, soil data, or recommendation data, use the most recent one
      if (userProfile?.weatherData?.length) {
        const recentWeatherData = userProfile.weatherData[userProfile.weatherData.length - 1];
        setWeatherData(recentWeatherData);
        setLocation(recentWeatherData.location);
      }
      
      if (userProfile?.soilData?.length) {
        const recentSoilData = userProfile.soilData[userProfile.soilData.length - 1];
        setSoilData(recentSoilData);
        if (!location) setLocation(recentSoilData.location);
      }
      
      if (userProfile?.recommendations?.length) {
        const recentRecommendation = userProfile.recommendations[userProfile.recommendations.length - 1];
        setRecommendationData(recentRecommendation);
        if (!location) setLocation(recentRecommendation.location);
      }
      
      // If location is set from user data, fetch images for that location
      if (location) {
        fetchPexelsImages();
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      toast({
        title: "Error fetching saved data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingUserData(false);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const fetchWeatherData = async () => {
    if (!OPENWEATHERMAP_API_KEY) {
      toast({
        title: "Missing OpenWeatherMap API Key",
        description: "Please set the VITE_OPENWEATHERMAP_API_KEY environment variable.",
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
      const newWeatherData = {
        location: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        timestamp: new Date().toLocaleString(),
      };
      
      setWeatherData(newWeatherData);
      setWeatherProgress(100);
      
      // If user is logged in, save the weather data to their profile
      if (user) {
        await saveUserWeatherData(newWeatherData);
      }
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

      const newSoilData = {
        location: location,
        nitrogen: nitrogen,
        phosphorus: phosphorus,
        potassium: potassium,
        ph: ph,
        timestamp: new Date().toLocaleString(),
      };
      
      setSoilData(newSoilData);
      setSoilProgress(100);
      
      // If user is logged in, save the soil data to their profile
      if (user) {
        await saveUserSoilData(newSoilData);
      }
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
      const fertilizer = fertilizers[Math.floor(Math.random() * fertilizers.length)];

      const newRecommendationData = {
        location: location,
        crop: crop,
        fertilizer: fertilizer,
        timestamp: new Date().toLocaleString(),
      };
      
      setRecommendationData(newRecommendationData);
      setRecommendationProgress(100);
      
      // If user is logged in, save the recommendation data to their profile
      if (user) {
        await saveUserRecommendation(newRecommendationData);
      }
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
        description: "Please set the VITE_PEXELS_API_KEY environment variable.",
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

  return {
    location,
    weatherData,
    soilData,
    recommendationData,
    images,
    loadingWeather,
    loadingSoil,
    loadingRecommendation,
    loadingImages,
    isLoadingUserData,
    weatherProgress,
    soilProgress,
    recommendationProgress,
    imagesProgress,
    isLoading,
    handleLocationChange,
    handleSearch,
  };
};
