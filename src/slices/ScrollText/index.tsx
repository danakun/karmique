"use client";

import { FC, useRef } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/Container";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `ScrollText`.
 */
export type ScrollTextProps = SliceComponentProps<Content.ScrollTextSlice>;

/**
 * Component for "ScrollText" Slices.
 */
const ScrollText: FC<ScrollTextProps> = ({ slice }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const words = asText(slice.primary.text).split(" ");

  useGSAP(
    () => {
      const component = componentRef.current;
      const textElement = textRef.current;
      const contentElement = contentRef.current;
      const letters = textElement?.querySelectorAll("span");

      if (!component || !textElement || !contentElement || !letters) {
        return;
      }

      gsap.set(contentElement, { filter: "blur(40px)" });
      gsap.set(letters, { color: "grey" });

      gsap.to(contentElement, {
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: component,
          start: "top 55%",
          end: "top 25%",
          scrub: 2,
          markers: false,
        },
      });

      const colorTl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 2,
          markers: false,
        },
      });
      colorTl.to(letters, {
        color: "black",
        duration: 1,
        stagger: { each: 0.01, from: "start", ease: "power1.inOut" },
      });
      colorTl.to(
        ".glow-background",
        {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        0,
      );
      // Replace the single gsap.to with this timeline approach
      const glowOutTl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "bottom 90%",
          end: "bottom -20%", // Extended end point
          scrub: 1,
          markers: false,
        },
      });

      glowOutTl.to(".glow-background", {
        opacity: 0,
        duration: 3,
        ease: "power2.out", // Smoother easing
      });
    },
    { scope: componentRef },
  );
  return (
    <Container
      ref={componentRef}
      as="section"
      variant="full"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="section-padding relative flex items-center justify-center bg-white"
    >
      <div className="glow-background absolute inset-0 z-0 h-full w-full opacity-0">
        {/* <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-5 mix-blend-multiply"></div> */}
      </div>
      <div ref={contentRef}>
        <div className="eyebrow mb-6 text-center tracking-wider">
          {slice.primary.eyebrow}
        </div>

        <div className="text-center" ref={textRef}>
          <p className="decorative h2 flex flex-wrap justify-center px-12 leading-tight text-balance">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline">
                {word.split("").map((letter, letterIndex) => (
                  <span key={`${letter}-${letterIndex}`} className="inline">
                    {letter}
                  </span>
                ))}
                {index < words.length - 1 ? (
                  <span className="inline">&nbsp;</span>
                ) : null}
              </span>
            ))}
          </p>
        </div>
        {/* <PrismicRichText field={slice.primary.text} /> */}
      </div>
    </Container>
  );
};

export default ScrollText;
