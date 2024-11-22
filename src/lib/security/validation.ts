import { z } from 'zod';

// Schémas de validation pour l'authentification
export const passwordSchema = z.string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial');

export const emailSchema = z.string()
  .email('Adresse email invalide')
  .min(5, 'L\'email est trop court')
  .max(100, 'L\'email est trop long');

export const displayNameSchema = z.string()
  .min(2, 'Le nom doit contenir au moins 2 caractères')
  .max(50, 'Le nom est trop long')
  .regex(/^[a-zA-Z0-9\s-_]+$/, 'Le nom ne peut contenir que des lettres, chiffres, espaces, tirets et underscores');

// Rate limiting
const rateLimits = new Map<string, { count: number; timestamp: number }>();

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const userLimit = rateLimits.get(key);

  if (!userLimit) {
    rateLimits.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (now - userLimit.timestamp > windowMs) {
    rateLimits.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count += 1;
  rateLimits.set(key, userLimit);
  return true;
}

// Validation des entrées utilisateur
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Vérification de la force du mot de passe
export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // Longueur
  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;
  else feedback.push('Le mot de passe est trop court');

  // Complexité
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Ajoutez une majuscule');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Ajoutez une minuscule');
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Ajoutez un chiffre');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('Ajoutez un caractère spécial');

  // Variété des caractères
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= 8) score += 2;
  else if (uniqueChars >= 6) score += 1;
  else feedback.push('Utilisez plus de caractères différents');

  return { score, feedback };
}