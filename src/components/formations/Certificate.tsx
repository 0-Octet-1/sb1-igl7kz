import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { generateCertificate, verifyCertificate } from '../../lib/api/certificates';
import { Button } from '../ui/Button';
import QRCode from 'qrcode.react';

interface CertificateProps {
  courseId: string;
  courseName: string;
}

export default function Certificate({ courseId, courseName }: CertificateProps) {
  const { user } = useAuth();
  const [certificate, setCertificate] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const certificateId = await generateCertificate(user!.id, courseId);
      const certData = await verifyCertificate(certificateId);
      setCertificate(certData);
    } catch (error: any) {
      console.error('Error generating certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!certificate) {
    return (
      <div className="text-center">
        <Button
          variant="accent"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Génération...' : 'Générer le certificat'}
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-lg shadow-lg border border-accent"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-accent mb-2">Certificat de Réussite</h2>
        <p className="text-gray-600">Ce certificat est décerné à</p>
        <p className="text-xl font-semibold mt-2">{user?.displayName}</p>
      </div>

      <div className="mb-8">
        <p className="text-center">
          Pour avoir complété avec succès la formation
          <br />
          <span className="font-semibold">{courseName}</span>
        </p>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm text-gray-500">Certificat N°</p>
          <p className="font-mono">{certificate.certificateNumber}</p>
          <p className="text-sm text-gray-500 mt-2">
            Délivré le {new Date(certificate.issuedAt).toLocaleDateString()}
          </p>
        </div>
        
        <div className="text-center">
          <QRCode
            value={`https://votre-domaine.com/verify/${certificate.certificateNumber}`}
            size={64}
          />
          <p className="text-xs text-gray-500 mt-1">Scanner pour vérifier</p>
        </div>
      </div>
    </motion.div>
  );
}