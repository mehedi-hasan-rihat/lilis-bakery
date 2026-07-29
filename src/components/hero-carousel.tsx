"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface Slide {
  src: string;
  alt: string;
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

const SLIDES: Slide[] = [
  {
    src: "/images/atelier-interior.jpg",
    alt: "Mimi's  Dream Cakes counter, display shelves and honeycomb ceiling",
    kicker: "A Bakery, Not a Factory",
    title: "Step inside our light-filled bakery",
    subtitle:
      "Every cake is finished by hand in a small purple-lit bakery, not on a factory line.",
    ctaLabel: "Our Bakery",
    ctaHref: "/#bakery",
  },
  {
    src: "/images/hero-cake.jpg",
    alt: "Three-tier purple ombré drip cake finished with silk peonies",
    kicker: "Handcrafted Cakes & Sweet Treats",
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
    title: "Petits fours & macarons, made to order",
    subtitle:
      "Hand-tied boxes of macarons and petite cupcakes, baked fresh in small batches.",
    ctaLabel: "Shop Petits Fours",
    ctaHref: "/shop?category=petits-fours",
  }
];

const INTERVAL_MS = 6000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slide = SLIDES[active];

  const goTo = useCallback((index: number) => {
    setActive(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <div
      className="relative overflow-hidden border-b border-border bg-lavender"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative glows — purely cosmetic, sized independently of any photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[1450px] gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-10 lg:py-24">
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <div key={active} className="animate-hero-text-in max-w-xl">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {slide.kicker}
            </p>
            <h1 className="mt-4 font-display text-4xl italic leading-[1.05] text-ink sm:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              {slide.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={slide.ctaHref}
                className="rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
              >
                {slide.ctaLabel}
              </Link>
              <Link
                href="/#bakery"
                className="rounded-full border border-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Our Bakery
              </Link>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="flex gap-2">
              {SLIDES.map((s, index) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === active}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === active ? "w-8 bg-primary" : "w-3 bg-primary/25 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image column — fixed-aspect frame, so the crop is set by width alone and never by browser window height. */}
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="relative aspect-square w-full overflow-hidden rounded-4xl border border-border shadow-2xl shadow-ink/10">
            {SLIDES.map((s, index) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.alt}
                fill
                preload={index === 0}
                sizes="(max-width: 1024px) 90vw, 45vw"
                className={`object-cover transition-all duration-700 ease-out ${
                  index === active
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
