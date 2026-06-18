import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { MitochondrionExplorerInteraction, InteractionState } from './interface';

interface Props {
  interaction: MitochondrionExplorerInteraction;
  interactionState?: InteractionState;
  onInteraction: (state: InteractionState) => void;
  onSubmit?: () => void;
  isSubmitTriggered?: boolean;
}

const MODEL_URL = '/assets/models/mitochondrion.glb';
useGLTF.preload(MODEL_URL);

// Each part of the mitochondrion maps to one or more glTF material names.
type PartKey = 'outer' | 'space' | 'cristae' | 'matrix';

interface PartDef {
  key: PartKey;
  label: string;
  materials: string[];
  explanation: string;
}

const PARTS: PartDef[] = [
  {
    key: 'outer',
    label: 'Outer membrane',
    materials: ['MitochondrialMembrane'],
    explanation: 'The smooth outer wall — the outer boundary, fairly porous.',
  },
  {
    key: 'space',
    label: 'Intermembrane space',
    materials: ['MitochondrialMembrane', 'InnerMembraneMat'],
    explanation:
      "The narrow gap between the two membranes — where protons pile up to power the turbines (the 'dam').",
  },
  {
    key: 'cristae',
    label: 'Cristae (inner folds)',
    materials: ['CristaeMembrane', 'InnerMembraneMat', 'ATPSynthase'],
    explanation:
      'The deep folds of the inner membrane — they pack in huge surface area for the energy machinery (and you can see the ATP-synthase knobs studded along them). THIS is the key idea.',
  },
  {
    key: 'matrix',
    label: 'Matrix',
    materials: ['Matrix', 'Ribosome', 'mtDNA'],
    explanation:
      "The inner fluid space — home to the energy reactions, ribosomes, and the mitochondrion's own circular DNA.",
  },
];

// Base recolor spec for each glTF material name.
interface ColorSpec {
  color: string;
  opacity: number;
  emissive: string;
  emissiveIntensity: number;
  transparent: boolean;
}

const PALETTE: Record<string, ColorSpec> = {
  MitochondrialMembrane: { color: '#e7c869', opacity: 0.18, emissive: '#000000', emissiveIntensity: 0, transparent: true },
  InnerMembraneMat: { color: '#5aa9ff', opacity: 0.3, emissive: '#000000', emissiveIntensity: 0, transparent: true },
  CristaeMembrane: { color: '#3f7fff', opacity: 0.95, emissive: '#1b3a8a', emissiveIntensity: 0.4, transparent: true },
  Matrix: { color: '#3a2363', opacity: 0.35, emissive: '#000000', emissiveIntensity: 0, transparent: true },
  ATPSynthase: { color: '#0E7C86', opacity: 1, emissive: '#0E7C86', emissiveIntensity: 0.25, transparent: false },
  Ribosome: { color: '#E0552B', opacity: 1, emissive: '#000000', emissiveIntensity: 0, transparent: false },
  mtDNA: { color: '#ffd166', opacity: 1, emissive: '#ffd166', emissiveIntensity: 0.5, transparent: false },
};

interface ModelProps {
  selected: PartKey | null;
}

