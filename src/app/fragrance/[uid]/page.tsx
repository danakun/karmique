import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicRichText, PrismicText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { asText } from "@prismicio/client/richtext";
import Container from "@/components/Container";
import Grid from "@/components/Grid";
import Column from "@/components/Column";
import { Types } from "@/components/Types";
import { Attributes } from "@/components/Attributes";
import { formatPrice } from "@/utils/formatters";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { ProductAccordion } from "@/components/ProductAccordeon";
import { ProductGallery } from "@/components/ProductGallery";
import { OtherProducts } from "@/components/OtherProducts";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("fragrance", uid).catch(() => notFound());
  const formattedPrice = formatPrice(page?.data.price);

  return (
    //<SliceZone slices={page.data.slices} components={components} />
    <Container>
      <Grid className="pt-6 lg:pt-20">
        <Column
          span={6}
          className="relative mb-6 flex justify-center md:mb-14 md:pb-10"
        >
          <div className="relative w-full lg:w-2/3">
            {" "}
            {/* This makes it take 50% width (3/6 columns) */}
            {/* <PrismicNextImage
              field={page.data.bottle_image}
              priority
              className="absolute top-[90%] aspect-[3/4] -scale-y-100 rounded-lg [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0)_70%,rgba(0,0,0,.30)_100%)] object-cover"
            />
            <PrismicNextImage
              field={page.data.bottle_image}
              priority
              className="relative aspect-[3/4] h-auto w-full rounded-lg object-cover"
            /> */}
            <ProductGallery
              mainImage={page.data.bottle_image}
              additionalImages={[
                page.data.featured_image,
                page.data.gallery_image_one,
                page.data.gallery_image_two,
              ].filter(Boolean)}
            />
          </div>
        </Column>
        <Column span={6}>
          <div className="relative w-full lg:w-2/3">
            <h1 className="h1 border-b border-black/50 pb-4">
              <PrismicText field={page.data.title} fallback="Fragrance" />
            </h1>
            <div className="---border-b border-black/70 pt-4">
              <Types
                energy_type={page.data.energy_type}
                className="h4 mt-4 mb-5 font-semibold text-black"
              />
              <PrismicRichText field={page.data.description} />
              <Attributes
                scent_profile={page.data.scent_profile}
                mood={page.data.mood}
                className="h4 mt-4 mb-8 text-black"
              />
              <p aria-label="ProductPrice">
                <span className="text-2xl font-bold">{formattedPrice}</span>
              </p>
              <ButtonLink
                href="#"
                variant="Tertiary"
                className="my-5 w-full flex-1"
              >
                <span>Add to bag</span>
              </ButtonLink>

              <ButtonLink
                variant="Link"
                href="#"
                className="text-[14px] text-black/30"
              >
                <span className="text-[12px] font-light text-black/30">
                  Shipping and Returns
                </span>
              </ButtonLink>
              {/* Product Accordion */}
              <ProductAccordion className="mt-4" />
            </div>
          </div>
        </Column>
        <Column span={12}>
          <OtherProducts currentFragranceUID={uid} />
        </Column>
      </Grid>
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("fragrance", uid).catch(() => notFound());
  const settings = await client.getSingle("settings");

  return {
    title: asText(page.data.title) + " | " + settings.data.site_title,
    description: `Discover ${asText(page.data.title)}, the only fragrance based on Human Design.`,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("fragrance");

  return pages.map((page) => ({ uid: page.uid }));
}
