import { useState } from 'react';
import { Course } from '../../types/course';

interface Props {
  courses: Course[];
  onFilter: (filtered: Course[]) => void;
}

export default function CourseFilters({ courses, onFilter }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = () => {
    let filtered = [...courses];

    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    onFilter(filtered);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2">Rechercher</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Rechercher une formation..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFilter();
          }}
        />
      </div>

      <div>
        <label className="block mb-2">Niveau</label>
        <select
          className="input w-full"
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value);
            handleFilter();
          }}
        >
          <option value="">Tous les niveaux</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </select>
      </div>
    </div>
  );
}