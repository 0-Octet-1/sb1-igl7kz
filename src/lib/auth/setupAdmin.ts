import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { DEFAULT_ADMIN, ROLES } from '../../config/auth';
import { toast } from 'react-hot-toast';

export async function setupDefaultAdmin() {
  try {
    // Vérifier si l'admin existe déjà dans Firestore
    const adminQuery = await getDoc(doc(db, 'users', 'admin'));
    
    if (adminQuery.exists()) {
      console.log('Compte admin déjà configuré');
      return;
    }

    try {
      // Essayer de se connecter avec les identifiants admin
      await signInWithEmailAndPassword(auth, DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
      console.log('Compte admin existant');
      return;
    } catch (loginError) {
      // Si la connexion échoue avec auth/user-not-found, créer le compte
      if ((loginError as any)?.code === 'auth/user-not-found') {
        // Créer le compte admin
        const { user } = await createUserWithEmailAndPassword(
          auth,
          DEFAULT_ADMIN.email,
          DEFAULT_ADMIN.password
        );

        // Créer le profil admin dans Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: DEFAULT_ADMIN.email,
          displayName: DEFAULT_ADMIN.displayName,
          role: ROLES.ADMIN,
          status: 'active',
          createdAt: new Date(),
          lastLogin: new Date(),
          preferences: {
            language: 'fr',
            notifications: true
          }
        });

        console.log('Compte administrateur créé avec succès');
      } else {
        // Si l'erreur n'est pas auth/user-not-found, la propager
        throw loginError;
      }
    }
  } catch (error: any) {
    // Ne pas afficher de toast d'erreur si le compte existe déjà
    if (error.code !== 'auth/email-already-in-use') {
      console.error('Erreur lors de la configuration du compte admin:', error);
      toast.error('Erreur lors de la configuration du compte admin');
    }
  }
}