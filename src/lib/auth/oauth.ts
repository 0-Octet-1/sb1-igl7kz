import { auth } from '../firebase';
import { 
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  OAuthProvider
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function signInWithGithub() {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Github:', error);
    throw error;
  }
}

export async function signInWithMicrosoft() {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Microsoft:', error);
    throw error;
  }
}