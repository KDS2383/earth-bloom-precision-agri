// src/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust path if needed

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Provide default values matching the interface
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state listener"); // Debug log

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Use console.log for simpler debugging unless you have specific needs
      console.log("Auth state changed:", currentUser ? `User authenticated (${currentUser.email})` : "No user");
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      console.log("Cleaning up auth state listener"); // Debug log
      unsubscribe();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const value = { user, loading };

  // Debug log - helps see context updates
  // console.log("AuthContext Provider rendering. State:", { user: user ? user.email : "null", loading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};