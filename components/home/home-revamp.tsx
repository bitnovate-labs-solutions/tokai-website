"use client";

import {
  ArrowRight,
  Buildings,
  FileText,
  Lightning,
  MapPin,
  Medal,
  ShieldCheck,
  Sun,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import { HomeHero } from "@/components/home/home-hero";
import { HomeStatsStrip } from "@/components/home/home-stats-strip";
import { LightningCalculator } from "@/components/home/lightning-calculator";

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E\")";

const CLIENT_LOGOS = [
  "/contact/logos/logo-1.png",
  "/contact/logos/logo-2.png",
  "/contact/logos/logo-3.png",
  "/contact/logos/logo-4.png",
  "/contact/logos/logo-5.png",
  "/contact/logos/logo-6.png",
  "/contact/logos/logo-7.jpg",
  "/contact/logos/logo-8.png",
  "/contact/logos/logo-10.png",
  "/contact/logos/logo-11.png",
  "/contact/logos/logo-12.png",
  "/contact/logos/logo-13.png",
] as const;

const AWARDS: { year: string; title: string }[] = [
  { year: "2024", title: "Vistage Malaysia CEO Leadership Award" },
  { year: "2023", title: "Asia Pacific Entrepreneurship Award" },
  { year: "2016", title: "BrandLaureate SMEs BestBrands Award" },
  { year: "2013", title: "Brand of the Year Award" },
  { year: "2013", title: "SME Product Excellence Award" },
  { year: "2006", title: "Golden Bull Award" },
  { year: "2003", title: "Enterprise 50 Award" },
];

const SERVICES = [
  {
    n: "01",
    title: "Lightning & Earthing",
    subtitle: "MS IEC 62305 Compliant",
    tags: ["E&LP", "Electronic Surge Protection", "Lightning Audit"],
    body:
      "Comprehensive lightning protection systems designed to safeguard mission-critical facilities from direct strikes, induced surges, and electrical disturbances. Our engineering covers lightning rods, down conductors, earth termination networks, surge protection devices, and pre-alert warning systems — all type-tested to MS IEC 62561 at 100kA.",
    foot: "Type-Tested to 100kA",
    FootIcon: Lightning,
    image: "/contact/lightning-banner.png",
    imageAlt: "Lightning protection engineering",
  },
  {
    n: "02",
    title: "Security Engineering",
    subtitle: "Hostile Vehicle Mitigation",
    tags: ["Crash-Rated Bollards", "Security Gates", "Road Blockers"],
    body:
      "Advanced perimeter protection for high-security environments. Our portfolio includes crash-rated HVM bollards (K4–K12), road blockers, security gates, and integrated perimeter systems — engineered to protect government facilities, commercial developments, transport infrastructure, and critical installations against modern vehicle-borne threats.",
    foot: "Crash-Rated K4 to K12",
    FootIcon: ShieldCheck,
    image: "/contact/bollards-banner.png",
    imageAlt: "Security perimeter engineering",
  },
  {
    n: "03",
    title: "Solar & Renewable",
    subtitle: "Commercial & Industrial EPC",
    tags: ["Solar PV Systems", "EPC Delivery", "C&I Installations", "Energy Infrastructure"],
    body:
      "Supporting Malaysia's energy transition through end-to-end solar and renewable energy solutions — from system design and EPC delivery to commercial and industrial installations. We support long-term energy performance with scalable infrastructure tailored for business operations. Registered under SEDA Malaysia as both RPVI and RPVSP.",
    foot: "SEDA RPVSP Registered",
    FootIcon: Sun,
    image: "/contact/solar-banner.png",
    imageAlt: "Solar PV installation Malaysia",
  },
  {
    n: "04",
    title: "Engineering Consultancy",
    subtitle: "CDEGS Modelling & Risk Assessment",
    tags: ["CDEGS Modelling", "Grounding Analysis", "Fault Simulations", "Lightning Risk"],
    body:
      "Specialist engineering consultancy for critical infrastructure. Our team delivers CDEGS modelling, grounding analysis, fault current simulation, and lightning risk assessment, plus compliance advisory and engineering due diligence from concept to commissioning.",
    foot: "MS IEC 62305 Risk Assessment",
    FootIcon: FileText,
    image: "/contact/engineering-built-to-protect.webp",
    imageAlt: "Engineering consultancy and design",
  },
] as const;

export function HomeRevamp() {
  return (
    <div className="relative bg-[#F2F3F0] text-[#0D1B2A] selection:bg-[#0D1B2A] selection:text-white">
      <div
        className="pointer-events-none fixed inset-0 z-[9000] opacity-[0.04]"
        style={{ backgroundImage: NOISE_SVG }}
        aria-hidden
      />

      <div className="relative z-10 mb-0 shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
        <HomeHero />

        <section
          className="border-b border-black/[0.06] bg-white px-6 py-16 md:px-12 md:py-20"
          aria-label="Client logos"
        >
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-10 text-center font-[family-name:var(--font-outfit)] text-sm tracking-[0.18em] text-gray-600 uppercase md:mb-12 md:text-base">
              Trusted nationwide in infrastructure & energy
            </p>
            <div className="client-logo-grid grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:gap-x-10 md:grid-cols-4 md:gap-y-12 lg:grid-cols-6">
              {CLIENT_LOGOS.map((src) => (
                <div
                  key={src}
                  className="client-logo-cell flex h-[3.25rem] w-full max-w-[11rem] items-center justify-center md:h-[3.5rem] md:max-w-[12rem]"
                >
                  <Image
                    src={src}
                    alt=""
                    width={180}
                    height={64}
                    className="client-logo-img max-h-full max-w-full object-contain opacity-85 grayscale transition-[opacity,filter] duration-[250ms] hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto grid max-w-[1600px] gap-16 bg-[#F2F3F0] px-6 py-32 md:grid-cols-2 md:px-20"
        >
          <div className="md:sticky md:top-32 z-10 self-start px-1 md:px-0">
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl md:min-h-[360px]">
              <Image
                src="/contact/built-to-protect-2.webp"
                alt="Engineering built to protect"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/75" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h2 className="font-[family-name:var(--font-outfit)] text-3xl leading-tight font-normal tracking-[-0.04em] text-white break-words md:text-5xl md:break-normal">
                  Engineering built <br />
                  to{" "}
                  <span className="text-[#D4870A]">protect.</span>
                </h2>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-2 text-xs font-normal tracking-widest text-gray-500 uppercase md:flex-row md:gap-4">
              <div className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)]">
                <Medal className="text-lg" />
                33 Years of Excellence
              </div>
              <div className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)]">
                <MapPin className="text-lg" />
                Malaysia & Region
              </div>
            </div>
          </div>
          <div className="text-lg leading-relaxed font-light text-gray-600 md:text-xl">
            <p className="mb-8">
              Tokai Engineering is a Malaysian specialist in critical infrastructure
              protection. Our certified teams deliver engineering solutions across
              lightning protection, hostile vehicle mitigation, and renewable energy
              — trusted by data centres, transport networks, and government
              facilities across the region.
            </p>
            <p className="mb-8">
              Founded in 1993 and headquartered in Shah Alam, we have grown from a
              specialist consultancy into one of Malaysia&apos;s most recognised
              infrastructure engineering firms. Every system we deliver is
              designed, built, and commissioned to international standards — with
              no compromise on safety or quality.
            </p>
            <div className="my-10 h-px w-full bg-black/10" />
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="mb-2 font-[family-name:var(--font-jetbrains)] text-xs font-normal tracking-widest text-[#0D1B2A] uppercase">
                  Headquarters
                </h4>
                <p className="text-sm text-gray-500">Shah Alam, Selangor</p>
              </div>
              <div>
                <h4 className="mb-2 font-[family-name:var(--font-jetbrains)] text-xs font-normal tracking-widest text-[#0D1B2A] uppercase">
                  Focus
                </h4>
                <p className="text-sm text-gray-500">Lightning · Security · Solar</p>
              </div>
              <div>
                <h4 className="mb-2 font-[family-name:var(--font-jetbrains)] text-xs font-normal tracking-widest text-[#0D1B2A] uppercase">
                  Standard
                </h4>
                <p className="text-sm text-gray-500">MS IEC 62305 · ISO 9001:2015</p>
              </div>
              <div>
                <h4 className="mb-2 font-[family-name:var(--font-jetbrains)] text-xs font-normal tracking-widest text-[#0D1B2A] uppercase">
                  Grade
                </h4>
                <p className="text-sm text-gray-500">CIDB G7 Contractor</p>
              </div>
            </div>
          </div>
        </section>

        <HomeStatsStrip />

        <section
          id="services"
          className="stack-section rounded-tl-[4rem] rounded-tr-[4rem] bg-[#111] py-10 text-[#F5F5F5]"
        >
          <div className="mb-24 px-6 text-center">
            <div className="mb-4 font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-gray-500 uppercase">
              Disciplines
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl font-normal tracking-[-0.04em] md:text-6xl">
              OUR EXPERTISE
            </h2>
          </div>

          <div className="stack-container relative mx-auto w-full max-w-[1400px] pb-[10vh]">
            {SERVICES.map((s) => {
              const FootIcon = s.FootIcon;
              return (
              <div
                key={s.n}
                className="card-item sticky top-[10vh] mb-[5vh] flex h-[80vh] w-full items-center justify-center md:top-[10vh]"
              >
                <div className="card-inner group grid h-full w-[90%] grid-cols-1 overflow-hidden rounded-sm border border-white/10 bg-[#1a1a1a] md:grid-cols-[1fr_1.2fr] md:rounded-tr-[2rem]">
                  <div className="card-content z-10 flex flex-col justify-between bg-[#1a1a1a] p-8 md:p-16">
                    <div>
                      <div className="mb-5 inline-block rounded border border-white/20 px-2 py-1 font-[family-name:var(--font-jetbrains)] text-xs text-gray-500">
                        {s.n}
                      </div>
                      <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-normal tracking-[-0.04em] text-white md:text-3xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-gray-500 uppercase">
                        {s.subtitle}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded-md border border-white/15 bg-white px-3 py-2 text-xs font-medium text-[#111827] md:text-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed font-light text-gray-400 md:text-base">
                      {s.body}
                    </p>
                    <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-gray-300 uppercase">
                        <FootIcon className="text-lg" />
                        {s.foot}
                      </div>
                      <Link
                        href="/our-solutions"
                        className="inline-flex items-center justify-center rounded-md bg-[#D4870A] px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-[#e39a2f]"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                  <div className="relative order-first h-[40%] min-h-[200px] w-full overflow-hidden md:order-none md:h-full">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      className="object-cover grayscale transition-[transform,filter] duration-[1.5s] ease-out group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] bg-[#F2F3F0] px-6 py-32 md:px-20">
          <div className="mb-16">
            <div className="mb-4 font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-gray-500 uppercase">
              Recognition & Standards
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-normal tracking-[-0.04em] text-[#0D1B2A] md:text-5xl">
              Engineering Excellence, Nationally Recognised.
            </h2>
          </div>

          <div className="grid gap-16 md:grid-cols-2">
            <div className="space-y-8 border-l-2 border-[#D4870A] pl-6">
              {AWARDS.map((a) => (
                <div key={`${a.year}-${a.title}`}>
                  <div className="mb-1 font-[family-name:var(--font-jetbrains)] text-xs tracking-wide text-[#D4870A] uppercase">
                    {a.year}
                  </div>
                  <div className="font-[family-name:var(--font-outfit)] text-sm font-normal text-[#0D1B2A] md:text-base">
                    {a.title}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex justify-center">
                <Image
                  src="/contact/built-to-protect.webp"
                  alt="Tokai Engineering awards and recognition"
                  width={480}
                  height={320}
                  className="max-h-80 w-full max-w-md object-contain"
                />
              </div>
              <div className="grid auto-rows-max grid-cols-2 gap-4 md:grid-cols-3">
                <Badge icon={Medal} text="ISO 9001:2015" />
                <Badge icon={Buildings} text="CIDB G7 Contractor" />
                <Badge icon={Lightning} text="MS IEC 62305" />
                <Badge icon={ShieldCheck} text="IEC 62561 · 100kA" />
                <Badge icon={Sun} text="SEDA RPVSP Registered" />
                <Badge icon={FileText} text="MOF Registered" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative z-10 flex flex-col items-center justify-center bg-[#F2F3F0] pt-20 pb-16 text-center"
        >
          <h2 className="mb-6 font-[family-name:var(--font-outfit)] text-3xl font-normal tracking-[-0.04em] text-[#0D1B2A] md:text-4xl">
            Ready to Protect Your Facility?
          </h2>
          <p className="mb-10 max-w-xl px-6 font-light leading-relaxed text-gray-600">
            Our engineering teams are available to assess your site, design a
            compliant protection system, and deliver it from concept to
            commissioning — anywhere in Malaysia.
          </p>
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-black/20" />
            <a
              href="#calculator"
              className="font-[family-name:var(--font-jetbrains)] text-xs tracking-widest text-gray-400 uppercase"
            >
              Scroll for risk tool
            </a>
          </div>
        </section>

        <LightningCalculator />

        <section className="relative overflow-hidden rounded-tl-[4rem] rounded-tr-[4rem] bg-[#0B1F3A] px-6 py-32 md:px-12">
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="group relative h-[500px] w-full overflow-hidden rounded-[2rem] md:h-[650px]">
              <Image
                src="/contact/built-to-protect-3.webp"
                alt="Malaysia skyline"
                fill
                className="object-cover opacity-80 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#0B1F3A]/30" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm text-white backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-[#E8A020]" />
                Est. 1993 · Shah Alam, Malaysia
              </div>
            </div>

            <div className="text-[#F4F5F0]">
              <span className="mb-6 block font-[family-name:var(--font-jetbrains)] text-sm tracking-[0.2em] text-[#E8A020] uppercase">
                Our Story
              </span>
              <h3 className="mb-8 font-[family-name:var(--font-outfit)] text-4xl leading-[1.1] font-normal tracking-tighter md:text-5xl">
                Built on a belief that infrastructure deserves better.
              </h3>
              <div className="mb-10 space-y-6 text-lg leading-relaxed font-light text-[#F4F5F0]/70">
                <p>
                  Tokai Engineering was founded in 1993 with the singular vision to
                  be the leading solution provider in the field of lightning and
                  surge protection. The name Tokai was coined as it was Dato&apos;
                  Ir. Jimmy&apos;s hometown, a small, rustic town located in
                  northern Peninsular Malaysia, in the state of Kedah.
                </p>
                <p>
                  Tokai started as a two-man operation offering specialized service
                  and consultation in the earthing, lightning and surge protection
                  industry. Since its inception, Tokai has grown from strength to
                  strength, winning numerous projects that have graced the skyline of
                  the nation. This is made possible through our unwavering focus to
                  provide quality consultation with total integrated safety solutions
                  that advance safety, protecting critical assets.
                </p>
              </div>

              <Link
                href="/about-us"
                className="inline-flex items-center gap-3 rounded-full border border-[#E8A020] px-6 py-3 text-sm text-[#E8A020] transition-colors duration-300 hover:bg-[#E8A020] hover:text-[#0B1F3A]"
              >
                Click here to read more
                <ArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Badge({ icon: Icon, text }: { icon: typeof Medal; text: string }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-sm border border-black/10 bg-white p-5 transition-shadow hover:shadow-lg">
      <Icon className="text-2xl text-[#D4870A]" />
      <span className="font-[family-name:var(--font-outfit)] text-xs leading-tight font-normal text-[#0D1B2A]">
        {text}
      </span>
    </div>
  );
}
