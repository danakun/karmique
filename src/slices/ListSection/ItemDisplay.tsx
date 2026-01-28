import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import Column from "@/components/Column";
import { FadeIn } from "@/components/FadeIn";
import Grid from "@/components/Grid";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/utils/formatters";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import clsx from "clsx";

type ItemDisplayProps = {
  id: string;
  index: number;
};

export const ItemDisplay = async ({ id, index }: ItemDisplayProps) => {
  const client = createClient();
  const fragrance = await client.getByID<Content.FragranceDocument>(id);

  const formattedPrice = formatPrice(fragrance?.data.price);
  const isEven = index % 2 === 0;

  const ProductCard = (
    <Column
      span={6}
      spanMd={8}
      spanSm={4}
      className={clsx(
        "prod-card order-2 m-auto",
        isEven ? "lg:order-1" : "lg:order-2",
      )}
    >
      <FadeIn
        className="animate-in translate-y-16 opacity-0 will-change-transform"
        vars={{ duration: 1, delay: 1.1 }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="mx-auto max-w-[454px] rounded-lg p-4 text-black">
            <PrismicNextImage
              field={fragrance.data.bottle_image}
              className="aspect-[4/3] rounded-lg object-cover"
            />
            <div className="mt-4 flex w-full flex-row justify-between">
              <h3 className="text-2xl font-bold">
                <PrismicText field={fragrance.data.title} />
              </h3>
              <p aria-label="ProductPrice">
                <span className="text-2xl font-bold">{formattedPrice}</span>
              </p>
            </div>

            <div className="mt-4 mb-8 max-w-md text-lg text-black/70">
              <PrismicRichText field={fragrance.data.description} />
            </div>

            <div className="flex flex-wrap gap-4">
              <ButtonLink
                document={fragrance}
                variant="Tertiary"
                className="flex-1"
              >
                Discover
              </ButtonLink>

              <ButtonLink href="#" variant="Primary" className="flex-1">
                <span>Add to bag</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </FadeIn>
    </Column>
  );

  const ImageColumn = (
    <Column
      span={6}
      spanMd={8}
      spanSm={4}
      className={clsx(
        "z-10 order-1 min-h-40 lg:min-h-[684px]",
        isEven ? "lg:order-2" : "lg:order-1",
      )}
    >
      <FadeIn
        className="animate-in translate-y-16 opacity-0 will-change-transform"
        vars={{ duration: 2, delay: 0.4 }}
      >
        <div className="inset-0 z-0">
          <PrismicNextImage
            field={fragrance.data.featured_image}
            className="aspect-square min-h-40 w-full rounded-lg object-cover lg:min-h-[684px]"
          />
        </div>
      </FadeIn>
    </Column>
  );

  return (
    <Grid className="mb-40 last:mb-0">
      {ProductCard}
      {ImageColumn}
    </Grid>
  );
};
