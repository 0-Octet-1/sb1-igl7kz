import { describe, it, expect, vi } from 'vitest';
import { submitFeedback, getFeedback } from '../lib/api/feedback';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

vi.mock('../lib/firebase', () => ({
  db: {
    collection: vi.fn(),
    addDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn()
  }
}));

describe('Feedback API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should submit feedback successfully', async () => {
    const mockFeedback = {
      userId: 'user123',
      courseId: 'course123',
      type: 'question',
      comment: 'How do I access the next module?'
    };

    vi.mocked(addDoc).mockResolvedValue({ id: 'feedback-id' } as any);

    const feedbackId = await submitFeedback(mockFeedback);

    expect(feedbackId).toBe('feedback-id');
    expect(collection).toHaveBeenCalledWith(db, 'feedback');
    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        ...mockFeedback,
        status: 'pending',
        createdAt: expect.any(Function)
      })
    );
  });

  it('should get feedback with filters', async () => {
    const mockFeedback = [
      {
        id: 'feedback1',
        type: 'question',
        status: 'pending',
        comment: 'Question 1'
      },
      {
        id: 'feedback2',
        type: 'suggestion',
        status: 'resolved',
        comment: 'Suggestion 1'
      }
    ];

    vi.mocked(getDocs).mockResolvedValue({
      docs: mockFeedback.map(f => ({
        id: f.id,
        data: () => f
      }))
    } as any);

    const feedback = await getFeedback('course123', {
      type: 'question',
      status: 'pending'
    });

    expect(feedback).toHaveLength(2);
    expect(query).toHaveBeenCalled();
    expect(where).toHaveBeenCalledWith('type', '==', 'question');
  });
});