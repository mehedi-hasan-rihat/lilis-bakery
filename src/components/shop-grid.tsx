"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  products,
  CATEGORY_LABELS,
  type ProductCategory,
} from "@/lib/products";

const TABS: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All Cakes" },
  { id: "signature", label: CATEGORY_LABELS.signature },
  { id: "celebration", label: CATEGORY_LABELS.celebration },
  { id: "wedding", label: CATEGORY_LABELS.wedding },
  { id: "petits-fours", label: CATEGORY_LABELS["petits-fours"] },
];

export function ShopGrid({
  initialCategory,
}: {
  initialCategory: ProductCategory | "all";
}) {
  const [active, setActive] = useState<ProductCategory | "all">(
    initialCategory
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((p) => p.category === active),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
              active === tab.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted-foreground">
          No cakes in this collection yet — check back soon.
        </p>
      )}
    </div>
  );
}
