"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { products, CATEGORY_LABELS, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/currency";

const MAX_RESULTS = 6;

interface Match {
  product: Product;
  startingPrice: number;
}

/**
 * Pre-built haystacks so every keystroke is a cheap substring scan. Flavours are
 * deliberately left out — every cake shares the same flavour templates, so
 * indexing them would make a term like "chocolate" match the whole catalogue.
 */
const SEARCH_INDEX = products.map((product) => ({
  product,
  startingPrice: Math.min(
    ...product.flavors.flatMap((f) => f.sizes.map((s) => s.price))
  ),
  name: product.name.toLowerCase(),
  haystack: [product.name, product.tagline, CATEGORY_LABELS[product.category]]
    .join(" ")
    .toLowerCase(),
}));

function search(query: string): Match[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return SEARCH_INDEX.filter((entry) =>
    terms.every((term) => entry.haystack.includes(term))
  )
    // Name hits are the strongest signal, so they lead.
    .map((entry) => ({
      ...entry,
      rank: terms.every((term) => entry.name.includes(term)) ? 0 : 1,
    }))
    .sort((a, b) => a.rank - b.rank)
    .slice(0, MAX_RESULTS)
    .map(({ product, startingPrice }) => ({ product, startingPrice }));
}

export function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLFormElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const results = useMemo(() => search(query), [query]);
  const showPanel = open && query.trim().length > 0;

  useEffect(() => {
    if (!showPanel) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [showPanel]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  useEffect(() => {
    if (showPanel) {
      optionRefs.current[highlighted]?.scrollIntoView({ block: "nearest" });
    }
  }, [showPanel, highlighted]);

  function goTo(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/shop/${slug}`);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showPanel || results.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlighted((i) => (i + 1) % results.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlighted((i) => (i - 1 + results.length) % results.length);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const target = results[highlighted] ?? results[0];
    if (target) goTo(target.product.slug);
  }

  return (
    <form
      ref={rootRef}
      onSubmit={handleSubmit}
      role="search"
      className="relative hidden flex-1 items-center sm:flex"
    >
      <div className="flex w-full max-w-md items-center overflow-hidden rounded-full border border-border bg-card focus-within:border-accent">
        <input
          type="text"
          name="search"
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="header-search-results"
          aria-activedescendant={
            showPanel && results.length > 0
              ? `header-search-option-${highlighted}`
              : undefined
          }
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search cakes & petits fours"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-ink placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="flex h-9 w-8 shrink-0 items-center justify-center text-muted-foreground hover:text-accent"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          aria-label="Search"
          className="flex h-9 w-11 shrink-0 items-center justify-center text-muted-foreground hover:text-accent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </div>

      {showPanel && (
        <div className="animate-dropdown-in absolute left-0 top-full z-40 mt-2 w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-ink/10">
          {results.length > 0 ? (
            <ul
              id="header-search-results"
              role="listbox"
              aria-label="Search results"
              className="max-h-96 overflow-auto p-1.5"
            >
              {results.map(({ product, startingPrice }, index) => (
                <li
                  key={product.slug}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  id={`header-search-option-${index}`}
                  role="option"
                  aria-selected={index === highlighted}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => goTo(product.slug)}
                    className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                      index === highlighted ? "bg-lavender" : ""
                    }`}
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-lavender">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-ink">
                        {product.name}
                      </span>
                      <span className="block truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {CATEGORY_LABELS[product.category]}
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-sm text-primary">
                      {formatPrice(startingPrice)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-5 text-center text-sm text-muted-foreground">
              No cakes match &ldquo;{query.trim()}&rdquo;
            </p>
          )}
        </div>
      )}
    </form>
  );
}
