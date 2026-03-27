/* eslint-disable */
import { getPublishedBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/BlogCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 21600;

const CATEGORIES = [
  {
    icon: "📷",
    title: "Caméras Espion",
    desc: "Stylos caméra, lunettes connectées, réveil-matin, détecteurs de mouvement camouflés. Revues détaillées avec tests de qualité vidéo réels.",
  },
  {
    icon: "🎙️",
    title: "Micros Cachés",
    desc: "Bracelets enregistreurs, bijoux micro, enregistreurs de poche. Comparatifs autonomie, qualité audio et discrétion.",
  },
  {
    icon: "🔍",
    title: "Surveillance Maison",
    desc: "Caméras IP cachées, capteurs de mouvement, systèmes d'alerte discrets. Protégez votre foyer sans compromis.",
  },
  {
    icon: "🛡️",
    title: "Contre-Surveillance",
    desc: "Détecteurs de caméras cachées, brouilleurs de signal, protections vie privée. Savoir si on vous surveille.",
  },
  {
    icon: "💼",
    title: "Équipements Pro",
    desc: "Matériel d'investigation privée, GPS trackers, enregistreurs longue durée. Usage légal pour professionnels.",
  },
  {
    icon: "⌚",
    title: "Objets Connectés Cachés",
    desc: "Montres, colliers, stylos — technologie intégrée dans les objets du quotidien. Tests complets terrain.",
  },
];

const TRUST_POINTS = [
  { label: "Tests terrain", val: "100%", desc: "Chaque équipement est testé en conditions réelles avant tout avis." },
  { label: "Indépendance", val: "✓", desc: "Aucun partenariat éditorial caché. Nos avis sont toujours honnêtes." },
  { label: "Légalité", val: "⚖️", desc: "Chaque guide intègre le cadre légal français et européen en vigueur." },
];

export default async function Home() {
  const posts = await getPublishedBlogPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/praethor-com-home-hero-surveillance-tech.jpeg"
            alt="Technologies de surveillance haute performance"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 hero-overlay" />
          {/* Tech grid overlay */}
          <div className="absolute inset-0 tech-grid opacity-30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 animate-fade-in-up">
          <div className="max-w-3xl">
            {/* Terminal prompt */}
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-xs text-primary/60 tracking-widest">
                [PRAETHOR_SYSTEM] &gt;_ INITIALISATION...
              </span>
              <span className="w-2 h-4 bg-primary/70 animate-blink" />
            </div>

            <span className="section-eyebrow">Technologies d'Espionnage & Surveillance</span>

            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 leading-none tracking-tight">
              <span className="block text-foreground">ÉQUIPEMENTS</span>
              <span className="block text-primary" style={{ textShadow: "0 0 40px rgba(0,210,120,0.4)" }}>
                DISCRETS
              </span>
              <span className="block text-foreground/70 text-3xl md:text-4xl font-medium mt-2">
                Testés. Comparés. Légaux.
              </span>
            </h1>

            <div className="green-line max-w-sm mb-8" />

            <p className="text-lg text-foreground/65 mb-10 max-w-xl font-sans leading-relaxed">
              Caméras espion, micros cachés, trackers GPS, détecteurs de surveillance —
              nos experts testent rigoureusement chaque équipement pour vous guider dans vos achats.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blog" className="btn-primary">
                Voir nos Guides
              </Link>
              <Link href="/a-propos" className="btn-secondary">
                Notre Méthode de Test
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-14 flex flex-wrap gap-10">
              {[
                { val: "50+", label: "Produits testés" },
                { val: "100%", label: "Tests terrain" },
                { val: "FR", label: "Guides francophones" },
              ].map((s) => (
                <div key={s.val}>
                  <div className="font-heading font-black text-2xl text-primary mb-0.5">{s.val}</div>
                  <div className="text-xs font-mono text-foreground/40 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CATEGORIES ═══════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-eyebrow">Catégories Produits</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground mb-4">
              Nos Domaines d&apos;<span className="text-primary">Expertise</span>
            </h2>
            <p className="text-foreground/55 font-sans">
              De la caméra de surveillance miniature au détecteur d'écoute — chaque niche testée en profondeur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="card-tech p-6 rounded-sm group hover:border-primary/35 transition-all duration-300 cursor-default">
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                  <h3 className="font-sans font-bold text-foreground/90 group-hover:text-primary transition-colors text-base">
                    {cat.title}
                  </h3>
                </div>
                <p className="text-sm text-foreground/50 font-sans leading-relaxed">{cat.desc}</p>
                <div className="mt-4 pt-3 border-t border-primary/8">
                  <Link href="/blog" className="text-xs font-mono text-primary/50 hover:text-primary transition-colors flex items-center gap-1">
                    <span>&gt;</span> Voir les guides
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EQUIPMENT SECTION ═══════════ */}
      <section className="py-24 bg-secondary/40 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <div className="w-full lg:w-1/2 rounded-sm overflow-hidden relative">
              <Image
                src="/images/praethor-com-home-equipment-spy-gadgets.jpeg"
                alt="Gadgets espion et équipements de surveillance discrets"
                width={800}
                height={550}
                className="object-cover w-full rounded-sm"
              />
              {/* Overlay scan effect */}
              <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
              <div className="absolute top-4 left-4 tag-tech">ÉQUIPEMENTS</div>
            </div>
            <div className="w-full lg:w-1/2 space-y-7">
              <span className="section-eyebrow">Sélection Rigoureuse</span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">
                Les Meilleurs Gadgets<br />
                <span className="text-primary">du Marché Décryptés</span>
              </h2>
              <p className="text-foreground/60 font-sans leading-relaxed">
                Notre équipe sélectionne, achète et teste chaque équipement : qualité vidéo/audio, autonomie réelle,
                discrétion en usage quotidien, rapport qualité-prix. Nous ne publions que les produits qui ont
                passé nos tests terrain.
              </p>
              <ul className="space-y-3">
                {[
                  "Tests de résolution vidéo en conditions réelles (nuit & jour)",
                  "Mesures d'autonomie batterie en usage continu",
                  "Évaluation de la discrétion en situations sociales",
                  "Comparatif prix vs performances avec alternatives Amazon",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-primary mt-0.5 text-xs flex-shrink-0">[{String(i+1).padStart(2,'0')}]</span>
                    <span className="text-sm text-foreground/65 font-sans">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-sans font-semibold text-sm hover:text-primary-hover transition-colors">
                Voir tous nos tests
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GUIDES EXPERTS ═══════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-14">
            <div className="w-full lg:w-1/2 rounded-sm overflow-hidden relative">
              <Image
                src="/images/praethor-com-home-guides-surveillance-setup.jpeg"
                alt="Guide d'installation setup surveillance"
                width={800}
                height={550}
                className="object-cover w-full rounded-sm"
              />
              <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
              <div className="absolute top-4 left-4 tag-tech">GUIDES</div>
            </div>
            <div className="w-full lg:w-1/2 space-y-7">
              <span className="section-eyebrow">Guides d&apos;Installation</span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">
                Déployer votre Setup<br />
                <span className="text-primary">en Toute Légalité</span>
              </h2>
              <p className="text-foreground/60 font-sans leading-relaxed">
                Acheter un équipement de surveillance, c'est bien. L'utiliser correctement et légalement,
                c'est essentiel. Nos guides d'installation couvrent le déploiement technique
                ET le cadre juridique français en vigueur.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Installation Step-by-Step", desc: "Guides détaillés pour chaque type d'équipement." },
                  { title: "Cadre Légal FR/EU", desc: "Ce que vous pouvez et ne pouvez pas faire." },
                  { title: "Optimisation Placement", desc: "Zones de couverture, angles, discrétion." },
                  { title: "Configuration Avancée", desc: "Applications, stockage, accès à distance." },
                ].map((g, i) => (
                  <div key={i} className="card-tech p-4 rounded-sm">
                    <h4 className="text-xs font-sans font-bold text-primary mb-1">{g.title}</h4>
                    <p className="text-xs text-foreground/50 font-sans">{g.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS / LABO ═══════════ */}
      <section className="py-24 bg-secondary/40 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <div className="w-full lg:w-1/2 rounded-sm overflow-hidden relative">
              <Image
                src="/images/praethor-com-home-reviews-testing-lab.jpeg"
                alt="Laboratoire de tests équipements espionnage"
                width={800}
                height={550}
                className="object-cover w-full rounded-sm"
              />
              <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
              <div className="absolute top-4 left-4 tag-tech">LAB TESTS</div>
            </div>
            <div className="w-full lg:w-1/2 space-y-7">
              <span className="section-eyebrow">Protocole de Tests</span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">
                Comparatifs Techniques<br />
                <span className="text-primary">Sans Compromis</span>
              </h2>
              <p className="text-foreground/60 font-sans leading-relaxed">
                Chaque test publiée sur Praethor suit un protocole rigoureux : cas d'usage réels, conditions variées
                (lumière, distance, température), mesures objectives et aucun partenariat avec les fabricants.
              </p>
              <div className="space-y-4">
                {[
                  { metric: "Qualité Vidéo", note: "Résolution réelle vs annoncée, framerate, vision nocturne" },
                  { metric: "Autonomie Batterie", note: "Durée mesurée en usage continu et en veille active" },
                  { metric: "Discrétion", note: "Score d'invisibilité en situation réelle quotidienne" },
                  { metric: "App & Connectivité", note: "Facilité d'utilisation, stabilité, fonctionnalités" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-4 card-tech p-3 rounded-sm">
                    <div className="w-1.5 h-8 bg-primary rounded-full flex-shrink-0" />
                    <div>
                      <div className="text-xs font-mono text-primary font-semibold">{m.metric}</div>
                      <div className="text-xs text-foreground/50 font-sans mt-0.5">{m.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECURITE DOMESTIQUE ═══════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-14">
            <div className="w-full lg:w-1/2 rounded-sm overflow-hidden relative">
              <Image
                src="/images/praethor-com-home-security-home-protection.jpeg"
                alt="Sécurité domestique et protection famille"
                width={800}
                height={550}
                className="object-cover w-full rounded-sm"
              />
              <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
              <div className="absolute top-4 left-4 tag-tech">SÉCURITÉ</div>
            </div>
            <div className="w-full lg:w-1/2 space-y-7">
              <span className="section-eyebrow">Sécurité Domestique</span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">
                Protéger votre Foyer<br />
                <span className="text-primary">Discrètement</span>
              </h2>
              <p className="text-foreground/60 font-sans leading-relaxed">
                Babycams cachées, détecteurs d'intrusion discrets, caméras camouflées en objets décoratifs —
                protéger sa famille et ses biens sans altérer son intérieur est désormais accessible à tous.
              </p>
              <ul className="space-y-3">
                {[
                  "Caméras IP miniatures intégrées dans des objets quotidiens",
                  "Systèmes d'alerte GSM sans abonnement mensuel",
                  "Surveillance périmétrique invisible de l'extérieur",
                  "Accès temps réel depuis smartphone n'importe où",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/65 font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/blog" className="btn-secondary">
                Guides Sécurité Maison
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TRUST ═══════════ */}
      <section className="py-16 relative"
        style={{ background: "linear-gradient(135deg, rgba(0,210,120,0.06) 0%, rgba(30,150,255,0.04) 100%)" }}
      >
        <div className="green-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRUST_POINTS.map((t, i) => (
              <div key={i} className="card-tech p-8 rounded-sm text-center">
                <div className="text-3xl font-heading font-black text-primary mb-3">{t.val}</div>
                <h3 className="font-sans font-bold text-foreground/90 mb-2 text-sm uppercase tracking-wider">{t.label}</h3>
                <p className="text-xs text-foreground/50 font-sans leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="blue-line absolute bottom-0 left-0 right-0" />
      </section>

      {/* ═══════════ BLOG ═══════════ */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="section-eyebrow">Dernières Analyses</span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">
                Articles <span className="text-primary">Récents</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 text-primary font-sans font-semibold text-sm hover:text-primary-hover transition-colors"
            >
              Voir tout
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentPosts.map((post: any) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="card-tech p-14 rounded-sm text-center max-w-2xl mx-auto">
              <span className="font-mono text-xs text-primary/40 block mb-3">[LOADING_CONTENT...]</span>
              <p className="text-lg text-foreground/40 font-sans">
                Aucun article publié pour le moment.
              </p>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="btn-primary">
              Tous les articles
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-25" />
        <div className="green-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="section-eyebrow">Prêt à Commencer ?</span>
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-foreground">
            Des équipements. <span className="text-primary">Des tests.</span><br />
            Des décisions éclairées.
          </h2>
          <p className="text-foreground/55 font-sans mb-10 max-w-lg mx-auto">
            Explorez nos guides pour faire le bon choix — sans vous faire vendre n'importe quoi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="btn-primary">
              Explorer les Guides
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous Contacter
            </Link>
          </div>
        </div>
        <div className="blue-line absolute bottom-0 left-0 right-0" />
      </section>

      <Footer />
    </>
  );
}
