import type { Metadata } from "next";

import { PrismicSliceZone } from "@/components/prismic-slice-zone";
import { SiteChrome } from "@/components/site-chrome";
import { resolveEditorialsPage } from "@/lib/resolve-editorials";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await resolveEditorialsPage();
  return {
    title: page.metaTitle ?? "Editorials — Tokai",
    description: page.metaDescription ?? undefined,
  };
}

export default async function EditorialsPage() {
  const page = await resolveEditorialsPage();

  return (
    <SiteChrome>
      <PrismicSliceZone slices={page.slices} />
    </SiteChrome>
  );
}
