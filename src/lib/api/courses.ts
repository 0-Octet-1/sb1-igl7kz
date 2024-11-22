import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Course } from '../../types/course';

export async function fetchCourses(): Promise<Course[]> {
  try {
    const snapshot = await getDocs(collection(db, 'courses'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

export async function getCourse(courseId: string): Promise<Course | null> {
  try {
    const courseDoc = await getDoc(doc(db, 'courses', courseId));
    if (!courseDoc.exists()) return null;
    return { id: courseDoc.id, ...courseDoc.data() } as Course;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
}