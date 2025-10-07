/**
 * Test de la configuration des cookies HttpOnly
 * Ce fichier peut être utilisé pour tester l'authentification avec cookies
 */

import { AuthService } from '@/services/authService';
import { api } from '@/lib/api';

// Test des cookies HttpOnly en développement
export const testHttpOnlyCookies = async () => {
  console.log('🔐 Test des cookies HttpOnly...');
  
  try {
    // Test 1: Login
    console.log('1. Test de connexion...');
    const loginResponse = await AuthService.login('test@example.com', 'password');
    console.log('✅ Connexion réussie:', loginResponse);
    
    // Test 2: Requête authentifiée (le cookie sera automatiquement envoyé)
    console.log('2. Test de requête authentifiée...');
    const user = await AuthService.getCurrentUser();
    console.log('✅ Utilisateur récupéré:', user);
    
    // Test 3: Vérification que le token n'est pas accessible en JavaScript
    console.log('3. Vérification de la sécurité...');
    const cookieValue = document.cookie.split(';').find(c => c.trim().startsWith('access_token='));
    if (!cookieValue) {
      console.log('✅ Cookie HttpOnly sécurisé - Non accessible via JavaScript');
    } else {
      console.warn('⚠️ Cookie accessible via JavaScript - Problème de sécurité');
    }
    
    // Test 4: Logout
    console.log('4. Test de déconnexion...');
    await AuthService.logout();
    console.log('✅ Déconnexion réussie - Cookie supprimé');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
};

// Helper pour debugger les cookies en développement
export const debugCookies = () => {
  console.log('🍪 Cookies disponibles via document.cookie:');
  console.log(document.cookie || 'Aucun cookie accessible');
  
  console.log('🔒 Note: Les cookies HttpOnly ne sont pas visibles ici (c\'est normal et sécurisé)');
};