import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur-md">
      {/* Green scan line top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="container mx-auto px-4 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-9 h-9 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,210,120,0.8)]">
              <rect width="100" height="100" fill="#0a0c0f"/>
              <rect x="4" y="4" width="92" height="92" fill="none" stroke="#00d278" strokeWidth="1" opacity="0.6"/>
              <line x1="4" y1="4" x2="14" y2="4" stroke="#00d278" strokeWidth="2"/>
              <line x1="4" y1="4" x2="4" y2="14" stroke="#00d278" strokeWidth="2"/>
              <line x1="96" y1="4" x2="86" y2="4" stroke="#00d278" strokeWidth="2"/>
              <line x1="96" y1="4" x2="96" y2="14" stroke="#00d278" strokeWidth="2"/>
              <line x1="4" y1="96" x2="14" y2="96" stroke="#00d278" strokeWidth="2"/>
              <line x1="4" y1="96" x2="4" y2="86" stroke="#00d278" strokeWidth="2"/>
              <line x1="96" y1="96" x2="86" y2="96" stroke="#00d278" strokeWidth="2"/>
              <line x1="96" y1="96" x2="96" y2="86" stroke="#00d278" strokeWidth="2"/>
              <ellipse cx="50" cy="50" rx="24" ry="15" fill="none" stroke="#00d278" strokeWidth="1.5" opacity="0.9"/>
              <circle cx="50" cy="50" r="9" fill="none" stroke="#00d278" strokeWidth="1.5"/>
              <circle cx="50" cy="50" r="4.5" fill="#00d278" opacity="0.9"/>
              <circle cx="50" cy="50" r="1.8" fill="#0a0c0f"/>
            </svg>
          </div>
          <div>
            <span className="font-heading text-lg font-black tracking-[0.1em] text-foreground group-hover:text-primary transition-colors duration-300">
              PRAETHOR
            </span>
            <span className="block text-[9px] font-mono text-primary/60 tracking-widest uppercase -mt-0.5">
              Surveillance Tech
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-sans font-medium uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/blog"
            className="btn-primary text-xs px-5 py-2.5"
          >
            Voir les Guides
          </Link>
        </nav>

        {/* Mobile */}
        <details className="md:hidden relative">
          <summary className="list-none cursor-pointer p-2 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-2 w-52 card-tech rounded-sm p-4 flex flex-col gap-3">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-sans uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors py-2 border-b border-primary/10"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
