"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GSAPModal } from "@/components/GSAPModal";
import styles from "./SimpleModal.module.css";

const MODAL_SHOWN_KEY = "karmique_welcome_modal_shown";

export default function SimpleModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  // Only show modal on homepage
  const isHomepage = pathname === "/";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Mark modal as shown in localStorage
    localStorage.setItem(MODAL_SHOWN_KEY, "true");
  };

  useEffect(() => {
    if (!isHomepage) return;

    // Check if modal was already shown
    const hasBeenShown = localStorage.getItem(MODAL_SHOWN_KEY);

    if (hasBeenShown) {
      // Modal was already shown, don't show again
      return;
    }

    // Show modal after 4 seconds if it hasn't been shown before
    const timer = setTimeout(() => {
      openModal();
    }, 4000);

    return () => clearTimeout(timer);
  }, [isHomepage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup");
    closeModal();
  };

  return (
    <>
      {/* Modal with GSAP animations */}
      <GSAPModal
        isOpen={isHomepage && isModalOpen}
        onClose={closeModal}
        maxWidth="800px"
      >
        <div className={styles.modalContent}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <Image
              src="/image-c.png"
              alt="Fragrance product"
              width={400}
              height={500}
              className={styles.modalImage}
            />
          </div>

          {/* Form Section */}
          <div className={styles.formSection}>
            <button onClick={closeModal} className={styles.closeButton}>
              ×
            </button>

            <div className={styles.formHeader}>
              <div className={styles.welcomeText}>Welcome Offer</div>
              <div className={styles.formTitle}>Enjoy 10% off your</div>
              <div className={styles.formSubtitle}>first order</div>
            </div>

            <form className={styles.signupForm} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                required
                className={styles.emailInput}
              />
              <button type="submit" className={styles.signupButton}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </GSAPModal>
    </>
  );
}
