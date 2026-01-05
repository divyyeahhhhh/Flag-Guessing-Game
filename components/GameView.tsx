
import React, { useState, useEffect } from 'react';
import { GameState, Question, Country } from '../types';

interface Props {
  gameState: GameState;
  currentQuestion: Question;
  onAnswer: (code: string) => void;
}

const GameView: React.FC<Props> = ({ gameState, currentQuestion, onAnswer }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Reset local state for new questions
  useEffect(() => {
    setSelected(null);
    setShowFeedback(false);
  }, [gameState.currentQuestionIndex]);

  const handleSelect = (code: string) => {
    if (selected) return;
    setSelected(code);
    setShowFeedback(true);
    
    // Brief delay before moving to next
    setTimeout(() => {
      onAnswer(code);
    }, 1500);
  };

  const isCorrect = selected === currentQuestion.correctAnswer.code;

  return (
    <div className="max-w-2xl w-full space-y-8 animate-fadeIn">
      {/* Top HUD */}
      <div className="flex justify-between items-center text-slate-400 font-semibold tracking-widest text-sm bg-slate-800/40 p-4 rounded-2xl backdrop-blur-sm border border-slate-700/50">
        <div>
          QUESTION <span className="text-emerald-400">{gameState.currentQuestionIndex + 1}</span> / {gameState.totalQuestions}
        </div>
        {gameState.timerEnabled && (
          <div className={`transition-colors duration-300 ${gameState.timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
            00:{gameState.timeLeft.toString().padStart(2, '0')}
          </div>
        )}
        <div>
          SCORE <span className="text-emerald-400">{gameState.score}</span>
        </div>
      </div>

      {/* Main Clue Card */}
      <div className="bg-slate-800/60 border-2 border-slate-700 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-700/30">
          <div 
            className="h-full bg-emerald-500 transition-all duration-1000"
            style={{ width: `${(gameState.timeLeft / 15) * 100}%` }}
          />
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="text-slate-400 text-sm uppercase tracking-[0.3em] font-medium">IDENTIFY THE TERRITORY</div>
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-xl rounded-full opacity-50"></div>
            <img 
              src={`https://flagcdn.com/w320/${currentQuestion.correctAnswer.code.toLowerCase()}.png`}
              alt="Visual Clue"
              className="w-48 md:w-64 h-auto shadow-2xl rounded-lg border-4 border-slate-700 relative z-10 transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="text-center space-y-1">
             <p className="text-slate-300 italic text-sm">Region: {currentQuestion.correctAnswer.region}</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option) => {
          let btnStyle = "bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300";
          
          if (showFeedback) {
            if (option.code === currentQuestion.correctAnswer.code) {
              btnStyle = "bg-emerald-600/90 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]";
            } else if (selected === option.code) {
              btnStyle = "bg-red-600/90 border-red-400 text-white";
            } else {
              btnStyle = "bg-slate-800/40 border-slate-700 text-slate-500 opacity-50";
            }
          }

          return (
            <button
              key={option.code}
              disabled={!!selected}
              onClick={() => handleSelect(option.code)}
              className={`py-5 px-8 rounded-2xl border-2 font-bold text-lg tracking-wide transition-all duration-300 transform active:scale-95 text-center ${btnStyle}`}
            >
              {option.name}
              {showFeedback && option.code === currentQuestion.correctAnswer.code && (
                <span className="ml-3">✓</span>
              )}
              {showFeedback && selected === option.code && option.code !== currentQuestion.correctAnswer.code && (
                <span className="ml-3">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Fun Fact Display (Only when feedback is shown) */}
      {showFeedback && gameState.history[gameState.currentQuestionIndex]?.fact && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-bounceIn">
          <p className="text-emerald-400 text-sm italic text-center">
            "{gameState.history[gameState.currentQuestionIndex].fact}"
          </p>
        </div>
      )}
    </div>
  );
};

export default GameView;
