"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./ItemDisplay.module.css";

type ItemDisplayClientProps = {
  children: React.ReactNode;
  fragranceUid: string;
};

export const ItemDisplayClient = ({
  children,
  fragranceUid,
}: ItemDisplayClientProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const glowBgRef = useRef<HTMLDivElement>(null);
  const [dominantColors, setDominantColors] = useState<string[]>([]);

  useEffect(() => {
    const card = cardRef.current;
    const border = borderRef.current;
    const glowBg = glowBgRef.current;

    if (!card || !border || !glowBg) return;

    // Extract colors from the image
    const extractColorsFromImage = async () => {
      const img = card.querySelector("img");
      if (!img) return;

      // Wait for image to load
      if (!img.complete) {
        await new Promise((resolve) => {
          img.onload = resolve;
        });
      }

      // Create canvas to analyze image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Set canvas size (smaller for performance)
      canvas.width = 100;
      canvas.height = 100;

      // Draw image
      ctx.drawImage(img, 0, 0, 100, 100);

      // Get image data
      const imageData = ctx.getImageData(0, 0, 100, 100);
      const data = imageData.data;

      // Color buckets for clustering
      const colorMap: { [key: string]: number } = {};

      // Sample pixels (skip some for performance)
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip transparent or very dark/light pixels
        if (
          a < 125 ||
          (r > 240 && g > 240 && b > 240) ||
          (r < 15 && g < 15 && b < 15)
        ) {
          continue;
        }

        // Bucket colors (reduce precision for clustering)
        const bucket = `${Math.floor(r / 10) * 10},${Math.floor(g / 10) * 10},${Math.floor(b / 10) * 10}`;
        colorMap[bucket] = (colorMap[bucket] || 0) + 1;
      }

      // Sort by frequency and get top colors
      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([color]) => {
          const [r, g, b] = color.split(",").map(Number);
          return `rgb(${r}, ${g}, ${b})`;
        });

      setDominantColors(sortedColors);

      // Apply colors to CSS custom properties
      if (sortedColors.length > 0) {
        border.style.setProperty(
          "--color-1",
          sortedColors[0] || "rgb(200, 200, 200)",
        );
        border.style.setProperty(
          "--color-2",
          sortedColors[1] || "rgb(180, 180, 180)",
        );
        border.style.setProperty(
          "--color-3",
          sortedColors[2] || "rgb(190, 190, 190)",
        );

        glowBg.style.setProperty(
          "--glow-color-1",
          sortedColors[0] || "rgb(200, 200, 200)",
        );
        glowBg.style.setProperty(
          "--glow-color-2",
          sortedColors[1] || "rgb(180, 180, 180)",
        );
      }
    };

    extractColorsFromImage();

    // Smooth color transitions on hover
    const handleMouseEnter = () => {
      gsap.to(border, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      // Increased opacity for more intense glow
      gsap.to(glowBg, {
        opacity: 0.85,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.to(card, {
        y: -8,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(border, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });

      gsap.to(glowBg, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });

      gsap.to(card, {
        y: 0,
        duration: 0.6,
        ease: "power3.inOut",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={styles.cardWrapper}>
      {/* Dynamic color glow background */}
      <div ref={glowBgRef} className={styles.glowBackground} />

      {/* Dynamic color liquid glass border */}
      <div ref={borderRef} className={styles.liquidGlassBorder} />

      <div className="relative z-10 mx-auto max-w-[454px] rounded-lg p-4 text-black">
        {children}
      </div>
    </div>
  );
};
