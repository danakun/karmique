import SubscribeForm from "./SubscribeForm";
import Column from "./Column";
import Grid from "./Grid";
import { TransitionLink } from "./TransitionLink";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-6 lg:pt-44 xl:pt-40">
      <div className="px-5">
        <div className="divider border-b border-black/50"></div>
      </div>
      <Grid className="px-5">
        <Column span={3} spanMd={2} spanSm={2} className="pt-5 pb-7">
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
              <TransitionLink href="/quiz" className="nav-link text-base">
                Quiz
              </TransitionLink>
            </nav>
          </div>
        </Column>
        <Column span={3} spanMd={2} spanSm={2} className="pt-5 pb-7">
          {/* Shop Section */}
          <div className="flex flex-col space-y-6">
            <h3 className="h4">Shop</h3>
            <nav
              className="flex flex-col items-start space-y-4"
              aria-label="Shop by type"
            >
              <TransitionLink
                href="/fragrance/reign"
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

        <Column span={3} spanMd={2} spanSm={2} className="pt-5 pb-7">
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
        <Column span={3} spanMd={2} spanSm={4} className="pt-5 pb-7">
          <SubscribeForm />
        </Column>
      </Grid>

      {/* Large Brand Name */}
      <div className="brand-container mt-16 px-5">
        <span className="brand-hero-text leading-none font-bold text-black">
          KARMIQUE
        </span>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col items-center justify-between border-t border-gray-100 px-5 pt-8 md:flex-row">
        <p className="text-small text-black">All rights reserved by Dana Kun</p>
        <p className="text-small text-black">2025 Karmique Barcelona™</p>
      </div>
    </footer>
  );
}
