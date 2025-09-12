import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Container from "@/components/Container";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Column from "@/components/Column";
import Grid from "@/components/Grid";
import { FadeIn } from "@/components/FadeIn";

/**
 * Props for `FeaturedFragrance`.
 */
export type FeaturedFragranceProps =
  SliceComponentProps<Content.FeaturedFragranceSlice>;

/**
 * Component for "FeaturedFragrance" Slices.
 */
const FeaturedFragrance: FC<FeaturedFragranceProps> = async ({ slice }) => {
  // const client = createClient();
  // const fragrance = isFilled.contentRelationship(slice.primary.fragrance)
  //   ? await client.getByID<Content.FragranceDocument>(
  //       slice.primary.fragrance.id,
  //     )
  //   : null;

  // const formattedPrice = formatPrice(fragrance?.data.price);

  return (
    <Container
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen items-start bg-white pt-6"
    >
      <Grid className="pt-5">
        <Column span={8}>
          <FadeIn className="translate-y-16 opacity-0" vars={{ duration: 1 }}>
            <PrismicNextImage
              field={slice.primary.feature_image}
              className="h-auto w-full rounded-lg object-cover"
            />
          </FadeIn>
        </Column>
        <Column span={4}>
          <FadeIn
            className="animate-in bg-grey/10 translate-y-16 self-end opacity-0 will-change-transform"
            vars={{ duration: 1, delay: 1 }}
          >
            <PrismicNextImage
              field={slice.primary.smallimage}
              className="h-auto w-full rounded-lg object-cover"
            />
          </FadeIn>
          <FadeIn
            className="animate-in mb-16 translate-y-16 opacity-0"
            vars={{ duration: 1 }}
          >
            <h2 className="text-large medium pt-6 pb-5">
              <PrismicText field={slice.primary.heading} />
            </h2>
            <div className="body pb-5">
              <PrismicRichText field={slice.primary.text} />
            </div>
            <PrismicNextLink
              field={slice.primary.link}
              className="btn btn-link nav-link"
            />
          </FadeIn>
          {/* <FadeIn
            className="animate-in bg-grey/10 translate-y-16 self-end opacity-0 will-change-transform"
            vars={{ duration: 1, delay: 2 }}
          >
            <PrismicImage field={fragrance?.data.bottle_image} />
            <h3>
              <PrismicText
                field={fragrance?.data.title}
                fallback="Unknown fragrance"
              />
            </h3>
            <p aria-label="ProductPrice">
              <span>{formattedPrice}</span>
            </p>
            <ButtonLink variant="Tertiary" document={fragrance}>
              See details
            </ButtonLink>
          </FadeIn> */}
        </Column>
      </Grid>
    </Container>
  );
};

export default FeaturedFragrance;
