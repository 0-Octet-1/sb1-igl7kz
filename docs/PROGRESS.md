## Système de Progression

### Vue d'ensemble

Le système de progression permet de suivre l'avancement des utilisateurs dans les formations.

### Fonctionnalités

1. **Suivi des Modules**
   - Progression par module
   - Temps passé
   - Quiz complétés
   - Exercices pratiques

2. **Calcul de la Progression**
   ```typescript
   progression = (modulesComplétés / totalModules) * 100
   ```

3. **États de Progression**
   - Non commencé
   - En cours
   - Complété
   - En attente de validation

4. **Validation**
   - Quiz obligatoires
   - Score minimum requis
   - Temps minimum par module

### Implémentation

1. **Suivi du Temps**
   ```typescript
   // Tracker le temps passé
   useEffect(() => {
     const interval = setInterval(() => {
       setTimeSpent(prev => prev + 1);
     }, 1000);
     return () => clearInterval(interval);
   }, []);
   ```

2. **Validation des Modules**
   ```typescript
   async function validateModule(moduleId: string) {
     const progress = await getModuleProgress(moduleId);
     return (
       progress.quizCompleted &&
       progress.timeSpent >= MODULE_MIN_TIME &&
       progress.exercises.every(ex => ex.completed)
     );
   }
   ```

3. **Génération de Certificat**
   ```typescript
   async function generateCertificate(userId: string, courseId: string) {
     const progress = await getCourseProgress(userId, courseId);
     if (progress.completed) {
       return createCertificate(userId, courseId);
     }
     throw new Error('Course not completed');
   }
   ```

### Stockage des Données

```typescript
interface Progress {
  userId: string;
  courseId: string;
  modules: {
    [moduleId: string]: {
      completed: boolean;
      score?: number;
      timeSpent: number;
      lastAccessed: Date;
      exercises: {
        id: string;
        completed: boolean;
        attempts: number;
      }[];
    };
  };
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  certificate?: {
    id: string;
    issuedAt: Date;
    url: string;
  };
}
```

### Fonctionnalités Avancées

1. **Certificats**
   - Génération automatique avec QR code
   - Vérification en ligne
   - Export PDF personnalisé

2. **Statistiques**
   - Temps moyen par module
   - Taux de complétion
   - Scores moyens
   - Progression comparative

3. **Gamification**
   - Points d'expérience
   - Badges de progression
   - Classements par formation
   - Récompenses débloquables

### Sécurité

1. **Validation**
   ```typescript
   // Vérification des permissions
   async function checkModuleAccess(userId: string, moduleId: string) {
     const user = await getUser(userId);
     const module = await getModule(moduleId);
     return (
       user.hasAccess(module.courseId) &&
       !module.isLocked &&
       await validatePrerequisites(userId, module.prerequisites)
     );
   }
   ```

2. **Audit**
   ```typescript
   // Journalisation des changements
   async function logProgressUpdate(userId: string, moduleId: string, data: any) {
     await addAuditLog({
       type: 'progress_update',
       userId,
       moduleId,
       data,
       timestamp: new Date()
     });
   }
   ```

### Optimisations

1. **Performance**
   - Mise en cache des données de progression
   - Mises à jour en temps réel
   - Chargement progressif des statistiques

2. **Expérience Utilisateur**
   - Feedback visuel immédiat
   - Animations de progression
   - Notifications de réussite
   - Suggestions personnalisées