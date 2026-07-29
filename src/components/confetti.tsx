"use client";

import { useMemo } from "react";

const COLORS = ["#a855f7", "#ec4899", "#f59e0b", "#8b5cf6", "#f472b6", "#fbbf24"];

interface Piece {
  left: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  rotation: number;
  round: boolean;
}

export function Confetti({ seed, count = 60 }: { seed: string | number; count?: number }) {
  const pieces = useMemo<Piece[]>(() => {
    let s = typeof seed === "number" ? seed : hashString(String(seed));
    const rand = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return (s % 1000) / 1000;
    };
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      size: 6 + rand() * 8,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      duration: 2.4 + rand() * 1.8,
      delay: rand() * 1.2,
      rotation: rand() * 360,
      round: rand() > 0.5,
    }));
  }, [seed, count]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          className="animate-confetti-fall absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.round ? 1 : 0.4),
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "2px",
            transform: `rotate(${p.rotation}deg)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) & 0x7fffffff;
  }
  return hash || 1;
}
