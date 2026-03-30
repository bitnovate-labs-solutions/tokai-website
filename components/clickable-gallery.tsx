"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

type ClickableGalleryProps = {
  images: GalleryImage[];
  imageClassName?: string;
  columnsClassName?: string;
  /** "article" stacks full-width figures with lighter chrome (long-form reading). */
  layout?: "grid" | "article";
};

export function ClickableGallery({
  images,
  imageClassName,
  columnsClassName,
  layout = "grid",
}: ClickableGalleryProps) {
  const resolvedImageClass =
    imageClassName ??
    (layout === "article"
      ? "h-auto w-full max-h-[min(70vh,520px)] object-contain"
      : "h-56 w-full object-cover");
  const resolvedColumns =
    columnsClassName ??
    (layout === "article"
      ? "flex flex-col gap-10"
      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = useMemo(
    () => (activeIndex === null ? null : images[activeIndex]),
    [activeIndex, images],
  );

  return (
    <>
      <div className={resolvedColumns}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className={
              layout === "article"
                ? "group block w-full text-left"
                : "group overflow-hidden rounded-2xl border border-zinc-200 text-left"
            }
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              className={`${resolvedImageClass} transition duration-300 group-hover:opacity-95`}
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm text-white"
            onClick={() => setActiveIndex(null)}
            aria-label="Close full image"
          >
            Close
          </button>
          <div
            className="relative h-[85vh] w-[min(96vw,1400px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
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
