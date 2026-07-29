"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/currency";
import { Select } from "@/components/ui/select";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCart();
  const router = useRouter();
  const [flavorId, setFlavorId] = useState(product.flavors[0].id);
  const [sizeId, setSizeId] = useState(product.flavors[0].sizes[0].id);
  const [justAdded, setJustAdded] = useState(false);

  const flavor =
    product.flavors.find((f) => f.id === flavorId) ?? product.flavors[0];
  const size = flavor.sizes.find((s) => s.id === sizeId) ?? flavor.sizes[0];

  function handleFlavorChange(nextFlavorId: string) {
    setFlavorId(nextFlavorId);
    const nextFlavor =
      product.flavors.find((f) => f.id === nextFlavorId) ?? product.flavors[0];
    const stillAvailable = nextFlavor.sizes.some((s) => s.id === sizeId);
    if (!stillAvailable) setSizeId(nextFlavor.sizes[0].id);
  }

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
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-primary/5">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-4/4 w-full overflow-hidden bg-lavender"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-foreground">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-xl text-ink transition-colors hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          {product.flavors.length > 1 && (
            <Select
              value={flavorId}
              onChange={handleFlavorChange}
              label={`Flavour for ${product.name}`}
              className="w-full"
              options={product.flavors.map((f) => ({
                value: f.id,
                label: f.name,
              }))}
            />
          )}

          <div className="flex items-center justify-between gap-3">
            <Select
              value={sizeId}
              onChange={setSizeId}
              label={`Size for ${product.name}`}
              className="w-full"
              options={flavor.sizes.map((s) => ({
                value: s.id,
                label: s.label,
                description: s.serves,
              }))}
            />
            <span className="whitespace-nowrap font-display text-lg text-primary">
              {formatPrice(size.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 rounded-md border border-primary px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {justAdded ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 rounded-md bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
