export type HeroSlide = {
  key: string;
  imageSrc: string;
  imageAlt: string;
  pillKey: string;
  pillLabel: string;
  titleLines: [string, string];
  description: string;
};

/** Hero rotator — images under `public/contact/`. */
export const HERO_DATA: HeroSlide[] = [
  {
    key: "lightning",
    imageSrc: "/contact/lightning-banner.png",
    imageAlt: "Lightning storm over skyline",
    pillKey: "lightning",
    pillLabel: "Lightning Protection",
    titleLines: ["LIGHTNING", "PROTECTION"],
    description:
      "MS IEC 62305 compliant systems engineered for critical infrastructure — from type-tested air terminals and earthing networks to surge protection and commissioning.",
  },
  {
    key: "security",
    imageSrc: "/contact/bollards-banner.png",
    imageAlt: "Crash-rated perimeter security bollards",
    pillKey: "security",
    pillLabel: "Security Engineering",
    titleLines: ["SECURITY", "ENGINEERING"],
    description:
      "Hostile vehicle mitigation and perimeter hardening for high-risk sites — crash-rated bollards, road blockers, gates, and integrated access control built to perform.",
  },
  {
    key: "solar",
    imageSrc: "/contact/solar-banner.png",
    imageAlt: "Solar energy installation at sunset",
    pillKey: "solar",
    pillLabel: "Solar & Renewable",
    titleLines: ["SOLAR &", "RENEWABLE"],
    description:
      "Commercial and industrial solar PV EPC — engineered for uptime, safety, and long-term yield with performance monitoring and compliance support across Malaysia.",
  },
];
