import React from 'react';
import { LayoutGrid, PlusCircle, Sliders } from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'add-commitment', label: 'Add Task', icon: PlusCircle },
  { id: 'what-if', label: 'What-If', icon: Sliders }
];

export default function BottomNavigation({
  activeTab = 'dashboard',
  onTabChange,
  isInline = false,
  className = ''
}) {
  const containerClass = isInline 
    ? `w-full max-w-full px-2 py-1 relative z-30 ${className}`
    : `fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md ${className}`;

  return (
    <div className={containerClass}>
      <nav className="glass-panel rounded-3xl p-1.5 border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange && onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {/* Active Tab Glow Pill */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-fuchsia-600/40 to-pink-600/40 rounded-2xl border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.35)] -z-10" />
              )}

              <Icon className={`w-4.5 h-4.5 transition-transform duration-300 ${
                isActive ? 'scale-110 text-pink-400' : 'text-slate-400'
              }`} />

              <span className={`text-[10px] mt-0.5 tracking-tight font-semibold ${
                isActive ? 'text-white font-bold' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
