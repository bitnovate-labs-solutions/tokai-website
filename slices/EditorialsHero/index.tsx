"use client";

import type { KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";

import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  eyebrow: KeyTextField;
  heading: RichTextField;
  subheading: KeyTextField;
  /** Optional MP4 URL for the animated background. */
  background_video_url: KeyTextField;
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

export default function EditorialsHero({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };
  const sliceId = (slice as { id?: string }).id;
  const videoSrc = primary.background_video_url?.trim() || "/editorials_hero.mp4";

  const isCsrHero = primary.eyebrow?.trim().toUpperCase() === "CSR";
  /** Tighter bottom spacing before the next slice (e.g. Our Solutions parallax stack). */
  const compactFooter =
    sliceId === "os-hero" ||
    sliceId === "elp-hero" ||
    sliceId === "elps-hero";

  return (
    <section className="relative min-h-[min(88vh,920px)] overflow-hidden bg-zinc-950 text-white">
      {/* Animated background (video) + inward masking gradients */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 h-full w-full"
          animate={
            isCsrHero
              ? { scale: [1, 1.045, 1] }
              : { scale: 1 }
          }
          transition={
            isCsrHero
              ? { duration: 22, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
        >
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.9]"
          />
        </motion.div>

        {/* Vignette/inward mask so edges fade into the site background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(9,9,11,0.0) 0%, rgba(9,9,11,0.45) 56%, rgba(9,9,11,0.95) 100%)",
          }}
        />

        {/* Extra vertical darkening to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/10 to-zinc-950/92" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Centered hero content */}
      <div
        className={`relative z-10 mx-auto flex min-h-[min(88vh,920px)] max-w-[1400px] flex-col items-center justify-center px-4 pt-36 text-center md:px-8 md:pt-32 ${
          compactFooter ? "pb-10 md:pb-12" : "pb-20 md:pb-28"
        }`}
      >
        <div className="mx-auto max-w-4xl">
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
            <SiteRichText field={primary.heading} variant="display" tone="dark" />
          </motion.div>

          {primary.subheading ? (
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-zinc-300 md:text-xl"
            >
              {primary.subheading}
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
