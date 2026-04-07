"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Revalidates the current route after history navigation or bfcache restore.
 * Without this, App Router + client cache can show a stale `/[uid]` tree after Back
 * (e.g. /tissam → Back → /tokai-bollards-security-system).
 */
export function NavigationCacheRefresh() {
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const scheduleRefresh = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = undefined;
        router.refresh();
      }, 50);
    };

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) scheduleRefresh();
    };

    window.addEventListener("popstate", scheduleRefresh);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.removeEventListener("popstate", scheduleRefresh);
      window.removeEventListener("pageshow", onPageShow);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [router]);

  return null;
}
