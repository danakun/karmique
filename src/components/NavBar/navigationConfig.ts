import { Content } from "@prismicio/client";

export interface NavigationLink {
  href: string;
  label: string;
}

export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

export interface FeaturedLink {
  href: string;
  image: string;
  alt: string;
  title: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createNavigationConfig = (settings?: Content.SettingsDocument) => {
  return {
    mainLinks: [
      { href: "/quiz", label: "Quiz" },
      { href: "/brand", label: "Brand" },
      { href: "/account", label: "Account" },
      { href: "/bag", label: "Bag (0)" },
    ],

    collectionsDropdown: {
      sections: [
        {
          title: "Shop by Type",
          links: [
            { href: "/fragrance/stargazer", label: "Generator" },
            { href: "/fragrance/radiance", label: "Manifestor" },
            { href: "/fragrance/electra", label: "Mani-gen" },
            { href: "/fragrance/empire", label: "Projector" },
            { href: "/fragrance/oracle", label: "Reflector" },
          ],
        },
        {
          title: "Categories",
          links: [
            { href: "/collection", label: "Full Collection" },
            { href: "/collections/bestsellers", label: "Bestsellers" },
            { href: "/collections/new-arrivals", label: "New Arrivals" },
            { href: "/collections/kits", label: "Kits" },
          ],
        },
        {
          title: "Special",
          links: [
            { href: "/gift-cards", label: "Gift Cards" },
            { href: "/sale", label: "Sale" },
          ],
        },
      ] as NavigationSection[],

      featuredLinks: [
        {
          href: "/collection",
          image: "/image-a.png",
          alt: "Collection",
          title: "Collection",
        },
        {
          href: "/brand",
          image: "/image-b.png",
          alt: "Brand",
          title: "Brand",
        },
      ] as FeaturedLink[],
    },
  };
};
