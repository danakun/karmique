import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Container
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      variant="full"
      className="test section-padding relative flex items-center justify-center pt-40 pb-40"
    >
      <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
        <FadeIn
          className="eyebrow translate-y-2 text-sm font-light tracking-[.2em]"
          vars={{ duration: 0.8 }}
        >
          {slice.primary.eyebrow}
        </FadeIn>

        <RevealText
          id="cta-heading"
          field={slice.primary.title}
          as="h2"
          className="h2 mx-auto mb-6 flex max-w-2xl flex-wrap justify-center"
          align="center"
          staggerAmount={0.1}
          duration={0.8}
        />

        <FadeIn
          className="text-large mx-auto max-w-xl translate-y-4 text-balance"
          vars={{ duration: 0.8, delay: 0.3 }}
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>

        <div className="mt-10">
          <FadeIn vars={{ duration: 0.8, delay: 0.4 }}>
            <ButtonLink
              field={slice.primary.button}
              className={`{slice.primary.button.variant}`}
              variant="Tertiary"
              key={slice.id}
            />
          </FadeIn>
        </div>
      </div>
    </Container>
  );
};

export default CallToAction;
