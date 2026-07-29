"use client";

import { useEffect, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = "Select…",
  align = "left",
  className,
}: {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  align?: "left" | "right";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setHighlighted(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [open, selectedIndex]);

  useEffect(() => {
    if (open) {
      optionRefs.current[highlighted]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, highlighted]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        setHighlighted((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlighted((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        onChange(options[highlighted].value);
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className="flex w-full items-center justify-between gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-left text-sm text-ink shadow-sm transition-all hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180 text-accent" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className={`animate-dropdown-in absolute z-40 mt-2 max-h-72 w-full min-w-max overflow-auto rounded-xl border border-border bg-card p-1.5 shadow-xl shadow-ink/10 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlighted;
            return (
              <li
                key={option.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                role="option"
                aria-selected={isSelected}
              >
                <button
                  type="button"
                  onMouseEnter={() => setHighlighted(index)}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isHighlighted
                        ? "bg-lavender text-ink"
                        : "text-ink"
                  }`}
                >
                  <span className="flex flex-col">
                    <span className="whitespace-nowrap">{option.label}</span>
                    {option.description && (
                      <span
                        className={`text-xs ${
                          isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {option.description}
                      </span>
                    )}
                  </span>
                  {isSelected && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
