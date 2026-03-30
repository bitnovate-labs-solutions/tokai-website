"use client";

import { useState } from "react";
import Image from "next/image";

const ceremony = {
  src: "https://tokai.com.my/wp-content/uploads/2019/04/laureate_01.jpg",
  alt: "Brand Laureate award ceremony",
  label: "Award Ceremony",
};

const trophy = {
  src: "https://tokai.com.my/wp-content/uploads/2019/07/laureate_trophy_new.jpg",
  alt: "Brand Laureate trophy",
  label: "Brand Trophy",
};

type BrandLaureateShowcaseProps = {
  paragraphs: string[];
};

export function BrandLaureateShowcase({ paragraphs }: BrandLaureateShowcaseProps) {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  return (
    <>
      <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <button
          type="button"
          onClick={() => setActiveSrc(ceremony.src)}
          className="group relative block w-full text-left"
          aria-label="Open Brand Laureate award ceremony image"
        >
          <Image
            src={ceremony.src}
            alt={ceremony.alt}
            width={1600}
            height={900}
            className="aspect-[21/9] w-full object-cover transition duration-500 group-hover:scale-[1.02] md:aspect-[2.4/1] md:max-h-[min(52vh,520px)]"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-6 py-5 md:px-10 md:py-8">
            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.16em] text-white/90">
              {ceremony.label}
            </p>
          </div>
        </button>

        <div className="grid gap-10 p-6 md:grid-cols-12 md:gap-12 md:p-10">
          <div className="space-y-4 leading-relaxed text-zinc-700 md:col-span-7">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => setActiveSrc(trophy.src)}
              className="group sticky top-28 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-[linear-gradient(165deg,#f4f4f5_0%,#ffffff_45%,#fafafa_100%)] p-6 text-left shadow-[0_20px_50px_-28px_rgba(0,0,0,0.2)] md:p-8"
              aria-label="Open Brand Laureate trophy image"
            >
              <p className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {trophy.label}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight text-zinc-950">
                Premium Distinction
              </h3>
              <Image
                src={trophy.src}
                alt={trophy.alt}
                width={640}
                height={760}
                className="mx-auto mt-6 max-h-[min(52vh,420px)] w-auto object-contain transition duration-500 group-hover:scale-[1.04]"
              />
            </button>
          </div>
        </div>
      </article>

      {activeSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveSrc(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm text-white"
            onClick={() => setActiveSrc(null)}
            aria-label="Close full image"
          >
            Close
          </button>
          <div
            className="relative h-[85vh] w-[min(96vw,1400px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeSrc}
              alt="Brand Laureate full image"
              fill
              className="object-contain"
              sizes="96vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
