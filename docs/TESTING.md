## Guide des Tests

### Structure des Tests

Les tests sont organisés en plusieurs catégories :

1. **Tests Unitaires**
   - Components
   - Services (API)
   - Utils
   - Hooks

2. **Tests d'Intégration**
   - Flux d'authentification
   - Progression des cours
   - Système de notation

3. **Tests E2E**
   - Parcours utilisateur complet
   - Scénarios administrateur

### Commandes

```bash
# Lancer tous les tests
npm run test

# Lancer les tests avec couverture
npm run test:coverage

# Lancer les tests en mode watch
npm run test:watch

# Lancer les tests d'un fichier spécifique
npm run test src/tests/components/RatingForm.test.tsx
```

### Bonnes Pratiques

1. **Nommage des Tests**
   ```typescript
   describe('ComponentName', () => {
     it('should [expected behavior] when [condition]', () => {
       // Test implementation
     });
   });
   ```

2. **Organisation**
   - Un fichier de test par composant/service
   - Grouper les tests logiquement avec `describe`
   - Tests isolés et indépendants

3. **Mocking**
   ```typescript
   // Mock d'un module
   vi.mock('./module', () => ({
     function: vi.fn()
   }));

   // Mock d'un hook React
   vi.mock('react', () => ({
     ...vi.importActual('react'),
     useState: vi.fn()
   }));
   ```

4. **Assertions**
   ```typescript
   // Test de rendu
   expect(screen.getByText('Title')).toBeInTheDocument();

   // Test d'événements
   fireEvent.click(button);
   expect(handleClick).toHaveBeenCalled();

   // Test de state
   expect(screen.getByText('Loading...')).toBeInTheDocument();
   ```

### Couverture des Tests

Objectifs de couverture :
- Statements: > 85%
- Branches: > 80%
- Functions: > 90%
- Lines: > 85%

### Maintenance

1. **Mise à jour des Tests**
   - Mettre à jour les tests lors des changements de code
   - Vérifier que les tests existants passent
   - Ajouter de nouveaux tests si nécessaire

2. **Documentation**
   - Commenter les cas complexes
   - Expliquer les mocks et configurations
   - Maintenir ce guide à jour

### Exemples de Tests

1. **Test de Composant**
   ```typescript
   describe('Button', () => {
     it('should render children correctly', () => {
       render(<Button>Click me</Button>);
       expect(screen.getByText('Click me')).toBeInTheDocument();
     });

     it('should handle click events', () => {
       const handleClick = vi.fn();
       render(<Button onClick={handleClick}>Click me</Button>);
       fireEvent.click(screen.getByText('Click me'));
       expect(handleClick).toHaveBeenCalled();
     });
   });
   ```

2. **Test de Hook**
   ```typescript
   describe('useAuth', () => {
     it('should return user when authenticated', () => {
       const { result } = renderHook(() => useAuth());
       expect(result.current.user).toBeDefined();
     });
   });
   ```

3. **Test d'API**
   ```typescript
   describe('api', () => {
     it('should fetch data successfully', async () => {
       const data = await fetchData();
       expect(data).toBeDefined();
     });
   });
   ```