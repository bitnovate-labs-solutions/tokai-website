import type { KeyTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { MotionReveal } from "@/components/motion-reveal";

type Item = {
  label: KeyTextField;
  value: KeyTextField;
};

export default function StatsRow({ slice }: SliceComponentProps) {
  const { items } = slice as unknown as { items: Item[] };
  return (
    <section className="border-y border-zinc-200/80 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <MotionReveal>
          <div className="grid grid-cols-1 divide-y divide-zinc-200/80 md:grid-cols-3 md:divide-x md:divide-y-0">
            {items.map((item, i) => (
              <div
                key={`${item.label}-${i}`}
                className="flex flex-col gap-2 py-8 first:pt-0 last:pb-0 md:px-10 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                <p className="font-[family-name:var(--font-jetbrains)] text-3xl font-medium tabular-nums tracking-tight text-zinc-950 md:text-4xl">
                  {item.value}
                </p>
                <p className="text-sm leading-relaxed text-zinc-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
