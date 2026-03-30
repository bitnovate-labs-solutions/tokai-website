"use client";

import type { ImageField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";

import { SiteRichText } from "@/components/prismic-rich";

const ink = "#0B1F3A";
/** Section wash — slightly lighter than panel surface */
const field = "#f4f5f0";
/** Opaque fill for each sticky stack slot (reads solid when panels overlap) */
const panelSurface = "#e9ebe4";

export type SolutionParallaxItem = {
  heading: RichTextField;
  body: RichTextField;
  image_url: string;
  image_alt: string;
  cta_label: string;
  cta_href: string;
};

/** Prismic repeat item + local fallback JSON */
type RawParallaxItem = {
  heading: RichTextField;
  body: RichTextField;
  image_url?: string;
  image_alt?: string;
  image?: ImageField | null;
  cta_label?: string | null;
  cta_href?: string | null;
};

function normalizeParallaxItems(rows: RawParallaxItem[]): SolutionParallaxItem[] {
  const out: SolutionParallaxItem[] = [];
  for (const r of rows) {
    if (!r.heading?.length) continue;
    const url = r.image?.url ?? r.image_url;
    if (!url) continue;
    out.push({
      heading: r.heading,
      body: r.body,
      image_url: url,
      image_alt: r.image?.alt ?? r.image_alt ?? "",
      cta_label: String(r.cta_label ?? ""),
      cta_href: String(r.cta_href ?? ""),
    });
  }
  return out;
}

type Primary = {
  eyebrow?: string;
  intro?: RichTextField;
};

function PanelGrid({
  item,
  flipLayout,
  imageMotionY,
}: {
  item: SolutionParallaxItem;
  flipLayout: boolean;
  imageMotionY?: MotionValue<number>;
}) {
  const textCol = (
    <div
      className={`space-y-6 ${flipLayout ? "lg:order-2" : "lg:order-1"}`}
    >
      <div className="[&_h2]:font-[family-name:var(--font-outfit)] [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:md:text-4xl [&_h2]:lg:text-5xl" style={{ color: ink }}>
        <SiteRichText field={item.heading} variant="body" contentWidth="full" />
      </div>
      <div className="max-w-xl text-base leading-relaxed text-zinc-600">
        <SiteRichText field={item.body} contentWidth="full" />
      </div>
      <Link
        href={item.cta_href}
        className="group inline-flex items-center gap-2 rounded-full border border-[#E8A020] px-6 py-3 text-sm font-medium text-[#E8A020] transition-colors duration-300 hover:bg-[#E8A020] hover:text-white"
      >
        <span>{item.cta_label}</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </Link>
    </div>
  );

  const imageInner = (
    <Image
      src={item.image_url}
      alt={item.image_alt}
      fill
      className="object-contain object-center"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  );

  const imageWrap = (
    <div
      className={`relative ${flipLayout ? "lg:order-1" : "lg:order-2"}`}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-zinc-950/10 bg-zinc-100 shadow-[0_24px_60px_-30px_rgba(11,31,58,0.35)] ring-1 ring-white/20"
        style={{ aspectRatio: "521 / 113" }}
      >
        {imageMotionY ? (
          <motion.div className="absolute inset-0" style={{ y: imageMotionY }}>
            {imageInner}
          </motion.div>
        ) : (
          imageInner
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {flipLayout ? (
        <>
          {imageWrap}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {imageWrap}
        </>
      )}
    </div>
  );
}

function ShrinkingPanel({
  item,
  index,
  flipLayout,
  nextPanelRef,
  setPanelRef,
}: {
  item: SolutionParallaxItem;
  index: number;
  flipLayout: boolean;
  nextPanelRef: React.RefObject<HTMLElement | null>;
  setPanelRef: (el: HTMLDivElement | null) => void;
}) {
  const { scrollYProgress } = useScroll({
    target: nextPanelRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.56]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const panelPad =
    index === 0
      ? "px-4 pt-8 pb-14 md:px-8 md:pt-10 md:pb-16"
      : "px-4 py-16 md:px-8";

  return (
    <div
      ref={setPanelRef}
      className={`sticky top-0 box-border flex h-[100dvh] w-full items-center justify-center ${panelPad}`}
      style={{ zIndex: 10 + index, backgroundColor: panelSurface }}
    >
      <motion.div
        className="relative z-[1] flex h-full min-h-0 w-full max-w-[1400px] flex-col justify-center"
        style={{ scale, opacity, filter }}
      >
        {index > 0 ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.06)]"
            aria-hidden
          />
        ) : null}
        <PanelGrid item={item} flipLayout={flipLayout} imageMotionY={imgY} />
      </motion.div>
    </div>
  );
}

function StaticPanel({
  item,
  index,
  flipLayout,
  setPanelRef,
}: {
  item: SolutionParallaxItem;
  index: number;
  flipLayout: boolean;
  setPanelRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={setPanelRef}
      className="sticky top-0 box-border flex h-[100dvh] w-full items-center justify-center px-4 py-16 md:px-8"
      style={{ zIndex: 10 + index, backgroundColor: panelSurface }}
    >
      <div className="relative z-[1] flex h-full min-h-0 w-full max-w-[1400px] flex-col justify-center">
        {index > 0 ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 shadow-[0_-20px_40px_rgba(0,0,0,0.06)]"
            aria-hidden
          />
        ) : null}
        <PanelGrid item={item} flipLayout={flipLayout} />
      </div>
    </div>
  );
}

export default function SolutionParallax({ slice }: SliceComponentProps) {
  const { items: rawItems } = slice as unknown as {
    primary?: Primary;
    items: RawParallaxItem[];
  };
  const items = normalizeParallaxItems(rawItems ?? []);
  const panelEls = useRef<(HTMLDivElement | null)[]>([]);

  const nextPanelRefs = useMemo(
    () =>
      items.map((_, i) => ({
        get current() {
          return panelEls.current[i + 1] ?? null;
        },
      })),
    [items.length],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="relative -mt-4 md:-mt-8"
      style={{ backgroundColor: field }}
    >
      {/*
        Do not use overflow-x-hidden here — it creates a scroll containment that
        breaks position:sticky stacking relative to the viewport (WebKit/Blink).
      */}
      <div
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 isolate">
        {items.map((item, index) => {
          const flipLayout = index % 2 === 1;
          const isLast = index === items.length - 1;

          const setPanelRef = (el: HTMLDivElement | null) => {
            panelEls.current[index] = el;
          };

          return !isLast ? (
            <ShrinkingPanel
              key={item.image_url}
              item={item}
              index={index}
              flipLayout={flipLayout}
              nextPanelRef={
                nextPanelRefs[index] as React.RefObject<HTMLElement | null>
              }
              setPanelRef={setPanelRef}
            />
          ) : (
            <StaticPanel
              key={item.image_url}
              item={item}
              index={index}
              flipLayout={flipLayout}
              setPanelRef={setPanelRef}
            />
          );
        })}
      </div>
    </section>
  );
}
