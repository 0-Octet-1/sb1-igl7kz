import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export async function generateCertificate(userId: string, courseId: string) {
  const certificateRef = doc(db, 'certificates', `${userId}_${courseId}`);
  
  // Vérifier la progression
  const progressDoc = await getDoc(doc(db, 'userProgress', `${userId}_${courseId}`));
  const progress = progressDoc.data();
  
  if (!progress?.completed) {
    throw new Error('Le cours doit être terminé pour obtenir le certificat');
  }

  // Vérifier les quiz
  const quizQuery = query(
    collection(db, 'quizResults'),
    where('userId', '==', userId),
    where('courseId', '==', courseId)
  );
  const quizResults = await getDocs(quizQuery);
  const allPassed = quizResults.docs.every(doc => doc.data().passed);

  if (!allPassed) {
    throw new Error('Tous les quiz doivent être réussis');
  }

  // Générer le certificat
  await setDoc(certificateRef, {
    userId,
    courseId,
    issuedAt: new Date(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 an
    certificateNumber: generateCertificateNumber()
  });

  return certificateRef.id;
}

function generateCertificateNumber() {
  return `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function verifyCertificate(certificateId: string) {
  const certificateDoc = await getDoc(doc(db, 'certificates', certificateId));
  if (!certificateDoc.exists()) {
    return null;
  }

  const data = certificateDoc.data();
  return {
    ...data,
    isValid: new Date(data.validUntil) > new Date()
  };
}