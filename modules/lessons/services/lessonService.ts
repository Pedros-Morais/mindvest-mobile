import { Lesson, LessonUnit, LessonProgress, Question } from '../types';
import fundamentos from '@/data/lessons/fundamentos.json';

export class LessonService {
  static async getLessonUnits(): Promise<LessonUnit[]> {
    // In a real app, this would fetch from an API
    const units: LessonUnit[] = [
      {
        ...fundamentos.unit,
        lessons: fundamentos.lessons.map(lesson => ({
          ...lesson,
          category: lesson.category as any,
          difficulty: lesson.difficulty as any,
          questions: lesson.questions.map(q => ({
            ...q,
            type: q.type as any
          }))
        }))
      }
    ];
    
    return units;
  }

  static async getLesson(lessonId: string): Promise<Lesson | null> {
    const units = await this.getLessonUnits();
    for (const unit of units) {
      const lesson = unit.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  }

  static async getLessonQuestions(lessonId: string): Promise<Question[]> {
    const lesson = await this.getLesson(lessonId);
    return lesson?.questions || [];
  }

  static calculateScore(correctAnswers: number, totalQuestions: number): number {
    return Math.round((correctAnswers / totalQuestions) * 100);
  }

  static calculateXP(score: number, baseXP: number): number {
    const multiplier = score >= 100 ? 1.5 : score >= 80 ? 1.2 : score >= 60 ? 1.0 : 0.8;
    return Math.round(baseXP * multiplier);
  }

  static async saveLessonProgress(progress: LessonProgress): Promise<void> {
    // In a real app, this would save to an API or local storage
    console.log('Saving lesson progress:', progress);
  }

  static async getUserLessonProgress(userId: string, lessonId: string): Promise<LessonProgress | null> {
    // In a real app, this would fetch from an API or local storage
    return null;
  }

  static shouldUnlockNextLesson(currentLessonProgress: LessonProgress): boolean {
    return currentLessonProgress.isCompleted && currentLessonProgress.score >= 60;
  }

  static getNextLesson(currentLessonId: string, units: LessonUnit[]): Lesson | null {
    for (const unit of units) {
      const currentIndex = unit.lessons.findIndex(l => l.id === currentLessonId);
      if (currentIndex !== -1) {
        // Next lesson in same unit
        if (currentIndex < unit.lessons.length - 1) {
          return unit.lessons[currentIndex + 1];
        }
        // First lesson of next unit
        const unitIndex = units.findIndex(u => u.id === unit.id);
        if (unitIndex < units.length - 1) {
          const nextUnit = units[unitIndex + 1];
          return nextUnit.lessons[0] || null;
        }
      }
    }
    return null;
  }

  static getRecommendedLessons(userProgress: any, units: LessonUnit[]): Lesson[] {
    const recommended: Lesson[] = [];
    
    for (const unit of units) {
      if (!unit.isUnlocked) continue;
      
      for (const lesson of unit.lessons) {
        if (!lesson.isCompleted && !lesson.isLocked) {
          recommended.push(lesson);
          if (recommended.length >= 3) break;
        }
      }
      if (recommended.length >= 3) break;
    }
    
    return recommended;
  }
}
