"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useScrollDirection } from "./hooks/useScrollDirection";
import { useNavbarTransparency } from "./hooks/useNavbarTransparency";
import { MobileMenu } from "./MobileMenu";
import { CollectionsDropdown } from "./CollectionsDropdown";
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

  // Desktop dropdown functions
  const showDropdown = (dropdownId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(dropdownId);
    setInteracting(true);
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
    isActive: !!activeDropdown,
    onClose: hideDropdown,
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

              {/* Dynamic main navigation links from Prismic */}
              {/* {settings?.data.navigation_link?.map((link) => {
                const typedLink = link as PrismicNavigationLink;
                const href =
                  typedLink.url ||
                  (typedLink.type === "homepage" ? "/" : `/${typedLink.type}`);

                return (
                  <Link key={typedLink.key} href={href} className="nav-link">
                    {typedLink.text}
                  </Link>
                );
              })} */}
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

          {/* Right Section - Account/Cart Links */}
          <div className="navbar-links-desktop">
            {navigationConfig.mainLinks
              .filter((link) => ["Account", "Bag (0)"].includes(link.label))
              .map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            <button className="nav-link">Search</button>
          </div>
        </nav>

        {/* Desktop Collections Dropdown */}
        <CollectionsDropdown
          isActive={activeDropdown === "collections"}
          onMouseEnter={keepDropdownOpen}
          onMouseLeave={hideDropdown}
          onLinkClick={hideDropdown}
        />
      </header>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

      {/* Render blur portal */}
      {blurPortal}
    </>
  );
};
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useRef, useEffect } from "react";
// import { useScrollDirection } from "./hooks/useScrollDirection";
// import { useNavbarTransparency } from "./hooks/useNavbarTransparency";

// export const NavBar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
//   const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Custom hooks
//   const { isScrollingUp } = useScrollDirection();
//   const {
//     shouldBeOpaque,
//     handleNavbarEnter,
//     handleNavbarLeave,
//     setInteracting,
//   } = useNavbarTransparency({ isScrollingUp, activeDropdown, mobileMenuOpen });

//   // Cleanup timeout on unmount
//   useEffect(() => {
//     return () => {
//       if (hoverTimeoutRef.current) {
//         clearTimeout(hoverTimeoutRef.current);
//       }
//     };
//   }, []);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//     setActiveDropdown(null);
//   };

//   const closeMobileMenu = () => {
//     setMobileMenuOpen(false);
//     setActiveDropdown(null);
//   };

//   const toggleDropdown = (dropdownId: string) => {
//     setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
//   };

//   // Desktop dropdown functions
//   const showDropdown = (dropdownId: string) => {
//     console.log("showDropdown called:", dropdownId);
//     if (hoverTimeoutRef.current) {
//       clearTimeout(hoverTimeoutRef.current);
//       hoverTimeoutRef.current = null;
//     }
//     setActiveDropdown(dropdownId);
//     setInteracting(true);
//   };

//   const hideDropdown = () => {
//     console.log("hideDropdown called");
//     hoverTimeoutRef.current = setTimeout(() => {
//       setActiveDropdown(null);
//       setInteracting(false);
//       hoverTimeoutRef.current = null;
//     }, 150);
//   };

//   const keepDropdownOpen = () => {
//     if (hoverTimeoutRef.current) {
//       clearTimeout(hoverTimeoutRef.current);
//       hoverTimeoutRef.current = null;
//     }
//     setInteracting(true);
//   };

//   return (
//     <>
//       <header
//         className={`navbar-container ${shouldBeOpaque ? "opaque" : "transparent"}`}
//         onMouseEnter={handleNavbarEnter}
//         onMouseLeave={handleNavbarLeave}
//       >
//         <nav className="navbar-nav">
//           <div className="navbar-left">
//             <button
//               className="navbar-hamburger"
//               onClick={toggleMobileMenu}
//               aria-label="Toggle mobile menu"
//             >
//               <div
//                 className={`navbar-hamburger-line ${mobileMenuOpen ? "open" : ""}`}
//               ></div>
//               <div
//                 className={`navbar-hamburger-line ${mobileMenuOpen ? "open" : ""}`}
//               ></div>
//               <div
//                 className={`navbar-hamburger-line ${mobileMenuOpen ? "open" : ""}`}
//               ></div>
//             </button>

//             <div className="navbar-links-desktop">
//               <div
//                 className="nav-item-dropdown"
//                 onMouseEnter={() => showDropdown("collections")}
//                 onMouseLeave={hideDropdown}
//               >
//                 <span className="nav-link">Collection</span>
//               </div>
//               <Link href="/journal" className="nav-link">
//                 Journal
//               </Link>
//               <Link href="/brand" className="nav-link">
//                 Brand
//               </Link>
//             </div>
//           </div>

//           <div className="navbar-center">
//             <Link href="/" className="logo" onClick={closeMobileMenu}>
//               <Image
//                 src="/karmique-logo.svg"
//                 alt="Karmique Logo"
//                 width={120}
//                 height={20}
//                 priority
//                 className="logo-image"
//               />
//             </Link>
//           </div>

