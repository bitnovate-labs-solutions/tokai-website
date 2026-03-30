"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CaretDown, CaretRight, List, X } from "@phosphor-icons/react";

import {
  isNavLinkActive,
  isPathInGroup,
  isTopLevelLinkActive,
  navEntries,
  type NavEntry,
  type NavLink,
} from "@/lib/site-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpenGroup, setDesktopOpenGroup] = useState<string | null>(null);
  const [mobileOpenGroups, setMobileOpenGroups] = useState<Record<string, boolean>>({});
  const desktopNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setDesktopOpenGroup(null);
    const initial: Record<string, boolean> = {};
    for (const entry of navEntries) {
      if (entry.kind === "group") {
        initial[entry.label] = isPathInGroup(pathname, entry);
      }
    }
    setMobileOpenGroups(initial);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(e.target as Node)
      ) {
        setDesktopOpenGroup(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDesktopOpenGroup(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200/90 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.03)] backdrop-blur-md">
        <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-8">
          <Link
            href="/"
            className="shrink-0 flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Tokai Engineering"
              width={400}
              height={138}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav
            ref={desktopNavRef}
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {navEntries.map((entry) => (
              <DesktopNavItem
                key={entry.kind === "link" ? entry.href : entry.label}
                entry={entry}
                pathname={pathname}
                openGroup={desktopOpenGroup}
                setOpenGroup={setDesktopOpenGroup}
              />
            ))}
          </nav>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => {
              const next = !mobileOpen;
              setMobileOpen(next);
              if (next) {
                const initial: Record<string, boolean> = {};
                for (const entry of navEntries) {
                  if (entry.kind === "group") {
                    initial[entry.label] = isPathInGroup(pathname, entry);
                  }
                }
                setMobileOpenGroups(initial);
              }
            }}
          >
            {mobileOpen ? (
              <X weight="light" size={24} aria-hidden />
            ) : (
              <List weight="light" size={24} aria-hidden />
            )}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </header>

      <div
        id="mobile-drawer"
        className={`fixed inset-x-0 bottom-0 top-[4.25rem] z-40 md:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-zinc-950/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
        <nav
          className={`absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col border-l border-zinc-200 bg-white shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile primary"
        >
          <ul className="flex flex-col gap-0.5 overflow-y-auto p-3">
            {navEntries.map((entry) => (
              <MobileNavBlock
                key={entry.kind === "link" ? entry.href : entry.label}
                entry={entry}
                pathname={pathname}
                openGroups={mobileOpenGroups}
                setOpenGroups={setMobileOpenGroups}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

function DesktopNavItem({
  entry,
  pathname,
  openGroup,
  setOpenGroup,
}: {
  entry: NavEntry;
  pathname: string;
  openGroup: string | null;
  setOpenGroup: (v: string | null) => void;
}) {
  if (entry.kind === "link") {
    const active = isTopLevelLinkActive(entry, pathname);
    return (
      <Link
        href={entry.href}
        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          active
            ? "bg-zinc-100 text-zinc-950"
            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
        }`}
      >
        {entry.label}
      </Link>
    );
  }

  const menuOpen = openGroup === entry.label;
  const groupActive = isPathInGroup(pathname, entry);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenGroup(entry.label)}
      onMouseLeave={() => setOpenGroup(null)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          groupActive || menuOpen
            ? "bg-zinc-100 text-zinc-950"
            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
        }`}
        onClick={() => setOpenGroup(menuOpen ? null : entry.label)}
      >
        {entry.label}
        <CaretDown
          weight="light"
          size={16}
          className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        className={`absolute left-0 top-full z-50 mt-1 min-w-[17.5rem] overflow-visible rounded-lg border border-zinc-200 bg-white py-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-zinc-950/5 transition-[opacity,transform] duration-180 ease-out ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {entry.items.map((item) => (
          <DesktopGroupItem
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={() => setOpenGroup(null)}
          />
        ))}
      </div>
    </div>
  );
}

function MobileNavBlock({
  entry,
  pathname,
  openGroups,
  setOpenGroups,
  onNavigate,
}: {
  entry: NavEntry;
  pathname: string;
  openGroups: Record<string, boolean>;
  setOpenGroups: (v: Record<string, boolean>) => void;
  onNavigate: () => void;
}) {
  if (entry.kind === "link") {
    const active = isTopLevelLinkActive(entry, pathname);
    return (
      <li>
        <Link
          href={entry.href}
          onClick={onNavigate}
          className={`block rounded-lg px-4 py-3 text-base font-medium ${
            active
              ? "bg-amber-50 text-zinc-950"
              : "text-zinc-700 hover:bg-zinc-50"
          }`}
        >
          {entry.label}
        </Link>
      </li>
    );
  }

  const groupActive = isPathInGroup(pathname, entry);
  const groupOpen = !!openGroups[entry.label];

  return (
    <li className="rounded-lg border border-zinc-100 bg-zinc-50/80">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-base font-medium text-zinc-950"
        aria-expanded={groupOpen}
        onClick={() =>
          setOpenGroups({ ...openGroups, [entry.label]: !groupOpen })
        }
      >
        <span className={groupActive ? "text-amber-800" : undefined}>
          {entry.label}
        </span>
        <CaretRight
          weight="light"
          size={20}
          className={`shrink-0 transition-transform duration-200 ${
            groupOpen ? "rotate-90" : ""
          }`}
          aria-hidden
        />
      </button>
      <ul className={`border-t border-zinc-200/80 ${groupOpen ? "block" : "hidden"}`}>
        {entry.items.map((item) => (
          <MobileGroupItem
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </li>
  );
}

function DesktopGroupItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isNavLinkActive(item.href, pathname);
  const [subOpen, setSubOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  useEffect(() => {
    setSubOpen(false);
  }, [pathname]);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={`block px-4 py-2.5 text-sm transition-colors ${
          active
            ? "bg-amber-50 font-medium text-zinc-950"
            : "text-zinc-700 hover:bg-zinc-50"
        }`}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative border-b border-zinc-100 last:border-b-0"
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      <div
        className={`flex w-full items-stretch ${
          active ? "bg-amber-50/80" : ""
        }`}
      >
        <Link
          href={item.href}
          className={`flex min-w-0 flex-1 items-center px-4 py-2.5 text-left text-sm transition-colors ${
            active ? "font-medium text-zinc-950" : "text-zinc-700 hover:bg-zinc-50"
          }`}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
        <div
          className="flex shrink-0 items-center justify-center border-l border-zinc-200/90 px-3 text-zinc-500"
          aria-hidden
        >
          <CaretRight
            weight="light"
            size={16}
            className={`transition-transform duration-200 ${subOpen ? "rotate-90" : ""}`}
          />
        </div>
      </div>
      <div
        className={
          subOpen
            ? "border-t border-zinc-100 bg-zinc-50/50 py-1 md:absolute md:left-full md:top-0 md:z-[60] md:ml-1 md:min-w-[17.5rem] md:rounded-lg md:border md:border-zinc-200 md:bg-white md:py-2 md:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.18)] md:ring-1 md:ring-zinc-950/5 md:border-t-0"
            : "hidden"
        }
      >
        {item.children!.map((child) => {
          const childActive = isNavLinkActive(child.href, pathname);
          return (
            <Link
              key={child.href}
              href={child.href}
              className={`block px-4 py-2 text-sm transition-colors md:px-4 md:py-2.5 ${
                childActive
                  ? "bg-amber-50/80 font-medium text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-50"
              }`}
              onClick={onNavigate}
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MobileGroupItem({
  item,
  pathname,
  onNavigate,
}: {
  item: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isNavLinkActive(item.href, pathname);
  const [childrenOpen, setChildrenOpen] = useState(false);
  const hasChildren = !!item.children?.length;

  useEffect(() => {
    setChildrenOpen(false);
  }, [pathname]);

  return (
    <>
      <li>
        {hasChildren ? (
          <div
            className={`flex items-stretch ${
              active ? "bg-white/90" : ""
            }`}
          >
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`block min-w-0 flex-1 py-2.5 pl-6 pr-2 text-left text-[15px] leading-snug ${
                active
                  ? "border-l-2 border-amber-600 font-medium text-zinc-950"
                  : "border-l-2 border-transparent text-zinc-600 hover:bg-white/60"
              }`}
            >
              {item.label}
            </Link>
            <button
              type="button"
              aria-expanded={childrenOpen}
              aria-label={childrenOpen ? "Collapse subpages" : "Expand subpages"}
              onClick={() => setChildrenOpen((v) => !v)}
              className={`flex shrink-0 items-center px-3 text-zinc-600 hover:bg-white/60 ${
                active ? "text-zinc-950" : ""
              }`}
            >
              <CaretRight
                weight="light"
                size={16}
                className={`transition-transform ${childrenOpen ? "rotate-90" : ""}`}
                aria-hidden
              />
            </button>
          </div>
        ) : (
          <Link
            href={item.href}
            onClick={onNavigate}
            className={`block py-2.5 pl-6 pr-4 text-[15px] leading-snug ${
              active
                ? "border-l-2 border-amber-600 bg-white font-medium text-zinc-950"
                : "border-l-2 border-transparent text-zinc-600 hover:bg-white/60"
            }`}
          >
            {item.label}
          </Link>
        )}
      </li>
      {hasChildren && childrenOpen
        ? item.children!.map((child) => {
            const childActive = isNavLinkActive(child.href, pathname);
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={onNavigate}
                  className={`block py-2 pl-10 pr-4 text-[14px] leading-snug ${
                    childActive
                      ? "border-l-2 border-amber-500 bg-white/90 font-medium text-zinc-950"
                      : "border-l-2 border-transparent text-zinc-500 hover:bg-white/60"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            );
          })
        : null}
    </>
  );
}
