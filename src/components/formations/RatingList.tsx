import React from 'react';
import { Rating } from '../../lib/api/ratings';
import { StarIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RatingListProps {
  ratings: Rating[];
}

export default function RatingList({ ratings }: RatingListProps) {
  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <div key={rating.id} className="bg-surface p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= rating.rating
                      ? 'text-accent'
                      : 'text-accent/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {format(new Date(rating.createdAt), 'dd MMMM yyyy', { locale: fr })}
            </span>
          </div>
          {rating.feedback && (
            <p className="text-sm text-gray-600">{rating.feedback}</p>
          )}
        </div>
      ))}
    </div>
  );
}</content>