"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCart();
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);

  const flavor = product.flavors[0];
  const size = flavor.sizes[0];

  function handleAdd() {
    addItem({
      productSlug: product.slug,
      name: product.name,
      image: product.image,
      flavorId: flavor.id,
      flavorLabel: flavor.name,
      sizeId: size.id,
      sizeLabel: size.label,
      unitPrice: size.price,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
    openDrawer();
  }

  function handleBuyNow() {
    addItem({
      productSlug: product.slug,
      name: product.name,
      image: product.image,
      flavorId: flavor.id,
      flavorLabel: flavor.name,
      sizeId: size.id,
      sizeLabel: size.label,
      unitPrice: size.price,
    });
    router.push("/checkout");
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-lavender"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-accent-foreground">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-lg leading-tight text-ink transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.tagline}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            {size.label} · {flavor.name}
          </span>
          <span className="shrink-0 font-display text-lg leading-none text-primary">
            {formatPrice(size.price)}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 rounded-full border border-primary px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 rounded-full bg-primary px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
