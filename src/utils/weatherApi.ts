// src/utils/weatherApi.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

// Keep the TransformedWeatherData interface, but we'll adapt how we fill it
export interface TransformedWeatherData {
  locationName?: string; // City name from API response
  current: {
    dt: number;
    temperature: number;
    condition: string;
    conditionDescription: string;
    icon: string;
    humidity: number;
    wind: {
      speed: number;
      deg: number;
      direction: string;
    };
    // Precipitation might not be available directly in free 'current'
    // We'll default it or try to get it from the forecast start
    precipitation: number;
    // UV index is not available in the free current weather API
    uv: number | string; // Change type or set to 'N/A'
  };
  // Forecast will now be calculated from 3-hour data
  forecast: Array<{
    // dt will be the noon timestamp of the day
    dt: number;
    day: string; // Formatted day name
    high: number;
    low: number;
    condition: string; // Dominant condition for the day
    conditionDescription: string; // Dominant description
    icon: string; // Dominant icon
    precipitation: number; // Max precipitation probability for the day
  }>;
}


const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY; // Keep using Vite env var
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Keep helper functions (windDegreeToDirection, formatTimestampToDay)

const windDegreeToDirection = (deg: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

// Modified formatting helper needed for forecast processing
const formatDateToDayOfWeek = (date: Date, timeZoneOffsetSeconds: number, index: number): string => {
    // Adjust date based on timezone offset BEFORE getting the day string
    const utcTimestamp = date.getTime();
    const localTimestamp = utcTimestamp + (timeZoneOffsetSeconds * 1000);
    const localDate = new Date(localTimestamp);

    // Use UTC methods on the original date to avoid double offsetting issues with locale string
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const checkDate = new Date(date); // Use original date for comparison

    if (checkDate.getUTCDate() === today.getUTCDate() && checkDate.getUTCMonth() === today.getUTCMonth() && checkDate.getUTCFullYear() === today.getUTCFullYear()) {
      return "Today";
    }
    if (checkDate.getUTCDate() === tomorrow.getUTCDate() && checkDate.getUTCMonth() === tomorrow.getUTCMonth() && checkDate.getUTCFullYear() === tomorrow.getUTCFullYear()) {
        return "Tomorrow";
    }

    // Fallback to weekday name using the calculated local date
    return localDate.toLocaleDateString('en-US', { weekday: 'long' });
};

// --- Function to process 3-hour forecast into daily summaries ---
const processForecastData = (forecastList: any[], timezoneOffsetSeconds: number): TransformedWeatherData['forecast'] => {
    const dailyData: { [key: string]: { temps: number[], pops: number[], conditions: any[], date: Date } } = {};

    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        // Use UTC date parts for consistent grouping regardless of local timezone running the script
        const dateKey = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;

        if (!dailyData[dateKey]) {
            dailyData[dateKey] = { temps: [], pops: [], conditions: [], date: date }; // Store first date object for the day
        }
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].pops.push(item.pop || 0); // Probability of precipitation (0-1)
        dailyData[dateKey].conditions.push({ // Store relevant weather info
            main: item.weather[0]?.main || 'N/A',
            description: item.weather[0]?.description || 'N/A',
            icon: item.weather[0]?.icon || '01d',
            dt: item.dt // Keep timestamp for potential "dominant condition" logic
        });
    });

    // Find the condition around noon or the most frequent one for the day
    const getDominantCondition = (conditions: any[]) => {
      if (!conditions || conditions.length === 0) {
          return { main: 'N/A', description: 'N/A', icon: '01d' };
      }
      // Prioritize condition around noon (11:00 - 13:00 UTC potentially)
      const noonCondition = conditions.find(c => {
          const hour = new Date(c.dt * 1000).getUTCHours();
          return hour >= 11 && hour <= 13;
      });
      if (noonCondition) return noonCondition;

      // Fallback: find most frequent condition 'main'
      const counts: { [key: string]: number } = {};
      let maxCount = 0;
      let dominantMain = conditions[0].main;
      conditions.forEach(c => {
          counts[c.main] = (counts[c.main] || 0) + 1;
          if (counts[c.main] > maxCount) {
              maxCount = counts[c.main];
              dominantMain = c.main;
          }
      });
       // Return the first condition object that matches the most frequent 'main'
      return conditions.find(c => c.main === dominantMain) || conditions[0];
  };


    return Object.keys(dailyData).slice(0, 7).map((dateKey, index) => { // Limit to 5-7 days if needed
        const dayInfo = dailyData[dateKey];
        const high = Math.round(Math.max(...dayInfo.temps));
        const low = Math.round(Math.min(...dayInfo.temps));
        const maxPop = Math.round(Math.max(...dayInfo.pops) * 100); // Convert pop (0-1) to percentage
        const dominantCondition = getDominantCondition(dayInfo.conditions);

        return {
            dt: dayInfo.date.getTime() / 1000, // Use timestamp of the start of the day (or noon?)
            day: formatDateToDayOfWeek(dayInfo.date, timezoneOffsetSeconds, index),
            high: high,
            low: low,
            condition: dominantCondition.main,
            conditionDescription: dominantCondition.description,
            icon: dominantCondition.icon,
            precipitation: maxPop,
        };
    }).sort((a, b) => a.dt - b.dt); // Ensure days are sorted chronologically
};
// --- End forecast processing function ---


