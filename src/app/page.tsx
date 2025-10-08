'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import HumanoidModel from '../components/HumanoidModel';
import MuscleDetailPanel from '../components/MuscleDetailPanel';
import MuscleTooltip from '../components/MuscleTooltip';
import Navigation from '../components/Navigation';
import { DEFAULT_MUSCLE, MUSCLE_ORDER, MUSCLES, type MuscleId } from '../data/muscles';

type SectionRefs = Record<MuscleId, HTMLElement | null>;

export default function Home() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [pinnedMuscleId, setPinnedMuscleId] = useState<MuscleId | null>(null);
  const [scrollMuscleId, setScrollMuscleId] = useState<MuscleId>(DEFAULT_MUSCLE.id);
  const [hoverMuscleId, setHoverMuscleId] = useState<MuscleId | null>(null);

  const sectionRefs = useRef<SectionRefs>({} as SectionRefs);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const muscleId = entry.target.getAttribute('data-muscle-id') as MuscleId | null;
          if (muscleId) {
            setScrollMuscleId(muscleId);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    MUSCLE_ORDER.forEach((id) => {
      const element = sectionRefs.current[id];
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeMuscleId = useMemo<MuscleId>(() => {
    return hoverMuscleId ?? pinnedMuscleId ?? scrollMuscleId;
  }, [hoverMuscleId, pinnedMuscleId, scrollMuscleId]);

  const activeMuscle = useMemo(() => {
    return MUSCLES.find((item) => item.id === activeMuscleId) ?? DEFAULT_MUSCLE;
  }, [activeMuscleId]);

  const handlePinToggle = (id: MuscleId) => {
    setPinnedMuscleId((current) => (current === id ? null : id));
  };

  const handleGenderToggle = () => {
    setGender((value) => (value === 'male' ? 'female' : 'male'));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05070f] text-slate-100">
      <Navigation gender={gender} onToggleGender={handleGenderToggle} />
      <main className="relative">
        <div className="pointer-events-none fixed inset-x-0 top-0 z-10 flex h-screen items-center justify-center">
          <div className="pointer-events-auto relative flex h-[70vh] w-full max-w-[min(640px,80vw)] items-center justify-center">
            <div className="absolute -top-28 left-1/2 z-20 w-[min(320px,calc(100%-2rem))] -translate-x-1/2">
              <MuscleTooltip muscle={activeMuscle} pinned={Boolean(pinnedMuscleId)} />
            </div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-10 rounded-[40px] bg-gradient-to-br from-emerald-500/25 via-sky-500/10 to-transparent blur-3xl" />
              <div className="absolute inset-16 rounded-[40px] bg-gradient-to-tl from-indigo-500/20 via-transparent to-transparent blur-3xl" />
            </div>
            <HumanoidModel
              muscles={MUSCLES}
              activeMuscleId={activeMuscleId}
              onMuscleSelect={(id) => handlePinToggle(id)}
              onMuscleHover={setHoverMuscleId}
              gender={gender}
            />
          </div>
        </div>

        <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-40 px-6 pb-56 pt-[calc(96px+12vh)]">
          <section className="min-h-[90vh] w-full">
            <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Vision → Reality</p>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
                Scroll through the body, lock onto a muscle, and we&apos;ll surface the cleanest path to stronger reps.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-300">
                Inspired by the polish of Tesla&apos;s control center and the micro-interactions of animejs.com, this explorer keeps the
                athlete centered while your focus glides between muscle systems. Tap to pin a region and dive into form-perfect
                workouts, gifs, and cues.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Scroll or swipe to travel</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Click bubbles to pin</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Toggle male / female</span>
              </div>
            </div>
          </section>

          {MUSCLE_ORDER.map((muscleId, index) => {
            const muscle = MUSCLES.find((item) => item.id === muscleId) ?? DEFAULT_MUSCLE;
            const alignRight = index % 2 === 1;

            return (
              <section
                key={muscle.id}
                data-muscle-id={muscle.id}
                ref={(element) => {
                  sectionRefs.current[muscle.id] = element;
                }}
                className="min-h-[80vh]"
              >
                <div className={`flex ${alignRight ? 'justify-end' : 'justify-start'} items-center`}>
                  <div
                    className={`w-full max-w-xl space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 ${
                      activeMuscleId === muscle.id ? 'shadow-[0_40px_120px_-60px_rgba(16,185,129,0.55)]' : 'opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-slate-400">Muscle focus</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">{muscle.name}</h2>
                      </div>
                      <span
                        className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-2xl text-sm font-semibold text-white"
                        style={{ backgroundColor: `${muscle.highlightColor}33` }}
                      >
                        {muscle.name
                          .split(' ')
                          .map((token) => token[0])
                          .join('')}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-300">{muscle.summary}</p>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Starter moves</p>
                      <ul className="mt-4 space-y-3 text-sm text-slate-100">
                        {muscle.workouts.slice(0, 2).map((workout) => (
                          <li key={workout.name} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: muscle.highlightColor }} />
                            <div>
                              <p className="font-medium text-white">{workout.name}</p>
                              <p className="text-xs text-slate-400">{workout.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-slate-400">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Pin for full guide</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{muscle.workouts.length} workouts</span>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 w-full max-w-[min(360px,calc(100%-3rem))] -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0">
          <div className="pointer-events-auto">
            <MuscleDetailPanel activeMuscleId={activeMuscleId} pinnedMuscleId={pinnedMuscleId} onPinToggle={handlePinToggle} />
          </div>
        </div>
      </main>
    </div>
  );
}
