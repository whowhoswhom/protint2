'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import type { MuscleContent, MuscleId } from '../data/muscles';

const BODY_ROTATION = 0.35;

interface HumanoidModelProps {
  muscles: MuscleContent[];
  activeMuscleId: MuscleId;
  onMuscleSelect: (id: MuscleId) => void;
  onMuscleHover?: (id: MuscleId | null) => void;
  gender: 'male' | 'female';
}

type MuscleMesh = {
  id: MuscleId;
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
};

const MUSCLE_MESHES: MuscleMesh[] = [
  { id: 'chest', position: [0, 1.3, 0.32], scale: [0.7, 0.4, 0.3], rotation: [0.2, 0, 0] },
  { id: 'shoulders', position: [0, 1.6, 0.1], scale: [1, 0.25, 0.4] },
  { id: 'arms', position: [0, 1.05, 0.1], scale: [1.1, 0.25, 0.3] },
  { id: 'back', position: [0, 1.25, -0.25], scale: [0.8, 0.6, 0.3], rotation: [-0.2, 0, 0] },
  { id: 'core', position: [0, 0.7, 0.25], scale: [0.65, 0.55, 0.28] },
  { id: 'glutes', position: [0, 0.25, -0.25], scale: [0.7, 0.35, 0.3] },
  { id: 'quads', position: [0, -0.1, 0.3], scale: [0.6, 0.65, 0.3] },
  { id: 'hamstrings', position: [0, -0.15, -0.3], scale: [0.6, 0.65, 0.3] },
  { id: 'calves', position: [0, -0.9, 0], scale: [0.5, 0.6, 0.25] },
];

const torsoMaterial = new THREE.MeshStandardMaterial({
  color: '#2d2e34',
  roughness: 0.7,
  metalness: 0.05,
});

const limbMaterial = torsoMaterial.clone();
limbMaterial.color = new THREE.Color('#1f2027');

function BaseHumanoid({ gender }: { gender: 'male' | 'female' }) {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = BODY_ROTATION;
  }, []);

  return (
    <group ref={group}>
      <mesh position={[0, 1.3, 0]} material={torsoMaterial}>
        <cylinderGeometry args={[0.55, gender === 'male' ? 0.5 : 0.45, 1.4, 32]} />
      </mesh>
      <mesh position={[0, 2.15, 0.05]} material={torsoMaterial}>
        <sphereGeometry args={[0.4, 32, 32]} />
      </mesh>
      <mesh position={[0, 0.25, 0]} material={torsoMaterial}>
        <cylinderGeometry args={[0.45, 0.55, 1.1, 32]} />
      </mesh>
      <mesh position={[0, -1.1, 0]} material={torsoMaterial}>
        <cylinderGeometry args={[0.4, 0.5, 1.2, 32]} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.8, 1.2, 0]} rotation={[0, 0, Math.PI / 2]} material={limbMaterial}>
        <cylinderGeometry args={[0.18, 0.18, 1.4, 32]} />
      </mesh>
      <mesh position={[0.8, 1.2, 0]} rotation={[0, 0, Math.PI / 2]} material={limbMaterial}>
        <cylinderGeometry args={[0.18, 0.18, 1.4, 32]} />
      </mesh>
      {/* Forearms */}
      <mesh position={[-1.35, 0.6, 0]} rotation={[0, 0, Math.PI / 2]} material={limbMaterial}>
        <cylinderGeometry args={[0.14, 0.14, 1.1, 32]} />
      </mesh>
      <mesh position={[1.35, 0.6, 0]} rotation={[0, 0, Math.PI / 2]} material={limbMaterial}>
        <cylinderGeometry args={[0.14, 0.14, 1.1, 32]} />
      </mesh>
      {/* Upper legs */}
      <mesh position={[-0.45, -0.35, 0]} rotation={[0, 0, Math.PI / 70]} material={limbMaterial}>
        <cylinderGeometry args={[0.22, 0.25, 1.4, 32]} />
      </mesh>
      <mesh position={[0.45, -0.35, 0]} rotation={[0, 0, -Math.PI / 70]} material={limbMaterial}>
        <cylinderGeometry args={[0.22, 0.25, 1.4, 32]} />
      </mesh>
      {/* Lower legs */}
      <mesh position={[-0.5, -1.7, 0]} rotation={[0, 0, Math.PI / 90]} material={limbMaterial}>
        <cylinderGeometry args={[0.18, 0.2, 1.3, 32]} />
      </mesh>
      <mesh position={[0.5, -1.7, 0]} rotation={[0, 0, -Math.PI / 90]} material={limbMaterial}>
        <cylinderGeometry args={[0.18, 0.2, 1.3, 32]} />
      </mesh>
    </group>
  );
}

