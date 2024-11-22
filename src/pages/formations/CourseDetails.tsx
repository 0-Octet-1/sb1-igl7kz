import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCourse } from '../../lib/api/courses';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import CourseProgress from '../../components/formations/CourseProgress';
import ModuleList from '../../components/formations/ModuleList';
import RatingStats from '../../components/formations/RatingStats';
import { useAuth } from '../../contexts/AuthContext';

export default function CourseDetails() {
  const { courseId } = useParams();
  const { user } = useAuth();
  
  const { data: course, isLoading } = useQuery(
    ['course', courseId],
    () => getCourse(courseId!),
    {
      enabled: !!courseId
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-500">
          Formation non trouvée
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{course.duration}</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
          </div>

          <ModuleList modules={course.modules} courseId={courseId!} />
        </div>

        {/* Barre latérale */}
        <aside className="space-y-6">
          {user && (
            <CourseProgress courseId={courseId!} />
          )}

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Évaluations</h2>
            <RatingStats courseId={courseId!} />
          </div>
        </aside>
      </div>
    </div>
  );
}