import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Certificate from '../../components/formations/Certificate';
import { generateCertificate, verifyCertificate } from '../../lib/api/certificates';
import { useAuth } from '../../contexts/AuthContext';

vi.mock('../../lib/api/certificates');
vi.mock('../../contexts/AuthContext');
vi.mock('qrcode.react', () => ({
  default: () => <div data-testid="qr-code" />
}));

describe('Certificate', () => {
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'test-user', displayName: 'Test User' }
    } as any);
  });

  it('should show generate button initially', () => {
    render(<Certificate courseId="test-course" courseName="Test Course" />);
    
    expect(screen.getByText('Générer le certificat')).toBeInTheDocument();
  });

  it('should generate certificate on button click', async () => {
    const mockCertificate = {
      id: 'cert-123',
      certificateNumber: 'CERT-123',
      issuedAt: new Date(),
      validUntil: new Date()
    };

    vi.mocked(generateCertificate).mockResolvedValue(mockCertificate);
    vi.mocked(verifyCertificate).mockResolvedValue({
      ...mockCertificate,
      isValid: true
    });

    render(<Certificate courseId="test-course" courseName="Test Course" />);
    
    const generateButton = screen.getByText('Générer le certificat');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('Certificat de Réussite')).toBeInTheDocument();
      expect(screen.getByText('CERT-123')).toBeInTheDocument();
    });
  });

  it('should display user name on certificate', async () => {
    const mockCertificate = {
      id: 'cert-123',
      certificateNumber: 'CERT-123',
      issuedAt: new Date(),
      validUntil: new Date()
    };

    vi.mocked(generateCertificate).mockResolvedValue(mockCertificate);
    vi.mocked(verifyCertificate).mockResolvedValue({
      ...mockCertificate,
      isValid: true
    });

    render(<Certificate courseId="test-course" courseName="Test Course" />);
    
    const generateButton = screen.getByText('Générer le certificat');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });
});