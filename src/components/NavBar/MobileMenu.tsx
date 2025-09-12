"use client";

import { useState } from "react";
import { NavigationSection } from "./NavigationSection";
import { createNavigationConfig } from "./navigationConfig";
import { TransitionLink } from "../TransitionLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Create the config directly in this component
  const navigationConfig = createNavigationConfig();

  const toggleDropdown = (dropdownId: string) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="navbar-mobile-content">
          <div className="navbar-mobile-section">
            <button
              className="navbar-mobile-dropdown-toggle"
              onClick={() => toggleDropdown("collections")}
            >
              Collection
              <span
                className={`navbar-mobile-arrow ${activeDropdown === "collections" ? "open" : ""}`}
              >
                ▼
              </span>
            </button>

            {activeDropdown === "collections" && (
              <div
                className="navbar-mobile-dropdown"
                id="mobile-collections-dropdown"
                role="menu"
                aria-label="Collections submenu"
              >
                {navigationConfig.collectionsDropdown.sections.map(
                  (section) => (
                    <NavigationSection
                      key={section.title}
                      section={section}
                      onLinkClick={onClose}
                      variant="mobile"
                    />
                  ),
                )}
              </div>
            )}
          </div>

          {navigationConfig.mainLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="navbar-mobile-main-link"
              onClick={onClose}
            >
              {link.label}
            </TransitionLink>
          ))}
          <button className="navbar-mobile-main-link" onClick={onClose}>
            Search
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="navbar-overlay"
          onClick={onClose}
          aria-label="Close mobile menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClose();
            }
          }}
        />
      )}
    </>
  );
};