const Mitochondrion: React.FC<ModelProps> = ({ selected }) => {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  // Clone the scene + recolor materials once. Group materials by name so we
  // can re-emphasize them on selection without mutating drei's cached scene.
  const { root, byMaterial } = useMemo(() => {
    const clone = scene.clone(true) as THREE.Group;
    const map = new Map<string, THREE.MeshStandardMaterial[]>();

    clone.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const src = mesh.material as THREE.Material;
      const name = src.name;
      const spec = PALETTE[name];
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(spec ? spec.color : '#cccccc'),
        transparent: spec ? spec.transparent : false,
        opacity: spec ? spec.opacity : 1,
        emissive: new THREE.Color(spec ? spec.emissive : '#000000'),
        emissiveIntensity: spec ? spec.emissiveIntensity : 0,
        roughness: 0.5,
        metalness: 0,
      });
      mat.name = name;
      if (mat.transparent) mat.depthWrite = false;
      mesh.material = mat;

      const list = map.get(name) ?? [];
      list.push(mat);
      map.set(name, list);
    });

    // Center + scale the cloned model to a consistent target size.
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const target = 3.2;
    const scale = target / maxDim;
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    clone.scale.setScalar(scale);

    return { root: clone, byMaterial: map };
  }, [scene]);

  // Re-apply emphasis whenever the selected part changes.
  useEffect(() => {
    const emphasized = new Set<string>();
    if (selected) {
      const def = PARTS.find((p) => p.key === selected);
      def?.materials.forEach((m) => emphasized.add(m));
    }

    byMaterial.forEach((mats, name) => {
      const base = PALETTE[name];
      if (!base) return;
      const isOn = emphasized.has(name);
      mats.forEach((mat) => {
        if (selected === null) {
          mat.transparent = base.transparent;
          mat.depthWrite = !base.transparent;
          mat.opacity = base.opacity;
          mat.emissiveIntensity = base.emissiveIntensity;
        } else if (isOn) {
          // Brighten / make targeted parts more solid.
          mat.transparent = base.transparent;
          mat.depthWrite = !base.transparent;
          mat.opacity = base.transparent ? Math.min(1, Math.max(0.6, base.opacity + 0.45)) : base.opacity;
          mat.emissiveIntensity = base.emissiveIntensity + 0.35;
        } else {
          // Dim everything else.
          mat.transparent = true;
          mat.depthWrite = false;
          mat.opacity = base.transparent ? base.opacity * 0.5 : 0.35;
          mat.emissiveIntensity = 0;
        }
        mat.needsUpdate = true;
      });
    });
  }, [selected, byMaterial]);

  return (
    <group ref={groupRef}>
      <primitive object={root} />
    </group>
  );
};

const MitochondrionExplorer: React.FC<Props> = ({ onInteraction }) => {
  const [selected, setSelected] = useState<PartKey | null>(null);
  const [explored, setExplored] = useState<Set<PartKey>>(new Set());
  const reported = useRef(false);

  const select = (key: PartKey) => {
    setSelected((prev) => (prev === key ? null : key));
    setExplored((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    if (!reported.current) {
      reported.current = true;
      onInteraction({ isCorrect: true, isEmpty: false, value: key });
    }
  };

  const current = selected ? PARTS.find((p) => p.key === selected) ?? null : null;

  return (
    <div className="w-full h-full flex flex-col" style={{ color: '#fff' }}>
      <div className="flex-1" style={{ minHeight: 280 }}>
        <Canvas
          camera={{ position: [0, 0.5, 6], fov: 45 }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 14,
            background: 'radial-gradient(circle at 50% 40%, #14213a 0%, #070d1c 100%)',
          }}
          aria-label="Interactive 3D mitochondrion explorer"
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 5]} intensity={1.1} />
          <directionalLight position={[-4, -2, -3]} intensity={0.4} />
          <Suspense fallback={null}>
            <Mitochondrion selected={selected} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.8} enableDamping />
        </Canvas>
      </div>

      <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.96)', color: '#222', marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {PARTS.map((part) => {
            const active = selected === part.key;
            const seen = explored.has(part.key);
            return (
              <button
                key={part.key}
                onClick={() => select(part.key)}
                style={{
                  background: active ? '#3f7fff' : seen ? '#dde8ff' : '#eef0f4',
                  color: active ? '#fff' : '#222',
                  border: active ? '2px solid #1b3a8a' : '2px solid transparent',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {part.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 13, minHeight: 38, color: '#333' }}>
          {current ? (
            <span>
              <strong>{current.label}:</strong> {current.explanation}
            </span>
          ) : (
            <span style={{ color: '#666' }}>
              Drag to rotate. Tap a part below to highlight it in 3D and learn what it does.
            </span>
          )}
        </div>

        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: '#0E7C86',
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid #eee',
          }}
        >
          Key idea: cristae fold to maximize surface area = more room for the machinery that makes energy
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#E0552B' }}>
            {explored.size} / {PARTS.length} parts explored
          </span>
          <span style={{ fontSize: 11, color: '#777' }}>
            You&apos;re looking at ONE mitochondrion — a single muscle cell holds ~1,000–2,000 of them.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MitochondrionExplorer;
