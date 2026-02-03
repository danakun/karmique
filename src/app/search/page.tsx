import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import Container from "@/components/Container";
import Grid from "@/components/Grid";
import Column from "@/components/Column";
import { ItemDisplay } from "@/slices/ListSection/ItemDisplay";
import { matchFragrances } from "@/utils/fragranceMatch";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const client = createClient();
  const { q } = await searchParams;
  const query = q || "";

  let fragrances: Content.FragranceDocument[] = [];

  if (query) {
    try {
      // Get all fragrances
      const allFragrances = await client.getAllByType("fragrance");

      // Use smart matching algorithm
      fragrances = matchFragrances(query, allFragrances);
    } catch (error) {
      console.error("Search error:", error);
      fragrances = [];
    }
  }

  return (
    <Container as="main" className="pt-24 pb-40">
      <Grid>
        <Column span={12} className="my-12">
          <h1 className="h2 mb-4">
            {query ? `Search results for "${query}"` : "Search"}
          </h1>
          {query && (
            <p className="text-large text-medium-grey">
              {fragrances.length}{" "}
              {fragrances.length === 1 ? "result" : "results"} found
            </p>
          )}
        </Column>
      </Grid>

      {fragrances.length > 0 ? (
        fragrances.map((fragrance, index) => (
          <ItemDisplay key={fragrance.id} id={fragrance.id} index={index} />
        ))
      ) : query ? (
        <Grid>
          <Column span={12} className="py-20 text-center">
            <p className="text-large">
              No fragrances found matching &quot;{query}&quot;
            </p>
            <p className="text-medium-grey mt-4">
              Try searching by fragrance name, scent notes (floral, citrus,
              woody), mood (energetic, calm, mysterious), or Human Design type
              (generator, projector, etc.)
            </p>
          </Column>
        </Grid>
      ) : null}
    </Container>
  );
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";

  return {
    title: query ? `Search: ${query} | Karmique` : "Search | Karmique",
  };
}
