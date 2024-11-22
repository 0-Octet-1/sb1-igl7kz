import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../lib/auth';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const registerSchema = z.object({
  displayName: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom est trop long'),
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, data.displayName);
      toast.success('Inscription réussie !');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Section gauche avec l'image de fond */}
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Inscription</h2>
            <p className="mt-2 text-primary/60">Créez votre compte pour commencer</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary/80">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                {...register('displayName')}
                className="mt-1 block w-full rounded-md border-gray-600 bg-surface text-primary shadow-sm focus:border-accent focus:ring-accent"
                placeholder="John Doe"
              />
              {errors.displayName && (
                <p className="mt-1 text-sm text-red-500">{errors.displayName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80">
                Email
              </label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-600 bg-surface text-primary shadow-sm focus:border-accent focus:ring-accent"
                placeholder="vous@exemple.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80">
                Mot de passe
              </label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 block w-full rounded-md border-gray-600 bg-surface text-primary shadow-sm focus:border-accent focus:ring-accent"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="mt-1 block w-full rounded-md border-gray-600 bg-surface text-primary shadow-sm focus:border-accent focus:ring-accent"
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" variant="accent" className="w-full">
              S'inscrire
            </Button>
          </form>

          <p className="mt-4 text-center text-primary/60">
            Déjà un compte ?{' '}
            <Link to="/auth/login" className="text-accent hover:text-accent-hover">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}