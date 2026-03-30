"use client";

import type { ImageField, RichTextField, KeyTextField } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
  type SliceComponentProps,
} from "@prismicio/react";
import type { RichTextComponents } from "@prismicio/react";
import Image from "next/image";
import { motion } from "framer-motion";

import { MotionReveal } from "@/components/motion-reveal";
import { SiteRichText } from "@/components/prismic-rich";

const exoDiagramLineVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 130, damping: 24 },
  },
};

/** Staggered lines, no list bullets — for Typical cross section diagram labels. */
const exoDiagramRichTextComponents: RichTextComponents = {
  paragraph: ({ children }) => (
    <motion.p
      variants={exoDiagramLineVariants}
      className="text-[15px] leading-snug text-zinc-600 md:text-base md:leading-relaxed"
    >
      {children}
    </motion.p>
  ),
  heading2: ({ children }) => (
    <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950">
      {children}
    </h2>
  ),
  hyperlink: ({ node, children }) => (
    <PrismicLink
      field={node.data}
      className="font-semibold text-sky-800 underline decoration-sky-700/70 underline-offset-[3px] transition-colors hover:text-sky-950 hover:decoration-sky-900"
    >
      {children}
    </PrismicLink>
  ),
  list: ({ children }) => (
    <ul className="list-none space-y-2.5 pl-0 [&>li]:pl-0">{children}</ul>
  ),
  listItem: ({ children }) => (
    <motion.li
      variants={exoDiagramLineVariants}
      className="text-[15px] leading-snug text-zinc-600 md:text-base md:leading-relaxed"
    >
      {children}
    </motion.li>
  ),
  oList: ({ children }) => (
    <ol className="list-none space-y-2.5 pl-0 [&>li]:list-none">{children}</ol>
  ),
};

type Primary = {
  eyebrow: KeyTextField;
  heading: RichTextField;
  body: RichTextField;
  image?: ImageField;
  /** Local path or URL to MP4; when set, video replaces the image column. */
  video_url?: KeyTextField;
  /** Plain caption under the image column (e.g. Exothermic benefits layout). */
  image_caption?: KeyTextField;
};

function mapTokaiAboutUsImageUrl(url?: string): string | undefined {
  if (!url) return undefined;

  // Tokai's Prismic content sometimes references the original site assets.
  // We download those assets into `public/about-us/` so rendering is
  // reliable even if the external host blocks hotlinking or remote fetches.
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

/** Map legacy WordPress E&LP assets to `public/elp-solutions/` (hotlink-safe). */
function mapTokaiElpImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
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

/** Legacy WordPress E&LP Services assets → `public/elp-services/`. */
function mapTokaiElpServicesImageUrl(url?: string): string | undefined {
  if (!url) return undefined;
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

function isAboutUsTrioSlice(sliceId: string | undefined, resolvedUrl?: string) {
  if (sliceId && ["ab-what", "ab-who", "ab-where"].includes(sliceId)) {
    return true;
  }
  if (!resolvedUrl) return false;
  return /\/(what|who|where)\.jpg$/i.test(resolvedUrl);
}

const SOLUTIONS_PILLAR_IDS = ["os-elp", "os-esp", "os-tbat", "os-tissam"] as const;

function isSolutionsPillarSlice(sliceId: string | null | undefined) {
  return Boolean(
    sliceId &&
      SOLUTIONS_PILLAR_IDS.includes(sliceId as (typeof SOLUTIONS_PILLAR_IDS)[number]),
  );
}

const aboutTrioGridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

const aboutTrioLeftStackVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.02 },
  },
};

const aboutTrioLeftItemVariants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 26 },
  },
};

const aboutTrioRightColVariants = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 26,
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const aboutTrioImageWrapVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 20 },
  },
};

const aboutTrioTextBlockVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 130, damping: 24 },
  },
};

