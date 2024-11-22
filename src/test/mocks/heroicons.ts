import { vi } from 'vitest';

export const mockHeroIcons = {
  StarIcon: vi.fn(() => <div data-testid="star-icon" />),
  CheckCircleIcon: vi.fn(() => <div data-testid="check-icon" />),
  LockClosedIcon: vi.fn(() => <div data-testid="lock-icon" />),
  SignalSlashIcon: vi.fn(() => <div data-testid="offline-icon" />),
  PlusIcon: vi.fn(() => <div data-testid="plus-icon" />),
  TrashIcon: vi.fn(() => <div data-testid="trash-icon" />),
  EyeIcon: vi.fn(() => <div data-testid="eye-icon" />),
  PencilIcon: vi.fn(() => <div data-testid="pencil-icon" />),
  ArrowDownTrayIcon: vi.fn(() => <div data-testid="download-icon" />),
  Bars3Icon: vi.fn(() => <div data-testid="menu-icon" />),
  XMarkIcon: vi.fn(() => <div data-testid="close-icon" />),
  BellIcon: vi.fn(() => <div data-testid="bell-icon" />),
  UserCircleIcon: vi.fn(() => <div data-testid="user-icon" />),
  AcademicCapIcon: vi.fn(() => <div data-testid="academic-icon" />),
  ClockIcon: vi.fn(() => <div data-testid="clock-icon" />),
  TrophyIcon: vi.fn(() => <div data-testid="trophy-icon" />)
};