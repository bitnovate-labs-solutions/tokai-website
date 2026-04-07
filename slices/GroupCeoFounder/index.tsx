"use client";

import type { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { SiteRichText } from "@/components/prismic-rich";
import { resolveSliceImageUrl } from "@/lib/resolve-slice-image-url";

type Primary = {
  eyebrow: KeyTextField;
  heading: RichTextField;
  body: RichTextField;
  image?: ImageField;
};

/**
 * Dedicated slice — always the Tokai “Group CEO / Founder” layout (dark section,
 * portrait frame, name pill). Use this in Prismic instead of Image + text for CEO.
 */
export default function GroupCeoFounder({ slice }: SliceComponentProps) {
  const primary = (slice as unknown as { primary?: Primary }).primary;
  if (!primary) {
    return (
      <section className="bg-zinc-900 px-4 py-16 text-zinc-200 md:px-8">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          Group CEO / Founder — add content in Prismic
        </p>
      </section>
    );
  }

  const img = primary.image;
  const resolvedImgUrl = resolveSliceImageUrl(img?.url ?? undefined);

  return (
    <section className="bg-[radial-gradient(120%_80%_at_50%_0%,rgba(245,158,11,0.09),transparent_52%),linear-gradient(180deg,#27272a_0%,#0c0c0e_55%,#09090b_100%)] text-zinc-100">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-40">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* No MotionReveal here: `whileInView` often never fires in Prismic’s slice simulator iframe → opacity stays 0 (blank preview). */}
          <div className="lg:col-span-5">
            {primary.eyebrow?.trim() ? (
              <p className="mb-6 inline-flex rounded-full bg-white/10 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300">
                {primary.eyebrow}
              </p>
            ) : null}

            <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
              {/* Portrait frame — not 4:3; tall column so square uploads still read as “portrait block”. */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-zinc-950/40 ring-1 ring-white/10 md:aspect-[3/5] md:max-h-[min(88vh,900px)]">
                {resolvedImgUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Prismic iframe preview: avoid `next/image` optimizer quirks in embedded simulators.
                  <img
                    src={resolvedImgUrl}
                    alt={img?.alt ?? ""}
                    className="absolute inset-0 h-full w-full object-contain object-center opacity-95"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(251,191,36,0.2),transparent),linear-gradient(160deg,#18181b,#09090b)]"
                    role="img"
                    aria-label=""
                  />
                )}

                <div className="pointer-events-none absolute inset-x-4 bottom-5 flex justify-center md:inset-x-6 md:bottom-6">
                  <div className="inline-flex max-w-[calc(100%-1rem)] flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-zinc-950/80 px-3 py-2 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.65)] backdrop-blur-md md:gap-3 md:px-4 md:py-2.5">
                    <span className="font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold uppercase tracking-[0.24em] text-white md:text-[11px] md:tracking-[0.26em]">
                      Group CEO / Founder
                    </span>
                    {img?.alt?.trim() ? (
                      <>
                        <span className="hidden h-4 w-px bg-zinc-400/40 sm:block" aria-hidden />
                        <span className="max-w-[200px] truncate text-center text-xs font-semibold text-white sm:max-w-none sm:text-sm">
                          {img.alt}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              <SiteRichText field={primary.heading} tone="dark" />
              <SiteRichText field={primary.body} tone="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
