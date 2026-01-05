
import React from 'react';
import { GameState } from '../types';

interface Props {
  gameState: GameState;
  onRestart: () => void;
}

const GameOver: React.FC<Props> = ({ gameState, onRestart }) => {
  const correctCount = gameState.history.filter(h => h.isCorrect).length;
  const percentage = (correctCount / gameState.totalQuestions) * 100;

  let rank = "Novice Explorer";
  let color = "text-slate-400";
  if (percentage >= 90) { rank = "Legendary Cartographer"; color = "text-yellow-400"; }
  else if (percentage >= 70) { rank = "Elite Wayfinder"; color = "text-emerald-400"; }
  else if (percentage >= 50) { rank = "Global Traveler"; color = "text-blue-400"; }

  return (
    <div className="max-w-2xl w-full space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-cinzel font-bold text-white uppercase tracking-wider">Expedition Complete</h2>
        <div className={`text-2xl font-semibold tracking-widest ${color}`}>{rank}</div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-2 gap-8 text-center mb-10">
          <div className="space-y-1">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Final Score</p>
            <p className="text-4xl font-bold text-white">{gameState.score}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Accuracy</p>
            <p className="text-4xl font-bold text-white">{percentage}%</p>
          </div>
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {gameState.history.map((h, i) => (
            <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${h.isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
              <div className="flex items-center gap-4">
                <img 
                  src={`https://flagcdn.com/w40/${h.question.correctAnswer.code.toLowerCase()}.png`} 
                  alt="" 
                  className="w-8 h-auto rounded shadow-sm border border-slate-700"
                />
                <span className="font-semibold text-slate-300">{h.question.correctAnswer.name}</span>
              </div>
              <span className={`text-xl ${h.isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                {h.isCorrect ? '✓' : '✗'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-2xl rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl"
      >
        NEW EXPEDITION
      </button>

      <div className="text-center text-slate-500 text-sm italic">
        "The world is a book, and those who do not travel read only one page."
      </div>
    </div>
  );
};

export default GameOver;
