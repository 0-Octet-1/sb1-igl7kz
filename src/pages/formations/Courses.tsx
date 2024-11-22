import React from 'react';
import { useQuery } from 'react-query';
import { fetchCourses } from '../../lib/api/courses';
import CourseList from '../../components/formations/CourseList';
import CourseFilters from '../../components/formations/CourseFilters';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function Courses() {
  const { data: courses, isLoading } = useQuery('courses', fetchCourses);
  const [filteredCourses, setFilteredCourses] = React.useState(courses);

  React.useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Formations</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <CourseFilters 
            courses={courses || []} 
            onFilter={setFilteredCourses} 
          />
        </aside>

        <main className="lg:col-span-3">
          <CourseList courses={filteredCourses || []} />
        </main>
      </div>
    </div>
  );
}