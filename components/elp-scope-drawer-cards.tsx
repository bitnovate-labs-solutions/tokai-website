"use client";

import type { ImageField, RichTextField } from "@prismicio/client";
import Image from "next/image";
import { motion } from "framer-motion";

import { SiteRichText } from "@/components/prismic-rich";

export type ScopeDrawerCardItem = {
  heading: RichTextField;
  body: RichTextField;
  card_image?: ImageField | null;
};

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 110, damping: 24 },
  },
};

type Props = {
  items: ScopeDrawerCardItem[];
  sliceId?: string;
  imageSizes: string;
};

/**
 * Four-up vertical panels: full-bleed imagery, label + title at bottom,
 * and a dark “drawer” that slides in from the right on hover (desktop).
 * On small screens the body copy sits below the image (no hover).
 */
export function ElpScopeDrawerCards({ items, sliceId, imageSizes }: Props) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-0 lg:overflow-hidden lg:rounded-3xl lg:border lg:border-zinc-200/70 lg:bg-zinc-950 lg:shadow-[0_28px_64px_-32px_rgba(0,0,0,0.35)]"
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {items.map((item, idx) => {
          const imgUrl = item.card_image?.url?.trim();
          const key = `${sliceId ?? "scope"}-drawer-${idx}`;
          return (
            <motion.article
              key={key}
              variants={cardVariants}
              className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.3)] lg:min-h-[min(72vh,640px)] lg:rounded-none lg:border-0 lg:border-r lg:border-white/12 lg:shadow-none lg:last:border-r-0"
            >
              {/* Image + title (hero strip) */}
              <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto lg:min-h-full lg:h-full">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={item.card_image?.alt ?? ""}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
                    sizes={imageSizes}
                    priority={idx === 0}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950"
                    aria-hidden
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/15"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 min-w-0 p-5 md:p-7 lg:max-w-[58%] lg:p-8">
                  <div className="min-w-0 [&_h2]:block [&_h2]:!whitespace-normal [&_h2]:break-words [&_h2]:!font-[family-name:var(--font-jetbrains)] [&_h2]:!text-[13px] [&_h2]:!font-semibold [&_h2]:!uppercase [&_h2]:!leading-snug [&_h2]:!tracking-[0.18em] [&_h2]:!text-white sm:[&_h2]:!text-sm md:[&_h2]:!text-[15px] lg:[&_h2]:!text-[0.8125rem]">
                    <SiteRichText field={item.heading} variant="body" tone="dark" />
                  </div>
                </div>
              </div>

              {/* Sliding drawer — hover / fine pointer only */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-[min(100%,420px)] translate-x-full flex-col justify-center border-l border-emerald-800/40 bg-emerald-950/[0.97] px-7 py-10 shadow-[-16px_0_48px_-16px_rgba(0,0,0,0.55)] backdrop-blur-[2px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] motion-reduce:transition-none group-hover:translate-x-0 group-hover:pointer-events-auto lg:flex [@media(hover:none)_and_(min-width:1024px)]:!hidden"
              >
                <div className="mb-5 h-px w-11 shrink-0 bg-amber-400/85" aria-hidden />
                <div className="min-h-0 overflow-y-auto overscroll-contain pr-1 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-white/[0.92]">
                  <SiteRichText
                    field={item.body}
                    variant="body"
                    tone="dark"
                    contentWidth="full"
                  />
                </div>
              </div>

              {/* Mobile & coarse-pointer large screens: body below image (no hover drawer) */}
              <div className="relative z-10 flex flex-1 flex-col border-t border-zinc-800/30 bg-[#f7f6f3] px-5 py-5 lg:hidden [@media(hover:none)_and_(min-width:1024px)]:!flex">
                <div className="text-base leading-relaxed text-zinc-700">
                  <SiteRichText field={item.body} variant="body" contentWidth="full" />
                </div>
              </div>
            </motion.article>
          );
        })}
    </motion.div>
  );
}
