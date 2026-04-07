import type { Metadata } from "next";

import { PrismicSliceZone } from "@/components/prismic-slice-zone";
import { SiteChrome } from "@/components/site-chrome";
import {
  defaultHomepageMeta,
  defaultHomepageSlices,
} from "@/lib/default-homepage";

/** Homepage is authored in code (`lib/default-homepage.ts`), not loaded from Prismic. */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: defaultHomepageMeta.title,
  description: defaultHomepageMeta.description,
};

export default function HomePage() {
  return (
    <SiteChrome>
      <PrismicSliceZone slices={defaultHomepageSlices} />
    </SiteChrome>
  );
}
