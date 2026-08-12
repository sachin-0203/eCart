import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImageGallery = ({ images = [], title = "Product" }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images.length) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl bg-gray-100 text-text-secondary">
        No image available
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="group relative overflow-hidden rounded-xl bg-gray-100">
        <img
          src={images[selectedImage]}
          alt={`${title} - ${selectedImage + 1}`}
          className="h-[450px] w-full object-contain transition-transform duration-300 md:h-[550px]"
        />

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={previousImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 transition ${
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;