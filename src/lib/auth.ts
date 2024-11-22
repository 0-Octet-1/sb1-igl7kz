import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from '../types/user';
import { logSecurityEvent } from './security/audit';
import { checkRateLimit } from './security/validation';
import { toast } from 'react-hot-toast';

// Constantes
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

// Récupération du profil utilisateur
export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    return userDoc.data() as User;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// Gestion des sessions
export async function extendSession(userId: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    sessionExpires: new Date(Date.now() + SESSION_DURATION),
    lastActivity: serverTimestamp()
  });
}

// Authentification principale
export async function loginUser(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    // Mettre à jour la dernière connexion
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: serverTimestamp(),
      lastLoginIP: window.clientInformation?.platform || 'unknown',
      sessionExpires: new Date(Date.now() + SESSION_DURATION)
    });

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Inscription
export async function registerUser(email: string, password: string, displayName: string) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    
    // Créer le profil utilisateur
    await setDoc(doc(db, 'users', user.uid), {
      email,
      displayName,
      role: 'user',
      status: 'active',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      sessionExpires: new Date(Date.now() + SESSION_DURATION),
      preferences: {
        language: 'fr',
        notifications: true
      }
    });

    // Envoyer l'email de vérification
    await sendEmailVerification(user);

    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Déconnexion
export async function logoutUser() {
  try {
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

// Réinitialisation du mot de passe
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
}

// Envoi de l'email de vérification
export async function sendVerificationEmail() {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}

// Historique des connexions
export async function getLoginHistory(userId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data()?.loginHistory || [];
  } catch (error) {
    console.error('Error fetching login history:', error);
    return [];
  }
}

// Gestion des appareils
export async function manageDevices(userId: string, deviceId: string, action: 'add' | 'remove') {
  const userRef = doc(db, 'users', userId);
  if (action === 'remove') {
    await updateDoc(userRef, {
      'security.trustedDevices': arrayRemove(deviceId)
    });
  } else {
    await updateDoc(userRef, {
      'security.trustedDevices': arrayUnion(deviceId)
    });
  }
}

// Révocation de toutes les sessions
export async function revokeAllSessions(userId: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    'security.trustedDevices': [],
    sessionExpires: new Date()
  });
}