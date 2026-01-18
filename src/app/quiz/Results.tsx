"use client";

import { asText, Content } from "@prismicio/client";
import { FragranceType, Vote, Winner } from "./types";
import { FadeIn } from "@/components/FadeIn";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { ButtonLink } from "@/components/ButtonLink/ButtonLink";
import { formatPrice } from "@/utils/formatters";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type ResultProps = {
  votes: Vote;
  fragrances: Content.FragranceDocument[];
  onRetake: () => void;
};

export const Results = ({ votes, fragrances, onRetake }: ResultProps) => {
  useGSAP(() => {
    gsap.set(".bottle-image", {
      filter: "brightness(0) blur(10px)",
      // opacity: 1,
    });
    const tl = gsap.timeline();
    tl.to(
      ".result-item",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.5,
      },
      "-=0.4",
    ).to(
      ".bottle-image",
      {
        duration: 1.7,
        filter: "brightness(1) blur(0px)",
        ease: "sine.ine",
      },
      "-=0.8",
    );
  }, []);

  const handleRetake = () => {
    gsap.to(".result-container", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        onRetake();
      },
    });
  };
  const determineWinners = (
    votes: Vote,
    fragrances: Content.FragranceDocument[],
  ): Winner[] => {
    const maxVotes = Math.max(
      votes.Electra,
      votes.Luminara,
      votes.Oracle,
      votes.Reign,
      votes.Stargazer,
    );
    const winningTypes: FragranceType[] = [];

    if (votes.Electra === maxVotes) {
      winningTypes.push("electra");
    }
    if (votes.Luminara === maxVotes) {
      winningTypes.push("luminara");
    }
    if (votes.Oracle === maxVotes) {
      winningTypes.push("oracle");
    }
    if (votes.Reign === maxVotes) {
      winningTypes.push("reign");
    }
    if (votes.Stargazer === maxVotes) {
      winningTypes.push("stargazer");
    }

    return winningTypes.slice(0, 2).map((fragranceType) => {
      const fragrance = fragrances.find((f) =>
        asText(f.data.title)
          ?.toLowerCase()
          .includes(fragranceType.toLowerCase()),
      );

      return {
        fragranceType,
        title: asText(fragrance?.data.title) || fragranceType,
        uid: fragrance?.uid,
      };
    });
  };

  const winners = determineWinners(votes, fragrances);

  return (
    <FadeIn
      className="result-container mx-auto translate-y-5 py-12 text-center opacity-0"
      vars={{ duration: 0.8 }}
    >
      <div className="mb-10">
        <p className="eyebrow mb-3 tracking-wider">Results</p>
        <h2 className="h2 mb-4">Your Personalized Reccomendation</h2>
        <p className="text-large mx-auto mb-3 max-w-2xl text-balance">
          A unique selection of fragrances that are most suited to your personal
          taste.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap justify-center">
        {winners.map((winner, index) => {
          const fragrance = fragrances.find(
            (f) => asText(f.data.title) === winner.title,
          );
          if (!fragrance) return null;

          const formattedPrice = formatPrice(fragrance.data.price);

          return (
            <div
              className="result-item group mb-3 max-w-md translate-y-5 text-center opacity-0"
              key={index}
            >
              <div className="p-6">
                <div className="mt-40 grid transition-colors duration-700">
                  <PrismicNextImage
                    field={fragrance.data.bottle_image}
                    className="bottle-image translation-all f-rotate-12 -mt-40 max-w-75 rounded-xl opacity-100 blur-md duration-700 group-hover:scale-110 group-hover:rotate-0 group-hover:brightness-125"
                    priority
                    imgixParams={{
                      dpr: 2,
                      w: 400,
                      h: 400,
                    }}
                  />
                  <div className="mt-20 mb-5 flex w-full flex-row justify-between">
                    <h3 className="text-2xl font-bold">
                      <PrismicText field={fragrance.data.title} />
                    </h3>
                    <p aria-label="ProductPrice">
                      <span className="text-2xl font-bold">
                        {formattedPrice}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <ButtonLink
                    document={fragrance}
                    variant="Tertiary"
                    className="flex-1"
                  >
                    Discover
                  </ButtonLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={handleRetake} className="btn btn-primary mt-10">
        Retake the quiz
      </button>
    </FadeIn>
  );
};
