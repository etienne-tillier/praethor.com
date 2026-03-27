/* eslint-disable */
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Praethor",
  description: "Mentions légales du site Praethor.com — éditeur, hébergeur, propriété intellectuelle et politique d'affiliation.",
};

export default function MentionsLegales() {
  return (
    <>
      <Header />

      <div className="relative py-16 overflow-hidden border-b border-primary/10">
        <div className="green-line absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
            Mentions <span className="text-primary">Légales</span>
          </h1>
        </div>
      </div>

      <section className="py-16 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-invert prose-lg prose-headings:font-heading prose-headings:text-primary prose-a:text-primary prose-p:text-foreground/75 max-w-none">
            <h2>Éditeur du site</h2>
            <p>
              Le site <strong>Praethor</strong> (praethor.com) est édité et géré à titre privé par Praethor Media.<br />
              E-mail de contact : <a href="mailto:contact@praethor.com">contact@praethor.com</a>
            </p>

            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, États-Unis<br />
              Site : <a href="https://vercel.com" rel="noopener noreferrer">vercel.com</a>
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de praethor.com (textes, protocoles de tests, photos, vidéos, logos, structure) est
              la propriété exclusive de Praethor Media, sauf mention contraire. Les marques des équipements testés
              (Sony, Wyze, etc.) appartiennent à leurs propriétaires respectifs. Praethor n'est affilié à aucun fabricant.
              Toute reproduction, même partielle, sans accord écrit préalable, est interdite.
            </p>

            <h2>Responsabilité</h2>
            <p>
              Les tests et avis publiés sur Praethor reflètent l'état du produit au moment du test.
              Les performances peuvent varier selon les mises à jour fabricant. Praethor ne peut être tenu responsable
              d'un achat effectué sur la base de nos recommandations.
            </p>
            <p>
              <strong>Usage légal :</strong> Les équipements présentés sur ce site sont légaux à l'achat et à l'usage
              dans un cadre privé conforme à la législation française. L'éditeur du site décline toute responsabilité
              pour une utilisation illégale des produits évoqués.
            </p>

            <h2>Affiliation Amazon</h2>
            <p>
              Praethor participe au Programme Partenaires d'Amazon EU, un programme d'affiliation conçu pour permettre
              à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.fr et sites associés.
              Lorsque vous achetez via nos liens, nous percevons une commission, sans surcoût pour vous.
              Les liens affiliés sont identifiés dans nos articles.
            </p>

            <h2>Liens hypertextes</h2>
            <p>
              Praethor peut contenir des liens vers des sites tiers. Ces liens sont fournis à titre informatif.
              Praethor n'est pas responsable du contenu de ces sites externes.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
