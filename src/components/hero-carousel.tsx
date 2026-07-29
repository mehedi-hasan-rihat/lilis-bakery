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
    src: "/images/hero-cake.jpg",
    alt: "Three-tier purple ombré drip cake finished with silk peonies",
    kicker: "Handcrafted Cakes & Sweet Treats",
    title: "The quiet art of cake making",
    subtitle:
      "A small atelier making seasonal cakes, celebration bakes and petit fours from scratch.",
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
  },
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
      className="group relative h-[78vh] min-h-[560px] w-full overflow-hidden bg-lavender sm:h-[85vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, index) => (
        <div
          key={s.src}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === active ? "z-10 opacity-100" : "opacity-0"
          }`}
        >
          <Image
            key={index === active ? `${s.src}-active` : s.src}
            src={s.src}
            alt={s.alt}
            fill
            preload={index === 0}
            sizes="100vw"
            className={`object-cover ${
              index === active ? "animate-hero-kenburns" : ""
            }`}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/5" />

      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 sm:justify-center sm:pb-0">
        <div key={active} className="animate-hero-text-in max-w-xl">
          <p className="font-mono text-xs uppercase tracking-widest text-lavender">
            {slide.kicker}
          </p>
          <h1 className="mt-4 font-display text-4xl italic leading-[1.05] text-white sm:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-white/80">
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
              href="/#atelier"
              className="rounded-full border border-white/70 px-7 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-ink"
            >
              Our Atelier
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink opacity-0 backdrop-blur transition-opacity duration-300 hover:bg-white group-hover:opacity-100 sm:left-8"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink opacity-0 backdrop-blur transition-opacity duration-300 hover:bg-white group-hover:opacity-100 sm:right-8"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, index) => (
          <button
            key={s.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === active ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
