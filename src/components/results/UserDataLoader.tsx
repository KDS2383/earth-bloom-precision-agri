
import React from "react";

interface UserDataLoaderProps {
  isLoading: boolean;
}

export const UserDataLoader = ({ isLoading }: UserDataLoaderProps) => {
  if (!isLoading) return null;
  
  return (
    <div className="flex justify-center py-6 mb-4">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-farm-primary mb-2"></div>
        <p>Loading your saved data...</p>
      </div>
    </div>
  );
};
