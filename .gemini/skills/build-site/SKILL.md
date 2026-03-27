---
name: build-site
description: Construire un site web complet à partir du template niche-starter et du fichier instructions.md. Génère du code front-end distinctif et production-grade qui évite l'esthétique générique "AI slop".
---

# 🏗️ SKILL : Construire un Site Web Complet

Tu es chargé de construire un site web **complet, fonctionnel et prêt à déployer** à partir de ce template `niche-starter`.

Le fichier `instructions.md` à la racine contient le **brief thématique** (description, design, contenu, images). Lis-le intégralement avant de commencer.

---

## ⛔ FICHIERS INTERDITS — NE JAMAIS MODIFIER

Ces fichiers contiennent la logique critique (SEO, netlinking, Supabase). Ils sont **parfaits** et ne doivent **jamais** être modifiés, renommés ou supprimés. **NE PAS LES OUVRIR, NE PAS LES ÉDITER, NE PAS LES RECRÉER** :

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

**⛔ Si tu modifies UN SEUL de ces fichiers, le site sera cassé. NE LE FAIS PAS.**

---

## ✅ FICHIERS À CRÉER OU MODIFIER

Tu DOIS créer ou modifier **uniquement** ces fichiers :

| Fichier | Action |
|---------|--------|
| `config/site.ts` | **CRÉER** — Config du site (name, domain, url, mainNav) |
| `app/globals.css` | **MODIFIER** — Ajouter la palette CSS unique + variables + animations |
| `app/layout.tsx` | **MODIFIER** — Ajouter Google Fonts + `<Header />` + `<Footer />` + metadata |
| `app/page.tsx` | **CRÉER** — Page d'accueil complète |
| `app/blog/page.tsx` | **CRÉER** — Liste des articles (avec état vide si aucun article) |
| `app/blog/[slug]/page.tsx` | **CRÉER** — Page article (voir section Blog ci-dessous) |
| `app/blog/categorie/[slug]/page.tsx` | **CRÉER** — Articles par catégorie (avec état vide) |
| `app/contact/page.tsx` | **CRÉER** — Page contact REMPLIE (texte thématique + email contact@DOMAIN visible) |
| `app/a-propos/page.tsx` | **CRÉER** — Page à propos REMPLIE (données fictives cohérentes) |
| `app/mentions-legales/page.tsx` | **CRÉER** — Mentions légales REMPLIES |
| `app/politique-confidentialite/page.tsx` | **CRÉER** — Politique de confidentialité REMPLIE |
| `components/Header.tsx` | **CRÉER** — Header du site |
| `components/Footer.tsx` | **CRÉER** — Footer du site |
| `components/BlogCard.tsx` | **CRÉER** — Carte d'article avec IMAGE COVER obligatoire |
| `app/icon.svg` | **CRÉER** — Favicon SVG adapté à la thématique |

---

## 🚫 RÈGLE CRITIQUE : AUCUN FAUX ARTICLE DE BLOG

**Les articles de blog viennent EXCLUSIVEMENT de Supabase.** Ne JAMAIS générer de faux articles, de faux titres d'articles, ni de faux contenus d'articles dans le code.

### Ce que ça implique :
1. **Sur la page d'accueil** : NE PAS créer de section "Derniers articles" avec des articles fictifs hardcodés. Si tu veux une section articles sur la home, elle doit appeler `getPublishedBlogPosts()` et gérer le cas vide.
2. **Sur la page `/blog`** : Afficher les articles de Supabase via `getPublishedBlogPosts()`. Si aucun article → message vide (voir ci-dessous).
3. **Sur les pages catégories** : Pareil, utiliser `getPostsByCategory()`, gérer le cas vide.
4. **NE JAMAIS hardcoder** de titres d'articles, résumés, ou liens vers des articles spécifiques.

### Message pour les sections/pages vides (EXACTEMENT ce texte) :
> "Aucun article publié pour le moment."

**INTERDIT** : "En préparation", "En construction", "À venir", "Nos articles arrivent bientôt", "Bientôt disponible".

