"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Message Sent
        </p>
        <h1 className="mt-2 font-display text-4xl italic text-ink">
          Thank you for reaching out
        </h1>
        <p className="mt-4 text-muted-foreground">
          We&apos;ve received your message and will get back to you within
          two business days.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1450px] px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl italic text-ink sm:text-5xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Questions about an order, a custom commission, or just want to say
        hello? Send us a message and we&apos;ll reply within two days.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-border bg-card p-6 lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" htmlFor="name">
              <input id="name" name="name" required className={inputClass} />
            </Field>
            <Field label="Email" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Subject" htmlFor="subject" full>
              <input id="subject" name="subject" required className={inputClass} />
            </Field>
            <Field label="Message" htmlFor="message" full>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className={inputClass}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-6 rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
          >
            Send Message
          </button>
        </form>

        <aside className="h-fit space-y-6 rounded-lg border border-border bg-card p-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Call Us
            </p>
            <a
              href="tel:+8801911234567"
              className="mt-1 block text-sm text-ink hover:text-accent"
            >
              +880 1911-234567
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Email
            </p>
            <a
              href="mailto:hello@mimisdreamcakes.com"
              className="mt-1 block text-sm text-ink hover:text-accent"
            >
              hello@mimisdreamcakes.com
            </a>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Bakery
            </p>
            <p className="mt-1 text-sm text-ink">12 Sugar Lane, Purple District</p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Hours
            </p>
            <p className="mt-1 text-sm text-ink">Tuesday – Sunday, 9am – 6pm</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

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
