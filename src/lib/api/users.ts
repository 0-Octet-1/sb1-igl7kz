import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserManagement } from '../../types/admin';

interface UserFilters {
  role?: string;
  status?: string;
  search?: string;
}

export async function fetchUsers(filters: UserFilters): Promise<UserManagement[]> {
  try {
    let q = collection(db, 'users');

    // Apply filters
    if (filters.role) {
      q = query(q, where('role', '==', filters.role));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    // Note: Full-text search would require a separate search service in production

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserManagement[];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}