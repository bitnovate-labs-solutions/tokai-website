import type { KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Lightning, ShieldCheck, SunDim } from "@phosphor-icons/react";

import { MotionReveal } from "@/components/motion-reveal";
import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  heading: RichTextField;
  intro: RichTextField;
};

type Item = {
  title: KeyTextField;
  description: KeyTextField;
  icon: KeyTextField;
  accent: KeyTextField;
};

function ServiceIcon({ name }: { name: KeyTextField }) {
  const key = (name ?? "").toLowerCase();
  if (key === "shield") {
    return <ShieldCheck weight="light" size={26} aria-hidden />;
  }
  if (key === "sun") {
    return <SunDim weight="light" size={26} aria-hidden />;
  }
  return <Lightning weight="light" size={26} aria-hidden />;
}

export default function ServiceBento({ slice }: SliceComponentProps) {
  const { primary, items } = slice as unknown as {
    primary: Primary;
    items: Item[];
  };
  const [a, b, c] = items;

  return (
    <section className="bg-[#f7f6f3]">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-40">
        <MotionReveal>
          <div className="mb-16 max-w-2xl">
            <SiteRichText field={primary.heading} variant="display" />
            <div className="mt-6">
              <SiteRichText field={primary.intro} />
            </div>
          </div>
        </MotionReveal>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2">
          {a ? (
            <MotionReveal className="lg:row-span-2">
              <ServiceTile item={a} emphasis />
            </MotionReveal>
          ) : null}
          {b ? (
            <MotionReveal delay={0.05}>
              <ServiceTile item={b} />
            </MotionReveal>
          ) : null}
          {c ? (
            <MotionReveal delay={0.1}>
              <ServiceTile item={c} />
            </MotionReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ServiceTile({
  item,
  emphasis = false,
}: {
  item: Item;
  emphasis?: boolean;
}) {
  const accent = (item.accent ?? "amber").toLowerCase();
  const accentRing =
    accent === "slate" ? "ring-slate-400/25" : "ring-amber-500/30";

  return (
    <div
      className={`h-full rounded-[2rem] bg-zinc-200/35 p-2 ring-1 ring-zinc-950/5 shadow-[0_32px_70px_-48px_rgba(24,24,27,0.55)] ${emphasis ? "lg:min-h-[420px]" : ""}`}
    >
      <div
        className={`flex h-full flex-col justify-between rounded-[calc(2rem-0.5rem)] bg-white p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ${accentRing} md:p-10`}
      >
        <div>
          <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950/5 text-zinc-950 ring-1 ring-zinc-950/5">
            <ServiceIcon name={item.icon} />
          </div>
          <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-zinc-600">
            {item.description}
          </p>
        </div>
        <p className="mt-10 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          Site walk · calculations · witness tests
        </p>
      </div>
    </div>
  );
}
