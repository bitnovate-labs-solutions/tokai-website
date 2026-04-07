import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicSliceZone } from "@/components/prismic-slice-zone";
import { SiteChrome } from "@/components/site-chrome";
import { getPageByUid } from "@/lib/fetch-page";
import { CSR_ARTICLE_UIDS } from "@/lib/csr-articles-fallback";
import { TOKAI_PAGE_UIDS } from "@/lib/tokai-fallback-pages";

export const revalidate = 60;
// Allow rendering Prismic pages beyond the small set of pre-rendered fallback UIDs.
export const dynamicParams = true;

type Props = {
  params: Promise<{ uid: string }>;
};

const UIDS_WITH_DEDICATED_APP_ROUTES = new Set([
  "address-contact",
  "company-events",
  "editorials",
  ...CSR_ARTICLE_UIDS,
]);

export function generateStaticParams() {
  return TOKAI_PAGE_UIDS.filter((uid) => !UIDS_WITH_DEDICATED_APP_ROUTES.has(uid)).map(
    (uid) => ({ uid }),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { uid } = await params;
  const page = await getPageByUid(uid);
  if (!page) {
    return { title: "Not found" };
  }
  return {
    title: page.metaTitle ?? "Tokai",
    description: page.metaDescription ?? undefined,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { uid } = await params;
  const page = await getPageByUid(uid);
  if (!page || page.slices.length === 0) {
    notFound();
  }

  return (
    <SiteChrome>
      <PrismicSliceZone key={uid} slices={page.slices} />
    </SiteChrome>
  );
}
