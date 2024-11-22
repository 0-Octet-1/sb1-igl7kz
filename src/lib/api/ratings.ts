import { 
  doc, 
  setDoc, 
  updateDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  arrayUnion, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { logAuditEvent } from './audit';

export interface Rating {
  id: string;
  userId: string;
  courseId: string;
  moduleId?: string;
  rating: number;
  feedback?: string;
  criteria: {
    content: number;
    presentation: number;
    difficulty: number;
    usefulness: number;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export async function submitRating(
  userId: string, 
  courseId: string, 
  data: Omit<Rating, 'id' | 'userId' | 'courseId' | 'createdAt'>
) {
  const ratingRef = doc(db, 'ratings', `${userId}_${courseId}`);
  
  const ratingData = {
    userId,
    courseId,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(ratingRef, ratingData);

  // Mettre à jour les statistiques du cours
  const courseRef = doc(db, 'courses', courseId);
  const courseDoc = await getDoc(courseRef);
  const courseData = courseDoc.data();

  const ratings = courseData?.ratings || [];
  const newAverage = {
    overall: calculateAverage([...ratings.map((r: any) => r.rating), data.rating]),
    content: calculateAverage([...ratings.map((r: any) => r.criteria.content), data.criteria.content]),
    presentation: calculateAverage([...ratings.map((r: any) => r.criteria.presentation), data.criteria.presentation]),
    difficulty: calculateAverage([...ratings.map((r: any) => r.criteria.difficulty), data.criteria.difficulty]),
    usefulness: calculateAverage([...ratings.map((r: any) => r.criteria.usefulness), data.criteria.usefulness])
  };

  await updateDoc(courseRef, {
    ratings: arrayUnion(ratingData),
    averageRating: newAverage,
    totalRatings: ratings.length + 1,
    lastRated: serverTimestamp()
  });

  await logAuditEvent({
    action: 'create',
    userId,
    resourceType: 'rating',
    resourceId: `${userId}_${courseId}`,
    details: { courseId, rating: data.rating }
  });

  return ratingData;
}

export async function getRatings(courseId: string, filters?: {
  minRating?: number;
  maxRating?: number;
  withFeedback?: boolean;
}) {
  let q = query(collection(db, 'ratings'), where('courseId', '==', courseId));

  if (filters?.minRating) {
    q = query(q, where('rating', '>=', filters.minRating));
  }
  if (filters?.maxRating) {
    q = query(q, where('rating', '<=', filters.maxRating));
  }
  if (filters?.withFeedback) {
    q = query(q, where('feedback', '!=', null));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Rating[];
}

export async function exportRatingsToCSV(courseId: string) {
  const ratings = await getRatings(courseId);
  
  const headers = [
    'Date',
    'Note Globale',
    'Contenu',
    'Présentation',
    'Difficulté',
    'Utilité',
    'Commentaire'
  ];

  const rows = ratings.map(r => [
    new Date(r.createdAt).toLocaleDateString(),
    r.rating,
    r.criteria.content,
    r.criteria.presentation,
    r.criteria.difficulty,
    r.criteria.usefulness,
    r.feedback || ''
  ]);

  return [headers, ...rows];
}

export async function getRatingStats(courseId: string) {
  const ratings = await getRatings(courseId);
  
  const stats = {
    total: ratings.length,
    average: {
      overall: calculateAverage(ratings.map(r => r.rating)),
      content: calculateAverage(ratings.map(r => r.criteria.content)),
      presentation: calculateAverage(ratings.map(r => r.criteria.presentation)),
      difficulty: calculateAverage(ratings.map(r => r.criteria.difficulty)),
      usefulness: calculateAverage(ratings.map(r => r.criteria.usefulness))
    },
    distribution: {
      1: ratings.filter(r => r.rating === 1).length,
      2: ratings.filter(r => r.rating === 2).length,
      3: ratings.filter(r => r.rating === 3).length,
      4: ratings.filter(r => r.rating === 4).length,
      5: ratings.filter(r => r.rating === 5).length
    }
  };

  return stats;
}

function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}