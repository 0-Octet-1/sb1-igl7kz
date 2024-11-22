import { describe, it, expect, vi } from 'vitest';
import { submitRating, getRatingStats, exportRatingsToCSV } from '../lib/api/ratings';
import { doc, setDoc, updateDoc, getDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

vi.mock('../lib/firebase', () => ({
  db: {
    doc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
    getDoc: vi.fn(),
    collection: vi.fn(),
    query: vi.fn(),
    getDocs: vi.fn()
  }
}));

describe('Ratings API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit a rating successfully', async () => {
    const mockRating = {
      rating: 5,
      criteria: {
        content: 5,
        presentation: 4,
        difficulty: 3,
        usefulness: 5
      },
      feedback: 'Great course!'
    };

    const mockCourseDoc = {
      exists: () => true,
      data: () => ({
        ratings: [],
        averageRating: 0,
        totalRatings: 0
      })
    };

    vi.mocked(getDoc).mockResolvedValue(mockCourseDoc as any);
    vi.mocked(setDoc).mockResolvedValue();
    vi.mocked(updateDoc).mockResolvedValue();

    await submitRating('user123', 'course123', mockRating);

    expect(setDoc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalled();
  });

  it('should get rating stats correctly', async () => {
    const mockRatings = [
      { rating: 5, criteria: { content: 5, presentation: 5, difficulty: 4, usefulness: 5 } },
      { rating: 4, criteria: { content: 4, presentation: 4, difficulty: 3, usefulness: 4 } }
    ];

    vi.mocked(getDocs).mockResolvedValue({
      docs: mockRatings.map(r => ({
        data: () => r
      }))
    } as any);

    const stats = await getRatingStats('course123');

    expect(stats.total).toBe(2);
    expect(stats.average.overall).toBe(4.5);
  });

  it('should export ratings to CSV format', async () => {
    const mockRatings = [
      {
        rating: 5,
        criteria: { content: 5, presentation: 5, difficulty: 4, usefulness: 5 },
        createdAt: new Date('2023-01-01'),
        feedback: 'Excellent!'
      }
    ];

    vi.mocked(getDocs).mockResolvedValue({
      docs: mockRatings.map(r => ({
        data: () => r
      }))
    } as any);

    const csvData = await exportRatingsToCSV('course123');

    expect(csvData[0]).toEqual([
      'Date',
      'Note Globale',
      'Contenu',
      'Présentation',
      'Difficulté',
      'Utilité',
      'Commentaire'
    ]);
    expect(csvData[1][1]).toBe(5);
  });
});