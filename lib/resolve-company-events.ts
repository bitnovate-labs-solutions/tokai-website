import type { PagePayload } from "@/lib/page-types";
import {
  buildCompanyEventsPageSlices,
  companyEventsMeta,
} from "@/lib/company-events-fallback";
import { getPageByUid } from "@/lib/fetch-page";
import { getTokaiFallbackPage } from "@/lib/tokai-fallback-pages";

function sliceCount(slices: unknown): number {
  return Array.isArray(slices) ? slices.length : 0;
}

/**
 * Loads Company Events from Prismic (`page` UID `company-events`) when slices exist;
 * otherwise Tokai fallback (dev / no CMS). Safe default if both are empty.
 */
export async function resolveCompanyEventsPage(): Promise<PagePayload> {
  const fromCms = await getPageByUid("company-events");
  if (fromCms && sliceCount(fromCms.slices) > 0) {
    return fromCms;
  }

  const fromFallback = getTokaiFallbackPage("company-events");
  if (fromFallback && sliceCount(fromFallback.slices) > 0) {
    return fromFallback;
  }

  return {
    metaTitle: companyEventsMeta.title,
    metaDescription: companyEventsMeta.description,
    slices: buildCompanyEventsPageSlices() as PagePayload["slices"],
  };
}
