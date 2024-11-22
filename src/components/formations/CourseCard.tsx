import { Link } from 'react-router-dom';
import { Course } from '../../types/course';
import { Button } from '../ui/Button';
import CourseProgress from './CourseProgress';

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const completedModules = course.modules.filter(m => m.completed).length;

  return (
    <div className="card">
      {course.thumbnail && (
        <div className="relative h-48 mb-4 overflow-hidden rounded">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded text-sm">
              {course.level}
            </span>
          </div>
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
      <p className="text-primary/80 mb-4">{course.description}</p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-accent">{course.duration}</span>
          <span>{course.modules.length} modules</span>
        </div>

        <CourseProgress 
          completed={completedModules} 
          total={course.modules.length} 
        />

        <Link to={`/formations/${course.id}`}>
          <Button variant="accent" className="w-full">
            Commencer la formation
          </Button>
        </Link>
      </div>
    </div>
  );
}