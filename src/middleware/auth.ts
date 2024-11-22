import { getAuth } from 'firebase/auth';
import { checkPermission } from '../lib/security';

export async function requireAuth(to: any, from: any, next: any) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return next({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    });
  }

  return next();
}

export async function requireAdmin(to: any, from: any, next: any) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return next({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    });
  }

  const isAdmin = await checkPermission(user.uid, 'admin');
  if (!isAdmin) {
    return next({ path: '/' });
  }

  return next();
}