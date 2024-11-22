# Documentation Technique - Les Aiglons de Coureau

## Architecture du Projet

### Technologies Utilisées
- **Frontend**: React, TypeScript, Vite
- **UI/Design**: TailwindCSS, HeadlessUI, Framer Motion
- **État Global**: React Query
- **Authentification**: Firebase Auth
- **Base de données**: Firestore
- **Internationalisation**: i18next
- **Validation**: Zod
- **Formulaires**: React Hook Form

### Structure des Dossiers
```
src/
├── components/         # Composants React réutilisables
│   ├── admin/         # Composants spécifiques à l'administration
│   ├── user/          # Composants spécifiques aux utilisateurs
│   └── ui/            # Composants UI génériques
├── contexts/          # Contextes React (Auth, etc.)
├── lib/              # Utilitaires et services
│   ├── api/          # Services API
│   └── security/     # Services de sécurité
├── pages/            # Pages de l'application
├── types/            # Types TypeScript
└── i18n/             # Fichiers de traduction
```

### Sécurité
- Authentification Firebase
- Validation des données avec Zod
- Protection CSRF
- Rate limiting
- Journalisation des événements de sécurité
- Gestion des permissions basée sur les rôles

### Base de Données
Collections Firestore :
- users
- courses
- modules
- content
- audit_logs
- security_logs
- notifications

### API
Principales fonctionnalités :
- Gestion des utilisateurs
- Gestion des cours
- Gestion du contenu
- Système de notifications
- Journalisation et audit

### Performance
- Lazy loading des composants
- Mise en cache avec React Query
- Optimisation des images
- Code splitting

## Déploiement

### Prérequis
- Node.js 16+
- npm ou yarn
- Compte Firebase

### Variables d'Environnement
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Installation
```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build
npm run build
```