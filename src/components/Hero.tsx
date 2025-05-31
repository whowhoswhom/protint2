"use client";
import React, { useEffect, useRef } from 'react';

const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value));

const Hero: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<any>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      // If reduced motion, jump to end state
      if (svgRef.current && (window as any).anime) {
        // basic final state so users still see the graphic
        (window as any).anime.set(svgRef.current.querySelectorAll('.ring'), {
          rotate: 360,
          translateZ: 80,
        });
      }
      return;
    }
    if (svgRef.current && (window as any).anime) {
      const anime = (window as any).anime;
      // Build master timeline
      const tl = anime.timeline({ autoplay: false, easing: 'easeInOutSine' });
      tl.add({
        targets: '#ring-1',
        translateZ: [0, 100],
        rotate: [0, 180],
        duration: 1000,
      })
        .add({
          targets: '#ring-2',
          translateZ: [0, -100],
          rotate: [0, -180],
          duration: 1000,
          offset: 0,
        })
        .add({
          targets: '#ring-3',
          scale: [1, 0.6],
          rotate: [0, 360],
          duration: 1000,
          offset: 0,
        });
      timelineRef.current = tl;

      // Scroll binding
      const update = () => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const progress = clamp(
          0,
          1,
          -rect.top / (rect.height - window.innerHeight)
        );
        tl.seek(progress * tl.duration);
        if (scrubRef.current) {
          scrubRef.current.style.transform = `scaleX(${progress})`;
        }
        requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      return () => {
        // Clean up
      };
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="lensWrapper"
      style={{
        height: '300vh',
        position: 'relative',
        perspective: '1200px',
        width: '100%',
      }}
    >
      <section
        style={{
          position: 'sticky',
          top: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 1,
          background: 'transparent',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1rem' }}>Pro Tint</h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--accent-teal)', marginBottom: '2rem' }}>Premium Services +</p>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <svg
            ref={svgRef}
            id="lens"
            width="320"
            height="320"
            viewBox="0 0 220 220"
            aria-hidden
            focusable="false"
            style={{
              width: '60vw',
              height: '60vw',
              maxWidth: 320,
              maxHeight: 320,
              transformStyle: 'preserve-3d',
              margin: '0 auto',
              display: 'block',
            }}
          >
            <circle id="ring-1" className="ring part" cx="110" cy="110" r="80" stroke="var(--accent-red)" strokeWidth="6" fill="none" />
            <circle id="ring-2" className="ring part" cx="110" cy="110" r="60" stroke="var(--accent-yellow)" strokeWidth="4" fill="none" />
            <circle id="ring-3" className="ring part" cx="110" cy="110" r="40" stroke="var(--accent-teal)" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <div
          ref={scrubRef}
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            height: 4,
            width: 160,
            background: 'var(--accent-teal)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            zIndex: 1000,
          }}
        />
      </section>
    </div>
  );
};

export default Hero; 