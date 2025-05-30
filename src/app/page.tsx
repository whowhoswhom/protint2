'use client';

import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import CarViewer from '../components/CarViewer';
import ScrollController from '../components/ScrollController';

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="min-h-screen bg-dark-bg overflow-x-hidden">
      <Navigation />
      <CarViewer activeStep={activeStep} />
      <ScrollController onStepChange={handleStepChange} />
    </div>
  );
}
