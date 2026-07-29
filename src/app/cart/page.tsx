"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { DELIVERY_FEE, formatPrice } from "@/lib/currency";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Your Cart
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">
          Your box is empty
        </h1>
        <p className="mt-4 text-muted-foreground">
          Nothing in your cart yet — browse the collection and add a cake to
          get started.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
        >
          Shop Cakes
        </Link>
      </div>
    );
  }

  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Your Cart
      </p>
      <h1 className="mt-2 font-display text-4xl italic text-ink">
        Your box so far
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <ul className="flex flex-col gap-6 lg:col-span-2">
          {items.map((item) => (
            <li
              key={item.key}
              className="flex gap-4 border-b border-border pb-6"
            >
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-md bg-lavender">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-lg text-ink">
                      {item.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {item.sizeLabel}
                    </p>
                  </div>
                  <p className="font-display text-lg text-primary">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.key, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-ink hover:text-accent"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-mono text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.key, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-ink hover:text-accent"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-accent"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd className="text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Delivery</dt>
              <dd className="text-ink">{formatPrice(delivery)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-border pt-4 font-display text-lg text-ink">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="mt-3 block rounded-full border border-primary px-6 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
