import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Content, ContentFilter } from '../../types/content';
import { slugify } from '../utils';

export async function fetchContent(filters: ContentFilter = {}) {
  try {
    let q = collection(db, 'content');

    // Appliquer les filtres
    if (filters.type) {
      q = query(q, where('type', '==', filters.type));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.author) {
      q = query(q, where('author', '==', filters.author));
    }
    if (filters.tag) {
      q = query(q, where('tags', 'array-contains', filters.tag));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Content[];
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
}

export async function createContent(data: Partial<Content>) {
  try {
    const slug = slugify(data.title!);
    const docRef = await addDoc(collection(db, 'content'), {
      ...data,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
}

export async function updateContent(id: string, data: Partial<Content>) {
  try {
    const contentRef = doc(db, 'content', id);
    await updateDoc(contentRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
}

export async function deleteContent(id: string) {
  try {
    await deleteDoc(doc(db, 'content', id));
  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
}

export async function publishContent(id: string) {
  try {
    const contentRef = doc(db, 'content', id);
    await updateDoc(contentRef, {
      status: 'published',
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error publishing content:', error);
    throw error;
  }
}