import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface NextLessonProps {
  lesson: {
    id: string;
    title: string;
    courseId: string;
    courseTitle: string;
    scheduledFor: Date;
    duration: string;
  };
}

export default function NextLesson({ lesson }: NextLessonProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Prochaine leçon</h3>
        <span className="text-sm text-accent">{lesson.courseTitle}</span>
      </div>
      
      <h4 className="text-xl font-medium mb-4">{lesson.title}</h4>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {format(lesson.scheduledFor, 'dd MMMM yyyy', { locale: fr })}
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-2" />
          {lesson.duration}
        </div>
      </div>
      
      <Link
        to={`/courses/${lesson.courseId}/lessons/${lesson.id}`}
        className="inline-flex items-center justify-center w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
      >
        Commencer la leçon
      </Link>
    </div>
  );
}