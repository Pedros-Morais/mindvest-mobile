import { useEffect } from 'react';
import { router } from 'expo-router';
import { AuthService } from '@/modules/auth/services/authService';

export default function RootIndex() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await AuthService.isAuthenticated();
        
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/auth/welcome');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.replace('/auth/welcome');
      }
    };

    checkAuth();
  }, []);

  return null;
}
