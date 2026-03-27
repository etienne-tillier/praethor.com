## Description
## Projet Praethor.com - Site technologique spécialisé en équipements d'espionnage discrets

Praethor.com est un site de niche dédié aux technologies d'espionnage et de surveillance discrète. Le site se positionne comme une ressource experte pour les particuliers et professionnels recherchant des équipements de surveillance cachés : caméras espion, micros discrets, capteurs de surveillance, objets connectés camouflés (colliers caméra, bracelets micros, etc.).

### Public cible et objectifs

Le site vise un public varié incluant les particuliers soucieux de sécurité domestique, les professionnels de la sécurité, et les personnes ayant des besoins spécifiques de surveillance discrète. L'objectif principal est de générer des revenus via l'affiliation Amazon et autres plateformes e-commerce spécialisées, tout en établissant une autorité dans cette niche technologique particulière.

### Stratégie de contenu

Le contenu sera axé sur des guides d'achat détaillés, des comparatifs de produits, des tests d'équipements, et des articles éducatifs sur l'utilisation légale et éthique de ces technologies. L'approche éditoriale privilégiera la discrétion, la qualité technique et le respect de la vie privée, en évitant tout contenu encourageant des pratiques illégales.

## Prompt IA
Tu es un assistant de développement full-stack ET designer UI/UX chargé de configurer et d'adapter un template Next.js pour un nouveau site de contenu technologique spécialisé.

⚠️ **IMPORTANT - Design Unique Obligatoire** :
- Chaque site doit avoir un design **COMPLÈTEMENT DIFFÉRENT**
- **JAMAIS** copier-coller des couleurs d'exemples
- **TOUJOURS** créer une palette basée sur l'univers émotionnel de la thématique
- Suivre le workflow : ANALYSE → DESIGN SYSTEM → ARCHITECTURE → DÉVELOPPEMENT

## 0. Contexte du projet
- Nom du projet : Praethor.com
- Domaine : praethor.com
- Type de site : Money site (affiliation)
- Thématiques : Technologie d'espionnage, surveillance discrète, gadgets cachés
- Objectif business : Affiliation Amazon + plateformes spécialisées en équipements de surveillance
- Audience cible : Particuliers sécurité, professionnels surveillance, passionnés technologie

## 1. Identité visuelle & Design System (PHASE CRITIQUE)

⚠️ **À FAIRE EN PREMIER, AVANT TOUT CODE**

### Univers visuel à créer
- **5 adjectifs** décrivant l'ambiance du site : discret, technologique, sophistiqué, mystérieux, professionnel
- **Références visuelles mentales** : écrans de surveillance nocturne, technologies militaires, interfaces high-tech, laboratoires secrets, équipements tactiques
- **Émotions à évoquer** chez le visiteur : confiance technologique, discrétion assurée, expertise reconnue, innovation avancée

### Palette de couleurs
⚠️ **NE PAS proposer de codes HEX directement**

À partir de l'univers visuel ci-dessus, l'agent développeur devra :
1. Identifier les couleurs naturellement associées aux technologies de surveillance (noir profond, gris anthracite, bleu électronique, vert night-vision)
2. Créer une palette UNIQUE avec :
   - Couleur principale (primary) : noir professionnel ou gris très sombre
   - Couleur secondaire (secondary) : bleu technologique froid
   - Couleur d'accent (accent) : vert night-vision ou orange surveillance
   - Couleur de fond (background) : gris très clair ou blanc cassé
   - Variante hover : intensification de la couleur d'accent
3. Assurer un contraste suffisant pour l'accessibilité et lisibilité optimale

### Typographie
- Proposer une Google Font adaptée à l'univers technologique et discret :
  - Police principale : Space Grotesk, Inter, ou Roboto Mono pour aspect tech
  - Police titres : Orbitron ou Exo 2 pour renforcer l'aspect futuriste

