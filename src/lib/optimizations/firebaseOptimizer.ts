import { 
  query, 
  where, 
  limit, 
  startAfter,
  getDocs,
  collection,
  writeBatch,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';

// Pagination optimisée
export async function fetchPaginatedData<T>(
  collectionName: string,
  pageSize: number,
  lastDoc?: any,
  filters?: Record<string, any>
): Promise<{ data: T[]; lastDoc: any }> {
  let q = query(collection(db, collectionName), limit(pageSize));

  if (filters) {
    Object.entries(filters).forEach(([field, value]) => {
      q = query(q, where(field, '==', value));
    });
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];

  return {
    data,
    lastDoc: snapshot.docs[snapshot.docs.length - 1]
  };
}

// Opérations par lots
export async function batchOperation(operations: {
  create?: { collection: string; data: any }[];
  update?: { collection: string; id: string; data: any }[];
  delete?: { collection: string; id: string }[];
}) {
  const batch = writeBatch(db);

  operations.create?.forEach(({ collection: collectionName, data }) => {
    const ref = doc(collection(db, collectionName));
    batch.set(ref, data);
  });

  operations.update?.forEach(({ collection: collectionName, id, data }) => {
    batch.update(doc(db, collectionName, id), data);
  });

  operations.delete?.forEach(({ collection: collectionName, id }) => {
    batch.delete(doc(db, collectionName, id));
  });

  await batch.commit();
}

// Mise en cache des requêtes fréquentes
export class QueryCache {
  private static cache = new Map<string, { data: any; timestamp: number }>();
  private static TTL = 5 * 60 * 1000; // 5 minutes

  static async get<T>(
    key: string,
    queryFn: () => Promise<T>
  ): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.data;
    }

    const data = await queryFn();
    this.cache.set(key, { data, timestamp: Date.now() });
    return data;
  }

  static invalidate(key: string) {
    this.cache.delete(key);
  }

  static clear() {
    this.cache.clear();
  }
}

// Optimisation des requêtes complexes
export async function optimizedQuery<T>(
  collectionName: string,
  conditions: {
    field: string;
    operator: '==' | '>' | '<' | '>=' | '<=';
    value: any;
  }[],
  orderBy?: { field: string; direction: 'asc' | 'desc' },
  pageSize: number = 10
): Promise<T[]> {
  let q = query(collection(db, collectionName));

  // Appliquer les conditions de manière optimisée
  conditions.forEach(({ field, operator, value }) => {
    q = query(q, where(field, operator, value));
  });

  // Limiter les résultats
  q = query(q, limit(pageSize));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
}

// Dénormalisation des données fréquemment accédées
export interface DenormalizedData {
  id: string;
  [key: string]: any;
}

export async function denormalizeData(
  sourceCollection: string,
  targetCollection: string,
  fieldsToInclude: string[],
  condition?: { field: string; value: any }
) {
  let q = query(collection(db, sourceCollection));
  if (condition) {
    q = query(q, where(condition.field, '==', condition.value));
  }

  const snapshot = await getDocs(q);
  const batch = writeBatch(db);

  snapshot.docs.forEach(sourceDoc => {
    const data = sourceDoc.data();
    const denormalizedData: DenormalizedData = {
      id: sourceDoc.id,
      lastUpdated: new Date()
    };

    fieldsToInclude.forEach(field => {
      if (data[field] !== undefined) {
        denormalizedData[field] = data[field];
      }
    });

    const targetRef = doc(db, targetCollection, sourceDoc.id);
    batch.set(targetRef, denormalizedData, { merge: true });
  });

  await batch.commit();
}