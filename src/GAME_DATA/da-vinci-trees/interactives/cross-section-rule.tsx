import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface CrossSectionRuleInteraction {
  type: 'cross-section-rule';
  title: string;
  ariaLabel: string;
}

interface CrossSectionRuleProps {
  interaction: CrossSectionRuleInteraction;
}

const CrossSectionRule: React.FC<CrossSectionRuleProps> = ({ interaction }) => {
  const { ariaLabel } = interaction;

  // Parameters
  const [trunkRadius, setTrunkRadius] = useState(1.0);
  const [splitRatio, setSplitRatio] = useState(0.5);
  const [branchAngle, setBranchAngle] = useState(35);
  const [showSlices, setShowSlices] = useState(true);

  // Three.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const treeGroupRef = useRef<THREE.Group | null>(null);

  // Calculate branch radii based on Da Vinci's rule: r² = r1² + r2²
  const branch1Radius = trunkRadius * Math.sqrt(splitRatio);
  const branch2Radius = trunkRadius * Math.sqrt(1 - splitRatio);

  // Area calculations
  const trunkArea = Math.PI * trunkRadius * trunkRadius;
  const branch1Area = Math.PI * branch1Radius * branch1Radius;
  const branch2Area = Math.PI * branch2Radius * branch2Radius;
  const totalBranchArea = branch1Area + branch2Area;
  const conservationPercent = (totalBranchArea / trunkArea) * 100;

  const barkColor = 0x8b5a2b;
  const sliceColor = 0xd4a574;
  const groundColor = 0x4a7c31;

  // Initialize Three.js scene
  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 30, 100);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, containerWidth / containerHeight, 0.1, 200);
    camera.position.set(8, 6, 12);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 50;
    dirLight.shadow.camera.left = -15;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = -15;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.3);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    // Ground
    const groundGeo = new THREE.CircleGeometry(30, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: groundColor,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 4, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 30;
    controlsRef.current = controls;

    // Tree group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    treeGroupRef.current = treeGroup;
  }, []);

  // Generate tree with cross-sections
  const generateTree = useCallback(() => {
    if (!treeGroupRef.current) return;

    // Clear existing tree
    while (treeGroupRef.current.children.length > 0) {
      const child = treeGroupRef.current.children[0];
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
      treeGroupRef.current.remove(child);
    }

    const trunkHeight = 5;
    const branchLength = 4;
    const angleRad = (branchAngle * Math.PI) / 180;

    // Bark material
    const barkMaterial = new THREE.MeshStandardMaterial({
      color: barkColor,
      roughness: 0.85,
      metalness: 0.05,
    });

    // Slice material (cross-section)
    const sliceMaterial = new THREE.MeshStandardMaterial({
      color: sliceColor,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Create trunk
    const trunkGeo = new THREE.CylinderGeometry(trunkRadius, trunkRadius * 1.1, trunkHeight, 32);
    const trunk = new THREE.Mesh(trunkGeo, barkMaterial);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    treeGroupRef.current.add(trunk);

    // Cross-section slice at top of trunk
    if (showSlices) {
      const trunkSliceGeo = new THREE.CylinderGeometry(trunkRadius, trunkRadius, 0.15, 32);
      const trunkSlice = new THREE.Mesh(trunkSliceGeo, sliceMaterial);
      trunkSlice.position.y = trunkHeight + 0.1;
      treeGroupRef.current.add(trunkSlice);

      // Add ring to highlight the slice
      const ringGeo = new THREE.TorusGeometry(trunkRadius, 0.05, 8, 32);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xff6600, emissive: 0xff3300, emissiveIntensity: 0.3 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = trunkHeight + 0.1;
      ring.rotation.x = Math.PI / 2;
      treeGroupRef.current.add(ring);
    }

    // Branch 1 (left)
    const branch1Geo = new THREE.CylinderGeometry(branch1Radius * 0.9, branch1Radius, branchLength, 32);
    const branch1 = new THREE.Mesh(branch1Geo, barkMaterial);
    branch1.position.set(
      -Math.sin(angleRad) * branchLength / 2,
      trunkHeight + Math.cos(angleRad) * branchLength / 2,
      0
    );
    branch1.rotation.z = angleRad;
    branch1.castShadow = true;
    treeGroupRef.current.add(branch1);

    // Branch 1 cross-section
    if (showSlices) {
      const branch1SliceGeo = new THREE.CylinderGeometry(branch1Radius, branch1Radius, 0.12, 32);
      const branch1Slice = new THREE.Mesh(branch1SliceGeo, sliceMaterial);
      branch1Slice.position.set(
        -Math.sin(angleRad) * branchLength,
        trunkHeight + Math.cos(angleRad) * branchLength,
        0
      );
      branch1Slice.rotation.z = angleRad;
      treeGroupRef.current.add(branch1Slice);

      const ring1Geo = new THREE.TorusGeometry(branch1Radius, 0.04, 8, 32);
      const ring1 = new THREE.Mesh(ring1Geo, new THREE.MeshStandardMaterial({ color: 0x00cc66, emissive: 0x009944, emissiveIntensity: 0.3 }));
      ring1.position.copy(branch1Slice.position);
      ring1.rotation.z = angleRad;
      ring1.rotation.x = Math.PI / 2;
      treeGroupRef.current.add(ring1);
    }

    // Branch 2 (right)
    const branch2Geo = new THREE.CylinderGeometry(branch2Radius * 0.9, branch2Radius, branchLength, 32);
    const branch2 = new THREE.Mesh(branch2Geo, barkMaterial);
    branch2.position.set(
      Math.sin(angleRad) * branchLength / 2,
      trunkHeight + Math.cos(angleRad) * branchLength / 2,
      0
    );
    branch2.rotation.z = -angleRad;
    branch2.castShadow = true;
    treeGroupRef.current.add(branch2);

    // Branch 2 cross-section
    if (showSlices) {
      const branch2SliceGeo = new THREE.CylinderGeometry(branch2Radius, branch2Radius, 0.12, 32);
      const branch2Slice = new THREE.Mesh(branch2SliceGeo, sliceMaterial);
      branch2Slice.position.set(
        Math.sin(angleRad) * branchLength,
        trunkHeight + Math.cos(angleRad) * branchLength,
        0
      );
      branch2Slice.rotation.z = -angleRad;
      treeGroupRef.current.add(branch2Slice);

      const ring2Geo = new THREE.TorusGeometry(branch2Radius, 0.04, 8, 32);
      const ring2 = new THREE.Mesh(ring2Geo, new THREE.MeshStandardMaterial({ color: 0x0066cc, emissive: 0x004499, emissiveIntensity: 0.3 }));
      ring2.position.copy(branch2Slice.position);
      ring2.rotation.z = -angleRad;
      ring2.rotation.x = Math.PI / 2;
      treeGroupRef.current.add(ring2);
    }

  }, [trunkRadius, splitRatio, branchAngle, showSlices, branch1Radius, branch2Radius]);

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

  // Update tree when parameters change
  useEffect(() => {
    generateTree();
  }, [generateTree]);

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
      <div
        ref={containerRef}
        className="flex-1 rounded-t-lg overflow-hidden"
        style={{ minHeight: '250px' }}
        aria-label={ariaLabel}
        role="img"
      />

      {/* Controls with Da Vinci Rule Verification */}
      <div className="bg-white/95 rounded-b-lg p-3 shadow-lg">
        {/* Area Conservation Display */}
        <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
          <div className="text-xs font-semibold text-amber-900 mb-1">Da Vinci's Rule: A₁ = A₂ + A₃</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center p-1 bg-orange-100 rounded">
              <div className="text-orange-600 font-medium">Trunk (A₁)</div>
              <div className="font-mono text-orange-800">{trunkArea.toFixed(2)} m²</div>
            </div>
            <div className="text-center p-1 bg-green-100 rounded">
              <div className="text-green-600 font-medium">Branch 1 (A₂)</div>
              <div className="font-mono text-green-800">{branch1Area.toFixed(2)} m²</div>
            </div>
            <div className="text-center p-1 bg-blue-100 rounded">
              <div className="text-blue-600 font-medium">Branch 2 (A₃)</div>
              <div className="font-mono text-blue-800">{branch2Area.toFixed(2)} m²</div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-xs text-gray-600">Conservation:</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              Math.abs(conservationPercent - 100) < 0.1
                ? 'bg-green-200 text-green-800'
                : 'bg-yellow-200 text-yellow-800'
            }`}>
              {conservationPercent.toFixed(1)}% {Math.abs(conservationPercent - 100) < 0.1 ? '✓ Perfect!' : ''}
            </span>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span>Trunk Radius</span>
              <span className="font-mono text-amber-800">{trunkRadius.toFixed(2)} m</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={trunkRadius}
              onChange={(e) => setTrunkRadius(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span>Split Ratio</span>
              <span className="font-mono text-amber-800">{(splitRatio * 100).toFixed(0)}% / {((1 - splitRatio) * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min="0.2"
              max="0.8"
              step="0.01"
              value={splitRatio}
              onChange={(e) => setSplitRatio(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span>Branch Angle</span>
              <span className="font-mono text-amber-800">{branchAngle}°</span>
            </label>
            <input
              type="range"
              min="15"
              max="60"
              value={branchAngle}
              onChange={(e) => setBranchAngle(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={() => setShowSlices(!showSlices)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                showSlices
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {showSlices ? 'Hide Slices' : 'Show Slices'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSectionRule;
