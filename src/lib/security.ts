import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Vérification des permissions
export async function checkPermission(userId: string, permission: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    
    if (!userData) return false;
    
    // Vérifier les permissions de l'utilisateur
    const userPermissions = userData.permissions || [];
    return userPermissions.includes(permission);
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
}

// Protection contre les attaques XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validation des données
export function validateData(data: any, schema: any): boolean {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    console.error('Data validation error:', error);
    return false;
  }
}

// Rate limiting
const rateLimits = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(userId: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const userLimit = rateLimits.get(userId);

  if (!userLimit) {
    rateLimits.set(userId, { count: 1, timestamp: now });
    return true;
  }

  if (now - userLimit.timestamp > windowMs) {
    rateLimits.set(userId, { count: 1, timestamp: now });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count += 1;
  rateLimits.set(userId, userLimit);
  return true;
}