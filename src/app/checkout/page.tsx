"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { DELIVERY_FEE, formatPrice } from "@/lib/currency";

type Fulfillment = "delivery" | "pickup";
type PaymentMethod = "card" | "cash";

function generateOrderNumber() {
  return `LB-${Math.floor(10000 + Math.random() * 90000)}`;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const delivery = fulfillment === "delivery" && subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderNumber(generateOrderNumber());
    clearCart();
  }

  if (orderNumber) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Order Confirmed
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">
          Thank you — it&apos;s in the oven
        </h1>
        <p className="mt-4 text-muted-foreground">
          Your order <span className="font-mono text-ink">{orderNumber}</span>{" "}
          has been received. We&apos;ll email you a confirmation with your{" "}
          {fulfillment === "delivery" ? "delivery" : "pickup"} details
          shortly.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Checkout
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">
          Your box is empty
        </h1>
        <p className="mt-4 text-muted-foreground">
          Add a cake to your cart before checking out.
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

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Checkout
      </p>
      <h1 className="mt-2 font-display text-4xl italic text-ink">
        Almost there
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-10 lg:grid-cols-3"
      >
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Contact */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-xl text-ink">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" htmlFor="name">
                <input id="name" name="name" required className={inputClass} />
              </Field>
              <Field label="Phone" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Email" htmlFor="email" full>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {/* Fulfillment */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-xl text-ink">
              Delivery or pickup
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <RadioCard
                name="fulfillment"
                checked={fulfillment === "delivery"}
                onSelect={() => setFulfillment("delivery")}
                title="Hand delivered"
                subtitle={`${formatPrice(DELIVERY_FEE)} within Purple District`}
              />
              <RadioCard
                name="fulfillment"
                checked={fulfillment === "pickup"}
                onSelect={() => setFulfillment("pickup")}
                title="Pickup at atelier"
                subtitle="12 Sugar Lane · Free"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {fulfillment === "delivery" && (
                <Field label="Delivery address" htmlFor="address" full>
                  <input
                    id="address"
                    name="address"
                    required
                    className={inputClass}
                  />
                </Field>
              )}
              <Field label="Date needed" htmlFor="date">
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className={inputClass}
                />
              </Field>
              <Field label="Notes (optional)" htmlFor="notes">
                <input id="notes" name="notes" className={inputClass} />
              </Field>
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-xl text-ink">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <RadioCard
                name="payment"
                checked={payment === "card"}
                onSelect={() => setPayment("card")}
                title="Card"
                subtitle="Visa, Mastercard, Amex"
              />
              <RadioCard
                name="payment"
                checked={payment === "cash"}
                onSelect={() => setPayment("cash")}
                title="Cash on pickup / delivery"
                subtitle="Pay when you receive it"
              />
            </div>

            {payment === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Card number" htmlFor="card" full>
                  <input
                    id="card"
                    name="card"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="•••• •••• •••• ••••"
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label="Expiry" htmlFor="expiry">
                  <input
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    autoComplete="cc-exp"
                    required
                    className={inputClass}
                  />
                </Field>
                <Field label="CVC" htmlFor="cvc">
                  <input
                    id="cvc"
                    name="cvc"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    required
                    className={inputClass}
                  />
                </Field>
              </div>
            )}
          </section>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.key} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-md bg-lavender">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent font-mono text-[10px] text-accent-foreground">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex flex-1 items-start justify-between text-sm">
                  <div>
                    <p className="text-ink">{item.name}</p>
                    <p className="text-muted-foreground">{item.sizeLabel}</p>
                  </div>
                  <p className="text-ink">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
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

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
          >
            Place Order
          </button>
          <Link
            href="/cart"
            className="mt-3 block rounded-full border border-primary px-6 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Back to Cart
          </Link>
        </aside>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none";

function Field({
  label,
  htmlFor,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function RadioCard({
  name,
  checked,
  onSelect,
  title,
  subtitle,
}: {
  name: string;
  checked: boolean;
  onSelect: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 transition-colors ${
        checked
          ? "border-accent bg-lavender"
          : "border-border hover:border-accent/60"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span className="text-sm text-ink">{title}</span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {subtitle}
      </span>
    </label>
  );
}
