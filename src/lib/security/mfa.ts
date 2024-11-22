import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { generateDeviceFingerprint } from './deviceFingerprint';

interface MFASettings {
  enabled: boolean;
  verifiedDevices: string[];
  backupCodes: string[];
}

export async function enableMFA(userId: string): Promise<void> {
  const userRef = doc(db, 'users', userId);
  
  // Générer des codes de secours
  const backupCodes = Array.from({ length: 10 }, () => 
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );

  await updateDoc(userRef, {
    'security.mfa': {
      enabled: true,
      verifiedDevices: [],
      backupCodes
    }
  });

  return backupCodes;
}

export async function verifyDevice(userId: string): Promise<boolean> {
  const fingerprint = await generateDeviceFingerprint();
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) return false;
  
  const mfaSettings: MFASettings = userDoc.data().security?.mfa;
  if (!mfaSettings?.enabled) return true;
  
  return mfaSettings.verifiedDevices.includes(fingerprint);
}

export async function addVerifiedDevice(userId: string): Promise<void> {
  const fingerprint = await generateDeviceFingerprint();
  const userRef = doc(db, 'users', userId);
  
  await updateDoc(userRef, {
    'security.mfa.verifiedDevices': arrayUnion(fingerprint)
  });
}

export async function verifyBackupCode(userId: string, code: string): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) return false;
  
  const mfaSettings: MFASettings = userDoc.data().security?.mfa;
  if (!mfaSettings?.backupCodes.includes(code)) return false;
  
  // Supprimer le code utilisé
  await updateDoc(userRef, {
    'security.mfa.backupCodes': arrayRemove(code)
  });
  
  return true;
}