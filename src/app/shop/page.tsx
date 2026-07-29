import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop-grid";
import type { ProductCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Lilas Bakery",
  description:
    "Browse signature cakes, celebration cakes, wedding cakes and petits fours, handcrafted to order at Lilas Bakery.",
};

const VALID_CATEGORIES: ProductCategory[] = [
  "signature",
  "celebration",
  "wedding",
  "petits-fours",
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory =
    category && VALID_CATEGORIES.includes(category as ProductCategory)
      ? (category as ProductCategory)
      : "all";

  return (
    <div className="mx-auto max-w-[1450px] px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Shop
      </p>
      <h1 className="mt-2 font-display text-4xl italic text-ink sm:text-5xl">
        Four ways to buy
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Signature, seasonal and celebration cakes, baked in small batches.
        Choose a size, add it to your box, and we&apos;ll have it ready for
        your date.
      </p>

      <div className="mt-10">
        <ShopGrid initialCategory={initialCategory} />
      </div>
    </div>
  );
}
