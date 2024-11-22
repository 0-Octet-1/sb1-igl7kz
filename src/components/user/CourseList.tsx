import React from 'react';
import CourseCard from './CourseCard';
import { motion } from 'framer-motion';

interface CourseListProps {
  courses: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    thumbnail?: string;
    lastAccessed: Date;
  }>;
  isLoading?: boolean;
}

export default function CourseList({ courses, isLoading = false }: CourseListProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Mes Formations en Cours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-2 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune formation en cours</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Mes Formations en Cours</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}