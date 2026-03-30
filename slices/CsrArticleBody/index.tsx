"use client";

import type { KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import Image from "next/image";

import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  intro: KeyTextField;
  /** Campaign / programme logo beside the first card (optional). */
  content_logo_url?: KeyTextField;
  content_logo_alt?: KeyTextField;
};

type Item = {
  section_heading: KeyTextField;
  body: RichTextField;
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      type: "spring" as const,
      stiffness: 100,
      damping: 22,
    },
  }),
};

export default function CsrArticleBody({ slice }: SliceComponentProps) {
  const { primary, items: rawItems } = slice as unknown as {
    primary: Primary;
    items: Item[];
  };
  const items = rawItems.filter((row) => row.body?.length);
  const contentLogoUrl = primary.content_logo_url?.trim();
  const contentLogoAlt = primary.content_logo_alt?.trim() ?? "";

  return (
    <section className="relative border-t border-zinc-200/60 bg-[#f6f5f2]">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        {primary.intro?.trim() ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="mx-auto mb-14 max-w-3xl text-center text-xl font-medium leading-relaxed text-zinc-700 md:mb-20 md:text-2xl"
          >
            {primary.intro}
          </motion.p>
        ) : null}

        <div className="mx-auto max-w-3xl space-y-8 md:space-y-10">
          {items.map((item, i) => {
            const showLogoInCard = Boolean(contentLogoUrl && i === 0);
            return (
              <motion.article
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-8%" }}
                variants={itemVariants}
                className="rounded-[1.5rem] border border-zinc-200/90 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.18)] md:p-10"
              >
                {showLogoInCard && contentLogoUrl ? (
                  <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start md:gap-10">
                    <div className="min-w-0 flex-1">
                      {item.section_heading?.trim() ? (
                        <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
                          {item.section_heading}
                        </h2>
                      ) : null}
                      <div
                        className={`max-w-none space-y-4 text-base leading-relaxed text-zinc-600 ${
                          item.section_heading?.trim() ? "mt-5" : ""
                        }`}
                      >
                        <SiteRichText field={item.body} tone="light" />
                      </div>
                    </div>
                    <div className="flex shrink-0 justify-center md:w-[min(100%,220px)] md:pt-1">
                      <Image
                        src={contentLogoUrl}
                        alt={contentLogoAlt}
                        width={420}
                        height={159}
                        className="h-auto w-full max-w-[220px] object-contain object-top"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {item.section_heading?.trim() ? (
                      <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
                        {item.section_heading}
                      </h2>
                    ) : null}
                    <div
                      className={`max-w-none space-y-4 text-base leading-relaxed text-zinc-600 ${
                        item.section_heading?.trim() ? "mt-5" : ""
                      }`}
                    >
                      <SiteRichText field={item.body} tone="light" />
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
