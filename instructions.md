# Brief de génération de site (niche-starter)

Ce fichier est le brief unique à remplir avant d'envoyer le projet à l'IA.
L'agent doit lire d'abord `CLAUDE.md`, puis ce fichier.

---

## 1) Infos projet

- `site_name`:
- `site_domain`:
- `site_url`:
- `default_locale`:
- `site_id` (UUID Supabase):
- `tier` (`tier1` / `tier2`):

## 2) Positionnement éditorial

- Thématique:
- Audience cible:
- Objectif business:
- Ton éditorial:
- Angles à privilégier:
- Angles interdits:

## 3) Arborescence souhaitée

- Pages de navigation (hors blog):
- Sections homepage attendues:
- CTA principal:
- CTA secondaire:

## 4) Contraintes SEO

- Requêtes principales:
- Entités importantes:
- Concurrents de référence:
- Règles de maillage interne spécifiques:
- URLs legacy à rediriger (si applicable):

## 5) Direction artistique

- Univers visuel:
- Inspirations:
- Couleurs souhaitées / évitées:
- Style typographique:
- Niveau d'animation:
- Niveau de sobriété (1-10):

## 6) Assets (R2 / médias)

- Bucket/source:
- Liste images hero:
- Liste images sections:
- Liste images guides/blog:
- Contraintes de ratio/poids:

## 7) Contraintes techniques

- Le code doit respecter strictement les règles de `CLAUDE.md`.
- Ne pas modifier les fichiers Core interdits.
- Pas de `select("*")` ajouté.
- Pas de faux articles.
- Aucune page 404.
- Toute page additionnelle liée (outil, carte, simulateur, etc.) doit être implémentée et réellement remplie.
- Si une page n'existe pas, aucun lien ne doit pointer vers elle.
- Tout lien vers le même domaine doit être traité comme lien interne dofollow.
- `npm run build` doit passer.

## 8) Données légales à injecter

- Mentions légales (éditeur):
- Contact public:
- DPO/contact RGPD:
- Hébergeur:

---

## 9) Prompt prêt à envoyer à l'IA

Copie/colle ce prompt dans ton agent (Claude/Codex/Gemini) en étant dans ce repo:

```text
Tu es un ingénieur Next.js senior + designer UI/UX.
Tu travailles dans un projet basé sur niche-starter.

Ordre obligatoire:
1) Lire CLAUDE.md
2) Lire instructions.md
3) Implémenter le site complet en respectant strictement ces deux fichiers.

Contraintes non négociables:
- Zéro 404
- Zéro placeholder
- Aucune modification des fichiers Core interdits
- Blog 100% Supabase (aucun faux article)
- ISR egress-safe (revalidate conforme)
- Toute page additionnelle liée doit exister et être remplie (sinon supprimer le lien)
- Tout lien du même domaine doit être interne et dofollow
- npm run build sans erreur

Action attendue:
- Créer/modifier les fichiers autorisés
- Produire un design distinctif adapté à la thématique
- Remplir toutes les pages obligatoires avec contenu cohérent
- Utiliser les assets fournis dans instructions.md

À la fin:
- Exécuter npm run build
- Fournir la liste des fichiers modifiés
- Expliquer brièvement les choix design et SEO effectués
```
