// components/SimpleModal.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GSAPModal } from "@/components/GSAPModal";
import styles from "./SimpleModal.module.css";

export default function SimpleModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  // Only show modal on homepage
  const isHomepage = pathname === "/";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (!isHomepage) return;

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
      {/* Trigger button - only show on homepage */}
      {isHomepage && (
        <button
          onClick={openModal}
          className={`btn bg-white/10 ${styles.triggerButton}`}
        >
          Newsletter
        </button>
      )}

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

// // components/SimpleModal.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

// export default function SimpleModal() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const pathname = usePathname();

//   // Only show modal on homepage
//   const isHomepage = pathname === "/";

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Auto-open modal after 3 seconds (only on homepage)
//   useEffect(() => {
//     if (!isHomepage) return;

//     const hasSeenModal = localStorage.getItem("hasSeenNewsletterModal");

//     if (!hasSeenModal) {
//       const timer = setTimeout(() => {
//         openModal();
//         localStorage.setItem("hasSeenNewsletterModal", "true");
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [isHomepage]);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isModalOpen]);

//   // Close modal on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         closeModal();
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener("keydown", handleEscape);
//       return () => document.removeEventListener("keydown", handleEscape);
//     }
//   }, [isModalOpen]);

//   const handleOverlayClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       closeModal();
//     }
//   };

//   return (
//     <>
//       {/* Only show button on homepage */}
//       {isHomepage && (
//         <button
//           onClick={openModal}
//           style={{
//             position: "fixed",
//             bottom: "20px",
//             right: "20px",
//             padding: "12px 24px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "50px",
//             cursor: "pointer",
//             zIndex: 999,
//             boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
//           }}
//         >
//           Newsletter
//         </button>
//       )}

//       {/* Only show modal on homepage */}
//       {isHomepage && isModalOpen && (
//         <div
//           onClick={handleOverlayClick}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.4)",
//             backdropFilter: "blur(4px)",
//             WebkitBackdropFilter: "blur(4px)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               padding: "30px",
//               borderRadius: "8px",
//               boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               maxWidth: "500px",
//               width: "90%",
//               maxHeight: "90vh",
//               overflow: "auto",
//               position: "relative",
//             }}
//           >
//             <button
//               onClick={closeModal}
//               style={{
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//                 background: "none",
//                 border: "none",
//                 fontSize: "24px",
//                 cursor: "pointer",
//                 color: "#666",
//               }}
//             >
//               ×
//             </button>

//             <h2>Newsletter Signup</h2>
//             <p>Subscribe to get 10% off your first order!</p>

//             <form
//               style={{ marginTop: "20px" }}
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 console.log("Newsletter signup");
//                 closeModal();
//               }}
//             >
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   border: "1px solid #ddd",
//                   borderRadius: "4px",
//                   marginBottom: "15px",
//                   fontSize: "16px",
//                 }}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   width: "100%",
//                   padding: "12px",
//                   backgroundColor: "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   fontSize: "16px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
