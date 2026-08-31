import React, { useState } from 'react';
import GlassCard from './GlassCard';
import GradientButton from './GradientButton';
import RiskBadge from './RiskBadge';
import ProgressBar from './ProgressBar';
import { simulatePostponement } from '../api';
import { 
  ArrowLeft, 
  Sliders, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  ShieldAlert, 
  Wrench, 
  Brain,
  RotateCcw,
  Loader2,
  Calculator,
  HelpCircle
} from 'lucide-react';

export default function WhatIfSimulatorScreen({
  onBack,
  onNavigateToScheduleRepair
}) {
  const [isSimulated, setIsSimulated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simData, setSimData] = useState(null);

  const handleSimulate = async () => {
    setIsProcessing(true);

    // Call FastAPI POST /simulate endpoint
    const { data } = await simulatePostponement({
      task_name: "DSA Assignment",
      postpone_days: 1
    });

    if (data) {
      setSimData(data);
    }

    setIsProcessing(false);
    setIsSimulated(true);
  };

  const currentLoad = isSimulated ? (simData?.after_workload || 146) : 127;
  const currentWorkHours = isSimulated ? 6.6 : 5.7;
  const capacityHours = 4.5;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn w-full max-w-full overflow-hidden box-border">
      {/* Header & Back Button */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 border-b border-white/10 pb-3 sm:pb-4 w-full">
        <button
          onClick={onBack}
          className="p-2 sm:p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-all active:scale-95 cursor-pointer shrink-0"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center space-x-1.5 flex-wrap">
            <span className="text-[10px] sm:text-xs font-bold text-purple-400 font-mono uppercase tracking-wider shrink-0">Step 4 &bull; Simulation</span>
            <span className="text-xs text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-mono font-bold truncate">Formula Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">What-If Simulator</h1>
        </div>
      </div>

      {/* EXPLAINABLE FORMULA EXPLANATION CARD */}
      <GlassCard glowColor="purple" className="space-y-3 p-3.5 sm:p-4 w-full max-w-full overflow-hidden box-border">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 gap-1">
          <div className="flex items-center space-x-1.5 text-xs font-black text-white uppercase tracking-wider font-mono shrink-0">
            <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
            <span>PULSE Workload Formula</span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-cyan-300 font-mono font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">
            Transparent Math
          </span>
        </div>

        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950/80 border border-white/10 font-mono text-[10px] sm:text-xs text-slate-200 space-y-1.5 w-full">
          <div className="text-cyan-300 font-black text-xs sm:text-sm text-center py-1 bg-white/[0.03] rounded-lg leading-tight">
            Workload Ratio (%) = (Estimated Work ÷ Realistic Capacity) × 100
          </div>
          <div className="flex justify-between text-[10px] sm:text-[11px] pt-1 text-slate-300 flex-wrap gap-1">
            <span>&bull; &lt; 85%: <strong className="text-emerald-400">SAFE</strong></span>
            <span>&bull; 85%-100%: <strong className="text-amber-400">WARNING</strong></span>
            <span>&bull; &gt; 100%: <strong className="text-rose-400">OVERLOAD</strong></span>
          </div>
        </div>
      </GlassCard>

      {/* Card 1: Thursday Workload Baseline / Simulation Result */}
      <GlassCard 
        glowColor={isSimulated ? 'pink' : 'purple'} 
        accentLine 
        className={`space-y-4 sm:space-y-5 p-4 sm:p-6 transition-all duration-500 w-full max-w-full overflow-hidden box-border ${
          isSimulated ? 'border-rose-500/60 shadow-[0_0_50px_rgba(244,63,94,0.35)]' : ''
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="text-xs font-black text-white font-mono uppercase tracking-wider">THURSDAY</span>
            <span className="text-xs text-slate-400">&bull;</span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-mono font-bold">Capacity Engine</span>
          </div>

          <RiskBadge 
            level={isSimulated ? 'critical' : 'high'} 
            label={isSimulated ? 'CRITICAL RISK' : 'OVERLOAD RISK'} 
            size="sm" 
          />
        </div>

        {/* DOMINANT VISUAL METRIC TRANSITION (127% -> 146%) */}
        <div className="flex items-baseline justify-between border-b border-white/10 pb-3.5 gap-2 flex-wrap">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider block font-mono font-black">
              {isSimulated ? 'POSTPONED WORKLOAD' : 'CURRENT WORKLOAD'}
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5 flex-wrap">
              <span className={`text-4xl sm:text-6xl font-black font-mono tracking-tight transition-all duration-500 ${
                isSimulated ? 'text-rose-400 drop-shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse' : 'text-white'
              }`}>
                {currentLoad}%
              </span>
              {isSimulated ? (
                <span className="text-[10px] sm:text-xs font-black text-rose-200 font-mono bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/50 shrink-0">
                  +19% Risk Spike
                </span>
              ) : (
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 font-mono shrink-0">
                  Peak Overload
                </span>
              )}
            </div>
          </div>

          <div className="text-right shrink-0 ml-auto">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider block font-mono font-bold">
              Realistic Capacity
            </span>
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-0.5 block">
              100%
            </span>
          </div>
        </div>

        {/* Hours Comparison Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono w-full max-w-full">
          <div className="p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 space-y-0.5 min-w-0">
            <span className="text-slate-400 font-bold block uppercase text-[9px] sm:text-[10px]">Estimated Work</span>
            <span className={`text-base sm:text-xl font-black block truncate ${isSimulated ? 'text-rose-400' : 'text-white'}`}>
              {currentWorkHours.toFixed(1)} hours
            </span>
          </div>

          <div className="p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 space-y-0.5 min-w-0">
            <span className="text-slate-400 font-bold block uppercase text-[9px] sm:text-[10px]">Realistic Capacity</span>
            <span className="text-base sm:text-xl font-black text-cyan-300 block truncate">
              {capacityHours.toFixed(1)} hours
            </span>
          </div>
        </div>

        <ProgressBar 
          value={currentLoad} 
          max={150} 
          label="Thursday Capacity Utilization" 
          sublabel={isSimulated ? "Critical Overload Threshold Exceeded!" : "Workload exceeds capacity"}
          variant={isSimulated ? 'pink' : 'gradient'} 
          height="md"
        />

        {/* Explainable Calculation Result */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] sm:text-xs text-slate-300 font-mono leading-relaxed">
          <strong className="text-white font-bold">Explainable Formula:</strong> {currentWorkHours.toFixed(1)}h estimated ÷ {capacityHours.toFixed(1)}h capacity × 100 = <strong className="text-rose-400 font-black">{currentLoad}%</strong> ({currentLoad > 100 ? 'OVERLOAD' : 'SAFE'}).
        </div>
      </GlassCard>

      {/* Card 2: Selected Task & What-If Question */}
      <GlassCard glowColor="purple" className="space-y-3.5 p-4 sm:p-5 w-full max-w-full overflow-hidden box-border">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 gap-1">
          <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider font-mono truncate">
            Selected Commitment
          </h3>
          <span className="text-[10px] sm:text-xs text-amber-400 font-mono font-black shrink-0">Due Thursday</span>
        </div>

        <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2">
          <div className="space-y-0.5 min-w-0">
            <h4 className="text-base sm:text-lg font-black text-white truncate">DSA Assignment</h4>
            <p className="text-[10px] sm:text-xs text-slate-300 font-medium truncate">3.0h effort &bull; High Priority</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] sm:text-xs font-black font-mono border border-purple-500/40 shrink-0">
            Target Task
          </span>
        </div>

        <div className="pt-1 text-center space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-sm sm:text-base font-black text-white">
            <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
            <span>"What happens if you postpone this task?"</span>
          </div>
        </div>
      </GlassCard>

      {/* Primary Action Button */}
      {!isSimulated ? (
        <div className="pt-1 w-full">
          <GradientButton 
            variant="primary" 
            size="lg" 
            fullWidth 
            icon={isProcessing ? Loader2 : Sliders}
            glow
            disabled={isProcessing}
            onClick={handleSimulate}
            className="py-3.5 sm:py-4.5 text-base sm:text-lg font-black tracking-wider uppercase border-2 border-white/30 shadow-[0_0_35px_rgba(168,85,247,0.5)]"
          >
            {isProcessing ? 'Calculating Workload Formula...' : 'Simulate Postponement'}
          </GradientButton>
        </div>
      ) : (
        <div className="space-y-3.5 pt-1 animate-fadeIn w-full">
          <div className="p-3.5 rounded-xl sm:rounded-2xl bg-rose-500/20 border border-rose-500/50 text-center space-y-1 shadow-[0_0_35px_rgba(244,63,94,0.35)]">
            <div className="inline-flex items-center space-x-1.5 text-rose-200 font-black text-sm sm:text-base">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Risk Increased: 127% &rarr; 146%</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-200 leading-relaxed max-w-md mx-auto font-medium">
              "Postponing this task pushes work into an already overloaded period."
            </p>
          </div>

          <GradientButton 
            variant="primary" 
            size="lg" 
            fullWidth 
            icon={Wrench}
            glow
            onClick={onNavigateToScheduleRepair}
            className="py-3.5 sm:py-4.5 text-base sm:text-lg font-black tracking-wider uppercase border-2 border-white/30 shadow-[0_0_40px_rgba(168,85,247,0.6)]"
          >
            Let PULSE Fix It
          </GradientButton>
        </div>
      )}
    </div>
  );
}
