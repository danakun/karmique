// components/GSAPModal.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface GSAPModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  modalClassName?: string;
  maxWidth?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export const GSAPModal = ({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
  modalClassName = "",
  maxWidth = "800px",
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: GSAPModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    if (!overlayRef.current || !modalRef.current) return;

    // Exit animation
    const tl = gsap.timeline({
      onComplete: () => onClose(),
    });

    tl.to(modalRef.current, {
      scale: 0.95,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      overlayRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.1",
    );
  };

  // GSAP entrance animation
  useGSAP(() => {
    if (isOpen && overlayRef.current && modalRef.current) {
      // Set initial states
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(modalRef.current, { scale: 0.9, y: 30 });

      // Entrance animation
      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }).to(
        modalRef.current,
        {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.2",
      );
    }
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, closeOnEscape, closeModal]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 ${overlayClassName}`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={modalRef}
        className={`relative overflow-hidden rounded-2xl bg-white shadow-2xl ${modalClassName} ${className}`}
        style={{
          maxWidth,
          width: "100%",
          maxHeight: "90vh",
        }}
      >
        {children}
      </div>
    </div>
  );
};
