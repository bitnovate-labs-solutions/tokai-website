import { SiteHeader } from "@/components/site-header";

/**
 * Do not pass `key={pathname}` here: `usePathname()` can disagree between SSR and the
 * first client render, which breaks hydration. `SiteHeader` resets nav state in an
 * effect when `pathname` changes instead.
 */
export function SiteHeaderMount() {
  return <SiteHeader />;
}
