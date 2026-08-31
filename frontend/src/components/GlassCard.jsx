import React from 'react';

export default function GlassCard({
  children,
  className = '',
  interactive = false,
  glowColor = 'none', // 'purple' | 'pink' | 'cyan' | 'none'
  accentLine = false,
  accentPosition = 'top', // 'top' | 'left'
  onClick,
  ...props
}) {
  const glowStyles = {
    purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:border-purple-500/30',
    pink: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] hover:border-pink-500/30',
    cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:border-cyan-500/30',
    none: ''
  };

  const accentStyles = accentLine
    ? accentPosition === 'top'
      ? 'before:absolute before:top-0 before:left-6 before:right-6 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/50 before:to-transparent'
      : 'after:absolute after:left-0 after:top-4 after:bottom-4 after:w-[2px] after:bg-gradient-to-b after:from-purple-500 after:to-fuchsia-500'
    : '';

  const baseClass = interactive ? 'glass-panel-interactive cursor-pointer' : 'glass-panel';

  return (
    <div
      onClick={onClick}
      className={`relative rounded-3xl p-5 overflow-hidden backdrop-blur-xl ${baseClass} ${glowStyles[glowColor]} ${accentStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
