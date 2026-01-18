"use client";

import Image from "next/image";
import { NavigationSection } from "./NavigationSection";
import { createNavigationConfig } from "./navigationConfig";

import Link from "next/link";

interface CollectionsDropdownProps {
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick?: () => void;
}

export const CollectionsDropdown = ({
  isActive,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}: CollectionsDropdownProps) => {
  // Create the config directly in this component
  const navigationConfig = createNavigationConfig();

  return (
    <div
      className={`navbar-dropdown ${isActive ? "active" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
      aria-label="Collections menu"
      aria-hidden={!isActive}
    >
      <div className="navbar-dropdown-content">
        <div className="navbar-dropdown-left">
          {navigationConfig.collectionsDropdown.sections.map((section) => (
            <NavigationSection
              key={section.title}
              section={section}
              variant="desktop"
              onLinkClick={onLinkClick}
            />
          ))}
        </div>
        <div className="navbar-dropdown-right">
          {navigationConfig.collectionsDropdown.featuredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="navbar-category-card"
              onClick={onLinkClick}
            >
              <div className="navbar-category-image-container">
                <Image
                  src={link.image}
                  alt={link.alt}
                  fill
                  className="navbar-category-image"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="navbar-category-overlay">
                <div className="navbar-category-title">{link.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
