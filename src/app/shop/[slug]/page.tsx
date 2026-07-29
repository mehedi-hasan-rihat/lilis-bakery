import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductDetailPurchase } from "@/components/product-detail-purchase";
import { products, getProductBySlug, CATEGORY_LABELS } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Lilas Bakery`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .concat(products.filter((p) => p.slug !== product.slug))
    .filter((p, index, arr) => arr.findIndex((x) => x.slug === p.slug) === index)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-[1450px] px-6 py-16">
      <nav className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <Link href="/shop" className="hover:text-accent">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-accent"
        >
          {CATEGORY_LABELS[product.category]}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-lavender">
          <Image
            src={product.image}
            alt={product.name}
            fill
            preload
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {CATEGORY_LABELS[product.category]}
          </p>
          <h1 className="mt-2 font-display text-4xl italic text-ink sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-muted-foreground">{product.tagline}</p>
          <p className="mt-6 max-w-md leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <ProductDetailPurchase product={product} />
          </div>

          <ul className="mt-8 space-y-1.5 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            <li>— Baked fresh and hand-delivered on your date</li>
            <li>— Made from scratch, no artificial anything</li>
            <li>— Limited orders taken each week</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl italic text-ink sm:text-3xl">
            You may also like
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
