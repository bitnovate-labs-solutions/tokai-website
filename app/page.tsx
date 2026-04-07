import type { Metadata } from "next";

import { HomeRevamp } from "@/components/home/home-revamp";
import { SiteChrome } from "@/components/site-chrome";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Tokai | Engineering Built to Protect",
  description:
    "Tokai Engineering: MS IEC 62305 lightning protection, security engineering, and solar solutions for Malaysia’s critical infrastructure since 1993.",
};

export default function HomePage() {
  return (
    <SiteChrome>
      <HomeRevamp />
    </SiteChrome>
  );
}
