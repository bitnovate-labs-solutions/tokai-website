import type { Metadata } from "next";
import Image from "next/image";

import { SiteChrome } from "@/components/site-chrome";

import { AddressContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Tokai Engineering: enquiries, technical support, and partnership opportunities.",
};

export default function AddressContactPage() {
  return (
    <SiteChrome>
      <div className="bg-neutral-50 text-neutral-900 selection:bg-black selection:text-white">
        <header className="mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-20 md:pt-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-7">
              <div className="mb-4 inline-block bg-black px-2 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium tracking-[0.2em] text-white uppercase">
                Get in Touch
              </div>
              <h1 className="mb-6 font-[family-name:var(--font-outfit)] text-[15vw] leading-[0.85] font-semibold tracking-tight text-black uppercase lg:text-[8rem]">
                CONTACT
                <br />
                US{" "}
                <span className="bg-gradient-to-r from-[#E8A020] to-[#0B1F3A] bg-clip-text text-transparent">
                  TODAY
                </span>
              </h1>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-neutral-600 md:text-base">
                Reach out for enquiries, technical support, or partnership
                opportunities. We&apos;re here to help with your engineering and
                project needs.
              </p>
            </div>

            <div className="group relative lg:col-span-5">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-black transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-neutral-900 bg-neutral-200">
                <Image
                  src="/contact/handshake.webp"
                  alt="Tokai Engineering"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                  <span className="mb-1 block font-[family-name:var(--font-jetbrains)] text-[10px] font-medium tracking-[0.18em] text-[#FFD700] uppercase">
                    We&apos;re Here to Help
                  </span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-white uppercase">
                    Reach Out
                    <br />
                    Today
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="contact-details"
          className="border-t border-neutral-200 bg-white py-20"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <h2 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight uppercase md:text-6xl">
                Contact
                <br />
                Details
              </h2>
              <a
                href="mailto:sales@tokai.com.my"
                className="hidden items-center gap-2 font-[family-name:var(--font-outfit)] text-sm font-semibold uppercase hover:underline md:flex"
              >
                Email Us <span aria-hidden>&rarr;</span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <article className="group cursor-pointer">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100">
                  <span className="absolute top-3 left-3 bg-black px-2 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                    Address
                  </span>
                  <Image
                    src="/contact/location.png"
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight uppercase transition group-hover:text-neutral-600">
                    Mailing Address
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Tokai Engineering (M) Sdn Bhd, Lot 14, Jalan Astaka U8/82,
                    Seksyen U8, Bukit Jelutong, 40150 Shah Alam, Selangor Darul
                    Ehsan, Malaysia.
                  </p>
                </div>
              </article>

              <article className="group cursor-pointer">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100">
                  <span className="absolute top-3 left-3 bg-black px-2 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                    Phone
                  </span>
                  <Image
                    src="/contact/phone.png"
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight uppercase transition group-hover:text-neutral-600">
                    Phone & WhatsApp
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Tel: +603-7455 7333. WhatsApp us at +6012-6079 308 for
                    enquiries.
                  </p>
                </div>
              </article>

              <article className="group cursor-pointer">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100">
                  <span className="absolute top-3 left-3 bg-black px-2 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
                    Email
                  </span>
                  <Image
                    src="/contact/email.avif"
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="mb-1 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight uppercase transition group-hover:text-neutral-600">
                    E-form / E-mail
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Register via our e-form or send your email to
                    sales@tokai.com.my
                  </p>
                </div>
              </article>
            </div>

            <div className="mt-8 flex justify-center md:hidden">
              <a
                href="mailto:sales@tokai.com.my"
                className="block w-full border border-black py-4 text-center font-[family-name:var(--font-jetbrains)] text-xs font-semibold tracking-[0.2em] uppercase"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 w-[95%] max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-[#0B1F3A] ring-1 ring-white/10">
            <div className="absolute inset-0">
              <Image
                src="/contact/engineering-built-to-protect.webp"
                alt=""
                fill
                className="object-cover opacity-30"
                sizes="100vw"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1F3A]/95 via-[#0B1F3A]/70 to-transparent" />
            </div>

            <div className="relative z-10 p-5 pt-5 pr-5 pb-5 pl-5 sm:p-8 md:p-12">
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-white/90 p-4 shadow-lg ring-1 ring-black/10 backdrop-blur sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-neutral-500">
                          Tokai Support
                        </p>
                        <h3 className="mt-1 font-[family-name:var(--font-outfit)] text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                          Have a question?
                        </h3>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B1F3A] text-[#F4F5F0]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden
                        >
                          <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    </div>
                    <AddressContactForm />
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <h2 className="font-[family-name:var(--font-outfit)] text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                    Let&apos;s talk.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base text-neutral-200 sm:text-lg">
                    Tell us about your setup—support, bulk orders, or
                    partnerships. We reply within one business day.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#E8A020] ring-1 ring-white/15 backdrop-blur">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden
                        >
                          <path d="M12 6v6h4" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-outfit)] text-sm font-medium text-white">
                          Quick response
                        </p>
                        <p className="text-xs text-neutral-300">
                          Most messages receive a reply in under 24h.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#E8A020] ring-1 ring-white/15 backdrop-blur">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden
                        >
                          <circle cx="6" cy="19" r="3" />
                          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                          <circle cx="18" cy="5" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-outfit)] text-sm font-medium text-white">
                          Clear next steps
                        </p>
                        <p className="text-xs text-neutral-300">
                          We&apos;ll follow up with a concise plan and timeline.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="inline-flex items-center gap-3 rounded-2xl bg-white/95 p-3 shadow-lg ring-1 ring-black/10 backdrop-blur">
                      <Image
                        src="/contact/woman.jpeg"
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-[family-name:var(--font-jetbrains)] text-[11px] leading-none text-neutral-500">
                          Team Lead
                        </p>
                        <p className="truncate font-[family-name:var(--font-outfit)] font-medium tracking-tight text-neutral-900">
                          Ava Kim
                        </p>
                      </div>
                      <a
                        href="mailto:sales@tokai.com.my"
                        className="ml-1 inline-flex items-center gap-2 rounded-xl bg-[#E8A020] px-3 py-2 text-xs font-medium text-[#0B1F3A] transition-colors hover:bg-[#d4911a]"
                      >
                        Ask directly
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                          aria-hidden
                        >
                          <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
