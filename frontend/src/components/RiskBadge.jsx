import React from 'react';
import { ShieldCheck, AlertTriangle, Flame, AlertCircle } from 'lucide-react';

export default function RiskBadge({
  level = 'low', // 'low' | 'moderate' | 'high' | 'critical'
  score = null,
  label = null,
  size = 'md',
  showDot = true,
  className = ''
}) {
  const badgeConfigs = {
    low: {
      defaultLabel: 'Optimal Capacity',
      bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
      dotBg: 'bg-emerald-400',
      glow: 'shadow-[0_0_15px_rgba(52,211,153,0.35)]',
      icon: ShieldCheck
    },
    moderate: {
      defaultLabel: 'Moderate Load',
      bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
      dotBg: 'bg-amber-400',
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.35)]',
      icon: AlertTriangle
    },
    high: {
      defaultLabel: 'High Overload Risk',
      bg: 'bg-pink-500/15 border-pink-500/40 text-pink-300',
      dotBg: 'bg-pink-400',
      glow: 'shadow-[0_0_15px_rgba(244,114,182,0.45)]',
      icon: Flame
    },
    critical: {
      defaultLabel: 'Critical Overload',
      bg: 'bg-rose-600/25 border-rose-500/60 text-rose-100',
      dotBg: 'bg-rose-500 animate-ping',
      glow: 'shadow-[0_0_22px_rgba(244,63,94,0.6)]',
      icon: AlertCircle
    }
  };

  const config = badgeConfigs[level] || badgeConfigs.low;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs font-extrabold gap-1.5 rounded-full border',
    md: 'px-3.5 py-1.5 text-xs sm:text-sm font-extrabold gap-2 rounded-full border',
    lg: 'px-4.5 py-2 text-sm font-black gap-2.5 rounded-full border'
  };

  return (
    <span
      className={`inline-flex items-center backdrop-blur-md transition-all ${sizeClasses[size]} ${config.bg} ${config.glow} ${className}`}
    >
      {showDot && (
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotBg}`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.dotBg}`}></span>
        </span>
      )}
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label || config.defaultLabel}</span>
      {score !== null && (
        <span className="ml-1 opacity-90 font-mono text-xs font-black">
          ({score}%)
        </span>
      )}
    </span>
  );
}
