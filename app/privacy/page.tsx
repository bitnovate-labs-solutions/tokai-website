import { SiteChrome } from "@/components/site-chrome";

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <section className="mx-auto max-w-[65ch] px-4 py-32 md:px-8 md:py-40">
        <h1 className="font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-zinc-950">
          Privacy
        </h1>
        <p className="mt-6 text-base leading-relaxed text-zinc-600">
          Placeholder policy copy. Replace with counsel-approved language and,
          if needed, a Prismic singleton for legal pages so editors can publish
          revisions without redeploying.
        </p>
      </section>
    </SiteChrome>
  );
}
