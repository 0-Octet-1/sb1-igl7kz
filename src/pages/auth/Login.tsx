import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../lib/auth';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const user = await loginUser(data.email, data.password);
      if (user) {
        // Rediriger vers le tableau de bord approprié
        const userDoc = await getUserProfile(user.uid);
        if (userDoc?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      toast.error('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Section gauche avec l'image de fond et le logo */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-[url('/images/m2000c-cockpit.jpg')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/40" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src="/logo-aiglons.png"
            alt="Les Aiglons de Coureau"
            className="w-32 h-32 mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-white text-center"
          >
            Les Aiglons de Coureau
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-gray-300 text-center max-w-md"
          >
            Plateforme de formation DCS M2000C
          </motion.p>
        </div>
      </div>

      {/* Section droite avec le formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="mt-2 text-gray-600">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent bg-white"
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent bg-white"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>
              <Link
                to="/auth/reset-password"
                className="text-sm font-medium text-accent hover:text-accent-hover"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              variant="accent"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-900 hover:text-accent transition-colors"
            >
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}