## 🚨 RÈGLE D'OR : ZÉRO PAGE 404

**AUCUNE page du site ne doit JAMAIS afficher une erreur 404.** C'est la règle la plus importante pour le SEO.

### Règles strictes :
1. **Chaque lien dans le Header et le Footer DOIT pointer vers une page qui EXISTE**
2. **Ne JAMAIS créer de lien vers une page que tu n'as pas créée**
3. **Toutes les pages obligatoires (contact, à propos, mentions légales, confidentialité) doivent être créées ET remplies avec du contenu réel/fictif cohérent**
4. **Les pages thématiques** (ex: "Équipement", "Destinations", "Guides", etc.) ont 2 options :
   - **Option A** : Créer la page complète avec du contenu riche
   - **Option B** : Faire pointer le lien vers `/blog?category=nom-categorie` (le blog filtré)
   - **JAMAIS** d'option C : ne JAMAIS laisser un lien pointer vers une page qui n'existe pas
5. **La page `/blog` ne doit JAMAIS afficher une 404** — Si aucun article n'existe encore, afficher : "Aucun article publié pour le moment."
6. **La page `/blog/[slug]` doit afficher un `notFound()`** de Next.js si l'article n'existe pas (pas une page blanche, pas un crash)

### Pattern pour les pages thématiques :
```typescript
// Si tu crées une page "Guides" par exemple :
// app/guides/page.tsx — doit être REMPLIE ou rediriger vers le blog

// Option A : Page complète avec contenu
export default function GuidesPage() {
  return (
    <main>
      <h1>Nos Guides</h1>
      {/* Contenu réel, pas de placeholder */}
      <p>Découvrez nos guides détaillés...</p>
      {/* + Lien vers les articles du blog catégorie "guides" */}
    </main>
  );
}

// Option B : Redirect vers le blog
import { redirect } from "next/navigation";
export default function GuidesPage() {
  redirect("/blog?category=guides");
}
```

### Pattern pour le blog vide :
```typescript
// app/blog/page.tsx
const posts = await getPublishedBlogPosts();

if (posts.length === 0) {
  return (
    <main>
      <h1>Blog</h1>
      <p>Aucun article publié pour le moment.</p>
    </main>
  );
}
// Afficher les articles avec BlogCard — TOUJOURS afficher l'image cover :
// posts.map(post => <BlogCard key={post.id} post={post} />)
```

### BlogCard — Pattern OBLIGATOIRE pour les cartes d'articles
```tsx
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article>
        {/* IMAGE COVER OBLIGATOIRE — Toujours afficher si disponible */}
        {post.cover?.file_url && (
          <Image
            src={post.cover.file_url}
            alt={post.cover.alt || post.h1}
            width={800}
            height={450}
            className="object-cover w-full"
          />
        )}
        <h2>{post.h1}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        {post.author?.name && <span>Par {post.author.name}</span>}
      </article>
    </Link>
  );
}
```

---

## 📄 PAGES OBLIGATOIRES — Contenu Minimum

### Contact (`app/contact/page.tsx`)
- Titre H1 thématisé (ex: "Contactez l'équipe", "Parlons ensemble", etc.)
- **PAS DE FORMULAIRE** — juste une page avec du texte thématique cohérent
- Afficher l'email `contact@{SITE_DOMAIN}` bien visible, que le visiteur peut copier-coller
- Texte d'accompagnement adapté à la thématique (ex: "Une question sur nos itinéraires ? Écrivez-nous !")
- Adresse fictive cohérente (optionnel), horaires de réponse (optionnel)

### À propos (`app/a-propos/page.tsx`)
- Titre H1 descriptif
- Histoire fictive mais COHÉRENTE avec la thématique
- Mission et valeurs
- Équipe fictive (si pertinent)
- Image de la section `instructions.md` si disponible