//           <div className="navbar-links-desktop">
//             <Link href="/account" className="nav-link">
//               Account
//             </Link>
//             <button className="nav-link">Search</button>
//             <Link href="/cart" className="nav-link">
//               Bag (0)
//             </Link>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className={`navbar-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
//           <div className="navbar-mobile-content">
//             <div className="navbar-mobile-section">
//               <button
//                 className="navbar-mobile-dropdown-toggle"
//                 onClick={() => toggleDropdown("collections")}
//               >
//                 Collection
//                 <span
//                   className={`navbar-mobile-arrow ${activeDropdown === "collections" ? "open" : ""}`}
//                 >
//                   ▼
//                 </span>
//               </button>

//               {activeDropdown === "collections" && (
//                 <div className="navbar-mobile-dropdown">
//                   <div className="navbar-mobile-dropdown-section">
//                     <h4 className="navbar-mobile-section-title">
//                       Shop by Type
//                     </h4>
//                     <Link
//                       href="/shop/generator"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Generator
//                     </Link>
//                     <Link
//                       href="/shop/manifestor"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Manifestor
//                     </Link>
//                     <Link
//                       href="/shop/manifesting-generator"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Mani-gen
//                     </Link>
//                     <Link
//                       href="/shop/projector"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Projector
//                     </Link>
//                     <Link
//                       href="/shop/reflector"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Reflector
//                     </Link>
//                   </div>

//                   <div className="navbar-mobile-dropdown-section">
//                     <h4 className="navbar-mobile-section-title">Categories</h4>
//                     <Link
//                       href="/collections/essentials"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Essentials
//                     </Link>
//                     <Link
//                       href="/collections/bestsellers"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Bestsellers
//                     </Link>
//                     <Link
//                       href="/collections/new-arrivals"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       New Arrivals
//                     </Link>
//                     <Link
//                       href="/collections/kits"
//                       className="navbar-mobile-link"
//                       onClick={closeMobileMenu}
//                     >
//                       Kits
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <Link
//               href="/journal"
//               className="navbar-mobile-main-link"
//               onClick={closeMobileMenu}
//             >
//               Journal
//             </Link>
//             <Link
//               href="/brand"
//               className="navbar-mobile-main-link"
//               onClick={closeMobileMenu}
//             >
//               Brand
//             </Link>
//             <Link
//               href="/account"
//               className="navbar-mobile-main-link"
//               onClick={closeMobileMenu}
//             >
//               Account
//             </Link>
//             <button
//               className="navbar-mobile-main-link"
//               onClick={closeMobileMenu}
//             >
//               Search
//             </button>
//             <Link
//               href="/cart"
//               className="navbar-mobile-main-link"
//               onClick={closeMobileMenu}
//             >
//               Bag (0)
//             </Link>
//           </div>
//         </div>

//         {/* Desktop Collections Dropdown */}
//         <div
//           className={`navbar-dropdown ${activeDropdown === "collections" ? "active" : ""}`}
//           onMouseEnter={keepDropdownOpen}
//           onMouseLeave={hideDropdown}
//         >
//           <div className="navbar-dropdown-content">
//             <div className="navbar-dropdown-left">
//               <div className="navbar-dropdown-section">
//                 <h3 className="navbar-section-title">Shop by Type</h3>
//                 <ul className="navbar-section-links">
//                   <li>
//                     <Link href="/shop/generator" className="nav-link">
//                       Generator
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/shop/manifestor" className="nav-link">
//                       Manifestor
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/shop/manifesting-generator"
//                       className="nav-link"
//                     >
//                       Mani-gen
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/shop/projector" className="nav-link">
//                       Projector
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/shop/reflector" className="nav-link">
//                       Reflector
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="navbar-dropdown-section">
//                 <h3 className="navbar-section-title">Categories</h3>
//                 <ul className="navbar-section-links">
//                   <li>
//                     <Link href="/collections/essentials" className="nav-link">
//                       Essentials
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/collections/bestsellers" className="nav-link">
//                       Bestsellers
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/collections/new-arrivals" className="nav-link">
//                       New Arrivals
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/collections/kits" className="nav-link">
//                       Kits
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="navbar-dropdown-section">
//                 <h3 className="navbar-section-title">Special</h3>
//                 <ul className="navbar-section-links">
//                   <li>
//                     <Link href="/gift-cards" className="nav-link">
//                       Gift Cards
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/sale" className="nav-link">
//                       Sale
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="navbar-dropdown-right">
//               <Link
//                 href="/collections/human-design"
//                 className="navbar-category-card"
//               >
//                 <div className="navbar-category-image-container">
//                   <Image
//                     src="/image-a.png"
//                     alt="Human Design Types"
//                     fill
//                     className="navbar-category-image"
//                     style={{ objectFit: "cover" }}
//                   />
//                 </div>
//                 <div className="navbar-category-overlay">
//                   <div className="navbar-category-title">
//                     Human Design Types
//                   </div>
//                 </div>
//               </Link>
//               <Link
//                 href="/collections/signature-scents"
//                 className="navbar-category-card"
//               >
//                 <div className="navbar-category-image-container">
//                   <Image
//                     src="/image-b.png"
//                     alt="Signature Scents"
//                     fill
//                     className="navbar-category-image"
//                     style={{ objectFit: "cover" }}
//                   />
//                 </div>
//                 <div className="navbar-category-overlay">
//                   <div className="navbar-category-title">Signature Scents</div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {mobileMenuOpen && (
//         <div className="navbar-overlay" onClick={closeMobileMenu} />
//       )}
//     </>
//   );
// };
