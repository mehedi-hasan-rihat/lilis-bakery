"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderSearch } from "@/components/header-search";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/currency";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact US" },
];

const PHONE = "+880 1911-234567";
const PHONE_HREF = "tel:+8801911234567";

const PhoneIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5c0 8.284 6.716 15 15 15h1a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.76-.97l-3.35-.84a1 1 0 0 0-1.02.32l-1.13 1.36a12.05 12.05 0 0 1-6.34-6.34l1.36-1.13a1 1 0 0 0 .32-1.02l-.84-3.35A1 1 0 0 0 8.28 3H5a1 1 0 0 0-1 1Z" />
  </svg>
);

export function Header() {
  const { itemCount, subtotal, openDrawer } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the slide-over whenever navigation lands on a new page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // While the slide-over covers the screen, lock the page behind it.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1450px] items-center gap-2 px-4 py-4 sm:gap-4 sm:px-6">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent sm:h-10 sm:w-10 lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <Link
          href="/"
          className="shrink-0 font-display text-lg italic tracking-tight text-primary sm:text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          Mimi's  Dream Cakes
        </Link>

        <HeaderSearch />

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap font-mono text-xs uppercase tracking-widest transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="hidden h-8 w-px bg-border lg:block" />

        <div className="ml-auto flex items-center gap-2 sm:gap-4 lg:ml-0">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 text-ink transition-colors hover:text-accent xl:flex"
          >
            <PhoneIcon />
            <span className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Call Us Now
              </span>
              <span className="text-sm font-medium">{PHONE}</span>
            </span>
          </a>

          {/* Tap-to-call stays reachable once the full block is too wide. */}
          <a
            href={PHONE_HREF}
            aria-label={`Call us now, ${PHONE}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent sm:h-10 sm:w-10 xl:hidden"
          >
            <PhoneIcon size={17} />
          </a>

          <span className="hidden h-8 w-px bg-border xl:block" />

          <button
            type="button"
            onClick={openDrawer}
            className="relative flex items-center gap-3 rounded-full border border-border py-1.5 pl-1.5 pr-1.5 text-ink transition-colors hover:border-accent hover:text-accent sm:pl-4"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}, ${formatPrice(subtotal)}`}
          >
            <span className="hidden flex-col items-end leading-tight sm:flex">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Cart
              </span>
              <span className="text-sm font-medium">{formatPrice(subtotal)}</span>
            </span>

            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-medium text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </span>
          </button>
        </div>
      </div>

    </header>

    {/*
      Full-cover slide-over. It lives outside <header> on purpose: the header's
      backdrop-blur makes it a containing block, which would trap `fixed` here.
    */}
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!menuOpen}
      className={`fixed inset-0 z-60 flex flex-col bg-linear-to-b from-lavender to-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-18 shrink-0 items-center justify-between px-4 py-4 sm:px-6">
        <span className="font-display text-lg italic tracking-tight text-primary sm:text-2xl">
          Mimi&apos;s  Dream Cakes
        </span>
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent sm:h-10 sm:w-10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: menuOpen ? `${140 + index * 80}ms` : "0ms" }}
            className={`font-display text-4xl italic leading-none transition-all duration-500 ease-out ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${pathname === link.href ? "text-accent" : "text-ink hover:text-accent"}`}
          >
            {link.label}
            <span
              className={`mx-auto mt-3 block h-px transition-all duration-300 ${
                pathname === link.href ? "w-10 bg-accent" : "w-0 bg-transparent"
              }`}
            />
          </Link>
        ))}
      </nav>

      <div
        style={{ transitionDelay: menuOpen ? `${140 + NAV_LINKS.length * 80}ms` : "0ms" }}
        className={`shrink-0 border-t border-border/70 px-6 py-8 text-center transition-all duration-500 ease-out ${
          menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Call Us Now
        </p>
        <a
          href={PHONE_HREF}
          className="mt-2 inline-flex items-center gap-2 text-lg font-medium text-ink transition-colors hover:text-accent"
        >
          <PhoneIcon size={18} />
          {PHONE}
        </a>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Free hand delivery in Dhaka
        </p>
      </div>
    </div>
    </>
  );
}
