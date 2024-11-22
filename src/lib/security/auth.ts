import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { logSecurityEvent } from './audit';

export async function loginWithEmail(email: string, password: string) {
  try {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    // Mettre à jour la dernière connexion
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date(),
      lastLoginIP: window.clientInformation?.platform || 'unknown'
    });

    // Logger l'événement
    await logSecurityEvent({
      type: 'login',
      userId: user.uid,
      details: {
        method: 'email',
        timestamp: new Date(),
        ip: window.clientInformation?.platform || 'unknown'
      }
    });

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function registerWithEmail(email: string, password: string, userData: any) {
  try {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Créer le profil utilisateur
    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      createdAt: new Date(),
      role: 'user',
      status: 'active'
    });

    // Logger l'événement
    await logSecurityEvent({
      type: 'register',
      userId: user.uid,
      details: {
        method: 'email',
        timestamp: new Date()
      }
    });

    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      await logSecurityEvent({
        type: 'logout',
        userId: user.uid,
        details: {
          timestamp: new Date()
        }
      });
    }
    
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function resetUserPassword(email: string) {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
}