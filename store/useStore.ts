import { create } from 'zustand';
import { User, UserProgress, DailyGoal } from '@/modules/user/types';
import { Lesson, LessonUnit, LessonProgress } from '@/modules/lessons/types';
import { Achievement, UserAchievement } from '@/modules/achievements/types';
import { ProgressData, StudySession } from '@/modules/progress/types';

interface AppState {
  // User
  user: User | null;
  userProgress: UserProgress | null;
  dailyGoal: DailyGoal | null;
  
  // Lessons
  currentLesson: Lesson | null;
  lessonUnits: LessonUnit[];
  lessonProgress: Record<string, LessonProgress>;
  
  // Achievements
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  
  // Progress
  progressData: ProgressData | null;
  studySessions: StudySession[];
  
  // UI State
  isLoading: boolean;
  currentScreen: string;
  
  // Actions
  setUser: (user: User) => void;
  clearUser: () => void;
  setUserProgress: (progress: UserProgress) => void;
  setDailyGoal: (goal: DailyGoal) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setLessonUnits: (units: LessonUnit[]) => void;
  updateLessonProgress: (lessonId: string, progress: LessonProgress) => void;
  setAchievements: (achievements: Achievement[]) => void;
  unlockAchievement: (achievementId: string) => void;
  setProgressData: (data: ProgressData) => void;
  addStudySession: (session: StudySession) => void;
  setLoading: (loading: boolean) => void;
  setCurrentScreen: (screen: string) => void;
  
  // Computed
  getCurrentStreak: () => number;
  getTotalXP: () => number;
  getCompletedLessonsCount: () => number;
  getUnlockedAchievementsCount: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  userProgress: null,
  dailyGoal: null,
  currentLesson: null,
  lessonUnits: [],
  lessonProgress: {},
  achievements: [],
  userAchievements: [],
  progressData: null,
  studySessions: [],
  isLoading: false,
  currentScreen: 'home',
  
  // Actions
  setUser: (user) => set({ user }),
  clearUser: () => set({ 
    user: null, 
    userProgress: null, 
    dailyGoal: null,
    lessonProgress: {},
    userAchievements: [],
    progressData: null,
    studySessions: []
  }),
  
  setUserProgress: (progress) => set({ userProgress: progress }),
  setDailyGoal: (goal) => set({ dailyGoal: goal }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  setLessonUnits: (units) => set({ lessonUnits: units }),
  
  updateLessonProgress: (lessonId, progress) => set((state) => ({
    lessonProgress: {
      ...state.lessonProgress,
      [lessonId]: progress
    }
  })),
  
  setAchievements: (achievements) => set({ achievements }),
  
  unlockAchievement: (achievementId) => set((state) => {
    const achievement = state.achievements.find(a => a.id === achievementId);
    if (!achievement || state.userAchievements.some(ua => ua.achievementId === achievementId)) {
      return state;
    }
    
    const newUserAchievement: UserAchievement = {
      userId: state.user?.id || '',
      achievementId,
      unlockedAt: new Date(),
      progress: 100,
      isCompleted: true
    };
    
    return {
      userAchievements: [...state.userAchievements, newUserAchievement]
    };
  }),
  
  setProgressData: (data) => set({ progressData: data }),
  addStudySession: (session) => set((state) => ({
    studySessions: [...state.studySessions, session]
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  
  // Computed getters
  getCurrentStreak: () => {
    const { user } = get();
    return user?.currentStreak || 0;
  },
  
  getTotalXP: () => {
    const { user } = get();
    return user?.totalXP || 0;
  },
  
  getCompletedLessonsCount: () => {
    const { lessonProgress } = get();
    return Object.values(lessonProgress).filter(p => p.isCompleted).length;
  },
  
  getUnlockedAchievementsCount: () => {
    const { userAchievements } = get();
    return userAchievements.filter(ua => ua.isCompleted).length;
  }
}));

// Legacy export for backward compatibility
export const useUserStore = useAppStore;