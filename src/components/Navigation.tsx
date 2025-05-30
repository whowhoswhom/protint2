'use client';

import React from 'react';

export default function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <a href="#" className="logo">
          Pro<span style={{ color: 'var(--accent-primary)' }}>Tint</span>
        </a>
        
        <div className="nav-links">
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#book" className="btn-primary">
            Book Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white hover:text-accent-primary transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </nav>
  );
} 