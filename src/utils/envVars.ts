
/**
 * Utility file for accessing environment variables with proper typing and validation
 */

// Pexels API key for image fetching
export const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || "";

// OpenWeatherMap API key for weather data
export const OPENWEATHERMAP_API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY || "";

// Function to check if required API keys are available
export const validateApiKeys = () => {
  const missingKeys = [];
  
  if (!PEXELS_API_KEY) {
    missingKeys.push('VITE_PEXELS_API_KEY');
  }
  
  if (!OPENWEATHERMAP_API_KEY) {
    missingKeys.push('VITE_OPENWEATHERMAP_API_KEY');
  }
  
  return {
    allKeysPresent: missingKeys.length === 0,
    missingKeys
  };
};

