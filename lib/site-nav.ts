export type NavLink = { href: string; label: string; children?: NavLink[] };

/** Top-level nav link; optional `activeMatch` marks related routes active (e.g. CSR articles). */
export type NavLinkEntry = {
  kind: "link";
  href: string;
  label: string;
  activeMatch?: RegExp;
};

export type NavEntry =
  | NavLinkEntry
  | { kind: "group"; label: string; items: NavLink[] };

/** Highlights "Company Events" on the hub and all CSR event detail URLs. */
export const companyEventsNavActive = /^\/(company-events(\/|$)|csr-charity|csr_)/;

/** Highlights Editorials hub and editorial article paths (legacy slugs from tokai.com.my). */
export const editorialsNavActive =
  /^\/(editorials(\/|$)|tokaialras|editorial-spd-tmp-50ka-4|editorial-spd-tmp-320-4)(\/?|$)/;

/** Top-level navigation; keeps Tokai sub-pages grouped by section. */
export const navEntries: NavEntry[] = [
  {
    kind: "group",
    label: "About us",
    items: [
      { href: "/about-us", label: "Overview" },
      { href: "/csr-2", label: "CSR" },
    ],
  },
  {
    kind: "group",
    label: "Our solutions",
    items: [
      { href: "/our-solutions", label: "Overview" },
      {
        href: "/elp-solutions",
        label: "Earthing & lightning protection",
        children: [
          { href: "/elp-services", label: "E&LP Services" },
          { href: "/exothermic-welding", label: "Exothermic Welding" },
          {
            href: "/sccms",
            label: "Stray Current Corrosion Monitoring System (SCCMS)",
          },
        ],
      },
      { href: "/esp-solutions", label: "Electronic surge protection (ESP)" },
      { href: "/solar-solutions", label: "Solar solutions" },
      { href: "/tokai-wxline-lws", label: "Tokai-WXLine" },
      { href: "/risk-assessment", label: "Lightning audit" },
      {
        href: "/tokai-bollards-security-system",
        label: "Security bollards",
      },
    ],
  },
  {
    kind: "group",
    label: "Our Projects",
    items: [
      { href: "/projects", label: "Overview" },
      { href: "/gallery", label: "MRT Gallery" },
      { href: "/security-gallery", label: "Security Gallery" }
    ]
  },
  {
    kind: "group",
    label: "Awards",
    items: [
      { href: "/brand-laureate", label: "Brand Laureate" },
      { href: "/company-of-the-year", label: "Company of the Year" },
      { href: "/sme-recognition-award", label: "SME Recognition Award" },
      { href: "/golden-bull", label: "Golden Bull" },
      { href: "/enterprise-50", label: "Enterprise 50" },
      { href: "/apea", label: "APEA" },
    ],
  },
  {
    kind: "link",
    href: "/company-events",
    label: "Company Events",
    activeMatch: companyEventsNavActive,
  },
  {
    kind: "link",
    href: "/editorials",
    label: "Editorials",
    activeMatch: editorialsNavActive,
  },
  { kind: "link", href: "/address-contact", label: "Contact" },
];

export function isNavLinkActive(href: string, pathname: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isTopLevelLinkActive(
  entry: NavLinkEntry,
  pathname: string,
): boolean {
  if (entry.activeMatch) {
    return entry.activeMatch.test(pathname);
  }
  return isNavLinkActive(entry.href, pathname);
}

export function isPathInGroup(pathname: string, entry: NavEntry): boolean {
  if (entry.kind === "link") {
    return isNavLinkActive(entry.href, pathname);
  }
  return entry.items.some(
    (item) =>
      isNavLinkActive(item.href, pathname) ||
      (item.children?.some((child) => isNavLinkActive(child.href, pathname)) ??
        false),
  );
}
