"use client";

import type { KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";
import Image from "next/image";

import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  eyebrow: KeyTextField;
  heading: RichTextField;
  byline: KeyTextField;
  subheading: KeyTextField;
  banner_image_url: KeyTextField;
  banner_image_alt: KeyTextField;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      type: "spring" as const,
      stiffness: 120,
      damping: 22,
    },
  }),
};

export default function CsrArticleHero({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };
  const img = primary.banner_image_url?.trim();

  return (
    <section className="relative min-h-[min(72vh,820px)] overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-amber-500/20 blur-[120px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-0 h-[60%] w-[60%] rounded-full bg-sky-500/15 blur-[100px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {img ? (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={img}
            alt={primary.banner_image_alt || ""}
            fill
            className="object-cover opacity-[0.38]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/45 to-zinc-950/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/65 via-transparent to-zinc-950/70" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[min(72vh,820px)] max-w-[1400px] flex-col justify-end px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
        <div className="max-w-4xl">
          {primary.eyebrow ? (
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.22em] text-amber-200/90"
            >
              {primary.eyebrow}
            </motion.p>
          ) : null}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <SiteRichText
              field={primary.heading}
              variant="display"
              tone="dark"
            />
          </motion.div>
          {primary.byline?.trim() ? (
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 max-w-2xl border-l-2 border-amber-400/50 pl-4 font-[family-name:var(--font-jetbrains)] text-sm font-medium leading-relaxed tracking-wide text-amber-100/95 md:text-base"
            >
              {primary.byline.trim()}
            </motion.p>
          ) : null}
          {primary.subheading?.trim() ? (
            <motion.p
              custom={primary.byline?.trim() ? 3 : 2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className={`max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl ${
                primary.byline?.trim() ? "mt-5" : "mt-8"
              }`}
            >
              {primary.subheading.trim()}
            </motion.p>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mt-12 hidden h-px w-32 rounded-full bg-gradient-to-r from-amber-400/80 to-transparent md:block"
          aria-hidden
        />
      </div>
    </section>
  );
}
