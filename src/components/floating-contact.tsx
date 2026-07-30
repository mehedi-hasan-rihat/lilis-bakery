const WHATSAPP_HREF =
  "https://wa.me/8801911234567?text=" +
  encodeURIComponent("Hi Mimi's Dream Cakes! I'd like to ask about a cake order.");

/** Facebook page handle — update if the page username changes. */
const MESSENGER_HREF = "https://m.me/mimisdreamcakes";

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.62 1.4 5.12L2 22l5.12-1.5a9.87 9.87 0 0 0 4.92 1.31h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.06h-.01a8.13 8.13 0 0 1-4.14-1.14l-.3-.18-3.04.89.9-2.96-.2-.31a8.1 8.1 0 0 1-1.24-4.35c0-4.49 3.65-8.14 8.14-8.14 2.17 0 4.21.85 5.75 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.66 8.15-8.14 8.15Zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.16 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

const MessengerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.32 2 2 6.16 2 11.7c0 2.9 1.19 5.42 3.13 7.16.16.15.26.35.27.57l.05 1.78c.02.57.6.94 1.12.71l1.99-.88a.79.79 0 0 1 .53-.04c.91.25 1.88.38 2.91.38 5.68 0 10-4.16 10-9.7C22 6.16 17.68 2 12 2Zm6.01 7.46-2.94 4.67a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.67a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.39c.42-.32.97.18.69.62Z" />
  </svg>
);

/**
 * Quick-contact buttons pinned to the bottom-right of every page. Pure links,
 * so this stays a server component — labels expand on hover with CSS only.
 */
export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/20 transition-transform duration-200 hover:scale-110 hover:bg-[#1EBE57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:h-14 sm:w-14"
      >
        <WhatsAppIcon />
        <span
          aria-hidden
          className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
        >
          WhatsApp
        </span>
      </a>

      <a
        href={MESSENGER_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on Facebook Messenger"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0084FF] text-white shadow-lg shadow-ink/20 transition-transform duration-200 hover:scale-110 hover:bg-[#0068CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:h-14 sm:w-14"
      >
        <MessengerIcon />
        <span
          aria-hidden
          className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
        >
          Messenger
        </span>
      </a>
    </div>
  );
}
