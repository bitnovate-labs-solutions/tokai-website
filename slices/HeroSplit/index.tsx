import { PrismicNextImage } from "@prismicio/next";
import type { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

import { MotionReveal } from "@/components/motion-reveal";
import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  eyebrow: KeyTextField;
  heading: RichTextField;
  body: RichTextField;
  cta_label: KeyTextField;
  cta_href: KeyTextField;
  secondary_label: KeyTextField;
  secondary_href: KeyTextField;
  image?: ImageField;
};

export default function HeroSplit({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };
  const hasImage = primary.image?.url;

  return (
    <section className="relative overflow-hidden bg-[#f7f6f3]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-12 px-4 pb-24 pt-32 md:grid-cols-2 md:gap-16 md:px-8 md:pb-32 md:pt-28">
        <MotionReveal>
          <p className="mb-6 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            {primary.eyebrow}
          </p>
          <div className="mb-8">
            <SiteRichText field={primary.heading} variant="display" />
          </div>
          <div className="mb-10 space-y-4">
            <SiteRichText field={primary.body} />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primary.cta_href ?? "/contact"}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white shadow-[0_28px_60px_-32px_rgba(24,24,27,0.75)] transition-[transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              <span>{primary.cta_label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-[transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <span className="text-xs" aria-hidden>
                  ↗
                </span>
              </span>
            </Link>
            <Link
              href={primary.secondary_href ?? "/services"}
              className="inline-flex items-center justify-center rounded-full border border-zinc-950/10 bg-white/60 px-6 py-3 text-sm font-medium text-zinc-800 ring-1 ring-white/40 transition-[transform,background-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white active:scale-[0.98]"
            >
              {primary.secondary_label}
            </Link>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.08}>
          <div className="rounded-[2rem] bg-zinc-200/40 p-2 ring-1 ring-zinc-950/5 shadow-[0_40px_80px_-48px_rgba(24,24,27,0.45)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {hasImage ? (
                <PrismicNextImage
                  field={primary.image}
                  className="h-full w-full object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt=""
                />
              ) : (
                <div
                  className="aspect-[4/5] w-full bg-[radial-gradient(120%_80%_at_20%_0%,rgba(251,191,36,0.35),transparent),radial-gradient(90%_70%_at_80%_30%,rgba(148,163,184,0.35),transparent),linear-gradient(160deg,#18181b,#09090b)]"
                  role="img"
                  aria-label=""
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
              <p className="absolute bottom-8 left-8 right-8 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.18em] text-white/70">
                Field verification · bonding continuity · strike attachment
                geometry
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
