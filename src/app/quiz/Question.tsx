"use client";

import { Fragment, useState } from "react";
import clsx from "clsx";
import { Content, ImageField } from "@prismicio/client";
import { AnswerOption, FragranceType } from "./types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(useGSAP);

type QuestionProps = {
  question: Content.QuizDocumentDataQuestionsItem;
  questionNumber: number;
  totalQuestions: number;
  onAnswerSelected: (fragranceType: FragranceType) => void;
  onBack: () => void;
};

export const Question = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswerSelected,
  onBack,
}: QuestionProps) => {
  const [answers, setAnswers] = useState<AnswerOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<FragranceType | null>(
    null,
  );

  useGSAP(() => {
    setSelectedOption(null);

    gsap.set(".answer-option", {
      clarProps: "all",
      opacity: 1,
      scale: 1,
    });

    const answerOptions: AnswerOption[] = [
      { text: question.answer_electra, value: "electra" },
      { text: question.answer_luminara, value: "luminara" },
      { text: question.answer_oracle, value: "oracle" },
      { text: question.answer_reign, value: "reign" },
      { text: question.answer_stargazer, value: "stargazer" },
    ];

    gsap.to(".question-content", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    setAnswers(gsap.utils.shuffle(answerOptions));
  }, [question]);

  const getImageField = () => (fragranceType: FragranceType) => {
    switch (fragranceType) {
      case "electra":
        return question.image_electra;
      case "luminara":
        return question.image_luminara;
      case "oracle":
        return question.image_oracle;
      case "reign":
        return question.image_reign;
      case "stargazer":
        return question.image_stargazer;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (selectedOption) {
      gsap.to(".question-content", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          onAnswerSelected(selectedOption);
        },
      });
    }
  };

  const handleBack = () => {
    gsap.to(".question-content", {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        onBack();
      },
    });
  };

  const handleselectAnswer = (answer: FragranceType) => {
    gsap.set(".answer-option", {
      clarProps: "all",
      opacity: 1,
      scale: 1,
    });

    const tl = gsap.timeline({
      onStart: () => {
        setSelectedOption(answer);
      },
    });

    tl.to(".answer-option", {
      opacity: 0.5,
      scale: 1,
      duration: 0.2,
      ease: "power1.out",
    }).to(`.answer-${answer}`, {
      opacity: 1,
      scale: 1.05,
      duration: 0.25,
      ease: "back.out(1.2)",
    });
  };

  return (
    <div className="mx-auto max-w-4xl py-12 text-center">
      {/* Step Counter */}
      <div className="mx-auto mb-10 flex w-full max-w-md items-center">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <Fragment key={index}>
            <div
              className={clsx(
                "realtive border-grey-400 flex size-12 items-center justify-center rounded-full border text-xl transition-all duration-1000",
                index + 1 < questionNumber &&
                  "bg-neutral-150 scale-100 text-neutral-950",
                index + 1 === questionNumber &&
                  "scale-110 bg-neutral-600 text-neutral-50",
                index + 1 > questionNumber &&
                  "scale-100 bg-neutral-50 text-neutral-950",
              )}
            >
              {index + 1}
            </div>
            <div className="h-px w-full flex-1 bg-neutral-400 last:hidden"></div>
          </Fragment>
        ))}
      </div>

      <div className="question-content translate-y-2.5 opacity-0">
        <div className="mb-14">
          <p className="mb-3 tracking-widest uppercase">
            Step {questionNumber} of {totalQuestions}
          </p>
          <h2 className="text-3xl md:text-4xl">
            {question.question_text || "Question"}
          </h2>
        </div>
        <fieldset className="mb-12">
          <legend className="sr-only">
            {question.question_text || "Select an option"}
          </legend>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-5 md:gap-6">
            {answers.map((answer, index) => (
              <Answer
                key={answer.value}
                imageField={getImageField()(answer.value)}
                value={answer.value}
                question={answer.text || ""}
                index={index}
                checked={selectedOption === answer.value}
                onClick={() => handleselectAnswer(answer.value)}
              />
            ))}
          </div>
        </fieldset>
        <div className="mx-auto flex max-w-md items-center justify-between">
          <button onClick={handleBack} className="btn btn-primary">
            Back
          </button>
          <button
            onClick={handleNext}
            className="btn btn-tertiary"
            disabled={!selectedOption}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

type AnswerProps = {
  imageField: ImageField | null;
  value: FragranceType;
  question: string;
  index: number;
  checked?: boolean;
  onClick?: () => void;
};

const Answer = ({
  imageField,
  value,
  question,
  index,
  checked,
  onClick,
}: AnswerProps) => {
  const optionId = `option-${value}-${index}`;
  return (
    <div className="relative">
      <input
        type="radio"
        id={optionId}
        name="fragrance-option"
        value={value}
        checked={checked}
        onChange={onClick}
        className="peer absolute h-0 w-0 opacity-0"
      />
      <label
        htmlFor={optionId}
        className={clsx(
          "answer-option peer block h-full cursor-pointer border p-3 transition-all duration-300 peer-focus:ring-2 peer-focus:ring-black peer-focus:ring-offset-1 peer-focus:ring-offset-black hover:border-neutral-950 sm:p-4",
          checked ? "border-neutral-950" : "border-neutral-400",
          `answer-${value}`,
        )}
      >
        <div className="sm:mb relative mx-auto mb-2 aspect-square w-full max-w-32 sm:mb-3 sm:max-w-44 md:max-w-none">
          <PrismicNextImage
            field={imageField}
            width={200}
            height={200}
            className="h-full w-full object-cover"
            fallback={
              <div
                className={clsx(
                  "h-full w-full",
                  value === "oracle" && "bg-lime-400]",
                  value === "reign" && "bg-amber-400]",
                  value === "stargazer" && "bg-cyan-400]",
                  value === "luminara" && "bg-rose-400]",
                  value === "electra" && "bg-fuchsia-400]",
                )}
              ></div>
            }
          ></PrismicNextImage>
        </div>
        <p className="text-balance">{question}</p>
      </label>
    </div>
  );
};
