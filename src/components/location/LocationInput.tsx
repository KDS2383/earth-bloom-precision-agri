import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface LocationInputProps {
  onLocationSelect: (location: string, coordinates: { lat: number, lng: number }) => void;
  onCurrentLocation: (coordinates: { lat: number, lng: number }, displayLocation: string) => void;
  isLoading: boolean;
  usingCurrentLocation: boolean;
  placeholder?: string;
}

export const LocationInput = ({
  onLocationSelect,
  onCurrentLocation,
  isLoading,
  usingCurrentLocation,
  placeholder = "Enter city, region, or location in India"
}: LocationInputProps) => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ display_name: string; lat: string; lon: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation services.",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Mock reverse geocoding since we can't use the Google Maps API without a proper key
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => response.json())
          .then(data => {
            let state = "";
            let country = "";
            
            if (data.address) {
              state = data.address.state || data.address.region || "";
              country = data.address.country || "";
            }
            
            const displayLocation = state && country ? `${state}, ${country}` : "Current Location";
            onCurrentLocation({ lat: latitude, lng: longitude }, displayLocation);
            
            toast({
              title: "Location Found",
              description: `Using location: ${displayLocation}`
            });
          })
          .catch(error => {
            console.error("Error fetching location details:", error);
            onCurrentLocation(
              { lat: latitude, lng: longitude },
              "Current Location"
            );
            
            toast({
              title: "Location Found",
              description: "Using current location"
            });
          });
      },
      // Error callback
      (error) => {
        let errorMessage = "Failed to get your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access was denied. Please enable location permissions in your browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get your location timed out.";
            break;
        }
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive"
        });
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleInputChange = async (value: string) => {
    setLocation(value);
    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&countrycodes=in&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: { display_name: string; lat: string; lon: string }) => {
    setLocation(suggestion.display_name);
    setShowSuggestions(false);
    onLocationSelect(suggestion.display_name, {
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon)
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2 md:col-span-3 relative">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder={placeholder}
            value={location}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={usingCurrentLocation}
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-end">
          <Button 
            type="button" 
            onClick={() => handleSuggestionClick(suggestions[0])}
            className="w-full bg-farm-primary hover:bg-farm-dark"
            disabled={isLoading || usingCurrentLocation || suggestions.length === 0}
          >
            {isLoading && !usingCurrentLocation ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="h-px bg-border flex-1" />
        <span className="px-3 text-xs text-muted-foreground">OR</span>
        <div className="h-px bg-border flex-1" />
      </div>
      
      <Button 
        type="button" 
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGetCurrentLocation}
        disabled={isLoading}
      >
        <Navigation className="h-4 w-4" />
        {isLoading && usingCurrentLocation ? "Getting Location..." : "Use My Current Location"}
      </Button>
    </div>
  );
};