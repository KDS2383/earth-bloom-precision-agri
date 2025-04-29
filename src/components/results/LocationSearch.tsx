
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";

interface LocationSearchProps {
  location: string;
  handleLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  isLoading: boolean;
}

export const LocationSearch = ({
  location,
  handleLocationChange,
  handleSearch,
  isLoading,
}: LocationSearchProps) => {
  return (
    <div className="mb-8 flex items-center space-x-2">
      <Label htmlFor="location">Location:</Label>
      <Input
        type="text"
        id="location"
        placeholder="Enter location"
        value={location}
        onChange={handleLocationChange}
      />
      <Button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? (
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
  );
};
