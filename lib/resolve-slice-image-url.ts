/**
 * Shared image URL resolution for Prismic slices (About us / legacy hosts).
 * Keeps `ImageTextSection` and `GroupCeoFounder` in sync.
 */

export function resolveSliceImageUrl(
  url: string | undefined | null,
): string | undefined {
  if (!url) return undefined;
  return (
    mapTokaiAboutUsImageUrl(url) ??
    mapTokaiElpImageUrl(url) ??
    mapTokaiElpServicesImageUrl(url) ??
    mapTokaiTissamImageUrl(url) ??
    url
  );
}

/** Legacy tokai.com.my TISSAM page assets → local `/tissam/*` (for Prismic image fields). */
function mapTokaiTissamImageUrl(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, "") !== "tokai.com.my") return undefined;
    const file = u.pathname.split("/").pop() ?? "";
    if (file.startsWith("security_top")) return "/tissam/security_top.jpg";
    if (file.startsWith("tissam_flowchart")) return "/tissam/tissam_flowchart.png";
    if (file.startsWith("tissam_project")) return "/tissam/tissam_project.jpg";
    if (file.startsWith("tissam_atg")) return "/tissam/tissam_atg.jpg";
    if (file.startsWith("tissam_senstar")) return "/tissam/tissam_senstar.jpg";
    if (file.startsWith("tissam_indigo")) return "/tissam/tissam_indigo.jpg";
    return undefined;
  } catch {
    return undefined;
  }
}

function mapTokaiAboutUsImageUrl(url: string): string | undefined {
  const filename = (() => {
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, "");
      if (host !== "tokai.com.my") return null;
      return u.pathname.split("/").pop() ?? null;
    } catch {
      return null;
    }
  })();

  if (
    filename === "what.jpg" ||
    filename === "who.jpg" ||
    filename === "where.jpg" ||
    filename === "dato.png" ||
    filename === "28_years.png"
  ) {
    return `/about-us/${filename}`;
  }

  return undefined;
}

function mapTokaiElpImageUrl(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, "") !== "tokai.com.my") return undefined;
    const path = u.pathname;
    if (path.includes("elp_top")) return "/elp-solutions/elp_top.jpg";
    if (path.includes("elp_product")) return "/elp-solutions/elp_product.jpg";
    if (path.includes("contact.png")) return "/elp-solutions/contact.png";
    return undefined;
  } catch {
    return undefined;
  }
}

function mapTokaiElpServicesImageUrl(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (u.hostname.replace(/^www\./, "") !== "tokai.com.my") return undefined;
    const file = u.pathname.split("/").pop() ?? "";
    if (file.startsWith("services_top")) return "/elp-services/services_top.jpg";
    if (file.startsWith("services_mid")) return "/elp-services/services_mid.png";
    if (file.startsWith("cathodic")) return "/elp-services/cathodic.jpg";
    if (file.startsWith("shield")) return "/elp-services/shield.png";
    if (file.startsWith("sitesurvey")) return "/elp-services/elp-card-site-survey.jpg";
    if (file.startsWith("design")) return "/elp-services/elp-card-design.jpg";
    if (file.startsWith("install")) return "/elp-services/elp-card-installation.jpg";
    if (file.startsWith("training")) return "/elp-services/elp-card-training.jpg";
    return undefined;
  } catch {
    return undefined;
  }
}
