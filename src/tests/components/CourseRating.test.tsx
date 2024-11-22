import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CourseRating from '../../components/formations/CourseRating';
import { rateCourse } from '../../lib/api/ratings';
import { useAuth } from '../../contexts/AuthContext';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

vi.mock('../../lib/api/ratings');
vi.mock('../../contexts/AuthContext');
vi.mock('react-hot-toast');
vi.mock('@heroicons/react/24/outline', () => ({
  StarIcon: () => <div data-testid="star-outline" />
}));
vi.mock('@heroicons/react/24/solid', () => ({
  StarIcon: () => <div data-testid="star-solid" />
}));

describe('CourseRating', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'test-user' }
    } as any);
  });

  it('should render rating stars', () => {
    render(<CourseRating courseId="test-course" />);
    const stars = screen.getAllByTestId('star-outline');
    expect(stars).toHaveLength(5);
  });

  it('should handle star rating selection', () => {
    render(<CourseRating courseId="test-course" />);
    const stars = screen.getAllByTestId('star-outline');
    fireEvent.click(stars[3]); // Select 4 stars
    
    const solidStars = screen.getAllByTestId('star-solid');
    expect(solidStars).toHaveLength(4);
  });

  it('should submit rating with feedback', async () => {
    vi.mocked(rateCourse).mockResolvedValue({} as any);

    render(<CourseRating courseId="test-course" />);
    
    // Select rating
    const stars = screen.getAllByTestId('star-outline');
    fireEvent.click(stars[4]); // 5 stars

    // Add feedback
    const textarea = screen.getByPlaceholderText('Votre avis sur la formation (optionnel)');
    fireEvent.change(textarea, { target: { value: 'Excellent cours !' } });

    // Submit
    const submitButton = screen.getByText('Envoyer l\'évaluation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(rateCourse).toHaveBeenCalledWith(
        'test-user',
        'test-course',
        5,
        'Excellent cours !'
      );
    });
  });
});