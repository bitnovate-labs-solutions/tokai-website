import type { SliceZoneLike } from "@prismicio/react";

import { h1, paragraph } from "@/lib/rich-text";

/**
 * Fallback homepage when Prismic is not configured or the Homepage singleton is missing.
 * Editorial baseline sourced from tokai.com.my (approved for reuse).
 */
export const defaultHomepageSlices = [
  {
    slice_type: "hero_split" as const,
    id: "tokai-hero",
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      eyebrow: "Our solutions",
      heading: h1("Protection and preservation for people, structures, and the grid."),
      body: paragraph(
        "Tokai’s systems and solutions are designed to offer front-line defence against destruction caused by lightning. Through strategic global partners, Tokai also designs structural deterrent and traffic management systems for counter-terrorism. Tokai champions renewable energy through solar applications—aligned with environmental protection and sustainability.",
      ),
      cta_label: "Explore solutions",
      cta_href: "/our-solutions",
      secondary_label: "Talk to our team",
      secondary_href: "/address-contact",
    },
    items: [],
  },
  {
    slice_type: "stats_row" as const,
    id: "tokai-stats",
    variation: "default" as const,
    version: "initial" as const,
    primary: {},
    items: [
      {
        label: "Global ranking for lightning activity (Malaysia)",
        value: "3rd",
      },
      {
        label: "Founded",
        value: "1993",
      },
      {
        label: "Focus",
        value: "Lightning · solar · security",
      },
    ],
  },
  {
    slice_type: "service_bento" as const,
    id: "tokai-bento",
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h1("Engineering disciplines that share one protection standard."),
      intro: paragraph(
        "From earthing and lightning protection to surge resilience, early lightning warning, and integrated security—Tokai delivers consultancy, design, and field verification as a single practice.",
      ),
    },
    items: [
      {
        title: "Earthing and lightning protection",
        description:
          "Structural protection and complete solutions for buildings, residential assets, and national transportation hubs.",
        icon: "lightning",
        accent: "amber",
      },
      {
        title: "Solar solutions",
        description:
          "Harnessing clean, sustainable energy for a greener built environment.",
        icon: "sun",
        accent: "amber",
      },
      {
        title: "Security engineering",
        description:
          "High-security bollards, perimeter systems, access control, and planning against terrorism threats to critical assets.",
        icon: "shield",
        accent: "slate",
      },
    ],
  },
  {
    slice_type: "text_section" as const,
    id: "tokai-audit",
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h1("Lightning audit for commercial and residential assets."),
      body: paragraph(
        "Malaysia adopted IEC 62305 as Malaysian Standard (MS IEC 62305), replacing BS 6651:1999. Tokai provides lightning audits including on-site review of earth termination networks, structural lightning protection, equipment and electrical earthing, and static discharge applications. Findings are analysed against governing standards; the risk assessment recommends measures to mitigate strike threat, with follow-up monitoring and testing to confirm system integrity.",
      ),
    },
    items: [],
  },
  {
    slice_type: "text_section" as const,
    id: "tokai-history",
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h1("Our history."),
      body: paragraph(
        "Tokai Engineering was founded in 1993 to be a leading solution provider in lightning and surge protection. The name Tokai honours Dato’ Ir. Jimmy’s hometown in northern Peninsular Malaysia. What began as a two-person consultancy in earthing, lightning, and surge protection has grown into nationwide projects across the skyline—driven by integrated safety solutions that protect critical assets.",
      ),
    },
    items: [],
  },
  {
    slice_type: "cta_band" as const,
    id: "tokai-cta",
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h1("Get in touch with Tokai."),
      body: paragraph(
        "World-class lightning protection, security engineering, and solar solutions—minimising downtime for national infrastructure. Speak with qualified personnel for consultation tailored to your site.",
      ),
      cta_label: "Talk to our team",
      cta_href: "/address-contact",
    },
    items: [],
  },
] as unknown as SliceZoneLike;

export const defaultHomepageMeta = {
  title: "Tokai — Lightning, Solar & Security Solutions",
  description:
    "Tokai Engineering: lightning and surge protection, solar solutions, and integrated security for Malaysia’s critical infrastructure since 1993.",
};
