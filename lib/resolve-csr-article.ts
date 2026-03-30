import { cache } from "react";

import type { PagePayload } from "@/lib/page-types";
import { getPageByUid } from "@/lib/fetch-page";
import { getTokaiFallbackPage } from "@/lib/tokai-fallback-pages";

function sliceCount(slices: unknown): number {
  return Array.isArray(slices) ? slices.length : 0;
}

/**
 * CSR article pages: Prismic `page` by UID when slices exist; otherwise Tokai fallback.
 * Cached per request so `generateMetadata` and the page share one load.
 */
export const resolveCsrArticlePage = cache(async function resolveCsrArticlePage(
  uid: string,
): Promise<PagePayload | null> {
  const fromCms = await getPageByUid(uid);
  if (fromCms && sliceCount(fromCms.slices) > 0) {
    return fromCms;
  }

  const fromFallback = getTokaiFallbackPage(uid);
  if (fromFallback && sliceCount(fromFallback.slices) > 0) {
    return fromFallback;
  }

  return null;
});
