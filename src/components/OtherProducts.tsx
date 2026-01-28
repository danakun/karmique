import { createClient } from "@/prismicio";
import Container from "./Container";
import Column from "./Column";
import Grid from "./Grid";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { formatPrice } from "@/utils/formatters";
import { TransitionLink } from "./TransitionLink";

type OtherProductsProps = {
  currentFragranceUID: string;
};

export const OtherProducts = async ({
  currentFragranceUID,
}: OtherProductsProps) => {
  const client = createClient();
  const allProducts = await client.getAllByType("fragrance");

  const otherProducts = allProducts.filter(
    (product) => product.uid !== currentFragranceUID,
  );
  return (
    <Container as="section">
      <Grid gap="lg">
        <Column span={12} className="mt-40">
          <h2 className="font-decorative line-height-1 mt-6 mb-10 text-3xl leading-0.5 text-black md:mb-20 lg:text-6xl 2xl:mt-12">
            You may also like
          </h2>
        </Column>
        {otherProducts.map((product) => (
          <Column key={product.uid} span={3} spanMd={4} spanSm={4}>
            <TransitionLink document={product} className="group">
              <div className="relative w-full transition-transform duration-500 group-hover:scale-105">
                <PrismicNextImage
                  field={product.data.bottle_image}
                  width={600}
                  height={600}
                  className="relative aspect-[4/3] h-auto w-full rounded-lg object-cover lg:aspect-[3/4]"
                />
              </div>

              <div className="mt-4 mb-8">
                <h3 className="h3">
                  <PrismicText field={product.data.title} />
                </h3>
                <p className="mt-2">Human Design Fragrance</p>
                <p className="text-large">{formatPrice(product.data.price)}</p>
              </div>
            </TransitionLink>
          </Column>
        ))}
      </Grid>
    </Container>
  );
};
