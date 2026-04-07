"use client";

import type { ImageField, RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { asText } from "@prismicio/client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";

import { ElpScopeDrawerCards } from "@/components/elp-scope-drawer-cards";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  heading?: RichTextField;
  body?: RichTextField;
};

function getParagraphTexts(field: RichTextField): string[] {
  return (field ?? [])
    .filter((b) => b.type === "paragraph")
    .map((b) => ("text" in b ? String(b.text ?? "") : ""))
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Prismic may use list items or different block order; MVV copy still parses as plain lines. */
function getMvvBodyLines(field: RichTextField): string[] {
  const paragraphs = getParagraphTexts(field);
  if (paragraphs.length >= 3) {
    return paragraphs;
  }
  const full = asText(field ?? []).replace(/\u00a0/g, " ").trim();
  if (!full) {
    return paragraphs;
  }
  const byLabel = full
    .split(/(?=Our\s+(?:Vision|Mission|Values)\s*:)/i)
    .map((s) => s.trim())
    .filter(Boolean);
  if (byLabel.length >= 3) {
    return byLabel;
  }
  const byNl = full
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return byNl.length >= paragraphs.length ? byNl : paragraphs;
}

function isOurMissionVisionValuesHeading(heading: string, sliceId?: string): boolean {
  if (sliceId === "ab-mvv") {
    return true;
  }
  const n = heading
    .toLowerCase()
    .replace(/[\u2018\u2019\u201c\u201d]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (n === "our mission, vision and values") {
    return true;
  }
  const hasMission = /\bmission\b/i.test(heading);
  const hasVision = /\bvision\b/i.test(heading);
  const hasValues = /\bvalues\b/i.test(heading);
  const hasOur = /\bour\b/i.test(heading);
  return hasOur && hasMission && hasVision && hasValues && heading.length < 120;
}

function parseMvvCards(paragraphs: string[]) {
  const cards = [];
  for (const p of paragraphs) {
    const m = /^(Our\s+Vision|Our\s+Mission|Our\s+Values)\s*:\s*(.+)$/i.exec(p);
    if (m) {
      const label =
        m[1].toLowerCase().includes("vision")
          ? "Vision"
          : m[1].toLowerCase().includes("mission")
            ? "Mission"
            : "Values";
      cards.push({ label, text: m[2].trim() });
    }
  }

  // Fallback: take first 3 paragraphs as cards if formatting differs in Prismic.
  if (cards.length === 0) {
    return paragraphs.slice(0, 3).map((text, idx) => ({
      label: ["Vision", "Mission", "Values"][idx] ?? "Value",
      text,
    }));
  }

  return cards.slice(0, 3);
}

function splitIntoBullets(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  // Split into sentences, keeping it predictable for the Tokai MVV copy.
  // (Avoid complex NLP; we just want human-readable bullet points.)
  const parts = normalized
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/[.!?]$/, "").trim())
    .filter(Boolean);

  return parts;
}

function MvvCard({
  label,
  text,
  index,
  progress,
}: {
  label: string;
  text: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [28, -10 - index * 6]);
  const opacity = useTransform(progress, [0, 0.18, 1], [0, 1, 1]);
  const scale = useTransform(progress, [0, 1], [0.985, 1]);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-[0_18px_50px_-26px_rgba(0,0,0,0.35)] md:p-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_0%,rgba(251,191,36,0.22),transparent_55%),radial-gradient(80%_60%_at_80%_10%,rgba(59,130,246,0.10),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex min-h-[240px] flex-col md:min-h-[320px]">
        <p className="inline-flex w-fit rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-700">
          {label}
        </p>
        <p className="mt-5 text-base leading-relaxed text-zinc-700 md:text-[17px]">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

type MvvCardData = { label: string; text: string };

/**
 * `useScroll` must attach to a mounted element. Keeping it here avoids running
 * useScroll when SectionBlock returns null (e.g. empty pair_cards) or for
 * non-MVV variants — see https://motion.dev/troubleshooting/use-scroll-ref
 */
function MvvScrollSection({
  primary,
  mvvCards,
  mvvExtra,
}: {
  primary: Primary;
  mvvCards: MvvCardData[];
  mvvExtra: string | null;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.35"],
  });

  return (
    <div ref={sectionRef}>
        <MotionReveal>
        <div className="max-w-3xl">
          <SiteRichText field={primary.heading ?? []} variant="body" />
        </div>
      </MotionReveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
        {mvvCards.map((card, idx) => (
          <MvvCard
            key={card.label}
            label={card.label}
            text={card.text}
            index={idx}
            progress={scrollYProgress}
          />
        ))}
      </div>

      {mvvExtra ? (
        <MotionReveal delay={0.06}>
          <div className="mt-10 max-w-3xl">
            <motion.ul
              className="space-y-3 text-base leading-relaxed text-zinc-700"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.01, margin: "0px" }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {splitIntoBullets(mvvExtra).map((item) => (
                <motion.li
                  key={item}
                  className="flex gap-3"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 26,
                  }}
                >
                  <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600/80" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </MotionReveal>
      ) : null}
    </div>
  );
}

