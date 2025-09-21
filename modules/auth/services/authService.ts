import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '@/modules/user/types';

export interface AuthUser extends User {
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = '@mindvest_auth';
const USER_STORAGE_KEY = '@mindvest_user';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthUser> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Validação simples
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }
    
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }
    
    // Criar usuário mock
    const user: AuthUser = {
      id: Date.now().toString(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      level: 1,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      joinedAt: new Date(),
      lastActiveAt: new Date(),
      preferences: {
        language: 'pt-BR',
        notifications: {
          dailyReminder: true,
          streakReminder: true,
          achievementUnlocked: true,
          lessonCompleted: true,
          weeklyProgress: true
        },
        dailyGoal: 100,
        reminderTime: '19:00',
        theme: 'light'
      },
      stats: {
        totalLessonsCompleted: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        favoriteCategory: 'fundamentos',
        weeklyXP: 0,
        monthlyXP: 0,
        perfectScores: 0,
        currentLevelProgress: 0
      },
      createdAt: new Date().toISOString(),
    };
    
    // Salvar no AsyncStorage
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'true');
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    
    return user;
  }
  
  static async register(name: string, email: string, password: string): Promise<AuthUser> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validação
    if (!name || !email || !password) {
      throw new Error('Todos os campos são obrigatórios');
    }
    
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }
    
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }
    
    // Criar usuário
    const user: AuthUser = {
      id: Date.now().toString(),
      name,
      email,
      level: 1,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      joinedAt: new Date(),
      lastActiveAt: new Date(),
      preferences: {
        language: 'pt-BR',
        notifications: {
          dailyReminder: true,
          streakReminder: true,
          achievementUnlocked: true,
          lessonCompleted: true,
          weeklyProgress: true
        },
        dailyGoal: 100,
        reminderTime: '19:00',
        theme: 'light'
      },
      stats: {
        totalLessonsCompleted: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        favoriteCategory: 'fundamentos',
        weeklyXP: 0,
        monthlyXP: 0,
        perfectScores: 0,
        currentLevelProgress: 0
      },
      createdAt: new Date().toISOString(),
    };
    
    // Salvar no AsyncStorage
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'true');
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    
    return user;
  }
  
  static async logout(): Promise<void> {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }
  
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const isAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (!isAuth) return null;
      
      const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!userJson) return null;
      
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      return null;
    }
  }
  
  static async isAuthenticated(): Promise<boolean> {
    try {
      const isAuth = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      return isAuth === 'true';
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      return false;
    }
  }
  
  static async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, USER_STORAGE_KEY]);
  }

  static async forceLogout(): Promise<void> {
    await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, USER_STORAGE_KEY]);
  }
}
