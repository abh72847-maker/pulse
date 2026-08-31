import React from 'react';

export default function GradientButton({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  glow = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const baseClasses = 'relative inline-flex items-center justify-center font-black rounded-2xl transition-all duration-300 active:scale-95 focus:outline-none disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none';

  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-5 py-3 text-sm gap-2',
    lg: 'px-6 py-4 text-base gap-2.5'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white hover:from-purple-500 hover:via-fuchsia-500 hover:to-pink-500 border border-white/20 shadow-[0_4px_25px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_35px_rgba(236,72,153,0.6)]',
    secondary: 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-100 border border-white/15 hover:border-purple-400/40 backdrop-blur-xl shadow-lg',
    danger: 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-500 hover:to-pink-500 border border-white/20 shadow-[0_4px_25px_rgba(244,63,94,0.4)]',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.05]'
  };

  const glowEffect = glow ? 'before:absolute before:-inset-0.5 before:bg-gradient-to-r before:from-purple-600 before:to-pink-600 before:rounded-2xl before:blur-md before:opacity-50 hover:before:opacity-100 before:transition before:duration-300' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group ${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {glow && <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition duration-300 -z-10" />}
      {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />}
      <span className="relative z-10 font-black tracking-wide">{children}</span>
    </button>
  );
}
