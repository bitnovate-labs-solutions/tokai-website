import {
  PrismicLink,
  PrismicRichText,
  type RichTextComponents,
} from "@prismicio/react";
import type { RichTextField } from "@prismicio/client";

function bodyComponentsForTone(
  tone: "light" | "dark",
  contentWidth: "measure" | "full" = "measure",
): RichTextComponents {
  const t = tone === "dark" ? "text-zinc-100" : "text-zinc-950";
  const p = tone === "dark" ? "text-zinc-300" : "text-zinc-600";
  const pMeasure =
    contentWidth === "full" ? "" : "max-w-[65ch]";
  const linkClass =
    tone === "dark"
      ? "font-semibold text-sky-300 underline decoration-sky-400/90 underline-offset-[3px] transition-colors hover:text-sky-200 hover:decoration-sky-200"
      : "font-semibold text-sky-800 underline decoration-sky-700/70 underline-offset-[3px] transition-colors hover:text-sky-950 hover:decoration-sky-900";
  return {
    heading1: ({ children }) => (
      <h2
        className={`font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight md:text-4xl ${t}`}
      >
        {children}
      </h2>
    ),
    heading2: ({ children }) => (
      <h2
        className={`font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight ${t}`}
      >
        {children}
      </h2>
    ),
    paragraph: ({ children }) => (
      <p className={`text-base leading-relaxed ${pMeasure} ${p}`}>
        {children}
      </p>
    ),
    listItem: ({ children }) => (
      <li className={`text-base leading-relaxed ${p}`}>{children}</li>
    ),
    oList: ({ children }) => (
      <ol className={`list-decimal space-y-2 pl-6 ${p}`}>{children}</ol>
    ),
    list: ({ children }) => (
      <ul className={`list-disc space-y-2 pl-6 ${p}`}>{children}</ul>
    ),
    hyperlink: ({ node, children }) => (
      <PrismicLink field={node.data} className={linkClass}>
        {children}
      </PrismicLink>
    ),
  };
}

function displayHeadingForTone(tone: "light" | "dark"): RichTextComponents {
  const t = tone === "dark" ? "text-white" : "text-zinc-950";
  const body = bodyComponentsForTone(tone);
  return {
    heading1: ({ children }) => (
      <span
        className={`block font-[family-name:var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl ${t}`}
      >
        {children}
      </span>
    ),
    paragraph: body.paragraph,
    hyperlink: body.hyperlink,
  };
}

type Props = {
  field: RichTextField | null | undefined;
  variant?: "body" | "display";
  tone?: "light" | "dark";
  /** "measure" caps paragraph width; "full" flows to container (e.g. editorial column). */
  contentWidth?: "measure" | "full";
};

export function SiteRichText({
  field,
  variant = "body",
  tone = "light",
  contentWidth = "measure",
}: Props) {
  const components =
    variant === "display"
      ? displayHeadingForTone(tone)
      : bodyComponentsForTone(tone, contentWidth);
  return <PrismicRichText field={field} components={components} />;
}
