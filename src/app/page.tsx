import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { AllProductsSection } from "@/components/all-products-section";
import { HeroCarousel } from "@/components/hero-carousel";
import { Marquee } from "@/components/marquee";
import {
  products,
  CATEGORY_LABELS,
  type ProductCategory,
} from "@/lib/products";

const FEATURED_SLUGS = [
  "wild-berry-bloom",
  "lavender-rosette",
  "magic-unicorn",
  "petits-fours-macaron-box",
];

const CATEGORY_PREVIEW: { category: ProductCategory; image: string }[] = [
  { category: "signature", image: "/images/lavender-rosette.jpg" },
  { category: "celebration", image: "/images/magic-unicorn.jpg" },
  { category: "wedding", image: "/images/hero-cake.jpg" },
  { category: "petits-fours", image: "/images/petits-fours.jpg" },
];

export default function Home() {
  const featured = FEATURED_SLUGS.map((slug) =>
    products.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      {/* Hero */}
      <HeroCarousel />

      {/* Stats strip */}
      <section className="border-y border-border bg-lavender">
        <div className="mx-auto grid max-w-[1450px] grid-cols-2 gap-8 px-6 py-10 text-center sm:grid-cols-4">
          {[
            ["8", "Years in kitchen"],
            ["500+", "Cakes baked"],
            ["40+", "Weddings styled"],
            ["100%", "Made from scratch"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-3xl text-primary">{value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1450px] px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Collections
        </p>
        <h2 className="mt-2 font-display text-3xl italic text-ink sm:text-4xl">
          Signature, seasonal &amp; celebration
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {CATEGORY_PREVIEW.map(({ category, image }) => (
            <Link
              key={category}
              href={`/shop?category=${category}`}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={CATEGORY_LABELS[category]}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0" />
              <span className="absolute bottom-4 left-4 font-display text-lg italic text-white">
                {CATEGORY_LABELS[category]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-[1450px] px-6 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Best Sellers
            </p>
            <h2 className="mt-2 font-display text-3xl italic text-ink sm:text-4xl">
              Eight pieces our regulars keep coming back for
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-mono text-xs uppercase tracking-widest text-primary hover:text-accent"
          >
            Shop all cakes →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* All products */}
      <AllProductsSection products={products} />

      {/* Bakery / about */}
      <section id="bakery" className="border-t border-border bg-lavender">
        <div className="mx-auto grid max-w-[1450px] gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video w-full overflow-hidden rounded-4xl border border-border shadow-2xl shadow-ink/10 md:order-2">
            <Image
              src="/images/atelier-interior.jpg"
              alt="Mimi's  Dream Cakes counter and display shelves"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              A Bakery, Not a Factory
            </p>
            <h2 className="mt-2 font-display text-3xl italic text-ink sm:text-4xl">
              A light-filled bakery where every cake is finished by hand
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Lilas started from a rented kitchen with one oven and a stack of
              recipe cards. Years later, the recipes are still hers, the butter
              is still European, and a limited number of custom orders are still
              taken each month so every cake gets the attention it deserves.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Today the bakery bakes fresh every morning for walk-in customers
              and pre-booked orders alike — no sitting frozen in a display case,
              no shortcuts on the ingredients.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Small-Batch Baking",
                  detail: "Baked fresh to order, never frozen",
                },
                {
                  title: "European Butter",
                  detail: "No shortcuts, no artificial anything",
                },
                {
                  title: "Custom Orders Welcome",
                  detail: "Wedding, Eid, aqiqah, birthday & more",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <p className="font-display text-base italic text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <li>— Fresh baked every morning</li>
              <li>— Hand delivered on your date</li>
              <li>— 12 Sugar Lane, Purple District</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-block rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
              >
                Shop the Collection
              </Link>
              <Link
                href="/contact"
                className="inline-block rounded-full border border-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1450px] px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Custom Cake Orders
        </p>
        <h2 className="mx-auto mt-2 max-w-xl font-display text-3xl italic text-ink sm:text-4xl">
          Ordering a cake for your occasion?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Wedding &amp; holud stages, Eid spreads, aqiqah, birthdays or a Pohela
          Boishakh table — message us the occasion, design and guest count on
          WhatsApp or place an order online, and we&apos;ll confirm your design
          and price within two days. Hand-delivered fresh across Dhaka, with
          outlet pick-up available nationwide.
        </p>

        <div className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-2">
          {[
            "Wedding & Holud",
            "Eid Specials",
            "Aqiqah & Birthday",
            "Corporate & Iftar",
          ].map((occasion) => (
            <span
              key={occasion}
              className="rounded-full border border-border bg-card px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
            >
              {occasion}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop?category=wedding"
            className="inline-block rounded-full border border-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Order a Custom Cake
          </Link>
          <a
            href="https://wa.me/8801911234567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.62 1.4 5.12L2 22l5.12-1.5a9.87 9.87 0 0 0 4.92 1.31h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.13 8.13 0 0 1-4.14-1.14l-.3-.18-3.04.89.9-2.96-.2-.31a8.1 8.1 0 0 1-1.24-4.35c0-4.49 3.65-8.14 8.14-8.14 2.17 0 4.21.85 5.75 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.66 8.15-8.14 8.15Zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
