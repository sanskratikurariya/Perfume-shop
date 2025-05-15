import React, { useState } from 'react';

export default function ProductGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto">
      
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg cursor-pointer hover:bg-gray-300 transition"
        aria-label="Previous Image"
      >
        {/* Left Arrow SVG */}
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Product Image ${currentIndex + 1}`}
        className="h-96 w-full object-cover rounded-lg cursor-pointer"
        onClick={handleNext} // Clicking the image advances to next
      />

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow-lg cursor-pointer hover:bg-gray-300 transition"
        aria-label="Next Image"
      >
        {/* Right Arrow SVG */}
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}