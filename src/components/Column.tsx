/* eslint-disable @typescript-eslint/no-unused-vars */
// components/layout/Column.tsx
import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type ColumnProps = {
  className?: string;
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanSm?: 1 | 2 | 3 | 4;
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  end?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      className,
      children,
      span = 12,
      spanSm,
      spanMd,
      spanLg,
      start,
      end,
      ...restProps
    },
    ref,
  ) => {
    // Use your custom CSS classes instead of Tailwind classes
    const getSpanClass = (spanValue: number) => `col-${spanValue}`;

    // For responsive spans, you'd need to add these to your CSS
    // const getResponsiveSpanClass = (spanValue: number, breakpoint: string) =>
    //   `${breakpoint}:col-${spanValue}`;

    return (
      <div
        ref={ref}
        className={clsx(
          // Base span using your CSS classes
          getSpanClass(span),
          // You can add responsive classes later if needed
          className,
        )}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

Column.displayName = "Column";
export default Column;
