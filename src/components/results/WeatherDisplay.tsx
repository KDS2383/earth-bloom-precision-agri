
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WeatherDisplayProps {
  weatherData: {
    location: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    timestamp: string;
  } | null;
}

export const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
  if (!weatherData) return null;

  return (
    <div className="mb-8">
      <h2>Weather Data for {weatherData.location}</h2>
      <Table>
        <TableCaption>
          Weather data fetched on {weatherData.timestamp}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Attribute</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Temperature</TableCell>
            <TableCell>{weatherData.temperature}°C</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Humidity</TableCell>
            <TableCell>{weatherData.humidity}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Wind Speed</TableCell>
            <TableCell>{weatherData.windSpeed} m/s</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Description</TableCell>
            <TableCell>{weatherData.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
