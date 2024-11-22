import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { User } from '../../types/user';
import { logAuditEvent } from './audit';

export async function fetchUserProfile(userId: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    return userDoc.data() as User;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(userId: string, data: Partial<User>) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });

    await logAuditEvent({
      action: 'update',
      userId,
      resourceType: 'user',
      resourceId: userId,
      details: { updatedFields: Object.keys(data) }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function updateUserSettings(userId: string, settings: any) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      settings,
      updatedAt: serverTimestamp()
    });

    await logAuditEvent({
      action: 'update',
      userId,
      resourceType: 'user_settings',
      resourceId: userId,
      details: { settings }
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
}

export async function fetchUserDashboard(userId: string) {
  try {
    // Récupérer les statistiques de l'utilisateur
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();

    // Récupérer les cours de l'utilisateur
    const coursesQuery = query(
      collection(db, 'userCourses'),
      where('userId', '==', userId)
    );
    const coursesSnapshot = await getDocs(coursesQuery);
    const courses = coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Récupérer la prochaine leçon
    const today = new Date();
    const lessonsQuery = query(
      collection(db, 'lessons'),
      where('userId', '==', userId),
      where('date', '>=', today)
    );
    const lessonsSnapshot = await getDocs(lessonsQuery);
    const nextLesson = lessonsSnapshot.docs[0]?.data();

    return {
      stats: {
        totalCourses: courses.length,
        totalHours: userData?.totalHours || 0,
        achievements: userData?.achievements?.length || 0
      },
      courses,
      nextLesson: nextLesson ? {
        id: lessonsSnapshot.docs[0].id,
        ...nextLesson
      } : null
    };
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    throw error;
  }
}

export async function fetchUserNotifications(userId: string) {
  try {
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(notificationsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

export async function fetchUserCertificates(userId: string) {
  try {
    const certificatesQuery = query(
      collection(db, 'certificates'),
      where('userId', '==', userId)
    );
    
    const snapshot = await getDocs(certificatesQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
}