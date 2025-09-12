import { asLink, LinkField, PrismicDocument } from "@prismicio/client";
import { Link } from "next-view-transitions";

export type TransitionLinkProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
} & (
  | { field: LinkField | null; document?: never; href?: never }
  | { field?: never; document: PrismicDocument | null; href?: never }
  | { field?: never; document?: never; href: string }
);

// Type guard to check if field has type property
function hasType(field: LinkField): field is LinkField & { type: string } {
  return "type" in field && typeof field.type === "string";
}

export const TransitionLink = ({
  field,
  document: doc,
  href,
  children,
  className,
  onClick,
  tabIndex,
}: TransitionLinkProps) => {
  let url = href ?? asLink(field ?? doc);

  // Fallback for singleton documents without proper URL configuration
  if (!url && field && hasType(field)) {
    if (field.type === "brand") {
      url = "/brand";
    } else if (field.type === "quiz") {
      url = "/quiz";
    } else {
      // Generic fallback for other document types
      url = `/${field.type}`;
    }
  }

  if (!url) {
    console.warn("TransitionLink: No URL Found");
    return null;
  }

  return (
    <Link
      href={url}
      className={className}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      {field?.text ?? children}
    </Link>
  );
};
// import { asLink, LinkField, PrismicDocument } from "@prismicio/client";
// import { Link } from "next-view-transitions";

// export type TransitionLinkProps = {
//   children?: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
//   tabIndex?: number;
// } & (
//   | { field: LinkField | null; document?: never; href?: never }
//   | { field?: never; document: PrismicDocument | null; href?: never }
//   | { field?: never; document?: never; href: string }
// );

// export const TransitionLink = ({
//   field,
//   document: doc,
//   href,
//   children,
//   className,
//   onClick,
//   tabIndex,
// }: TransitionLinkProps) => {
//   let url = href ?? asLink(field ?? doc);

//   // Fallback for documents without proper URLs configured in Prismic
//   if (!url && field && "type" in field) {
//     const fieldWithType = field as any;
//     if (fieldWithType.type === "homepage") {
//       url = "/";
//     } else if (fieldWithType.type === "brand") {
//       url = "/brand";
//     } else if (fieldWithType.type === "quiz") {
//       url = "/quiz";
//     } else {
//       // Generic fallback for other document types
//       url = `/${fieldWithType.type}`;
//     }
//   }

//   if (!url) {
//     console.warn("TransitionLink: No URL Found for", field);
//     return null;
//   }

//   return (
//     <Link
//       href={url}
//       className={className}
//       onClick={onClick}
//       tabIndex={tabIndex}
//     >
//       {field?.text ?? children}
//     </Link>
//   );
// };
