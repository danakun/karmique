import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type ColumnProps = {
  className?: string;
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  spanSm?: 1 | 2 | 3 | 4;
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, span = 12, spanSm, spanMd, ...restProps }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          // Mobile: use spanSm if provided, otherwise use span (will be clamped by 4-col grid)
          spanSm ? `col-span-${spanSm}` : `col-span-${span}`,
          // Tablet: use spanMd if provided, otherwise use span (will be clamped by 8-col grid)
          spanMd ? `md:col-span-${spanMd}` : `md:col-span-${span}`,
          // Desktop: always use span
          `lg:col-span-${span}`,
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
