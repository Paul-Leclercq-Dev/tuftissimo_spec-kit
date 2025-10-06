import axios from 'axios';

// Configuration de base de l'API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003';

// Instance Axios configurée pour les cookies HttpOnly
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Permet l'envoi des cookies HttpOnly
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes de timeout
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data);
    
    // Gestion des erreurs globales
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion si non authentifié
      // Le cookie HttpOnly sera automatiquement supprimé par le serveur
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Types de base pour l'API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  statusCode: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// Hook pour gérer les erreurs
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Une erreur inattendue s\'est produite';
};