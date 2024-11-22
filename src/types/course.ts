export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  modules: Module[];
  thumbnail?: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'practice';
  completed?: boolean;
}