### Mentions légales (`app/mentions-legales/page.tsx`)
- Éditeur du site : "{SITE_NAME}, {adresse fictive}"
- Hébergeur : "Ce site est hébergé par un prestataire européen conforme aux normes en vigueur."
- Propriété intellectuelle, limitation de responsabilité, droit applicable

### Politique de confidentialité (`app/politique-confidentialite/page.tsx`)
- Introduction, données collectées (formulaire contact, cookies analytics)
- Base légale (consentement)
- Droits des utilisateurs (accès, rectification, suppression)
- Contact DPO : contact@{SITE_DOMAIN}

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
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { notFound } from "next/navigation";

// Récupérer l'article :
const post = await getBlogPostBySlug(slug);
if (!post) return notFound(); // ← Jamais de page blanche

// Détection traduction :
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

const bodyMd = injectDofollowMarker(displayBody || "");

// === RENDU DE LA PAGE ARTICLE ===

// 1. IMAGE COVER — OBLIGATOIRE en haut de l'article
{post.cover?.file_url && (
  <Image
    src={post.cover.file_url}
    alt={post.cover.alt || displayH1}
    width={1200}
    height={630}
    priority
    className="w-full rounded-lg object-cover"
  />
)}

// 2. SÉLECTEUR DE LANGUE — OBLIGATOIRE (affiche les traductions disponibles)
<LanguageSwitcher post={post} currentSlug={slug} />

// 3. CONTENU MARKDOWN
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{ a: MarkdownLink }}
>
  {bodyMd}
</ReactMarkdown>

// 4. AUTEUR — OBLIGATOIRE en bas de l'article
{post.author && (
  <div className="flex items-center gap-4 mt-8 pt-8 border-t">
    {post.author.avatar_url && (
      <Image
        src={post.author.avatar_url}
        alt={post.author.name}
        width={64}
        height={64}
        className="rounded-full object-cover"
      />
    )}
    <div>
      <p className="font-semibold">{post.author.name}</p>
      {post.author.bio && (
        <p className="text-sm opacity-70">{post.author.bio}</p>
      )}
    </div>
  </div>
)}
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

## 🎨 DESIGN EXCELLENCE — Frontend Distinctif

### Philosophie Fondamentale

Chaque site doit être une création **distinctive et mémorable**, pas un template générique. Tu es capable de créations extraordinaires — montre ce qui peut être véritablement créé en sortant des sentiers battus et en s'engageant pleinement dans une vision esthétique distinctive.

**CRITIQUE** : Choisis une direction conceptuelle claire et exécute-la avec précision. Le maximalisme audacieux et le minimalisme raffiné fonctionnent tous les deux — la clé est l'**intentionnalité**, pas l'intensité.

### Phase 1 : Design Thinking (AVANT de coder)

1. **Objectif** : Quel problème cette interface résout-elle ? Qui l'utilise ?
2. **Ton** : Choisis un extrême qui correspond à la thématique :
   - Brutalement minimal, maximaliste, rétro-futuriste, organique/naturel
   - Luxe/raffiné, ludique, éditorial/magazine, brutaliste/brut
   - Art déco/géométrique, doux/pastel, industriel/utilitaire
3. **Différenciation** : Qu'est-ce qui rend ce site INOUBLIABLE ?

### Phase 2 : Typographie Distinctive

**INTERDITS** : Inter, Roboto, Arial, system-ui, sans-serif générique, Space Grotesk.

Choisis des polices **belles, uniques et intéressantes** :
- **Luxe** : Cormorant Garamond + Montserrat
- **Nature** : Libre Baskerville + Cabin
- **Tech** : DM Sans + IBM Plex Mono
- **Éditorial** : Fraunces + Work Sans
- **Créatif** : Sora + Lexend
- **Classique** : Lora + Raleway
- **Bold** : Archivo Black + Karla
- **Minimaliste** : Manrope + Space Mono
- **Chaleureux** : Vollkorn + Nunito Sans
- **Géométrique** : Josefin Sans + Crimson Pro

Ne JAMAIS réutiliser la même paire entre deux sites.

