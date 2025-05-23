import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ color: 'white', padding: '3rem 1rem 2rem', textAlign: 'center', marginTop: 'auto', background: 'transparent' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Contact & Info</div>
      <div style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
        <strong>Hours:</strong><br />
        Mon – Fri: 9:00am – 5:00pm<br />
        Sat: 8:00am – 4:00pm<br />
        Sunday: <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>CLOSED</span>
      </div>
      <div style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
        <strong>Phone:</strong> <a href="tel:5029619000" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>(502) 961-9000</a>
      </div>
      <div style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
        <strong>Address:</strong><br />
        7408 Preston Hwy,<br />
        Louisville, KY 40219
      </div>
      <div style={{ fontSize: '1rem', color: 'var(--accent-green)', marginTop: '2rem' }}>© {new Date().getFullYear()} Pro Tint. All rights reserved.</div>
    </footer>
  );
};

export default Footer; 