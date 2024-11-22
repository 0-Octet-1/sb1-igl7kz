import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuditLog, AuditFilter, AuditStats } from '../../types/audit';

export async function logAuditEvent(event: Omit<AuditLog, 'id' | 'timestamp'>) {
  try {
    await addDoc(collection(db, 'audit_logs'), {
      ...event,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}

export async function fetchAuditLogs(filters: AuditFilter = {}) {
  try {
    let q = query(
      collection(db, 'audit_logs'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    if (filters.startDate) {
      q = query(q, where('timestamp', '>=', filters.startDate));
    }
    if (filters.endDate) {
      q = query(q, where('timestamp', '<=', filters.endDate));
    }
    if (filters.action) {
      q = query(q, where('action', '==', filters.action));
    }
    if (filters.entityType) {
      q = query(q, where('entityType', '==', filters.entityType));
    }
    if (filters.userId) {
      q = query(q, where('userId', '==', filters.userId));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AuditLog[];
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw error;
  }
}

export async function fetchAuditStats(): Promise<AuditStats> {
  try {
    const logsQuery = query(
      collection(db, 'audit_logs'),
      orderBy('timestamp', 'desc'),
      limit(1000)
    );
    
    const snapshot = await getDocs(logsQuery);
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AuditLog[];

    const actionsByType: Record<string, number> = {};
    const actionsByUser: Record<string, number> = {};

    logs.forEach(log => {
      actionsByType[log.action] = (actionsByType[log.action] || 0) + 1;
      actionsByUser[log.userId] = (actionsByUser[log.userId] || 0) + 1;
    });

    return {
      totalActions: logs.length,
      actionsByType,
      actionsByUser,
      recentActivity: logs.slice(0, 5)
    };
  } catch (error) {
    console.error('Error fetching audit stats:', error);
    throw error;
  }
}