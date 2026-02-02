"use client";

import { useRef, useEffect } from "react";
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

  useEffect(() => {
    const card = cardRef.current;
    const border = borderRef.current;
    const glowBg = glowBgRef.current;

    if (!card || !border || !glowBg) return;

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(border, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(glowBg, {
        opacity: 0.5,
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
  }, [fragranceUid]);

  return (
    <div ref={cardRef} className={styles.cardWrapper}>
      {/* Subtle glass glow background */}
      <div ref={glowBgRef} className={styles.glowBackground} />

      {/* Liquid glass border */}
      <div ref={borderRef} className={styles.liquidGlassBorder} />

      <div className="relative z-10 mx-auto max-w-[454px] rounded-lg p-4 text-black">
        {children}
      </div>
    </div>
  );
};
