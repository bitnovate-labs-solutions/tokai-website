import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeaderMount } from "@/components/site-header-mount";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeaderMount />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
