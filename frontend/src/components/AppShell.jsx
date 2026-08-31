import React, { useState } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import IQOOPhoneFrame from './IQOOPhoneFrame';
import { Smartphone, Monitor, Zap, RotateCcw } from 'lucide-react';

export default function AppShell({
  children,
  activeTab = 'dashboard',
  onTabChange,
  systemStatus = 'Active AI Monitoring',
  overallRisk = 'low',
  onResetDemo
}) {
  // Mode: 'phone-frame' (default smartphone mockup view) | 'full-web'
  const [viewMode, setViewMode] = useState('phone-frame');

  return (
    <div className="min-h-screen bg-[#090414] text-slate-100 relative flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Ambient Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/25 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-fuchsia-600/20 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 left-1/4 w-[36rem] h-[36rem] bg-indigo-900/30 rounded-full blur-[160px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* iQOO Hackathon Presentation Header */}
      <div className="relative z-50 w-full bg-[#0d0722]/90 border-b border-amber-500/30 backdrop-blur-xl px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <div className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold flex items-center space-x-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>iQOO HACKATHON EDITION</span>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono font-bold text-[10px]">
            Demo Mode Active
          </span>
        </div>

        {/* View Switcher Controls & Reset Demo Button */}
        <div className="flex items-center space-x-2">
          {/* Reset Demo Button */}
          {onResetDemo && (
            <button
              onClick={onResetDemo}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              title="Reset Demo Sequence to Initial State"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Reset Demo</span>
            </button>
          )}

          <div className="flex items-center space-x-1 bg-white/[0.04] p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setViewMode('phone-frame')}
              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'phone-frame'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Smartphone Mockup</span>
            </button>

            <button
              onClick={() => setViewMode('full-web')}
              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'full-web'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>🖥️ Full Web View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <div className="relative z-10 flex-1 flex flex-col w-full">
        {viewMode === 'phone-frame' ? (
          /* Phone Frame Wrapper */
          <div className="flex-1 flex flex-col items-center justify-center py-6 px-2">
            <IQOOPhoneFrame 
              deviceTitle="iQOO Flagship Smartphone" 
              badgeText="PULSE AI Engine"
              activeTab={activeTab}
              onTabChange={onTabChange}
            >
              <div className="space-y-4">
                <Header 
                  systemStatus={systemStatus} 
                  overallRisk={overallRisk}
                  onActionClick={() => onTabChange && onTabChange('what-if')}
                />
                {children}
              </div>
            </IQOOPhoneFrame>
          </div>
        ) : (
          /* Full Web View */
          <div className="flex-1 flex flex-col w-full">
            <Header 
              systemStatus={systemStatus} 
              overallRisk={overallRisk}
              onActionClick={() => onTabChange && onTabChange('what-if')}
            />

            <main className="flex-1 w-full mx-auto pb-28 pt-6 px-4 md:px-6 max-w-md sm:max-w-lg md:max-w-3xl transition-all">
              {children}
            </main>

            <BottomNavigation 
              activeTab={activeTab} 
              onTabChange={onTabChange} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
