import { useState, useEffect } from 'react';
import { checkPasswordStrength } from '../lib/security/validation';

export function usePasswordValidation(password: string) {
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setValidLength(password.length >= 8);
    setHasNumber(/\d/.test(password));
    setHasUpperCase(/[A-Z]/.test(password));
    setHasLowerCase(/[a-z]/.test(password));
    setHasSpecialChar(/[^A-Za-z0-9]/.test(password));
    
    const { score } = checkPasswordStrength(password);
    setScore(score);
  }, [password]);

  return {
    validLength,
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
    score,
    isValid: validLength && hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar
  };
}