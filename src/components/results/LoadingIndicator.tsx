
import React from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingIndicatorProps {
  message: string;
  progress: number;
}

export const LoadingIndicator = ({ message, progress }: LoadingIndicatorProps) => {
  return (
    <div className="mb-4">
      <p>{message}</p>
      <Progress value={progress} />
    </div>
  );
};
