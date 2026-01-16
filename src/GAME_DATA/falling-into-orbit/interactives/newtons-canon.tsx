import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../../../shared/slider.css';
import { NewtonsCanonProps } from './interface';
import { useTranslations } from '../../../hooks/useTranslations';
import { useEventListener } from '../../../hooks/useEventListener';

const NewtonsCanon: React.FC<NewtonsCanonProps> = ({ interaction, onInteraction }) => {
  const { t } = useTranslations();
  const { translations } = interaction;
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const cannonGroupRef = useRef<THREE.Group | null>(null);
  const mountainRef = useRef<THREE.Mesh | null>(null);
  const cannonBarrelRef = useRef<THREE.Group | null>(null);
  const cannonballsRef = useRef<
    Array<{
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      pathMesh: THREE.Mesh;
      pathPoints: THREE.Vector3[];
      isActive: boolean;
      isOrbiting: boolean;
      isEscaping: boolean;
      launchSpeed: number;
    }>
  >([]);
  const animationIdRef = useRef<number | null>(null);
  const { payload } = useEventListener('newtons-canon');

  const [powerValue, setPowerValue] = useState(7.8);
  const [isCanonFired, setIsCanonFired] = useState(false);

  // Simulation Constants
  const TIME_STEP = 0.05;
  const EARTH_RADIUS = 5;
  const EARTH_REAL_RADIUS_KM = 6371;
  const R_SCALE = EARTH_REAL_RADIUS_KM / EARTH_RADIUS;
  const FIXED_MOUNTAIN_HEIGHT_KM = 100;
  const FIXED_LAUNCH_ANGLE_DEG = 0;
  const FIXED_TIME_SCALE = 120;

  // Mutable constants
  const [GRAVITATIONAL_CONSTANT, setGravitationalConstant] = useState(0);
  const [KPS_TO_SIM_SPEED, setKpsToSimSpeed] = useState(0);

  const updatePhysicsConstants = (newTimeScale: number) => {
    // Calculate kpsToSimSpeed first
    const kpsToSimSpeed = newTimeScale / R_SCALE;

    // Calculate gravitational constant to ensure 7.80 km/s produces circular orbit
    // For circular orbit: v = sqrt(GM/r), so GM = v^2 * r
    // We want: sqrt(GRAVITATIONAL_CONSTANT / EARTH_RADIUS) = 7.8 * kpsToSimSpeed
    // Therefore: GRAVITATIONAL_CONSTANT = (7.8 * kpsToSimSpeed)^2 * EARTH_RADIUS
    const targetOrbitalVelocity = 7.8 * kpsToSimSpeed;
    const gravitationalConstant = targetOrbitalVelocity * targetOrbitalVelocity * EARTH_RADIUS;

    setGravitationalConstant(gravitationalConstant);
    setKpsToSimSpeed(kpsToSimSpeed);
  };

  const updateSliderBackground = useCallback((input: HTMLInputElement) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);
    const percent = ((value - min) / (max - min)) * 100;
    input.style.background = `linear-gradient(to right, #007bff ${percent}%, #949494 ${percent}%)`;
  }, []);

  const createStars = (scene: THREE.Scene) => {
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
  };

  const init = () => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    sceneRef.current = scene;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 100000);
    camera.position.set(8, 8, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
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

    // Create Clouds
    const cloudTexture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_cloud_2048.png',
    );
    const cloudGeometry = new THREE.SphereGeometry(EARTH_RADIUS * 1.02, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8,
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudsRef.current = clouds;
    scene.add(clouds);

    // Create Cannon on a Mountain
    const cannonGroup = new THREE.Group();
    cannonGroupRef.current = cannonGroup;

    // Mountain
    const mountainMaterial = new THREE.MeshPhongMaterial({ color: 0x5c4033 });
    const mountainGeometry = new THREE.ConeGeometry(0.5, 1, 16);
    const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountain.position.y = EARTH_RADIUS;
    mountainRef.current = mountain;
    cannonGroup.add(mountain);

    // Cannon Barrel
    const cannonMaterial = new THREE.MeshPhongMaterial({ color: 0x666666, shininess: 90 });
    const cannonBarrel = new THREE.Group();
    cannonBarrelRef.current = cannonBarrel;

    // Add a base to make the cannon more prominent
    const baseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
    const cannonBase = new THREE.Mesh(baseGeometry, cannonMaterial);
    cannonBarrel.add(cannonBase);

    // A larger barrel tube
    const barrelTube = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.7, 16), cannonMaterial);
    barrelTube.rotation.z = Math.PI / 2;
    barrelTube.position.x = 0.35;
    barrelTube.position.y = 0.05;
    cannonBarrel.add(barrelTube);

    cannonGroup.add(cannonBarrel);
    scene.add(cannonGroup);

    updateCannonHeight(FIXED_MOUNTAIN_HEIGHT_KM);
    updateCannonAngle(FIXED_LAUNCH_ANGLE_DEG);
  };

  const updateCannonHeight = (mountainHeightKM: number) => {
    if (isNaN(mountainHeightKM) || !mountainRef.current || !cannonBarrelRef.current) return;
    const mountainHeightSim = mountainHeightKM / R_SCALE;

    mountainRef.current.scale.y = mountainHeightSim;
    mountainRef.current.position.y = EARTH_RADIUS;
    cannonBarrelRef.current.position.y = EARTH_RADIUS + mountainHeightSim;
  };

  const updateCannonAngle = (angleDeg: number) => {
    if (isNaN(angleDeg) || !cannonBarrelRef.current) return;
    const angleRad = (angleDeg * Math.PI) / 180;
    cannonBarrelRef.current.rotation.z = angleRad;
  };

  const fireCannonball = (launchSpeedKPS?: number, color?: number) => {
    const launchSpeed = launchSpeedKPS !== undefined ? launchSpeedKPS : powerValue;

    // Use provided color, or white for custom slider fires
    const pathColor = color !== undefined ? color : 0xffffff; // White for custom speed slider

    if (isNaN(launchSpeed) || launchSpeed === 0 || !cannonBarrelRef.current || !sceneRef.current) return;

    // Limit to 5 balls total - remove oldest if we exceed
    const MAX_BALLS = 5;
    if (cannonballsRef.current.length >= MAX_BALLS) {
      const oldestBall = cannonballsRef.current.shift();
      if (oldestBall && sceneRef.current) {
        sceneRef.current.remove(oldestBall.mesh);
        sceneRef.current.remove(oldestBall.pathMesh);
        oldestBall.pathMesh.geometry.dispose();
      }
    }

    const launchSpeedSim = launchSpeed * KPS_TO_SIM_SPEED;

    const startPosition = new THREE.Vector3();
    cannonBarrelRef.current.getWorldPosition(startPosition);

    const launchDirection = new THREE.Vector3(1, 0, 0);
    launchDirection.applyQuaternion(cannonBarrelRef.current.quaternion);
    launchDirection.normalize();

    const initialVelocity = launchDirection.multiplyScalar(launchSpeedSim);

    const cannonballMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff4400 }),
    );
    cannonballMesh.position.copy(startPosition);

    const pathMaterial = new THREE.MeshBasicMaterial({ color: pathColor });
    const secondPathPoint = startPosition.clone().add(initialVelocity.clone().normalize().multiplyScalar(0.01));
    const initialPathPoints = [startPosition, secondPathPoint];

    const pathCurve = new THREE.LineCurve3(initialPathPoints[0], initialPathPoints[1]);
    const pathGeometry = new THREE.TubeGeometry(pathCurve, 1, 0.05, 8, false);
    const pathMesh = new THREE.Mesh(pathGeometry, pathMaterial);

    const cannonball = {
      mesh: cannonballMesh,
      velocity: initialVelocity,
      pathMesh: pathMesh,
      pathPoints: initialPathPoints,
      isActive: true,
      isOrbiting: false,
      isEscaping: false,
      launchSpeed: launchSpeed,
    };

    cannonballsRef.current.push(cannonball);
    sceneRef.current.add(cannonballMesh);
    sceneRef.current.add(pathMesh);
  };

  // Preset speed values in km/s (converted from mi/s)
  // 4.85 mi/s ≈ 7.8 km/s (physics calibrated for 7.8 km/s), 6.96 mi/s ≈ 11.2 km/s
  const PRESET_SPEEDS = {
    crashes: 5.0, // Below 4.85 mi/s (≈3.11 mi/s)
    circular: 7.8, // Exactly 4.85 mi/s (≈7.8 km/s)
    elliptical: 9.5, // 4.85-6.96 mi/s range (≈5.9 mi/s)
    escape: 12.0, // Above 6.96 mi/s (≈7.46 mi/s)
  };

  const PRESET_COLORS = {
    crashes: 0xff0000, // Red for crashing trajectory
    circular: 0x00ff00, // Green for circular orbit
    elliptical: 0x40e0d0, // Teal for elliptical orbit
    escape: 0x9370db, // Purple for escape trajectory
  };

  const firePreset = (presetType: 'crashes' | 'circular' | 'elliptical' | 'escape') => {
    const speed = PRESET_SPEEDS[presetType];
    const color = PRESET_COLORS[presetType];
    fireCannonball(speed, color);
  };

  const clearTrajectories = () => {
    cannonballsRef.current.forEach((ball) => {
      if (sceneRef.current) {
        sceneRef.current.remove(ball.mesh);
        sceneRef.current.remove(ball.pathMesh);
        ball.pathMesh.geometry.dispose();
      }
    });
    cannonballsRef.current = [];
  };

  const resetSimulation = () => {
    clearTrajectories();
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setPowerValue(5.0);
  };

  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !controlsRef.current) return;

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0001;
    }

    cannonballsRef.current.forEach((ball) => {
      if (!ball.isActive) return;
      const position = ball.mesh.position;
      if (isNaN(position.x)) {
        ball.isActive = false;
        return;
      }

      const distanceToEarthCenterSq = position.lengthSq();
      const distanceToEarthCenter = Math.sqrt(distanceToEarthCenterSq);
      // Add small tolerance to prevent false crashes due to rounding errors
      const crashTolerance = 0.01; // Small buffer to account for numerical precision
      if (distanceToEarthCenter <= EARTH_RADIUS + crashTolerance) {
        ball.isActive = false;
        return;
      }

      const gravityForce = GRAVITATIONAL_CONSTANT / distanceToEarthCenterSq;
      const acceleration = position.clone().normalize().multiplyScalar(-gravityForce);

      ball.velocity.add(acceleration.clone().multiplyScalar(TIME_STEP));
      position.add(ball.velocity.clone().multiplyScalar(TIME_STEP));
      ball.pathPoints.push(position.clone());

      // Determine trajectory type based on launch speed (more reliable than real-time detection)
      const launchSpeed = ball.launchSpeed;

      // Update orbit/escape status based on launch speed
      if (launchSpeed >= 11.2) {
        ball.isEscaping = true;
        ball.isOrbiting = false;
      } else if (launchSpeed >= 7.0 && launchSpeed < 11.2) {
        ball.isOrbiting = true;
        ball.isEscaping = false;
      } else {
        ball.isOrbiting = false;
        ball.isEscaping = false;
      }

      // Path management: Keep full orbit for orbital trajectories, limit for escape trajectories
      if (ball.isEscaping) {
        // For escape trajectories, limit path length to show recent movement
        if (ball.pathPoints.length > 1024) ball.pathPoints.shift();
      } else if (ball.isOrbiting) {
        // For orbital trajectories, keep many more points to show full orbit
        if (ball.pathPoints.length > 8192) ball.pathPoints.shift();
      } else {
        // For falling trajectories, use standard limit
        if (ball.pathPoints.length > 2048) ball.pathPoints.shift();
      }

      const newCurve = new THREE.CatmullRomCurve3(ball.pathPoints);
      ball.pathMesh.geometry.dispose();
      ball.pathMesh.geometry = new THREE.TubeGeometry(newCurve, 256, 0.05, 8, false);
    });

    controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  };

  const onWindowResize = () => {
    if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    cameraRef.current.aspect = containerWidth / containerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(containerWidth, containerHeight);
  };

  // Zoom functionality
  const handleZoomIn = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    // Get current camera distance from origin
    const currentDistance = cameraRef.current.position.length();
    const newDistance = Math.max(currentDistance * 0.8, 5); // Zoom in by 20%, minimum distance of 5

    // Maintain current camera direction but adjust distance
    const direction = cameraRef.current.position.clone().normalize();
    cameraRef.current.position.copy(direction.multiplyScalar(newDistance));
    controlsRef.current.update();
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    // Get current camera distance from origin
    const currentDistance = cameraRef.current.position.length();
    const newDistance = Math.min(currentDistance * 1.25, 50); // Zoom out by 25%, maximum distance of 50

    // Maintain current camera direction but adjust distance
    const direction = cameraRef.current.position.clone().normalize();
    cameraRef.current.position.copy(direction.multiplyScalar(newDistance));
    controlsRef.current.update();
  }, []);

  useEffect(() => {
    updatePhysicsConstants(FIXED_TIME_SCALE);
    init();

    const handleResize = () => onWindowResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (GRAVITATIONAL_CONSTANT > 0 && KPS_TO_SIM_SPEED > 0) {
      animate();
    }
  }, [GRAVITATIONAL_CONSTANT, KPS_TO_SIM_SPEED]);

  useEffect(() => {
    const powerSlider = document.getElementById('power-slider') as HTMLInputElement;
    if (powerSlider) {
      updateSliderBackground(powerSlider);
    }
  }, [powerValue, updateSliderBackground]);

  useEffect(() => {
    if (powerValue < 7.8 && isCanonFired) {
      onInteraction({
        'is-parabolic-orbit': true,
      });
    }

    if (payload && typeof payload === 'object') {
      if (
        'checkEllipticalOrbit' in payload &&
        payload.checkEllipticalOrbit &&
        powerValue >= 7.8 &&
        powerValue < 11.2 &&
        isCanonFired
      ) {
        onInteraction({
          'is-elliptical-orbit': true,
        });
      }

      if (
        'checkHyperbolicOrbit' in payload &&
        payload.checkHyperbolicOrbit &&
        powerValue >= 11.2 &&
        isCanonFired
      ) {
        onInteraction({
          'is-hyperbolic-orbit': true,
        });
      }
    }
  }, [payload, powerValue, isCanonFired]);

  return (
    <div className="flex flex-col gap-6 text-lg max-w-5xl mx-auto">
      {/* Speed Controls + Fire + Reset Row */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
        {/* Speed Slider */}
        <div className="slider flex-1 w-full lg:w-auto">
          <label className="block">
            <span className="font-bold">{t(translations.speed)}:</span>
            <span> {(powerValue * 0.621371).toFixed(2)} mi/s</span>
          </label>
          <div className="relative">
            <input
              id="power-slider"
              type="range"
              min="0.0"
              max="13.0"
              value={powerValue}
              step="0.01"
              onChange={(e) => {
                setIsCanonFired(false);
                setPowerValue(parseFloat(e.target.value));
              }}
              className="global-slider w-full"
              aria-valuetext={`${t(translations.speed)}: ${(powerValue * 0.621371).toFixed(2)} mi/s`}
            />
          </div>
        </div>

        {/* Fire and Reset Buttons */}
        <div className="flex gap-3 w-full lg:w-auto">
          <button
            onClick={() => {
              setIsCanonFired(true);
              fireCannonball();
            }}
            className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-1 lg:flex-initial"
          >
            {t(translations.fire)}
          </button>
          <button
            onClick={resetSimulation}
            className="px-4 py-3 rounded transition-colors text-center text-blue-600 border border-[#006BE0] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-1 lg:flex-initial"
          >
            {t(translations.reset)}
          </button>
        </div>
      </div>

      {/* Preset Buttons Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={() => firePreset('crashes')}
          className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          {t(translations.presetCrashes)}
        </button>
        <button
          onClick={() => firePreset('circular')}
          className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          {t(translations.presetCircular)}
        </button>
        <button
          onClick={() => firePreset('elliptical')}
          className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          {t(translations.presetElliptical)}
        </button>
        <button
          onClick={() => firePreset('escape')}
          className="px-4 py-3 rounded transition-colors text-center text-white bg-[#006BE0] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          {t(translations.presetEscape)}
        </button>
      </div>

      {/* 3D Earth Canvas */}
      <div className="relative w-full h-[440px] rounded-lg overflow-hidden mb-6 xl:mb-0">
        <div ref={containerRef} className="w-full h-full" />

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white/90 hover:bg-white hover:text-blue-600 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white/90 hover:bg-white hover:text-blue-600 border border-gray-300 rounded-lg flex items-center justify-center text-lg font-bold text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewtonsCanon;
