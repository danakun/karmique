// components/layout/Section.tsx
import { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";

type SectionProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "white" | "pink" | "grey" | "black";
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Comp = "section",
      className,
      children,
      spacing = "md",
      background = "white",
      ...restProps
    },
    ref,
  ) => {
    const spacingClasses = {
      none: "",
      sm: "py-12", // 48px
      md: "py-20", // 80px
      lg: "py-24", // 96px
      xl: "py-30", // 120px
    };

    const backgroundClasses = {
      white: "bg-white",
      pink: "bg-pink",
      grey: "bg-grey",
      black: "bg-black text-white",
    };

    return (
      <Comp
        ref={ref}
        className={clsx(
          spacingClasses[spacing],
          backgroundClasses[background],
          className,
        )}
        {...restProps}
      >
        {children}
      </Comp>
    );
  },
);

Section.displayName = "Section";

export default Section;
