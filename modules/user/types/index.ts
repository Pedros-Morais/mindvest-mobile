export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  joinedAt: Date;
  lastActiveAt: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  language: 'pt-BR';
  notifications: NotificationSettings;
  dailyGoal: number; // XP por dia
  reminderTime: string; // HH:MM
  theme: 'light' | 'dark' | 'auto';
}

export interface NotificationSettings {
  dailyReminder: boolean;
  streakReminder: boolean;
  achievementUnlocked: boolean;
  lessonCompleted: boolean;
  weeklyProgress: boolean;
}

export interface UserStats {
  totalLessonsCompleted: number;
  totalTimeSpent: number; // em minutos
  averageScore: number;
  favoriteCategory: string;
  weeklyXP: number;
  monthlyXP: number;
  perfectScores: number;
  currentLevelProgress: number; // 0-100
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  unlockedUnits: string[];
  currentUnit: string;
  dailyXP: number;
  weeklyXP: number;
  monthlyXP: number;
  lastStudyDate: Date;
}

export interface DailyGoal {
  userId: string;
  date: string; // YYYY-MM-DD
  targetXP: number;
  earnedXP: number;
  isCompleted: boolean;
  streak: number;
}