export const useWeatherData = (lat: number | null, lon: number | null) => {
  const [data, setData] = useState<TransformedWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (lat === null || lon === null || !API_KEY) {
      setData(null);
      setIsLoading(false)
      setIsError(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setData(null);

      try {
        // Use Promise.all to fetch both concurrently
        const [currentResponse, forecastResponse] = await Promise.all([
          axios.get(CURRENT_WEATHER_URL, {
            params: { lat, lon, appid: API_KEY, units: 'metric' }
          }),
          axios.get(FORECAST_URL, {
            params: { lat, lon, appid: API_KEY, units: 'metric' }
          })
        ]);

        console.log("Current Weather Raw:", currentResponse.data);
        console.log("Forecast Raw:", forecastResponse.data);

        const currentData = currentResponse.data;
        const forecastData = forecastResponse.data;
        const timezoneOffset = forecastData.city?.timezone || 0; // Get timezone offset from forecast response

        // Process forecast first to potentially get precipitation info if needed
        const processedForecast = processForecastData(forecastData.list || [], timezoneOffset);

        // Transform data
        const transformedData: TransformedWeatherData = {
          locationName: currentData.name || forecastData.city?.name || 'N/A', // Use city name from API
          current: {
            dt: currentData.dt,
            temperature: Math.round(currentData.main.temp),
            condition: currentData.weather[0]?.main || 'N/A',
            conditionDescription: currentData.weather[0]?.description || 'N/A',
            icon: currentData.weather[0]?.icon || '01d',
            humidity: currentData.main.humidity,
            wind: {
              speed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
              deg: currentData.wind.deg,
              direction: windDegreeToDirection(currentData.wind.deg),
            },
            // Attempt to get precipitation - often zero unless actively raining
            precipitation: currentData.rain?.['1h'] ?? currentData.rain?.['3h'] ?? 0,
             // UV is not available in this free API
            uv: 'N/A',
          },
          forecast: processedForecast, // Use the processed daily summaries
        };

        console.log("Transformed Data:", transformedData);
        setData(transformedData);

      } catch (error: any) {
        console.error("Error fetching weather data:", error);
        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          console.error("Error Response Status:", error.response.status);
          // Check for 401 specifically, although it shouldn't happen with these endpoints if key is valid
          if (error.response.status === 401) {
             console.error("API Key might be invalid or deactivated. Please check on OpenWeatherMap website.");
          }
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("Error Message:", error.message);
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lat, lon]);

  return { data, isLoading, isError };
};