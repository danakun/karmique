"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

interface UseDropdownBlurProps {
  isActive: boolean;
  onClose: () => void;
}

export const useDropdownBlur = ({
  isActive,
  onClose,
}: UseDropdownBlurProps) => {
  const [mounted, setMounted] = useState(false);

  // Handle mounting for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  const blurElement = (
    <div
      className={clsx(
        "navbar-blur fixed inset-0 bg-black/10 transition-all duration-500 ease-in-out",
        isActive
          ? "pointer-events-auto z-30 opacity-100 backdrop-blur-sm"
          : "pointer-events-none z-30 opacity-0",
      )}
      style={{ top: "73px" }}
      onClick={onClose}
      aria-hidden={!isActive}
    />
  );

  // Don't render anything during SSR or before mounting
  if (!mounted || typeof window === "undefined") {
    return null;
  }

  return createPortal(blurElement, document.body);
};
