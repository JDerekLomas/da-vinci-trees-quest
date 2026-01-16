import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ConiferTreeInteraction } from './interface';

interface ConiferTreeProps {
  interaction: ConiferTreeInteraction;
}

const ConiferTree: React.FC<ConiferTreeProps> = ({ interaction }) => {
  const { ariaLabel } = interaction;

  // Tree parameters (some setters used by commented reset function)
  const [treeHeight, setTreeHeight] = useState(25);
  const [dbh, setDbh] = useState(50);
  const [whorlInterval] = useState(1.5);
  const [branchesPerWhorl] = useState(5);
  const [maxBranchLength] = useState(4);
  const [branchAngle, setBranchAngle] = useState(55);
  const [droopFactor, setDroopFactor] = useState(25);

  // Volume calculations
  const [coneVolume, setConeVolume] = useState(0);
  const [cylinderVolume, setCylinderVolume] = useState(0);

  // Three.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const treeGroupRef = useRef<THREE.Group | null>(null);

  const barkColor = 0x5d4037;
  const needleColor = 0x2e7d32;
  const groundColor = 0x4a7c31;

  // Initialize Three.js scene
  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 50, 200);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 500);
    camera.position.set(0, 15, 40);
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
    dirLight.position.set(30, 60, 40);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.3);
    fillLight.position.set(-20, 30, -30);
    scene.add(fillLight);

    // Ground
    const groundGeo = new THREE.CircleGeometry(100, 64);
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
    controls.target.set(0, 12, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 100;
    controlsRef.current = controls;

    // Tree group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    treeGroupRef.current = treeGroup;
  }, []);

  // Generate tree
  const generateTree = useCallback(() => {
    if (!treeGroupRef.current || !controlsRef.current || !cameraRef.current) return;

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

    const height = treeHeight;
    const dbhMeters = dbh / 100; // Convert cm to m
    const trunkRadiusBottom = dbhMeters / 2;
    const trunkRadiusTop = trunkRadiusBottom * 0.1; // Strong taper for conifers

    // Create trunk
    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: barkColor,
      roughness: 0.9,
      metalness: 0.05,
    });

    const trunkGeometry = new THREE.CylinderGeometry(trunkRadiusTop, trunkRadiusBottom, height, 16);
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = height / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    treeGroupRef.current.add(trunk);

    // Crown parameters
    const crownBase = height * 0.25;
    const crownHeight = height - crownBase;
    const numWhorls = Math.floor(crownHeight / whorlInterval);

    const needleMaterial = new THREE.MeshStandardMaterial({
      color: needleColor,
      roughness: 0.7,
      metalness: 0.1,
    });

    // Create branch function
    const createBranch = (
      startPoint: THREE.Vector3,
      direction: THREE.Vector3,
      length: number,
      radius: number,
      depth: number
    ) => {
      if (depth <= 0 || radius < 0.01 || length < 0.1) return;

      const branchMaterial = new THREE.MeshStandardMaterial({
        color: barkColor,
        roughness: 0.85,
      });

      const branchGeometry = new THREE.CylinderGeometry(radius * 0.3, radius, length, 8);
      const branch = new THREE.Mesh(branchGeometry, branchMaterial);
      branch.castShadow = true;

      const endPoint = startPoint.clone().add(direction.clone().multiplyScalar(length));
      const midPoint = startPoint.clone().add(direction.clone().multiplyScalar(length / 2));

      branch.position.copy(midPoint);
      branch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      treeGroupRef.current?.add(branch);

      // Add needles at branch tips
      if (depth === 1) {
        const needleLength = length * 0.4;
        const needleRadius = radius * 2;

        const needleGeo = new THREE.ConeGeometry(needleRadius, needleLength, 8);
        const needle = new THREE.Mesh(needleGeo, needleMaterial);

        needle.position.copy(endPoint);
        needle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
        needle.castShadow = true;
        treeGroupRef.current?.add(needle);
      }

      // Create secondary branches
      if (depth > 1) {
        const numSecondary = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numSecondary; i++) {
          const t = 0.3 + (i / numSecondary) * 0.6;
          const branchPoint = startPoint.clone().add(direction.clone().multiplyScalar(length * t));

          const sideAngle = (Math.random() - 0.5) * Math.PI * 0.8;
          const upAngle = -0.2 - Math.random() * 0.3;

          const perpendicular = new THREE.Vector3()
            .crossVectors(direction, new THREE.Vector3(0, 1, 0))
            .normalize();

          const newDir = direction.clone()
            .applyAxisAngle(perpendicular, upAngle)
            .applyAxisAngle(direction, sideAngle)
            .normalize();

          createBranch(branchPoint, newDir, length * 0.4 * (1 - t), radius * 0.4, depth - 1);
        }
      }
    };

    // Generate whorls
    for (let w = 0; w < numWhorls; w++) {
      const whorlHeight = crownBase + w * whorlInterval;
      const progressUp = w / numWhorls;

      const lengthFactor = 1 - progressUp * 0.9;
      const currentBranchLength = maxBranchLength * lengthFactor;
      const branchRadius = trunkRadiusBottom * 0.15 * lengthFactor;

      const whorlRotation = Math.random() * Math.PI * 2;

      for (let b = 0; b < branchesPerWhorl; b++) {
        const angle = (b / branchesPerWhorl) * Math.PI * 2 + whorlRotation;

        const baseAngle = (branchAngle * Math.PI) / 180 - progressUp * 0.3;
        const direction = new THREE.Vector3(
          Math.cos(angle) * Math.sin(baseAngle),
          Math.cos(baseAngle),
          Math.sin(angle) * Math.sin(baseAngle)
        ).normalize();

        // Apply droop
        const droopAmount = (droopFactor * Math.PI) / 180 * lengthFactor;
        const droopAxis = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
        const droopQuat = new THREE.Quaternion().setFromAxisAngle(droopAxis, droopAmount);
        direction.applyQuaternion(droopQuat);

        createBranch(
          new THREE.Vector3(0, whorlHeight, 0),
          direction,
          currentBranchLength,
          branchRadius,
          2
        );
      }
    }

    // Calculate volumes (cone vs cylinder)
    const calculatedConeVolume = (1 / 3) * Math.PI * Math.pow(trunkRadiusBottom, 2) * height;
    const calculatedCylinderVolume = Math.PI * Math.pow(trunkRadiusBottom, 2) * height;
    setConeVolume(calculatedConeVolume);
    setCylinderVolume(calculatedCylinderVolume);

    // Update camera target
    controlsRef.current.target.set(0, height * 0.4, 0);
    cameraRef.current.position.set(0, height * 0.4, height * 1.5);
  }, [treeHeight, dbh, whorlInterval, branchesPerWhorl, maxBranchLength, branchAngle, droopFactor]);

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
  //   setTreeHeight(25);
  //   setDbh(50);
  //   setWhorlInterval(1.5);
  //   setBranchesPerWhorl(5);
  //   setMaxBranchLength(4);
  //   setBranchAngle(55);
  //   setDroopFactor(25);
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

      {/* Controls with Volume Comparison */}
      <div className="bg-white/95 rounded-b-lg p-3 shadow-lg">
        {/* Volume Comparison Display */}
        <div className="mb-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="text-xs font-semibold text-emerald-900 mb-1">Cylinder vs Cone Model</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-1.5 bg-white rounded">
              <div className="text-gray-500">Cylinder (V = πr²h)</div>
              <div className="font-mono text-emerald-700 font-medium">{cylinderVolume.toFixed(2)} m³</div>
            </div>
            <div className="p-1.5 bg-emerald-100 rounded border border-emerald-300">
              <div className="text-gray-600">Cone (V = ⅓πr²h) ✓</div>
              <div className="font-mono text-emerald-800 font-bold">{coneVolume.toFixed(2)} m³</div>
            </div>
          </div>
          <div className="mt-1.5 text-[10px] text-emerald-700">
            Cone is {((coneVolume / cylinderVolume) * 100).toFixed(0)}% of cylinder (⅓ the volume)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="Total tree height">Height</span>
              <span className="font-mono text-emerald-700">{treeHeight} m</span>
            </label>
            <input
              type="range"
              min="10"
              max="50"
              value={treeHeight}
              onChange={(e) => setTreeHeight(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">Douglas fir: 20-75m</div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="Diameter at Breast Height (1.37m)">DBH</span>
              <span className="font-mono text-emerald-700">{dbh} cm</span>
            </label>
            <input
              type="range"
              min="20"
              max="120"
              value={dbh}
              onChange={(e) => setDbh(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">Measured at 1.37m height</div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="Angle of branches from trunk">Branch Angle</span>
              <span className="font-mono text-emerald-700">{branchAngle}°</span>
            </label>
            <input
              type="range"
              min="30"
              max="80"
              value={branchAngle}
              onChange={(e) => setBranchAngle(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">Creates the cone shape</div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-gray-700">
              <span title="How much branches droop under weight">Droop</span>
              <span className="font-mono text-emerald-700">{droopFactor}°</span>
            </label>
            <input
              type="range"
              min="0"
              max="45"
              value={droopFactor}
              onChange={(e) => setDroopFactor(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-[10px] text-gray-500 mt-0.5">Sheds snow in winter</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConiferTree;
