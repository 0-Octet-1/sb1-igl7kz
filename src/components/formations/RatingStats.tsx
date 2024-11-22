import React from 'react';
import { useQuery } from 'react-query';
import { getRatingStats, exportRatingsToCSV } from '../../lib/api/ratings';
import { Button } from '../ui/Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { CSVLink } from 'react-csv';
import { motion } from 'framer-motion';

interface RatingStatsProps {
  courseId: string;
}

export default function RatingStats({ courseId }: RatingStatsProps) {
  const { data: stats, isLoading } = useQuery(
    ['ratingStats', courseId],
    () => getRatingStats(courseId)
  );

  const { data: csvData } = useQuery(
    ['ratingsCsv', courseId],
    () => exportRatingsToCSV(courseId)
  );

  if (isLoading) return <div>Chargement...</div>;
  if (!stats) return null;

  const criteriaLabels = {
    content: 'Contenu',
    presentation: 'Présentation',
    difficulty: 'Difficulté',
    usefulness: 'Utilité'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Statistiques des évaluations</h3>
        {csvData && (
          <CSVLink
            data={csvData}
            filename={`evaluations_${courseId}_${Date.now()}.csv`}
            className="inline-flex items-center"
          >
            <Button variant="outline">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Exporter CSV
            </Button>
          </CSVLink>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-4">
            Note moyenne globale
          </h4>
          <div className="text-4xl font-bold text-accent">
            {stats.average.overall.toFixed(1)}
            <span className="text-lg text-gray-500">/5</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Basé sur {stats.total} évaluations
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-sm font-medium text-gray-600 mb-4">
            Distribution des notes
          </h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="w-12 text-sm">{rating} étoiles</span>
                <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(stats.distribution[rating] / stats.total) * 100}%` 
                    }}
                    className="h-full bg-accent"
                  />
                </div>
                <span className="w-12 text-sm text-right">
                  {Math.round((stats.distribution[rating] / stats.total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-sm font-medium text-gray-600 mb-4">
          Notes par critère
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(criteriaLabels).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm">{label}</span>
              <div className="flex items-center">
                <span className="text-lg font-semibold text-accent">
                  {stats.average[key as keyof typeof stats.average].toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 ml-1">/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}