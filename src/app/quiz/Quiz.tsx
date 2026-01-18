"use client";

import { asImageSrc, Content, ImageField } from "@prismicio/client";
import { StartScreen } from "./StartScreen";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Question } from "./Question";
import { FragranceType, Vote, Votes } from "./types";
import { Results } from "./Results";

type QuizProps = {
  quizData: Content.QuizDocument;
  fragrances: Content.FragranceDocument[];
};

type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export const Quiz = ({ quizData, fragrances }: QuizProps) => {
  const startScreenRef = useRef<HTMLDivElement>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("NOT_STARTED");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizData.data.questions[currentQuestionIndex];
  const [votes, setVotes] = useState<Votes>([]);

  const start = () => {
    if (!startScreenRef.current) return;
    gsap.to(startScreenRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => setQuizStatus("IN_PROGRESS"),
    });
  };

  const addVote = (fragranceType: FragranceType) => {
    const newVote: Vote = {
      Stargazer: fragranceType === "stargazer" ? 1 : 0,
      Luminara: fragranceType === "luminara" ? 1 : 0,
      Electra: fragranceType === "electra" ? 1 : 0,
      Reign: fragranceType === "reign" ? 1 : 0,
      Oracle: fragranceType === "oracle" ? 1 : 0,
    };
    setVotes((prev) => {
      const newVotes = [...prev];
      newVotes[currentQuestionIndex] = newVote;
      return newVotes;
    });
    // Go to next question
    if (currentQuestionIndex === quizData.data.questions.length - 1) {
      setQuizStatus("COMPLETED");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const back = () => {
    if (currentQuestionIndex > 0) {
      setVotes((prev) => {
        const newVotes = [...prev];
        newVotes.pop();
        return newVotes;
      });
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setQuizStatus("NOT_STARTED");
    }
  };

  const reset = () => {
    setCurrentQuestionIndex(0);
    setVotes([]);
    setQuizStatus("NOT_STARTED");
  };

  const totalVotes: Vote = votes.reduce(
    (acc, vote) => ({
      Stargazer: acc.Stargazer + vote.Stargazer,
      Luminara: acc.Luminara + vote.Luminara,
      Electra: acc.Electra + vote.Electra,
      Reign: acc.Reign + vote.Reign,
      Oracle: acc.Oracle + vote.Oracle,
    }),
    {
      Stargazer: 0,
      Luminara: 0,
      Electra: 0,
      Reign: 0,
      Oracle: 0,
    },
  );

  // preload the quiz images
  // preload the quiz images
  useEffect(() => {
    const preloadImage = (imageField: ImageField | null | undefined) => {
      if (!imageField) return;

      const src = asImageSrc(imageField, {
        fit: "max",
        w: 640,
      });

      if (src) {
        const img = new Image();
        img.src = src;
      }
    };

    quizData.data.questions.forEach((question) => {
      preloadImage(question.image_electra);
      preloadImage(question.image_luminara);
      preloadImage(question.image_oracle);
      preloadImage(question.image_reign);
      preloadImage(question.image_stargazer);
    });
  }, [quizData.data.questions]);

  return (
    <div className="glow-background min-h-[90%] w-full lg:min-h-screen">
      {quizStatus === "NOT_STARTED" && (
        <div ref={startScreenRef} className="div">
          <StartScreen quizData={quizData} onStart={start} />
        </div>
      )}
      {quizStatus === "IN_PROGRESS" && (
        <Question
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizData.data.questions.length}
          onAnswerSelected={addVote}
          onBack={back}
        />
      )}
      {quizStatus === "COMPLETED" && (
        <Results fragrances={fragrances} votes={totalVotes} onRetake={reset} />
      )}
    </div>
  );
};
