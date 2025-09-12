import clsx from "clsx";
import { TransitionLink, TransitionLinkProps } from "../TransitionLink";

export type ButtonLinkProps = TransitionLinkProps & {
  variant?: "Primary" | "Secondary" | "Tertiary" | "Link";
  className?: string;
};

export const ButtonLink = ({
  className,
  variant = "Primary",
  ...restProps
}: ButtonLinkProps) => {
  return (
    <TransitionLink
      className={clsx(
        "btn",
        variant === "Primary" && "btn-primary",
        variant === "Secondary" && "btn-secondary",
        variant === "Tertiary" && "btn-tertiary",
        variant === "Link" && "btn-link",
        className,
      )}
      {...restProps}
    />
  );
};
