"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type SimpleFadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
};

export const FadeInWrapper = ({
  children,
  delay = 0,
  duration = 1,
  y = 30,
}: SimpleFadeInProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (wrapperRef.current) {
      // Set initial state
      gsap.set(wrapperRef.current, {
        opacity: 0,
        y: y,
      });

      // Animate
      gsap.to(wrapperRef.current, {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: "power2.out",
      });
    }
  }, [delay, duration, y]);

  return <div ref={wrapperRef}>{children}</div>;
};
