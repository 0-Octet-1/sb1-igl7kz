import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserCertificates } from '../../lib/api/user';
import UserLayout from '../../components/user/UserLayout';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';

export default function Certificates() {
  const { user } = useAuth();
  const { data: certificates, isLoading } = useQuery(
    ['userCertificates', user?.id],
    () => fetchUserCertificates(user!.id)
  );

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <UserLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Mes Certificats</h1>

        <div className="grid gap-6">
          {certificates?.map((certificate) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{certificate.courseTitle}</h3>
                  <p className="text-sm text-gray-500">
                    Obtenu le {new Date(certificate.earnedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    N° {certificate.certificateNumber}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.open(certificate.pdfUrl, '_blank')}
                >
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Télécharger
                </Button>
              </div>
            </motion.div>
          ))}

          {certificates?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Vous n'avez pas encore obtenu de certificat.
              <br />
              Complétez des formations pour obtenir vos premiers certificats !
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}