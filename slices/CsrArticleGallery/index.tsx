"use client";

import type { KeyTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { motion } from "framer-motion";

import { ClickableGallery } from "@/components/clickable-gallery";

type Primary = {
  gallery_heading: KeyTextField;
};

type Item = {
  image_url: KeyTextField;
  image_alt: KeyTextField;
};

export default function CsrArticleGallery({ slice }: SliceComponentProps) {
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
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
        >
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
            {primary.gallery_heading?.trim() || "Picture Gallery"}
          </h2>
          <div className="mt-8">
            <ClickableGallery
              images={images}
              imageClassName="h-56 w-full object-cover"
              columnsClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
