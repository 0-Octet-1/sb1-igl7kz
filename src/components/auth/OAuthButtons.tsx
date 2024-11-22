import React from 'react';
import { signInWithGoogle, signInWithGithub, signInWithMicrosoft } from '../../lib/auth/oauth';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';

export default function OAuthButtons() {
  const handleOAuthSignIn = async (provider: 'google' | 'github' | 'microsoft') => {
    try {
      const signInMethod = {
        google: signInWithGoogle,
        github: signInWithGithub,
        microsoft: signInWithMicrosoft
      }[provider];

      await signInMethod();
      toast.success('Connexion réussie');
    } catch (error) {
      toast.error('Erreur de connexion');
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn('google')}
      >
        Continuer avec Google
      </Button>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn('github')}
      >
        Continuer avec Github
      </Button>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthSignIn('microsoft')}
      >
        Continuer avec Microsoft
      </Button>
    </div>
  );
}