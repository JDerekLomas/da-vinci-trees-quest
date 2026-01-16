import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DaVinciTreeInteraction } from './interface';

interface DaVinciTreeProps {
  interaction: DaVinciTreeInteraction;
}

const DaVinciTree: React.FC<DaVinciTreeProps> = ({ interaction }) => {
  const { ariaLabel } = interaction;

  // Tree parameters
  const [branchAngle, setBranchAngle] = useState(35);
  const [branchDepth, setBranchDepth] = useState(8);
  const [lengthRatio, setLengthRatio] = useState(0.75);
  const [leonardoExponent, setLeonardoExponent] = useState(2.0);

  // Da Vinci rule verification
  const [trunkArea, setTrunkArea] = useState(0);
  const [branchesArea, setBranchesArea] = useState(0);

  // Three.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const treeGroupRef = useRef<THREE.Group | null>(null);

  const barkColor = 0x8b5a2b;
  const groundColor = 0x4a7c31;

  // Initialize Three.js scene
  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 100, 400);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 1000);
    camera.position.set(0, 50, 120);
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

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(50, 100, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 300;
    dirLight.shadow.camera.left = -100;
    dirLight.shadow.camera.right = 100;
    dirLight.shadow.camera.top = 100;
    dirLight.shadow.camera.bottom = -100;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.4);
    fillLight.position.set(-30, 40, -50);
    scene.add(fillLight);

    // Ground
    const groundGeo = new THREE.CircleGeometry(200, 64);
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
    controls.target.set(0, 35, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 30;
    controls.maxDistance = 250;
    controlsRef.current = controls;

    // Tree group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    treeGroupRef.current = treeGroup;
  }, []);

  // Generate tree
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

    const maxDepth = branchDepth;

    // Realistic trunk dimensions
    const trunkRadiusBottom = 2.5;
    const trunkLength = 15;
    const taperFactor = 0.85;
    const trunkRadiusTop = trunkRadiusBottom * taperFactor;

    // Calculate areas for Da Vinci rule verification
    const calculatedTrunkArea = Math.PI * Math.pow(trunkRadiusTop, 2);
    const daughterRadius = trunkRadiusTop / Math.pow(2, 1 / leonardoExponent);
    const calculatedBranchesArea = 2 * Math.PI * Math.pow(daughterRadius, 2);

    setTrunkArea(calculatedTrunkArea);
    setBranchesArea(calculatedBranchesArea);

    const createBranch = (
      startPoint: THREE.Vector3,
      direction: THREE.Vector3,
      length: number,
      radiusBottom: number,
      radiusTop: number,
      depth: number
    ) => {
      if (depth <= 0 || radiusTop < 0.03) return;

      // Vary bark color slightly
      const colorVariation = 0.9 + Math.random() * 0.2;
      const r = ((barkColor >> 16) & 0xff) * colorVariation;
      const g = ((barkColor >> 8) & 0xff) * colorVariation;
      const b = (barkColor & 0xff) * colorVariation;

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(r / 255, g / 255, b / 255),
        roughness: 0.85,
        metalness: 0.05,
      });

      const segments = Math.max(6, Math.floor(12 * (depth / 8)));
      const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, length, segments);
      const cylinder = new THREE.Mesh(geometry, material);
      cylinder.castShadow = true;
      cylinder.receiveShadow = true;

      const endPoint = startPoint.clone().add(direction.clone().multiplyScalar(length));
      const midPoint = startPoint.clone().add(direction.clone().multiplyScalar(length / 2));

      cylinder.position.copy(midPoint);
      cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
      treeGroupRef.current?.add(cylinder);

      if (depth <= 1) return;

      // Calculate child branch parameters using Da Vinci's rule
      const newLength = length * lengthRatio;
      const newRadiusBottom = radiusTop;
      const newRadiusTop = newRadiusBottom / Math.pow(2, 1 / leonardoExponent);

      // Add slight randomization
      const angleVariation = (Math.random() - 0.5) * 10;
      const branchAngleRad = ((branchAngle + angleVariation) * Math.PI) / 180;

      // Create perpendicular vector
      let perpendicular;
      if (Math.abs(direction.y) > 0.9) {
        perpendicular = new THREE.Vector3(1, 0, 0);
      } else {
        perpendicular = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();
      }

      // Random rotation around branch axis
      const rotationAroundAxis = new THREE.Quaternion().setFromAxisAngle(direction, Math.random() * Math.PI * 2);
      perpendicular.applyQuaternion(rotationAroundAxis);

      // Create two daughter branches with slight asymmetry
      const asymmetry = 0.9 + Math.random() * 0.2;

      const q1 = new THREE.Quaternion().setFromAxisAngle(perpendicular, branchAngleRad);
      const q2 = new THREE.Quaternion().setFromAxisAngle(perpendicular, -branchAngleRad * asymmetry);

      const newDirection1 = direction.clone().applyQuaternion(q1).normalize();
      const newDirection2 = direction.clone().applyQuaternion(q2).normalize();

      createBranch(endPoint, newDirection1, newLength, newRadiusBottom, newRadiusTop, depth - 1);
      createBranch(endPoint, newDirection2, newLength * asymmetry, newRadiusBottom * asymmetry, newRadiusTop * asymmetry, depth - 1);
    };

    createBranch(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, 0),
      trunkLength,
      trunkRadiusBottom,
      trunkRadiusTop,
      maxDepth
    );
  }, [branchAngle, branchDepth, lengthRatio, leonardoExponent]);

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

  // Reset function kept for future use
  // const handleReset = () => {
  //   setBranchAngle(35);
  //   setBranchDepth(8);
  //   setLengthRatio(0.75);
  //   setLeonardoExponent(2.0);
  // };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 3D Visualization - Takes most space */}
      <div
        ref={containerRef}
        className="flex-1 rounded-t-lg overflow-hidden"
        style={{ minHeight: '280px' }}
        aria-label={ariaLabel}
        role="img"
      />

      {/* Controls with Da Vinci Rule Verification */}
      <div className="bg-white/95 rounded-b-lg p-3 shadow-lg">
        {/* Da Vinci Rule Verification Display */}
        <div className="mb-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
          <div className="text-xs font-semibold text-amber-900 mb-1">Da Vinci's Rule Verification</div>
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-600">Trunk Area: </span>
              <span className="font-mono text-amber-800">{trunkArea.toFixed(2)} cm²</span>
            </div>
            <div className="text-gray-400">=</div>
            <div>
              <span className="text-gray-600">Branches Area: </span>
              <span className="font-mono text-amber-800">{branchesArea.toFixed(2)} cm²</span>
            </div>
            <div className={`px-2 py-0.5 rounded text-xs font-medium ${Math.abs(leonardoExponent - 2) < 0.1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {Math.abs(leonardoExponent - 2) < 0.1 ? '✓ Conserved' : '✗ Not conserved'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="How far branches spread from trunk">Branch Angle</span>
              <span className="font-mono text-amber-800">{branchAngle < 1 ? branchAngle.toFixed(2) : branchAngle}°</span>
            </label>
            <input
              type="range"
              min="0.01"
              max="60"
              step="0.01"
              value={branchAngle}
              onChange={(e) => setBranchAngle(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">Try 0° to see the cylinder!</div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="Number of branching levels">Depth</span>
              <span className="font-mono text-amber-800">{branchDepth}</span>
            </label>
            <input
              type="range"
              min="3"
              max="10"
              value={branchDepth}
              onChange={(e) => setBranchDepth(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">More depth = more complex tree</div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="How much shorter each branch is vs parent">Length Ratio</span>
              <span className="font-mono text-amber-800">{lengthRatio.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.55"
              max="0.85"
              step="0.01"
              value={lengthRatio}
              onChange={(e) => setLengthRatio(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">Real trees: 0.70-0.80</div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="D^α = d₁^α + d₂^α (area conservation when α=2)">Leonardo α</span>
              <span className="font-mono text-amber-800">{leonardoExponent.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="1.5"
              max="3.0"
              step="0.01"
              value={leonardoExponent}
              onChange={(e) => setLeonardoExponent(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">α=2 conserves area (Da Vinci's rule)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaVinciTree;
