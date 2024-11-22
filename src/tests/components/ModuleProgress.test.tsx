import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import ModuleProgress from '../../components/formations/ModuleProgress';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';

vi.mock('@heroicons/react/24/outline', () => ({
  CheckCircleIcon: () => <div data-testid="check-icon" />,
  LockClosedIcon: () => <div data-testid="lock-icon" />
}));

describe('ModuleProgress', () => {
  const mockModule = {
    id: 'module-1',
    title: 'Test Module',
    duration: '1h'
  };

  it('should render module information', () => {
    render(
      <ModuleProgress
        module={mockModule}
        isCompleted={false}
        isLocked={false}
        onClick={() => {}}
      />
    );

    expect(screen.getByText('Test Module')).toBeInTheDocument();
    expect(screen.getByText('1h')).toBeInTheDocument();
  });

  it('should show completed state', () => {
    render(
      <ModuleProgress
        module={mockModule}
        isCompleted={true}
        isLocked={false}
        onClick={() => {}}
      />
    );

    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('should show locked state', () => {
    render(
      <ModuleProgress
        module={mockModule}
        isCompleted={false}
        isLocked={true}
        onClick={() => {}}
      />
    );

    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });

  it('should handle click when not locked', () => {
    const handleClick = vi.fn();
    render(
      <ModuleProgress
        module={mockModule}
        isCompleted={false}
        isLocked={false}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('Test Module'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should not handle click when locked', () => {
    const handleClick = vi.fn();
    render(
      <ModuleProgress
        module={mockModule}
        isCompleted={false}
        isLocked={true}
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('Test Module'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});