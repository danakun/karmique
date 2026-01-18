import { TransitionLink } from "../components/TransitionLink";

export default function NotFound() {
  return (
    <div className="glow-background flex min-h-screen flex-col">
      {/* Your existing navbar component */}
      {/* <NavBar /> */}

      {/* Main 404 Content */}
      <main className="flex flex-1 items-start justify-center">
        <div className="container text-center">
          <div className="mx-auto max-w-6xl">
            {/* Large 404 Display */}
            <div className="brand-container">
              <h1 className="not-found decorative mb-4 text-black/20">404</h1>
            </div>

            {/* Error Message */}
            <div className="mx-auto mb-8 max-w-2xl px-12">
              <p className="eyebrow mb-4 text-stone-500">Page Not Found</p>
              <h2 className="h2 mb-6">
                The page you&apos;re looking for doesn&apos;t exist
              </h2>
              <p className="body mb-8">
                It seems you&apos;ve wandered into uncharted territory. Let us
                guide you back to something beautiful.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <TransitionLink href="/" className="btn btn-primary">
                  Return Home
                </TransitionLink>
                <TransitionLink
                  href="/collections"
                  className="btn btn-tertiary"
                >
                  Explore Collections
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
