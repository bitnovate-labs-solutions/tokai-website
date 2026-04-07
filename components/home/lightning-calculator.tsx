"use client";

import {
  ArrowRight,
  ShieldCheck,
  Warning,
  WarningOctagon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

const FACILITY = [
  "Data Centre / Server Room",
  "Commercial Building (5+ floors)",
  "Industrial Factory / Warehouse",
  "Government / Infrastructure",
] as const;

const PROTECTION = [
  "No existing system",
  "Outdated system (10+ years)",
  "Partial system installed",
  "Full certified system",
] as const;

const LOCATION = [
  "Klang Valley",
  "Johor / South",
  "Penang / North",
  "East Malaysia / Other",
] as const;

export function LightningCalculator() {
  const [step, setStep] = useState(1);
  const [facility, setFacility] = useState(0);
  const [protection, setProtection] = useState(0);
  const [location, setLocation] = useState(0);

  const progressPct =
    step === 4 ? 100 : step === 1 ? 33 : step === 2 ? 66 : step === 3 ? 99 : 33;

  function showResults() {
    setStep(4);
  }

  function reset() {
    setStep(1);
    setFacility(0);
    setProtection(0);
    setLocation(0);
  }

  const managed = protection === 3;
  const moderate = protection === 2;
  const highRisk = protection === 0 || protection === 1;

  return (
    <section
      className="relative z-40 bg-[#F4F5F0] px-6 py-32 md:px-12"
      id="calculator"
    >
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-[#0B1F3A] p-8 text-[#F4F5F0] shadow-2xl md:p-12">
        <div className="pointer-events-none absolute top-0 right-0 p-12 opacity-5">
          <WarningOctagon className="h-[20rem] w-[20rem] text-white" weight="fill" />
        </div>

        <div className="relative z-10 mb-10 text-center">
          <span className="mb-4 block font-[family-name:var(--font-jetbrains)] text-sm font-normal tracking-[0.2em] text-[#E8A020] uppercase">
            Free risk assessment tool
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-outfit)] text-4xl font-normal tracking-tighter md:text-5xl">
            Is Your Building Protected?
          </h2>
          <p className="mx-auto max-w-lg text-base font-light text-[#F4F5F0]/70">
            Malaysia ranks 3rd globally for lightning activity. Answer 3 quick
            questions to discover your exposure level.
          </p>
        </div>

        <div className="relative z-10">
          <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-[#F4F5F0]/10">
            <div
              className="h-full bg-[#E8A020] transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h4 className="mb-6 font-[family-name:var(--font-outfit)] text-xl">
                1. What type of facility are you operating?
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {FACILITY.map((label, i) => (
                  <RadioRow
                    key={label}
                    name="facility"
                    checked={facility === i}
                    onChange={() => setFacility(i)}
                    label={label}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-8 w-full rounded-full bg-[#E8A020] py-3 font-normal text-[#0B1F3A] transition-colors hover:bg-[#F4F5F0]"
              >
                Continue to Step 2
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="mb-6 font-[family-name:var(--font-outfit)] text-xl">
                2. Current level of lightning protection?
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {PROTECTION.map((label, i) => (
                  <RadioRow
                    key={label}
                    name="protection"
                    checked={protection === i}
                    onChange={() => setProtection(i)}
                    label={label}
                  />
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 rounded-full border border-[#F4F5F0]/20 py-3 text-[#F4F5F0] transition-colors hover:bg-[#F4F5F0]/10"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 rounded-full bg-[#E8A020] py-3 font-normal text-[#0B1F3A] transition-colors hover:bg-[#F4F5F0]"
                >
                  Continue to Step 3
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="mb-6 font-[family-name:var(--font-outfit)] text-xl">
                3. Facility Location in Malaysia?
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {LOCATION.map((label, i) => (
                  <RadioRow
                    key={label}
                    name="location"
                    checked={location === i}
                    onChange={() => setLocation(i)}
                    label={label}
                  />
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 rounded-full border border-[#F4F5F0]/20 py-3 text-[#F4F5F0] transition-colors hover:bg-[#F4F5F0]/10"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={showResults}
                  className="w-2/3 rounded-full bg-[#E8A020] py-3 font-normal text-[#0B1F3A] transition-colors hover:bg-[#F4F5F0]"
                >
                  Reveal My Risk Profile
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-6 text-center">
              {managed && (
                <>
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-4xl text-green-500 shadow-lg">
                    <ShieldCheck className="h-10 w-10" weight="fill" />
                  </div>
                  <h3 className="mb-4 font-[family-name:var(--font-outfit)] text-3xl font-normal text-[#F4F5F0]">
                    MANAGED RISK
                  </h3>
                  <p className="mx-auto mb-8 max-w-md leading-relaxed text-[#F4F5F0]/70">
                    Your current setup appears reasonable. A professional
                    verification ensures full compliance with IEC standards.
                  </p>
                </>
              )}
              {moderate && (
                <>
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 text-4xl text-yellow-500 shadow-lg">
                    <Warning className="h-10 w-10" weight="fill" />
                  </div>
                  <h3 className="mb-4 font-[family-name:var(--font-outfit)] text-3xl font-normal text-[#F4F5F0]">
                    MODERATE RISK
                  </h3>
                  <p className="mx-auto mb-8 max-w-md leading-relaxed text-[#F4F5F0]/70">
                    Your protection may be insufficient for your building type.
                    An engineering review is highly advised.
                  </p>
                </>
              )}
              {highRisk && !moderate && !managed && (
                <>
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 text-4xl text-red-500 shadow-lg">
                    <Warning className="h-10 w-10" weight="fill" />
                  </div>
                  <h3 className="mb-4 font-[family-name:var(--font-outfit)] text-3xl font-normal text-[#F4F5F0]">
                    HIGH RISK EXPOSURE
                  </h3>
                  <p className="mx-auto mb-8 max-w-md leading-relaxed text-[#F4F5F0]/70">
                    Your facility has significant lightning exposure with
                    inadequate protection. We recommend an immediate engineering
                    audit.
                  </p>
                </>
              )}

              <Link
                href="/address-contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8A020] px-8 py-4 font-normal text-[#0B1F3A] transition-colors hover:bg-[#F4F5F0]"
              >
                Request a Free Site Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="mt-6 block w-full text-center text-sm text-[#F4F5F0]/40 transition-colors hover:text-[#E8A020]"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RadioRow({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  const id = `${name}-${label.replace(/\W+/g, "-")}`;
  return (
    <div>
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors hover:border-[#F4F5F0]/40 ${checked ? "border-[#E8A020] bg-[#E8A020]/10" : "border-[#F4F5F0]/20"}`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${checked ? "border-[#E8A020] bg-[#E8A020]" : "border-[#F4F5F0]/30"}`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#0B1F3A]" />
        </span>
        <span className="text-left text-sm">{label}</span>
      </label>
    </div>
  );
}
