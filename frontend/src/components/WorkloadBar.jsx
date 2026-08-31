import React from 'react';

export default function WorkloadBar({
  day = 'Mon',
  dateLabel = '',
  loadPercent = 45, // 0-100+
  isOverloaded = false,
  isToday = false,
  taskCount = 0,
  onClick
}) {
  const height = `${Math.min(Math.max(loadPercent, 12), 100)}%`;

  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center space-y-2 group cursor-pointer"
    >
      {/* Percentage pill on hover/active */}
      <span className={`text-[10px] font-mono font-bold transition-opacity ${
        isOverloaded ? 'text-pink-400 opacity-100' : 'text-slate-400 group-hover:text-purple-300'
      }`}>
        {loadPercent}%
      </span>

      {/* Vertical load bar container */}
      <div className="relative w-8 h-32 rounded-2xl bg-white/[0.03] border border-white/10 p-1 flex flex-col justify-end overflow-hidden group-hover:border-purple-500/40 transition-colors">
        {/* Overload safety line at 80% */}
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-pink-500/40 border-t border-dashed border-pink-400/60 z-10" />

        {/* Load bar fill */}
        <div
          style={{ height }}
          className={`w-full rounded-xl transition-all duration-500 ${
            isOverloaded
              ? 'bg-gradient-to-t from-pink-600 via-rose-500 to-fuchsia-500 shadow-[0_0_18px_rgba(244,63,94,0.5)]'
              : isToday
              ? 'bg-gradient-to-t from-purple-700 via-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
              : 'bg-gradient-to-t from-indigo-900/80 via-purple-700/60 to-purple-500/40 group-hover:from-indigo-800 group-hover:to-purple-500'
          }`}
        />
      </div>

      {/* Day label */}
      <div className="text-center">
        <div className={`text-xs font-bold ${
          isToday ? 'text-purple-300 underline decoration-purple-500 decoration-2 underline-offset-4' : 'text-slate-300'
        }`}>
          {day}
        </div>
        {dateLabel && <div className="text-[10px] text-slate-500 font-medium">{dateLabel}</div>}
        {taskCount > 0 && (
          <div className="text-[9px] text-purple-400/80 font-mono mt-0.5">{taskCount} tasks</div>
        )}
      </div>
    </div>
  );
}
