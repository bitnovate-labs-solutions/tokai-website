"use client";

import type { KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import Image from "next/image";

import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  section_label: KeyTextField;
  section_heading: RichTextField;
  section_intro: KeyTextField;
};

type Item = {
  blurb: KeyTextField;
  external_url: KeyTextField;
  thumbnail_url: KeyTextField;
  thumbnail_alt: KeyTextField;
};

export default function CompanyEventsMedia({ slice }: SliceComponentProps) {
  const { primary, items: rawItems } = slice as unknown as {
    primary: Primary;
    items: Item[];
  };
  const items = rawItems.filter((row) => row.blurb && row.external_url);

  return (
    <section className="border-y border-white/10 bg-zinc-950 text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-3xl md:mb-16"
        >
          {primary.section_label ? (
            <p className="mb-3 font-[family-name:var(--font-jetbrains)] text-[11px] font-medium uppercase tracking-[0.2em] text-amber-300/90">
              {primary.section_label}
            </p>
          ) : null}
          <div className="text-white">
            {primary.section_heading?.length ? (
              <SiteRichText field={primary.section_heading} tone="dark" />
            ) : (
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight md:text-4xl text-white">
                From the media
              </h2>
            )}
          </div>
          {primary.section_intro ? (
            <p className="mt-4 text-lg text-zinc-400">{primary.section_intro}</p>
          ) : null}
        </motion.div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-4 pr-4 [scrollbar-width:thin] md:mx-0 md:gap-6 md:pl-0 md:pr-0">
          {items.map((item, i) => (
            <motion.a
              key={`${item.external_url}-${i}`}
              href={item.external_url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                delay: i * 0.06,
                type: "spring" as const,
                stiffness: 120,
                damping: 22,
              }}
              className="group relative flex w-[min(calc(100vw-3rem),380px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/5 transition-[transform,background-color] duration-500 hover:-translate-y-1 hover:bg-zinc-900/80"
            >
              <div className="relative aspect-[5/3] overflow-hidden bg-zinc-800">
                {item.thumbnail_url ? (
                  <Image
                    src={item.thumbnail_url}
                    alt={item.thumbnail_alt || ""}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    sizes="380px"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm leading-relaxed text-zinc-300">{item.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-400/95">
                  Read article
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    ↗
                  </span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
