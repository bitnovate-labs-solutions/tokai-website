"use client";

import {
  ArrowDown,
  Lightning,
  ShieldCheck,
  SunDim,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { HeroSlide } from "@/lib/hero-data";
import { HERO_DATA } from "@/lib/hero-data";

const PILL_ICONS = {
  lightning: Lightning,
  security: ShieldCheck,
  solar: SunDim,
} as const;

const ROTATE_MS = 5000;

export function HomeHero({ slides = HERO_DATA }: { slides?: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index]!;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    timerRef.current = setInterval(advance, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance]);

  function onPillClick() {
    if (timerRef.current) clearInterval(timerRef.current);
    advance();
    timerRef.current = setInterval(advance, ROTATE_MS);
  }

  return (
    <section
      className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-black"
      id="hero"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.key}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={slide.imageSrc}
            alt={slide.imageAlt}
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full px-4 text-center text-white">
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="rounded-full border border-white/20 px-4 py-1 text-xs tracking-[0.3em] uppercase backdrop-blur-sm">
            Est. 1993 — Shah Alam, Malaysia
          </span>
        </motion.div>

        <div className="font-[family-name:var(--font-outfit)] text-[10vw] leading-[0.9] font-normal tracking-[-0.04em] text-white/90 md:text-[8vw]">
          <motion.div
            key={`${slide.key}-a`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <span className="block">{slide.titleLines[0]}</span>
          </motion.div>
          <motion.div
            key={`${slide.key}-b`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <span className="block">{slide.titleLines[1]}</span>
          </motion.div>
        </div>

        <motion.p
          key={slide.key + "-desc"}
          className="mx-auto mt-8 max-w-lg text-sm font-light text-gray-300 md:text-base"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {slide.description}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {slides.map((s) => {
            const Icon = PILL_ICONS[s.pillKey as keyof typeof PILL_ICONS] ?? Lightning;
            const active = s.key === slide.key;
            return (
              <button
                key={s.key}
                type="button"
                onClick={onPillClick}
                aria-label={`${s.pillLabel} (next slide)`}
                aria-current={active ? "true" : undefined}
                className={
                  active
                    ? "flex items-center gap-2 rounded border border-transparent bg-white px-3 py-1.5 text-[10px] tracking-widest text-[#0D1B2A] uppercase shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                    : "flex items-center gap-2 rounded border border-white/10 px-3 py-1.5 text-[10px] tracking-widest text-gray-400 uppercase transition-colors bg-black/20 hover:border-white/20"
                }
              >
                <Icon className="h-3.5 w-3.5" weight="regular" />
                {s.pillLabel}
              </button>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDown className="h-6 w-6" aria-hidden />
      </div>
    </section>
  );
}
