import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import Column from "@/components/Column";
import Grid from "@/components/Grid";
import { RevealText } from "@/components/RevealText";
import { ItemDisplay } from "./ItemDisplay";

/**
 * Props for `TextSection`.
 */
export type TextSectionProps = SliceComponentProps<Content.TextSectionSlice>;

/**
 * Component for "TextSection" Slices.
 */
const TextSection: FC<TextSectionProps> = ({ slice }) => {
  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      as="section"
    >
      <Grid>
        <Column span={12} className="mx-auto max-w-[1050px] pt-40 text-center">
          <p className="eyebrow mb-6 text-center tracking-wider">
            {slice.primary.eyebrow}
          </p>
          <RevealText
            field={slice.primary.title}
            as="h2"
            id={`frafrance-list-title-${slice.id}`}
            align="center"
            duration={0.8}
            staggerAmount={0.1}
            className="h2 mb-6 flex flex-wrap justify-center leading-tight text-balance"
          >
            {/* <PrismicRichText field={slice.primary.title} /> */}
          </RevealText>
          <div className="text-large mx-auto mb-40 max-w-2xl text-balance">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </Column>
      </Grid>
      {slice.primary.fragrances.map((item, index) => {
        return isFilled.contentRelationship(item.fragrance) ? (
          <ItemDisplay
            key={item.fragrance.id}
            id={item.fragrance.id}
            index={index}
          />
        ) : null;
      })}
    </Container>
  );
};

export default TextSection;
