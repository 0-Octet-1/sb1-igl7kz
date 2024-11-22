import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { mockAuth, mockFirestore, mockStorage } from './mocks/firebase';
import { mockHeroIcons } from './mocks/heroicons';
import { vi } from 'vitest';

// Setup MSW
const server = setupServer(...handlers);

// Setup
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  server.resetHandlers();
});
afterAll(() => server.close());

// Mock Firebase
vi.mock('firebase/auth', () => ({
  getAuth: () => mockAuth,
  signInWithEmailAndPassword: mockAuth.signInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockAuth.createUserWithEmailAndPassword,
  signOut: mockAuth.signOut,
  onAuthStateChanged: mockAuth.onAuthStateChanged
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: () => mockFirestore,
  collection: mockFirestore.collection,
  doc: mockFirestore.doc,
  getDoc: mockFirestore.getDoc,
  getDocs: mockFirestore.getDocs,
  setDoc: mockFirestore.setDoc,
  updateDoc: mockFirestore.updateDoc,
  query: mockFirestore.query,
  where: mockFirestore.where,
  orderBy: mockFirestore.orderBy,
  serverTimestamp: () => new Date()
}));

vi.mock('firebase/storage', () => ({
  getStorage: () => mockStorage,
  ref: mockStorage.ref,
  uploadBytes: mockStorage.uploadBytes,
  getDownloadURL: mockStorage.getDownloadURL
}));

// Mock HeroIcons
vi.mock('@heroicons/react/24/outline', () => mockHeroIcons);
vi.mock('@heroicons/react/24/solid', () => mockHeroIcons);

// Mock React Query
vi.mock('react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  QueryClient: vi.fn()
}));

// Mock React Hot Toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn()
  }
}));