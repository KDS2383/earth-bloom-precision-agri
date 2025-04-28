
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  displayName?: string;
  email?: string;
  photoURL?: string;
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
