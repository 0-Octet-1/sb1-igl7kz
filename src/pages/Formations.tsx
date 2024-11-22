import { useState } from 'react';
import CourseList from '../components/formations/CourseList';
import CourseFilters from '../components/formations/CourseFilters';
import { Course } from '../types/course';

const courses: Course[] = [
  {
    id: 'cockpit-basics',
    title: 'Initiation au Cockpit',
    description: 'Maîtrisez les bases du cockpit du M2000C',
    duration: '2 heures',
    level: 'Débutant',
    modules: [
      {
        id: 'module-1',
        title: 'Vue d\'ensemble du cockpit',
        duration: '30 min',
        sections: [
          { id: 'section-1', title: 'Introduction', type: 'video' },
          { id: 'section-2', title: 'Panneau principal', type: 'practice' },
        ]
      }
    ],
    thumbnail: 'https://i.imgur.com/example1.jpg'
  },
  // Autres cours...
];

export default function Formations() {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <h1 className="text-center mb-12">Nos Formations</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <CourseFilters onFilter={setFilteredCourses} courses={courses} />
        <div className="lg:col-span-3">
          <CourseList courses={filteredCourses} />
        </div>
      </div>
    </div>
  );
}