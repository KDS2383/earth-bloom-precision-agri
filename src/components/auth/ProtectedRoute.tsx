// src/components/auth/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom'; // 1. Import useLocation
import { useAuth } from '@/context/AuthContext';
import { ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FBF9F2' }}>
    <h2 style={{ color: '#3A5A40' }}>Verifying Authentication...</h2>
  </div>
);

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  
  // 2. Get the current location object
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication Required",
        description: "To access this page, you need to sign in first.",
        variant: "destructive",
      });
    }
  }, [loading, user, toast]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // 3. Pass the current location in the `state` prop of the Navigate component.
    // This "remembers" where the user came from.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};