import React from 'react';

const ScrubBar: React.FC = () => {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, width: 120, height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 4, zIndex: 1000 }}>
      <div style={{ width: '40%', height: '100%', background: 'var(--accent-teal)', borderRadius: 4, transition: 'width 0.2s' }} />
    </div>
  );
};

export default ScrubBar; 