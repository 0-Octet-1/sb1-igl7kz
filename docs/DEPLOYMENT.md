# Guide de Déploiement

## Prérequis

- Node.js 16+
- npm ou yarn
- Compte Firebase
- Compte Netlify (pour le déploiement)

## Variables d'Environnement

Créer un fichier `.env` :

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Installation

```bash
# Installation des dépendances
npm install

# Build pour la production
npm run build
```

## Déploiement sur Netlify

1. Connectez-vous à Netlify
2. Créez un nouveau site depuis Git
3. Sélectionnez votre repository
4. Configurez les variables d'environnement
5. Déployez !

## Configuration Firebase

1. Créez un projet Firebase
2. Activez l'authentification
3. Configurez Firestore
4. Ajoutez les règles de sécurité

## Mise à Jour

1. Pushez vos changements
2. Netlify déploiera automatiquement

## Monitoring

- Utilisez Firebase Analytics
- Configurez les alertes
- Surveillez les logs

## Sécurité

- Activez le SSL
- Configurez le CSP
- Activez le rate limiting
- Surveillez les tentatives de connexion suspectes

## Sauvegarde

- Sauvegarde quotidienne de Firestore
- Export régulier des données utilisateurs
- Conservation des logs pendant 30 jours