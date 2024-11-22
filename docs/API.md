# Documentation API

## Authentification

### `loginUser(email: string, password: string)`
Connecte un utilisateur avec email/mot de passe.

### `registerUser(email: string, password: string, userData: any)`
Inscrit un nouvel utilisateur.

### `resetPassword(email: string)`
Envoie un email de réinitialisation de mot de passe.

## Formations

### `getCourseProgress(userId: string, courseId: string)`
Récupère la progression d'un utilisateur dans une formation.

### `updateModuleProgress(userId: string, courseId: string, moduleId: string, data: any)`
Met à jour la progression d'un module.

### `generateCertificate(userId: string, courseId: string)`
Génère un certificat de réussite.

## Évaluations

### `submitRating(userId: string, courseId: string, data: RatingData)`
Soumet une évaluation pour une formation.

### `getRatingStats(courseId: string)`
Récupère les statistiques des évaluations.

### `exportRatingsToCSV(courseId: string)`
Exporte les évaluations au format CSV.

## Feedback

### `submitFeedback(data: FeedbackData)`
Soumet un feedback pour une formation/module.

### `getFeedback(courseId: string, filters?: FeedbackFilters)`
Récupère les feedbacks avec filtres optionnels.

## Types

```typescript
interface RatingData {
  rating: number;
  criteria: {
    content: number;
    presentation: number;
    difficulty: number;
    usefulness: number;
  };
  feedback?: string;
}

interface FeedbackData {
  userId: string;
  courseId: string;
  moduleId?: string;
  type: 'question' | 'suggestion' | 'issue';
  comment: string;
}

interface Progress {
  completed: boolean;
  score?: number;
  timeSpent: number;
  lastAccessed: Date;
}
```

## Sécurité

- Toutes les requêtes nécessitent un token JWT valide
- Rate limiting appliqué sur les endpoints sensibles
- Validation des données avec Zod
- Journalisation des événements de sécurité