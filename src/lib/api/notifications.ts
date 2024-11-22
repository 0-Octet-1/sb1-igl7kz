import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  updateDoc,
  doc 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Notification } from '../../types/notification';

export async function fetchNotifications(): Promise<Notification[]> {
  try {
    const q = query(
      collection(db, 'notifications'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Notification[];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
}

export async function markAsRead(notificationId: string) {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

export async function markAllAsRead() {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(q);
    const batch = db.batch();
    
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { read: true });
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}