const MARQUEE_ITEMS = [
  "Dear valued customers, due to some operational inconveniences, our delivery is limited only to a few locations for the time being. However, the outlet pick-up option is available. We expect to resolve this issue soon. Thank you.",
  "Free Hand Delivery in Dhaka",
  "Custom Cakes for Every Occasion",
  "Cash on Delivery Available",
];

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {MARQUEE_ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-primary-foreground"
        >
          {item}
          <span aria-hidden className="text-primary-foreground/50">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-primary py-3">
      <div className="flex w-max animate-marquee">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </div>
  );
}
