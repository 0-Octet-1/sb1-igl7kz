import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import ProgressExport from '../../components/formations/ProgressExport';
import { exportProgress } from '../../lib/api/progress';

vi.mock('../../lib/api/progress');
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'test-user' } })
}));

describe('ProgressExport', () => {
  it('should render export button', () => {
    render(<ProgressExport />);
    
    expect(screen.getByText('Exporter mes progrès')).toBeInTheDocument();
  });

  it('should handle export click', async () => {
    const mockCsvData = 'Course,Progress,Date\nCourse 1,75%,2023-01-01';
    vi.mocked(exportProgress).mockResolvedValue(mockCsvData);

    render(<ProgressExport />);
    
    const exportButton = screen.getByText('Exporter mes progrès');
    await fireEvent.click(exportButton);

    expect(exportProgress).toHaveBeenCalledWith('test-user');
  });

  it('should show loading state during export', async () => {
    vi.mocked(exportProgress).mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve(''), 100);
    }));

    render(<ProgressExport />);
    
    const exportButton = screen.getByText('Exporter mes progrès');
    fireEvent.click(exportButton);

    expect(exportButton).toBeDisabled();
    expect(screen.getByText('Export...')).toBeInTheDocument();
  });
});