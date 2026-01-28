import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Container from "@/components/Container";
import Column from "@/components/Column";
import Grid from "@/components/Grid";
import { FadeIn } from "@/components/FadeIn";
import clsx from "clsx";

/**
 * Props for `BrandStory`.
 */
export type BrandStoryProps = SliceComponentProps<Content.BrandStorySlice>;

/**
 * Component for "BrandStory" Slices.
 */
const BrandStory: FC<BrandStoryProps> = ({ slice }) => {
  const isImageLeft = slice.primary.image_side === "Left";

  const getBackgroundClass = () => {
    switch (slice.primary.background_color) {
      case "Grey":
        return "bg-grey";
      case "Pink":
        return "bg-pink";
      default:
        return "bg-white";
    }
  };

  const TextColumn = (
    <Column
      span={6}
      spanMd={8}
      spanSm={4}
      className={clsx(
        "order-2 flex flex-col justify-center",
        isImageLeft ? "lg:order-2" : "lg:order-1",
      )}
    >
      <FadeIn
        className="animate-in translate-y-16 opacity-0 will-change-transform"
        vars={{ duration: 1, delay: 0.6 }}
      >
        {slice.primary.eyebrow && (
          <p className="eyebrow text-light-grey mb-2">
            {slice.primary.eyebrow}
          </p>
        )}
        <div className="h3 mb-4">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="body">
          <PrismicRichText field={slice.primary.body} />
        </div>
      </FadeIn>
    </Column>
  );

  const ImageColumn = (
    <Column
      span={6}
      spanMd={8}
      spanSm={4}
      className={clsx("order-1", isImageLeft ? "lg:order-1" : "lg:order-2")}
    >
      <FadeIn
        className="animate-in translate-y-16 opacity-0 will-change-transform"
        vars={{ duration: 1.2, delay: 0.3 }}
      >
        <div className="bg-bg-grey relative aspect-[4/3] overflow-hidden rounded-lg">
          <PrismicNextImage
            field={slice.primary.image}
            className="h-full w-full object-cover"
            fill
          />
        </div>
      </FadeIn>
    </Column>
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx("py-12 lg:py-20", getBackgroundClass())}
    >
      <Container>
        <Grid gap="lg">
          {TextColumn}
          {ImageColumn}
        </Grid>
      </Container>
    </section>
  );
};

export default BrandStory;
