import React from 'react';
import { Activity, Zap, Sparkles } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function Header({
  systemStatus = 'Active AI Monitoring',
  overallRisk = 'high',
  onActionClick
}) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090414]/90 border-b border-white/10 px-2.5 sm:px-6 py-2 transition-all max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-3 w-full">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-1.5 shrink-0 min-w-0">
          <div className="relative group cursor-pointer shrink-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#0d0722] border border-white/20 flex items-center justify-center text-purple-300 shrink-0">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 fill-pink-400/20 shrink-0" />
            </div>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <span className="text-sm sm:text-base font-black tracking-widest bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent font-mono shrink-0">
              PULSE
            </span>
            <span className="px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[8px] sm:text-[9px] font-bold tracking-wider uppercase border border-purple-500/30 shrink-0 whitespace-nowrap">
              AI ENGINE
            </span>
          </div>
        </div>

        {/* Center/Right Status Badges & Controls */}
        <div className="flex items-center space-x-1.5 shrink-0 ml-auto flex-wrap justify-end">
          {/* AI Engine Status Pill (Compact on mobile) */}
          <div className="flex items-center space-x-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] sm:text-xs text-slate-300 shrink-0">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] text-cyan-300 shrink-0 whitespace-nowrap">
              Predictive Engine Active
            </span>
          </div>

          {/* Current Risk Badge */}
          <RiskBadge level={overallRisk} size="sm" showDot={true} className="text-[10px] sm:text-[11px] px-2 py-0.5 shrink-0" />

          {/* Action Trigger Button */}
          <button 
            onClick={onActionClick}
            className="p-1 sm:p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer relative shrink-0 active:scale-95"
            title="System Insights"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
}
