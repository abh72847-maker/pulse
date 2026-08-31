import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  label = null,
  sublabel = null,
  variant = 'gradient', // 'gradient' | 'purple' | 'danger' | 'cyan'
  showPercentage = true,
  height = 'md', // 'sm' | 'md' | 'lg'
  threshold = 80, // Overload alert line percentage
  showThresholdLine = false,
  className = ''
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const fillGradients = {
    gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    purple: 'bg-gradient-to-r from-purple-600 to-violet-400 shadow-[0_0_15px_rgba(147,51,234,0.4)]',
    danger: 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]',
    cyan: 'bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
  };

  const isOverload = percentage >= threshold;
  const currentGradient = isOverload && variant === 'gradient' ? fillGradients.danger : fillGradients[variant];

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-2">
            {label && <span className="text-slate-200">{label}</span>}
            {sublabel && <span className="text-slate-400 font-normal">{sublabel}</span>}
          </div>
          {showPercentage && (
            <span className={`font-mono text-xs ${isOverload ? 'text-pink-400 font-bold' : 'text-purple-300'}`}>
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div className={`relative w-full rounded-full bg-white/5 border border-white/10 overflow-hidden ${heightClasses[height]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${currentGradient}`}
          style={{ width: `${percentage}%` }}
        />

        {showThresholdLine && (
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-pink-400/80 shadow-[0_0_8px_#f472b6] z-10"
            style={{ left: `${threshold}%` }}
            title={`Threshold: ${threshold}%`}
          />
        )}
      </div>
    </div>
  );
}
