import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { UseFormRegister } from 'react-hook-form';
import PasswordStrengthMeter from './PasswordStrengthMeter';

interface PasswordInputProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  error?: string;
  showStrengthMeter?: boolean;
  value?: string;
}

export default function PasswordInput({
  register,
  name,
  label,
  error,
  showStrengthMeter = false,
  value = ''
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        <input
          type={showPassword ? 'text' : 'password'}
          {...register(name)}
          className={`block w-full rounded-md shadow-sm
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-accent focus:ring-accent'
            }
          `}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {showStrengthMeter && value && (
        <PasswordStrengthMeter password={value} />
      )}
    </div>
  );
}