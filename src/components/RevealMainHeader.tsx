"use client";
import { asText, RichTextField } from "@prismicio/client";
import { clsx } from "clsx";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type RevealTextProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "start" | "center" | "end";
};

export const RevealMainHeader = ({
  field,
  id,
  align = "start",
  as: Component = "div",
  className,
  duration = 0.8,
  staggerAmount = 0.1,
}: RevealTextProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const text = asText(field);

  // Split by sentences (dots) and then by words, keeping track of sentence breaks
  const sentences = text
    .split(".")
    .filter((sentence) => sentence.trim().length > 0);
  const wordsWithBreaks: Array<{
    word: string;
    isLastInSentence: boolean;
    shouldBreakAfter: boolean;
    fontClass: string;
    sentenceIndex: number;
  }> = [];

  sentences.forEach((sentence, sentenceIndex) => {
    const words = sentence
      .trim()
      .split(" ")
      .filter((word) => word.length > 0);
    // Determine font class based on sentence
    // 0 = "Your Scent." -> font-primary
    // 1 = "Your Essence." -> font-decorative
    // 2 = "Your Energy." -> font-primary
    let fontClass = "font-primary"; // default
    if (sentenceIndex === 1) {
      fontClass = "font-decorative";
    }

    words.forEach((word, wordIndex) => {
      const isLastInSentence = wordIndex === words.length - 1;
      // Break after the second sentence (index 1) - after "Your Essence."
      const shouldBreakAfter = isLastInSentence && sentenceIndex === 1;

      wordsWithBreaks.push({
        word: isLastInSentence ? word + "." : word,
        isLastInSentence,
        shouldBreakAfter,
        fontClass,
        sentenceIndex,
      });
    });
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Animation for users who don't prefer reduced motion
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          duration,
          ease: "power3.out",
          stagger: staggerAmount,
        });
      });

      // Immediate reveal for users who prefer reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal-text-word", {
          y: 0,
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: componentRef },
  );

  return (
    <Component
      ref={componentRef}
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "end" && "text-end",
        align === "start" && "text-start",
        className,
      )}
    >
      {wordsWithBreaks.map((item, index) => {
        return (
          <React.Fragment key={`${item.word}-${index}-${id}`}>
            <span className="inline-block overflow-hidden pb-2">
              <span
                className={clsx(
                  "reveal-text-word inline-block translate-y-full will-change-transform",
                  item.fontClass,
                )}
              >
                {item.word}
              </span>
            </span>
            {/* Add space after word unless it's the last word or needs a line break */}
            {index < wordsWithBreaks.length - 1 &&
              !item.shouldBreakAfter &&
              " "}
            {/* Add line break after second sentence */}
            {item.shouldBreakAfter && <br />}
          </React.Fragment>
        );
      })}
    </Component>
  );
};
