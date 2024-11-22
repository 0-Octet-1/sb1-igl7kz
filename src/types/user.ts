export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin: Date;
  preferences: {
    language: 'fr' | 'en';
    notifications: boolean;
  };
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedModules: string[];
  lastAccessed: Date;
  certificateEarned: boolean;
}