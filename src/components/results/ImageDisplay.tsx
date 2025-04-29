
import React from "react";

interface ImageDisplayProps {
  location: string;
  images: string[];
}

export const ImageDisplay = ({ location, images }: ImageDisplayProps) => {
  if (images.length === 0) return null;

  return (
    <div className="mb-8">
      <h2>Images for {location}</h2>
      <div className="flex space-x-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={location}
            className="h-48 w-auto rounded-md"
          />
        ))}
      </div>
    </div>
  );
};
