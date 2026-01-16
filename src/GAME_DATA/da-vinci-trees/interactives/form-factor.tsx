import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface FormFactorInteraction {
  type: 'form-factor';
  title: string;
  ariaLabel: string;
}

interface FormFactorProps {
  interaction: FormFactorInteraction;
}

const FormFactor: React.FC<FormFactorProps> = ({ interaction }) => {
  const { ariaLabel } = interaction;

  const [formFactor, setFormFactor] = useState(0.5);
  const [showLabels, setShowLabels] = useState(true);

  // Three.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  const height = 20;
  const radius = 3;

  // Calculate volumes
  const cylinderVolume = Math.PI * radius * radius * height;
  const coneVolume = (1 / 3) * Math.PI * radius * radius * height;
  const realTreeVolume = formFactor * cylinderVolume;

  // Initialize Three.js scene
  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, containerWidth / containerHeight, 0.1, 500);
    camera.position.set(25, 15, 35);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(100, 100);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x4a7c31,
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, height / 2, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 80;
    controlsRef.current = controls;
  }, []);

  // Create/update shapes
  const updateShapes = useCallback(() => {
    if (!sceneRef.current) return;

    // Clean up old meshes
    meshesRef.current.forEach((mesh) => {
      sceneRef.current?.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
    meshesRef.current = [];

    const spacing = 12;

    // Cylinder (left) - f = 1.0
    const cylinderGeo = new THREE.CylinderGeometry(radius, radius, height, 32);
    const cylinderMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.75,
    });
    const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinder.position.set(-spacing, height / 2, 0);
    cylinder.castShadow = true;
    sceneRef.current.add(cylinder);
    meshesRef.current.push(cylinder);

    // Real tree shape (center) - tapered paraboloid approximation
    // Create a custom geometry that's between cylinder and cone
    const realTreeGeo = new THREE.CylinderGeometry(
      radius * 0.3, // top radius
      radius, // bottom radius
      height * formFactor * 1.5, // adjusted height to show form factor effect
      32
    );
    const realTreeMat = new THREE.MeshStandardMaterial({
      color: 0x16a34a,
      transparent: true,
      opacity: 0.85,
    });
    const realTree = new THREE.Mesh(realTreeGeo, realTreeMat);
    realTree.position.set(0, (height * formFactor * 1.5) / 2, 0);
    realTree.castShadow = true;
    sceneRef.current.add(realTree);
    meshesRef.current.push(realTree);

    // Cone (right) - f = 0.33
    const coneGeo = new THREE.ConeGeometry(radius, height, 32);
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.75,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.set(spacing, height / 2, 0);
    cone.castShadow = true;
    sceneRef.current.add(cone);
    meshesRef.current.push(cone);

    // Update camera target
    if (controlsRef.current) {
      controlsRef.current.target.set(0, height / 2, 0);
    }
  }, [formFactor]);

  // Initialize Three.js on mount
  useEffect(() => {
    initThree();
    return () => {
      if (rendererRef.current && containerRef.current) {
        const domElement = rendererRef.current.domElement;
        if (domElement && containerRef.current.contains(domElement)) {
          containerRef.current.removeChild(domElement);
        }
        rendererRef.current.dispose();
      }
    };
  }, [initThree]);

  // Update shapes when parameters change
  useEffect(() => {
    updateShapes();
  }, [updateShapes]);

  // Animation loop
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (controlsRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
        controlsRef.current.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 3D Visualization */}
      <div className="relative flex-1" style={{ minHeight: '220px' }}>
        <div
          ref={containerRef}
          className="w-full h-full rounded-t-lg overflow-hidden"
          aria-label={ariaLabel}
          role="img"
        />

        {/* Floating labels */}
        {showLabels && (
          <div className="absolute top-2 left-2 right-2 flex justify-between pointer-events-none">
            <div className="bg-blue-500/90 text-white px-2 py-1 rounded text-xs font-bold">
              Cylinder (f=1.0)
            </div>
            <div className="bg-green-600/90 text-white px-2 py-1 rounded text-xs font-bold">
              Real Tree (f={formFactor.toFixed(2)})
            </div>
            <div className="bg-amber-500/90 text-white px-2 py-1 rounded text-xs font-bold">
              Cone (f=0.33)
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white/95 rounded-b-lg p-3 shadow-lg">
        {/* Form factor slider */}
        <div className="mb-3">
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Form Factor (f)</span>
            <span className="font-mono text-green-700 font-bold">{formFactor.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.33"
            max="1.0"
            step="0.01"
            value={formFactor}
            onChange={(e) => setFormFactor(parseFloat(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-amber-300 via-green-400 to-blue-400 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Cone (0.33)</span>
            <span>Real trees: 0.4-0.6</span>
            <span>Cylinder (1.0)</span>
          </div>
        </div>

        {/* Volume comparison */}
        <div className="grid grid-cols-3 gap-2 text-center mb-2">
          <div className="bg-blue-50 rounded px-2 py-1.5">
            <div className="text-xs text-blue-600">Cylinder</div>
            <div className="font-mono text-sm font-bold text-blue-700">{cylinderVolume.toFixed(1)} m³</div>
          </div>
          <div className="bg-green-50 rounded px-2 py-1.5 border-2 border-green-300">
            <div className="text-xs text-green-600">Real Tree</div>
            <div className="font-mono text-sm font-bold text-green-700">{realTreeVolume.toFixed(1)} m³</div>
          </div>
          <div className="bg-amber-50 rounded px-2 py-1.5">
            <div className="text-xs text-amber-600">Cone</div>
            <div className="font-mono text-sm font-bold text-amber-700">{coneVolume.toFixed(1)} m³</div>
          </div>
        </div>

        {/* Formula */}
        <div className="text-center text-sm bg-gray-50 rounded py-1.5 px-2">
          <span className="text-gray-600">V = </span>
          <span className="font-bold text-green-700">f</span>
          <span className="text-gray-600"> × πr²h = </span>
          <span className="font-bold text-green-700">{formFactor.toFixed(2)}</span>
          <span className="text-gray-600"> × {cylinderVolume.toFixed(1)} = </span>
          <span className="font-bold text-green-700">{realTreeVolume.toFixed(1)} m³</span>
        </div>

        {/* Toggle labels button */}
        <div className="mt-2 flex justify-end">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showLabels ? 'Hide labels' : 'Show labels'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormFactor;