### Phase 3 : Couleurs & Thème

CSS variables dans `globals.css`. Couleur dominante + accents vifs > palette timide.

```css
:root {
  --color-primary: /* issue de la thématique */;
  --color-secondary: /* complémentaire */;
  --color-accent: /* CTA, liens actifs */;
  --color-background: /* fond */;
  --color-foreground: /* texte */;
  --color-muted: /* texte secondaire */;
  --color-surface: /* cartes, sections */;
  --color-border: /* bordures */;
}
```

**Contraste WCAG AA** : 4.5:1 minimum — tester CHAQUE combinaison texte/fond.

### Phase 4 : Composition & Motion

- Layouts inattendus : asymétrie, overlap, grid-breaking
- Animations CSS d'entrée : staggered reveals, fade-in, slide-up
- Hover cards : `translateY(-4px)` + ombre portée
- Backgrounds texturés : gradients, grain overlay, patterns subtils
- Pas de fonds blancs unis partout

### ❌ Anti-patterns (JAMAIS)

- ❌ Polices génériques (Inter, Roboto, Arial)
- ❌ Gradients violets sur blanc (cliché IA)
- ❌ Layouts cookie-cutter sans caractère
- ❌ Fonds blancs unis sans texture ni profondeur
- ❌ Palette timide de 2 couleurs (gris + bleu)
- ❌ Converger sur les mêmes choix entre les sites

---

## ⚠️ EXIGENCES ABSOLUES — Zéro Tolérance

1. **ZÉRO PAGE 404** : Aucun lien ne doit mener à une page inexistante
2. **AUCUN placeholder** : Pas de Lorem ipsum, [À compléter], [Nom], TODO
3. **Toutes les pages obligatoires remplies** : contact, à propos, mentions légales, confidentialité
4. **Blog fonctionnel** : Affiche les articles OU un message "articles à venir"
5. **Favicon OBLIGATOIRE dans le navigateur** : Créer `app/icon.svg` — un SVG unique adapté à la thématique. C'est le logo dans l'onglet du navigateur, c'est la PREMIÈRE chose que l'utilisateur voit. Ne JAMAIS l'oublier.
6. **Header + Footer cohérents** : Liens UNIQUEMENT vers des pages existantes
7. **Contraste lisible** : 4.5:1 minimum partout
8. **`npm run build` doit passer** : 0 erreur TypeScript, 0 erreur de build
9. **ISR activé** : `export const revalidate = 21600` sur home + pages blog
10. **NE JAMAIS modifier les fichiers Core** : Même pas pour "améliorer"

---

## 🔍 CHECKLIST FINALE

Avant de terminer, vérifie CHAQUE point :

- [ ] `npm run build` passe sans erreur
- [ ] TOUTES les pages listées dans le tableau "FICHIERS À CRÉER" existent
- [ ] AUCUN lien du Header ne mène à une 404
- [ ] AUCUN lien du Footer ne mène à une 404
- [ ] AUCUN lien de la page d'accueil ne mène à une 404
- [ ] La page `/blog` affiche les articles OU un message "à venir"
- [ ] La page `/contact` est REMPLIE (texte + email visible, sans formulaire)
- [ ] La page `/a-propos` est REMPLIE avec du contenu cohérent
- [ ] La page `/mentions-legales` est REMPLIE
- [ ] La page `/politique-confidentialite` est REMPLIE
- [ ] Les images ont été téléchargées dans `public/images/`
- [ ] `ReactMarkdown` utilise `MarkdownLink` (pas de `<a>` standard)
- [ ] `injectDofollowMarker()` est appliqué AVANT le rendu Markdown
- [ ] `revalidate = 21600` est présent sur home + pages blog
- [ ] Les polices sont **distinctives** (pas Inter/Roboto/Arial)
- [ ] Le design est visuellement INOUBLIABLE
- [ ] Le contraste texte/fond est suffisant (WCAG AA)
- [ ] Les fichiers Core n'ont PAS été modifiés
