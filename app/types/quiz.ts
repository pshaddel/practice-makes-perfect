export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text';
  choices?: Choice[];
  duration?: number;
  tags: string[];
  isSingleAnswer?: boolean;
  answers: string[];
  explanation?: string;
}

export interface QuizConfig {
  questions: Question[];
  totalDuration?: number;
}

export interface Answer {
  questionId: string;
  answer: string;
}