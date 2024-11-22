# Guide d'Optimisation

## Performance Frontend

### Code Splitting
```typescript
// Utilisation de React.lazy pour le chargement dynamique
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const UserDashboard = React.lazy(() => import('./pages/user/Dashboard'));

// Dans les routes
<Route 
  path="/admin" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <AdminDashboard />
    </Suspense>
  } 
/>
```

### Mise en Cache
```typescript
// Configuration de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
```

### Optimisation des Images
```typescript
// Composant Image optimisé
function OptimizedImage({ src, alt, sizes }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      srcSet={`
        ${src}?w=320 320w,
        ${src}?w=640 640w,
        ${src}?w=960 960w
      `}
      sizes={sizes}
    />
  );
}
```

## Performance Backend

### Pagination
```typescript
// Fonction de récupération paginée
async function fetchPaginatedData(
  collection: string,
  page: number,
  limit: number
) {
  const startAfter = page * limit;
  const q = query(
    collection(db, collection),
    orderBy('createdAt', 'desc'),
    limit(limit),
    startAfter(startAfter)
  );
  
  return getDocs(q);
}
```

### Mise en Cache Firebase
```typescript
// Configuration du cache Firestore
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

// Activation de la persistance
enableIndexedDbPersistence(db).catch((err) => {
  console.error('Error enabling persistence:', err);
});
```

### Batch Operations
```typescript
// Opérations groupées pour les mises à jour
async function batchUpdate(updates: BatchUpdate[]) {
  const batch = writeBatch(db);
  
  updates.forEach(({ ref, data }) => {
    batch.update(ref, data);
  });
  
  await batch.commit();
}
```

## Optimisation des Requêtes

### Indexes
```typescript
// Exemple d'index composé dans firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "courses",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### Dénormalisation
```typescript
// Structure dénormalisée pour les données fréquemment accédées
interface CoursePreview {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  authorName: string; // Dénormalisé depuis users
  rating: number;     // Dénormalisé depuis ratings
}
```

## Optimisation du Bundle

### Tree Shaking
```typescript
// Import sélectif des composants
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Éviter
import * as UI from '@/components/ui';
```

### Compression
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@/components/ui']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});
```

## Monitoring

### Performance Metrics
```typescript
// Suivi des métriques de performance
export function trackPerformance(metric: string, value: number) {
  analytics.logEvent('performance_metric', {
    metric_name: metric,
    value,
    timestamp: Date.now()
  });
}

// Utilisation
trackPerformance('page_load', performance.now());
```

### Error Tracking
```typescript
// Suivi des erreurs
window.addEventListener('error', (event) => {
  logError({
    type: 'runtime',
    message: event.message,
    stack: event.error?.stack,
    url: event.filename,
    line: event.lineno,
    column: event.colno
  });
});
```

## Optimisation Mobile

### Responsive Images
```typescript
// Composant d'image responsive
function ResponsiveImage({ src, alt }: ImageProps) {
  return (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={`${src}?w=320 1x, ${src}?w=640 2x`}
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${src}?w=640 1x, ${src}?w=1280 2x`}
      />
      <img src={src} alt={alt} loading="lazy" />
    </picture>
  );
}
```

### Touch Events
```typescript
// Gestion optimisée des événements tactiles
function TouchHandler({ onSwipe }: TouchProps) {
  const [startX, setStartX] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      onSwipe(diff > 0 ? 'left' : 'right');
    }
  };
  
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}
```

## Best Practices

### Memoization
```typescript
// Utilisation de useMemo pour les calculs coûteux
const expensiveValue = useMemo(() => {
  return someExpensiveCalculation(props.data);
}, [props.data]);

// Utilisation de useCallback pour les fonctions
const handleClick = useCallback(() => {
  doSomething(props.value);
}, [props.value]);
```

### Virtual Lists
```typescript
// Liste virtualisée pour les grandes listes
function VirtualList({ items }: ListProps) {
  return (
    <VirtualScroll
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index]}
        </div>
      )}
    </VirtualScroll>
  );
}
```

### Debounce & Throttle
```typescript
// Fonction de debounce pour les recherches
const debouncedSearch = debounce((term: string) => {
  performSearch(term);
}, 300);

// Fonction de throttle pour le scroll
const throttledScroll = throttle(() => {
  checkScrollPosition();
}, 100);
```