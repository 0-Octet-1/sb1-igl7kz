import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Journalisation des événements de sécurité
export async function logSecurityEvent(event: {
  type: string;
  userId: string;
  action: string;
  details?: any;
}) {
  try {
    await addDoc(collection(db, 'security_logs'), {
      ...event,
      timestamp: serverTimestamp(),
      ip: window.clientInformation?.platform || 'unknown',
      userAgent: navigator.userAgent
    });
  } catch (error) {
    console.error('Error logging security event:', error);
  }
}

// Vérification des tentatives de connexion suspectes
export async function checkLoginAttempts(userId: string): Promise<boolean> {
  try {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);

    const q = query(
      collection(db, 'login_attempts'),
      where('userId', '==', userId),
      where('timestamp', '>=', fiveMinutesAgo)
    );

    const snapshot = await getDocs(q);
    return snapshot.size < 5; // Limite à 5 tentatives par 5 minutes
  } catch (error) {
    console.error('Error checking login attempts:', error);
    return false;
  }
}

// Enregistrement des tentatives de connexion
export async function recordLoginAttempt(userId: string, success: boolean) {
  try {
    await addDoc(collection(db, 'login_attempts'), {
      userId,
      success,
      timestamp: serverTimestamp(),
      ip: window.clientInformation?.platform || 'unknown',
      userAgent: navigator.userAgent
    });
  } catch (error) {
    console.error('Error recording login attempt:', error);
  }
}