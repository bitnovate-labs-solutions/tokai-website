import type { Metadata } from "next";

import { PrismicSliceZone } from "@/components/prismic-slice-zone";
import { SiteChrome } from "@/components/site-chrome";
import { defaultHomepageMeta } from "@/lib/default-homepage";
import { getHomepage } from "@/lib/fetch-homepage";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage();
  return {
    title: page.metaTitle ?? defaultHomepageMeta.title,
    description: page.metaDescription ?? defaultHomepageMeta.description,
  };
}

export default async function HomePage() {
  const page = await getHomepage();

  return (
    <SiteChrome>
      <PrismicSliceZone slices={page.slices} />
    </SiteChrome>
  );
}
