---
name: build-site
description: Construire un site web complet à partir du template niche-starter et du fichier instructions.md. Génère du code front-end distinctif et production-grade qui évite l'esthétique générique "AI slop".
---

# 🏗️ SKILL : Construire un Site Web Complet

Tu es chargé de construire un site web **complet, fonctionnel et prêt à déployer** à partir de ce template `niche-starter`.

Le fichier `instructions.md` à la racine contient le **brief thématique** (description, design, contenu, images). Lis-le intégralement avant de commencer.

---

## ⛔ FICHIERS INTERDITS — NE JAMAIS MODIFIER

Ces fichiers contiennent la logique critique (SEO, netlinking, Supabase). Ils sont **parfaits** et ne doivent **jamais** être modifiés, renommés ou supprimés :

```
lib/supabase.ts          ← Client Supabase admin (safe-init)
lib/blog.ts              ← CRUD blog optimisé (select ciblé)
lib/dofollow.ts          ← Injection dofollow dans le Markdown
lib/sitemap-helper.ts    ← Génération XML sitemaps
components/MarkdownLink.tsx  ← Liens dofollow/nofollow automatiques
components/LanguageSwitcher.tsx  ← Sélecteur de langue
types/index.ts           ← Interfaces TypeScript
app/robots.ts            ← robots.txt dynamique
app/sitemap.xml/route.ts ← Sitemap index
app/sitemap_*.xml/route.ts ← Sitemaps par locale (x5)
next.config.ts           ← Configuration Next.js
package.json             ← Dépendances verrouillées
tsconfig.json            ← Configuration TypeScript
postcss.config.js        ← PostCSS
eslint.config.mjs        ← ESLint
```

## ✅ FICHIERS À CRÉER OU MODIFIER

Tu DOIS créer ou modifier **uniquement** ces fichiers :

| Fichier | Action |
|---------|--------|
| `config/site.ts` | **CRÉER** — Config du site (name, domain, url, mainNav) |
| `app/globals.css` | **MODIFIER** — Ajouter la palette CSS unique + variables |
| `app/layout.tsx` | **MODIFIER** — Ajouter Google Fonts + `<Header />` + `<Footer />` + metadata |
| `app/page.tsx` | **CRÉER** — Page d'accueil complète |
| `app/blog/page.tsx` | **CRÉER** — Liste des articles |
| `app/blog/[slug]/page.tsx` | **CRÉER** — Page article (voir section Blog ci-dessous) |
| `app/blog/categorie/[slug]/page.tsx` | **CRÉER** — Articles par catégorie |
| `app/contact/page.tsx` | **CRÉER** — Page contact |
| `app/a-propos/page.tsx` | **CRÉER** — Page à propos |
| `app/mentions-legales/page.tsx` | **CRÉER** — Mentions légales |
| `app/politique-confidentialite/page.tsx` | **CRÉER** — Politique de confidentialité |
| `components/Header.tsx` | **CRÉER** — Header du site |
| `components/Footer.tsx` | **CRÉER** — Footer du site |
| `components/BlogCard.tsx` | **CRÉER** — Carte d'article pour les listings |
| `app/icon.svg` | **CRÉER** — Favicon SVG adapté à la thématique |

---

## 📐 RÈGLES TECHNIQUES ABSOLUES

### ISR Revalidation
```typescript
// Home + Blog (listing, article, catégorie)
export const revalidate = 21600; // 6h
```

### Garde-fous egress (OBLIGATOIRE)
- Ne JAMAIS importer `supabaseAdmin` directement dans `app/**` ou `components/**`
- Utiliser uniquement les helpers de `lib/blog.ts` (`getPublishedBlogPosts`, `getBlogPostBySlug`, `getPostsByCategory`, `getCategoryBySlug`, etc.)
- Ne JAMAIS ajouter de requête `select("*")` dans du code créé
- Ne pas modifier les routes sitemap (`app/sitemap*.xml/route.ts`) : elles sont déjà optimisées en `revalidate = 86400`

### Page Blog `[slug]/page.tsx` — Pattern OBLIGATOIRE
```typescript
import { MarkdownLink } from "@/components/MarkdownLink";
import { injectDofollowMarker } from "@/lib/dofollow";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Dans le composant :
const bodyMd = injectDofollowMarker(displayBodyMd || "");

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{ a: MarkdownLink }}
>
  {bodyMd}
</ReactMarkdown>
```

