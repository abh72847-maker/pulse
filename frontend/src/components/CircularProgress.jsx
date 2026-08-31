import React from 'react';

export default function CircularProgress({
  value = 78,
  max = 100,
  size = 180,
  strokeWidth = 14,
  label = "78%",
  sublabel = "3.2h / 4.1h",
  className = ""
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
      >
        <defs>
          <linearGradient id="capacityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <linearGradient id="overloadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* 80% Safety Limit Dash Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#capacityGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Inner Centered Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-0.5">
        <span className="text-3xl font-black tracking-tight text-white font-mono drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {label}
        </span>
        <span className="text-[11px] font-medium text-slate-400">
          {sublabel}
        </span>
      </div>
    </div>
  );
}
