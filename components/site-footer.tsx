import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50/80">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-20 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-[family-name:var(--font-outfit)] text-lg font-semibold tracking-tight text-zinc-950">
            Tokai Engineering
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-600">
            Lightning and surge protection, solar solutions, and integrated
            security—protecting lives, structures, and critical assets since 1993.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm text-zinc-600">
          <Link
            href="/privacy"
            className="transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-zinc-950"
          >
            Privacy
          </Link>
          <Link
            href="/address-contact"
            className="transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-zinc-950"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
