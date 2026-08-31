import React, { useState } from 'react';
import GlassCard from './GlassCard';
import GradientButton from './GradientButton';
import RiskBadge from './RiskBadge';
import { extractTask } from '../api';
import { 
  ArrowLeft, 
  UploadCloud, 
  Sparkles, 
  CheckCircle, 
  FileText, 
  Clock, 
  Calendar, 
  AlertCircle,
  Plus,
  Loader2,
  Check,
  Cpu
} from 'lucide-react';

export default function AddCommitmentScreen({
  onBack,
  onTaskAdded
}) {
  const [inputText, setInputText] = useState("DSA Assignment due Thursday, takes around 3 hours.");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [extractedData, setExtractedData] = useState({
    task: "DSA Assignment",
    deadline: "Thursday",
    effort_hours: 3,
    priority: "High",
    source: "demo_fallback"
  });

  const handleExtractAndAdd = async () => {
    setIsExtracting(true);

    // Call FastAPI POST /extract-task (Uses Gemini API if key is present; falls back to demo)
    const { data } = await extractTask({
      title: inputText,
      deadline: "Thursday",
      effort_hours: 3.0,
      priority: "High"
    });

    if (data) {
      setExtractedData(data);
    }

    setIsExtracting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onTaskAdded();
    }, 1200);
  };

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
            <span className="text-[10px] sm:text-xs font-bold text-purple-400 font-mono uppercase tracking-wider shrink-0">Step 2 &bull; Commitment Input</span>
            <span className="text-xs text-slate-500 hidden sm:inline">&bull;</span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-mono font-bold truncate">Add commitment</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">Add Commitment</h1>
        </div>
      </div>

      {/* Toast Notification Success Banner */}
      {isSuccess && (
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-200 animate-fadeIn shadow-[0_0_30px_rgba(16,185,129,0.3)] gap-2">
          <div className="flex items-center space-x-2 min-w-0">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-xs sm:text-sm text-white truncate">DSA Assignment added to schedule!</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-300 shrink-0">Returning...</span>
        </div>
      )}

      {/* Card 1: Screenshot Upload Mock Card */}
      <GlassCard glowColor="purple" accentLine className="space-y-3.5 p-4 sm:p-5 w-full max-w-full overflow-hidden box-border">
        <div className="flex items-center justify-between gap-1">
          <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider truncate">
            Upload a Screenshot
          </h2>
          <span className="text-[9px] sm:text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 shrink-0">
            OCR Auto-Scan
          </span>
        </div>

        <p className="text-xs text-slate-300">
          "Let PULSE understand the task, deadline and effort."
        </p>

        <div className="border-2 border-dashed border-purple-500/30 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center space-y-2.5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group w-full box-border">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
            <UploadCloud className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
          </div>

          <div className="text-center px-1">
            <span className="text-xs font-semibold text-slate-200 block">Drag syllabus, assignment sheet, or chat screenshot</span>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">PNG, JPG, or PDF up to 10MB</p>
          </div>

          <GradientButton
            variant="secondary"
            size="sm"
            onClick={handleExtractAndAdd}
            disabled={isExtracting}
            className="text-xs"
          >
            Use Demo Screenshot
          </GradientButton>
        </div>
      </GlassCard>

      {/* Card 2: Natural Language Input Area (PULSE AI Task Understanding) */}
      <GlassCard glowColor="cyan" className="space-y-3.5 p-4 sm:p-5 w-full max-w-full overflow-hidden box-border">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 gap-1">
          <div className="flex items-center space-x-1.5 min-w-0">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider truncate">
              PULSE AI Task Understanding
            </h2>
          </div>

          {extractedData.source === 'gemini' ? (
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40 flex items-center space-x-1 shrink-0">
              <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Gemini AI</span>
            </span>
          ) : (
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">
              NLP Extraction
            </span>
          )}
        </div>

        <div className="space-y-1.5 w-full">
          <label className="text-xs text-slate-300 font-medium block">
            Type naturally:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full rounded-2xl bg-slate-950/80 border border-white/15 p-2.5 sm:p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans box-border resize-none"
            placeholder="Describe your assignment, project, or task..."
          />
        </div>
      </GlassCard>

      {/* Card 3: AI-Extracted Task Result Grid */}
      <GlassCard glowColor="purple" accentLine className="space-y-3.5 p-4 sm:p-5 w-full max-w-full overflow-hidden box-border">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 gap-1">
          <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider font-mono truncate">
            AI Extracted Parameters
          </h3>
          <span className="text-[10px] sm:text-xs text-emerald-400 font-mono font-semibold flex items-center space-x-1 shrink-0">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>Structured Extraction</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 font-mono text-xs w-full max-w-full">
          {/* TASK */}
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 space-y-0.5 min-w-0">
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              TASK
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white block truncate">
              {extractedData.task}
            </span>
          </div>

          {/* DEADLINE */}
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 space-y-0.5 min-w-0">
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              DEADLINE
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-rose-400 block font-mono truncate">
              {extractedData.deadline}
            </span>
          </div>

          {/* EFFORT */}
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 space-y-0.5 min-w-0">
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              EFFORT
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-cyan-300 block font-mono truncate">
              {extractedData.effort_hours} hours
            </span>
          </div>

          {/* PRIORITY */}
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 space-y-0.5 min-w-0">
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              PRIORITY
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-amber-400 block font-mono truncate">
              {extractedData.priority}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Primary Action Button */}
      <div className="pt-1 w-full">
        <GradientButton 
          variant="primary" 
          size="lg" 
          fullWidth 
          icon={isExtracting ? Loader2 : Plus}
          glow
          disabled={isExtracting}
          onClick={handleExtractAndAdd}
          className="py-3.5 sm:py-4 text-base font-black tracking-wider uppercase border-2 border-white/30 shadow-[0_0_35px_rgba(168,85,247,0.5)]"
        >
          {isExtracting ? 'Extracting with Gemini...' : 'Add to Schedule'}
        </GradientButton>
      </div>
    </div>
  );
}
