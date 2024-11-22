import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { registerUser } from '../../lib/auth';
import { Button } from '../ui/Button';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import { usePasswordValidation } from '../../hooks/usePasswordValidation';

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

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password');
  const { isValid: isPasswordValid } = usePasswordValidation(password);

  const onSubmit = async (data: RegisterFormData) => {
    if (!isPasswordValid) {
      toast.error('Le mot de passe ne respecte pas les critères de sécurité');
      return;
    }

    try {
      await registerUser(data.email, data.password, data.displayName);
      toast.success('Inscription réussie');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom d'utilisateur
        </label>
        <input
          type="text"
          {...register('displayName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
        />
        {errors.displayName && (
          <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
        )}
      </div>

      <EmailInput
        register={register}
        error={errors.email?.message}
      />

      <PasswordInput
        register={register}
        name="password"
        label="Mot de passe"
        error={errors.password?.message}
        showStrengthMeter
        value={password}
      />

      <PasswordInput
        register={register}
        name="confirmPassword"
        label="Confirmer le mot de passe"
        error={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="accent"
        className="w-full"
        disabled={isSubmitting || !isPasswordValid}
      >
        {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
      </Button>
    </form>
  );
}