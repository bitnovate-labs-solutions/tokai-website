import Image from "next/image";
import type { KeyTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { MotionReveal } from "@/components/motion-reveal";

type Item = {
  section_title: KeyTextField;
  image_url: KeyTextField;
  image_alt: KeyTextField;
};

export default function ProjectGallery({ slice }: SliceComponentProps) {
  const { items: rawItems } = slice as unknown as { items: Item[] };
  const items = rawItems.filter(
    (item) => item.image_url,
  );

  // Group images by section title while preserving order.
  const grouped = new Map<string, Item[]>();
  for (const item of items) {
    const key = item.section_title || "Gallery";
    const arr = grouped.get(key) ?? [];
    arr.push(item);
    grouped.set(key, arr);
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        {Array.from(grouped.entries()).map(([title, images], sectionIdx) => (
          <MotionReveal key={title} delay={sectionIdx * 0.03}>
            <div className="mb-20 pt-4 last:mb-0 md:mb-24 md:pt-6">
              <h2 className="mb-10 font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950 md:mb-12 md:text-3xl">
                {title}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {images.map((img) => (
                  <figure
                    key={`${title}-${img.image_url}`}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-[0_14px_34px_-22px_rgba(15,23,42,0.35)]"
                  >
                    <div className="relative">
                      <Image
                        src={img.image_url ?? ""}
                        alt={img.image_alt || ""}
                        width={1400}
                        height={900}
                        className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02]"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}

