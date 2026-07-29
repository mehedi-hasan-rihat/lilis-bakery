"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/currency";

export function CartDrawer() {
  const { items, subtotal, itemCount, updateQuantity, removeItem, isDrawerOpen, closeDrawer } =
    useCart();

  return (
    <div
      aria-hidden={!isDrawerOpen}
      className={`fixed inset-0 z-[60] ${isDrawerOpen ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-xl text-ink">
            Your Cart {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-muted-foreground">Your box is empty.</p>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="rounded-full bg-primary px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
            >
              Buy Cakes
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-lavender">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base text-ink">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.flavorLabel} · {item.sizeLabel}
                        </p>
                      </div>
                      <p className="font-display text-sm text-primary">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-ink hover:text-accent"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-mono text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-ink hover:text-accent"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex justify-between font-display text-lg text-ink">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="mt-4 block rounded-full bg-primary px-6 py-3 text-center font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="mt-3 block rounded-full border border-primary px-6 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
