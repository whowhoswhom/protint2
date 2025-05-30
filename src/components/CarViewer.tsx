'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CarModelProps {
  activeStep: number;
  scrollProgress: number;
  mouseRotationX: number;
  mouseRotationY: number;
}

// Function to create a custom "Pro Tint" texture
function createProTintTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Fill with semi-transparent dark background to let car color show through
    ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
    ctx.fillRect(0, 0, 1024, 512);
    
    // Set up text styling for main text
    ctx.fillStyle = '#ffd700'; // Gold color
    ctx.font = 'bold 64px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Position "Pro Tint" text more towards the center-left (door area)
    ctx.fillText('Pro Tint', 400, 200);
    
    // Add "LOUISVILLE" text below
    ctx.font = 'bold 32px Arial';
    ctx.fillText('LOUISVILLE', 400, 250);
    
    // Add decorative line
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(300, 280);
    ctx.lineTo(500, 280);
    ctx.stroke();
    
    // Add a second "Pro Tint" for the other door (right side)
    ctx.font = 'bold 64px Arial';
    ctx.fillText('Pro Tint', 650, 200);
    
    ctx.font = 'bold 32px Arial';
    ctx.fillText('LOUISVILLE', 650, 250);
    
    // Add decorative line for right side
    ctx.beginPath();
    ctx.moveTo(550, 280);
    ctx.lineTo(750, 280);
    ctx.stroke();
    
    // Add some test patterns to make sure texture is visible
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(50, 50, 100, 20);
    ctx.fillRect(874, 50, 100, 20);
    ctx.fillRect(50, 442, 100, 20);
    ctx.fillRect(874, 442, 100, 20);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.flipY = false; // Important for proper orientation
  return texture;
}

function DodgeCharger({ activeStep, scrollProgress, mouseRotationX, mouseRotationY }: CarModelProps) {
  const group = useRef<THREE.Group>(null);
  const [proTintTexture, setProTintTexture] = useState<THREE.CanvasTexture | null>(null);
  
  // Load the GLTF model
  const { scene } = useGLTF('/models/american_police_car_gltf/scene.gltf');
  
  // Create the custom texture once
  useEffect(() => {
    const texture = createProTintTexture();
    setProTintTexture(texture);
  }, []);
  
  useEffect(() => {
    if (scene && group.current && proTintTexture) {
      group.current.clear();
      
      // Clone the scene to avoid issues
      const carModel = scene.clone();
      
      // Scale and position the model
      carModel.scale.setScalar(1.74); // Reduced by 2% from 1.78
      carModel.position.set(0, -0.8, 0); // Adjusted position
      carModel.rotation.y = Math.PI; // Rotate 180 degrees to face forward
      
      // Apply materials based on activeStep
      carModel.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          // Debug: Log material names to see what we're working with
          console.log('Material name:', child.material.name || 'unnamed');
          
          // Enhance materials
          if (Array.isArray(child.material)) {
            child.material.forEach((mat, index) => {
              mat.metalness = 0.8;
              mat.roughness = 0.2;
              
              // Apply custom texture to car paint materials
              if (mat.name === 'Car_Paint' || mat.name === 'Secondary_Car_Paint') {
                console.log('Applying texture to material:', mat.name);
                mat.map = proTintTexture;
                mat.needsUpdate = true;
              }
            });
          } else {
            child.material.metalness = 0.8;
            child.material.roughness = 0.2;
            
            // Apply custom texture to car paint materials
            if (child.material.name === 'Car_Paint' || child.material.name === 'Secondary_Car_Paint') {
              console.log('Applying texture to single material:', child.material.name);
              child.material.map = proTintTexture;
              child.material.needsUpdate = true;
            }
          }
          
          // Color wheels/rims based on scroll step
          if (child.name.toLowerCase().includes('wheel') || 
              child.name.toLowerCase().includes('rim') ||
              child.name.toLowerCase().includes('tire')) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.color.setHex(activeStep >= 1 ? 0xffd700 : 0x333333);
                mat.emissive.setHex(activeStep >= 1 ? 0xffd700 : 0x000000);
                mat.emissiveIntensity = activeStep >= 1 ? 0.15 : 0;
              });
            } else {
              child.material.color.setHex(activeStep >= 1 ? 0xffd700 : 0x333333);
              child.material.emissive.setHex(activeStep >= 1 ? 0xffd700 : 0x000000);
              child.material.emissiveIntensity = activeStep >= 1 ? 0.15 : 0;
            }
          }
          
          // Color windows/glass based on scroll step
          if (child.name.toLowerCase().includes('window') || 
              child.name.toLowerCase().includes('glass') ||
              child.name.toLowerCase().includes('windshield')) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.color.setHex(activeStep >= 2 ? 0xffd700 : 0x111111);
                mat.emissive.setHex(activeStep >= 2 ? 0xffd700 : 0x000000);
                mat.emissiveIntensity = activeStep >= 2 ? 0.1 : 0;
                mat.transparent = true;
                mat.opacity = 0.7;
              });
            } else {
              child.material.color.setHex(activeStep >= 2 ? 0xffd700 : 0x111111);
              child.material.emissive.setHex(activeStep >= 2 ? 0xffd700 : 0x000000);
              child.material.emissiveIntensity = activeStep >= 2 ? 0.1 : 0;
              child.material.transparent = true;
              child.material.opacity = 0.7;
            }
          }
          
          // Color lights based on scroll step
          if (child.name.toLowerCase().includes('light') || 
              child.name.toLowerCase().includes('headlight') ||
              child.name.toLowerCase().includes('lamp')) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                mat.color.setHex(activeStep >= 3 ? 0xffd700 : 0xffffff);
                mat.emissive.setHex(activeStep >= 3 ? 0xffd700 : 0xffffff);
                mat.emissiveIntensity = activeStep >= 3 ? 0.8 : 0.3;
              });
            } else {
              child.material.color.setHex(activeStep >= 3 ? 0xffd700 : 0xffffff);
              child.material.emissive.setHex(activeStep >= 3 ? 0xffd700 : 0xffffff);
              child.material.emissiveIntensity = activeStep >= 3 ? 0.8 : 0.3;
            }
          }
          
          // Color body/paint based on scroll step
          if (child.name.toLowerCase().includes('body') || 
              child.name.toLowerCase().includes('paint') ||
              child.name.toLowerCase().includes('exterior')) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                // Apply our custom texture to body parts too
                mat.map = proTintTexture;
                mat.color.setHex(activeStep >= 0 ? 0x1a1a1a : 0x333333);
                mat.emissive.setHex(activeStep >= 0 ? 0xffd700 : 0x000000);
                mat.emissiveIntensity = activeStep >= 0 ? 0.02 : 0;
                mat.needsUpdate = true;
              });
            } else {
              // Apply our custom texture to body parts too
              child.material.map = proTintTexture;
              child.material.color.setHex(activeStep >= 0 ? 0x1a1a1a : 0x333333);
              child.material.emissive.setHex(activeStep >= 0 ? 0xffd700 : 0x000000);
              child.material.emissiveIntensity = activeStep >= 0 ? 0.02 : 0;
              child.material.needsUpdate = true;
            }
          }
        }
      });
      
      group.current.add(carModel);
    }
  }, [scene, activeStep, proTintTexture]);

  useFrame(() => {
    if (group.current) {
      // Combine scroll rotation and mouse rotation
      const scrollRotation = scrollProgress * Math.PI * 2;
      group.current.rotation.y = Math.PI + scrollRotation + mouseRotationX;
      group.current.rotation.x = mouseRotationY;
      
      // Scroll-based vertical movement
      group.current.position.y = -0.8 + (scrollProgress * 1);
      
      // Scroll-based scale - car grows slightly as you scroll
      const scale = 1.74 + (scrollProgress * 0.2);
      group.current.scale.setScalar(scale);
      
      // Rotate wheels based on scroll (like the car is driving)
      group.current.traverse((child) => {
        if (child.name.toLowerCase().includes('wheel') || 
            child.name.toLowerCase().includes('tire')) {
          child.rotation.x = scrollProgress * Math.PI * 4; // Multiple rotations
        }
      });
    }
  });

  return <group ref={group} />;
}

