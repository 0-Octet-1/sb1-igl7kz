import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RatingForm from '../../components/formations/RatingForm';
import { submitRating } from '../../lib/api/ratings';
import { useAuth } from '../../contexts/AuthContext';

vi.mock('../../lib/api/ratings');
vi.mock('../../contexts/AuthContext');
vi.mock('react-hot-toast');

describe('RatingForm', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'test-user' }
    } as any);
  });

  it('should render all rating criteria', () => {
    render(<RatingForm courseId="test-course" />);
    
    expect(screen.getByText('Qualité du contenu')).toBeInTheDocument();
    expect(screen.getByText('Clarté de la présentation')).toBeInTheDocument();
    expect(screen.getByText('Niveau de difficulté')).toBeInTheDocument();
    expect(screen.getByText('Utilité pratique')).toBeInTheDocument();
  });

  it('should handle star rating clicks', async () => {
    render(<RatingForm courseId="test-course" />);
    
    const contentStars = screen.getAllByTestId('content-star');
    fireEvent.click(contentStars[4]); // 5 stars for content

    await waitFor(() => {
      expect(screen.getByText('Note globale: 5/5')).toBeInTheDocument();
    });
  });

  it('should submit rating successfully', async () => {
    const onSubmit = vi.fn();
    vi.mocked(submitRating).mockResolvedValue({} as any);

    render(<RatingForm courseId="test-course" onSubmit={onSubmit} />);
    
    // Rate all criteria
    const criteriaStars = screen.getAllByTestId(/.*-star$/);
    criteriaStars.forEach((star, index) => {
      if (index % 5 === 4) { // Click the last star of each criteria
        fireEvent.click(star);
      }
    });

    // Add feedback
    const textarea = screen.getByPlaceholderText('Votre avis...');
    fireEvent.change(textarea, { target: { value: 'Excellent cours !' } });

    // Submit
    const submitButton = screen.getByText('Envoyer l\'évaluation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitRating).toHaveBeenCalledWith(
        'test-user',
        'test-course',
        {
          rating: 5,
          criteria: {
            content: 5,
            presentation: 5,
            difficulty: 5,
            usefulness: 5
          },
          feedback: 'Excellent cours !'
        }
      );
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});