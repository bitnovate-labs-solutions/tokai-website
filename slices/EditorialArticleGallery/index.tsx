"use client";

import type { KeyTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { ClickableGallery } from "@/components/clickable-gallery";

type Primary = {
  gallery_heading: KeyTextField;
};

type Item = {
  image_url: KeyTextField;
  image_alt: KeyTextField;
};

export default function EditorialArticleGallery({ slice }: SliceComponentProps) {
  const { primary, items: rawItems } = slice as unknown as {
    primary: Primary;
    items: Item[];
  };
  const images = rawItems
    .filter((row) => row.image_url)
    .map((row) => ({
      src: row.image_url ?? "",
      alt: row.image_alt || "",
    }));

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-zinc-200/80 bg-white">
      <div className="mx-auto max-w-[42rem] px-4 py-12 md:px-6 md:py-16">
        <h2 className="mb-8 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
          {primary.gallery_heading?.trim() || "Figures"}
        </h2>
        <ClickableGallery images={images} layout="article" />
      </div>
    </section>
  );
}
