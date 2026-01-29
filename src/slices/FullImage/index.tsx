import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { FadeIn } from "@/components/FadeIn";

/**
 * Props for `FullImage`.
 */
export type FullImageProps = SliceComponentProps<Content.FullImageSlice>;

/**
 * Component for "FullImage" Slices.
 */
const FullImage: FC<FullImageProps> = ({ slice }) => {
  const hasLink = isFilled.link(slice.primary.link);

  const ImageContent = (
    <FadeIn vars={{ duration: 0.8, delay: 0.2 }} className="relative w-full">
      <PrismicNextImage
        field={slice.primary.image}
        className="h-auto w-full"
        priority={false}
      />
    </FadeIn>
  );

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full overflow-hidden"
    >
      {hasLink ? (
        <PrismicNextLink field={slice.primary.link} className="block">
          {ImageContent}
        </PrismicNextLink>
      ) : (
        ImageContent
      )}
    </section>
  );
};

export default FullImage;
