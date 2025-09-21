export interface ProgressData {
  userId: string;
  totalXP: number;
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  studyStreak: number;
  weeklyProgress: WeeklyProgress;
  monthlyProgress: MonthlyProgress;
}

export interface WeeklyProgress {
  week: string; // YYYY-WW
  dailyXP: number[];
  totalXP: number;
  lessonsCompleted: number;
  averageScore: number;
  studyDays: number;
}

export interface MonthlyProgress {
  month: string; // YYYY-MM
  totalXP: number;
  lessonsCompleted: number;
  averageScore: number;
  studyDays: number;
  categoriesStudied: string[];
}

export interface LevelSystem {
  level: number;
  title: string;
  minXP: number;
  maxXP: number;
  rewards: LevelReward[];
  icon: string;
  color: string;
}

export interface LevelReward {
  type: RewardType;
  value: string | number;
  description: string;
}

export enum RewardType {
  ACHIEVEMENT = 'achievement',
  FEATURE_UNLOCK = 'feature_unlock',
  COSMETIC = 'cosmetic',
  BONUS_XP = 'bonus_xp'
}

export interface StudySession {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  lessonsCompleted: string[];
  xpEarned: number;
  averageScore: number;
  totalQuestions: number;
  correctAnswers: number;
}
