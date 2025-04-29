
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

interface RecommendationDisplayProps {
  recommendationData: {
    location: string;
    crop: string;
    fertilizer: string;
    timestamp: string;
  } | null;
}

export const RecommendationDisplay = ({ recommendationData }: RecommendationDisplayProps) => {
  if (!recommendationData) return null;

  return (
    <div className="mb-8">
      <h2>Recommendation Data for {recommendationData.location}</h2>
      <Table>
        <TableCaption>
          Recommendation data fetched on {recommendationData.timestamp}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Attribute</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Crop</TableCell>
            <TableCell>{recommendationData.crop}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Fertilizer</TableCell>
            <TableCell>{recommendationData.fertilizer}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
