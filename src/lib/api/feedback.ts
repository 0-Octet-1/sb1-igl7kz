import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Feedback {
  id: string;
  userId: string;
  courseId: string;
  moduleId?: string;
  comment: string;
  type: 'question' | 'suggestion' | 'issue';
  status: 'pending' | 'resolved';
  createdAt: Date;
  updatedAt?: Date;
  replies?: FeedbackReply[];
}

export interface FeedbackReply {
  id: string;
  userId: string;
  comment: string;
  createdAt: Date;
}

export async function submitFeedback(data: Omit<Feedback, 'id' | 'createdAt' | 'status'>) {
  const feedbackRef = await addDoc(collection(db, 'feedback'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return feedbackRef.id;
}

export async function getFeedback(courseId: string, filters?: {
  type?: string;
  status?: string;
  moduleId?: string;
}) {
  let q = query(
    collection(db, 'feedback'),
    where('courseId', '==', courseId),
    orderBy('createdAt', 'desc')
  );

  if (filters?.type) {
    q = query(q, where('type', '==', filters.type));
  }
  if (filters?.status) {
    q = query(q, where('status', '==', filters.status));
  }
  if (filters?.moduleId) {
    q = query(q, where('moduleId', '==', filters.moduleId));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Feedback[];
}

export async function addFeedbackReply(feedbackId: string, reply: Omit<FeedbackReply, 'id' | 'createdAt'>) {
  const replyRef = await addDoc(collection(db, `feedback/${feedbackId}/replies`), {
    ...reply,
    createdAt: serverTimestamp()
  });

  return replyRef.id;
}