"use client";

import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { Content } from "@prismicio/client";
import { FadeIn } from "./FadeIn";

type ProductGalleryProps = {
  mainImage: Content.FragranceDocumentData["bottle_image"];
  additionalImages?: Content.FragranceDocumentData["bottle_image"][];
  className?: string;
};

export const ProductGallery = ({
  mainImage,
  additionalImages = [],
  className = "",
}: ProductGalleryProps) => {
  // Filter out null/undefined images and only include valid images
  const validAdditionalImages = additionalImages.filter(
    (img) => img && img.url,
  );
  const allImages =
    mainImage && mainImage.url
      ? [mainImage, ...validAdditionalImages]
      : validAdditionalImages;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const currentImage = allImages[selectedImageIndex] || mainImage;

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Main Image Display */}
      <div className="relative mb-4">
        <FadeIn
          className="animate-in bg-grey/10 translate-y-16 opacity-0 will-change-transform"
          vars={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative w-full md:aspect-[3/4]">
            {/* Reflection effect */}
            <PrismicNextImage
              field={currentImage}
              priority
              className="absolute top-[90%] -scale-y-100 rounded-lg [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,.30)_100%)] object-cover md:aspect-[3/4]"
            />
            {/* Main image */}
            <PrismicNextImage
              field={currentImage}
              priority
              className="relative h-auto w-full rounded-lg object-cover md:aspect-[3/4]"
            />
          </div>
        </FadeIn>
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex justify-start gap-3 overflow-hidden">
          {allImages.map((image, index) => (
            <FadeIn
              className="animate-in bg-grey/10 translate-y-16 opacity-0 will-change-transform"
              vars={{ duration: 0.7, delay: 0.6 }}
              start="top 90%"
              key={index}
            >
              <button
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 lg:h-24 lg:w-24 ${
                  index === selectedImageIndex
                    ? "border-black/60 shadow-md"
                    : "border-black/10 hover:border-black/20"
                }`}
              >
                <PrismicNextImage
                  field={image}
                  className="h-full w-full object-cover"
                />
              </button>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
};
