---
description: Comment créer un nouveau site à partir du template niche-starter
---

# Créer un Nouveau Site

## Prérequis
- Le repo `niche-starter` doit être configuré comme "Template repository" sur GitHub (Settings → ✅ Template repository)
- Le fichier `instructions.md` du site doit être prêt (généré par n8n ou manuellement)

## Étapes

### 1. Créer le nouveau repo depuis le template

**Option A — Via GitHub (interface web) :**
1. Aller sur https://github.com/VOTRE_ORG/niche-starter
2. Cliquer "Use this template" → "Create a new repository"
3. Nom du repo = nom de domaine (ex: `artisanduvert.fr`)
4. Private → Create

**Option B — Via la CLI GitHub :**
```bash
gh repo create VOTRE_ORG/mon-nouveau-site.com --template VOTRE_ORG/niche-starter --private --clone
```

**Option C — Automatisé via n8n (à configurer) :**
Le workflow `[WSM]SiteCreator` appellera l'API GitHub automatiquement.

### 2. Cloner le repo
```bash
cd ~/Documents/Travail/dev/SEO/websites
git clone git@github.com:VOTRE_ORG/mon-nouveau-site.com.git
cd mon-nouveau-site.com
```

### 3. Configurer l'environnement
```bash
cp .env.example .env.local
```
Éditer `.env.local` avec les vraies valeurs :
```
SUPABASE_URL=https://fdkxrkrforxzalfaqpzx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
SITE_DOMAIN=mon-nouveau-site.com
NEXT_PUBLIC_SITE_URL=https://mon-nouveau-site.com
NEXT_PUBLIC_SITE_NAME=Mon Nouveau Site
NEXT_PUBLIC_SITE_DESCRIPTION=Description courte du site
SITE_ID=<uuid-du-site-dans-la-table-sites>
```

`SITE_ID` est obligatoire pour éviter le lookup `domain -> id` et réduire l’egress PostgREST.

### 4. Ajouter le fichier instructions.md
Copier le `prompt_md` généré par n8n (ou écrire manuellement) dans :
```
mon-nouveau-site.com/instructions.md
```

### 5. Installer les dépendances
// turbo
```bash
npm install
```

### 6. Lancer l'agent IA
Ouvrir le dossier dans VS Code / Cursor, puis envoyer ce prompt à l'agent :

> **Lis le fichier `instructions.md` à la racine du projet et construis le site complet en suivant les directives des Skills.**

L'agent va :
- Lire automatiquement les Skills (`.gemini/skills/` ou `CLAUDE.md`)
- Créer les pages, Header, Footer, design system
- Télécharger les images depuis R2
- Finaliser avec `npm run build`

### 7. Vérifier et pousser
// turbo
```bash
npm run build
```
Si le build passe :
```bash
git add .
git commit -m "Initial site build"
git push origin main
```

### 8. Déployer sur Coolify
Si Coolify est configuré avec auto-deploy sur `main`, c'est automatique.
Sinon, ajouter le repo manuellement dans Coolify avec les variables d'environnement de l'étape 3.

### 9. Cache Edge (phase egress)
- Si le domaine a été provisionné via WebSitesManager, la cache rule Cloudflare `/blog*` + `/sitemap*` est déjà posée.
- Sinon, poser une cache rule équivalente : Edge TTL `86400`, Browser TTL `3600`.

## Temps estimé
- Étapes 1-5 : ~3 minutes
- Étape 6 (agent IA) : ~10-15 minutes
- Étapes 7-8 : ~2 minutes
- **Total : ~15-20 minutes par site**
