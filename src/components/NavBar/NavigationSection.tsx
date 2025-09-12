"use client";

import { NavigationSection as NavigationSectionType } from "./navigationConfig";
import { TransitionLink } from "../TransitionLink";

interface NavigationSectionProps {
  section: NavigationSectionType;
  onLinkClick?: () => void;
  variant?: "desktop" | "mobile";
}

export const NavigationSection = ({
  section,
  onLinkClick,
  variant = "desktop",
}: NavigationSectionProps) => {
  const titleClass =
    variant === "mobile"
      ? "navbar-mobile-section-title"
      : "navbar-section-title";

  const linkClass = variant === "mobile" ? "navbar-mobile-link" : "nav-link";

  return (
    <div
      className={
        variant === "mobile"
          ? "navbar-mobile-dropdown-section"
          : "navbar-dropdown-section"
      }
    >
      <h4 className={titleClass} role="heading" aria-level={4}>
        {section.title}
      </h4>

      {variant === "desktop" ? (
        <ul className="navbar-section-links" role="list">
          {section.links.map((link) => (
            <li key={link.href} role="listitem">
              <TransitionLink
                href={link.href}
                className={linkClass}
                onClick={onLinkClick}
                // role="menuitem"
                tabIndex={0}
              >
                {link.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      ) : (
        <div role="list">
          {section.links.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className={linkClass}
              onClick={onLinkClick}
              // role="menuitem"
              tabIndex={0}
            >
              {link.label}
            </TransitionLink>
          ))}
        </div>
      )}
    </div>
  );
};
