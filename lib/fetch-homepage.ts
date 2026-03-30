import {
  defaultHomepageMeta,
  defaultHomepageSlices,
} from "@/lib/default-homepage";
import type { PagePayload } from "@/lib/page-types";
import { createClient, isPrismicConfigured } from "@/lib/prismicio";

type HomepageData = {
  slices?: typeof defaultHomepageSlices;
  meta_title?: string | null;
  meta_description?: string | null;
};

export async function getHomepage(): Promise<PagePayload> {
  if (!isPrismicConfigured()) {
    return {
      slices: defaultHomepageSlices,
      metaTitle: defaultHomepageMeta.title,
      metaDescription: defaultHomepageMeta.description,
    };
  }

  try {
    const client = createClient();
    const doc = await client.getSingle("homepage");
    const data = doc.data as HomepageData;
    return {
      slices: (data.slices ?? defaultHomepageSlices) as PagePayload["slices"],
      metaTitle: data.meta_title ?? defaultHomepageMeta.title,
      metaDescription:
        data.meta_description ?? defaultHomepageMeta.description,
    };
  } catch {
    return {
      slices: defaultHomepageSlices,
      metaTitle: defaultHomepageMeta.title,
      metaDescription: defaultHomepageMeta.description,
    };
  }
}
