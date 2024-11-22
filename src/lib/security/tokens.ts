import { jwtDecode } from 'jwt-decode';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_JWT_SECRET || 'default-secret-key';
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
}

// Gestion des tokens
export function setTokens(accessToken: string, refreshToken: string) {
  const encryptedAccess = CryptoJS.AES.encrypt(accessToken, SECRET_KEY).toString();
  const encryptedRefresh = CryptoJS.AES.encrypt(refreshToken, SECRET_KEY).toString();
  
  localStorage.setItem(TOKEN_KEY, encryptedAccess);
  localStorage.setItem(REFRESH_TOKEN_KEY, encryptedRefresh);
}

export function getAccessToken(): string | null {
  const encrypted = localStorage.getItem(TOKEN_KEY);
  if (!encrypted) return null;
  
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  const encrypted = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!encrypted) return null;
  
  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch {
    return null;
  }
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// Validation des tokens
export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function getTokenPayload(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}