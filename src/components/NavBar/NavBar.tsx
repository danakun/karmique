"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useScrollDirection } from "./hooks/useScrollDirection";
import { useNavbarTransparency } from "./hooks/useNavbarTransparency";
import { MobileMenu } from "./MobileMenu";
import { CollectionsDropdown } from "./CollectionsDropdown";
import { SearchBar } from "./SearchBar"; // NEW IMPORT
import { Content } from "@prismicio/client";
import { createNavigationConfig } from "./navigationConfig";
import { useDropdownBlur } from "./hooks/useDropdownBlur";
import { TransitionLink } from "../TransitionLink";

type NavBarProps = {
  settings?: Content.SettingsDocument;
};

export const NavBar = ({ settings }: NavBarProps = {}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false); // NEW STATE
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create static navigation config
  const navigationConfig = createNavigationConfig();

  // Custom hooks
  const { isScrollingUp } = useScrollDirection();
  const {
    shouldBeOpaque,
    handleNavbarEnter,
    handleNavbarLeave,
    setInteracting,
  } = useNavbarTransparency({ isScrollingUp, activeDropdown, mobileMenuOpen });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // NEW: Toggle search
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setActiveDropdown(null); // Close any dropdown when opening search
    }
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // Desktop dropdown functions
  const showDropdown = (dropdownId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(dropdownId);
    setInteracting(true);
    setSearchOpen(false); // Close search when opening dropdown
  };

  const hideDropdown = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setInteracting(false);
      hoverTimeoutRef.current = null;
    }, 150);
  };

  const keepDropdownOpen = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setInteracting(true);
  };

  const blurPortal = useDropdownBlur({
    isActive: !!activeDropdown || searchOpen, // UPDATED
    onClose: () => {
      hideDropdown();
      closeSearch();
    },
  });

  return (
    <>
      <header
        className={`navbar-container ${shouldBeOpaque ? "opaque" : "transparent"}`}
        onMouseEnter={handleNavbarEnter}
        onMouseLeave={handleNavbarLeave}
      >
        <nav className="navbar-nav">
          {/* Left Section - Desktop Navigation */}
          <div className="navbar-left">
            {/* Mobile Hamburger */}
            <button
              className="navbar-hamburger"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <div
                className={`navbar-hamburger-line ${mobileMenuOpen ? "open" : ""}`}
              ></div>
              <div
                className={`navbar-hamburger-line ${mobileMenuOpen ? "open" : ""}`}
              ></div>
              <div
                className={`navbar-hamburger-line ${mobileMenuOpen ? "open" : ""}`}
              ></div>
            </button>

            {/* Desktop Links */}
            <div className="navbar-links-desktop">
              <div
                className="nav-item-dropdown"
                onMouseEnter={() => showDropdown("collections")}
                onMouseLeave={hideDropdown}
                onClick={hideDropdown}
              >
                <span className="nav-link">Collection</span>
              </div>

              {settings?.data.navigation_link?.map((link) => (
                <TransitionLink
                  key={link.key}
                  field={link}
                  className="nav-link"
                />
              ))}
            </div>
          </div>

          {/* Center Section - Logo */}
          <div className="navbar-center">
            <TransitionLink href="/" className="logo">
              <Image
                src="/karmique-logo.svg"
                alt="Karmique Logo"
                width={120}
                height={20}
                priority
                className="logo-image"
              />
            </TransitionLink>
          </div>

          {/* Right Section - Account/Cart/Search */}
          <div className="navbar-links-desktop">
            {navigationConfig.mainLinks
              .filter((link) => ["Account", "Bag (0)"].includes(link.label))
              .map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            <button
              className="nav-link"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              {searchOpen ? "Close" : "Search"}
            </button>
          </div>
        </nav>

        {/* Desktop Collections Dropdown */}
        <CollectionsDropdown
          isActive={activeDropdown === "collections"}
          onMouseEnter={keepDropdownOpen}
          onMouseLeave={hideDropdown}
          onLinkClick={hideDropdown}
        />

        {/* Search Bar - NEW */}
        <SearchBar isOpen={searchOpen} onClose={closeSearch} />

        {/* Mobile Menu Component */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
      </header>

      {/* Render blur portal */}
      {blurPortal}
    </>
  );
};
