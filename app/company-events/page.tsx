import type { Metadata } from "next";

import { PrismicSliceZone } from "@/components/prismic-slice-zone";
import { SiteChrome } from "@/components/site-chrome";
import { resolveCompanyEventsPage } from "@/lib/resolve-company-events";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await resolveCompanyEventsPage();
  return {
    title: page.metaTitle ?? "Company Events — Tokai",
    description: page.metaDescription ?? undefined,
  };
}

export default async function CompanyEventsPage() {
  const page = await resolveCompanyEventsPage();

  return (
    <SiteChrome>
      <PrismicSliceZone slices={page.slices} />
    </SiteChrome>
  );
}
