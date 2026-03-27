/* eslint-disable */
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — Praethor Expert Surveillance",
  description:
    "L'équipe de Praethor teste et compare rigoureusement les équipements d'espionnage discrets. Découvrez notre méthode et notre engagement pour des tests indépendants.",
};

export default function APropos() {
  return (
    <>
      <Header />

      {/* Header */}
      <div className="relative py-24 overflow-hidden border-b border-primary/10"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,210,120,0.07) 0%, transparent 60%)" }}
      >
        <div className="green-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="section-eyebrow">Notre Équipe</span>
          <h1 className="text-5xl md:text-6xl font-heading font-black text-foreground mb-6">
            Experts en<br /><span className="text-primary">Surveillance Tech</span>
          </h1>
          <p className="text-foreground/55 text-lg font-sans">
            Testeurs indépendants. Jamais sponsorisés par les fabricants. Toujours côté consommateur.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-20">
            <div className="prose prose-invert prose-lg prose-headings:font-heading prose-headings:text-primary prose-p:text-foreground/75 prose-li:text-foreground/70 prose-blockquote:border-primary prose-strong:text-primary max-w-none">
              <h2>Qui sommes-nous ?</h2>
              <p>
                Praethor est né d'une frustration simple : les guides d'achat en ligne sur les équipements de surveillance
                sont majoritairement des articles de placement de produits, rédigés sans jamais avoir tenu le produit en main.
              </p>
              <p>
                Notre équipe se compose d'anciens professionnels des secteurs de la sécurité privée,
                de l'investigation et de la technologie. Nous avons travaillé avec ces équipements
                dans des contextes professionnels réels avant de créer ce site.
              </p>
              <blockquote>
                Un bon équipement de surveillance, c'est celui qui passe inaperçu.
                Un bon guide, c'est celui qui vous dit la vérité sur les performances.
              </blockquote>
              <h2>Notre Méthode</h2>
              <p>
                Chaque produit publié sur Praethor est acheté en conditions normales (aucun envoi presse),
                testé pendant minimum 2 semaines en usage réel, et noté selon notre grille protocole
                en 5 critères objectifs.
              </p>
            </div>
            <div>
              <div className="relative rounded-sm overflow-hidden">
                <Image
                  src="/images/praethor-com-about-expert-testing.jpeg"
                  alt="Expert Praethor testant un équipement de surveillance"
                  width={600}
                  height={450}
                  className="w-full object-cover rounded-sm"
                />
                <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
                <div className="absolute top-4 left-4 tag-tech">TESTS TERRAIN</div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🔬",
                title: "Tests Rigoureux",
                desc: "Protocole de 5 critères mesurés objectivement. Aucun produit publié sans test complet de 2 semaines.",
              },
              {
                icon: "⚖️",
                title: "Usage Légal",
                desc: "Chaque guide intègre le cadre juridique français et européen. Nous ne valorisons que les usages légaux.",
              },
              {
                icon: "🛡️",
                title: "Indépendance Totale",
                desc: "Zéro partenariat fabricant. Nos revenus viennent de l'affiliation Amazon — vos achats, pas les marques.",
              },
            ].map((v, i) => (
              <div key={i} className="card-tech p-7 rounded-sm text-center">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-sans font-bold text-primary mb-2 text-sm uppercase tracking-wider">{v.title}</h3>
                <p className="text-xs text-foreground/50 font-sans leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
