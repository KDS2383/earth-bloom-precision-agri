// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // Adjust path if needed

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Optional: Show a loading spinner or component while auth state is being determined
    // This prevents redirecting before we know if the user is logged in
    return <div>Loading authentication state...</div>; // Or replace with a proper spinner component
  }

  if (!user) {
    // User is not logged in, redirect them to the sign-in page
    // Pass the current location so we can redirect back after login (optional)
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // User is logged in, render the child component (the actual page)
  return <>{children}</>;
};

export default ProtectedRoute;