### Détection de traduction
```typescript
let displayH1 = post.h1;
let displayBody = post.body_md;

if (post.slug !== slug && post.translations) {
  for (const [_key, val] of Object.entries(post.translations)) {
    if ((val as any).slug === slug) {
      displayH1 = (val as any).h1 || displayH1;
      displayBody = (val as any).body_md || displayBody;
      break;
    }
  }
}
```

### Hreflang dans generateMetadata
```typescript
const languages: Record<string, string> = {};
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
languages[post.default_locale || "fr-FR"] = `${siteUrl}/blog/${post.slug}`;
if (post.translations) {
  Object.entries(post.translations).forEach(([locale, t]: [string, any]) => {
    if (t.slug) languages[locale] = `${siteUrl}/blog/${t.slug}`;
  });
}
return { alternates: { languages } };
```

### Images — Télécharger OBLIGATOIREMENT
```bash
mkdir -p public/images
curl -L "URL_R2_IMAGE" -o public/images/nom-fichier.jpeg
```
- **TOUJOURS** télécharger les images listées dans `instructions.md`
- **TOUJOURS** utiliser `/images/nom.jpeg` dans le code, pas les URLs R2
- Utiliser `<Image>` de Next.js avec `priority` sur le hero

---

## 🎨 DESIGN EXCELLENCE — Frontend Design de Haut Niveau

### Philosophie Fondamentale

Chaque site doit être une création **distinctive et mémorable**, pas un template générique. Tu es capable de créations extraordinaires — n'hésite pas, montre ce qui peut être véritablement créé en sortant des sentiers battus et en s'engageant pleinement dans une vision distinctive.

**CRITIQUE** : Choisis une direction conceptuelle claire et exécute-la avec précision. Le maximalisme audacieux et le minimalisme raffiné fonctionnent tous les deux — la clé est l'**intentionnalité**, pas l'intensité.

### Phase 1 : Design Thinking (AVANT de coder)

Avant de coder, comprends le contexte et engage-toi dans une direction esthétique AFFIRMÉE :

1. **Objectif** : Quel problème cette interface résout-elle ? Qui l'utilise ?
2. **Ton** : Choisis un extrême qui correspond à la thématique :
   - Brutalement minimal, maximaliste chaotique, rétro-futuriste
   - Organique/naturel, luxe/raffiné, ludique/toy-like
   - Éditorial/magazine, brutaliste/brut, art déco/géométrique
   - Doux/pastel, industriel/utilitaire, néo-classique
3. **Différenciation** : Qu'est-ce qui rend ce site INOUBLIABLE ? Quelle est la chose dont quelqu'un se souviendra ?

### Phase 2 : Typographie Distinctive

La typographie fait 50% du design. **INTERDITS** : Inter, Roboto, Arial, system-ui, sans-serif générique.

Choisis des polices **belles, uniques et intéressantes** qui élèvent l'esthétique :
- Associe une fonte display distinctive avec une fonte body raffinée
- Les choix doivent être inattendus et pleins de caractère

**Exemples de paires audacieuses** (ne JAMAIS réutiliser la même paire entre deux sites) :
- **Luxe/Raffiné** : Cormorant Garamond + Montserrat
- **Nature/Organique** : Libre Baskerville + Cabin
- **Tech/Moderne** : DM Sans + IBM Plex Mono
- **Éditorial/Magazine** : Fraunces + Work Sans
- **Ludique/Créatif** : Sora + Lexend
- **Classique/Élégant** : Lora + Raleway
- **Bold/Statement** : Archivo Black + Karla
- **Minimaliste/Épuré** : Manrope + Space Mono
- **Chaleureux/Humain** : Vollkorn + Nunito Sans
- **Géométrique/Art Déco** : Josefin Sans + Crimson Pro

### Phase 3 : Couleurs & Thème

Engage-toi dans une esthétique cohésive avec CSS variables.

**Principes clés :**
- Une couleur dominante avec des accents vifs surpasse les palettes timides et équilibrées
- Créer une hiérarchie visuelle claire par la couleur
- **Ratio WCAG AA** : 4.5:1 minimum texte/fond — tester CHAQUE combinaison

**Créer dans `globals.css` :**
```css
:root {
  --color-primary: /* issue de l'univers thématique */;
  --color-secondary: /* complémentaire */;
  --color-accent: /* pour CTA, liens actifs */;
  --color-background: /* fond principal */;
  --color-foreground: /* texte principal */;
  --color-muted: /* texte secondaire */;
  --color-surface: /* cartes, sections alternées */;
  --color-border: /* bordures subtiles */;
}
```

