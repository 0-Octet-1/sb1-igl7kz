import { describe, it, expect, vi } from 'vitest';
import { updateModuleProgress, getCourseProgress, exportProgress } from '../lib/api/progress';
import { doc, getDoc, updateDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

vi.mock('../lib/firebase', () => ({
  db: {
    doc: vi.fn(),
    getDoc: vi.fn(),
    updateDoc: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    getDocs: vi.fn()
  }
}));

describe('Progress API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update module progress', async () => {
    const mockProgressDoc = {
      exists: () => true,
      data: () => ({
        modules: {
          'module1': { completed: true }
        }
      })
    };

    vi.mocked(getDoc).mockResolvedValue(mockProgressDoc as any);
    vi.mocked(updateDoc).mockResolvedValue();

    await updateModuleProgress('user123', 'course123', 'module123', {
      completed: true,
      timeSpent: 300,
      lastAccessed: new Date()
    });

    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        'modules.module123': expect.objectContaining({
          completed: true,
          timeSpent: 300
        })
      })
    );
  });

  it('should get course progress', async () => {
    const mockProgress = {
      exists: () => true,
      data: () => ({
        progress: 75,
        modules: {
          'module1': { completed: true },
          'module2': { completed: false }
        }
      })
    };

    vi.mocked(getDoc).mockResolvedValue(mockProgress as any);

    const progress = await getCourseProgress('user123', 'course123');

    expect(progress).toEqual(expect.objectContaining({
      progress: 75,
      modules: expect.any(Object)
    }));
  });

  it('should export progress to CSV', async () => {
    const mockProgress = [
      {
        courseId: 'course1',
        progress: 75,
        startedAt: new Date('2023-01-01'),
        completedAt: new Date('2023-01-15'),
        modules: { module1: { timeSpent: 300 } }
      }
    ];

    vi.mocked(getDocs).mockResolvedValue({
      docs: mockProgress.map(p => ({
        data: () => p
      }))
    } as any);

    const csvData = await exportProgress('user123');

    expect(typeof csvData).toBe('string');
    expect(csvData).toContain('Course,Progress,Started,Completed,Time Spent');
    expect(csvData).toContain('course1,75%');
  });
});