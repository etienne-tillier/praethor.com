/* eslint-disable */
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Praethor",
  description: "Politique de confidentialité de Praethor.com — données collectées, droits RGPD, cookies et contact DPO.",
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Header />

      <div className="relative py-16 overflow-hidden border-b border-primary/10">
        <div className="green-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
            Politique de <span className="text-primary">Confidentialité</span>
          </h1>
          <p className="text-foreground/40 font-mono text-xs">// Dernière mise à jour : mars 2025</p>
        </div>
      </div>

      <section className="py-16 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert prose-lg prose-headings:font-heading prose-headings:text-primary prose-a:text-primary prose-p:text-foreground/75 max-w-none">
            <h2>Responsable du traitement</h2>
            <p>
              Praethor Media, responsable du traitement des données collectées sur praethor.com.<br />
              Contact DPO : <a href="mailto:contact@praethor.com">contact@praethor.com</a>
            </p>

            <h2>Données collectées</h2>
            <p>Praethor.com est un site de contenu éditorial. Nous collectons un minimum de données :</p>
            <ul>
              <li><strong>Journaux serveur</strong> : adresse IP anonymisée, user-agent, page visitée, horodatage. Conservation 30 jours max.</li>
              <li><strong>E-mails de contact</strong> : conservés uniquement le temps de traiter votre demande.</li>
              <li><strong>Cookies analytiques</strong> : en mode anonymisé, sans partage avec des tiers publicitaires.</li>
              <li><strong>Cookies d'affiliation</strong> : si vous cliquez sur un lien Amazon, Amazon dépose ses propres cookies selon sa politique de confidentialité.</li>
            </ul>

            <h2>Finalités</h2>
            <ul>
              <li>Assurer le fonctionnement technique du site.</li>
              <li>Répondre aux messages de contact.</li>
              <li>Mesurer l'audience du site de manière agrégée et anonyme.</li>
              <li>Percevoir des commissions d'affiliation Amazon (via vos clics, sans données personnelles supplémentaires).</li>
            </ul>
            <p>Aucune donnée n'est vendue à des tiers ou utilisée à des fins publicitaires ciblées.</p>

            <h2>Vos droits RGPD</h2>
            <ul>
              <li><strong>Accès</strong> : obtenir une copie de vos données.</li>
              <li><strong>Rectification</strong> : corriger des données inexactes.</li>
              <li><strong>Effacement</strong> : demander la suppression de vos données.</li>
              <li><strong>Portabilité</strong> : recevoir vos données dans un format structuré.</li>
              <li><strong>Opposition</strong> : vous opposer à certains traitements.</li>
            </ul>
            <p>
              Pour exercer ces droits : <a href="mailto:contact@praethor.com">contact@praethor.com</a>.
              Réponse dans un délai d'un mois.
            </p>

            <h2>Cookies</h2>
            <p>
              Ce site utilise des cookies techniques strictement nécessaires et des cookies analytiques
              anonymisés (aucun consentement requis). Les cookies d'affiliation Amazon sont soumis à la
              politique de confidentialité d'Amazon.fr. Vous pouvez configurer votre navigateur pour
              refuser les cookies sans impact sur la navigation.
            </p>

            <h2>Modifications</h2>
            <p>
              Cette politique peut être mise à jour. La date de modification est visible en haut de cette page.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
