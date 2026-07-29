"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Select } from "@/components/ui/select";
import {
  products,
  CATEGORY_LABELS,
  type ProductCategory,
} from "@/lib/products";

const CATEGORY_TABS: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All Cakes" },
  { id: "signature", label: CATEGORY_LABELS.signature },
  { id: "celebration", label: CATEGORY_LABELS.celebration },
  { id: "wedding", label: CATEGORY_LABELS.wedding },
  { id: "petits-fours", label: CATEGORY_LABELS["petits-fours"] },
];

type PriceBucket = "all" | "under-5000" | "5000-10000" | "10000-20000" | "over-20000";

const PRICE_TABS: { id: PriceBucket; label: string }[] = [
  { id: "all", label: "Any Price" },
  { id: "under-5000", label: "Under ৳5,000" },
  { id: "5000-10000", label: "৳5,000 – ৳10,000" },
  { id: "10000-20000", label: "৳10,000 – ৳20,000" },
  { id: "over-20000", label: "Over ৳20,000" },
];

function isInBucket(price: number, bucket: PriceBucket): boolean {
  switch (bucket) {
    case "under-5000":
      return price < 5000;
    case "5000-10000":
      return price >= 5000 && price <= 10000;
    case "10000-20000":
      return price > 10000 && price <= 20000;
    case "over-20000":
      return price > 20000;
    default:
      return true;
  }
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A–Z" },
];

export function ShopGrid({
  initialCategory,
}: {
  initialCategory: ProductCategory | "all";
}) {
  const [category, setCategory] = useState<ProductCategory | "all">(
    initialCategory
  );
  const [priceBucket, setPriceBucket] = useState<PriceBucket>("all");
  const [sort, setSort] = useState<SortOption>("featured");

  const withStartingPrice = useMemo(
    () =>
      products.map((product) => ({
        product,
        startingPrice: Math.min(...product.sizes.map((s) => s.price)),
      })),
    []
  );

  const filtered = useMemo(() => {
    const list = withStartingPrice.filter(
      ({ product, startingPrice }) =>
        (category === "all" || product.category === category) &&
        isInBucket(startingPrice, priceBucket)
    );

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.product.name.localeCompare(b.product.name));
        break;
      default:
        break;
    }
    return sorted.map((entry) => entry.product);
  }, [withStartingPrice, category, priceBucket, sort]);

  const resetFilters = () => {
    setCategory("all");
    setPriceBucket("all");
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit space-y-8 lg:sticky lg:top-24">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
              Category
            </h2>
            {(category !== "all" || priceBucket !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline"
              >
                Reset
              </button>
            )}
          </div>
          <Select
            className="mt-4"
            label="Filter by category"
            value={category}
            onChange={(value) => setCategory(value as ProductCategory | "all")}
            options={CATEGORY_TABS.map((tab) => ({
              value: tab.id,
              label: tab.label,
            }))}
          />
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Price
          </h2>
          <ul className="mt-4 space-y-1">
            {PRICE_TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => setPriceBucket(tab.id)}
                  aria-current={priceBucket === tab.id}
                  className={`w-full rounded-md px-3 py-2 text-left font-mono text-xs uppercase tracking-widest transition-colors ${
                    priceBucket === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-lavender hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Sort by
            </span>
            <Select
              className="w-56"
              align="right"
              label="Sort by"
              value={sort}
              onChange={(value) => setSort(value as SortOption)}
              options={SORT_OPTIONS.map((option) => ({
                value: option.id,
                label: option.label,
              }))}
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted-foreground">
            No cakes match these filters — try clearing them.
          </p>
        )}
      </div>
    </div>
  );
}
