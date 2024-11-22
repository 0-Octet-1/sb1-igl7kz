import React from 'react';
import { checkPasswordStrength } from '../../lib/security/validation';

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, feedback } = checkPasswordStrength(password);
  
  const getStrengthColor = () => {
    if (score >= 6) return 'bg-green-500';
    if (score >= 4) return 'bg-yellow-500';
    if (score >= 2) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStrengthLabel = () => {
    if (score >= 6) return 'Fort';
    if (score >= 4) return 'Moyen';
    if (score >= 2) return 'Faible';
    return 'Très faible';
  };

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getStrengthColor()} transition-all duration-300`}
            style={{ width: `${(score / 8) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{getStrengthLabel()}</span>
      </div>
      
      {feedback.length > 0 && (
        <ul className="text-sm text-gray-600 space-y-1">
          {feedback.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">•</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}