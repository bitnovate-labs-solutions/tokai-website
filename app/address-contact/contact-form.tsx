"use client";

import type { FormEvent } from "react";

export function AddressContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const subject = encodeURIComponent("Enquiry from tokai.com.my");
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    );
    window.location.href = `mailto:sales@tokai.com.my?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label
          htmlFor="ct-name"
          className="block font-[family-name:var(--font-jetbrains)] text-xs text-neutral-600"
        >
          Your name<span className="text-neutral-400"> *</span>
        </label>
        <input
          id="ct-name"
          name="name"
          type="text"
          required
          placeholder="Jane Doe"
          className="mt-1 w-full rounded-xl bg-white py-2.5 pr-3 pl-3 font-[family-name:var(--font-outfit)] text-sm ring-1 ring-black/10 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#0B1F3A]"
        />
      </div>
      <div>
        <label
          htmlFor="ct-email"
          className="block font-[family-name:var(--font-jetbrains)] text-xs text-neutral-600"
        >
          E‑mail<span className="text-neutral-400"> *</span>
        </label>
        <div className="relative mt-1">
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
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
            aria-hidden
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
          <input
            id="ct-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-xl bg-white py-2.5 pr-3 pl-9 font-[family-name:var(--font-outfit)] text-sm ring-1 ring-black/10 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#0B1F3A]"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="ct-msg"
          className="block font-[family-name:var(--font-jetbrains)] text-xs text-neutral-600"
        >
          Message
        </label>
        <textarea
          id="ct-msg"
          name="message"
          rows={4}
          placeholder="How can we help?"
          className="mt-1 w-full resize-y rounded-xl bg-white py-2.5 pr-3 pl-3 font-[family-name:var(--font-outfit)] text-sm ring-1 ring-black/10 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-[#0B1F3A]"
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-xl bg-[#0B1F3A] px-4 py-3 font-[family-name:var(--font-outfit)] text-sm font-medium text-[#F4F5F0] transition-colors hover:bg-[#0d2a4d]"
      >
        Send message
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
          className="ml-2 h-4 w-4"
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
      <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-neutral-500">
        By submitting, you agree to our Terms and Privacy Policy.
      </p>
    </form>
  );
}
