import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicSliceZone } from "@/components/prismic-slice-zone";
import { SiteChrome } from "@/components/site-chrome";
import { resolveCsrArticlePage } from "@/lib/resolve-csr-article";

const UID = "csr-charity-drive-for-scas-ft-2022";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await resolveCsrArticlePage(UID);
  if (!page) {
    return { title: "Not found" };
  }
  return {
    title: page.metaTitle ?? "Tokai",
    description: page.metaDescription ?? undefined,
  };
}

export default async function CsrCharityDrivePage() {
  const page = await resolveCsrArticlePage(UID);
  if (!page || !page.slices?.length) {
    notFound();
  }

  return (
    <SiteChrome>
      <PrismicSliceZone slices={page.slices} />
    </SiteChrome>
  );
}
