import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { AllProductsSection } from "@/components/all-products-section";
import { HeroCarousel } from "@/components/hero-carousel";
import { Marquee } from "@/components/marquee";
import { products, CATEGORY_LABELS, type ProductCategory } from "@/lib/products";

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
    products.find((p) => p.slug === slug)
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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* All products */}
      <AllProductsSection products={products} />

      {/* Atelier / about */}
      <section id="atelier" className="border-t border-border bg-lavender">
        <div className="mx-auto grid max-w-[1450px] gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl md:order-2">
            <Image
              src="/images/atelier-interior.jpg"
              alt="Lilas Bakery atelier counter and display shelves"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              A studio, not a factory
            </p>
            <h2 className="mt-2 font-display text-3xl italic text-ink sm:text-4xl">
              A light-filled atelier where every cake is finished by hand
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Lilas started from a rented kitchen with one oven and a stack
              of recipe cards. Years later, the recipes are still hers, the
              butter is still European, and a limited number of custom
              orders are still taken each month so every cake gets the
              attention it deserves.
            </p>
            <ul className="mt-6 space-y-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <li>— Seasonal ingredients, no artificial anything</li>
              <li>— Hand delivered on your date</li>
              <li>— 12 Sugar Lane, Purple District</li>
            </ul>
            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1450px] px-6 py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Bespoke Commissions
        </p>
        <h2 className="mx-auto mt-2 max-w-xl font-display text-3xl italic text-ink sm:text-4xl">
          Have something special in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Share the occasion, palette and servings — we&apos;ll get back to
          you with a design and a quote within two days.
        </p>
        <Link
          href="/shop?category=wedding"
          className="mt-8 inline-block rounded-full border border-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Start a Commission
        </Link>
      </section>
    </div>
  );
}
