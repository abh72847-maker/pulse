import React from 'react';
import { Play, Flame, ShieldCheck, Sliders } from 'lucide-react';

export default function JudgeScenarioBar({
  activeScenario = 'overload', // 'overload' | 'simulated' | 'repaired'
  onSelectScenario
}) {
  return (
    <div className="space-y-2 p-3 rounded-2xl bg-[#0d0722]/80 border border-amber-500/30 backdrop-blur-xl">
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-amber-300 font-bold flex items-center space-x-1">
          <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>JUDGE DEMO PRESETS</span>
        </span>
        <span className="text-slate-400">Click to switch demo state</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Preset 1: Overload Spike */}
        <button
          onClick={() => onSelectScenario('overload')}
          className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all border flex items-center justify-center space-x-1 cursor-pointer ${
            activeScenario === 'overload'
              ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-3 h-3 text-rose-400" />
          <span>127% Overload</span>
        </button>

        {/* Preset 2: Simulated Spike */}
        <button
          onClick={() => onSelectScenario('simulated')}
          className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all border flex items-center justify-center space-x-1 cursor-pointer ${
            activeScenario === 'simulated'
              ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3 h-3 text-purple-400" />
          <span>146% Risk</span>
        </button>

        {/* Preset 3: AI Repaired */}
        <button
          onClick={() => onSelectScenario('repaired')}
          className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all border flex items-center justify-center space-x-1 cursor-pointer ${
            activeScenario === 'repaired'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>84% Optimal</span>
        </button>
      </div>
    </div>
  );
}