### Phase 4 : Composition Spatiale

Layouts inattendus. Asymétrie. Overlap. Flux diagonal. Éléments qui brisent la grille. Espace négatif généreux OU densité contrôlée.

**Layouts page d'accueil** (choisir 1 et varier à chaque site) :
- Hero plein écran avec parallaxe ou animation
- Split-screen asymétrique (60/40 ou 70/30)
- Bento Grid avec éléments de tailles variées
- Hero vidéo ou animation SVG de fond
- Composition en couches superposées (overlap/offset)
- Scroll horizontal pour une section showcase

**Navigation** (choisir 1) :
- Navbar transparente → opaque au scroll, avec animation
- Navbar avec accent coloré latéral ou inférieur
- Menu hamburger créatif avec transition plein écran
- Header minimaliste centré avec navigation discrète

### Phase 5 : Motion & Micro-interactions

Les animations donnent vie à l'interface. Prioriser les solutions CSS-only.

**High-impact :**
- Load page avec staggered reveals (animation-delay séquentiel)
- Hover sur les cartes : élévation + scale subtil (transform: translateY(-4px) scale(1.02))
- Scroll-triggered fade-in / slide-up des sections
- Transition douce des couleurs de la navbar au scroll

**Implémentation CSS simple :**
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
```

### Phase 6 : Fonds & Détails Visuels

Créer de l'atmosphère et de la profondeur plutôt que des fonds unis par défaut :
- Gradient meshes subtils
- Textures de bruit (grain overlay CSS)
- Patterns géométriques légers
- Transparences superposées
- Ombres dramatiques ou douces selon le ton
- Bordures décoratives
- Dividers créatifs (vagues SVG, diagonales, courbes)

```css
/* Exemple : Grain overlay subtil */
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.03;
  background: url("data:image/svg+xml,..."); /* noise pattern */
  pointer-events: none;
  z-index: 9999;
}
```

### ❌ Anti-patterns Design (JAMAIS faire)

- ❌ Polices génériques (Inter, Roboto, Arial, system fonts)
- ❌ Gradients violets sur fond blanc (cliché IA)
- ❌ Layouts prévisibles et patterns de composants cookie-cutter
- ❌ Design sans caractère spécifique au contexte
- ❌ Converger sur les mêmes choix (Space Grotesk) entre les sites
- ❌ Fonds unis partout sans texture ni profondeur
- ❌ Animations timides ou inexistantes
- ❌ Palette de 2 couleurs timides (gris + bleu)

---

## ⚠️ EXIGENCES ABSOLUES — Zéro Tolérance

1. **AUCUN placeholder** : Pas de Lorem ipsum, [À compléter], [Nom]
2. **AUCUN lien cassé** : Tous les liens du Footer/Header pointent vers des pages existantes
3. **AUCUN composant décoratif** non fonctionnel : Si tu mets une barre de recherche, elle doit marcher
4. **Logo/favicon personnalisés** : Créer `app/icon.svg` adapté à la thématique
5. **Header + Footer sur TOUTES les pages** : Via le `layout.tsx`
6. **Contraste lisible** : Ratio 4.5:1 minimum partout
7. **`npm run build` doit passer** : 0 erreur TypeScript, 0 erreur de build
8. **ISR activé** : `export const revalidate = 21600` sur home + pages blog

---

## 🔍 CHECKLIST FINALE

Avant de terminer, vérifie :

- [ ] `npm run build` passe sans erreur
- [ ] Toutes les pages listées dans `instructions.md` existent
- [ ] Le Header contient la navigation définie dans `config/site.ts`
- [ ] Le Footer ne contient AUCUN lien vers une page inexistante
- [ ] Les images ont été téléchargées dans `public/images/`
- [ ] `ReactMarkdown` utilise `MarkdownLink` (pas de `<a>` standard)
- [ ] `injectDofollowMarker()` est appliqué AVANT le rendu Markdown
- [ ] `revalidate = 21600` est présent sur home + pages blog
- [ ] La palette de couleurs est UNIQUE et adaptée à la thématique
- [ ] Les polices Google sont **distinctives** (pas Inter/Roboto/Arial)
- [ ] Le design est visuellement INOUBLIABLE et spécifique à la thématique
- [ ] Le contraste texte/fond est suffisant partout (WCAG AA)
- [ ] Des animations/transitions sont présentes (fade-in, hover effects)
- [ ] Le fond n'est PAS un aplat blanc uni partout (textures, gradients, variations)
