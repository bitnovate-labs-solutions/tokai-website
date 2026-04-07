import { connection } from "next/server";

import type { PagePayload } from "@/lib/page-types";
import { createClient, isPrismicConfigured } from "@/lib/prismicio";
import { getTokaiFallbackPage } from "@/lib/tokai-fallback-pages";

type PageData = {
  slices?: PagePayload["slices"];
  meta_title?: string | null;
  meta_description?: string | null;
};

export type { PagePayload };

/** When `true`, never fetches Prismic for `page` documents — uses `lib/tokai-fallback-pages.ts` instead. */
export function isPageFallbackForced(): boolean {
  const v = process.env.PRISMIC_USE_PAGE_FALLBACK?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

/**
 * Loads a Prismic `page` document by UID. When the repository is not configured,
 * returns Tokai-approved fallback copy for known UIDs (local / staging only).
 */
export async function getPageByUid(uid: string): Promise<PagePayload | null> {
  // Next.js may otherwise read `process.env` at build/prerender time; `connection()`
  // ties this to the incoming request so production env (e.g. Vercel) is honored.
  await connection();

  const fallback = getTokaiFallbackPage(uid);
  if (!isPrismicConfigured() || isPageFallbackForced()) {
    return fallback;
  }

  try {
    const client = createClient();
    const doc = await client.getByUID("page", uid);
    const data = doc.data as PageData;
    return {
      slices: data.slices ?? [],
      metaTitle: data.meta_title ?? null,
      metaDescription: data.meta_description ?? null,
    };
  } catch {
    // If Prismic is misconfigured (token missing) or the doc isn't reachable,
    // use known Tokai fallback content so the dev environment still renders.
    return fallback;
  }
}
