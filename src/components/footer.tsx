import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-display text-2xl italic">Lilas Bakery</p>
          <p className="mt-3 max-w-[26ch] text-sm text-primary-foreground/70">
            A small atelier making seasonal cakes and petit fours from
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
            <li>hello@lilasbakery.com</li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/50">
            Commissions
          </p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>Weddings &amp; private dinners</li>
            <li>Custom celebration cakes</li>
            <li>Limited orders each month</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 px-6 py-6 text-center font-mono text-[11px] uppercase tracking-widest text-primary-foreground/50">
        © {new Date().getFullYear()} Lilas Bakery. Handcrafted with love.
      </div>
    </footer>
  );
}
