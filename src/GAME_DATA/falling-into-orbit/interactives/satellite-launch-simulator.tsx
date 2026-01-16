import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../../../shared/slider.css';
import parse from 'html-react-parser';
import { SatelliteLaunchSimulatorProps } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { GameContext } from '../../../contexts/GameContext';

// Constants from Newton's Canon for consistent physics
const EARTH_GM_REAL = 398600.4418; // km³/s²
const EARTH_REAL_RADIUS_KM = 6371;
const EARTH_RADIUS = 5; // visual Earth radius in scene
const R_SCALE = EARTH_REAL_RADIUS_KM / EARTH_RADIUS;
const FIXED_TIME_SCALE = 120; // controls orbit speed
const GRAVITY_CONSTANT = (EARTH_GM_REAL * Math.pow(FIXED_TIME_SCALE, 2)) / Math.pow(R_SCALE, 3);
const KPS_TO_SIM_SPEED = FIXED_TIME_SCALE / R_SCALE;
const TIME_STEP = 0.05;

// Conversion constants for imperial units
const KM_TO_MILES = 0.621371;
const KM_PER_SEC_TO_MI_PER_SEC = 0.621371;

// Orbit type colors (matching Newton's Canon)
const ORBIT_COLORS = {
  crashed: 0xffff00, // Yellow for crashed trajectories
  circular: 0xffffff, // White for circular orbits
  elliptical: 0xffffff, // White for elliptical orbits
  escaped: 0x0066ff, // Blue for escape trajectories
} as const;

// Time scale options
const TIME_SCALE_OPTIONS = [
  { value: 1, label: '1X' },
  { value: 2, label: '2X' },
  { value: 5, label: '5X' },
] as const;

// Visual altitude scaling factor (for display only, not physics)
const VISUAL_ALTITUDE_SCALE = 3;

