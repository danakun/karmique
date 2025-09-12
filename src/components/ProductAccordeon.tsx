"use client";

import { useState } from "react";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type ProductAccordionProps = {
  className?: string;
};

export const ProductAccordion = ({ className = "" }: ProductAccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const accordionItems: AccordionItem[] = [
    {
      title: "Specifications",
      content: (
        <ul className="space-y-2">
          <li>
            <strong>Volume:</strong> 50ml / 1.7 fl oz
          </li>
          <li>
            <strong>Concentration:</strong> Parfum (20-25%)
          </li>
          <li>
            <strong>Longevity:</strong> 8-12 hours
          </li>
          <li>
            <strong>Sillage:</strong> Strong projection
          </li>
          <li>
            <strong>Bottle:</strong> Hand-blown crystal glass
          </li>
          <li>
            <strong>Cap:</strong> Authentic obsidian with galaxy aura coating
          </li>
          <li>
            <strong>Packaging:</strong> Luxury magnetic closure box
          </li>
        </ul>
      ),
    },
    {
      title: "Ingredients",
      content: (
        <ul className="space-y-2">
          <li>Ethically sourced premium ingredients</li>
          <li>No synthetic fillers</li>
          <li>Cruelty-free</li>
          <li>Vegan-friendly (except natural animal musks)</li>
          <li>Made in small batches</li>
        </ul>
      ),
    },
    {
      title: "Application Tips",
      content: (
        <ul className="space-y-2">
          <li>Apply to pulse points: wrists, neck, behind ears</li>
          <li>Spray 2-3 times for optimal projection</li>
          <li>Layer with unscented moisturizer for longevity</li>
          <li>Avoid rubbing - let it dry naturally</li>
        </ul>
      ),
    },
  ];

  return (
    <div className={`space-y-0 ${className}`}>
      {accordionItems.map((item, index) => {
        const isExpanded = expandedItems.has(index);

        return (
          <div key={index} className="border-b border-black/50 last:border-b-0">
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between py-6 text-left transition-colors duration-300 hover:text-black/60"
            >
              <span className="---text-base text-[14px]">{item.title}</span>
              <span
                className={`text-lg transition-transform duration-300 ${
                  isExpanded ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-96 pb-6" : "max-h-0"
              }`}
            >
              <div className="leading-relaxed text-gray-600">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
