"use client";

import type { KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  section_label: KeyTextField;
  section_heading: RichTextField;
  section_intro: KeyTextField;
};

type Item = {
  card_title: KeyTextField;
  excerpt: KeyTextField;
  read_more_path: KeyTextField;
  thumbnail_url: KeyTextField;
  thumbnail_alt: KeyTextField;
  badge: KeyTextField;
};

function resolvedCardTitle(item: Item): string {
  const t = item.card_title?.trim();
  if (t) return t;
  const ex = item.excerpt?.trim();
  if (!ex) return "Story";
  const firstSentence = ex.split(/(?<=[.!?])\s+/)[0]?.trim();
  if (firstSentence && firstSentence.length <= 140) return firstSentence;
  return ex.length > 100 ? `${ex.slice(0, 97).trim()}…` : ex;
}

const cardGridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 88, damping: 19 },
  },
};

const headerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 130, damping: 26 },
  },
};

export default function CompanyEventsStories({ slice }: SliceComponentProps) {
  const { primary, items: rawItems } = slice as unknown as {
    primary: Primary;
    items: Item[];
  };
  const items = rawItems.filter((row) => row.excerpt && row.read_more_path);

  return (
    <section className="relative overflow-hidden bg-[#f6f5f2]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-sky-200/25 blur-3xl"
        aria-hidden
      />
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <motion.div
          className="mb-14 max-w-3xl md:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-12%" }}
          variants={headerContainer}
        >
          {primary.section_label ? (
            <motion.p
              variants={headerItem}
              className="mb-3 font-[family-name:var(--font-jetbrains)] text-[11px] font-medium uppercase tracking-[0.2em] text-amber-800/90"
            >
              {primary.section_label}
            </motion.p>
          ) : null}
          <motion.div variants={headerItem} className="text-zinc-950">
            {primary.section_heading?.length ? (
              <SiteRichText field={primary.section_heading} tone="light" />
            ) : (
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight md:text-4xl">
                Latest stories
              </h2>
            )}
          </motion.div>
          {primary.section_intro ? (
            <motion.p
              variants={headerItem}
              className="mt-4 text-lg text-zinc-600"
            >
              {primary.section_intro}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-6% 0px" }}
          variants={cardGridVariants}
        >
          {items.map((item, i) => (
            <motion.article
              key={`${item.read_more_path}-${i}`}
              variants={cardItemVariants}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white shadow-[0_20px_50px_-38px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_32px_70px_-36px_rgba(0,0,0,0.28)]"
            >
              <Link
                href={item.read_more_path ?? "#"}
                className="absolute inset-0 z-10 rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <span className="sr-only">Read full story</span>
              </Link>
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200">
                {item.thumbnail_url ? (
                  <Image
                    src={item.thumbnail_url}
                    alt={item.thumbnail_alt || ""}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent opacity-60" />
                {item.badge ? (
                  <span className="absolute left-4 top-4 z-[1] rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-800 shadow-sm backdrop-blur-sm">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3 className="relative z-[11] text-balance font-[family-name:var(--font-outfit)] text-xl font-semibold leading-snug tracking-tight text-zinc-950 md:text-2xl">
                  {resolvedCardTitle(item)}
                </h3>
                {item.excerpt ? (
                  <p className="relative z-[11] mt-3 flex-1 leading-relaxed text-zinc-600">
                    {item.excerpt}
                  </p>
                ) : null}
                <span className="relative z-[11] mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-800 transition group-hover:gap-3">
                  Read the story
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
