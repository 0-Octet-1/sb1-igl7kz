import React from 'react';
import { Progress } from '../ui/Progress';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  progress: number;
  lastAccessed: Date;
}

interface CourseProgressProps {
  courses: Course[];
}

export default function CourseProgress({ courses }: CourseProgressProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Mes Formations en Cours</h2>
      
      <div className="space-y-6">
        {courses?.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{course.title}</h3>
              <span className="text-sm text-gray-500">
                {course.progress}%
              </span>
            </div>
            <Progress value={course.progress} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}