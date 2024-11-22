import React from 'react';
import { useQuery } from 'react-query';
import { fetchUserCertificates } from '../../lib/api/user';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function UserCertificates() {
  const { user } = useAuth();
  const { data: certificates } = useQuery(
    ['userCertificates', user?.id],
    () => fetchUserCertificates(user!.id)
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Mes Certificats</h2>
      </div>
      <div className="divide-y">
        {certificates?.map((certificate) => (
          <div key={certificate.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{certificate.courseTitle}</h3>
                <p className="text-sm text-gray-600">
                  Obtenu le {format(certificate.earnedAt, 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
              <button
                onClick={() => window.open(certificate.pdfUrl, '_blank')}
                className="flex items-center text-accent hover:text-accent-hover"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
                Télécharger
              </button>
            </div>
          </div>
        ))}
        {(!certificates || certificates.length === 0) && (
          <div className="p-4 text-center text-gray-500">
            Aucun certificat disponible
          </div>
        )}
      </div>
    </div>
  );
}