import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import FeedbackForm from '../../components/formations/FeedbackForm';
import { submitFeedback } from '../../lib/api/feedback';
import { useAuth } from '../../contexts/AuthContext';

vi.mock('../../lib/api/feedback');
vi.mock('../../contexts/AuthContext');
vi.mock('react-hot-toast');

describe('FeedbackForm', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'test-user' }
    } as any);
  });

  it('should render feedback type options', () => {
    render(<FeedbackForm courseId="test-course" />);
    
    expect(screen.getByLabelText('Question')).toBeInTheDocument();
    expect(screen.getByLabelText('Suggestion')).toBeInTheDocument();
    expect(screen.getByLabelText('Problème')).toBeInTheDocument();
  });

  it('should handle feedback type selection', () => {
    render(<FeedbackForm courseId="test-course" />);
    
    const suggestionRadio = screen.getByLabelText('Suggestion');
    fireEvent.click(suggestionRadio);
    
    expect(suggestionRadio).toBeChecked();
  });

  it('should submit feedback successfully', async () => {
    const mockSubmit = vi.fn();
    vi.mocked(submitFeedback).mockResolvedValue('feedback-id');

    render(<FeedbackForm courseId="test-course" onSubmit={mockSubmit} />);
    
    const textarea = screen.getByPlaceholderText('Décrivez votre question, suggestion ou problème...');
    fireEvent.change(textarea, { target: { value: 'Test feedback' } });

    const submitButton = screen.getByText('Envoyer le feedback');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitFeedback).toHaveBeenCalledWith({
        userId: 'test-user',
        courseId: 'test-course',
        type: 'question',
        comment: 'Test feedback'
      });
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});