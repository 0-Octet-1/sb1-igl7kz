import { describe, it, expect, vi } from 'vitest';
import { submitRating, getRatingStats, exportRatingsToCSV } from '../../lib/api/ratings';
import { logAuditEvent } from '../../lib/api/audit';

vi.mock('../../lib/api/audit');

describe('Ratings Integration', () => {
  const userId = 'test-user';
  const courseId = 'test-course';

  it('should update course stats after rating submission', async () => {
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

    await submitRating(userId, courseId, mockRating);

    const stats = await getRatingStats(courseId);
    expect(stats.average.overall).toBeGreaterThan(0);
    expect(stats.total).toBeGreaterThan(0);
  });

  it('should log audit event after rating submission', async () => {
    const mockLogAuditEvent = vi.mocked(logAuditEvent);

    await submitRating(userId, courseId, {
      rating: 4,
      criteria: {
        content: 4,
        presentation: 4,
        difficulty: 4,
        usefulness: 4
      }
    });

    expect(mockLogAuditEvent).toHaveBeenCalledWith(expect.objectContaining({
      action: 'create',
      resourceType: 'rating'
    }));
  });

  it('should export ratings in correct CSV format', async () => {
    const csvData = await exportRatingsToCSV(courseId);
    
    expect(csvData[0]).toEqual([
      'Date',
      'Note Globale',
      'Contenu',
      'Présentation',
      'Difficulté',
      'Utilité',
      'Commentaire'
    ]);

    expect(csvData.length).toBeGreaterThan(1);
  });
});