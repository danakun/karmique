import { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  variant?: "default" | "full" | "content";
  size?: "default" | "narrow" | "wide";
};

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      as: Comp = "section",
      className,
      children,
      variant = "default",
      size = "default",
      ...restProps
    },
    ref,
  ) => {
    // Base container classes based on variant
    const containerClasses = {
      default: "container", // max-width + margins
      full: "container-full", // full width, no margins
      content: "container-content", // max-width + margins (for use inside full)
    };

    // Size variations for max-width
    const sizeClasses = {
      default: "", // Uses CSS variable --container-max (1400px)
      narrow: "max-w-4xl", // 896px for text-heavy content
      wide: "max-w-screen-2xl", // 1536px for wider layouts
    };

    return (
      <Comp
        ref={ref}
        className={clsx(
          containerClasses[variant],
          variant !== "full" && sizeClasses[size], // Only apply size to non-full variants
          "section", // Adds bottom margin spacing
          "[.nav+&]:pt-8", // Spacing after nav
          "[.hero+&]:pt-16", // Spacing after hero
          className,
        )}
        {...restProps}
      >
        {variant === "full" ? (
          // For full-width, wrap children in content container
          <div className={clsx("container-content", sizeClasses[size])}>
            {children}
          </div>
        ) : (
          // For default/content, children go directly inside
          children
        )}
      </Comp>
    );
  },
);

Container.displayName = "Container";

export default Container;
