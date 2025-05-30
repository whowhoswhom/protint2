'use client';

import React, { useEffect, useRef, useState } from 'react';
import scrollama from 'scrollama';

interface ScrollControllerProps {
  onStepChange: (step: number) => void;
}

export default function ScrollController({ onStepChange }: ScrollControllerProps) {
  const scrollerRef = useRef<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const scroller = scrollama();

    scroller
      .setup({
        step: '.scroll-step',
        offset: 0.6,
        debug: false,
      })
      .onStepEnter((response: any) => {
        const step = parseInt(response.element.dataset.step);
        setCurrentStep(step);
        onStepChange(step);
        setVisibleSteps(prev => new Set([...prev, step]));
      })
      .onStepExit((response: any) => {
        const step = parseInt(response.element.dataset.step);
        if (response.direction === 'down') {
          setVisibleSteps(prev => {
            const newSet = new Set(prev);
            newSet.delete(step);
            return newSet;
          });
        }
      });

    scrollerRef.current = scroller;

    const handleResize = () => {
      scroller.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollerRef.current) {
        scrollerRef.current.destroy();
      }
    };
  }, [onStepChange]);

  const services = [
    {
      id: 0,
      title: "ProTint Louisville",
      subtitle: "Premium Automotive Customization",
      description: "Transform your vehicle with our expert craftsmanship. From subtle enhancements to bold modifications, we bring your automotive vision to life.",
      position: "hero",
      accent: "01"
    },
    {
      id: 1,
      title: "Custom Wheels",
      subtitle: "Performance & Style",
      description: "Upgrade your ride with our curated selection of premium wheels. From lightweight performance rims to luxury statement pieces.",
      position: "left",
      accent: "02"
    },
    {
      id: 2,
      title: "Window Tinting",
      subtitle: "Privacy & Protection",
      description: "Professional ceramic tinting for enhanced privacy, UV protection, and interior preservation. Multiple shade options available.",
      position: "right",
      accent: "03"
    },
    {
      id: 3,
      title: "LED Lighting",
      subtitle: "Illumination Systems",
      description: "Custom LED installations for both interior and exterior. Accent lighting, underglow, and performance lighting solutions.",
      position: "left",
      accent: "04"
    },
    {
      id: 4,
      title: "Audio Systems",
      subtitle: "Premium Sound",
      description: "High-fidelity audio installations with premium components. From subtle upgrades to competition-grade systems.",
      position: "right",
      accent: "05"
    },
    {
      id: 5,
      title: "Lift Kits",
      subtitle: "Suspension Upgrades",
      description: "Professional suspension modifications for improved performance, ground clearance, and aggressive stance.",
      position: "left",
      accent: "06"
    }
  ];

  const getSectionClasses = (position: string) => {
    const baseClasses = "scroll-step section";
    switch (position) {
      case "hero":
        return `${baseClasses} hero-section`;
      case "left":
        return `${baseClasses} service-left`;
      case "right":
        return `${baseClasses} service-right`;
      default:
        return baseClasses;
    }
  };

  const getContentClasses = (serviceId: number, position: string) => {
    const baseClasses = position === "hero" ? "hero-content" : "section-content";
    const visibilityClass = visibleSteps.has(serviceId) ? "visible" : "hidden";
    return `${baseClasses} ${visibilityClass}`;
  };

  return (
    <div className="relative">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={getSectionClasses(service.position)}
          data-step={service.id}
        >
          <div className={getContentClasses(service.id, service.position)}>
            {service.position === "hero" ? (
              <>
                <h1 className="text-display hero-title">
                  {service.title}
                </h1>
                <p className="text-subheading hero-subtitle">
                  {service.subtitle}
                </p>
                <p className="text-body hero-description">
                  {service.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="#services" className="btn-primary">
                    Explore Services
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </a>
                  <a href="#contact" className="btn-secondary">
                    Get Quote
                  </a>
                </div>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    color: 'var(--accent-primary)',
                    marginRight: '1rem',
                    fontFamily: 'monospace'
                  }}>
                    {service.accent}
                  </span>
                  <div className="accent-line"></div>
                </div>
                <h2 className="text-heading service-title">
                  {service.title}
                </h2>
                <p className="text-subheading service-subtitle">
                  {service.subtitle}
                </p>
                <p className="text-body service-description">
                  {service.description}
                </p>
                <a href="#contact" className="btn-secondary">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 