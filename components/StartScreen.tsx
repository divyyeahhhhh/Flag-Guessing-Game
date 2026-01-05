
import React, { useState } from 'react';
import { Difficulty } from '../types';

interface Props {
  onStart: (diff: Difficulty, timer: boolean) => void;
}

const StartScreen: React.FC<Props> = ({ onStart }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [timerEnabled, setTimerEnabled] = useState(true);

  return (
    <div className="max-w-xl w-full text-center space-y-8 animate-fadeIn">
      <div className="relative inline-block">
        <h1 className="text-6xl md:text-8xl font-cinzel font-bold tracking-tighter text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
          ATLAS
        </h1>
        <p className="text-xl md:text-2xl font-light text-slate-400 tracking-widest mt-[-10px]">
          GUESS THE COUNTRY
        </p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
              Select Difficulty
            </label>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.values(Difficulty).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                    difficulty === d 
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                      : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:bg-slate-700/50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-widest">Enable Timer</span>
            <button
              onClick={() => setTimerEnabled(!timerEnabled)}
              className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
                timerEnabled ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                timerEnabled ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <button
            onClick={() => onStart(difficulty, timerEnabled)}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            BEGIN EXPEDITION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-slate-500 text-xs">
        <div className="p-2 border border-slate-800 rounded-lg">
          <p className="font-bold text-slate-400">VISUAL CLUES</p>
          Flags and regions
        </div>
        <div className="p-2 border border-slate-800 rounded-lg">
          <p className="font-bold text-slate-400">10 ROUNDS</p>
          Quick sessions
        </div>
        <div className="p-2 border border-slate-800 rounded-lg">
          <p className="font-bold text-slate-400">AI FACTS</p>
          Learn while playing
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