export default function ImageTextSection({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };
  const sliceId = (slice as { id?: string }).id;
  const variation = (slice as { variation?: string }).variation;
  const img = primary.image;
  const resolvedImgUrl =
    mapTokaiAboutUsImageUrl(img?.url ?? undefined) ??
    mapTokaiElpImageUrl(img?.url ?? undefined) ??
    mapTokaiElpServicesImageUrl(img?.url ?? undefined) ??
    img?.url ??
    undefined;
  const isFounderPortrait =
    resolvedImgUrl === "/about-us/dato.png" ||
    resolvedImgUrl?.endsWith("/dato.png") === true;
  const is28YearsImage =
    resolvedImgUrl === "/about-us/28_years.png" ||
    resolvedImgUrl?.endsWith("/28_years.png") === true;
  const isSolutionsPillar = isSolutionsPillarSlice(sliceId);
  const isSolutionsTop = sliceId === "os-top" || sliceId === "elp-top";
  const videoSrc = primary.video_url?.trim();
  const isAboutTrio =
    isAboutUsTrioSlice(sliceId, resolvedImgUrl) &&
    !isFounderPortrait &&
    !is28YearsImage;
  const isTrioStyle = (isAboutTrio || isSolutionsPillar) && !isSolutionsTop;
  /** Tall portrait diagram (TokaiWeld cross-section PNG ~668×1024) — avoid 4:3 crop. */
  const isExoCrossSectionDiagram = sliceId === "exo-diagram";
  /** Benefits copy left, image right (Exothermic). */
  const isExoBenefitsTextImageRow = sliceId === "exo-benefits-img";
  /** Stack adjacent image+text slices without double `py-24/40` gap (E&LP Services, Exothermic, SCCMS). */
  const tightStackPadding =
    sliceId === "elps-cathodic" ||
    sliceId === "exo-diagram" ||
    sliceId === "sccms-overview-img"
      ? "pt-20 pb-10 md:pt-28 md:pb-12"
      : sliceId === "sccms-mrt"
        ? "pt-12 pb-10 md:pt-14 md:pb-12"
        : sliceId === "elps-shield" ||
            sliceId === "exo-benefits-img" ||
            sliceId === "sccms-scope"
          ? "pt-12 pb-20 md:pt-14 md:pb-32"
          : null;
  /** Catalogue strip directly under hero (Exothermic, SCCMS) — distinct background. */
  const isCatalogueDownloadBand =
    sliceId === "exo-catalogue" || sliceId === "sccms-catalogue";
  const imageTextBlockPadding = isTrioStyle
    ? "py-16 md:py-24"
    : isCatalogueDownloadBand
      ? "py-14 md:py-20"
      : tightStackPadding ?? "py-24 md:py-40";

  if (variation === "full_width_video" && videoSrc) {
    return (
      <section className="relative isolate min-h-[min(78vh,880px)] w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-950/55 via-zinc-950/35 to-zinc-950/70"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_100%,rgba(9,9,11,0.75),transparent_55%)]"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[min(78vh,880px)] max-w-[1400px] items-center justify-center px-4 py-16 md:px-8 md:py-24">
          <motion.div
            className="w-full max-w-xl rounded-[2rem] border border-white/25 bg-white/12 p-8 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-2xl ring-1 ring-white/10 md:max-w-2xl md:p-11 lg:max-w-3xl lg:p-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              type: "spring" as const,
              stiffness: 120,
              damping: 24,
            }}
          >
            {primary.eyebrow?.trim() ? (
              <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.22em] text-white/90">
                {primary.eyebrow}
              </p>
            ) : null}
            <div className="space-y-6">
              <SiteRichText field={primary.heading} tone="dark" contentWidth="full" />
              <SiteRichText field={primary.body} tone="dark" contentWidth="full" />
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  if (isSolutionsTop && (resolvedImgUrl || videoSrc)) {
    return (
      <section className="bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 md:py-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              type: "spring" as const,
              stiffness: 120,
              damping: 24,
            }}
          >
            <div className="relative aspect-[4/1] w-full overflow-hidden rounded-[2rem] bg-zinc-200/40 ring-1 ring-zinc-950/5">
              {videoSrc ? (
                <video
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover opacity-95"
                />
              ) : (
                <Image
                  src={resolvedImgUrl!}
                  alt={img?.alt ?? ""}
                  fill
                  className="object-cover opacity-95"
                  sizes="100vw"
                  priority={false}
                />
              )}
            </div>
            <div className="mx-auto mt-10 max-w-3xl space-y-4 text-center">
              <SiteRichText field={primary.heading} />
              <SiteRichText field={primary.body} />
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const imageNode = resolvedImgUrl ? (
    isFounderPortrait ? (
      <Image
        src={resolvedImgUrl}
        alt={img?.alt ?? ""}
        fill
        className="h-full w-full object-contain opacity-95"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={false}
      />
    ) : is28YearsImage ? (
      <div className="absolute inset-6 md:inset-8">
        <Image
          src={resolvedImgUrl}
          alt={img?.alt ?? ""}
          fill
          className="h-full w-full object-contain opacity-95"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />
      </div>
    ) : isSolutionsPillar ? (
      <Image
        src={resolvedImgUrl}
        alt={img?.alt ?? ""}
        fill
        className="h-full w-full object-contain object-center opacity-95"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={false}
      />
    ) : isExoCrossSectionDiagram ? (
      <Image
        src={resolvedImgUrl}
        alt={img?.alt ?? ""}
        fill
        className="h-full w-full object-contain object-center opacity-95"
        sizes="(max-width: 1024px) 100vw, 42vw"
        priority={false}
      />
    ) : (
      <Image
        src={resolvedImgUrl}
        alt={img?.alt ?? ""}
        fill
        className="h-full w-full object-cover opacity-95"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={false}
      />
    )
  ) : (
    <div
      className="h-full w-full bg-[radial-gradient(120%_80%_at_20%_0%,rgba(251,191,36,0.35),transparent),radial-gradient(90%_70%_at_80%_30%,rgba(148,163,184,0.35),transparent),linear-gradient(160deg,#18181b,#09090b)]"
      role="img"
      aria-label=""
    />
  );

  const mediaNode =
    videoSrc && !isFounderPortrait ? (
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={
          isSolutionsPillar
            ? "h-full w-full object-contain object-center opacity-95"
            : "h-full w-full object-cover opacity-95"
        }
      />
    ) : (
      imageNode
    );

  const mediaShellClass = isFounderPortrait
    ? "relative h-[520px] overflow-hidden px-8 py-12 md:h-[640px] md:px-12 md:py-14"
    : isSolutionsPillar
      ? "relative aspect-[521/113] overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-950/5"
      : videoSrc && !isFounderPortrait
        ? "relative aspect-video w-full overflow-hidden rounded-[2rem] bg-zinc-950 ring-1 ring-zinc-950/5"
        : isExoCrossSectionDiagram
          ? "relative h-[min(78vh,900px)] w-full overflow-hidden rounded-[2rem] bg-white ring-1 ring-zinc-950/5 md:h-[min(86vh,1024px)]"
          : "relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-zinc-200/40 ring-1 ring-zinc-950/5";

  return (
    <section
      className={
        isFounderPortrait
          ? "bg-[radial-gradient(120%_80%_at_50%_0%,rgba(245,158,11,0.09),transparent_52%),linear-gradient(180deg,#27272a_0%,#0c0c0e_55%,#09090b_100%)] text-zinc-100"
          : isCatalogueDownloadBand
            ? "border-y border-emerald-900/10 bg-gradient-to-b from-emerald-50/95 via-[#eef4f1] to-[#e3ebe6]"
            : "bg-[#f7f6f3]"
      }
    >
      <div
        className={`mx-auto max-w-[1400px] px-4 md:px-8 ${imageTextBlockPadding}`}
      >
        {isTrioStyle ? (
          <motion.div
            className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-12% 0px" }}
            variants={aboutTrioGridVariants}
          >
            <motion.div className="lg:col-span-5" variants={aboutTrioLeftStackVariants}>
              {primary.eyebrow?.trim() ? (
                <motion.p
                  className="mb-6 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-700"
                  variants={aboutTrioLeftItemVariants}
                >
                  {primary.eyebrow}
                </motion.p>
              ) : null}

              <motion.div
                className={`group ${mediaShellClass}`}
                variants={aboutTrioImageWrapVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] ring-1 ring-inset ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {mediaNode}
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={aboutTrioRightColVariants}
            >
              <motion.div variants={aboutTrioTextBlockVariants}>
                <SiteRichText field={primary.heading} />
              </motion.div>
              <motion.div variants={aboutTrioTextBlockVariants}>
                <SiteRichText field={primary.body} />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : isExoBenefitsTextImageRow ? (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <MotionReveal className="lg:col-span-7">
              <div className="space-y-6">
                <div className="space-y-4">
                  {primary.eyebrow?.trim() ? (
                    <p className="inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-700">
                      {primary.eyebrow}
                    </p>
                  ) : null}
                  <SiteRichText
                    field={primary.heading}
                    tone={isFounderPortrait ? "dark" : "light"}
                  />
                </div>
                <SiteRichText
                  field={primary.body}
                  tone={isFounderPortrait ? "dark" : "light"}
                />
              </div>
            </MotionReveal>
            <MotionReveal className="lg:col-span-5" delay={0.06}>
              <div>
                <div className={mediaShellClass}>{mediaNode}</div>
                {primary.image_caption?.trim() ? (
                  <p className="mt-5 text-base leading-relaxed text-zinc-600">
                    {primary.image_caption}
                  </p>
                ) : null}
              </div>
            </MotionReveal>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 ${
              isExoCrossSectionDiagram
                ? "items-start lg:items-stretch"
                : "items-start"
            }`}
          >
            <MotionReveal className="lg:col-span-5">
              {primary.eyebrow?.trim() ? (
                <p
                  className={
                    isFounderPortrait
                      ? "mb-6 inline-flex rounded-full bg-white/10 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-300"
                      : "mb-6 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-700"
                  }
                >
                  {primary.eyebrow}
                </p>
              ) : null}

              <div className={mediaShellClass}>
                {mediaNode}

                {isFounderPortrait && (img?.alt?.trim() ?? "") ? (
                  <div className="pointer-events-none absolute inset-x-8 bottom-10 flex justify-center md:inset-x-12 md:bottom-12">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-zinc-950/70 px-4 py-2.5 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.65)] backdrop-blur-md">
                      <span className="font-[family-name:var(--font-jetbrains)] text-[11px] font-semibold uppercase tracking-[0.26em] text-white">
                        Group CEO / Founder
                      </span>
                      <span className="h-4 w-px bg-zinc-400/40" />
                      <span className="text-sm font-semibold text-white">
                        {img?.alt}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </MotionReveal>

            <MotionReveal className="lg:col-span-7" delay={0.06}>
              <div className="space-y-6">
                <SiteRichText
                  field={primary.heading}
                  tone={isFounderPortrait ? "dark" : "light"}
                />
                {isExoCrossSectionDiagram ? (
                  <motion.div
                    className="space-y-2.5 md:space-y-3"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10% 0px" }}
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.06,
                        },
                      },
                    }}
                  >
                    <PrismicRichText
                      field={primary.body}
                      components={exoDiagramRichTextComponents}
                    />
                  </motion.div>
                ) : (
                  <SiteRichText
                    field={primary.body}
                    tone={isFounderPortrait ? "dark" : "light"}
                  />
                )}
              </div>
            </MotionReveal>
          </div>
        )}
      </div>
    </section>
  );
}
