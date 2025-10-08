'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { MUSCLES, type MuscleId } from '../data/muscles';
import { cn } from '../lib/cn';

interface MuscleDetailPanelProps {
  activeMuscleId: MuscleId;
  pinnedMuscleId: MuscleId | null;
  onPinToggle: (id: MuscleId) => void;
}

const fallbackGif = 'https://dummyimage.com/640x360/0f172a/ffffff&text=Workout';

export default function MuscleDetailPanel({ activeMuscleId, pinnedMuscleId, onPinToggle }: MuscleDetailPanelProps) {
  const muscle = useMemo(() => {
    return MUSCLES.find((item) => item.id === activeMuscleId) ?? MUSCLES[0];
  }, [activeMuscleId]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    setExpandedIndex(0);
  }, [muscle.id]);

  const isPinned = pinnedMuscleId === activeMuscleId;

  return (
    <aside className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-900/60 p-6 text-slate-100 shadow-[0_40px_120px_-60px_rgba(15,118,110,0.6)] backdrop-blur-2xl">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-[0.45em] text-slate-400">Pinned focus</p>
          <h2 className="text-2xl font-semibold text-white">{muscle.name}</h2>
          <p className="text-sm leading-relaxed text-slate-300">{muscle.summary}</p>
        </div>
        <button
          type="button"
          className={cn(
            'rounded-full border px-4 py-1 text-[11px] uppercase tracking-[0.35em] transition',
            isPinned
              ? 'border-emerald-400/80 bg-emerald-500/10 text-emerald-200'
              : 'border-white/20 bg-white/5 text-slate-200 hover:border-white/40'
          )}
          onClick={() => onPinToggle(muscle.id)}
        >
          {isPinned ? 'Pinned' : 'Pin muscle'}
        </button>
      </header>

      <div className="mt-6 space-y-5">
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black/60">
          <Image
            src={muscle.gifUrl || fallbackGif}
            alt={`${muscle.name} workout demo`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
            unoptimized
          />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-slate-200">
            <span className="rounded-full bg-black/60 px-3 py-1">Demo motion</span>
            <span className="rounded-full bg-black/60 px-3 py-1">Tap to swap</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
            <span>Form cue</span>
            <span>Stay smooth</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">{muscle.quickTip}</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.45em] text-slate-400">Build your session</p>
          <ul className="space-y-2">
            {muscle.workouts.map((workout, index) => {
              const expanded = expandedIndex === index;

              return (
                <li key={workout.name} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    onClick={() => setExpandedIndex(expanded ? null : index)}
                    aria-expanded={expanded}
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{workout.name}</p>
                      <p className="text-xs text-slate-400">{workout.equipment}</p>
                    </div>
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-xl text-xs font-semibold transition',
                        expanded ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/5 text-slate-200'
                      )}
                    >
                      {expanded ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={cn(
                      'grid gap-3 px-4 text-sm text-slate-200 transition-all duration-300',
                      expanded ? 'max-h-48 pb-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                    )}
                  >
                    <p className="text-xs leading-relaxed text-slate-300">{workout.description}</p>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-slate-300">
                      {workout.equipment}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
