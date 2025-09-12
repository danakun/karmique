"use client";

import { useRef } from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
};

export const FadeIn = ({
  children,
  vars = {},
  start = "top 80%",
  className,
}: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference  )", () => {
        gsap.to(containerRef.current, {
          y: 0,
          opacity: 1,
          duration: 3,
          ease: "power3.out",
          ...vars,
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
          },
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () =>
        gsap.to(containerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "none",
          stagger: 0,
        }),
      );
    },
    { scope: containerRef },
  );
  return (
    <div className={clsx("opacity-0", className)} ref={containerRef}>
      {children}
    </div>
  );
};
