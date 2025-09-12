"use client";

import { useState, useCallback } from "react";

interface UseNavbarTransparencyProps {
  isScrollingUp: boolean;
  activeDropdown: string | null;
  mobileMenuOpen: boolean;
}

export const useNavbarTransparency = ({
  isScrollingUp,
  activeDropdown,
  mobileMenuOpen,
}: UseNavbarTransparencyProps) => {
  const [isInteracting, setIsInteracting] = useState(false);

  // Determine if navbar should be opaque
  const shouldBeOpaque =
    isScrollingUp || isInteracting || activeDropdown || mobileMenuOpen;

  // Handle navbar hover for transparency
  const handleNavbarEnter = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handleNavbarLeave = useCallback(() => {
    if (!activeDropdown && !mobileMenuOpen) {
      setIsInteracting(false);
    }
  }, [activeDropdown, mobileMenuOpen]);

  const setInteracting = useCallback((interacting: boolean) => {
    setIsInteracting(interacting);
  }, []);

  return {
    shouldBeOpaque,
    isInteracting,
    handleNavbarEnter,
    handleNavbarLeave,
    setInteracting,
  };
};
