import React from 'react';
import { Wifi, Battery, Signal, Zap } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

export default function IQOOPhoneFrame({
  children,
  deviceTitle = "iQOO Flagship Phone",
  badgeText = "iQOO Hackathon",
  activeTab = 'dashboard',
  onTabChange,
  className = ""
}) {
  return (
    <div className={`flex flex-col items-center space-y-3 w-full max-w-[430px] mx-auto ${className}`}>
      {/* Top Device Header Badge */}
      <div className="flex items-center space-x-2 text-xs font-mono font-bold shrink-0">
        <div className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center space-x-1.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 shrink-0" />
          <span className="shrink-0">{deviceTitle}</span>
          {badgeText && <span className="opacity-70 shrink-0 hidden sm:inline">&bull; {badgeText}</span>}
        </div>
      </div>

      {/* Fluid Smartphone Enclosure */}
      <div className="relative w-full max-w-[410px] min-w-[320px] h-[800px] rounded-[44px] sm:rounded-[52px] p-2.5 sm:p-3.5 bg-gradient-to-b from-[#1c162e] via-[#0d0722] to-[#140b2e] border-[3px] sm:border-[4px] border-purple-500/40 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(168,85,247,0.3)] flex flex-col justify-between overflow-hidden box-border">
        
        {/* Phone Frame Side Buttons */}
        <div className="absolute -left-[5px] top-28 w-[3px] h-10 bg-purple-500/60 rounded-l-sm hidden sm:block" />
        <div className="absolute -left-[5px] top-42 w-[3px] h-14 bg-purple-500/60 rounded-l-sm hidden sm:block" />
        <div className="absolute -left-[5px] top-60 w-[3px] h-14 bg-purple-500/60 rounded-l-sm hidden sm:block" />
        <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-purple-500/60 rounded-r-sm hidden sm:block" />

        {/* Top Punch-Hole Camera Cutout & Speaker Mesh */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center space-x-2 pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-black border border-slate-800 shadow-inner shrink-0" />
          <div className="w-10 h-1 bg-slate-800 rounded-full shrink-0" />
        </div>

        {/* Internal Viewport Container */}
        <div className="w-full h-full rounded-[36px] sm:rounded-[42px] bg-[#090414] border border-white/10 overflow-hidden relative flex flex-col justify-between box-border">
          
          {/* Top Status Bar */}
          <div className="w-full px-4 pt-3 pb-1.5 flex items-center justify-between text-[10px] font-mono text-slate-300 backdrop-blur-md bg-[#090414]/90 border-b border-white/5 shrink-0 z-30">
            <span className="font-bold tracking-tight shrink-0">9:41</span>

            <div className="flex items-center space-x-1.5 text-slate-300 shrink-0">
              <Signal className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="text-[9px] font-bold text-cyan-300 shrink-0">5G</span>
              <Wifi className="w-3 h-3 text-slate-300 shrink-0" />
              <div className="flex items-center space-x-0.5 shrink-0">
                <span className="text-[9px] text-emerald-400 font-bold shrink-0">100%</span>
                <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/40 shrink-0" />
              </div>
            </div>
          </div>

          {/* Scrollable Internal Screen Viewport */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden p-2 sm:p-3 space-y-3 sm:space-y-4 no-scrollbar box-border">
            {children}
          </div>

          {/* Anchored Bottom Navigation & Phone Gesture Bar */}
          <div className="w-full bg-[#090414]/95 border-t border-white/10 backdrop-blur-xl pt-1 pb-1.5 shrink-0 z-30 space-y-1 box-border">
            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={onTabChange} 
              isInline={true} 
            />

            {/* Bottom Phone Gesture Pill */}
            <div className="w-28 sm:w-32 h-1 bg-slate-400/40 rounded-full mx-auto shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
