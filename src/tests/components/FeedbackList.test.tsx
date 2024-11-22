import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeedbackList from '../../components/formations/FeedbackList';
import { getFeedback } from '../../lib/api/feedback';

vi.mock('../../lib/api/feedback');
vi.mock('react-query', () => ({
  useQuery: () => ({
    data: [
      {
        id: 'feedback-1',
        type: 'question',
        status: 'pending',
        comment: 'Test question',
        createdAt: new Date(),
        replies: []
      },
      {
        id: 'feedback-2',
        type: 'suggestion',
        status: 'resolved',
        comment: 'Test suggestion',
        createdAt: new Date(),
        replies: [
          {
            id: 'reply-1',
            comment: 'Test reply',
            createdAt: new Date()
          }
        ]
      }
    ],
    isLoading: false
  })
}));

describe('FeedbackList', () => {
  it('should render feedback items', () => {
    render(<FeedbackList courseId="test-course" />);
    
    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(screen.getByText('Test suggestion')).toBeInTheDocument();
  });

  it('should display feedback status', () => {
    render(<FeedbackList courseId="test-course" />);
    
    expect(screen.getByText('En attente')).toBeInTheDocument();
    expect(screen.getByText('Résolu')).toBeInTheDocument();
  });

  it('should show replies when available', () => {
    render(<FeedbackList courseId="test-course" />);
    
    expect(screen.getByText('Test reply')).toBeInTheDocument();
  });
});