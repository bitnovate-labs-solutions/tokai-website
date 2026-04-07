"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountTo(target: number, active: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 2000;
    function tick(now: number) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - (1 - p) ** 3;
      setV(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return v;
}

export function HomeStatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const years = useCountTo(33, inView);
  const projects = useCountTo(500, inView);

  return (
    <section
      ref={ref}
      className="stat-container bg-white px-6 py-20 md:px-20"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 md:grid-cols-5">
        <div className="flex flex-col justify-center border-zinc-200 md:border-r">
          <div className="font-[family-name:var(--font-outfit)] text-4xl font-normal tracking-[-0.04em] text-[#D4870A] md:text-5xl">
            {years}+
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-gray-400 uppercase">
            Years engineering
          </div>
        </div>
        <div className="flex flex-col justify-center border-zinc-200 md:border-r">
          <div className="font-[family-name:var(--font-outfit)] text-4xl font-normal tracking-[-0.04em] text-[#D4870A] md:text-5xl">
            {projects}+
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-gray-400 uppercase">
            Completed projects
          </div>
        </div>
        <StatFade inView={inView}>
          <div className="font-[family-name:var(--font-outfit)] text-4xl font-normal tracking-[-0.04em] text-[#D4870A] md:text-5xl">
            #3
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-gray-400 uppercase">
            Global lightning risk rank
          </div>
        </StatFade>
        <StatFade inView={inView}>
          <div className="font-[family-name:var(--font-outfit)] text-4xl font-normal tracking-[-0.04em] text-[#D4870A] md:text-5xl">
            100kA
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-gray-400 uppercase">
            Type-tested protection
          </div>
        </StatFade>
        <StatFade inView={inView} noBorder className="col-span-2 md:col-span-1">
          <div className="font-[family-name:var(--font-outfit)] text-4xl font-normal tracking-[-0.04em] text-[#D4870A] md:text-5xl">
            ISO 9001
          </div>
          <div className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-gray-400 uppercase">
            Quality certified
          </div>
        </StatFade>
      </div>
    </section>
  );
}

function StatFade({
  children,
  inView,
  className = "",
  noBorder,
}: {
  children: React.ReactNode;
  inView: boolean;
  className?: string;
  noBorder?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-center transition-all duration-700 ${noBorder ? "" : "border-zinc-200 md:border-r"} ${inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
