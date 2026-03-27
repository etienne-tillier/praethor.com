import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-secondary/60 border-t border-primary/10 pt-16 pb-8">
      <div className="green-line mb-16" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 100 100" className="w-9 h-9 flex-shrink-0">
                <rect width="100" height="100" fill="#0a0c0f"/>
                <rect x="4" y="4" width="92" height="92" fill="none" stroke="#00d278" strokeWidth="1" opacity="0.6"/>
                <line x1="4" y1="4" x2="14" y2="4" stroke="#00d278" strokeWidth="2"/>
                <line x1="4" y1="4" x2="4" y2="14" stroke="#00d278" strokeWidth="2"/>
                <line x1="96" y1="4" x2="86" y2="4" stroke="#00d278" strokeWidth="2"/>
                <line x1="96" y1="4" x2="96" y2="14" stroke="#00d278" strokeWidth="2"/>
                <ellipse cx="50" cy="50" rx="24" ry="15" fill="none" stroke="#00d278" strokeWidth="1.5" opacity="0.9"/>
                <circle cx="50" cy="50" r="9" fill="none" stroke="#00d278" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="4.5" fill="#00d278" opacity="0.9"/>
                <circle cx="50" cy="50" r="1.8" fill="#0a0c0f"/>
              </svg>
              <div>
                <span className="font-heading text-lg font-black tracking-[0.1em] text-foreground">PRAETHOR</span>
                <span className="block text-[9px] font-mono text-primary/50 tracking-widest uppercase -mt-0.5">Surveillance Tech</span>
              </div>
            </div>
            <p className="text-foreground/50 leading-relaxed max-w-sm font-sans text-sm">
              {siteConfig.description}
            </p>
            <p className="font-mono text-primary/50 text-xs">
              <span className="text-primary/40">{"// "}</span>Tests rigoureux. Expertise indépendante. Usage légal.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-primary/80">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200 font-sans"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-primary/80">
              Légal
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/mentions-legales" className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200 font-sans">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200 font-sans">
                Confidentialité
              </Link>
              <Link href="/contact" className="text-sm text-foreground/50 hover:text-primary transition-colors duration-200 font-sans">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="green-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/30 font-mono">
          <p>© {year} {siteConfig.name}. Tous droits réservés.</p>
          <p className="text-primary/30 tracking-wider">
            [SYSTEM ONLINE] — Usage légal uniquement
          </p>
        </div>
      </div>
    </footer>
  );
}
