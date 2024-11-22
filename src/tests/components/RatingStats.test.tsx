import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RatingStats from '../../components/formations/RatingStats';
import { getRatingStats, exportRatingsToCSV } from '../../lib/api/ratings';

vi.mock('../../lib/api/ratings');
vi.mock('react-query', () => ({
  useQuery: () => ({
    data: {
      total: 10,
      average: {
        overall: 4.5,
        content: 4.3,
        presentation: 4.7,
        difficulty: 3.8,
        usefulness: 4.6
      },
      distribution: {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        5: 4
      }
    },
    isLoading: false
  }),
  useMutation: () => ({
    mutate: vi.fn(),
    isLoading: false
  })
}));

describe('RatingStats', () => {
  it('should display overall rating', () => {
    render(<RatingStats courseId="test-course" />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText(/10 évaluations/)).toBeInTheDocument();
  });

  it('should display rating distribution', () => {
    render(<RatingStats courseId="test-course" />);
    expect(screen.getByText('5 étoiles')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('should display criteria ratings', () => {
    render(<RatingStats courseId="test-course" />);
    expect(screen.getByText('Contenu')).toBeInTheDocument();
    expect(screen.getByText('4.3')).toBeInTheDocument();
  });
});