interface CarViewerProps {
  activeStep: number;
}

export default function CarViewer({ activeStep }: CarViewerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseRotationX, setMouseRotationX] = useState(0);
  const [mouseRotationY, setMouseRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(Math.min(scrollPercent, 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset rotations on component mount (page refresh)
  useEffect(() => {
    setMouseRotationX(0);
    setMouseRotationY(0);
  }, []);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(event.clientX);
    setLastMouseY(event.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;
      
      // Horizontal movement controls Y-axis rotation (left/right)
      setMouseRotationX(prev => prev + deltaX * 0.01);
      
      // Vertical movement controls X-axis rotation (up/down)
      // Clamp the vertical rotation to prevent flipping upside down
      setMouseRotationY(prev => {
        const newRotation = prev - deltaY * 0.01; // Negative for intuitive movement
        return Math.max(-Math.PI / 3, Math.min(Math.PI / 3, newRotation)); // Limit to ±60 degrees
      });
      
      setLastMouseX(event.clientX);
      setLastMouseY(event.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="car-viewer-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <Canvas
        camera={{ 
          position: [15, 8, 15], 
          fov: 45,
          near: 0.1,
          far: 2000
        }}
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Professional automotive lighting */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight 
          position={[15, 10, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
        />
        <directionalLight 
          position={[-10, 8, -5]} 
          intensity={0.6} 
          color="#ffd700"
        />
        <pointLight 
          position={[0, 8, 0]} 
          intensity={0.4} 
          color="#ffb347"
        />
        
        <Environment preset="night" />
        
        <DodgeCharger activeStep={activeStep} scrollProgress={scrollProgress} mouseRotationX={mouseRotationX} mouseRotationY={mouseRotationY} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

// Preload the GLTF model
useGLTF.preload('/models/american_police_car_gltf/scene.gltf'); 