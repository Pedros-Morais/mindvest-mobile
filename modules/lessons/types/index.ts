export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: InvestmentCategory;
  difficulty: DifficultyLevel;
  estimatedTime: number; // em minutos
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
  questions: Question[];
  concepts: Concept[];
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface Concept {
  id: string;
  title: string;
  description: string;
  examples: string[];
  tips: string[];
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
  DRAG_DROP = 'drag_drop',
  SCENARIO = 'scenario'
}

export enum InvestmentCategory {
  FUNDAMENTOS = 'fundamentos',
  ACOES = 'acoes',
  RENDA_FIXA = 'renda_fixa',
  FUNDOS = 'fundos',
  CRIPTOMOEDAS = 'criptomoedas',
  ANALISE_TECNICA = 'analise_tecnica',
  ANALISE_FUNDAMENTALISTA = 'analise_fundamentalista',
  PLANEJAMENTO = 'planejamento',
  IMPOSTOS = 'impostos',
  PSICOLOGIA = 'psicologia'
}

export enum DifficultyLevel {
  INICIANTE = 'iniciante',
  INTERMEDIARIO = 'intermediario',
  AVANCADO = 'avancado'
}

export interface LessonProgress {
  lessonId: string;
  userId: string;
  isCompleted: boolean;
  score: number;
  timeSpent: number;
  attempts: number;
  completedAt?: Date;
  mistakes: string[]; // IDs das questões erradas
}

export interface LessonUnit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  isUnlocked: boolean;
  progress: number; // 0-100
}
