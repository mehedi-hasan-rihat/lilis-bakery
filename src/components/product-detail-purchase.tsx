"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/currency";

export function ProductDetailPurchase({ product }: { product: Product }) {
  const { addItem, openDrawer } = useCart();
  const router = useRouter();
  const [flavorId, setFlavorId] = useState(product.flavors[0].id);
  const [sizeId, setSizeId] = useState(product.flavors[0].sizes[0].id);
  const [quantity, setQuantity] = useState(1);
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
    addItem(
      {
        productSlug: product.slug,
        name: product.name,
        image: product.image,
        flavorId: flavor.id,
        flavorLabel: flavor.name,
        sizeId: size.id,
        sizeLabel: size.label,
        unitPrice: size.price,
      },
      quantity
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
    openDrawer();
  }

  function handleBuyNow() {
    addItem(
      {
        productSlug: product.slug,
        name: product.name,
        image: product.image,
        flavorId: flavor.id,
        flavorLabel: flavor.name,
        sizeId: size.id,
        sizeLabel: size.label,
        unitPrice: size.price,
      },
      quantity
    );
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl text-primary">
          {formatPrice(size.price)}
        </span>
        <span className="text-sm text-muted-foreground">{size.serves}</span>
      </div>

      {product.flavors.length > 1 && (
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Flavour
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.flavors.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFlavorChange(f.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  f.id === flavorId
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-ink hover:border-accent hover:text-accent"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Size
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {flavor.sizes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSizeId(s.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                s.id === sizeId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-ink hover:border-accent hover:text-accent"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Quantity
        </p>
        <div className="mt-2 flex w-fit items-center rounded-full border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center text-ink hover:text-accent"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center font-mono text-sm">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center text-ink hover:text-accent"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-full border border-primary px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {justAdded ? "Added to Cart ✓" : `Add to Cart · ${formatPrice(size.price * quantity)}`}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="rounded-full bg-primary px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
