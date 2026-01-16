import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTranslations } from '../../../hooks/useTranslations';
import interaction from '../configs/timber-quality-optimizer';
import { TimberQualityOptimizerInteraction } from './interface';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';

// --- Types ---
type Step = 0 | 1 | 2 | 3;

interface Payload {
  step?: number;
}

// --- 3D Viewer Component ---
const TimberQuality3DViewer: React.FC<{
  step: Step;
  hdRatioLabel: string;
  spacingLabel: string;
  interactive3DViewLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
}> = ({ step, hdRatioLabel, spacingLabel, interactive3DViewLabel, zoomInLabel, zoomOutLabel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number>();

  // Refs for managing 3D objects
  const treeGroupRef = useRef<THREE.Group | null>(null);

  // Refs for HTML Labels
  const labelHDRef = useRef<HTMLDivElement>(null);
  const labelSpacingRef = useRef<HTMLDivElement>(null);

  // Track 3D positions for labels
  const labelPositions = useRef({
    hd: new THREE.Vector3(),
    spacing: new THREE.Vector3(),
  });

  // --- Initialization ---
  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene Setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe1f5fe); // Light sky blue
    scene.fog = new THREE.Fog(0xe1f5fe, 40, 120);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 25, 50);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.target.set(0, 10, 0);
    controls.enableZoom = false; // Disable scroll zoom, use buttons instead
    controlsRef.current = controls;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(30, 50, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    // 4. Ground
    const groundGeo = new THREE.CircleGeometry(60, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x4a3627,
      roughness: 1,
      metalness: 0,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // 5. Tree Group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    treeGroupRef.current = treeGroup;

    // 6. Handle Resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // --- Zoom Handlers ---
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current || !controlsRef.current) return;

    const distance = cameraRef.current.position.distanceTo(controlsRef.current.target);
    const min = controlsRef.current.minDistance;
    const max = controlsRef.current.maxDistance;
    let newDist = distance;

    if (direction === 'in') {
      newDist = Math.max(min, distance - 10);
    } else {
      newDist = Math.min(max, distance + 10);
    }

    // Move camera along the view vector
    const dir = new THREE.Vector3().subVectors(cameraRef.current.position, controlsRef.current.target).normalize();

    const targetPos = controlsRef.current.target.clone().add(dir.multiplyScalar(newDist));
    cameraRef.current.position.copy(targetPos);
  };

  // --- Tree Generation Logic ---
  const generateTreeMesh = useCallback(
    (type: 'main' | 'ghost', height: number, radius: number, branchCount: number, hasKnots: boolean) => {
      const group = new THREE.Group();

      // Materials
      const barkColor = type === 'ghost' ? 0x8d6e63 : 0x5d4037; // Standard brown
      const leafColor = type === 'ghost' ? 0x81c784 : 0x2e7d32; // Forest green
      const opacity = type === 'ghost' ? 0.4 : 1.0;
      const transparent = type === 'ghost';

      const barkMat = new THREE.MeshStandardMaterial({
        color: barkColor,
        roughness: 0.9,
        transparent,
        opacity,
      });

      const leafMat = new THREE.MeshStandardMaterial({
        color: leafColor,
        roughness: 0.8,
        transparent,
        opacity,
      });

      // Knot material: Slightly reddish brown to show "defect" but looks like wood
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0xa52a2a, // Brownish Red
        roughness: 1.0,
      });

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(radius * 0.7, radius, height, 16);
      const trunk = new THREE.Mesh(trunkGeo, barkMat);
      trunk.position.y = height / 2;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      group.add(trunk);

      // Crown (Foliage) - Low Poly Icosahedron
      const crownGeo = new THREE.IcosahedronGeometry(height * 0.35, 0);
      const crown = new THREE.Mesh(crownGeo, leafMat);
      crown.position.y = height;
      crown.scale.y = 1.2;
      crown.castShadow = true;
      group.add(crown);

      // Branches & Knots
      if (branchCount > 0) {
        for (let i = 0; i < branchCount; i++) {
          const yPos = height * 0.3 + Math.random() * height * 0.4;
          const angle = Math.random() * Math.PI * 2;
          const length = height * 0.25 * (1 - yPos / height);

          const branchGeo = new THREE.CylinderGeometry(0.1, 0.2, length, 8);
          const branch = new THREE.Mesh(branchGeo, barkMat);

          branch.position.set(0, yPos, 0);
          branch.rotation.y = angle;
          branch.rotation.z = Math.PI / 3;
          branch.translateY(length / 2);

          trunk.add(branch);

          // Add 3D Knots (Stubby branches)
          if (hasKnots && Math.random() > 0.5) {
            // Create a short stub cylinder
            const stubLength = 0.6;
            const stubGeo = new THREE.CylinderGeometry(0.15, 0.25, stubLength, 8);
            const knot = new THREE.Mesh(stubGeo, knotMat);

            // Position on surface
            knot.position.set(0, yPos - 1.5, 0);

            // Rotate to face outward
            knot.rotation.y = angle + Math.PI / 4;
            knot.rotation.z = Math.PI / 2;
            knot.translateY(radius);

            group.add(knot);
          }
        }
      }

      return group;
    },
    [],
  );

  // --- Update Scene on Step Change ---
  useEffect(() => {
    if (!treeGroupRef.current) return;

    treeGroupRef.current.clear();

    let treeHeight = 15;
    let trunkRadius = 1.2;
    let branchCount = 0;
    let hasKnots = false;
    let showGhostTrees = false;

    // Reset Label Positions off-screen
    labelPositions.current.hd.set(0, -5000, 0);
    labelPositions.current.spacing.set(0, -5000, 0);

    switch (step) {
      case 0: // Low
        treeHeight = 15;
        trunkRadius = 1.5;
        branchCount = 12;
        hasKnots = true;
        break;
      case 1: // Medium
        treeHeight = 22;
        trunkRadius = 1.0;
        branchCount = 6;
        hasKnots = true;

        // H:D Visuals
        labelPositions.current.hd.set(2.5, 11, 0);
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(1.5, 0, 0),
          new THREE.Vector3(1.5, 22, 0),
        ]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x1976d2 });
        treeGroupRef.current.add(new THREE.Line(lineGeo, lineMat));
        break;
      case 2: // High
        treeHeight = 22;
        trunkRadius = 1.0;
        branchCount = 0; // Pruned
        hasKnots = false;
        break;
      case 3: // Premium
        treeHeight = 24;
        trunkRadius = 1.2;
        branchCount = 0;
        hasKnots = false;
        showGhostTrees = true;

        // Spacing Visuals
        labelPositions.current.spacing.set(8, 5, 0);
        break;
    }

    // Add Trees
    treeGroupRef.current.add(generateTreeMesh('main', treeHeight, trunkRadius, branchCount, hasKnots));

    if (showGhostTrees) {
      const offset = 16;
      const leftTree = generateTreeMesh('ghost', treeHeight * 0.9, trunkRadius, 0, false);
      leftTree.position.set(-offset, 0, 0);
      treeGroupRef.current.add(leftTree);

      const rightTree = generateTreeMesh('ghost', treeHeight * 0.9, trunkRadius, 0, false);
      rightTree.position.set(offset, 0, 0);
      treeGroupRef.current.add(rightTree);

      // Arrow Visual
      const arrowGroup = new THREE.Group();
      const dashGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(2, 4, 0),
        new THREE.Vector3(offset - 2, 4, 0),
      ]);
      const dashMat = new THREE.LineDashedMaterial({ color: 0x1976d2, dashSize: 1, gapSize: 0.5 });
      const spacingLine = new THREE.Line(dashGeo, dashMat);
      spacingLine.computeLineDistances();
      arrowGroup.add(spacingLine);

      const headGeo = new THREE.ConeGeometry(0.5, 1, 8);
      const headMat = new THREE.MeshBasicMaterial({ color: 0x1976d2 });

      const rightHead = new THREE.Mesh(headGeo, headMat);
      rightHead.position.set(offset - 2, 4, 0);
      rightHead.rotation.z = -Math.PI / 2;
      arrowGroup.add(rightHead);

      const leftHead = new THREE.Mesh(headGeo, headMat);
      leftHead.position.set(2, 4, 0);
      leftHead.rotation.z = Math.PI / 2;
      arrowGroup.add(leftHead);

      treeGroupRef.current.add(arrowGroup);
    }
  }, [step, generateTreeMesh]);

  // --- Animation Loop ---
  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    if (controlsRef.current) controlsRef.current.update();
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      // Update HTML Labels
      if (containerRef.current) {
        const updateLabel = (vec3: THREE.Vector3, element: HTMLElement | null) => {
          if (!element || vec3.y < -4000) {
            if (element) element.style.opacity = '0';
            return;
          }
          const v = vec3.clone();
          v.project(cameraRef.current!);
          const x = (v.x * 0.5 + 0.5) * containerRef.current!.clientWidth;
          const y = (-(v.y * 0.5) + 0.5) * containerRef.current!.clientHeight;
          element.style.transform = `translate(-50%, -50%)`;
          element.style.left = `${x}px`;
          element.style.top = `${y}px`;
          element.style.opacity = '1';
        };
        updateLabel(labelPositions.current.hd, labelHDRef.current);
        updateLabel(labelPositions.current.spacing, labelSpacingRef.current);
      }
    }
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg"
    >
      <div
        ref={labelHDRef}
        className="absolute px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded shadow-md transition-opacity duration-200 opacity-0 z-10 pointer-events-none"
      >
        {hdRatioLabel}
      </div>
      <div
        ref={labelSpacingRef}
        className="absolute px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded shadow-md transition-opacity duration-200 opacity-0 z-10 pointer-events-none"
      >
        {spacingLabel}
      </div>
      <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 select-none">
        {interactive3DViewLabel}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={() => handleZoom('in')}
          className="w-10 h-10 bg-white border border-slate-300 rounded-lg text-slate-600 text-2xl font-bold flex items-center justify-center cursor-pointer shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all select-none"
          aria-label={zoomInLabel}
          title={zoomInLabel}
        >
          +
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="w-10 h-10 bg-white border border-slate-300 rounded-lg text-slate-600 text-2xl font-bold flex items-center justify-center cursor-pointer shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all select-none"
          aria-label={zoomOutLabel}
          title={zoomOutLabel}
        >
          −
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
const TimberQualityOptimizer: React.FC = () => {
  const { dialogIndex } = useGameContext();
  const { t } = useTranslations();
  const { translations, ariaLabels } = interaction as TimberQualityOptimizerInteraction;
  const { payload } = useEventListener('timber-quality-optimizer');
  const isFirstIndex = dialogIndex === 1;
  const [step, setStep] = useState<Step>(isFirstIndex ? 0 : 3);

  const maxSteps = 3;

  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const newStep = (payload as Payload).step as number;
      if (newStep >= 0 && newStep <= maxSteps) {
        setStep(newStep as Step);

        // Announce to screen readers
        const announce = document.getElementById('timber-quality-announcer');
        if (announce) {
          announce.textContent = stepTitles[newStep];
        }
      }
    }
  }, [payload]);

  const stepTitles = [
    t(translations.poorQualityTimber),
    t(translations.betterHeightRatio),
    t(translations.strategicThinning),
    t(translations.optimalSpacing),
  ];

  const conditions = {
    goodHeightRatio: step >= 1,
    properThinning: step >= 2,
    optimalSpacing: step >= 3,
  };

  const timberQualityByStep = ['LOW', 'MEDIUM', 'HIGH', 'PREMIUM'];
  const valuePerCubicFoot = ['$2', '$5', '$8', '$12'];
  const carbonTonsPerAcre = [300, 290, 280, 255];

  const palette = {
    blue: '#0061FC',
    green: '#008217',
    red: '#E0002B',
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'LOW':
        return palette.red;
      case 'MEDIUM':
        return '#946F00';
      case 'HIGH':
        return palette.green;
      case 'PREMIUM':
        return palette.blue;
      default:
        return palette.blue;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden">
      {/* Screen reader descriptive text */}
      <div className="sr-only" aria-live="polite">
        <h3>
          {t(translations.currentStage)}: {stepTitles[step]}
        </h3>
        <p>
          {t(translations.timberQuality)}: {timberQualityByStep[step]}. {t(translations.timberValue)}:{' '}
          {valuePerCubicFoot[step]} {t(translations.perCubicFoot)}. {t(translations.carbonStorage)}:{' '}
          {carbonTonsPerAcre[step]} {t(translations.tonsPerAcre)}.
        </p>
        <ul>
          <li>
            {t(translations.heightToDiameterRatio)}:{' '}
            {conditions.goodHeightRatio ? t(translations.optimized) : t(translations.poor)}
          </li>
          <li>
            {t(translations.branchThinningLabel)}:{' '}
            {conditions.properThinning ? t(translations.applied) : t(translations.notApplied)}
          </li>
          <li>
            {t(translations.treeSpacingLabel)}:{' '}
            {conditions.optimalSpacing ? t(translations.optimal) : t(translations.suboptimal)}
          </li>
        </ul>
      </div>

      <div>
        <div aria-hidden="true" className="relative">
          {/* Main visualization area */}
          <div className="relative sm:h-[350px] h-[300px] w-full">
            {/* Quality badge */}
            <div
              className="absolute top-3 right-3 px-3 py-1.5 rounded-md text-white shadow-md z-10"
              style={{ backgroundColor: getQualityColor(timberQualityByStep[step]) }}
            >
              <div className="flex items-center">
                <span className="text-base uppercase tracking-wider">{t(translations.timberQuality)}:&nbsp;</span>
                <span className="text-base font-bold">{timberQualityByStep[step]}</span>
              </div>
            </div>

            {/* 3D Viewer */}
            <TimberQuality3DViewer
              step={step}
              hdRatioLabel={t(translations.hdRatioLabel)}
              spacingLabel={t(translations.spacingLabel)}
              interactive3DViewLabel={t(translations.interactive3DView)}
              zoomInLabel={t(ariaLabels.zoomIn)}
              zoomOutLabel={t(ariaLabels.zoomOut)}
            />

            {/* Screen reader announcer */}
            <div id="timber-quality-announcer" aria-live="polite" className="sr-only">
              {stepTitles[step]}
            </div>
          </div>

          {/* Metrics section */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 bg-white"
            aria-label={t(ariaLabels.qualityMetrics)}
          >
            <div className="bg-white-50 rounded-lg p-3 border">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900 text-base">{t(translations.timberValue)}</div>
                <div className="text-lg font-bold text-green-700">
                  {valuePerCubicFoot[step]} {t(translations.perCubicFoot)}
                </div>
              </div>
              <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(step + 1) * 25}%`,
                    backgroundColor: getQualityColor(timberQualityByStep[step]),
                  }}
                  role="progressbar"
                  aria-valuenow={step + 1}
                  aria-valuemin={1}
                  aria-valuemax={4}
                  aria-label={`${t(translations.timberValueProgress)}: ${step + 1} ${t(translations.of)} 4`}
                ></div>
              </div>
              <div className="mt-1 text-base text-gray-600">
                {step === 0
                  ? t(translations.lowGradeDescription)
                  : step === 1
                    ? t(translations.mediumGradeDescription)
                    : step === 2
                      ? t(translations.highGradeDescription)
                      : t(translations.premiumGradeDescription)}
              </div>
            </div>

            <div className="bg-white-50 rounded-lg p-3 border">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900 text-base">{t(translations.carbonStorage)}</div>
                <div className="text-lg font-bold text-green-700">
                  {carbonTonsPerAcre[step]} {t(translations.tonsPerAcre)}
                </div>
              </div>
              <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#008217] rounded-full transition-all"
                  style={{ width: `${(carbonTonsPerAcre[step] / carbonTonsPerAcre[0]) * 100}%` }}
                  role="progressbar"
                  aria-valuenow={carbonTonsPerAcre[step]}
                  aria-valuemin={0}
                  aria-valuemax={carbonTonsPerAcre[0]}
                  aria-label={`${t(translations.carbonStorageLabel)}: ${carbonTonsPerAcre[step]} ${t(translations.tonsPerAcre)}`}
                ></div>
              </div>
              <div className="mt-1 text-base text-gray-600">
                {step === 3
                  ? t(translations.carbonPremiumDescription)
                  : `${Math.round((carbonTonsPerAcre[step] / carbonTonsPerAcre[0]) * 100)}${t(translations.maximumPotential)}`}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 p-3 bg-white border border-t">
            <div
              className={`px-2 py-1 rounded-full text-base font-medium ${conditions.goodHeightRatio ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
            >
              {t(translations.optimalHeightRatioFull)}
            </div>
            <div
              className={`px-2 py-1 rounded-full text-base font-medium ${conditions.properThinning ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
            >
              {t(translations.branchThinningFull)}
            </div>
            <div
              className={`px-2 py-1 rounded-full text-base font-medium ${conditions.optimalSpacing ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}
            >
              {t(translations.spacingFull)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimberQualityOptimizer;
