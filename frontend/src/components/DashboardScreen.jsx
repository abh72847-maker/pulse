import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import GradientButton from './GradientButton';
import RiskBadge from './RiskBadge';
import MonsterEngineToggle from './MonsterEngineToggle';
import JudgeScenarioBar from './JudgeScenarioBar';
import { fetchForecast } from '../api';
import { 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Brain, 
  CheckCircle2, 
  Flame,
  Clock,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
  Loader2,
  Server,
  BatteryCharging,
  Cpu
} from 'lucide-react';

export default function DashboardScreen({
  isTaskAdded = false,
  isWeekRepaired = false,
  onNavigateToAddCommitment,
  onExploreRisk,
  onFixMyWeek
}) {
  const [selectedDay, setSelectedDay] = useState('Thursday');
  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isMonsterMode, setIsMonsterMode] = useState(false);
  const [demoScenario, setDemoScenario] = useState('default');

  useEffect(() => {
    let isMounted = true;
    fetchForecast().then(({ data, isFallback }) => {
      if (isMounted) {
        setApiData(data);
        setIsBackendConnected(!isFallback);
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const getThursdayLoad = () => {
    if (demoScenario === 'repaired' || isWeekRepaired) return 84;
    if (demoScenario === 'simulated') return 146;
    return apiData?.forecast?.Thursday || 127;
  };

  const getWednesdayLoad = () => {
    if (demoScenario === 'repaired' || isWeekRepaired) return 81;
    return apiData?.forecast?.Wednesday || 62;
  };

  const thursdayLoad = getThursdayLoad();
  const wednesdayLoad = getWednesdayLoad();
  const isRepairedActive = isWeekRepaired || demoScenario === 'repaired';
  const thursdayCategory = isRepairedActive ? 'safe' : 'overload';

  const weeklyData = [
    { day: 'Monday', shortDay: 'Mon', load: apiData?.forecast?.Monday || 72, hours: '4.5h', category: 'warning' },
    { day: 'Tuesday', shortDay: 'Tue', load: apiData?.forecast?.Tuesday || 84, hours: '6.5h', category: 'warning' },
    { day: 'Wednesday', shortDay: 'Wed', load: wednesdayLoad, hours: isRepairedActive ? '6.8h' : '4.9h', category: isRepairedActive ? 'warning' : 'safe' },
    { day: 'Thursday', shortDay: 'Thu', load: thursdayLoad, hours: isRepairedActive ? '6.8h' : '11.5h', category: thursdayCategory, isPeak: !isRepairedActive },
    { day: 'Friday', shortDay: 'Fri', load: isRepairedActive ? 88 : (apiData?.forecast?.Friday || 105), hours: isRepairedActive ? '7.1h' : '9.5h', category: isRepairedActive ? 'warning' : 'overload' },
    { day: 'Saturday', shortDay: 'Sat', load: apiData?.forecast?.Saturday || 76, hours: '3.0h', category: 'warning' },
    { day: 'Sunday', shortDay: 'Sun', load: apiData?.forecast?.Sunday || 38, hours: '1.5h', category: 'safe' }
  ];

  const getCategoryStyles = (category, load) => {
    if (load > 100 || category === 'overload') {
      return {
        barGradient: 'bg-gradient-to-t from-rose-600 via-pink-500 to-fuchsia-400 shadow-[0_0_22px_rgba(244,63,94,0.6)]',
        badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-500/40',
        text: 'text-rose-300 font-black',
        pill: 'bg-rose-950/90 border-rose-500/60 text-rose-200 font-black'
      };
    }
    if (load >= 70 || category === 'warning') {
      return {
        barGradient: 'bg-gradient-to-t from-amber-600 via-orange-500 to-yellow-400 shadow-[0_0_18px_rgba(245,158,11,0.5)]',
        badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
        text: 'text-amber-300 font-extrabold',
        pill: 'bg-white/[0.06] border-white/15 text-slate-200 font-bold'
      };
    }
    return {
      barGradient: 'bg-gradient-to-t from-emerald-700 via-teal-500 to-cyan-400 shadow-[0_0_18px_rgba(16,185,129,0.4)]',
      badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
      text: 'text-emerald-300 font-bold',
      pill: 'bg-white/[0.06] border-white/15 text-slate-200 font-bold'
    };
  };

  return (
    <div className="space-y-3.5 sm:space-y-5 animate-fadeIn w-full max-w-full overflow-hidden box-border">
      {/* iQOO Hackathon Judge Quick Scenario Bar */}
      <JudgeScenarioBar 
        activeScenario={demoScenario === 'default' ? (isWeekRepaired ? 'repaired' : 'overload') : demoScenario}
        onSelectScenario={(scenario) => {
          setDemoScenario(scenario);
          if (scenario === 'repaired') onFixMyWeek();
          if (scenario === 'simulated') onExploreRisk();
        }}
      />

      {/* iQOO Monster Engine AI Mode Toggle */}
      <MonsterEngineToggle 
        isMonsterMode={isMonsterMode}
        onToggle={() => setIsMonsterMode(!isMonsterMode)}
      />

      {/* Monster Mode Performance Telemetry Bar */}
      {isMonsterMode && (
        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-amber-500/20 border border-amber-500/50 text-amber-200 text-[10px] sm:text-xs font-mono flex items-center justify-between shadow-[0_0_25px_rgba(245,158,11,0.3)] animate-fadeIn">
          <div className="flex items-center space-x-2 shrink-0 min-w-0">
            <Cpu className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
            <span className="font-bold truncate">iQOO NPU Turbo Active</span>
          </div>
          <span className="font-black text-amber-300 shrink-0">4ms Latency</span>
        </div>
      )}

      {/* Task Added Notification Banner */}
      {isTaskAdded && (
        <div className="p-3 sm:p-3.5 rounded-2xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-between text-xs text-purple-200 animate-fadeIn">
          <div className="flex items-center space-x-2 shrink-0 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="font-medium text-xs truncate">
              Added: <strong className="text-white font-bold">DSA Assignment</strong> (3h)
            </span>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-purple-300 bg-purple-900/80 px-2 py-0.5 rounded shrink-0">Active</span>
        </div>
      )}

      {/* CARD 1: Top Hero Card */}
      <GlassCard 
        glowColor={isMonsterMode ? 'pink' : 'purple'} 
        accentLine 
        className={`space-y-3.5 p-3.5 sm:p-5 transition-all w-full max-w-full overflow-hidden box-border ${
          isMonsterMode ? 'border-amber-500/50 shadow-[0_0_35px_rgba(245,158,11,0.25)]' : ''
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-1.5 w-full">
          <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs font-black text-purple-300 tracking-wider uppercase font-mono shrink-0">
            <Sparkles className={`w-3.5 h-3.5 shrink-0 ${isMonsterMode ? 'text-amber-400' : 'text-pink-400'}`} />
            <span>PULSE AI ENGINE</span>
          </div>

          {isLoading ? (
            <span className="text-[10px] text-slate-300 font-mono flex items-center space-x-1 shrink-0">
              <Loader2 className="w-3 h-3 animate-spin text-purple-400 shrink-0" />
              <span>Fetching...</span>
            </span>
          ) : isBackendConnected ? (
            <span className="text-[9px] sm:text-[10px] text-cyan-300 font-mono font-bold flex items-center space-x-1 bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">
              <Server className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>FastAPI</span>
            </span>
          ) : (
            <span className="text-[9px] sm:text-[10px] text-amber-300 font-mono font-bold bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
              Demo Mode
            </span>
          )}
        </div>

        <div className="space-y-1 w-full min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-snug break-words">
            Predictive User Load & Schedule Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 italic font-semibold">
            "Don't manage your overload. Prevent it."
          </p>
        </div>

        <div className="pt-1 space-y-2 w-full">
          {!isRepairedActive ? (
            <>
              <div 
                onClick={onExploreRisk}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full bg-pink-500/15 border border-pink-500/50 text-pink-200 text-xs font-black shadow-[0_0_25px_rgba(236,72,153,0.35)] cursor-pointer hover:border-pink-400 transition-all shrink-0"
              >
                <Flame className="w-3.5 h-3.5 text-pink-400 animate-pulse shrink-0" />
                <span>High Overload Risk</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                Next Overload Spike: <strong className="text-rose-400 font-mono font-black text-xs sm:text-sm">Thursday (+3.5h overload)</strong>
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full bg-emerald-500/15 border border-emerald-500/50 text-emerald-200 text-xs font-black shadow-[0_0_25px_rgba(16,185,129,0.35)] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Schedule Repaired & Optimal</span>
              </div>

              <p className="text-xs sm:text-sm text-emerald-300 font-semibold leading-relaxed">
                Overload Removed: <strong className="text-white font-mono font-black">Thursday is 84% manageable</strong>
              </p>
            </>
          )}
        </div>
      </GlassCard>

      {/* CARD GRID 2: Twin Metric Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full max-w-full box-border">
        {/* Left Twin Card: PREDICTED LOAD */}
        <GlassCard 
          interactive 
          glowColor={!isRepairedActive ? 'pink' : 'cyan'} 
          onClick={onExploreRisk}
          className="space-y-2 p-3 sm:p-4 flex flex-col justify-between min-w-0 overflow-hidden box-border"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-slate-300 font-mono truncate">
              PREDICTED LOAD
            </span>

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 shrink-0" />
            </div>
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl sm:text-4xl font-black font-mono tracking-tight ${
                !isRepairedActive ? 'text-white' : 'text-emerald-400'
              }`}>
                {thursdayLoad}%
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300 font-bold">Peak</span>
            </div>

            {!isRepairedActive ? (
              <div className="text-[9px] sm:text-xs font-extrabold text-rose-400 flex items-center space-x-0.5 truncate">
                <span>↗ +38% overload</span>
              </div>
            ) : (
              <div className="text-[9px] sm:text-xs font-extrabold text-emerald-400 flex items-center space-x-0.5 truncate">
                <span>✓ Manageable</span>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Right Twin Card: FOCUS BUFFER */}
        <GlassCard 
          interactive 
          glowColor="purple" 
          className="space-y-2 p-3 sm:p-4 flex flex-col justify-between min-w-0 overflow-hidden box-border"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-slate-300 font-mono truncate">
              FOCUS BUFFER
            </span>

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 shrink-0" />
            </div>
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
                1.2
              </span>
              <span className="text-[10px] sm:text-xs text-slate-300 font-bold">hrs left</span>
            </div>

            <div className="text-[9px] sm:text-xs font-extrabold text-emerald-400 flex items-center space-x-0.5 truncate">
              <span>↘ -2.4h deficit</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* CARD 3: Cognitive Stamina & Mental Energy Index */}
      <GlassCard glowColor="purple" className="space-y-2.5 p-3.5 sm:p-4 w-full max-w-full overflow-hidden box-border">
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-2 gap-1">
          <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs font-black text-white uppercase tracking-wider font-mono shrink-0">
            <BatteryCharging className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
            <span>AI Energy Index</span>
          </div>

          <span className="text-[9px] sm:text-[10px] text-cyan-300 font-mono font-bold bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">
            iQOO NPU
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-0.5 font-semibold">
          <span className="text-slate-200">Mental Energy</span>
          <span className="text-cyan-300 font-mono font-black text-xs">72% Focus Capacity</span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/5 border border-white/15 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-[0_0_18px_rgba(6,182,212,0.5)] w-[72%]" />
        </div>
      </GlassCard>

      {/* CARD 4: 7-DAY LOAD FORECAST (TRUE 7-COLUMN RESPONSIVE CSS GRID) */}
      <GlassCard glowColor="purple" accentLine className="space-y-3 p-3 sm:p-5 w-full max-w-full overflow-hidden box-border">
        
        {/* FORECAST HEADER (Title & Capacity Text) */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-2 gap-1 w-full">
          <div className="flex items-center space-x-1.5 shrink-0 min-w-0">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 fill-purple-400/20 shrink-0" />
            <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider truncate">
              7-Day Load Forecast
            </h2>
          </div>

          <span className="text-[10px] sm:text-xs font-mono text-slate-300 font-bold shrink-0">
            Cap: 8.0h/day
          </span>
        </div>

        {/* DAILY EFFORT HOURS PILLS (7 EQUAL COLUMNS) */}
        <div 
          className="grid gap-[3px] sm:gap-1.5 text-center font-mono pt-0.5 w-full max-w-full box-border"
          style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
        >
          {weeklyData.map((item) => {
            const isPeak = item.shortDay === 'Thu' && !isRepairedActive;
            return (
              <div 
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`py-1 px-0 rounded-lg transition-all cursor-pointer border text-[9px] xs:text-[10px] sm:text-xs font-black text-center flex items-center justify-center whitespace-nowrap min-w-0 w-full overflow-hidden ${
                  isPeak 
                    ? 'bg-purple-900/90 border-purple-400 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.5)]' 
                    : getCategoryStyles(item.category, item.load).pill
                }`}
              >
                {item.hours}
              </div>
            );
          })}
        </div>

        {/* 7-DAY WORKLOAD CHART (TRUE RESPONSIVE 7-COLUMN CSS GRID) */}
        <div 
          className="grid gap-[4px] sm:gap-1.5 py-1 w-full max-w-full box-border"
          style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
        >
          {weeklyData.map((item) => {
            const styles = getCategoryStyles(item.category, item.load);
            const isSelected = selectedDay === item.day;
            const isPeak = item.shortDay === 'Thu' && !isRepairedActive;
            const normalizedHeight = Math.min(Math.max((item.load / 130) * 100, 15), 100);

            return (
              <div 
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`flex flex-col items-center justify-end space-y-1 cursor-pointer min-w-0 w-full p-0.5 sm:p-1 rounded-xl transition-all overflow-hidden ${
                  isPeak
                    ? 'bg-purple-950/60 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : isSelected 
                      ? 'bg-white/[0.08] border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                      : 'hover:bg-white/[0.04]'
                }`}
              >
                {/* 1. Workload Percentage */}
                <span className={`text-[9px] xs:text-[10px] sm:text-xs font-mono font-black text-center w-full min-w-0 truncate ${styles.text}`}>
                  {item.load}%
                </span>

                {/* 2. Vertical Workload Bar (Responsive 100% width of column, centered) */}
                <div className="relative w-full h-24 sm:h-32 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/15 p-0.5 flex flex-col justify-end overflow-hidden box-border">
                  <div className="absolute top-[38%] left-0 right-0 h-[1px] bg-white/25 border-t border-dashed border-white/50 z-10" />

                  <div
                    style={{ height: `${normalizedHeight}%` }}
                    className={`w-full rounded-md sm:rounded-lg transition-all duration-700 ease-out ${styles.barGradient}`}
                  />
                </div>

                {/* 3. Day Name */}
                <span className={`text-[9px] xs:text-[10px] sm:text-xs font-black text-center w-full min-w-0 truncate ${isSelected || isPeak ? 'text-white underline decoration-purple-500 decoration-2 underline-offset-2' : 'text-slate-300'}`}>
                  {item.shortDay}
                </span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Primary Action Button */}
      <div className="pt-1 space-y-2 w-full max-w-full box-border">
        {!isRepairedActive ? (
          <GradientButton 
            variant="primary" 
            size="lg" 
            fullWidth 
            icon={Sparkles}
            glow
            onClick={onFixMyWeek}
            className="py-3.5 text-base sm:text-lg font-black tracking-wider uppercase shadow-[0_0_35px_rgba(168,85,247,0.55)] border-2 border-white/30"
          >
            Fix My Week
          </GradientButton>
        ) : (
          <GradientButton 
            variant="secondary" 
            size="lg" 
            fullWidth 
            icon={ShieldCheck}
            onClick={onFixMyWeek}
            className="py-3.5 text-xs sm:text-sm font-black tracking-wider uppercase border border-emerald-500/50 text-emerald-300"
          >
            Week Repaired (84% Thursday Optimal)
          </GradientButton>
        )}

        <div className="text-center text-[10px] sm:text-xs text-slate-300 font-semibold flex items-center justify-center space-x-1">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 shrink-0" />
          <span className="truncate">Accelerated by iQOO NPU AI Performance Engine</span>
        </div>
      </div>
    </div>
  );
}
