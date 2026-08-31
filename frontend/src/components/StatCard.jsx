import React from 'react';
import GlassCard from './GlassCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change = null,
  trend = 'neutral', // 'up' | 'down' | 'neutral'
  icon: Icon = null,
  glowColor = 'purple',
  subtext = null,
  badge = null,
  className = ''
}) {
  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
  };

  const TrendIcon = trendIcons[trend] || Minus;

  const trendColors = {
    up: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    down: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    neutral: 'text-slate-400 bg-slate-500/10 border-slate-500/20'
  };

  return (
    <GlassCard 
      interactive 
      glowColor={glowColor}
      accentLine 
      className={`space-y-3 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {Icon && (
            <div className="w-9 h-9 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">{title}</span>
        </div>

        {badge}
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-mono">
          {value}
        </div>

        {change && (
          <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${trendColors[trend]}`}>
            <TrendIcon className="w-3 h-3" />
            <span>{change}</span>
          </div>
        )}
      </div>

      {subtext && <p className="text-[11px] text-slate-400 leading-normal">{subtext}</p>}
    </GlassCard>
  );
}
