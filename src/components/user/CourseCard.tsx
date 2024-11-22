import React from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '../ui/Progress';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    progress: number;
    thumbnail?: string;
    lastAccessed: Date;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {course.thumbnail && (
        <div className="relative h-48">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Progression</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} />
        </div>
        
        <Link 
          to={`/courses/${course.id}`}
          className="mt-4 inline-flex items-center justify-center w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          Continuer la formation
        </Link>
      </div>
    </motion.div>
  );
}