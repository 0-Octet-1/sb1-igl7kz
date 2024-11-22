import { useQuery, UseQueryOptions } from 'react-query';
import { QueryCache } from '../lib/optimizations/firebaseOptimizer';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface UseFirestoreQueryOptions<T> extends Omit<UseQueryOptions<T[], Error>, 'queryFn'> {
  collection: string;
  where?: {
    field: string;
    operator: '==' | '>' | '<' | '>=' | '<=';
    value: any;
  }[];
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  limit?: number;
}

export function useFirestoreQuery<T>({
  collection: collectionName,
  where: conditions = [],
  orderBy,
  limit: limitCount,
  ...options
}: UseFirestoreQueryOptions<T>) {
  return useQuery<T[], Error>(
    [collectionName, conditions, orderBy, limitCount],
    async () => {
      const cacheKey = JSON.stringify({ collectionName, conditions, orderBy, limitCount });
      
      return QueryCache.get(cacheKey, async () => {
        let q = query(collection(db, collectionName));

        conditions.forEach(({ field, operator, value }) => {
          q = query(q, where(field, operator, value));
        });

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
      });
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      ...options
    }
  );
}