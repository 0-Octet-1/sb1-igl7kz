import { doc, updateDoc, increment, arrayUnion, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
  lastAccessed: Date;
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  progress: number;
  modules: ModuleProgress[];
  startedAt: Date;
  lastAccessed: Date;
  completedAt?: Date;
  certificateId?: string;
}

export async function updateModuleProgress(userId: string, courseId: string, moduleId: string, data: Partial<ModuleProgress>) {
  const progressRef = doc(db, 'progress', `${userId}_${courseId}`);
  const progressDoc = await getDoc(progressRef);
  
  if (!progressDoc.exists()) {
    await updateDoc(progressRef, {
      userId,
      courseId,
      progress: 0,
      modules: [],
      startedAt: new Date(),
      lastAccessed: new Date()
    });
  }

  await updateDoc(progressRef, {
    [`modules.${moduleId}`]: {
      ...data,
      lastAccessed: new Date()
    },
    lastAccessed: new Date()
  });

  // Mettre à jour la progression globale
  const updatedDoc = await getDoc(progressRef);
  const modules = updatedDoc.data()?.modules || {};
  const completedModules = Object.values(modules).filter((m: any) => m.completed).length;
  const totalModules = Object.keys(modules).length;
  
  const progress = Math.round((completedModules / totalModules) * 100);
  
  await updateDoc(progressRef, {
    progress,
    ...(progress === 100 && { completedAt: new Date() })
  });

  return { progress, completed: progress === 100 };
}

export async function getModuleProgress(userId: string, courseId: string, moduleId: string) {
  const progressDoc = await getDoc(doc(db, 'progress', `${userId}_${courseId}`));
  return progressDoc.data()?.modules?.[moduleId] || null;
}

export async function getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
  const progressDoc = await getDoc(doc(db, 'progress', `${userId}_${courseId}`));
  return progressDoc.exists() ? progressDoc.data() as CourseProgress : null;
}

export async function exportProgress(userId: string) {
  const progressQuery = query(
    collection(db, 'progress'),
    where('userId', '==', userId)
  );
  
  const snapshot = await getDocs(progressQuery);
  const progress = snapshot.docs.map(doc => doc.data());
  
  // Formater pour l'export CSV
  const csvData = [
    ['Course', 'Progress', 'Started', 'Completed', 'Time Spent'].join(','),
    ...progress.map(p => [
      p.courseId,
      `${p.progress}%`,
      new Date(p.startedAt).toLocaleDateString(),
      p.completedAt ? new Date(p.completedAt).toLocaleDateString() : '',
      Object.values(p.modules).reduce((acc: number, m: any) => acc + (m.timeSpent || 0), 0)
    ].join(','))
  ].join('\n');

  return csvData;
}