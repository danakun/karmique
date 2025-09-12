import SubscribeForm from "./SubscribeForm";
import Column from "./Column";
import Grid from "./Grid";
import { TransitionLink } from "./TransitionLink";

export default function Footer() {
  return (
    <footer className="bg-white pt-44 pb-6 xl:pt-40">
      <Grid className="px-5">
        <Column span={3} className="pt-5">
          {/* About Section */}
          <div className="flex flex-col space-y-6">
            <h3 className="h4">About</h3>
            <nav
              className="flex flex-col items-start space-y-4"
              aria-label="About links"
            >
              <TransitionLink href="/collection" className="nav-link text-base">
                Collection
              </TransitionLink>
              <TransitionLink
                href="/human-design"
                className="nav-link text-base"
              >
                Human Design
              </TransitionLink>
              <TransitionLink href="/brand" className="nav-link text-base">
                Karmique brand
              </TransitionLink>
            </nav>
          </div>
        </Column>
        <Column span={3} className="pt-5">
          {/* Shop Section */}
          <div className="flex flex-col space-y-6">
            <h3 className="h4">Shop</h3>
            <nav
              className="flex flex-col items-start space-y-4"
              aria-label="Shop by type"
            >
              <TransitionLink
                href="/fragrance/empire"
                className="nav-link text-base"
              >
                Generator
              </TransitionLink>
              <TransitionLink
                href="/fragrance/radiance"
                className="nav-link text-base"
              >
                Manifestor
              </TransitionLink>
              <TransitionLink
                href="/fragrance/electra"
                className="nav-link text-base"
              >
                Mani-gen
              </TransitionLink>
              <TransitionLink
                href="/fragrance/oracle"
                className="nav-link text-base"
              >
                Projector
              </TransitionLink>
              <TransitionLink
                href="/fragrance/stargazer"
                className="nav-link text-base"
              >
                Reflector
              </TransitionLink>
            </nav>
          </div>
        </Column>

        <Column span={3} className="pt-5">
          {/* Social Section */}
          <div className="flex flex-col space-y-6">
            <h3 className="h4">Social</h3>
            <nav
              className="flex flex-col items-start space-y-4"
              aria-label="Social media links"
            >
              <a
                href="https://instagram.com/karmique"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-base"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@karmique"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-base"
              >
                TikTok
              </a>
              <a
                href="https://pinterest.com/karmique"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-base"
              >
                Pinterest
              </a>
            </nav>
          </div>
        </Column>
        <Column span={3} className="pt-5">
          <SubscribeForm />
        </Column>
      </Grid>

      {/* Large Brand Name */}
      <div className="brand-container mt-16 px-5 text-start">
        <span className="brand-hero-text leading-none font-bold text-black">
          KARMIQUE
        </span>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col items-center justify-between border-t border-gray-100 pt-8 md:flex-row">
        <p className="text-small text-black">All rights reserved by Dana Kun</p>
        <p className="text-small text-black">2025 Karmique ™</p>
      </div>
    </footer>
  );
}
