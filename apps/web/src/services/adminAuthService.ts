import { api } from '@/lib/api';

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

export class AdminAuthService {
  /**
   * Login admin avec email et mot de passe
   */
  static async loginAdmin(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post('/admin/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Admin login error:', error);
      throw new Error('Invalid credentials');
    }
  }

  /**
   * Vérifier si l'admin est connecté et récupérer ses infos
   */
  static async getAdminMe(): Promise<AdminUser> {
    try {
      const response = await api.get('/admin/me');
      return response.data;
    } catch (error) {
      console.error('Get admin me error:', error);
      throw new Error('Not authenticated');
    }
  }

  /**
   * Logout admin (supprime le cookie côté serveur)
   */
  static async logout(): Promise<void> {
    try {
      // Pour l'instant, on simule le logout en redirigeant
      // Plus tard on pourra ajouter un endpoint de logout
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Vérifier si l'admin est connecté (côté client)
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      await this.getAdminMe();
      return true;
    } catch {
      return false;
    }
  }
}