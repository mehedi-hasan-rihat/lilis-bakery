import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1450px] gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-display text-2xl italic">Mimi's  Dream Cakes</p>
          <p className="mt-3 max-w-[26ch] text-sm text-primary-foreground/70">
            A small bakery making seasonal cakes and petit fours from
            scratch, one order at a time.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/50">
            Shop
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-accent">All Cakes</Link></li>
            <li><Link href="/shop?category=signature" className="hover:text-accent">Signature Cakes</Link></li>
            <li><Link href="/shop?category=wedding" className="hover:text-accent">Wedding Cakes</Link></li>
            <li><Link href="/shop?category=petits-fours" className="hover:text-accent">Petits Fours</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/50">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>12 Sugar Lane, Purple District</li>
            <li>Tuesday – Sunday, 9am – 6pm</li>
            <li>hello@mimisdreamcakes.com</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/50">
            Custom Orders
          </p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>Wedding &amp; holud cakes</li>
            <li>Eid &amp; aqiqah cakes</li>
            <li>Limited orders each month</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 px-6 py-6 text-center font-mono text-[11px] uppercase tracking-widest text-primary-foreground/50">
        © {new Date().getFullYear()} Mimi's  Dream Cakes. Handcrafted with love.
      </div>
    </footer>
  );
}
