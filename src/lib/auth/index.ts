import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

export async function loginUser(email: string, password: string): Promise<FirebaseUser> {
  try {
    const { user } = await firebaseSignIn(auth, email, password);
    
    // Mettre à jour la dernière connexion
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: serverTimestamp()
    });

    toast.success('Connexion réussie');
    return user;
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.code === 'auth/user-not-found') {
      toast.error('Utilisateur non trouvé');
    } else if (error.code === 'auth/wrong-password') {
      toast.error('Mot de passe incorrect');
    } else if (error.code === 'auth/too-many-requests') {
      toast.error('Trop de tentatives - Veuillez réessayer plus tard');
    } else {
      toast.error('Erreur de connexion');
    }
    throw error;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) return null;
    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
    toast.success('Déconnexion réussie');
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Erreur lors de la déconnexion');
  }
}

export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success('Email de réinitialisation envoyé');
  } catch (error) {
    console.error('Password reset error:', error);
    toast.error('Erreur lors de la réinitialisation du mot de passe');
  }
}