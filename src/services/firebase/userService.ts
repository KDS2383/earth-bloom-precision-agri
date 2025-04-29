
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';

export interface UserProfile {
  displayName?: string;
  email?: string;
  photoURL?: string;
  contactNumber?: string;
  location?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  farm?: {
    farmName: string;
    farmSize: string;
    mainCrops: string;
    soilType: string;
  };
  preferences?: {
    emailNotifications: boolean;
    temperatureUnit: 'celsius' | 'fahrenheit';
    darkMode: boolean;
  };
  // Storage for user's data from different pages
  recommendations?: Array<{
    location: string;
    crop: string;
    fertilizer: string;
    timestamp: string;
  }>;
  soilData?: Array<{
    location: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    timestamp: string;
  }>;
  weatherData?: Array<{
    location: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    timestamp: string;
  }>;
  contactSubmissions?: Array<{
    name: string;
    email: string;
    message: string;
    timestamp: string;
  }>;
}

export const saveUserProfile = async (profileData: Partial<UserProfile>) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, profileData, { merge: true });
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};

// Function to save recommendation data to user profile
export const saveUserRecommendation = async (recommendationData: { 
  location: string;
  crop: string;
  fertilizer: string;
  timestamp: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userProfile = await getUserProfile();
  const recommendations = userProfile?.recommendations || [];
  
  // Add new recommendation to the array
  const updatedRecommendations = [...recommendations, recommendationData];
  
  // Save to the user's profile
  await saveUserProfile({
    recommendations: updatedRecommendations
  });
};

// Function to save soil data to user profile
export const saveUserSoilData = async (soilData: {
  location: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  timestamp: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userProfile = await getUserProfile();
  const soilDataArray = userProfile?.soilData || [];
  
  // Add new soil data to the array
  const updatedSoilData = [...soilDataArray, soilData];
  
  // Save to the user's profile
  await saveUserProfile({
    soilData: updatedSoilData
  });
};

// Function to save weather data to user profile
export const saveUserWeatherData = async (weatherData: {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  timestamp: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userProfile = await getUserProfile();
  const weatherDataArray = userProfile?.weatherData || [];
  
  // Add new weather data to the array
  const updatedWeatherData = [...weatherDataArray, weatherData];
  
  // Save to the user's profile
  await saveUserProfile({
    weatherData: updatedWeatherData
  });
};

// Function to save contact submission to user profile
export const saveUserContactSubmission = async (contactSubmission: {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user found');

  const userProfile = await getUserProfile();
  const contactSubmissions = userProfile?.contactSubmissions || [];
  
  // Add new contact submission to the array
  const updatedSubmissions = [...contactSubmissions, contactSubmission];
  
  // Save to the user's profile
  await saveUserProfile({
    contactSubmissions: updatedSubmissions
  });
};

