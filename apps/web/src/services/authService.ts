import { api } from '@/lib/api';
import { User, SignupDto } from '@/types/api';

export interface AdminUser {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user?: AdminUser;
}

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await api.post('/user/login', { email, password });
      // Le token JWT est automatiquement stocké dans un cookie HttpOnly par le serveur
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Failed to login');
    }
  }

  static async signup(userData: SignupDto): Promise<SignupResponse> {
    try {
      const response = await api.post('/user/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error('Failed to signup');
    }
  }

  static async logout(): Promise<void> {
    try {
      await api.post('/user/logout');
      // Le cookie HttpOnly sera automatiquement supprimé par le serveur
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Failed to logout');
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/user/me');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      throw new Error('Failed to get current user');
    }
  }
}
