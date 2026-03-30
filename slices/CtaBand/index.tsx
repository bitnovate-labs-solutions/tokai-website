"use client";

import type { ImageField, KeyTextField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { ContactCtaSection } from "@/components/contact-cta-section";

type Primary = {
  heading: RichTextField;
  body: RichTextField;
  cta_label: KeyTextField;
  cta_href: KeyTextField;
  aside_image?: ImageField | null;
};

export default function CtaBand({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };

  return (
    <ContactCtaSection
      heading={primary.heading}
      body={primary.body}
      cta_label={primary.cta_label}
      cta_href={primary.cta_href}
      aside_image={primary.aside_image}
    />
  );
}
