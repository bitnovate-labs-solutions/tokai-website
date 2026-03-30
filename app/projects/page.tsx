import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

const studies = [
  {
    site: "Harbor logistics canopy",
    scope: "Lightning attachment to tensile roof, PV string routing",
    year: "2024",
  },
  {
    site: "Regional data hall expansion",
    scope: "Grounding grid extension, LPS overlap with façade metals",
    year: "2023",
  },
  {
    site: "Highland research campus",
    scope: "Perimeter detection, solar carport earthing, CCTV spine",
    year: "2023",
  },
];

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
          <MotionReveal>
            <p className="mb-6 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
              Projects
            </p>
            <h1 className="max-w-3xl font-[family-name:var(--font-outfit)] text-4xl font-semibold leading-[1.05] tracking-tighter text-zinc-950 md:text-6xl">
              Selected studies where grounding and security had to agree.
            </h1>
          </MotionReveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
          <div className="divide-y divide-zinc-200/80 border-y border-zinc-200/80">
            {studies.map((row, i) => (
              <MotionReveal key={row.site} delay={i * 0.04}>
                <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:items-baseline md:gap-8">
                  <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.18em] text-zinc-500 md:col-span-2">
                    {row.year}
                  </p>
                  <h2 className="font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight text-zinc-950 md:col-span-4">
                    {row.site}
                  </h2>
                  <p className="text-base leading-relaxed text-zinc-600 md:col-span-6">
                    {row.scope}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
