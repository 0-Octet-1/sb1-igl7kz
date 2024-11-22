import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CourseProgress from '../../components/formations/CourseProgress';
import { getCourseProgress } from '../../lib/api/progress';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';

vi.mock('../../lib/api/progress');
vi.mock('../../contexts/AuthContext');
vi.mock('react-query');

describe('CourseProgress', () import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CourseProgress from '../../components/formations/CourseProgress';
import { getCourseProgress } from '../../lib/api/progress';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';

vi.mock('../../lib/api/progress');
vi.mock('../../contexts/AuthContext');
vi.mock('react-query');

describe('CourseProgress', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'test-user' }
    } as any);
  });

  it('should display progress percentage', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: {
        completedModules: ['module1', 'module2'],
        totalModules: 4,
        progress: 50
      },
      isLoading: false
    } as any);

    render(<CourseProgress courseId="test-course" />);
    
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should show completion message when course is completed', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: {
        completedModules: ['module1', 'module2'],
        totalModules: 2,
        progress: 100,
        completed: true,
        completedAt: new Date('2023-01-01')
      },
      isLoading: false
    } as any);

    render(<CourseProgress courseId="test-course" />);
    
    expect(screen.getByText('Formation terminée !')).toBeInTheDocument();
    expect(screen.getByText(/Terminé le/)).toBeInTheDocument();
  });
});