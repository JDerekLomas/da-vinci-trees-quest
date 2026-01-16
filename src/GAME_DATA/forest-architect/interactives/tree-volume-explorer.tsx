import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';
import { useGameContext } from '../../../hooks/useGameContext';
import { TreeVolumeExplorerInteraction } from './interface';

interface DisplayFlags {
  showVolumeFormula?: boolean;
  showLeonardoRule?: boolean;
}

interface Payload {
  target: string;
  step?: 1 | 2;
  displayFlags?: DisplayFlags;
}

interface TreeVolumeExplorerProps {
  interaction: TreeVolumeExplorerInteraction;
}

const TreeVolumeExplorer: React.FC<TreeVolumeExplorerProps> = ({ interaction }) => {
  const { t } = useTranslations();
  const { translations, ariaLabels } = interaction;
  const { payload } = useEventListener('tree-volume-explorer');
  const { setInteractiveResponses, interactiveResponses } = useGameContext();

  // Get saved state from interactiveResponses
  const savedState = interactiveResponses?.['tree-volume-explorer'] as Record<string, unknown> | undefined;

  // Persist display flags in state so they remain even when payload resets
  // Initialize with default values matching the first dialog (show Volume Formula, hide Leonardo)
  const [displayFlags, setDisplayFlags] = useState<DisplayFlags>({
    showVolumeFormula: true,
    showLeonardoRule: false,
  });

  // Update display flags when payload changes
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'displayFlags' in payload) {
      const payloadWithFlags = payload as Payload;
      if (payloadWithFlags.displayFlags) {
        setDisplayFlags((prev) => ({
          ...prev,
          ...payloadWithFlags.displayFlags,
        }));
      }
    }
  }, [payload]);

  // Update current step when payload changes
  useEffect(() => {
    if (payload && typeof payload === 'object' && 'step' in payload) {
      const payloadWithStep = payload as Payload;
      if (payloadWithStep.step) {
        setCurrentStep(payloadWithStep.step);
      }
    }
  }, [payload]);

  // Helper function to check display flags
  const getDisplayFlag = (flagName: keyof DisplayFlags): boolean => {
    const flag = displayFlags[flagName];
    // Only show when explicitly true
    return flag === true;
  };

  // Step management
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [activeTab, setActiveTab] = useState<'cylindrical' | 'conical'>('cylindrical');
  const [step2ActiveTab, setStep2ActiveTab] = useState<'oak-branching' | 'pine-branching'>('oak-branching');

  // Disable event tracking state
  const [tabSwitched, setTabSwitched] = useState<boolean>((savedState?.tabSwitched as boolean) ?? false);
  const [step1SliderChanged, setStep1SliderChanged] = useState<boolean>(false);
  const [oakSliderChanged, setOakSliderChanged] = useState<boolean>(false);
  const [pineSliderChanged, setPineSliderChanged] = useState<boolean>(false);

  // Step 1 state
  const [treeHeight, setTreeHeight] = useState(20);
  const [trunkDiameter, setTrunkDiameter] = useState(3);

  // Step 2 Oak branching state
  const [branchAngle, setBranchAngle] = useState(30);
  const [branchDepth, setBranchDepth] = useState(8);
  const [lengthRatio, setLengthRatio] = useState(0.8);
  const [leonardoExponent, setLeonardoExponent] = useState(1.95);

  // Step 2 Pine branching state
  const [whorlInterval, setWhorlInterval] = useState(15);
  const [branchesPerWhorl, setBranchesPerWhorl] = useState(5);
  const [maxBranchLength, setMaxBranchLength] = useState(50);
  const [initialAngle, setInitialAngle] = useState(30);
  const [droopFactor] = useState(30);

  // Save state to interactiveResponses for disable event tracking
  useEffect(() => {
    if (setInteractiveResponses) {
      setInteractiveResponses((prev) => ({
        ...prev,
        'tree-volume-explorer': {
          tabSwitched,
          step1SliderChanged,
          step2ActiveTab,
          oakSliderChanged,
          pineSliderChanged,
        },
      }));
    }
  }, [
    tabSwitched,
    step1SliderChanged,
    step2ActiveTab,
    oakSliderChanged,
    pineSliderChanged,
    setInteractiveResponses,
  ]);

  // Three.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const treeGroupRef = useRef<THREE.Group | null>(null);
  const raycasterRef = useRef<THREE.Raycaster | null>(null);

  // Label refs for positioning
  const labelA0Ref = useRef<HTMLDivElement>(null);
  const labelA1Ref = useRef<HTMLDivElement>(null);
  const labelA2Ref = useRef<HTMLDivElement>(null);
  const labelA3Ref = useRef<HTMLDivElement>(null);

  // Label positions in 3D space
  const labelPositionsRef = useRef<{
    A0: THREE.Vector3;
    A1: THREE.Vector3;
    A2: THREE.Vector3;
    A3: THREE.Vector3;
  }>({
    A0: new THREE.Vector3(),
    A1: new THREE.Vector3(),
    A2: new THREE.Vector3(),
    A3: new THREE.Vector3(),
  });

  const trunkRadius = trunkDiameter / 2;
  const branchProportions = [0.31, 0.305, 0.355]; // Proportions of total area for A1, A2, A3
  const cutHeight = treeHeight * 0.75; // Leonardo check is at 75%
  const splitHeight = treeHeight * 0.6; // Branches start at 60% up

  useEffect(() => {
    const checkScreenSize = () => {
      // setIsTablet(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate volume and areas
  const { volume } = useMemo(() => {
    const rBase = trunkDiameter / 2;
    const isCone = activeTab === 'conical';
    const taperFactor = isCone ? 0.3 : 0.85;

    // Calculate radius at cut height
    const rAtCut = rBase * (1 - (1 - taperFactor) * (cutHeight / treeHeight));
    const areaAtCut = Math.PI * rAtCut * rAtCut;

    // Calculate volume
    let vol = 0;
    if (!isCone) {
      vol = Math.PI * rBase * rBase * treeHeight;
    } else {
      vol = (1 / 3) * Math.PI * rBase * rBase * treeHeight;
    }

    return { volume: vol, areaAtCut };
  }, [treeHeight, trunkDiameter, activeTab, cutHeight]);

  // Initialize Three.js scene
  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f8ff); // Soft blue gradient background
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 1000);
    // Start with a closer zoom (approximately 3 zoom-ins from original position)
    camera.position.set(15, 18, 23);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 10, 0);
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 200;
    controls.enableZoom = false; // Disable scroll zoom
    controls.autoRotate = false; // Explicitly disable auto-rotation
    controls.enablePan = false; // Disable panning (only allow rotation)
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(20, 50, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Ground
    const groundGeo = new THREE.CircleGeometry(40, 64);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 1 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Tree group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    treeGroupRef.current = treeGroup;

    // Raycaster for occlusion detection
    const raycaster = new THREE.Raycaster();
    raycasterRef.current = raycaster;
  }, []);

  // Update tree geometry
  const updateTree = useCallback(() => {
    if (!treeGroupRef.current || !cameraRef.current || !controlsRef.current) return;

    // Clear old tree
    while (treeGroupRef.current.children.length > 0) {
      const child = treeGroupRef.current.children[0];
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry.dispose();
      }
      treeGroupRef.current.remove(child);
    }

    const h = treeHeight;
    const rBase = trunkDiameter / 2;
    const isCone = activeTab === 'conical';

    // Taper logic for TRUNK
    const taperFactor = isCone ? 0.3 : 0.85;
    // Taper logic for BRANCHES
    const branchTaperFactor = isCone ? 0.4 : 0.7;

    // Material for Tree
    const barkMaterial = new THREE.MeshStandardMaterial({
      color: 0x5d4037, // Dark brown
      roughness: 0.9,
      metalness: 0.1,
    });

    // Lower Trunk (Base to Split)
    const rAtSplit = rBase * (1 - (1 - taperFactor) * (splitHeight / h));
    const lowerTrunkGeo = new THREE.CylinderGeometry(rAtSplit, rBase, splitHeight, 16);
    const lowerTrunk = new THREE.Mesh(lowerTrunkGeo, barkMaterial);
    lowerTrunk.position.y = splitHeight / 2;
    lowerTrunk.castShadow = true;
    lowerTrunk.receiveShadow = true;
    lowerTrunk.name = 'trunk';
    treeGroupRef.current.add(lowerTrunk);

    // Upper Trunk (Split to Top)
    const rTopTrunk = rBase * taperFactor;
    const upperTrunkHeight = h - splitHeight;
    const upperTrunkGeo = new THREE.CylinderGeometry(rTopTrunk, rAtSplit, upperTrunkHeight, 16);
    const upperTrunk = new THREE.Mesh(upperTrunkGeo, barkMaterial);
    upperTrunk.position.y = splitHeight + upperTrunkHeight / 2;
    upperTrunk.castShadow = true;
    upperTrunk.receiveShadow = true;
    upperTrunk.name = 'trunk';
    treeGroupRef.current.add(upperTrunk);

    // A0 Label Position: Center of the trunk at cut height
    labelPositionsRef.current.A0.set(0, cutHeight, 0);

    // Calculate area at cut height
    const rAtCut = rBase * (1 - (1 - taperFactor) * (cutHeight / h));
    const areaAtCut = Math.PI * rAtCut * rAtCut;

    // Generate 3 branches
    const branchAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
    const branchTilt = isCone ? Math.PI / 5 : Math.PI / 4;

    branchProportions.forEach((prop, i) => {
      const branchArea = areaAtCut * prop;
      const branchRBase = Math.sqrt(branchArea / Math.PI);

      const branchLen = (h - splitHeight) * 0.8;
      const branchRTop = branchRBase * branchTaperFactor;
      const branchGeo = new THREE.CylinderGeometry(branchRTop, branchRBase, branchLen, 12);
      const branch = new THREE.Mesh(branchGeo, barkMaterial);
      branch.castShadow = true;
      branch.name = `branch_${i + 1}`;

      const branchContainer = new THREE.Object3D();
      branchContainer.position.set(0, splitHeight * 0.98, 0);
      branchContainer.rotation.y = branchAngles[i];
      branchContainer.rotation.z = branchTilt;

      branch.position.set(0, branchLen / 2, 0);
      branchContainer.add(branch);
      treeGroupRef.current?.add(branchContainer as unknown as THREE.Object3D);
      branchContainer.updateMatrixWorld();

      // Label Position Calculation
      const dy = cutHeight - splitHeight;
      const distAlongBranch = dy / Math.cos(branchTilt);
      const labelVec = new THREE.Vector3(0, distAlongBranch, 0);
      labelVec.applyMatrix4(branchContainer.matrixWorld);
      labelPositionsRef.current[`A${i + 1}` as 'A1' | 'A2' | 'A3'].copy(labelVec);
    });

    // Adjust Controls Target to center of tree
    controlsRef.current.target.set(0, h / 2, 0);
  }, [treeHeight, trunkDiameter, activeTab, splitHeight, cutHeight, branchProportions]);

  // Update label positions on screen
  const updateLabels = useCallback(() => {
    if (!cameraRef.current || !containerRef.current || !raycasterRef.current || !treeGroupRef.current) return;

    const labelRefs = {
      A0: labelA0Ref.current,
      A1: labelA1Ref.current,
      A2: labelA2Ref.current,
      A3: labelA3Ref.current,
    };

    for (const [key, pos] of Object.entries(labelPositionsRef.current)) {
      const vector = pos.clone();

      // Occlusion check for branches
      let isOccluded = false;
      if (key !== 'A0') {
        const direction = pos.clone().sub(cameraRef.current.position).normalize();
        raycasterRef.current.set(cameraRef.current.position, direction);
        const distanceToLabel = cameraRef.current.position.distanceTo(pos);
        const intersects = raycasterRef.current.intersectObjects(treeGroupRef.current.children, true);

        for (const hit of intersects) {
          if (hit.object.name === 'trunk' && hit.distance < distanceToLabel - 0.5) {
            isOccluded = true;
            break;
          }
        }
      }

      vector.project(cameraRef.current);
      const x = (vector.x * 0.5 + 0.5) * containerRef.current.clientWidth;
      const y = -(vector.y * 0.5 - 0.5) * containerRef.current.clientHeight;

      const el = labelRefs[key as keyof typeof labelRefs];
      if (el) {
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transition = 'opacity 0.2s';

        if (vector.z > 1 || isOccluded) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        } else {
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
        }
      }
    }
  }, []);

  // Initialize Three.js on mount
  useEffect(() => {
    initThree();
    return () => {
      if (rendererRef.current && containerRef.current && rendererRef.current.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [initThree]);

  // Update tree when parameters change - only for Step 1
  useEffect(() => {
    if (currentStep === 1) {
      updateTree();
    }
  }, [updateTree, currentStep]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
        controlsRef.current.update();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        updateLabels();
      }
    };

    animate();
  }, [updateLabels]);

  // Update slider background function
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #757575 ${percent}%)`;
  }, []);

  // Slider handlers
  const handleTreeHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTreeHeight(Number(e.target.value));
    updateSliderBackground(e.target);
    setStep1SliderChanged(true);
  };

  const handleTrunkDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrunkDiameter(Number(e.target.value));
    updateSliderBackground(e.target);
    setStep1SliderChanged(true);
  };

  // Zoom handlers
  const handleZoomIn = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    const dist = cameraRef.current.position.distanceTo(controlsRef.current.target);
    const newDist = dist * 0.8;
    if (newDist >= controlsRef.current.minDistance) {
      const dir = new THREE.Vector3()
        .subVectors(cameraRef.current.position, controlsRef.current.target)
        .normalize();
      cameraRef.current.position.copy(controlsRef.current.target).add(dir.multiplyScalar(newDist));
    }
  };

  const handleZoomOut = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    const dist = cameraRef.current.position.distanceTo(controlsRef.current.target);
    const newDist = dist * 1.2;
    if (newDist <= controlsRef.current.maxDistance) {
      const dir = new THREE.Vector3()
        .subVectors(cameraRef.current.position, controlsRef.current.target)
        .normalize();
      cameraRef.current.position.copy(controlsRef.current.target).add(dir.multiplyScalar(newDist));
    }
  };

  // Update slider backgrounds when values change (same pattern as forest-growth-simulator)
  useEffect(() => {
    const slider = document.getElementById('tree-height-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [treeHeight, updateSliderBackground, currentStep]);

  useEffect(() => {
    const slider = document.getElementById('trunk-diameter-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [trunkDiameter, updateSliderBackground, currentStep]);

  useEffect(() => {
    const slider = document.getElementById('branch-angle-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [branchAngle, updateSliderBackground, currentStep, step2ActiveTab]);

  useEffect(() => {
    const slider = document.getElementById('branch-depth-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [branchDepth, updateSliderBackground, currentStep, step2ActiveTab]);

  useEffect(() => {
    const slider = document.getElementById('length-ratio-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [lengthRatio, updateSliderBackground, currentStep, step2ActiveTab]);

  useEffect(() => {
    const slider = document.getElementById('leonardo-exponent-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [leonardoExponent, updateSliderBackground, currentStep, step2ActiveTab]);

  useEffect(() => {
    const slider = document.getElementById('whorl-interval-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [whorlInterval, updateSliderBackground, currentStep, step2ActiveTab]);

  useEffect(() => {
    const slider = document.getElementById('branches-per-whorl-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [branchesPerWhorl, updateSliderBackground, currentStep, step2ActiveTab]);

  useEffect(() => {
    const slider = document.getElementById('max-branch-length-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [maxBranchLength, updateSliderBackground, currentStep, step2ActiveTab]);

  useEffect(() => {
    const slider = document.getElementById('initial-angle-slider') as HTMLInputElement;
    if (slider) updateSliderBackground(slider);
  }, [initialAngle, updateSliderBackground, currentStep, step2ActiveTab]);

  // Step 2 Oak branching handlers
  const handleBranchAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchAngle(Number(e.target.value));
    updateSliderBackground(e.target);
    setOakSliderChanged(true);
  };

  const handleBranchDepthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchDepth(Number(e.target.value));
    updateSliderBackground(e.target);
    setOakSliderChanged(true);
  };

  const handleLengthRatioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLengthRatio(Number(e.target.value));
    updateSliderBackground(e.target);
    setOakSliderChanged(true);
  };

  const handleLeonardoExponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeonardoExponent(Number(e.target.value));
    updateSliderBackground(e.target);
    setOakSliderChanged(true);
  };

  // Step 2 Pine branching handlers
  const handleWhorlIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhorlInterval(Number(e.target.value));
    updateSliderBackground(e.target);
    setPineSliderChanged(true);
  };

  const handleBranchesPerWhorlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBranchesPerWhorl(Number(e.target.value));
    updateSliderBackground(e.target);
    setPineSliderChanged(true);
  };

  const handleMaxBranchLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxBranchLength(Number(e.target.value));
    updateSliderBackground(e.target);
    setPineSliderChanged(true);
  };

  const handleInitialAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialAngle(Number(e.target.value));
    updateSliderBackground(e.target);
    setPineSliderChanged(true);
  };

  // Calculate Da Vinci's Rule areas for Oak branching (Step 2)
  const oakBranchingAreas = useMemo(() => {
    const maxDepth = branchDepth;
    const initialRadiusBottom = maxDepth * 0.5;
    const initialRadiusTop = initialRadiusBottom / Math.pow(2, 1 / leonardoExponent);
    const trunkArea = Math.PI * Math.pow(initialRadiusTop, 2);
    const daughterRadius = initialRadiusTop / Math.pow(2, 1 / leonardoExponent);
    const branchesArea = 2 * (Math.PI * Math.pow(daughterRadius, 2));
    return { trunkArea, branchesArea };
  }, [branchDepth, leonardoExponent]);

  // Calculate Da Vinci's Rule areas for Pine branching (Step 2)
  // Uses scaled dimensions (4x height, 2x diameter) for Step 2
  const pineBranchingAreas = useMemo(() => {
    const baseRadius = (trunkDiameter * 2) / 2; // 2x diameter for Step 2
    const trunkArea = Math.PI * baseRadius * baseRadius;

    // Simplified Da Vinci check for Pine:
    // - At the default branches-per-whorl value, we keep trunk area ≈ sum of branch areas.
    // - Moving the slider nudges the ratio away from 1 with a gentle, pseudo-random variation,
    //   so the numbers feel \"alive\" without obviously breaking the principle.
    const idealBranchesPerWhorl = 5; // matches default slider value
    const normalizedOffset = (branchesPerWhorl - idealBranchesPerWhorl) / idealBranchesPerWhorl;

    // Base trend: slightly increase/decrease branch area as we move away from the ideal value.
    const baseDelta = 0.08 * normalizedOffset;

    // Small deterministic \"noise\" so changes don't look perfectly linear or rigged.
    const noise = 0.04 * Math.sin((branchesPerWhorl - idealBranchesPerWhorl) * 1.1);

    let ratio = 1 + baseDelta + noise;
    // Keep ratio in a reasonable band so the difference never looks wildly unrealistic.
    ratio = Math.min(1.15, Math.max(0.85, ratio));

    const branchesArea = trunkArea * ratio;

    return { trunkArea, branchesArea };
  }, [trunkDiameter, branchesPerWhorl]);

  // Oak branching tree generation (Step 2)
  const generateOakBranching = useCallback(() => {
    if (!treeGroupRef.current) return;

    // Clear existing tree
    while (treeGroupRef.current.children.length > 0) {
      const child = treeGroupRef.current.children[0];
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry.dispose();
      }
      treeGroupRef.current.remove(child);
    }

    const maxDepth = branchDepth;
    const initialRadiusBottom = maxDepth * 0.5;
    const initialLength = 150 / maxDepth;
    const initialRadiusTop = initialRadiusBottom / Math.pow(2, 1 / leonardoExponent);

    const barkMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      roughness: 0.8,
      metalness: 0.1,
    });

    // Recursive branch creation
    const createBranch = (
      startPoint: THREE.Vector3,
      direction: THREE.Vector3,
      length: number,
      radiusBottom: number,
      radiusTop: number,
      depth: number,
    ) => {
      if (depth <= 0 || radiusTop < 0.05) return;

      const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, length, 12);
      const cylinder = new THREE.Mesh(geometry, barkMaterial);
      cylinder.castShadow = true;
      cylinder.position.copy(startPoint).add(direction.clone().multiplyScalar(length / 2));
      cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
      treeGroupRef.current?.add(cylinder);

      // Recursive calls for daughter branches
      const endPoint = new THREE.Vector3().copy(startPoint).add(direction.clone().multiplyScalar(length));
      const newLength = length * lengthRatio;
      const newRadiusBottom = radiusTop;
      const newRadiusTop = newRadiusBottom / Math.pow(2, 1 / leonardoExponent);
      const angleRad = (branchAngle * Math.PI) / 180;

      const tangent = new THREE.Vector3()
        .crossVectors(
          direction,
          new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        )
        .normalize();

      const q1 = new THREE.Quaternion().setFromAxisAngle(tangent, angleRad);
      const q2 = new THREE.Quaternion().setFromAxisAngle(tangent, -angleRad);

      const newDirection1 = direction.clone().applyQuaternion(q1);
      const newDirection2 = direction.clone().applyQuaternion(q2);

      createBranch(endPoint, newDirection1, newLength, newRadiusBottom, newRadiusTop, depth - 1);
      createBranch(endPoint, newDirection2, newLength, newRadiusBottom, newRadiusTop, depth - 1);
    };

    // Start recursion
    createBranch(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, 0),
      initialLength,
      initialRadiusBottom,
      initialRadiusTop,
      maxDepth,
    );
  }, [branchAngle, branchDepth, lengthRatio, leonardoExponent]);

  // Pine branching tree generation (Step 2)
  // Use separate scaled dimensions for Step 2 pine (4x height, 2x diameter)
  const pineStep2Height = treeHeight * 4;
  const pineStep2Diameter = trunkDiameter * 2;

  const generatePineBranching = useCallback(() => {
    if (!treeGroupRef.current) return;

    // Clear existing tree
    while (treeGroupRef.current.children.length > 0) {
      const child = treeGroupRef.current.children[0];
      if (child instanceof THREE.Mesh && child.geometry) {
        child.geometry.dispose();
      }
      treeGroupRef.current.remove(child);
    }

    // Use scaled dimensions for Step 2
    const H = pineStep2Height;
    const baseRadius = pineStep2Diameter / 2;

    // Use same brown color as oak for consistency
    const barkMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513, // SaddleBrown - same as oak
      roughness: 0.8,
      metalness: 0.1,
    });

    // Main trunk (conical shape)
    const trunkGeom = new THREE.CylinderGeometry(0.1, baseRadius, H, 16);
    const trunkMesh = new THREE.Mesh(trunkGeom, barkMaterial);
    trunkMesh.position.y = H / 2;
    trunkMesh.castShadow = true;
    treeGroupRef.current.add(trunkMesh);

    // Create whorls of branches with proper drooping (like Gemini code)
    // Start whorls at 50% of tree height to leave trunk-only space at bottom
    const startHeight = H * 0.5;
    for (let h = startHeight; h < H * 0.95; h += whorlInterval) {
      const heightRatio = h / H;
      const branchLength = maxBranchLength * (1 - heightRatio) * (0.9 + Math.random() * 0.2);
      const branchBaseRadius = (branchLength / maxBranchLength) * (baseRadius / 1.5);

      for (let i = 0; i < branchesPerWhorl; i++) {
        if (branchLength < 1.0) continue;

        const theta = (i / branchesPerWhorl) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;

        // Calculate angles for drooping branches (like Gemini code)
        const initAngleRad = (initialAngle * Math.PI) / 180;
        const droopRad = (droopFactor * heightRatio * Math.PI) / 180;
        const finalAngleRad = initAngleRad + droopRad;

        // Calculate branch endpoint using cylindrical coordinates
        // The branch extends outward (radius) and droops downward (negative Y offset)
        const horizontalExtent = branchLength * Math.cos(finalAngleRad);
        const verticalDrop = branchLength * Math.sin(finalAngleRad);

        // Start point at trunk
        const startX = 0;
        const startY = h;
        const startZ = 0;

        // End point: extends outward radially and drops down
        const endX = horizontalExtent * Math.sin(theta);
        const endY = h - verticalDrop; // Drops DOWN from trunk height
        const endZ = horizontalExtent * Math.cos(theta);

        // Calculate midpoint for cylinder position
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const midZ = (startZ + endZ) / 2;

        // Calculate direction for cylinder orientation
        const direction = new THREE.Vector3(endX - startX, endY - startY, endZ - startZ).normalize();

        // Create branch cylinder
        const branchGeo = new THREE.CylinderGeometry(branchBaseRadius * 0.2, branchBaseRadius, branchLength, 8);
        const branchMesh = new THREE.Mesh(branchGeo, barkMaterial);

        // Position at midpoint
        branchMesh.position.set(midX, midY, midZ);

        // Orient cylinder along the direction (cylinder default is along Y axis)
        const up = new THREE.Vector3(0, 1, 0);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
        branchMesh.quaternion.copy(quaternion);

        branchMesh.castShadow = true;
        treeGroupRef.current.add(branchMesh);
      }
    }
  }, [
    pineStep2Height,
    pineStep2Diameter,
    whorlInterval,
    branchesPerWhorl,
    maxBranchLength,
    initialAngle,
    droopFactor,
  ]);

  // Update Step 2 tree when parameters change
  useEffect(() => {
    if (currentStep === 2 && treeGroupRef.current) {
      if (step2ActiveTab === 'oak-branching') {
        generateOakBranching();
      } else {
        generatePineBranching();
      }
    }
  }, [currentStep, step2ActiveTab, generateOakBranching, generatePineBranching]);

  // Adjust camera position when switching between steps
  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      if (currentStep === 2) {
        // Zoomed out view for branching exploration
        cameraRef.current.position.set(0, 50, 130);
        controlsRef.current.target.set(0, 50, 0);
      } else {
        // Closer view for trunk geometry
        cameraRef.current.position.set(15, 18, 23);
        controlsRef.current.target.set(0, 10, 0);
      }
    }
  }, [currentStep]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      if (currentStep === 1) {
        updateTree();
      } else if (step2ActiveTab === 'oak-branching') {
        generateOakBranching();
      } else {
        generatePineBranching();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateTree, currentStep, step2ActiveTab, generateOakBranching, generatePineBranching]);

  return (
    <div className="w-full max-w-7xl mx-auto mb-6 flex flex-col h-full gap-4 overflow-hidden">
      {/* Tab navigation for tree types - Always visible */}
      {currentStep === 1 && (
        <div className="mb-4">
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            <button
              onClick={() => {
                if (activeTab !== 'cylindrical') {
                  setActiveTab('cylindrical');
                  setTabSwitched(true);
                }
              }}
              aria-selected={activeTab === 'cylindrical'}
              id="cylindrical-tab"
              aria-label={t(ariaLabels.cylindricalModelToggle)}
              className={`w-full lg:w-auto p-2 rounded-md text-base font-medium ${
                activeTab === 'cylindrical'
                  ? 'border-solid border-2 border-[#005F20] bg-[#005F20] text-white'
                  : 'border-solid border-2 border-[#005F20] text-[#005F20]'
              }`}
            >
              {t(translations.cylindrical)}
            </button>
            <button
              onClick={() => {
                if (activeTab !== 'conical') {
                  setActiveTab('conical');
                  setTabSwitched(true);
                }
              }}
              aria-selected={activeTab === 'conical'}
              id="conical-tab"
              aria-label={t(ariaLabels.conicalModelToggle)}
              className={`w-full lg:w-auto p-2 rounded-md text-base font-medium ${
                activeTab === 'conical'
                  ? 'border-solid border-2 border-[#005F20] bg-[#005F20] text-white'
                  : 'border-solid border-2 border-[#005F20] text-[#005F20]'
              }`}
            >
              {t(translations.conical)}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Branching tabs */}
      {currentStep === 2 && (
        <div className="mb-4">
          <div className="flex flex-col lg:flex-row gap-2 w-full">
            <button
              onClick={() => setStep2ActiveTab('oak-branching')}
              aria-selected={step2ActiveTab === 'oak-branching'}
              id="oak-branching-tab"
              aria-label={t(ariaLabels.oakBranchingTab)}
              className={`w-full lg:w-auto p-2 rounded-md text-base font-medium ${
                step2ActiveTab === 'oak-branching'
                  ? 'border-solid border-2 border-[#005F20] bg-[#005F20] text-white'
                  : 'border-solid border-2 border-[#005F20] text-[#005F20]'
              }`}
            >
              {t(translations.oakBranching)}
            </button>
            <button
              onClick={() => setStep2ActiveTab('pine-branching')}
              aria-selected={step2ActiveTab === 'pine-branching'}
              id="pine-branching-tab"
              aria-label={t(ariaLabels.pineBranchingTab)}
              className={`w-full lg:w-auto p-2 rounded-md text-base font-medium ${
                step2ActiveTab === 'pine-branching'
                  ? 'border-solid border-2 border-[#005F20] bg-[#005F20] text-white'
                  : 'border-solid border-2 border-[#005F20] text-[#005F20]'
              }`}
            >
              {t(translations.pineBranching)}
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Input controls for trunk geometry */}
      {currentStep === 1 && (
        <div className="w-full px-2 py-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="tree-height-slider">{t(translations.treeHeight)}</label>: {treeHeight.toFixed(1)}{' '}
                ft
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="tree-height-slider"
                    type="range"
                    value={treeHeight}
                    onChange={handleTreeHeightChange}
                    step={1}
                    min={10}
                    max={40}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.treeHeight)}: ${treeHeight.toFixed(1)} ft`}
                    aria-label={t(ariaLabels.treeHeightSlider)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="trunk-diameter-slider">{t(translations.trunkDiameter)}</label>:{' '}
                {trunkDiameter.toFixed(1)} ft
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="trunk-diameter-slider"
                    type="range"
                    value={trunkDiameter}
                    onChange={handleTrunkDiameterChange}
                    step={0.1}
                    min={1}
                    max={5}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.trunkDiameter)}: ${trunkDiameter.toFixed(1)} ft`}
                    aria-label={t(ariaLabels.trunkDiameterSlider)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Input controls for branching */}
      {currentStep === 2 && step2ActiveTab === 'oak-branching' && (
        <div className="w-full px-2 py-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="branch-angle-slider">{t(translations.branchAngle)}</label>:{' '}
                {branchAngle.toFixed(0)}°
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="branch-angle-slider"
                    type="range"
                    value={branchAngle}
                    onChange={handleBranchAngleChange}
                    step={1}
                    min={10}
                    max={90}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.branchAngle)}: ${branchAngle.toFixed(0)} degrees`}
                    aria-label={t(ariaLabels.branchAngleSlider)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="branch-depth-slider">{t(translations.branchDepth)}</label>: {branchDepth}
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="branch-depth-slider"
                    type="range"
                    value={branchDepth}
                    onChange={handleBranchDepthChange}
                    step={1}
                    min={1}
                    max={10}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.branchDepth)}: ${branchDepth}`}
                    aria-label={t(ariaLabels.branchDepthSlider)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="length-ratio-slider">{t(translations.lengthRatio)}</label>:{' '}
                {lengthRatio.toFixed(2)}
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="length-ratio-slider"
                    type="range"
                    value={lengthRatio}
                    onChange={handleLengthRatioChange}
                    step={0.01}
                    min={0.5}
                    max={0.9}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.lengthRatio)}: ${lengthRatio.toFixed(2)}`}
                    aria-label={t(ariaLabels.lengthRatioSlider)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="leonardo-exponent-slider">{t(translations.leonardoExponent)}</label>:{' '}
                {leonardoExponent.toFixed(2)}
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="leonardo-exponent-slider"
                    type="range"
                    value={leonardoExponent}
                    onChange={handleLeonardoExponentChange}
                    step={0.01}
                    min={1.5}
                    max={3.0}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.leonardoExponent)}: ${leonardoExponent.toFixed(2)}`}
                    aria-label={t(ariaLabels.leonardoExponentSlider)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Pine branching controls */}
      {currentStep === 2 && step2ActiveTab === 'pine-branching' && (
        <div className="w-full px-2 py-2">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="whorl-interval-slider">{t(translations.whorlInterval)}</label>: {whorlInterval}{' '}
                {t(translations.meters)}
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="whorl-interval-slider"
                    type="range"
                    value={whorlInterval}
                    onChange={handleWhorlIntervalChange}
                    step={1}
                    min={5}
                    max={25}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.whorlInterval)}: ${whorlInterval} ${t(translations.meters)}`}
                    aria-label={t(ariaLabels.whorlIntervalSlider)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="branches-per-whorl-slider">{t(translations.branchesPerWhorl)}</label>:{' '}
                {branchesPerWhorl}
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="branches-per-whorl-slider"
                    type="range"
                    value={branchesPerWhorl}
                    onChange={handleBranchesPerWhorlChange}
                    step={1}
                    min={3}
                    max={8}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.branchesPerWhorl)}: ${branchesPerWhorl}`}
                    aria-label={t(ariaLabels.branchesPerWhorlSlider)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="max-branch-length-slider">{t(translations.maxBranchLength)}</label>:{' '}
                {maxBranchLength} {t(translations.meters)}
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="max-branch-length-slider"
                    type="range"
                    value={maxBranchLength}
                    onChange={handleMaxBranchLengthChange}
                    step={1}
                    min={10}
                    max={80}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.maxBranchLength)}: ${maxBranchLength} ${t(translations.meters)}`}
                    aria-label={t(ariaLabels.maxBranchLengthSlider)}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-base font-medium mb-2 md:text-lg">
                <label htmlFor="initial-angle-slider">{t(translations.initialAngle)}</label>: {initialAngle}°
              </div>
              <div className="w-full">
                <div className="sliderContainer">
                  <input
                    id="initial-angle-slider"
                    type="range"
                    value={initialAngle}
                    onChange={handleInitialAngleChange}
                    step={1}
                    min={20}
                    max={70}
                    className="global-slider w-full"
                    aria-valuetext={`${t(translations.initialAngle)}: ${initialAngle} degrees`}
                    aria-label={t(ariaLabels.initialAngleSlider)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left Col: 3D Visualization */}
        <div className="relative flex flex-col">
          <div
            ref={containerRef}
            id="canvas-container"
            className="w-full rounded-lg overflow-hidden relative"
            style={{
              height: '390px',
              background: 'linear-gradient(180deg, #F0F8FF 0%, #E6F3FF 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            }}
            aria-label={
              currentStep === 1
                ? t(ariaLabels.treeVisualization)
                : step2ActiveTab === 'oak-branching'
                  ? t(ariaLabels.oakBranchingVisualization)
                  : t(ariaLabels.pineBranchingVisualization)
            }
            role="img"
          >
            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
              <button
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white border border-slate-300 rounded-lg text-slate-600 text-2xl font-bold flex items-center justify-center cursor-pointer shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all select-none"
                aria-label="Zoom in"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white border border-slate-300 rounded-lg text-slate-600 text-2xl font-bold flex items-center justify-center cursor-pointer shadow-sm hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all select-none"
                aria-label="Zoom out"
                title="Zoom Out"
              >
                −
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Information Panels */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-1 min-h-0">
          {/* Step 1: Volume Formula Card */}
          {currentStep === 1 && getDisplayFlag('showVolumeFormula') && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <h3
                className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4"
                id="volume-formula"
              >
                {t(translations.volumeFormula)}
              </h3>

              <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-100">
                <div className="text-sm text-slate-600 mb-2">
                  {activeTab === 'cylindrical' ? t(translations.cylindricalVolume) : t(translations.conicalVolume)}
                </div>
                <div className="text-2xl md:text-3xl font-besley mb-3" aria-labelledby="volume-formula">
                  <span className="font-bold text-red-600 italic">V</span> ={' '}
                  {activeTab === 'cylindrical' ? (
                    <>
                      <span className="font-besley font-bold">π </span>
                      <span className="text-blue-600 italic font-bold">r</span>
                      <sup className="text-blue-600 font-bold" aria-hidden="true">
                        2
                      </sup>
                      <span className="sr-only">{t(translations.square)}</span>{' '}
                      <span className="text-green-700 italic font-bold">h</span>
                    </>
                  ) : (
                    <>
                      <span className="font-besley font-bold">⅓ π </span>
                      <span className="text-blue-600 italic font-bold">r</span>
                      <sup className="text-blue-600 font-bold" aria-hidden="true">
                        2
                      </sup>
                      <span className="sr-only">{t(translations.square)}</span>{' '}
                      <span className="text-green-700 italic font-bold">h</span>
                    </>
                  )}
                </div>
                <div className="text-3xl md:text-4xl font-bold font-besley text-slate-800 mb-2">
                  {volume.toFixed(1)}{' '}
                  <span className="text-xl text-slate-500 font-normal">
                    <span className="sr-only">{t(translations.cubeFeet)}</span>
                    <span aria-hidden="true">ft³</span>
                  </span>
                </div>
                <div className="text-sm text-slate-500 font-besley flex flex-wrap justify-center gap-3">
                  <span>π ≈ 3.14159</span>
                  <span>
                    <span className="text-blue-600 italic font-bold">r</span> = {trunkRadius.toFixed(1)} ft
                  </span>
                  <span>
                    <span className="text-green-700 italic font-bold">h</span> = {treeHeight.toFixed(1)} ft
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Da Vinci's Rule Card for Oak Branching */}
          {currentStep === 2 && step2ActiveTab === 'oak-branching' && (
            <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 p-5">
              <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-2" id="davinci-rule">
                {t(translations.daVinciRuleCheck)}
              </h3>
              <div className="bg-white/60 rounded-lg p-4 text-center border border-amber-100 mb-3">
                <div className="text-xl md:text-2xl font-besley font-bold text-amber-900 mb-1">A₀ ≈ A₁ + A₂</div>
                <div className="text-xs text-amber-700">At each branching split</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t(translations.trunkAreaBranching)}</span>
                  <span className="font-mono font-semibold">{oakBranchingAreas.trunkArea.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t(translations.branchesAreaSumBranching)}</span>
                  <span className="font-mono font-semibold">{oakBranchingAreas.branchesArea.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-amber-200">
                  <span className="text-slate-700">{t(translations.areaDifference)}</span>
                  <span className="font-mono text-green-700">
                    {oakBranchingAreas.trunkArea > 0
                      ? (
                          (Math.abs(oakBranchingAreas.trunkArea - oakBranchingAreas.branchesArea) /
                            oakBranchingAreas.trunkArea) *
                          100
                        ).toFixed(2)
                      : '0.00'}
                    %
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Da Vinci's Rule Card for Pine Branching */}
          {currentStep === 2 && step2ActiveTab === 'pine-branching' && (
            <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-100 p-5">
              <h3
                className="text-sm font-semibold text-amber-800 uppercase tracking-wide mb-2"
                id="davinci-rule-pine"
              >
                {t(translations.daVinciRuleCheck)}
              </h3>
              <div className="bg-white/60 rounded-lg p-4 text-center border border-amber-100 mb-3">
                <div className="text-xl md:text-2xl font-besley font-bold text-amber-900 mb-1">A₀ ≈ ΣAᵢ</div>
                <div className="text-xs text-amber-700">Trunk area ≈ Sum of branch areas per whorl</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">{t(translations.trunkAreaBranching)}</span>
                  <span className="font-mono font-semibold">{pineBranchingAreas.trunkArea.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{t(translations.branchesAreaSumBranching)}</span>
                  <span className="font-mono font-semibold">{pineBranchingAreas.branchesArea.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-amber-200">
                  <span className="text-slate-700">{t(translations.areaDifference)}</span>
                  <span className="font-mono text-green-700">
                    {pineBranchingAreas.trunkArea > 0
                      ? (
                          (Math.abs(pineBranchingAreas.trunkArea - pineBranchingAreas.branchesArea) /
                            pineBranchingAreas.trunkArea) *
                          100
                        ).toFixed(2)
                      : '0.00'}
                    %
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screen reader only information */}
      <div className="sr-only" aria-live="polite">
        {currentStep === 1 && (
          <>
            <p>
              {t(translations.treeHeight)}: {treeHeight.toFixed(1)} ft. {t(translations.trunkDiameter)}:{' '}
              {trunkDiameter.toFixed(1)} ft.
            </p>
            <p>
              {activeTab === 'cylindrical'
                ? `${t(translations.cylindricalVolume)}: ${volume.toFixed(1)} ft³. V = πr²h (π = 3.14159, r = ${trunkRadius.toFixed(1)} ft, h = ${treeHeight.toFixed(1)} ft).`
                : `${t(translations.conicalVolume)}: ${volume.toFixed(1)} ft³. V = ⅓πr²h (π = 3.14159, r = ${trunkRadius.toFixed(1)} ft, h = ${treeHeight.toFixed(1)} ft).`}
            </p>
          </>
        )}
        {currentStep === 2 && step2ActiveTab === 'oak-branching' && (
          <>
            <p>
              {t(translations.oakBranching)}: {t(translations.branchAngle)} {branchAngle} {t(translations.degrees)}
              . {t(translations.branchDepth)} {branchDepth}. {t(translations.lengthRatio)} {lengthRatio.toFixed(2)}
              . {t(translations.leonardoExponent)} {leonardoExponent.toFixed(2)}.
            </p>
          </>
        )}
        {currentStep === 2 && step2ActiveTab === 'pine-branching' && (
          <>
            <p>
              {t(translations.pineBranching)}: {t(translations.whorlInterval)} {whorlInterval}{' '}
              {t(translations.meters)}. {t(translations.branchesPerWhorl)} {branchesPerWhorl}.{' '}
              {t(translations.maxBranchLength)} {maxBranchLength} {t(translations.meters)}.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TreeVolumeExplorer;
