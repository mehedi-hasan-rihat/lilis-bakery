"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart, type CartItem } from "@/lib/cart-context";
import { DELIVERY_FEE, formatPrice } from "@/lib/currency";
import { Confetti } from "@/components/confetti";

type Fulfillment = "delivery" | "pickup";
type PaymentMethod = "card" | "cash";

interface ConfirmedOrder {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  fulfillment: Fulfillment;
  name: string;
  placedAt: Date;
}

function generateOrderNumber() {
  return `LB-${Math.floor(10000 + Math.random() * 90000)}`;
}

const PURPLE: [number, number, number] = [143, 84, 177];
const INK: [number, number, number] = [19, 16, 25];
const MUTED: [number, number, number] = [139, 138, 149];
const BORDER: [number, number, number] = [218, 215, 210];
const PLUM: [number, number, number] = [65, 35, 84];

/** jsPDF's standard fonts don't include Bengali glyphs, so the Taka sign is spelled out as "Tk" here. */
function pdfMoney(amount: number) {
  return `Tk ${Math.round(amount).toLocaleString("en-US")}`;
}

async function downloadReceipt(order: ConfirmedOrder) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 56;
  const qtyX = pageWidth - margin - 90;

  doc.setFillColor(...PURPLE);
  doc.rect(0, 0, pageWidth, 108, "F");
  doc.setTextColor(247, 245, 241);
  doc.setFont("times", "italic");
  doc.setFontSize(26);
  doc.text("Mimi's Dream Cakes", pageWidth / 2, 52, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("O R D E R   R E C E I P T", pageWidth / 2, 74, { align: "center" });

  let y = 144;
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(`Order #${order.orderNumber}`, margin, y);
  doc.text(order.placedAt.toLocaleString("en-BD"), pageWidth - margin, y, {
    align: "right",
  });

  y += 18;
  if (order.name) {
    doc.text(`Customer: ${order.name}`, margin, y);
  }
  doc.text(
    order.fulfillment === "delivery" ? "Hand delivered" : "Pickup at bakery",
    pageWidth - margin,
    y,
    { align: "right" }
  );

  y += 14;
  doc.setDrawColor(...BORDER);
  doc.line(margin, y, pageWidth - margin, y);
  y += 26;

  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("ITEM", margin, y);
  doc.text("QTY", qtyX, y, { align: "right" });
  doc.text("PRICE", pageWidth - margin, y, { align: "right" });
  y += 8;
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  for (const item of order.items) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(item.name, margin, y);
    doc.text(String(item.quantity), qtyX, y, { align: "right" });
    doc.text(pdfMoney(item.unitPrice * item.quantity), pageWidth - margin, y, {
      align: "right",
    });
    y += 15;
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(`${item.flavorLabel} · ${item.sizeLabel}`, margin, y);
    y += 20;
  }

  doc.setDrawColor(...BORDER);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text("Subtotal", margin, y);
  doc.text(pdfMoney(order.subtotal), pageWidth - margin, y, { align: "right" });
  y += 16;
  doc.text("Delivery", margin, y);
  doc.text(pdfMoney(order.delivery), pageWidth - margin, y, { align: "right" });
  y += 10;
  doc.line(margin, y, pageWidth - margin, y);
  y += 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...INK);
  doc.text("Total Paid", margin, y);
  doc.text(pdfMoney(order.total), pageWidth - margin, y, { align: "right" });

  y += 52;
  doc.setFont("times", "italic");
  doc.setFontSize(14);
  doc.setTextColor(...PLUM);
  doc.text("Thank you for your order — see you soon!", pageWidth / 2, y, {
    align: "center",
  });

  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "12 Sugar Lane, Purple District  ·  hello@mimisdreamcakes.com",
    pageWidth / 2,
    y,
    { align: "center" }
  );

  doc.save(`receipt-${order.orderNumber}.pdf`);
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [order, setOrder] = useState<ConfirmedOrder | null>(null);

  const delivery = fulfillment === "delivery" && subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setOrder({
      orderNumber: generateOrderNumber(),
      items,
      subtotal,
      delivery,
      total,
      fulfillment,
      name: String(formData.get("name") ?? ""),
      placedAt: new Date(),
    });
    clearCart();
  }

  if (order) {
    const firstName = order.name.trim().split(/\s+/)[0];
    return (
      <div className="relative mx-auto max-w-xl overflow-hidden px-6 py-24 text-center">
        <Confetti seed={order.orderNumber} />

        <div className="relative z-10">
          <div className="animate-success-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <p
            className="animate-success-fade-up mt-6 font-mono text-xs uppercase tracking-widest text-accent"
            style={{ animationDelay: "0.15s" }}
          >
            Order Confirmed
          </p>
          <h1
            className="animate-success-fade-up mt-2 font-display text-4xl italic text-ink"
            style={{ animationDelay: "0.3s" }}
          >
            <span aria-hidden className="animate-wave inline-block origin-[70%_70%]">
              👋
            </span>{" "}
            {firstName
              ? `Thank you, ${firstName} — it's in the oven`
              : "Thank you — it's in the oven"}
          </h1>
          <p
            className="animate-success-fade-up mt-4 text-muted-foreground"
            style={{ animationDelay: "0.45s" }}
          >
            Your order{" "}
            <span className="font-mono text-ink">{order.orderNumber}</span>{" "}
            has been received and we&apos;re already lining up the piping
            bags. We&apos;ll email you a confirmation with your{" "}
            {order.fulfillment === "delivery" ? "delivery" : "pickup"} details
            shortly — thank you for baking this moment with us. 💜
          </p>

          <div
            className="animate-success-fade-up mt-8 rounded-lg border border-border bg-card p-6 text-left"
            style={{ animationDelay: "0.6s" }}
          >
            <ul className="flex flex-col gap-4">
              {order.items.map((item) => (
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
                      <p className="text-muted-foreground">
                        {item.flavorLabel} · {item.sizeLabel}
                      </p>
                    </div>
                    <p className="text-ink">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="text-ink">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>Delivery</dt>
                <dd className="text-ink">{formatPrice(order.delivery)}</dd>
              </div>
            </dl>
            <div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-lg text-ink">
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div
            className="animate-success-fade-up mt-8 flex flex-wrap justify-center gap-4"
            style={{ animationDelay: "0.75s" }}
          >
            <button
              type="button"
              onClick={() => downloadReceipt(order)}
              className="inline-flex items-center gap-2 rounded-full border border-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              Download Receipt
            </button>
            <Link
              href="/shop"
              className="inline-block rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
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
          Buy Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1450px] px-6 py-16">
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
                title="Pickup at bakery"
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
                    <p className="text-muted-foreground">
                      {item.flavorLabel} · {item.sizeLabel}
                    </p>
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
