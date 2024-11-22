import { motion } from 'framer-motion';
import { Course } from '../../types/course';
import CourseCard from './CourseCard';

interface Props {
  courses: Course[];
}

export default function CourseList({ courses }: Props) {
  return (
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
  );
}