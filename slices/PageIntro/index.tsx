import type { KeyTextField, RichTextField } from "@prismicio/client";
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
};

export default function PageIntro({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };
  const showCta = primary.cta_label && primary.cta_href;

  return (
    <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
      <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-28 md:px-8 md:pb-28 md:pt-24">
        <MotionReveal>
          <p className="mb-6 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            {primary.eyebrow}
          </p>
          <div className="max-w-4xl">
            <SiteRichText field={primary.heading} variant="display" />
          </div>
          <div className="mt-8 max-w-3xl space-y-4">
            <SiteRichText field={primary.body} />
          </div>
          {showCta ? (
            <Link
              href={primary.cta_href ?? "#"}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-[transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              {primary.cta_label}
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-[transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <span className="text-xs" aria-hidden>
                  ↗
                </span>
              </span>
            </Link>
          ) : null}
        </MotionReveal>
      </div>
    </section>
  );
}
