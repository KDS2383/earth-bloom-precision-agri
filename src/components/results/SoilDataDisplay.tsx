
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

interface SoilDataDisplayProps {
  soilData: {
    location: string;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
    timestamp: string;
  } | null;
}

export const SoilDataDisplay = ({ soilData }: SoilDataDisplayProps) => {
  if (!soilData) return null;

  return (
    <div className="mb-8">
      <h2>Soil Data for {soilData.location}</h2>
      <Table>
        <TableCaption>
          Soil data fetched on {soilData.timestamp}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Attribute</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Nitrogen</TableCell>
            <TableCell>{soilData.nitrogen}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Phosphorus</TableCell>
            <TableCell>{soilData.phosphorus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Potassium</TableCell>
            <TableCell>{soilData.potassium}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">pH</TableCell>
            <TableCell>{soilData.ph}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