type PairCardItem = {
  heading: RichTextField;
  body: RichTextField;
  card_image?: ImageField | null;
};

const pairCardsContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const pairCardsItemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 22 },
  },
};

/** TISSAM “Mission Objectives” — stronger stagger, spring entrance, lift on hover. */
const missionPairCardsContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.14 },
  },
};

const missionPairCardsItemVariants = {
  hidden: { opacity: 0, y: 52, scale: 0.93 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 88,
      damping: 18,
      mass: 0.9,
    },
  },
};

export default function SectionBlock({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };
  const variation = (slice as { variation?: string }).variation;
  const pairCardItems =
    (slice as { items?: PairCardItem[] }).items?.filter(
      (row) => row.heading?.length && row.body?.length,
    ) ?? [];
  const sliceId = (slice as { id?: string }).id;
  const headingText = (asText(primary.heading ?? []) ?? "").trim();
  const isMvv = isOurMissionVisionValuesHeading(headingText, sliceId);
  const isCsrOverview = sliceId === "csr-overview" && !isMvv;
  const paragraphs = isMvv
    ? getMvvBodyLines(primary.body ?? [])
    : getParagraphTexts(primary.body ?? []);
  const mvvCards = useMemo(
    () => (isMvv ? parseMvvCards(paragraphs) : []),
    [isMvv, paragraphs],
  );
  const mvvExtra =
    isMvv && paragraphs.length > 3
      ? paragraphs.filter((p) => !/^(Our\s+Vision|Our\s+Mission|Our\s+Values)\s*:/i.test(p)).slice(-1)[0]
      : null;

  const csrIntroVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.11, delayChildren: 0.05 },
    },
  };

  const csrIntroItem = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 24 },
    },
  };

  const isPairCards = variation === "pair_cards" && pairCardItems.length > 0;
  const isMissionPairCards =
    sliceId === "tiss-mission" && isPairCards && pairCardItems.length > 0;
  const isScopeDrawerGrid =
    sliceId === "elps-scope-cards" &&
    pairCardItems.length === 4 &&
    pairCardItems.every((row) => row.card_image?.url?.trim());
  const pairCardsGridClass =
    pairCardItems.length === 1
      ? "mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 md:gap-8"
      : pairCardItems.length >= 4
        ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8"
        : "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8";
  const pairCardsImageSizes =
    pairCardItems.length >= 4
      ? "(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 25vw"
      : pairCardItems.length === 1
        ? "(max-width: 768px) 100vw, 768px"
        : "(max-width: 768px) 100vw, 50vw";

  const pairCardsSectionHeading = (asText(primary.heading ?? []) ?? "").trim();
  const pairCardsSectionBody = (asText(primary.body ?? []) ?? "").trim();
  const hasPairCardsSectionIntro =
    isPairCards &&
    !isScopeDrawerGrid &&
    (Boolean(pairCardsSectionHeading) || Boolean(pairCardsSectionBody));

  if (variation === "pair_cards" && pairCardItems.length === 0) {
    return null;
  }

  return (
    <section
      className={
        isCsrOverview
          ? "relative overflow-hidden bg-gradient-to-b from-[#fbfaf7] via-white to-white"
          : isMissionPairCards
            ? "relative overflow-hidden bg-gradient-to-b from-[#f4f2ed] via-[#f7f6f3] to-[#f7f6f3]"
            : isPairCards
              ? "bg-[#f7f6f3]"
              : "bg-white"
      }
    >
      {isCsrOverview ? (
        <>
          <div
            className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl"
            aria-hidden
          />
        </>
      ) : null}
      {isMissionPairCards ? (
        <>
          <div
            className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-amber-300/20 blur-[100px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-sky-400/15 blur-[90px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[min(90%,48rem)] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[80px]"
            aria-hidden
          />
        </>
      ) : null}
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <div>
          {isPairCards ? (
            isScopeDrawerGrid ? (
              <ElpScopeDrawerCards
                items={pairCardItems}
                sliceId={sliceId}
                imageSizes={pairCardsImageSizes}
              />
            ) : (
              <>
                {hasPairCardsSectionIntro ? (
                  <MotionReveal>
                    <div
                      className={
                        isMissionPairCards
                          ? "mb-12 max-w-3xl md:mb-16"
                          : "mb-10 max-w-3xl md:mb-12"
                      }
                    >
                      {pairCardsSectionHeading ? (
                        <div className="[&_h2]:font-[family-name:var(--font-outfit)] [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-950 md:[&_h2]:text-4xl">
                          <SiteRichText
                            field={primary.heading ?? []}
                            variant="body"
                          />
                        </div>
                      ) : null}
                      {pairCardsSectionBody ? (
                        <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600 md:text-[17px]">
                          <SiteRichText
                            field={primary.body ?? []}
                            contentWidth="full"
                          />
                        </div>
                      ) : null}
                    </div>
                  </MotionReveal>
                ) : null}
                <motion.div
                  className={pairCardsGridClass}
                  variants={
                    isMissionPairCards
                      ? missionPairCardsContainerVariants
                      : pairCardsContainerVariants
                  }
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.01, margin: "0px" }}
                >
                  {pairCardItems.map((item, idx) => {
                  const imgUrl = item.card_image?.url?.trim();
                  return (
                    <motion.div
                      key={`${sliceId}-card-${idx}`}
                      variants={
                        isMissionPairCards
                          ? missionPairCardsItemVariants
                          : pairCardsItemVariants
                      }
                      whileHover={
                        isMissionPairCards
                          ? {
                              y: -14,
                              scale: 1.025,
                              transition: {
                                type: "spring",
                                stiffness: 380,
                                damping: 22,
                              },
                            }
                          : {
                              y: -8,
                              transition: {
                                type: "spring",
                                stiffness: 320,
                                damping: 22,
                              },
                            }
                      }
                      className={`group relative h-full overflow-hidden rounded-3xl border bg-white shadow-[0_18px_50px_-26px_rgba(0,0,0,0.35)] ring-1 ring-zinc-950/[0.04] transition-shadow duration-500 ease-out ${
                        isMissionPairCards
                          ? "border-zinc-200/90 hover:border-amber-300/50 hover:shadow-[0_28px_70px_-32px_rgba(180,83,9,0.35)] hover:ring-2 hover:ring-amber-400/20"
                          : "border-zinc-200"
                      }`}
                    >
                      {isMissionPairCards ? (
                        <div
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          aria-hidden
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(251,191,36,0.14)_0%,transparent_42%,rgba(56,189,248,0.1)_100%)]" />
                          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/30 blur-3xl" />
                        </div>
                      ) : null}
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_0%,rgba(251,191,36,0.16),transparent_55%),radial-gradient(80%_60%_at_80%_10%,rgba(59,130,246,0.07),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      {imgUrl ? (
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                          <Image
                            src={imgUrl}
                            alt={item.card_image?.alt ?? ""}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            sizes={pairCardsImageSizes}
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-zinc-950/25 via-transparent to-transparent opacity-60"
                            aria-hidden
                          />
                        </div>
                      ) : null}
                      <div
                        className={`relative flex min-h-full flex-col space-y-5 ${
                          imgUrl ? "p-8 md:p-9" : "p-8 md:p-10"
                        }`}
                      >
                        <div className="[&_h2]:font-[family-name:var(--font-outfit)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-950 md:[&_h2]:text-3xl">
                          <SiteRichText field={item.heading} variant="body" />
                        </div>
                        <div className="space-y-4 text-base leading-relaxed text-zinc-600">
                          <SiteRichText field={item.body} contentWidth="full" />
                        </div>
                      </div>
                    </motion.div>
                  );
                  })}
                </motion.div>
              </>
            )
          ) : isMvv ? (
            <MvvScrollSection
              primary={primary}
              mvvCards={mvvCards}
              mvvExtra={mvvExtra}
            />
          ) : isCsrOverview ? (
            <motion.div
              className="relative max-w-3xl"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.01, margin: "0px" }}
              variants={csrIntroVariants}
            >
              <motion.div variants={csrIntroItem}>
                <SiteRichText field={primary.heading ?? []} variant="body" />
              </motion.div>
              <motion.div variants={csrIntroItem} className="mt-6 space-y-4">
                <SiteRichText field={primary.body ?? []} />
              </motion.div>
            </motion.div>
          ) : sliceId === "elp-compliance" ? (
            <MotionReveal>
              <div className="mx-auto max-w-3xl text-center">
                <SiteRichText field={primary.heading ?? []} variant="body" />
                <div className="mt-6 space-y-4 [&_p]:mx-auto">
                  <SiteRichText
                    field={primary.body ?? []}
                    contentWidth="full"
                  />
                </div>
              </div>
            </MotionReveal>
          ) : (
            <MotionReveal>
              <div className="max-w-3xl">
                <SiteRichText field={primary.heading ?? []} variant="body" />
                <div className="mt-6 space-y-4">
                  <SiteRichText field={primary.body ?? []} />
                </div>
              </div>
            </MotionReveal>
          )}
        </div>
      </div>
    </section>
  );
}
