// app/layout.tsx - Add modal to layout
import type { Metadata } from "next";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { Rethink_Sans, Radley } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/NavBar/NavBar";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { ViewTransitions } from "next-view-transitions";
import SimpleModal from "@/components/SimpleModal/SimpleModal";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const radley = Radley({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-radley",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "Côte Royale Paris",
    description:
      settings.data.meta_description ||
      "Discover the exquisite collection of luxury fragrances by Côte Royale Paris",
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ["/og-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${rethinkSans.variable} ${radley.variable} antialiased`}
      >
        <body>
          <NavBar settings={settings} />
          <main className="pt-14">
            {children}
            <Footer />
          </main>
          <SimpleModal />
        </body>
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    </ViewTransitions>
  );
}
