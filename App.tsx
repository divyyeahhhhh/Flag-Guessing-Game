import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, GameStatus, GameState, Country, Question } from './types';
import { COUNTRIES, QUESTIONS_COUNT, TIMER_DURATION } from './constants';
import { fetchFunFact } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameView from './components/GameView';
import GameOver from './components/GameOver';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.START,
    difficulty: Difficulty.EASY,
    score: 0,
    currentQuestionIndex: 0,
    totalQuestions: QUESTIONS_COUNT,
    timerEnabled: true,
    timeLeft: TIMER_DURATION,
    history: [],
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  // Fix: Use number type for browser-based timer reference to avoid NodeJS namespace issues
  const timerRef = useRef<number | null>(null);

  const generateQuestions = (diff: Difficulty) => {
    const pool = COUNTRIES.filter(c => c.difficulty === diff || (diff === Difficulty.HARD ? true : false));
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    const selectedCountries = shuffledPool.slice(0, QUESTIONS_COUNT);

    const generated = selectedCountries.map(correct => {
      const others = pool.filter(c => c.code !== correct.code)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      return {
        correctAnswer: correct,
        options: [...others, correct].sort(() => Math.random() - 0.5),
      };
    });
    setQuestions(generated);
  };

  const startGame = (difficulty: Difficulty, timerEnabled: boolean) => {
    generateQuestions(difficulty);
    setGameState({
      ...gameState,
      status: GameStatus.PLAYING,
      difficulty,
      timerEnabled,
      score: 0,
      currentQuestionIndex: 0,
      timeLeft: TIMER_DURATION,
      history: [],
    });
  };

  const resetGame = () => {
    setGameState(prev => ({ ...prev, status: GameStatus.START }));
  };

  const handleAnswer = async (selectedCode: string) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const currentQuestion = questions[gameState.currentQuestionIndex];
    const isCorrect = selectedCode === currentQuestion.correctAnswer.code;
    
    // Fetch fact asynchronously in background
    const fact = await fetchFunFact(currentQuestion.correctAnswer.name);

    setGameState(prev => {
      const newScore = isCorrect ? prev.score + 100 : prev.score;
      const isLast = prev.currentQuestionIndex === QUESTIONS_COUNT - 1;
      
      const newHistory = [...prev.history, {
        question: currentQuestion,
        selected: selectedCode,
        isCorrect,
        fact
      }];

      if (isLast) {
        return {
          ...prev,
          status: GameStatus.FINISHED,
          score: newScore,
          history: newHistory,
        };
      }

      return {
        ...prev,
        score: newScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeLeft: TIMER_DURATION,
        history: newHistory,
      };
    });
  };

  const skipQuestion = useCallback(() => {
    handleAnswer(""); // Empty string means timed out/incorrect
  }, [gameState.currentQuestionIndex]);

  useEffect(() => {
    if (gameState.status === GameStatus.PLAYING && gameState.timerEnabled) {
      // Fix: Use window.setInterval to ensure it returns a number in browser environments
      timerRef.current = window.setInterval(() => {
        setGameState(prev => {
          if (prev.timeLeft <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return { ...prev, timeLeft: 0 };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.status, gameState.currentQuestionIndex, gameState.timerEnabled]);

  // Handle timeout
  useEffect(() => {
    if (gameState.timeLeft === 0 && gameState.status === GameStatus.PLAYING) {
      skipQuestion();
    }
  }, [gameState.timeLeft, gameState.status, skipQuestion]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {gameState.status === GameStatus.START && (
        <StartScreen onStart={startGame} />
      )}
      
      {gameState.status === GameStatus.PLAYING && questions[gameState.currentQuestionIndex] && (
        <GameView 
          gameState={gameState} 
          currentQuestion={questions[gameState.currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}

      {gameState.status === GameStatus.FINISHED && (
        <GameOver 
          gameState={gameState} 
          onRestart={resetGame} 
        />
      )}
    </div>
  );
};

export default App;