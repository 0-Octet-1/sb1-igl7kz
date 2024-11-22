import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginUser } from '../../lib/auth';
import { Button } from '../ui/Button';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe invalide'),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data.email, data.password);
      toast.success('Connexion réussie');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <EmailInput
        register={register}
        error={errors.email?.message}
      />

      <PasswordInput
        register={register}
        name="password"
        label="Mot de passe"
        error={errors.password?.message}
      />

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

        <div className="text-sm">
          <Link
            to="/auth/reset-password"
            className="font-medium text-accent hover:text-accent-hover"
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="accent"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </Button>
    </form>
  );
}