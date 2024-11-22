import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../lib/auth';
import { Button } from '../../components/ui/Button';

const resetSchema = z.object({
  email: z.string().email('Email invalide')
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema)
  });

  const onSubmit = async (data: ResetFormData) => {
    try {
      await resetPassword(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Email Envoyé</h1>
          <p className="text-gray-600 mb-6">
            Si un compte existe avec cette adresse email, vous recevrez un lien pour réinitialiser votre mot de passe.
          </p>
          <Link to="/auth/login">
            <Button variant="accent">Retour à la connexion</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Réinitialiser le mot de passe</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" variant="accent" className="w-full">
            Envoyer le lien de réinitialisation
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link to="/auth/login" className="text-accent hover:text-accent/80">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}