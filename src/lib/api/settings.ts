import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AdminSettings } from '../../types/admin';

export async function fetchSettings(): Promise<AdminSettings> {
  try {
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as AdminSettings;
    }
    
    // Return default settings if none exist
    return {
      maintenanceMode: false,
      registrationEnabled: true,
      maxUsersPerCourse: 50,
      languages: ['fr', 'en'],
      defaultLanguage: 'fr',
      emailNotifications: {
        newUser: true,
        newCourse: true,
        userProgress: true
      },
      socialLinks: {}
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
}

export async function updateSettings(settings: AdminSettings): Promise<void> {
  try {
    const docRef = doc(db, 'settings', 'site');
    await setDoc(docRef, settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}