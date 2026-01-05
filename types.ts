
export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export enum GameStatus {
  START = 'START',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  region: string;
  difficulty: Difficulty;
}

export interface Question {
  correctAnswer: Country;
  options: Country[];
}

export interface GameState {
  status: GameStatus;
  difficulty: Difficulty;
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  timerEnabled: boolean;
  timeLeft: number;
  history: {
    question: Question;
    selected: string;
    isCorrect: boolean;
    fact?: string;
  }[];
}
