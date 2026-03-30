"use client";

import { MotionReveal } from "@/components/motion-reveal";
import { Lightning, ShieldCheck, SunDim } from "@phosphor-icons/react";

const pillars = [
  {
    title: "Earthing and lightning protection",
    copy: "Soil resistivity, mesh design, LPS routing, and witness testing aligned to site-specific exposure—not generic templates.",
    icon: Lightning,
  },
  {
    title: "Security engineering",
    copy: "Perimeter sensing, access control, CCTV optics, and storage design coordinated with daily operations and emergency procedures.",
    icon: ShieldCheck,
  },
  {
    title: "Solar integration",
    copy: "Structural checks, inverter placement, cable management, and protection coordination so arrays stay serviceable after storms.",
    icon: SunDim,
  },
];

export function ServicesContent() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-28">
          <MotionReveal>
            <p className="mb-6 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
              Services
            </p>
            <h1 className="max-w-3xl font-[family-name:var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tighter text-zinc-950 md:text-6xl">
              Field disciplines that share one measurement standard.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-600">
              This route is static in code. For CMS-driven service copy, mirror
              this structure as slices in Prismic or point navigation to a
              Prismic page UID (for example{" "}
              <span className="font-[family-name:var(--font-jetbrains)] text-sm text-zinc-800">
                /services-cms
              </span>
              ).
            </p>
          </MotionReveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pillars.map((pillar, i) => (
              <MotionReveal key={pillar.title} delay={i * 0.05}>
                <div className="h-full rounded-[2rem] bg-zinc-200/35 p-2 ring-1 ring-zinc-950/5 shadow-[0_28px_70px_-48px_rgba(24,24,27,0.45)]">
                  <div className="flex h-full flex-col gap-6 rounded-[calc(2rem-0.5rem)] bg-white p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-amber-500/20 md:p-10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950/5 text-zinc-950 ring-1 ring-zinc-950/5">
                      <pillar.icon weight="light" size={26} aria-hidden />
                    </div>
                    <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950">
                      {pillar.title}
                    </h2>
                    <p className="text-base leading-relaxed text-zinc-600">
                      {pillar.copy}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
