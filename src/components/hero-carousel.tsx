"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useState } from "react";

interface Slide {
  src: string;
  alt: string;
  kicker: string;
  /** Two-word-ish label used by the slide index and the "next" preview. */
  label: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/hero-cake.jpg",
    alt: "Three-tier purple ombré drip cake finished with silk peonies",
    kicker: "Handcrafted Cakes & Sweet Treats",
    label: "Signature",
    title: "The quiet art of cake making",
    subtitle:
      "A small bakery making seasonal cakes, celebration bakes and petit fours from scratch.",
    ctaLabel: "Shop Best Sellers",
    ctaHref: "/shop",
  },
  {
    src: "/images/magic-unicorn.jpg",
    alt: "Magic Unicorn cake with a hand-piped rainbow buttercream mane",
    kicker: "Kids' Favourite",
    label: "Celebration",
    title: "Wild, whimsical celebration cakes",
    subtitle:
      "Gold leaf horns, rainbow manes and every showstopper a birthday table needs.",
    ctaLabel: "Shop Celebration Cakes",
    ctaHref: "/shop?category=celebration",
  },
  {
    src: "/images/lavender-rosette.jpg",
    alt: "Lavender Rosette cake with piped Italian meringue rosettes",
    kicker: "Signature Drip Cake",
    label: "Weddings",
    title: "Wedding centrepieces, hand-finished",
    subtitle:
      "Multi-layer designs finished with hand-painted ombré, sugar drips and silk peonies.",
    ctaLabel: "Shop Wedding Cakes",
    ctaHref: "/shop?category=wedding",
  },
  {
    src: "/images/petits-fours.jpg",
    alt: "Lavender and vanilla macarons and petite cupcakes",
    kicker: "Small Batch, Made Fresh",
    label: "Petits Fours",
    title: "Petits fours & macarons, made to order",
    subtitle:
      "Hand-tied boxes of macarons and petite cupcakes, baked fresh in small batches.",
    ctaLabel: "Shop Petits Fours",
    ctaHref: "/shop?category=petits-fours",
  },
];

const INTERVAL_MS = 6000;

const PROMISES = ["Small batch", "Baked from scratch", "Hand-delivered in Dhaka"];

function pad(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = SLIDES[active];
  const next = SLIDES[(active + 1) % SLIDES.length];

  const goTo = useCallback((index: number) => {
    setActive(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  // Keyed on `active` so manual navigation restarts the clock — the index
  // progress bar and the slide it describes stay in step.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured cakes"
      className="relative overflow-hidden border-b border-border bg-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative wash — cosmetic only, sized independently of any photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-lavender blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-[1450px] items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        {/* ---------------------------------------------------------------- Text */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {slide.kicker}
            </p>
          </div>

          <h1
            key={active}
            className="mt-6 max-w-xl font-display text-4xl italic leading-[1.05] text-ink sm:text-6xl"
          >
            {slide.title.split(" ").map((word, index, words) => (
              <Fragment key={`${active}-${word}-${index}`}>
                <span
                  // Extra padding keeps the clip box clear of italic overhangs.
                  className="inline-block overflow-hidden pb-[0.1em] pr-[0.08em] align-bottom"
                >
                  <span
                    className="animate-hero-word-in inline-block motion-reduce:animate-none"
                    style={{ animationDelay: `${index * 55}ms` }}
                  >
                    {word}
                  </span>
                </span>
                {/* A real space node, so the heading still reads and copies as a sentence. */}
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>

          <p
            key={`sub-${active}`}
            className="animate-hero-text-in mt-6 max-w-md text-base leading-7 text-muted-foreground motion-reduce:animate-none"
            style={{ animationDelay: "180ms" }}
          >
            {slide.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={slide.ctaHref}
              className="group relative overflow-hidden rounded-full bg-primary px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-primary-foreground"
            >
              {/* Accent wipes across from the left instead of a flat colour swap. */}
              <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              <span className="relative">{slide.ctaLabel}</span>
            </Link>
            <Link
              href="/#bakery"
              className="group flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Our Bakery
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {PROMISES.map((promise) => (
              <li key={promise} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {promise}
              </li>
            ))}
          </ul>

          {/* ------------------------------------------------- Segmented index */}
          <div className="mt-12 flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-stretch gap-2">
              {SLIDES.map((s, index) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}: ${s.label}`}
                  aria-current={index === active}
                  className="group flex-1 py-3"
                >
                  <span className="relative block h-0.5 w-full overflow-hidden rounded-full bg-border">
                    {index < active && (
                      <span className="absolute inset-0 bg-primary/40" />
                    )}
                    {index === active && (
                      <span
                        key={`fill-${active}-${paused}`}
                        style={{ animationPlayState: paused ? "paused" : "running" }}
                        className="animate-hero-progress absolute inset-0 origin-left bg-primary motion-reduce:animate-none"
                      />
                    )}
                    <span className="absolute inset-0 origin-left scale-x-0 bg-accent/40 transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </button>
              ))}
            </div>

            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
              <span className="text-ink">{pad(active)}</span> / {pad(SLIDES.length - 1)}
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------------- Image */}
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:mx-0 lg:max-w-108 lg:justify-self-end xl:max-w-120">
          <div className="relative aspect-square w-full overflow-hidden rounded-4xl border border-border bg-lavender shadow-2xl shadow-ink/10 lg:aspect-4/5">
            {SLIDES.map((s, index) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                fill
                preload={index === 0}
                sizes="(max-width: 1024px) 90vw, 45vw"
                aria-hidden={index !== active}
                className={`object-cover transition-opacity duration-700 ease-out ${
                  index === active
                    ? "animate-hero-zoom opacity-100 motion-reduce:animate-none"
                    : "opacity-0"
                }`}
              />
            ))}

            {/* Reads over the photo's foot, where the image is darkest. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-ink/65 via-ink/20 to-transparent"
            />
            <p className="absolute bottom-5 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-paper">
              {slide.label}
            </p>
          </div>

          {/*
            The next slide peeks out as a tilted card — it doubles as the
            "advance" control and tells you the carousel has more to show.
          */}
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label={`Next slide: ${next.label}`}
            className="group absolute -left-20 bottom-10 hidden w-40 rotate-[-4deg] overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-xl shadow-ink/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:rotate-0 lg:block"
          >
            <span className="relative block aspect-3/2 w-full overflow-hidden rounded-xl bg-lavender">
              <Image
                src={next.src}
                alt=""
                fill
                sizes="160px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="mt-2 flex flex-col items-start gap-0.5 px-1 pb-0.5 text-left">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Up next
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {next.label}
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
