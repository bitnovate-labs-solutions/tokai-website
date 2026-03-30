import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

export default function ContactPage() {
  return (
    <SiteChrome>
      <section className="min-h-[100dvh] bg-[#f7f6f3]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-4 py-32 md:grid-cols-2 md:px-8 md:py-40">
          <MotionReveal>
            <p className="mb-6 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
              Contact
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tighter text-zinc-950 md:text-6xl">
              Send drawings, not briefs.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-600">
              Wire a note to your facilities lead with single-line diagrams, soil
              cards, or strike history. We reply with a scoped review and a
              field window that respects your outage constraints.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.06}>
            <div className="rounded-[2rem] bg-zinc-200/40 p-2 ring-1 ring-zinc-950/5 shadow-[0_40px_80px_-48px_rgba(24,24,27,0.45)]">
              <div className="space-y-8 rounded-[calc(2rem-0.5rem)] bg-white p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-zinc-950/5">
                <div>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Technical desk
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-zinc-950">
                    fieldworks@tokai.example
                  </p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Response cadence
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-zinc-600">
                    Same-day acknowledgement on business days. Detailed written
                    review within three working days for standard packages.
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-zinc-500">
                  Replace the placeholder email with your production address, or
                  wire this block through Prismic as a dedicated slice.
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </SiteChrome>
  );
}