function MuscleLayer({
  activeMuscleId,
  muscles,
  onMuscleSelect,
  onMuscleHover,
}: {
  activeMuscleId: MuscleId;
  muscles: MuscleContent[];
  onMuscleSelect: (id: MuscleId) => void;
  onMuscleHover?: (id: MuscleId | null) => void;
}) {
  const meshRefs = useRef<Record<MuscleId, THREE.Mesh>>({} as Record<MuscleId, THREE.Mesh>);

  const muscleMap = useMemo(() => {
    const map: Record<MuscleId, MuscleContent> = {} as Record<MuscleId, MuscleContent>;
    muscles.forEach((muscle) => {
      map[muscle.id] = muscle;
    });
    return map;
  }, [muscles]);

  useFrame(() => {
    MUSCLE_MESHES.forEach(({ id }) => {
      const mesh = meshRefs.current[id];
      if (!mesh) {
        return;
      }
      const isActive = id === activeMuscleId;
      const targetScale = isActive ? 1.08 : 1;
      mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        const mat = material as THREE.MeshStandardMaterial;
        mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, isActive ? 0.9 : 0.35, 0.1);
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isActive ? 0.4 : 0.05, 0.1);
      });
    });
  });

  return (
    <group>
      {MUSCLE_MESHES.map((config) => {
        const { id, position, scale, rotation } = config;
        const muscle = muscleMap[id];
        const color = new THREE.Color(muscle?.highlightColor ?? '#ff6b6b');
        return (
          <mesh
            key={id}
            position={position}
            scale={scale}
            rotation={rotation}
            ref={(ref) => {
              if (ref) {
                meshRefs.current[id] = ref;
              }
            }}
            onClick={(event) => {
              event.stopPropagation();
              onMuscleSelect(id);
            }}
            onPointerOver={(event) => {
              event.stopPropagation();
              onMuscleHover?.(id);
            }}
            onPointerOut={(event) => {
              event.stopPropagation();
              onMuscleHover?.(null);
            }}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.35}
              emissive={color.clone().multiplyScalar(0.3)}
              emissiveIntensity={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function HumanoidScene({
  muscles,
  activeMuscleId,
  onMuscleSelect,
  onMuscleHover,
  gender,
}: HumanoidModelProps) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(t * 0.5) * 0.1;
      lightRef.current.position.set(Math.sin(t * 0.2) * 4, 5, Math.cos(t * 0.2) * 4);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={0.6} />
      <directionalLight ref={lightRef} position={[2, 5, 4]} intensity={2.2} castShadow />
      <pointLight position={[-3, 3, -3]} intensity={0.6} />
      <BaseHumanoid gender={gender} />
      <MuscleLayer
        activeMuscleId={activeMuscleId}
        muscles={muscles}
        onMuscleSelect={onMuscleSelect}
        onMuscleHover={onMuscleHover}
      />
    </group>
  );
}

export default function HumanoidModel(props: HumanoidModelProps) {
  const { muscles, activeMuscleId, onMuscleSelect, onMuscleHover, gender } = props;

  return (
    <Canvas
      camera={{ position: [0, 1.2, 4], fov: 35 }}
      shadows
      className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-black"
    >
      <color attach="background" args={[0x0b0d14]} />
      <HumanoidScene
        muscles={muscles}
        activeMuscleId={activeMuscleId}
        onMuscleSelect={onMuscleSelect}
        onMuscleHover={onMuscleHover}
        gender={gender}
      />
      <Environment preset="city" background={false} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(Math.PI * 3) / 4}
      />
    </Canvas>
  );
}
