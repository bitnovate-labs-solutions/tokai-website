"use client";

import type { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { SiteRichText } from "@/components/prismic-rich";

const shellVariants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 22 },
  },
};

const rowVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 130, damping: 24 },
  },
};

export type ContactCtaSectionProps = {
  heading: RichTextField;
  body: RichTextField;
  cta_label: KeyTextField;
  cta_href: KeyTextField;
  /** Optional illustration (e.g. tokai.com.my contact.png beside the CTA). */
  aside_image?: ImageField | null;
};

/**
 * Shared layout for the dark “Get in touch” / CTA band (used by the `cta_band` slice).
 */
export function ContactCtaSection({
  heading,
  body,
  cta_label,
  cta_href,
  aside_image,
}: ContactCtaSectionProps) {
  const asideUrl = aside_image?.url?.trim();
  const asideAlt = aside_image?.alt ?? "";

  return (
    <section className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <motion.div
          className="rounded-[2rem] bg-zinc-900/60 p-2 ring-1 ring-white/10 shadow-[0_40px_100px_-60px_rgba(0,0,0,0.85)]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.01, margin: "0px" }}
          variants={shellVariants}
        >
          <div className="rounded-[calc(2rem-0.5rem)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 px-8 py-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:px-16 md:py-20">
            <motion.div
              className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end ${
                asideUrl ? "lg:items-center" : ""
              }`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.01, margin: "0px" }}
              variants={rowVariants}
            >
              {asideUrl ? (
                <motion.div
                  className="relative mx-auto max-w-[280px] lg:col-span-4 lg:mx-0 lg:max-w-none"
                  variants={child}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-zinc-800/50 ring-1 ring-white/10">
                    <Image
                      src={asideUrl}
                      alt={asideAlt}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 280px, 33vw"
                    />
                  </div>
                </motion.div>
              ) : null}
              <motion.div
                className={asideUrl ? "lg:col-span-5" : "lg:col-span-7"}
                variants={child}
              >
                <SiteRichText
                  field={heading}
                  variant="display"
                  tone="dark"
                />
                <div className="mt-8">
                  <SiteRichText field={body} tone="dark" />
                </div>
              </motion.div>
              <motion.div
                className={`lg:flex lg:justify-end ${
                  asideUrl ? "lg:col-span-3" : "lg:col-span-5"
                }`}
                variants={child}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 22,
                  }}
                >
                  <Link
                    href={cta_href ?? "/contact"}
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber-500/95 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-[0_28px_70px_-36px_rgba(251,191,36,0.9)] transition-[transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  >
                    <span>{cta_label}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/10 transition-[transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                      <span className="text-xs" aria-hidden>
                        ↗
                      </span>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
