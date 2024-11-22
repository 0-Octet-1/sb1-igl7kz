import { QueryClient } from 'react-query';
import { initializeFirestore, enableIndexedDbPersistence, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { app, db } from '../firebase';

// Configuration du cache React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }
});

// Configuration du cache Firestore
export const initializeFirestoreCache = () => {
  const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    experimentalForceLongPolling: true
  });

  enableIndexedDbPersistence(db).catch((err) => {
    console.error('Error enabling persistence:', err);
  });

  return db;
};

// Gestionnaire de cache local
export class LocalStorageCache {
  private static PREFIX = 'app_cache_';
  private static DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

  static set(key: string, value: any, ttl: number = this.DEFAULT_TTL) {
    const item = {
      value,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };
    localStorage.setItem(this.PREFIX + key, JSON.stringify(item));
  }

  static get(key: string): any {
    const item = localStorage.getItem(this.PREFIX + key);
    if (!item) return null;

    const { value, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      this.remove(key);
      return null;
    }

    return value;
  }

  static remove(key: string) {
    localStorage.removeItem(this.PREFIX + key);
  }

  static clear() {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
}

// Gestionnaire de cache en mémoire
export class MemoryCache {
  private static cache = new Map<string, any>();
  private static timestamps = new Map<string, number>();

  static set(key: string, value: any, ttl: number = 5 * 60 * 1000) {
    this.cache.set(key, value);
    this.timestamps.set(key, Date.now() + ttl);
  }

  static get(key: string): any {
    const expiry = this.timestamps.get(key);
    if (!expiry || Date.now() > expiry) {
      this.remove(key);
      return null;
    }
    return this.cache.get(key);
  }

  static remove(key: string) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  static clear() {
    this.cache.clear();
    this.timestamps.clear();
  }
}