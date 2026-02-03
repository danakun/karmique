"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import clsx from "clsx";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!searchRef.current) return;

    if (isOpen) {
      gsap.to(searchRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      gsap.to(searchRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      setSearchQuery("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={searchRef} className={styles.searchBar}>
      <div className={styles.searchBarContent}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fragrances..."
            className={clsx("input", styles.searchInput)}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!searchQuery.trim()}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
