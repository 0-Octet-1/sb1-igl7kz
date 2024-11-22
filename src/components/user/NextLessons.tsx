import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Lesson {
  id: string;
  title: string;
  courseTitle: string;
  date: Date;
  duration: string;
}

interface NextLessonsProps {
  lessons: Lesson[];
  className?: string;
}

export default function NextLessons({ lessons, className = '' }: NextLessonsProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Prochaines Leçons</h2>
      
      <div className="space-y-4">
        {lessons?.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <h3 className="font-medium">{lesson.title}</h3>
              <p className="text-sm text-gray-500">{lesson.courseTitle}</p>
              
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {format(lesson.date, 'dd MMMM yyyy', { locale: fr })}
                </span>
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {lesson.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}