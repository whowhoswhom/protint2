'use client';

import { cn } from '../lib/cn';

interface NavigationProps {
  gender: 'male' | 'female';
  onToggleGender: () => void;
}

const NAV_ITEMS = ['Programs', 'Progress', 'Settings'] as const;

export default function Navigation({ gender, onToggleGender }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 text-white">
          <span className="text-sm uppercase tracking-[0.4em] text-slate-400">fourword</span>
          <div className="h-1 w-1 rounded-full bg-emerald-400" />
          <p className="text-base font-semibold text-white">Vision → Reality</p>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-200">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className="group relative font-medium uppercase tracking-[0.3em] text-xs text-slate-300 transition hover:text-white"
            >
              {item}
              <span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onToggleGender}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-100 transition hover:border-white/40"
        >
          {gender === 'male' ? 'Male' : 'Female'}
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              gender === 'male'
                ? 'bg-sky-400 shadow-[0_0_0_4px_rgba(56,189,248,0.15)]'
                : 'bg-pink-400 shadow-[0_0_0_4px_rgba(244,114,182,0.15)]'
            )}
          />
        </button>
      </div>
    </nav>
  );
}
