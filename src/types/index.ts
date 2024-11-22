export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  prerequisites?: string[];
}

export interface Procedure {
  id: string;
  title: string;
  steps: string[];
  warnings?: string[];
  notes?: string[];
}

export interface SystemInfo {
  id: string;
  name: string;
  description: string;
  components: {
    name: string;
    description: string;
    location?: string;
  }[];
}