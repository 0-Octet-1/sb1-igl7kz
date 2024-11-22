import { describe, it, expect, vi } from 'vitest';
import { loginUser, registerUser, resetPassword } from '../lib/auth';
import { auth, db } from '../lib/firebase';
import { serverTimestamp } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  serverTimestamp: () => new Date(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn()
}));

vi.mock('../lib/firebase', () => ({
  auth: {
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    sendPasswordResetEmail: vi.fn()
  },
  db: {
    doc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn()
  }
}));

describe('Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login user successfully', async () => {
    const mockUser = { uid: 'user123', email: 'test@example.com' };
    vi.mocked(auth.signInWithEmailAndPassword).mockResolvedValue({ user: mockUser } as any);

    const result = await loginUser('test@example.com', 'password123');

    expect(result).toEqual(mockUser);
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'test@example.com',
      'password123'
    );
    expect(db.updateDoc).toHaveBeenCalled();
  });

  it('should register user successfully', async () => {
    const mockUser = { uid: 'user123', email: 'test@example.com' };
    vi.mocked(auth.createUserWithEmailAndPassword).mockResolvedValue({ user: mockUser } as any);

    const result = await registerUser('test@example.com', 'password123', 'Test User');

    expect(result).toEqual(mockUser);
    expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'test@example.com',
      'password123'
    );
    expect(db.setDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'user',
        status: 'active',
        createdAt: expect.any(Date)
      })
    );
  });

  it('should send password reset email', async () => {
    await resetPassword('test@example.com');

    expect(auth.sendPasswordResetEmail).toHaveBeenCalledWith(
      auth,
      'test@example.com'
    );
  });
});