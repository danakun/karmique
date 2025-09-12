import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { createClient } from "@/prismicio";
//import { clsx } from "clsx";
import { FadeIn } from "@/components/FadeIn";
import Column from "@/components/Column";
import Container from "@/components/Container";
import Grid from "@/components/Grid";
import { RevealMainHeader } from "@/components/RevealMainHeader";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = async ({ slice }) => {
  // Fetch the fragrance data using the same pattern as ProductFeature
  const client = createClient();
  const fragrance = isFilled.contentRelationship(slice.primary.fragrance)
    ? await client.getByID<Content.FragranceDocument>(
        slice.primary.fragrance.id,
      )
    : null;

  return (
    <Container
      variant="full"
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen items-start bg-black"
    >
      {/* Full-width background image */}
      <FadeIn
        vars={{ scale: 1, opacity: 0.9 }}
        className="bg-image absolute inset-0 z-0 opacity-0 motion-safe:scale-125"
      >
        <PrismicNextImage
          field={slice.primary.image}
          fill
          className="object-cover motion-reduce:opacity-90"
          priority
          alt=""
        />
      </FadeIn>

      {/* Dark overlay */}
      {/* <div className="absolute inset-0 z-[1] bg-black/20" /> */}

      {/* Content with proper margins */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px]">
        <Grid>
          <Column span={12}>
            {/* Main heading */}
            <div className="max-w-8xl relative flex flex-col justify-center">
              <RevealMainHeader
                field={slice.primary.heading}
                id="hero-heading"
                className="h1 font-decorative my-6 leading-0.5 text-white 2xl:mt-12"
                staggerAmount={0.2}
                duration={1.7}
              />
            </div>
          </Column>
          <Column span={4}>
            {/* Description */}
            <FadeIn
              vars={{ delay: 1, duration: 1 }}
              className="text-large mb-8 text-white motion-safe:translate-y-8"
            >
              <PrismicRichText field={slice.primary.paragraph} />
            </FadeIn>

            {/* Buttons */}
            <FadeIn
              vars={{ delay: 1.4, duration: 1 }}
              className="flex gap-4 motion-safe:translate-y-5"
            >
              {slice.primary.button.map((link) => (
                <ButtonLink key={link.key} field={link} variant="Secondary" />
                // <PrismicNextLink
                //   key={link.key}
                //   field={link}
                //   className={clsx(
                //     "btn",
                //     link.variant === "Secondary"
                //       ? "btn-secondary"
                //       : "btn-primary",
                //   )}
                // />
              ))}
            </FadeIn>
          </Column>
        </Grid>
      </div>

      {/* Featured Product Card - Only render if fragrance exists */}
      {fragrance && (
        <FeaturedProductCard
          fragrance={fragrance}
          fragranceLink={slice.primary.fragrance}
          position="bottom-right"
          variant="glass"
          delay={1.8}
        />
      )}
    </Container>
  );
};

export default Hero;
