import { useEffect, useState } from "react";
import { site } from "../site.config";
import { RollingText } from "./ui";

const LINKS = [
  { href: "#work", label: "work" },
  { href: "#services", label: "services" },
  { href: "#about", label: "about" },
  { href: "#process", label: "process" },
  { href: "#contact", label: "contact" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-white/15 backdrop-blur-xl ${
        scrolled ? "shadow-md bg-black/90" : "bg-black/75"
      }`}
    >
      <nav
        aria-label="main"
        className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 sm:py-5"
      >
        <a href="#top" className="flex items-center gap-3 text-lg sm:text-xl font-bold tracking-tight text-white group">
          <img
            src="/avatar.png"
            alt="Cabin and Code"
            className="h-8 w-8 object-cover rounded-full bg-white/10 p-0.5 border border-white/25 shadow-sm group-hover:scale-110 transition-transform duration-200"
          />
          <span>
            <RollingText text={site.name} />
            <span className="text-sm sm:text-base text-neutral-400 font-normal"> — {site.role}</span>
          </span>
        </a>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[15px] font-medium text-neutral-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "close menu" : "open menu"}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white"
        >
          <span className="relative block h-3 w-4" aria-hidden>
            <span
              className={`absolute left-0 top-0.5 h-px w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0.5 h-px w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/20 bg-black/95 backdrop-blur-md">
          <div className="px-5 py-5 flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-base text-neutral-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
