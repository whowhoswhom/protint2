import React from 'react';

type FeatureSectionProps = {
  title: string;
  accent: 'red' | 'yellow' | 'teal' | 'green';
  index: number;
};

const accentMap = {
  red: 'var(--accent-red)',
  yellow: 'var(--accent-yellow)',
  teal: 'var(--accent-teal)',
  green: 'var(--accent-green)',
};

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, accent, index }) => {
  return (
    <section
      style={{
        color: 'var(--foreground)',
        padding: '4rem 1rem',
        minHeight: '40vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <span style={{ width: 16, height: 16, borderRadius: '50%', background: accentMap[accent], display: 'inline-block' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{title}</h2>
      </div>
      <div style={{ margin: '2rem 0', minHeight: 80 }}>[SVG Placeholder]</div>
      <div style={{ marginBottom: '1rem', fontSize: '1.1rem', color: accentMap[accent] }}>[Micro-copy placeholder]</div>
      <div style={{ position: 'sticky', bottom: '2rem', right: '2rem', background: accentMap[accent], color: 'white', borderRadius: 8, padding: '1rem 1.5rem', minWidth: 180, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', fontFamily: 'monospace', fontSize: '1rem', opacity: 0.9 }}>[Code bubble placeholder]</div>
    </section>
  );
};

export default FeatureSection; 