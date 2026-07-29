"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 12;

export function AllProductsSection({ products }: { products: Product[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <section className="mx-auto max-w-[1450px] px-6 pb-20">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          Full Collection
        </p>
        <h2 className="mt-2 font-display text-3xl italic text-ink sm:text-4xl">
          Every cake, macaron &amp; petit four we make
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-full border border-primary px-7 py-3 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
