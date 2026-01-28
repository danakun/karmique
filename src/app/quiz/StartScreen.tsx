"use client";

import { FadeIn } from "@/components/FadeIn";
import { RevealText } from "@/components/RevealText";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

type StartScreenProps = {
  quizData: Content.QuizDocument;
  onStart: () => void;
};

export const StartScreen = ({ quizData, onStart }: StartScreenProps) => {
  return (
    <div className="mx-auto px-6 py-28 text-center md:px-16 lg:px-32 2xl:px-40">
      <FadeIn vars={{ delay: 0, duration: 1.2 }} className="translate-y-8">
        <p className="eyebrow mb-4">{quizData.data.eyebrow}</p>
      </FadeIn>
      <RevealText
        align="center"
        id="quiz-title"
        field={quizData.data.title}
        className="h1 py-8 leading-[0.9]"
      />
      <FadeIn
        vars={{ delay: 0.5, duration: 2 }}
        className="mb-4 px-8 md:px-32 lg:mb-8 lg:px-34 xl:px-48 2xl:px-60"
      >
        <PrismicRichText field={quizData.data.body}></PrismicRichText>
      </FadeIn>
      <FadeIn
        start="top 95%"
        vars={{
          delay: 0.8,
          duration: 0.8,
          ease: "power2.out",
        }}
        className="pt-12 2xl:pt-12"
      >
        <button onClick={onStart} className="btn btn-tertiary">
          {quizData.data.start_button_text || "Start the quiz"}
        </button>
      </FadeIn>
    </div>
  );
};
