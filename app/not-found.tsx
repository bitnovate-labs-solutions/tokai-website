import Link from "next/link";

import { SiteChrome } from "@/components/site-chrome";

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="mx-auto flex min-h-[70dvh] max-w-[1400px] flex-col justify-center px-4 py-24 md:px-8">
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
          This path is not published.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600">
          Check the UID in Prismic or return to the studio overview.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex w-max items-center gap-3 rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-[transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
        >
          Back to home
          <span className="text-xs" aria-hidden>
            ↗
          </span>
        </Link>
      </section>
    </SiteChrome>
  );
}
