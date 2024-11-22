import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface EmailInputProps {
  register: UseFormRegister<any>;
  error?: string;
}

export default function EmailInput({ register, error }: EmailInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        {...register('email')}
        className={`mt-1 block w-full rounded-md shadow-sm
          ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-accent focus:ring-accent'
          }
        `}
        placeholder="vous@exemple.com"
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}