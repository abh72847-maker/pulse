import React from 'react';
import { Zap, Flame, Cpu } from 'lucide-react';

export default function MonsterEngineToggle({
  isMonsterMode = false,
  onToggle
}) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.03] border border-amber-500/30 backdrop-blur-md">
      <div className="flex items-center space-x-2.5">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
          isMonsterMode 
            ? 'bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse' 
            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
        }`}>
          <Zap className="w-4 h-4 fill-current" />
        </div>

        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-black text-white tracking-wide uppercase">
              iQOO Monster Mode
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/40">
              NPU TURBO
            </span>
          </div>
          <p className="text-[10px] text-slate-400">
            {isMonsterMode ? 'Ultra-low 4ms AI Latency Enabled' : 'Click to enable iQOO NPU Acceleration'}
          </p>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isMonsterMode ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-slate-800'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            isMonsterMode ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
