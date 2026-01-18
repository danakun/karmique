// components/HomepageWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { HomepageDocumentDataSlicesSlice } from "../../prismicio-types";

interface HomepageWrapperProps {
  slices: HomepageDocumentDataSlicesSlice[];
}

export default function HomepageWrapper({ slices }: HomepageWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Auto-open modal after 3 seconds (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      openModal();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isModalOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Your existing Prismic content */}
      <SliceZone slices={slices} components={components} />

      {/* Optional: Add a manual trigger button somewhere */}
      <button
        onClick={openModal}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px 24px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        Newsletter
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "500px",
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              ×
            </button>

            <h2>Newsletter Signup</h2>
            <p>Subscribe to get 10% off your first order!</p>

            <form
              style={{ marginTop: "20px" }}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Newsletter signup");
                closeModal();
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              />
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