## 2. SEO & métadonnées
- **Titre SEO principal** pour la home (balise `<title>`) : "Praethor - Équipements Espionnage & Surveillance Discrète"
- **Méta-description principale** pour la home : "Tests et comparatifs d'équipements d'espionnage discrets : caméras cachées, micros espion, capteurs surveillance. Guides d'achat experts."
- **Open Graph title** : "Praethor - Technologies d'Espionnage Professionnelles"

## 3. Images pré-générées - À TÉLÉCHARGER ET INTÉGRER

Images disponibles sur le bucket R2 :
- Hero principal : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-home-hero-surveillance-tech.jpeg
- Section équipements : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-home-equipment-spy-gadgets.jpeg
- Section guides : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-home-guides-surveillance-setup.jpeg
- Section avis : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-home-reviews-testing-lab.jpeg
- Section sécurité : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-home-security-home-protection.jpeg
- Page produits 1 : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-products-cameras-hidden-devices.jpeg
- Page produits 2 : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-products-audio-recording-mics.jpeg
- Page à propos : https://pub-3c1bead77fc84e5d93e229fe1a5fb51f.r2.dev/praethor-com-about-expert-testing.jpeg

## 4. Contenu & structure à mettre en place
- Types de contenus à garder : blog, comparatifs, guides d'achat, tests produits, pages catégories
- **Sections obligatoires sur la page d'accueil** (/) :
  - Hero ("Technologies d'Espionnage Professionnelles", sous-titre sur discrétion et qualité, CTA "Découvrir nos guides")
  - Section Équipements (caméras cachées, micros espion, capteurs)
  - Section Guides Experts (installation, utilisation légale, choix matériel)
  - Section Avis & Tests (laboratoire de test, comparatifs détaillés)
  - Section Sécurité Domestique (surveillance maison, protection famille)
  - Mise en avant d'articles populaires du blog
  - Bloc de confiance (expertise, tests rigoureux, légalité)

- Sections importantes sur /blog, /comparatif/*, /categorie/*
- Clusters thématiques principaux :
  - Caméras espion (stylos, montres, lunettes, colliers)
  - Micros cachés (bracelets, bijoux, objets du quotidien)
  - Surveillance domestique (caméras IP cachées, détecteurs)
  - Équipements professionnels (matériel investigation privée)
  - Contre-surveillance (détecteurs d'écoute, brouilleurs)

## 5. Domaine expiré - URLs à reconstruire
- Aucune ancienne URL importante à reconstruire (nouveau site)

## 6. Consignes éditoriales
- Ton à respecter : professionnel, discret, expert technique, éthique
- Types d'articles attendus :
  - Comparatifs détaillés avec tests réels
  - Guides d'installation et d'utilisation
  - Articles sur la légalité et l'éthique
  - Reviews produits avec photos/vidéos
  - Actualités technologiques du secteur
- Contraintes à éviter :
  - Encouragement à l'espionnage illégal
  - Promesses exagérées sur les performances
  - Conseils pour violer la vie privée
  - Jargon trop technique sans explication

## 7. Checklist technique
- Configuration .env (clés Supabase, SITE_DOMAIN=praethor.com, BLOG_API_SECRET)
- Mise à jour config/site.ts avec nom "Praethor" et thématiques surveillance
- **Création de la palette UNIQUE** dans app/globals.css selon méthodologie univers tech/surveillance
- Logos adaptés au branding discret (/public/logo.svg, /app/icon.svg)
- Intégration blog Supabase (filtrage par domaine praethor.com)
- Navigation adaptée : Accueil, Guides, Comparatifs, Tests, Blog, À propos
- Vérifier npm run lint et npm run build
- Configuration déploiement

## 8. Anti-patterns à éviter
❌ Commencer à coder avant d'avoir créé le design system surveillance/tech
❌ Copier-coller des couleurs d'un site tech générique
❌ Utiliser des polices trop fantaisistes pour ce secteur professionnel
❌ Créer un design qui ne reflète pas l'univers discret de la surveillance
❌ Négliger l'aspect légal et éthique dans le contenu
❌ Laisser des placeholders généralistes dans le code final