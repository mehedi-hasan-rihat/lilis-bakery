"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HeaderSearch } from "@/components/header-search";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/currency";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact US" },
];

export function Header() {
  const { itemCount, subtotal, openDrawer } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1450px] items-center gap-4 px-6 py-4">
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <Link
          href="/"
          className="shrink-0 font-display text-2xl italic tracking-tight text-primary"
          onClick={() => setMenuOpen(false)}
        >
          Mimi's  Dream Cakes
        </Link>

        <HeaderSearch />

        <div className="ml-auto flex items-center gap-4">
          <a
            href="tel:+8801911234567"
            className="hidden items-center gap-2 text-ink transition-colors hover:text-accent lg:flex"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5c0 8.284 6.716 15 15 15h1a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.76-.97l-3.35-.84a1 1 0 0 0-1.02.32l-1.13 1.36a12.05 12.05 0 0 1-6.34-6.34l1.36-1.13a1 1 0 0 0 .32-1.02l-.84-3.35A1 1 0 0 0 8.28 3H5a1 1 0 0 0-1 1Z" />
            </svg>
            <span className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Call Us Now
              </span>
              <span className="text-sm font-medium">+880 1911-234567</span>
            </span>
          </a>

          <span className="hidden h-8 w-px bg-border lg:block" />

          <button
            type="button"
            onClick={openDrawer}
            className="relative flex items-center gap-3 rounded-full border border-border py-1.5 pl-4 pr-1.5 text-ink transition-colors hover:border-accent hover:text-accent"
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}, ${formatPrice(subtotal)}`}
          >
            <span className="flex flex-col items-end leading-tight">
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

      <nav className="hidden items-center justify-center gap-8 border-t border-border py-3 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-mono text-xs uppercase tracking-widest transition-colors hover:text-accent ${
              pathname === link.href ? "text-accent" : "text-muted-foreground"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-paper px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
