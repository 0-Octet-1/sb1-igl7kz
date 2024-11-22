import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { UserCircleIcon, LogoutIcon } from '@heroicons/react/24/outline';

export default function AuthStatus() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/auth/login">
          <Button variant="ghost">Connexion</Button>
        </Link>
        <Link to="/auth/register">
          <Button variant="accent">Inscription</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Link to="/dashboard" className="flex items-center space-x-2 text-sm">
        <UserCircleIcon className="h-6 w-6" />
        <span>{user.displayName}</span>
      </Link>
      <Button
        variant="ghost"
        onClick={() => logoutUser()}
        className="text-sm"
      >
        <LogoutIcon className="h-5 w-5 mr-2" />
        Déconnexion
      </Button>
    </div>
  );
}