import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface Permission {
  action: string;
  resource: string;
}

export async function checkUserPermissions(userId: string, requiredPermission: Permission): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();

    if (!userData) return false;

    // Vérifier si l'utilisateur est admin
    if (userData.role === 'admin') return true;

    // Vérifier les permissions spécifiques
    const userPermissions = userData.permissions || [];
    return userPermissions.some(
      (p: Permission) => 
        p.action === requiredPermission.action && 
        p.resource === requiredPermission.resource
    );
  } catch (error) {
    console.error('Error checking permissions:', error);
    return false;
  }
}

export async function checkUserRole(userId: string, requiredRole: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();

    if (!userData) return false;

    return userData.role === requiredRole;
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
}