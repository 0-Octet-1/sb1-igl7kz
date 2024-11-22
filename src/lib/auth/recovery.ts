import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { generateSecurityQuestions } from './security';

export async function setupRecoveryOptions(userId: string, options: {
  securityQuestions: Array<{ question: string; answer: string }>;
  backupEmail?: string;
  phoneNumber?: string;
}) {
  const userRef = doc(db, 'users', userId);
  
  // Hasher les réponses aux questions de sécurité
  const hashedAnswers = await Promise.all(
    options.securityQuestions.map(async (q) => ({
      question: q.question,
      answer: await hashAnswer(q.answer)
    }))
  );

  await updateDoc(userRef, {
    'security.recoveryOptions': {
      securityQuestions: hashedAnswers,
      backupEmail: options.backupEmail,
      phoneNumber: options.phoneNumber,
      lastUpdated: new Date()
    }
  });
}

export async function verifySecurityAnswers(userId: string, answers: Record<string, string>) {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  const storedAnswers = userDoc.data()?.security?.recoveryOptions?.securityQuestions;

  // Vérifier les réponses
  const allCorrect = await Promise.all(
    Object.entries(answers).map(async ([question, answer]) => {
      const stored = storedAnswers.find((q: any) => q.question === question);
      if (!stored) return false;
      return await verifyAnswer(answer, stored.answer);
    })
  );

  return allCorrect.every(Boolean);
}

async function hashAnswer(answer: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(answer.toLowerCase().trim());
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyAnswer(provided: string, stored: string): Promise<boolean> {
  const hashedProvided = await hashAnswer(provided);
  return hashedProvided === stored;
}