import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface SecurityEvent {
  type: string;
  userId: string;
  details: any;
}

export async function logSecurityEvent(event: SecurityEvent) {
  try {
    await addDoc(collection(db, 'security_logs'), {
      ...event,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      platform: window.clientInformation?.platform || 'unknown'
    });
  } catch (error) {
    console.error('Error logging security event:', error);
  }
}

export async function logAuditEvent(event: {
  action: string;
  userId: string;
  resourceType: string;
  resourceId?: string;
  details?: any;
}) {
  try {
    await addDoc(collection(db, 'audit_logs'), {
      ...event,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      platform: window.clientInformation?.platform || 'unknown'
    });
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}