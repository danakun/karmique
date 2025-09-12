import { FC } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { isFilled, Content, ContentRelationshipField } from "@prismicio/client";
import { createClient } from "@/prismicio";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";
import styles from "./FeaturedProductCard.module.css";
import { formatPrice } from "@/utils/formatters";
import { TransitionLink } from "../TransitionLink";

export type FeaturedProductCardProps = {
  fragrance?: Content.FragranceDocument;
  fragranceLink: ContentRelationshipField;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  variant?: "glass" | "solid";
  className?: string;
  delay?: number;
};

const FeaturedProductCard: FC<FeaturedProductCardProps> = async ({
  fragranceLink,
  position = "bottom-right",
  variant = "glass",
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delay = 1.6,
}) => {
  // Fetch the fragrance data
  const client = createClient();
  const fragrance = isFilled.contentRelationship(fragranceLink)
    ? await client.getByID<Content.FragranceDocument>(fragranceLink.id)
    : null;

  // Don't render if no fragrance data
  if (!fragrance) return null;

  const positionClasses = {
    "bottom-right": styles.bottomRight,
    "bottom-left": styles.bottomLeft,
    "top-right": styles.topRight,
    "top-left": styles.topLeft,
  };

  const variantClasses = {
    glass: styles.glass,
    solid: styles.solid,
  };

  // Format price for display
  const formattedPrice = formatPrice(fragrance?.data.price);

  return (
    <FadeIn
      vars={{ delay: 0.5, duration: 1 }}
      start="top 90%"
      className={clsx(
        styles.card,
        positionClasses[position],
        "motion-safe:translate-y-4",
        className,
      )}
    >
      <TransitionLink
        field={fragranceLink}
        className={clsx(styles.cardContainer, variantClasses[variant])}
      >
        <div className="flex w-full gap-2">
          {/* Product Image */}
          <PrismicNextImage
            field={fragrance.data.bottle_image}
            width={84}
            height={84}
            className={styles.productImage}
            alt=""
          />
          {/* <div className={styles.imageContainer}>
            <PrismicNextImage
              field={fragrance.data.bottle_image}
              fill
              className={styles.productImage}
              alt=""
            />
          </div> */}

          {/* Product Info */}
          <div className={styles.content}>
            {/* Category Badge */}
            <div className={styles.category}>PROJECTORS FAVOURITE</div>

            {/* Product Name */}
            <div className={styles.productName}>
              <PrismicRichText field={fragrance.data.title} />
            </div>

            {/* Price and Action */}
            <div className={styles.footer}>
              <div className={styles.price}>{formattedPrice}</div>
              <div className={`${styles.viewButton}`}>
                View
                <svg
                  className={styles.arrow}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </TransitionLink>
    </FadeIn>
  );
};

export default FeaturedProductCard;
