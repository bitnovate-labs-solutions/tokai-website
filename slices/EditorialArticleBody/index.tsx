"use client";

import type { KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  intro: KeyTextField;
};

type Item = {
  section_heading: KeyTextField;
  body: RichTextField;
};

export default function EditorialArticleBody({ slice }: SliceComponentProps) {
  const { primary, items: rawItems } = slice as unknown as {
    primary: Primary;
    items: Item[];
  };
  const items = rawItems.filter((row) => row.body?.length);

  return (
    <section className="border-t border-zinc-200/70 bg-white text-zinc-800">
      <div className="mx-auto max-w-[50rem] px-4 py-12 md:px-6 md:py-16">
        {primary.intro?.trim() ? (
          <p className="mb-10 text-lg font-medium leading-relaxed text-zinc-700 md:text-xl">
            {primary.intro}
          </p>
        ) : null}

        <div className="space-y-10 md:space-y-12">
          {items.map((item, i) => (
            <div key={i}>
              {item.section_heading?.trim() ? (
                <h2 className="mb-4 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
                  {item.section_heading}
                </h2>
              ) : null}
              <div className="space-y-4 text-base leading-[1.7] text-zinc-700">
                <SiteRichText field={item.body} tone="light" contentWidth="full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
