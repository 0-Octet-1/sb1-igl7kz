import { 
  doc, 
  updateDoc, 
  collection, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export async function updateUserRole(userId: string, role: string) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      role,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}

export async function updateUserStatus(userId: string, status: string, reason?: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const updateData: any = {
      status,
      updatedAt: serverTimestamp()
    };

    if (reason) {
      updateData.statusReason = reason;
      await addDoc(collection(db, 'userStatusHistory'), {
        userId,
        status,
        reason,
        createdAt: serverTimestamp()
      });
    }

    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  try {
    // Marquer l'utilisateur comme supprimé plutôt que de le supprimer réellement
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      status: 'deleted',
      deletedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}