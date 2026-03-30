import type { PagePayload } from "@/lib/page-types";
import {
  buildEditorialsPageSlices,
  editorialsMeta,
} from "@/lib/editorials-fallback";
import { getPageByUid } from "@/lib/fetch-page";
import { getTokaiFallbackPage } from "@/lib/tokai-fallback-pages";

function sliceCount(slices: unknown): number {
  return Array.isArray(slices) ? slices.length : 0;
}

/**
 * Editorials hub from Prismic (`page` UID `editorials`) when slices exist;
 * otherwise Tokai fallback. Same resolution pattern as Company Events.
 */
export async function resolveEditorialsPage(): Promise<PagePayload> {
  const fromCms = await getPageByUid("editorials");
  if (fromCms && sliceCount(fromCms.slices) > 0) {
    return fromCms;
  }

  const fromFallback = getTokaiFallbackPage("editorials");
  if (fromFallback && sliceCount(fromFallback.slices) > 0) {
    return fromFallback;
  }

  return {
    metaTitle: editorialsMeta.title,
    metaDescription: editorialsMeta.description,
    slices: buildEditorialsPageSlices() as PagePayload["slices"],
  };
}
