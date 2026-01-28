// import { ReactNode, forwardRef } from "react";
// import clsx from "clsx";

// type GridProps = {
//   className?: string;
//   children: ReactNode;
//   gap?: "sm" | "md" | "lg" | "xl";
// };

// export const Grid = forwardRef<HTMLDivElement, GridProps>(
//   ({ className, children, gap = "md", ...restProps }, ref) => {
//     const gapClasses = {
//       sm: "gap-2",
//       md: "gap-5",
//       lg: "gap-8",
//       xl: "gap-12",
//     };

//     return (
//       <div
//         ref={ref}
//         className={clsx(
//           "grid",
//           "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
//           gapClasses[gap],
//           className,
//         )}
//         {...restProps}
//       >
//         {children}
//       </div>
//     );
//   },
// );

// Grid.displayName = "Grid";
// export default Grid;

import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type GridProps = {
  className?: string;
  children: ReactNode;
  gap?: "sm" | "md" | "lg" | "xl";
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, gap = "md", ...restProps }, ref) => {
    const gapClasses = {
      sm: "gap-1.5 md:gap-2",
      md: "gap-3 md:gap-5",
      lg: "gap-5 md:gap-8",
      xl: "gap-8 md:gap-12",
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "grid",
          "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
          gapClasses[gap],
          className,
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = "Grid";
export default Grid;
