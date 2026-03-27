/* eslint-disable */
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Praethor",
  description: "Contactez l'équipe Praethor pour toute question sur nos tests d'équipements de surveillance ou suggestions d'articles.",
};

export default function Contact() {
  return (
    <>
      <Header />

      <div className="relative py-20 overflow-hidden border-b border-primary/10"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,210,120,0.06) 0%, transparent 60%)" }}
      >
        <div className="green-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <span className="section-eyebrow">Communication Sécurisée</span>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
            Prendre <span className="text-primary">Contact</span>
          </h1>
          <p className="text-foreground/55 font-sans">
            Une question sur un produit testé, une suggestion d'article ou un signalement d'erreur ? Écrivez-nous.
          </p>
        </div>
      </div>

      <section className="py-20 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="card-tech rounded-sm p-10 space-y-8">
            {/* Email */}
            <div className="space-y-3">
              <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
                Adresse E-mail
              </h2>
              <p className="text-foreground/60 font-sans text-sm leading-relaxed">
                Pour toutes vos questions, demandes ou signalements. Délai de réponse : 48h ouvrées.
              </p>
              <a
                href="mailto:contact@praethor.com"
                className="inline-flex items-center gap-3 mt-2 px-6 py-3 card-tech rounded-sm hover:border-primary/40 text-primary font-mono font-semibold text-sm transition-all duration-300"
                style={{ borderColor: "rgba(0,210,120,0.2)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@praethor.com
              </a>
            </div>

            <div className="green-line" />

            <div className="space-y-3">
              <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
                Suggestions de Tests
              </h2>
              <p className="text-foreground/60 font-sans text-sm leading-relaxed">
                Vous souhaitez qu'on teste un produit spécifique, une catégorie non couverte ou que l'on
                mette à jour un test existant ? Envoyez-nous les références — nous intégrons vos suggestions
                dans notre calendrier éditorial.
              </p>
            </div>

            <div className="green-line" />

            <div className="space-y-3">
              <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-primary">
                Signalement d'Erreur
              </h2>
              <p className="text-foreground/60 font-sans text-sm leading-relaxed">
                Nos tests sont réalisés à un moment précis et les produits évoluent (mises à jour firmware,
                nouvelles versions). Si vous constatez une inexactitude, signalez-la — nous corrigerons
                dans les 48h avec mention de la correction.
              </p>
            </div>

            <div className="card-tech rounded-sm p-4" style={{ borderLeftWidth: 3, borderLeftColor: "rgba(0,210,120,0.5)" }}>
              <p className="text-xs text-foreground/40 font-mono">
                <span className="text-primary/50">// NOTE :</span> Nous ne répondons pas aux propositions de liens sponsorisés,
                de tests rémunérés par les fabricants ni aux demandes de retrait d'avis négatifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
