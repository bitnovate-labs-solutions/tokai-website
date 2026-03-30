import type { PagePayload } from "@/lib/page-types";
import { createClient, isPrismicConfigured } from "@/lib/prismicio";
import { getTokaiFallbackPage } from "@/lib/tokai-fallback-pages";

type PageData = {
  slices?: PagePayload["slices"];
  meta_title?: string | null;
  meta_description?: string | null;
};

export type { PagePayload };

/**
 * Loads a Prismic `page` document by UID. When the repository is not configured,
 * returns Tokai-approved fallback copy for known UIDs (local / staging only).
 */
export async function getPageByUid(uid: string): Promise<PagePayload | null> {
  if (!isPrismicConfigured()) {
    return getTokaiFallbackPage(uid);
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
    return null;
  }
}
