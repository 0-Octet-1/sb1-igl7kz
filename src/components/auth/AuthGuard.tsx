import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error('Veuillez vous connecter pour accéder à cette page');
        navigate('/auth/login');
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        toast.error('Vous n\'avez pas les permissions nécessaires');
        navigate('/');
        return;
      }

      // Vérifier le statut du compte
      if (user.status === 'suspended' || user.status === 'banned') {
        toast.error('Votre compte a été désactivé');
        navigate('/');
        return;
      }
    }
  }, [user, loading, requiredRole, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return <>{children}</>;
}