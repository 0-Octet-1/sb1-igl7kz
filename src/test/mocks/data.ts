import { Course, Module, Section } from '../../types/course';
import { User } from '../../types/user';
import { Content } from '../../types/content';
import { AuditLog } from '../../types/audit';

// Mock des utilisateurs
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'test@example.com',
    displayName: 'Test User',
    role: 'user',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date('2023-01-02'),
    preferences: {
      language: 'fr',
      notifications: true
    }
  },
  {
    id: 'admin-1',
    email: 'admin@example.com',
    displayName: 'Admin User',
    role: 'admin',
    createdAt: new Date('2023-01-01'),
    lastLogin: new Date('2023-01-02'),
    preferences: {
      language: 'fr',
      notifications: true
    }
  }
];

// Mock des formations
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Initiation au Cockpit',
    description: 'Formation de base sur le cockpit du M2000C',
    duration: '2 heures',
    level: 'Débutant',
    modules: [
      {
        id: 'module-1',
        title: 'Vue d\'ensemble',
        duration: '30 minutes',
        sections: [
          {
            id: 'section-1',
            title: 'Introduction',
            type: 'video'
          }
        ]
      }
    ]
  }
];

// Mock des progrès
export const mockProgress = {
  userId: 'user-1',
  courseId: 'course-1',
  progress: 75,
  modules: [
    {
      moduleId: 'module-1',
      completed: true,
      score: 85,
      timeSpent: 1800,
      lastAccessed: new Date()
    }
  ],
  startedAt: new Date('2023-01-01'),
  lastAccessed: new Date()
};

// Mock des évaluations
export const mockRatings = [
  {
    id: 'rating-1',
    userId: 'user-1',
    courseId: 'course-1',
    rating: 4,
    criteria: {
      content: 4,
      presentation: 5,
      difficulty: 3,
      usefulness: 4
    },
    feedback: 'Très bonne formation !',
    createdAt: new Date()
  }
];

// Mock des logs d'audit
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'audit-1',
    userId: 'user-1',
    action: 'create',
    entityType: 'rating',
    entityId: 'rating-1',
    details: { rating: 4 },
    ipAddress: '127.0.0.1',
    userAgent: 'Mozilla/5.0',
    timestamp: new Date()
  }
];