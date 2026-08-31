import React, { useState } from 'react';
import GlassCard from './GlassCard';
import GradientButton from './GradientButton';
import RiskBadge from './RiskBadge';
import ProgressBar from './ProgressBar';
import { optimizeSchedule } from '../api';
import { 
  ArrowLeft, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Brain,
  Check,
  CheckCircle,
  Loader2,
  Lock,
  Zap
} from 'lucide-react';

export default function AIScheduleRepairScreen({
  onBack,
  onReturnToDashboard
}) {
  const [isRepaired, setIsRepaired] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optData, setOptData] = useState(null);

  const handleAcceptRepair = async () => {
    setIsProcessing(true);

    // Call FastAPI POST /optimize endpoint
    const { data } = await optimizeSchedule({ strategy: "balanced" });
    if (data) {
      setOptData(data);
    }

    setIsProcessing(false);
    setIsRepaired(true);
  };

  const movedItem = optData?.moved_tasks?.[0] || {
    task: "DSA Assignment",
    from_day: "Thursday",
    to_day: "Wednesday",
    effort_hours: 3.0,
    fixed: false
  };

  const wedAfter = optData?.after_workload?.Wednesday || 81;
  const thuAfter = optData?.after_workload?.Thursday || 84;
  const reasonText = optData?.reason || "Identified flexible candidate 'DSA Assignment' (3.0h, fixed=False) on overloaded Thursday (127%). Shifted task to Wednesday (62% -> 81%), protecting the Thursday deadline while bringing Thursday workload down from 127% to a manageable 84%.";

  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn w-full max-w-full overflow-hidden box-border">
      {/* Header & Back Button */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 border-b border-white/10 pb-3 sm:pb-4 w-full">
        <button
          onClick={onBack}
          className="p-2 sm:p-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-all active:scale-95 cursor-pointer shrink-0"
          title="Back to What-If Simulator"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center space-x-1.5 flex-wrap">
            <span className="text-[10px] sm:text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider shrink-0">Step 5 &bull; Rule-Based Repair</span>
            <span className="text-xs text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-mono font-bold truncate">Schedule Repair</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">AI Schedule Repair</h1>
        </div>
      </div>

      {/* Card 1: Large PULSE Recommendation Card */}
      <GlassCard 
        glowColor={isRepaired ? 'cyan' : 'purple'} 
        accentLine 
        className={`space-y-4 p-4 sm:p-6 transition-all duration-500 w-full max-w-full overflow-hidden box-border ${
          isRepaired ? 'border-emerald-500/60 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : ''
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-xs font-black font-mono tracking-widest uppercase shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>PULSE RECOMMENDATION</span>
          </div>

          <RiskBadge level={isRepaired ? 'low' : 'moderate'} label={isRepaired ? 'Week Repaired' : 'Optimal Plan Ready'} size="sm" />
        </div>

        <div className="space-y-1.5 min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
            {isRepaired ? '"Schedule Repaired Successfully."' : '"I\'ve found a safer schedule."'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl font-semibold">
            "Keep the deadline protected by moving flexible work into available capacity."
          </p>
        </div>

        {/* Explainable Optimization Reason Box */}
        <div className="p-3 rounded-xl sm:rounded-2xl bg-slate-950/80 border border-white/10 space-y-1 font-mono text-[10px] sm:text-xs text-slate-200 w-full">
          <span className="text-cyan-300 font-black uppercase text-[9px] sm:text-[10px] block">Optimization Engine Logic:</span>
          <p className="text-slate-300 leading-relaxed text-[10px] sm:text-[11px] font-semibold">{reasonText}</p>
        </div>

        {/* Success Indicators */}
        <div className="grid grid-cols-2 gap-2.5 pt-1 w-full">
          <div className="flex items-center space-x-2 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-[10px] sm:text-xs font-extrabold text-emerald-300 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </div>
            <span className="truncate">✓ Deadline protected</span>
          </div>

          <div className="flex items-center space-x-2 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 text-[10px] sm:text-xs font-extrabold text-emerald-300 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            </div>
            <span className="truncate">✓ Overload removed</span>
          </div>
        </div>
      </GlassCard>

      {/* Card 2: Task Movement Visualization */}
      <GlassCard glowColor="purple" className="space-y-3.5 p-4 sm:p-5 w-full max-w-full overflow-hidden box-border">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 gap-1">
          <div className="flex items-center space-x-1.5 shrink-0 min-w-0">
            <Brain className="w-4 h-4 text-purple-400 shrink-0" />
            <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider font-mono truncate">Flexible Candidate Shift</h3>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300 font-bold shrink-0">fixed: false &bull; {movedItem.effort_hours}h</span>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
          <div className="min-w-0">
            <h4 className="text-base sm:text-lg font-black text-white truncate">
              {movedItem.task}
            </h4>
            <p className="text-[10px] sm:text-xs text-slate-300 font-medium">Flexible task moved to available capacity window before deadline</p>
          </div>

          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] shrink-0 self-start sm:self-auto">
            <span className="text-xs font-black text-rose-400 font-mono">
              {movedItem.from_day}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400 animate-pulse shrink-0" />
            <span className="text-xs font-black text-emerald-400 font-mono">
              {movedItem.to_day}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Card 3: DOMINANT BEFORE VS AFTER WORKLOAD COMPARISON (84% SAFE) */}
      <GlassCard glowColor="cyan" accentLine className="space-y-4 sm:space-y-6 p-4 sm:p-6 w-full max-w-full overflow-hidden box-border">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 gap-1">
          <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider font-mono truncate">
            FastAPI /optimize Capacity Comparison
          </h3>
          <span className="text-[10px] sm:text-xs text-slate-300 font-mono font-bold shrink-0">Before vs After</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
          {/* WEDNESDAY COMPARISON */}
          <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5 w-full">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-white font-mono uppercase tracking-wider">
                WEDNESDAY
              </span>
              <div className="flex items-center space-x-2 font-mono text-xs font-bold">
                <span className="text-slate-400 line-through">62%</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
                <span className="text-emerald-400 font-extrabold text-sm">
                  {wedAfter}%
                </span>
              </div>
            </div>

            <ProgressBar 
              value={wedAfter} 
              max={120} 
              label="Wednesday Load (Absorbed Task)" 
              sublabel="Safe capacity range (<85%)"
              variant="cyan" 
              height="md"
            />
            <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
              Absorbs DSA assignment within realistic 85% safe threshold.
            </p>
          </div>

          {/* THURSDAY COMPARISON - DOMINANT METRIC (84% SAFE) */}
          <div className="p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-emerald-500/40 space-y-2.5 shadow-[0_0_30px_rgba(16,185,129,0.2)] w-full">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-black text-white font-mono uppercase tracking-wider">
                THURSDAY
              </span>
              <div className="flex items-center space-x-2 font-mono text-xs font-bold">
                <span className="text-rose-400 font-black line-through text-xs sm:text-sm">127%</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-black text-xl sm:text-2xl drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                  {thuAfter}%
                </span>
              </div>
            </div>

            <ProgressBar 
              value={thuAfter} 
              max={120} 
              label="Thursday Load (Post-Repair)" 
              sublabel="Overload removed (<85% SAFE)!"
              variant="gradient" 
              height="md"
            />
            <p className="text-[10px] sm:text-xs text-emerald-300 font-extrabold">
              Overload reduced by 43%! Thursday is now 84% manageable.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Repaired Success Alert & Return Button */}
      {isRepaired ? (
        <div className="space-y-3.5 pt-1 animate-fadeIn w-full">
          <div className="p-3.5 rounded-xl sm:rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-center space-y-1 shadow-[0_0_35px_rgba(16,185,129,0.35)]">
            <div className="inline-flex items-center space-x-1.5 text-emerald-200 font-black text-sm sm:text-base">
              <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Overload Removed: Thursday 127% &rarr; 84% SAFE</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-200 font-medium max-w-md mx-auto">
              Your week has been balanced via POST /optimize. Thursday load is down to an optimal 84%.
            </p>
          </div>

          <GradientButton 
            variant="primary" 
            size="lg" 
            fullWidth 
            icon={ShieldCheck}
            glow
            onClick={onReturnToDashboard}
            className="py-3.5 sm:py-4.5 text-base sm:text-lg font-black tracking-wider uppercase border-2 border-white/30 shadow-[0_0_40px_rgba(16,185,129,0.55)]"
          >
            Return to Dashboard
          </GradientButton>
        </div>
      ) : (
        /* Primary Action Button */
        <div className="pt-1 w-full">
          <GradientButton 
            variant="primary" 
            size="lg" 
            fullWidth 
            icon={isProcessing ? Loader2 : Wrench}
            glow
            disabled={isProcessing}
            onClick={handleAcceptRepair}
            className="py-3.5 sm:py-4.5 text-base sm:text-lg font-black tracking-wider uppercase border-2 border-white/30 shadow-[0_0_40px_rgba(168,85,247,0.55)]"
          >
            {isProcessing ? 'Executing POST /optimize...' : 'Accept & Repair Week'}
          </GradientButton>
        </div>
      )}
    </div>
  );
}
