import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type GridProps = {
  className?: string;
  children: ReactNode;
  gap?: "sm" | "md" | "lg" | "xl";
  cols?: "auto" | 4 | 6 | 8 | 12;
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, gap = "md", cols = 12, ...restProps }, ref) => {
    const gapClasses = {
      sm: "gap-2", // 8px
      md: "gap-5", // 20px default
      lg: "gap-8", // 32px
      xl: "gap-12", // 48px
    };

    const colClasses = {
      auto: "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]",
      4: "grid-cols-4",
      6: "grid-cols-6",
      8: "grid-cols-8",
      12: "grid-cols-12", // Default
    };

    return (
      <div
        ref={ref}
        className={clsx("grid", colClasses[cols], gapClasses[gap], className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = "Grid";

export default Grid;
