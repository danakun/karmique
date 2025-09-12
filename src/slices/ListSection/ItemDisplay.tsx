import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import Column from "@/components/Column";
import { FadeIn } from "@/components/FadeIn";
import Grid from "@/components/Grid";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/utils/formatters";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

type ItemDisplayProps = {
  id: string;
  index: number;
};

export const ItemDisplay = async ({ id, index }: ItemDisplayProps) => {
  // Fetch the fragrance data using the same pattern as ProductFeature
  const client = createClient();
  const fragrance = await client.getByID<Content.FragranceDocument>(id);

  const formattedPrice = formatPrice(fragrance?.data.price);
  const isEven = index % 2 === 0;

  // For even items (0, 2, 4...), card on left, big image on right
  // For odd items (1, 3, 5...), big image on left, card on right

  if (isEven) {
    // Index 0, 2, 4... - Card on left, big image on right
    return (
      <Grid className="mb-40 last:mb-0">
        <Column span={6} className="prod-card flex items-center justify-center">
          <FadeIn
            className="animate-in translate-y-16 opacity-0 will-change-transform"
            vars={{ duration: 1, delay: 1.1 }}
          >
            <Column
              span={3}
              className="mx-auto max-w-[454px] rounded-lg p-4 text-black"
            >
              <PrismicNextImage
                field={fragrance.data.bottle_image}
                className="rounded-lg"
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

              {/* <Attributes
                scent_profile={fragrance.data.scent_profile}
                mood={fragrance.data.mood}
                className="mb-10"
              /> */}

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
            </Column>
          </FadeIn>
        </Column>
        <Column span={6} className="z-10 min-h-[684px]">
          <FadeIn
            className="animate-in translate-y-16 opacity-0 will-change-transform"
            vars={{ duration: 2, delay: 0.4 }}
          >
            <div className="inset-0 z-0">
              <PrismicNextImage
                field={fragrance.data.featured_image}
                className="aspect-square min-h-[684px] w-full rounded-lg object-cover"
              />
            </div>
          </FadeIn>
        </Column>
      </Grid>
    );
  } else {
    // Index 1, 3, 5... - Big image on left, card on right
    return (
      <Grid className="mb-40">
        <Column span={6} className="z-10 min-h-[684px]">
          <FadeIn
            className="animate-in translate-y-16 opacity-0 will-change-transform"
            vars={{ duration: 2, delay: 0.4 }}
          >
            <div className="inset-0 z-0">
              <PrismicNextImage
                field={fragrance.data.featured_image}
                className="aspect-square min-h-[684px] w-full rounded-lg object-cover"
              />
            </div>
          </FadeIn>
        </Column>
        <Column span={6} className="prod-card flex items-center justify-center">
          <FadeIn
            className="animate-in translate-y-16 opacity-0 will-change-transform"
            vars={{ duration: 1, delay: 1.1 }}
          >
            <Column
              span={3}
              className="mx-auto max-w-[454px] rounded-lg p-4 text-black"
            >
              <PrismicNextImage
                field={fragrance.data.bottle_image}
                className="rounded-lg"
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

              {/* <Attributes
                scent_profile={fragrance.data.scent_profile}
                mood={fragrance.data.mood}
                className="mb-10"
              /> */}

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
            </Column>
          </FadeIn>
        </Column>
      </Grid>
    );
  }
};
