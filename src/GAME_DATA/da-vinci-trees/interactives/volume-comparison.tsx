import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VolumeComparisonInteraction } from './interface';

interface VolumeComparisonProps {
  interaction: VolumeComparisonInteraction;
}

const VolumeComparison: React.FC<VolumeComparisonProps> = ({ interaction }) => {
  const { ariaLabel } = interaction;

  // Parameters
  const [height, setHeight] = useState(22);
  const [radius, setRadius] = useState(0.25);
  const [formFactor, setFormFactor] = useState(0.5);

  // Volume calculations
  const cylinderVolume = Math.PI * radius * radius * height;
  const coneVolume = (1 / 3) * Math.PI * radius * radius * height;
  const formFactorVolume = formFactor * Math.PI * radius * radius * height;
  // Ratio for educational purposes
  const _ratio = cylinderVolume / coneVolume;
  void _ratio; // Suppress unused warning

  // Three.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cylinderMeshRef = useRef<THREE.Mesh | null>(null);
  const coneMeshRef = useRef<THREE.Mesh | null>(null);
  const formFactorMeshRef = useRef<THREE.Mesh | null>(null);

  const cylinderColor = 0x3b82f6;
  const coneColor = 0xf59e0b;
  const formFactorColor = 0x8b5cf6;
  const groundColor = 0x4a7c31;

  const VISUAL_SCALE = 10;

  // Initialize Three.js scene
  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 100, 400);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 500);
    camera.position.set(30, 20, 50);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(30, 50, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.3);
    fillLight.position.set(-20, 20, -20);
    scene.add(fillLight);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshStandardMaterial({
      color: groundColor,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid helper
    const grid = new THREE.GridHelper(100, 20, 0x3a5f3a, 0x3a5f3a);
    grid.position.y = 0.01;
    scene.add(grid);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 15, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 150;
    controlsRef.current = controls;
  }, []);

  // Create/update shapes
  const updateShapes = useCallback(() => {
    if (!sceneRef.current || !controlsRef.current) return;

    const scaledRadius = radius * VISUAL_SCALE;
    const displayHeight = height;

    // Clean up old meshes
    if (cylinderMeshRef.current) {
      sceneRef.current.remove(cylinderMeshRef.current);
      cylinderMeshRef.current.geometry.dispose();
      (cylinderMeshRef.current.material as THREE.Material).dispose();
    }
    if (coneMeshRef.current) {
      sceneRef.current.remove(coneMeshRef.current);
      coneMeshRef.current.geometry.dispose();
      (coneMeshRef.current.material as THREE.Material).dispose();
    }
    if (formFactorMeshRef.current) {
      sceneRef.current.remove(formFactorMeshRef.current);
      formFactorMeshRef.current.geometry.dispose();
      (formFactorMeshRef.current.material as THREE.Material).dispose();
    }

    // Cylinder (left)
    const cylinderGeo = new THREE.CylinderGeometry(scaledRadius, scaledRadius, displayHeight, 32);
    const cylinderMat = new THREE.MeshStandardMaterial({
      color: cylinderColor,
      transparent: true,
      opacity: 0.7,
      roughness: 0.3,
      metalness: 0.1,
    });
    const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderMesh.position.set(-15, displayHeight / 2, 0);
    cylinderMesh.castShadow = true;
    sceneRef.current.add(cylinderMesh);
    cylinderMeshRef.current = cylinderMesh;

    // Cone (center)
    const coneGeo = new THREE.ConeGeometry(scaledRadius, displayHeight, 32);
    const coneMat = new THREE.MeshStandardMaterial({
      color: coneColor,
      transparent: true,
      opacity: 0.7,
      roughness: 0.3,
      metalness: 0.1,
    });
    const coneMesh = new THREE.Mesh(coneGeo, coneMat);
    coneMesh.position.set(0, displayHeight / 2, 0);
    coneMesh.castShadow = true;
    sceneRef.current.add(coneMesh);
    coneMeshRef.current = coneMesh;

    // Form factor adjusted (right)
    const adjustedHeight = displayHeight * formFactor;
    const ffGeo = new THREE.CylinderGeometry(scaledRadius * 0.9, scaledRadius, adjustedHeight, 32);
    const ffMat = new THREE.MeshStandardMaterial({
      color: formFactorColor,
      transparent: true,
      opacity: 0.7,
      roughness: 0.3,
      metalness: 0.1,
    });
    const ffMesh = new THREE.Mesh(ffGeo, ffMat);
    ffMesh.position.set(15, adjustedHeight / 2, 0);
    ffMesh.castShadow = true;
    sceneRef.current.add(ffMesh);
    formFactorMeshRef.current = ffMesh;

    // Update camera target
    controlsRef.current.target.set(0, displayHeight / 2, 0);
  }, [height, radius, formFactor]);

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

  // Reset function kept for future use
  // const handleReset = () => {
  //   setHeight(22);
  //   setRadius(0.25);
  //   setFormFactor(0.5);
  // };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 3D Visualization - Takes most space */}
      <div
        ref={containerRef}
        className="flex-1 rounded-t-lg overflow-hidden"
        style={{ minHeight: '200px' }}
        aria-label={ariaLabel}
        role="img"
      />

      {/* Enhanced Controls */}
      <div className="bg-white/95 rounded-b-lg p-3 shadow-lg">
        {/* Visual Volume Comparison Bar */}
        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-700 mb-1">Volume Comparison (cylinder = 100%)</div>
          <div className="relative h-6 bg-gray-100 rounded overflow-hidden">
            <div
              className="absolute h-full bg-blue-400 opacity-50"
              style={{ width: '100%' }}
            />
            <div
              className="absolute h-full bg-purple-500"
              style={{ width: `${(formFactor) * 100}%` }}
            />
            <div
              className="absolute h-full bg-amber-400 opacity-70"
              style={{ width: '33.3%' }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-medium">
              <span className="text-amber-800">Cone: 33%</span>
              <span className="text-purple-900">Real tree: {(formFactor * 100).toFixed(0)}%</span>
              <span className="text-blue-800">Cylinder: 100%</span>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span>Height (h)</span>
              <span className="font-mono text-gray-600">{height} m</span>
            </label>
            <input
              type="range"
              min="5"
              max="40"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span>Radius (r)</span>
              <span className="font-mono text-gray-600">{radius.toFixed(2)} m</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="0.6"
              step="0.01"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span>Form Factor (f)</span>
              <span className="font-mono text-gray-600">{formFactor.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.3"
              max="0.7"
              step="0.01"
              value={formFactor}
              onChange={(e) => setFormFactor(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Volume Display with Formulas */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-blue-50 rounded px-2 py-1.5 border border-blue-200">
            <div className="text-[10px] text-blue-600 font-medium">Cylinder (Deciduous)</div>
            <div className="text-[9px] text-blue-500 font-mono">V = πr²h</div>
            <div className="font-mono font-bold text-blue-700">{cylinderVolume.toFixed(2)} m³</div>
          </div>
          <div className="bg-amber-50 rounded px-2 py-1.5 border border-amber-200">
            <div className="text-[10px] text-amber-600 font-medium">Cone (Conifer)</div>
            <div className="text-[9px] text-amber-500 font-mono">V = ⅓πr²h</div>
            <div className="font-mono font-bold text-amber-700">{coneVolume.toFixed(2)} m³</div>
          </div>
          <div className="bg-purple-50 rounded px-2 py-1.5 border border-purple-300">
            <div className="text-[10px] text-purple-600 font-medium">Real Tree</div>
            <div className="text-[9px] text-purple-500 font-mono">V = f×πr²h</div>
            <div className="font-mono font-bold text-purple-700">{formFactorVolume.toFixed(2)} m³</div>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-gray-500 text-center">
          Real trees (f ≈ 0.4-0.6) are between cylinder and cone models
        </div>
      </div>
    </div>
  );
};

export default VolumeComparison;
