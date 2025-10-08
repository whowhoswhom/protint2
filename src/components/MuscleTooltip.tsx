'use client';

import { type MuscleContent } from '../data/muscles';
import { cn } from '../lib/cn';

interface MuscleTooltipProps {
  muscle: MuscleContent;
  variant?: 'bubble' | 'sidebar';
  pinned?: boolean;
}

export default function MuscleTooltip({ muscle, variant = 'bubble', pinned = false }: MuscleTooltipProps) {
  if (variant === 'sidebar') {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-left text-slate-200 space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-400">Now exploring</p>
        <h3 className="text-lg font-semibold text-white">{muscle.name}</h3>
        <p className="text-sm text-slate-300 leading-relaxed">{muscle.summary}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'w-full rounded-[28px] border px-5 py-4 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.6)] backdrop-blur-2xl transition-colors duration-500',
        pinned
          ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-100'
          : 'border-white/15 bg-slate-950/75 text-slate-100'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-slate-400">
            {pinned ? 'Pinned focus' : 'Auto focus'}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{muscle.name}</h3>
        </div>
        <span
          className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-2xl text-xs font-semibold text-white"
          style={{ backgroundColor: `${muscle.highlightColor}33` }}
        >
          {muscle.name
            .split(' ')
            .map((token) => token[0])
            .join('')}
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-200/80">{muscle.summary}</p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.4em] text-slate-400">
        Tap a highlight to pin and unlock the workout deck.
      </p>
    </div>
  );
}