const SatelliteLaunchSimulator: React.FC<SatelliteLaunchSimulatorProps> = ({ interaction }) => {
  // Translations
  const { translations } = interaction;
  const { t } = useTranslations();
  const gameContext = useContext(GameContext);
  const { interactiveResponses, setInteractiveResponses } = gameContext || {};
  const savedState =
    interactiveResponses?.['satellite-launch-simulator'] &&
    typeof interactiveResponses?.['satellite-launch-simulator'] === 'object'
      ? (interactiveResponses?.['satellite-launch-simulator'] as any)
      : undefined;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);
  const showPanelBtnRef = useRef<HTMLButtonElement>(null);

  // Three.js objects
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const controlsRef = useRef<OrbitControls>();
  const satelliteMeshRef = useRef<THREE.Group>();
  const earthRef = useRef<THREE.Mesh>();
  const trajectoryLineRef = useRef<THREE.Line>();
  const animationIdRef = useRef<number | null>(null);
  const updatePhysicsRef = useRef<((dt: number) => void) | null>(null);

  // State
  const [altitude, setAltitude] = useState(savedState?.altitude ?? 400);
  const [velocity, setVelocity] = useState(savedState?.velocity ?? 7.67);
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState('pre-launch');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [orbitType, setOrbitType] = useState<'crashed' | 'circular' | 'elliptical' | 'escaped'>('circular');
  const [timeScale, setTimeScale] = useState(1); // 1X, 2X, 5X time scale
  const [showOrbitType, setShowOrbitType] = useState(false); // Control when to show orbit type text
  const [simulationStartTime, setSimulationStartTime] = useState<number | null>(null); // Track simulation start time

  // Track user interactions for disable conditions
  const [altitudeSliderAdjusted, setAltitudeSliderAdjusted] = useState(
    savedState?.altitudeSliderAdjusted ?? false,
  );
  const [hasLaunchedBelowCircular, setHasLaunchedBelowCircular] = useState(
    savedState?.hasLaunchedBelowCircular ?? false,
  );
  const [hasLaunchedCircular, setHasLaunchedCircular] = useState(savedState?.hasLaunchedCircular ?? false);
  const [hasLaunchedBetweenCircularEscape, setHasLaunchedBetweenCircularEscape] = useState(
    savedState?.hasLaunchedBetweenCircularEscape ?? false,
  );
  const [hasLaunchedEscape, setHasLaunchedEscape] = useState(savedState?.hasLaunchedEscape ?? false);

  // Simulation objects
  const satelliteRef = useRef({
    position: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    launchVelocity: 0, // Store launch velocity for orbit type determination
  });
  const pathRef = useRef<THREE.Vector3[]>([]);
  const timeScaleRef = useRef(timeScale); // Store time scale in ref for dynamic access

  // Update timeScaleRef whenever timeScale changes
  React.useEffect(() => {
    timeScaleRef.current = timeScale;
  }, [timeScale]);

  // Show orbit type text when simulation completes (isRunning becomes false) and stage is crashed
  React.useEffect(() => {
    if (!isRunning && stage === 'crashed' && !showOrbitType) {
      setShowOrbitType(true);
    }
  }, [isRunning, stage, showOrbitType]);

  // Calculate circular velocity helper (using Newton's Canon formula)
  const circularVelocity = React.useMemo(() => {
    const orbitalRadiusKm = EARTH_REAL_RADIUS_KM + altitude;
    const circularVelocityKmS = Math.sqrt(EARTH_GM_REAL / orbitalRadiusKm);
    return circularVelocityKmS.toFixed(2);
  }, [altitude]);

  // Calculate escape velocity at current altitude (using Newton's Canon formula)
  const escapeVelocity = React.useMemo(() => {
    const orbitalRadiusKm = EARTH_REAL_RADIUS_KM + altitude;
    const escapeVelocityKmS = Math.sqrt((2 * EARTH_GM_REAL) / orbitalRadiusKm);
    return escapeVelocityKmS.toFixed(2);
  }, [altitude]);

  // Determine orbit type based on velocity and altitude (physically accurate)
  const determineOrbitType = useCallback(
    (vel: number): 'crashed' | 'circular' | 'elliptical' | 'escaped' => {
      const GM = EARTH_GM_REAL;
      const r = EARTH_REAL_RADIUS_KM + altitude;

      // Specific orbital energy (ε = v²/2 - μ/r)
      const energy = 0.5 * vel * vel - GM / r;

      // If total specific energy is positive → escaped orbit
      if (energy >= 0) return 'escaped';

      // Tangential launch → specific angular momentum h = r * v
      const h = r * vel;

      // Semi-major axis (a = -μ / (2ε))
      const a = -GM / (2 * energy);

      // Eccentricity (e = sqrt(1 - h² / (aμ)))
      const e = Math.sqrt(1 - (h * h) / (a * GM));

      // Perigee radius (rp = a * (1 - e))
      const rp = a * (1 - e);

      // Determine orbit type
      if (rp <= EARTH_REAL_RADIUS_KM) return 'crashed';

      const circularVel = Math.sqrt(GM / r);
      if (Math.abs(vel - circularVel) < 0.01 * circularVel) return 'circular';

      return 'elliptical';
    },
    [altitude],
  );

  // Get display text for orbit type
  const getOrbitTypeText = useCallback(
    (type: 'crashed' | 'circular' | 'elliptical' | 'escaped') => {
      switch (type) {
        case 'crashed':
          return `<span className="text-red-600">${t(translations.satelliteCrashed)}</span>`;
        case 'circular':
          return `${t(translations.orbitTypeCircular)}`;
        case 'elliptical':
          return `${t(translations.orbitTypeElliptical)}`;
        case 'escaped':
          return `<span className="text-blue-600">${t(translations.satelliteEscaped)}</span>`;
        default:
          return `${t(translations.orbitTypeUnknown)}`;
      }
    },
    [t, translations],
  );

  // Helper function to calculate physics satellite position (using Newton's Canon scaling)
  const calculatePhysicsSatellitePosition = useCallback((altitudeKm: number) => {
    const satelliteRadiusSim = (EARTH_REAL_RADIUS_KM + altitudeKm) / R_SCALE;
    return satelliteRadiusSim;
  }, []);

  // Helper function to calculate visual satellite position (scaled for better visibility)
  const calculateVisualSatellitePosition = useCallback((altitudeKm: number) => {
    const scaledAltitudeKm = altitudeKm * VISUAL_ALTITUDE_SCALE;
    const satelliteRadiusSim = (EARTH_REAL_RADIUS_KM + scaledAltitudeKm) / R_SCALE;
    return satelliteRadiusSim;
  }, []);

  // Update slider background
  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  // Create stars
  const createStars = useCallback((scene: THREE.Scene) => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];
    for (let i = 0; i < 20000; i++) {
      const x = (Math.random() - 0.5) * 4000;
      const y = (Math.random() - 0.5) * 4000;
      const z = (Math.random() - 0.5) * 4000;
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > 500) starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  }, []);

  // Update trajectory line (using Newton's Canon approach)
  const updateTrajectoryLine = useCallback(() => {
    if (!trajectoryLineRef.current) return;

    if (pathRef.current.length < 2) {
      trajectoryLineRef.current.geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    } else {
      // Create smooth curve like Newton's Canon
      const curve = new THREE.CatmullRomCurve3(pathRef.current);
      const points = curve.getPoints(1000);
      trajectoryLineRef.current.geometry.setFromPoints(points);
    }
    trajectoryLineRef.current.geometry.attributes.position.needsUpdate = true;

    // Update trajectory color based on orbit type
    if (trajectoryLineRef.current.material instanceof THREE.LineBasicMaterial) {
      trajectoryLineRef.current.material.color.setHex(ORBIT_COLORS[orbitType]);
    }
  }, [orbitType]);

  // Update satellite position only (without resetting the entire simulation)
  const updateSatellitePosition = useCallback(() => {
    if (isRunning) return; // Don't update position during simulation
    if (stage === 'crashed') return; // Don't update position when crashed - keep at crash location

    const satelliteRadiusSim = calculatePhysicsSatellitePosition(altitude);

    satelliteRef.current.position.set(satelliteRadiusSim, 0, 0);
    satelliteRef.current.velocity.set(0, 0, 0);
    satelliteRef.current.launchVelocity = 0;

    if (satelliteMeshRef.current && earthRef.current) {
      // Use visual position for display (scaled altitude)
      const visualRadiusSim = calculateVisualSatellitePosition(altitude);
      satelliteMeshRef.current.position.set(visualRadiusSim, 0, 0);
      satelliteMeshRef.current.lookAt(earthRef.current.position);
    }

    // Update trajectory line directly without dependency
    if (trajectoryLineRef.current) {
      if (pathRef.current.length < 2) {
        trajectoryLineRef.current.geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      } else {
        trajectoryLineRef.current.geometry.setFromPoints(pathRef.current);
      }
      trajectoryLineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [altitude, isRunning, stage, calculatePhysicsSatellitePosition, calculateVisualSatellitePosition]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setStage('pre-launch');
    setOrbitType('circular');
    setShowOrbitType(false);
    setSimulationStartTime(null);
    pathRef.current = [];

    const satelliteRadiusSim = calculatePhysicsSatellitePosition(altitude);
    satelliteRef.current.position.set(satelliteRadiusSim, 0, 0);
    satelliteRef.current.velocity.set(0, 0, 0);
    satelliteRef.current.launchVelocity = 0;

    if (satelliteMeshRef.current && earthRef.current) {
      // Use visual position for display (scaled altitude)
      const visualRadiusSim = calculateVisualSatellitePosition(altitude);
      satelliteMeshRef.current.position.set(visualRadiusSim, 0, 0);
      satelliteMeshRef.current.lookAt(earthRef.current.position);
    }

    // Update trajectory line directly
    if (trajectoryLineRef.current) {
      if (pathRef.current.length < 2) {
        trajectoryLineRef.current.geometry.setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      } else {
        trajectoryLineRef.current.geometry.setFromPoints(pathRef.current);
      }
      trajectoryLineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  }, [altitude, calculatePhysicsSatellitePosition, calculateVisualSatellitePosition]);

  // Initialize Three.js
  const initThree = useCallback(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 100000);
    // Position camera to show satellite on the left side of Earth
    // Camera positioned to the right of Earth, looking left to see satellite on left side
    camera.position.set(12, 2, 0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.saveState();
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    createStars(scene);

    // Create Textured Earth
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    );
    const earthSpecularMap = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    );

    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specularMap: earthSpecularMap,
      specular: new THREE.Color('gray'),
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earthRef.current = earth;
    scene.add(earth);

    // Satellite - reduced size for better proportion
    const satBodyGeo = new THREE.BoxGeometry(0.15, 0.15, 0.3);
    const satBodyMat = new THREE.MeshPhongMaterial({ color: 0xd1d5db });
    const body = new THREE.Mesh(satBodyGeo, satBodyMat);

    // Solar panels with light borders for better visibility
    const panelGeo = new THREE.BoxGeometry(0.6, 0.015, 0.25);
    const panelMat = new THREE.MeshPhongMaterial({ color: 0x0a2a5a });
    const panel1 = new THREE.Mesh(panelGeo, panelMat);
    panel1.position.x = 0.375;

    // Add light border to panel1
    const panel1BorderGeo = new THREE.EdgesGeometry(panelGeo);
    const panel1BorderMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const panel1Border = new THREE.LineSegments(panel1BorderGeo, panel1BorderMat);
    panel1.add(panel1Border);

    const panel2 = panel1.clone();
    panel2.position.x = -0.375;

    satelliteMeshRef.current = new THREE.Group();
    satelliteMeshRef.current.add(body, panel1, panel2);
    scene.add(satelliteMeshRef.current);

    // Trajectory
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffeb3b, linewidth: 3 });
    const lineGeo = new THREE.BufferGeometry();
    trajectoryLineRef.current = new THREE.Line(lineGeo, lineMat);
    scene.add(trajectoryLineRef.current);

    // Initialize satellite position with default altitude (will be updated by updateSatellitePosition)
    const defaultAltitudeKm = 400; // Default 400km altitude
    const satelliteRadiusSim = (EARTH_REAL_RADIUS_KM + defaultAltitudeKm) / R_SCALE;
    satelliteRef.current.position.set(satelliteRadiusSim, 0, 0);
    satelliteRef.current.velocity.set(0, 0, 0);

    if (satelliteMeshRef.current && earthRef.current) {
      // Use visual position for initial display (scaled altitude)
      const visualRadiusSim = calculateVisualSatellitePosition(defaultAltitudeKm);
      satelliteMeshRef.current.position.set(visualRadiusSim, 0, 0);
      satelliteMeshRef.current.lookAt(earthRef.current.position);
    }
  }, [createStars, calculateVisualSatellitePosition]);

  // Update physics
  const updatePhysics = useCallback(
    (dt: number) => {
      if (stage !== 'orbit') return;

      const satellite = satelliteRef.current;
      const rVec = satellite.position;
      const r = rVec.length();

      if (r < EARTH_RADIUS) {
        setIsRunning(false);
        setStage('crashed');
        // Don't show orbit type text immediately - it will be shown when isRunning becomes false

        // Keep satellite at crash position (on Earth surface) - don't reset position
        // The satellite will remain at the crash location until user manually resets
        return;
      }

      // Use Newton's Canon gravity calculation
      const distanceToEarthCenterSq = satellite.position.lengthSq();
      const gravityForce = GRAVITY_CONSTANT / distanceToEarthCenterSq;
      const acceleration = satellite.position.clone().normalize().multiplyScalar(-gravityForce);

      // Simple Euler integration (matching Newton's Canon)
      satellite.velocity.add(acceleration.clone().multiplyScalar(dt));
      satellite.position.add(satellite.velocity.clone().multiplyScalar(dt));

      if (satelliteMeshRef.current) {
        // Convert physics position to visual position (scaled altitude)
        const physicsRadius = satellite.position.length();
        const physicsAltitudeKm = physicsRadius * R_SCALE - EARTH_REAL_RADIUS_KM;
        const visualAltitudeKm = physicsAltitudeKm * VISUAL_ALTITUDE_SCALE;
        const visualRadius = (EARTH_REAL_RADIUS_KM + visualAltitudeKm) / R_SCALE;

        // Maintain the same direction but scale the distance
        const direction = satellite.position.clone().normalize();
        satelliteMeshRef.current.position.copy(direction.multiplyScalar(visualRadius));
        satelliteMeshRef.current.lookAt(satellite.position.clone().add(satellite.velocity));
      }

      // Convert physics position to visual position for trajectory (same scaling as satellite)
      const physicsRadius = satellite.position.length();
      const physicsAltitudeKm = physicsRadius * R_SCALE - EARTH_REAL_RADIUS_KM;
      const visualAltitudeKm = physicsAltitudeKm * VISUAL_ALTITUDE_SCALE;
      const visualRadius = (EARTH_REAL_RADIUS_KM + visualAltitudeKm) / R_SCALE;

      // Maintain the same direction but scale the distance for trajectory
      const direction = satellite.position.clone().normalize();
      const visualPosition = direction.multiplyScalar(visualRadius);

      pathRef.current.push(visualPosition);
      if (pathRef.current.length > 5000) pathRef.current.shift();
      updateTrajectoryLine();

      // Update orbit type based on launch velocity (more reliable than current velocity)
      const newOrbitType = determineOrbitType(satellite.launchVelocity);
      setOrbitType(newOrbitType);

      // Show orbit type text after 4-5 seconds for escaped orbits
      if (newOrbitType === 'escaped' && simulationStartTime && !showOrbitType) {
        const elapsedTime = Date.now() - simulationStartTime;
        if (elapsedTime >= 4000) {
          // 4 seconds
          setShowOrbitType(true);
        }
      }
    },
    [stage, updateTrajectoryLine, determineOrbitType, simulationStartTime, showOrbitType],
  );

  // Store updatePhysics in ref for animation loop
  updatePhysicsRef.current = updatePhysics;

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !cameraRef.current || !sceneRef.current || !controlsRef.current) return;

    animationIdRef.current = requestAnimationFrame(animate);
    const dt = TIME_STEP * timeScaleRef.current; // Use ref for dynamic time scale access

    // Call physics update if available
    if (updatePhysicsRef.current) {
      updatePhysicsRef.current(dt);
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }

    controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []); // No dependencies to prevent animation reset

  // Zoom functionality
  const handleZoomIn = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    // Get current camera distance from Earth center
    const currentDistance = cameraRef.current.position.length();
    const newDistance = Math.max(currentDistance * 0.8, 5); // Zoom in by 20%, minimum distance of 5

    // Maintain current camera direction but adjust distance
    const direction = cameraRef.current.position.clone().normalize();
    cameraRef.current.position.copy(direction.multiplyScalar(newDistance));
    controlsRef.current.update();
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    // Get current camera distance from Earth center
    const currentDistance = cameraRef.current.position.length();
    const newDistance = Math.min(currentDistance * 1.25, 50); // Zoom out by 25%, maximum distance of 50

    // Maintain current camera direction but adjust distance
    const direction = cameraRef.current.position.clone().normalize();
    cameraRef.current.position.copy(direction.multiplyScalar(newDistance));
    controlsRef.current.update();
  }, []);

  // Event handlers

  const handleAltitudeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isRunning) return;
      setAltitude(parseFloat(e.target.value));
      setAltitudeSliderAdjusted(true);
    },
    [isRunning],
  );

  const handleVelocityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isRunning) return;
      setVelocity(parseFloat(e.target.value));
    },
    [isRunning],
  );

  const fireRocket = useCallback(() => {
    if (isRunning) return;

    setIsRunning(true);
    setStage('orbit');
    setSimulationStartTime(Date.now()); // Record simulation start time
    setShowOrbitType(false); // Hide orbit type initially

    // Use physics position for simulation (actual altitude)
    const satelliteRadiusSim = calculatePhysicsSatellitePosition(altitude);
    const initialVelocitySim = velocity * KPS_TO_SIM_SPEED;

    // Set position on +X axis and velocity tangential (perpendicular to radius vector)
    satelliteRef.current.position.set(satelliteRadiusSim, 0, 0);
    satelliteRef.current.velocity.set(0, initialVelocitySim, 0);
    satelliteRef.current.launchVelocity = velocity; // Store launch velocity

    // Set visual position for satellite mesh (scaled altitude)
    if (satelliteMeshRef.current && earthRef.current) {
      const visualRadiusSim = calculateVisualSatellitePosition(altitude);
      satelliteMeshRef.current.position.set(visualRadiusSim, 0, 0);
      satelliteMeshRef.current.lookAt(earthRef.current.position);
    }

    // Determine initial orbit type based on launch velocity
    const initialOrbitType = determineOrbitType(velocity);
    setOrbitType(initialOrbitType);

    // Track launch conditions based on velocity relative to circular and escape velocities
    const circularVel = parseFloat(circularVelocity);
    const escapeVel = parseFloat(escapeVelocity);
    const velocityMiPerSec = velocity * KM_PER_SEC_TO_MI_PER_SEC;
    const circularVelMiPerSec = circularVel * KM_PER_SEC_TO_MI_PER_SEC;
    const escapeVelMiPerSec = escapeVel * KM_PER_SEC_TO_MI_PER_SEC;

    // Check if launched 1 mi/s below circular orbit velocity
    if (velocityMiPerSec <= circularVelMiPerSec - 1.0) {
      setHasLaunchedBelowCircular(true);
    }

    // Check if launched with circular orbit velocity (within 0.1 mi/s tolerance)
    if (Math.abs(velocityMiPerSec - circularVelMiPerSec) <= 0.1) {
      setHasLaunchedCircular(true);
    }

    // Check if launched between circular and escape velocity
    if (velocityMiPerSec > circularVelMiPerSec + 0.1 && velocityMiPerSec < escapeVelMiPerSec - 0.1) {
      setHasLaunchedBetweenCircularEscape(true);
    }

    // Check if launched at or above escape velocity
    if (velocityMiPerSec >= escapeVelMiPerSec - 0.1) {
      setHasLaunchedEscape(true);
    }

    // Show orbit type immediately for non-escaped and non-crashed orbits
    if (initialOrbitType !== 'escaped' && initialOrbitType !== 'crashed') {
      setShowOrbitType(true);
    }

    // Initialize trajectory with visual position (scaled altitude)
    const visualRadiusSim = calculateVisualSatellitePosition(altitude);
    pathRef.current = [new THREE.Vector3(visualRadiusSim, 0, 0)];
  }, [
    isRunning,
    altitude,
    velocity,
    calculatePhysicsSatellitePosition,
    calculateVisualSatellitePosition,
    determineOrbitType,
    circularVelocity,
    escapeVelocity,
  ]);

  const resetRocket = useCallback(() => {
    resetSimulation();
  }, [resetSimulation]);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (
        !isPanelCollapsed &&
        controlPanelRef.current &&
        !controlPanelRef.current.contains(e.target as Node) &&
        e.target !== showPanelBtnRef.current
      ) {
        setIsPanelCollapsed(true);
      }
    },
    [isPanelCollapsed],
  );

  const handleWindowResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    cameraRef.current.aspect = containerWidth / containerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(containerWidth, containerHeight);
  }, []);

  // Effects
  useEffect(() => {
    initThree();
    animate();

    document.addEventListener('click', handleDocumentClick);
    const handleResize = () => handleWindowResize();
    window.addEventListener('resize', handleResize);

    const container = containerRef.current;
    const renderer = rendererRef.current;

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (container && renderer) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [initThree, animate, handleDocumentClick, handleWindowResize]);

  // Update satellite position after scene initialization
  useEffect(() => {
    if (satelliteMeshRef.current && earthRef.current) {
      updateSatellitePosition();
    }
  }, [updateSatellitePosition]);

  useEffect(() => {
    const altitudeSlider = document.getElementById('altitude-slider') as HTMLInputElement;
    if (altitudeSlider) {
      updateSliderBackground(altitudeSlider);
    }
  }, [altitude, updateSliderBackground]);

  useEffect(() => {
    const velocitySlider = document.getElementById('velocity-slider') as HTMLInputElement;
    if (velocitySlider) {
      updateSliderBackground(velocitySlider);
    }
  }, [velocity, updateSliderBackground]);

  // Save state to interactiveResponses
  useEffect(() => {
    if (setInteractiveResponses) {
      setInteractiveResponses((prev) => ({
        ...prev,
        'satellite-launch-simulator': {
          altitude,
          velocity,
          altitudeSliderAdjusted,
          hasLaunchedBelowCircular,
          hasLaunchedCircular,
          hasLaunchedBetweenCircularEscape,
          hasLaunchedEscape,
        },
      }));
    }
  }, [
    altitude,
    velocity,
    altitudeSliderAdjusted,
    hasLaunchedBelowCircular,
    hasLaunchedCircular,
    hasLaunchedBetweenCircularEscape,
    hasLaunchedEscape,
    setInteractiveResponses,
  ]);

  return (
    <div className="flex flex-col gap-6 text-lg max-w-5xl mx-auto">
      <div className="grid grid-cols-1 gap-y-2 gap-x-4 xl:grid-cols-2">
        {/* Altitude Controls */}
        <div className="slider">
          <label className="block">
            <span className="font-bold">{t(translations.orbitalInsertionAltitude)}</span>
            <span>
              {' '}
              {Math.round(altitude * KM_TO_MILES).toLocaleString()} {t(translations.miles)}
            </span>
          </label>
          <div className="relative">
            <input
              id="altitude-slider"
              type="range"
              min="100"
              max="2000"
              value={altitude}
              step="50"
              disabled={isRunning}
              onChange={handleAltitudeChange}
              className="global-slider w-full disabled:opacity-50"
              aria-valuetext={`${t(translations.orbitalInsertionAltitude)} ${Math.round(altitude * KM_TO_MILES).toLocaleString()} ${t(translations.miles)}`}
            />
          </div>
        </div>

        {/* Velocity Controls */}
        <div className="slider">
          <label className="block">
            <span className="font-bold">{t(translations.insertionVelocity)}</span>
            <span>
              {' '}
              {(velocity * KM_PER_SEC_TO_MI_PER_SEC).toFixed(2)} {t(translations.miPerSecond)}
            </span>
          </label>
          <div className="relative">
            <input
              id="velocity-slider"
              type="range"
              min="0.0"
              max="13.0"
              value={velocity}
              step="0.01"
              disabled={isRunning}
              onChange={handleVelocityChange}
              className="global-slider w-full disabled:opacity-50"
              aria-valuetext={`${t(translations.insertionVelocity)} ${(velocity * KM_PER_SEC_TO_MI_PER_SEC).toFixed(2)} ${t(translations.miPerSecond)}`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 xl:flex-row xl:justify-between xl:items-end">
        {/* Time Control */}
        <div>
          <label className="font-bold">{t(translations.simulationSpeed)}</label>
          <div className="flex gap-3 mt-2">
            {TIME_SCALE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeScale(option.value)}
                className={`${
                  timeScale === option.value
                    ? 'px-6 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    : 'px-6 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-3">
          <button
            onClick={fireRocket}
            disabled={isRunning}
            className="px-8 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t(translations.launch)}
          </button>
          <button
            onClick={resetRocket}
            className="px-8 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t(translations.stop)}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-2 border-[#006BE0] rounded-lg p-4">
        <p>
          {t(translations.circularOrbitVelocity)}{' '}
          <strong>
            {(parseFloat(circularVelocity) * KM_PER_SEC_TO_MI_PER_SEC).toFixed(2)} {t(translations.miPerSecond)}
          </strong>
        </p>
        <p>
          {t(translations.escapeVelocity)}{' '}
          <strong>
            {(parseFloat(escapeVelocity) * KM_PER_SEC_TO_MI_PER_SEC).toFixed(2)} {t(translations.miPerSecond)}
          </strong>
        </p>
        {showOrbitType && <p>{parse(getOrbitTypeText(orbitType))}</p>}
      </div>

      {/* 3D Earth Canvas */}
      <div className="relative w-full h-[440px] rounded-lg overflow-hidden mb-6">
        <div ref={containerRef} className="w-full h-full cursor-grab" />

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white/90 hover:text-blue-600 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700 transition-colors focus:outline-none"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white/90 hover:text-blue-600 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700 transition-colors focus:outline-none"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
};

export default SatelliteLaunchSimulator;
