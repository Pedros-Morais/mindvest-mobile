export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  xpReward: number;
  condition: AchievementCondition;
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number; // 0-100
}

export enum AchievementCategory {
  APRENDIZADO = 'aprendizado',
  CONSISTENCIA = 'consistencia',
  PERFEICAO = 'perfeicao',
  EXPLORACAO = 'exploracao',
  SOCIAL = 'social',
  TEMPO = 'tempo'
}

export enum AchievementRarity {
  COMUM = 'comum',
  RARO = 'raro',
  EPICO = 'epico',
  LENDARIO = 'lendario'
}

export interface AchievementCondition {
  type: ConditionType;
  target: number;
  current: number;
  metadata?: Record<string, any>;
}

export enum ConditionType {
  LESSONS_COMPLETED = 'lessons_completed',
  PERFECT_SCORES = 'perfect_scores',
  STREAK_DAYS = 'streak_days',
  XP_EARNED = 'xp_earned',
  CATEGORY_MASTERY = 'category_mastery',
  STUDY_TIME = 'study_time',
  CONSECUTIVE_DAYS = 'consecutive_days',
  LEVEL_REACHED = 'level_reached'
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  progress: number;
  isCompleted: boolean;
}
